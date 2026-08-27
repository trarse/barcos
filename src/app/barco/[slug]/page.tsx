import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Estrellas } from "@/components/estrellas";
import { FotoBarco } from "@/components/foto-barco";
import { JsonLd } from "@/components/json-ld";
import { Migas } from "@/components/migas";
import { Reserva } from "@/components/reserva";
import { TarjetaBarco, Etiqueta } from "@/components/tarjeta-barco";
import { barcosSimilares, obtenerBarco, slugsDeBarcos } from "@/lib/consultas";
import { entero, eslora, euro, mesYAno, plural } from "@/lib/formato";
import { precioTodoIncluidoPorDia, temporadaDe } from "@/lib/precio";
import { barcoJsonLd, rutas } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const barcos = await slugsDeBarcos();
  return barcos.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/barco/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const barco = await obtenerBarco(slug);
  if (!barco) return { title: "Barco no encontrado" };

  const temporada = temporadaDe(new Date(), barco.puerto.destino.mesesAlta);
  const precio = precioTodoIncluidoPorDia(tarifaDe(barco), temporada);
  const titulo = `${barco.nombre} en ${barco.puerto.destino.nombre}`;
  const descripcion = `Alquila el ${barco.nombre} en ${barco.puerto.nombre} desde ${euro(precio)} al día con todo incluido: combustible, limpieza, amarre y tasas. ${entero(barco.capacidad)} plazas.`;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: rutas.barco(slug) },
    openGraph: {
      type: "website",
      title: titulo,
      description: descripcion,
      url: rutas.barco(slug),
    },
  };
}

/** Adapta la fila de Prisma a la tarifa del motor de precios. */
function tarifaDe(barco: {
  precioBaseDia: number;
  limpieza: number;
  tasaPortuariaDia: number;
  patronDia: number | null;
  fianza: number;
  consumoLitrosHora: number;
  descuentoSemana: number;
}) {
  return {
    precioBaseDia: barco.precioBaseDia,
    limpieza: barco.limpieza,
    tasaPortuariaDia: barco.tasaPortuariaDia,
    patronDia: barco.patronDia,
    fianza: barco.fianza,
    consumoLitrosHora: barco.consumoLitrosHora,
    descuentoSemana: barco.descuentoSemana,
  };
}

const GRUPOS = {
  navegacion: "Navegación",
  confort: "Confort",
  ocio: "Ocio",
  seguridad: "Seguridad",
} as const;

export default async function FichaBarco(props: PageProps<"/barco/[slug]">) {
  const { slug } = await props.params;
  const barco = await obtenerBarco(slug);
  if (!barco) notFound();

  const destino = barco.puerto.destino;
  const temporada = temporadaDe(new Date(), destino.mesesAlta);
  const tarifa = tarifaDe(barco);
  const precioDia = precioTodoIncluidoPorDia(tarifa, temporada);
  const similares = await barcosSimilares(slug, destino.slug, barco.tipo.slug);

  const porGrupo = Object.entries(GRUPOS).map(([clave, titulo]) => ({
    titulo,
    piezas: barco.equipamiento.filter((e) => e.grupo === clave),
  }));

  const especificaciones = [
    { etiqueta: "Eslora", valor: eslora(barco.esloraCm) },
    { etiqueta: "Capacidad", valor: plural(barco.capacidad, "plaza", "plazas") },
    ...(barco.camarotes > 0
      ? [{ etiqueta: "Camarotes", valor: entero(barco.camarotes) }]
      : []),
    ...(barco.aseos > 0 ? [{ etiqueta: "Aseos", valor: entero(barco.aseos) }] : []),
    ...(barco.potenciaCv > 0
      ? [{ etiqueta: "Potencia", valor: `${entero(barco.potenciaCv)} cv` }]
      : []),
    { etiqueta: "Año", valor: entero(barco.anio) },
    ...(barco.consumoLitrosHora > 0
      ? [{ etiqueta: "Consumo", valor: `${barco.consumoLitrosHora} l/h` }]
      : []),
    { etiqueta: "Titulación", valor: barco.requiereTitulacion ? "Necesaria" : "No hace falta" },
  ];

  return (
    <>
      <JsonLd
        datos={barcoJsonLd({
          nombre: `${barco.nombre} · ${destino.nombre}`,
          descripcion: barco.descripcion,
          ruta: rutas.barco(slug),
          imagenes: [],
          fabricante: barco.fabricante,
          precioDia,
          valoracion: barco.valoracion,
          numOpiniones: barco.numOpiniones,
          disponible: true,
        })}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Migas
          migas={[
            { nombre: "Inicio", ruta: rutas.home() },
            { nombre: "Alquiler de barcos", ruta: rutas.busqueda() },
            { nombre: destino.nombre, ruta: rutas.destino(destino.slug) },
            { nombre: barco.nombre, ruta: rutas.barco(slug) },
          ]}
        />
      </div>

      {/* ------------------------------------------------------- galería */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-2 overflow-hidden rounded-carta sm:grid-cols-4 sm:grid-rows-2">
          {barco.imagenes.slice(0, 4).map((imagen, i) => (
            <div
              key={imagen.id}
              className={`overflow-hidden bg-superficie-alt ${
                i === 0
                  ? "aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto"
                  : "hidden aspect-[4/3] sm:block"
              }`}
            >
              <FotoBarco
                token={imagen.url}
                alt={imagen.alt}
                prioridad={i === 0}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:gap-12">
        {/* ----------------------------------------------------- columna */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Etiqueta>{barco.tipo.nombre}</Etiqueta>
            {!barco.requiereTitulacion && <Etiqueta tono="acento">Sin licencia</Etiqueta>}
            {barco.reservaInstantanea && (
              <Etiqueta tono="exito">Reserva inmediata</Etiqueta>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-texto sm:text-4xl">
            {barco.nombre}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Estrellas nota={barco.valoracion} opiniones={barco.numOpiniones} tamano="grande" />
            <span className="text-texto-suave">
              {barco.puerto.nombre} ·{" "}
              <Link
                href={rutas.destino(destino.slug)}
                className="font-medium text-acento hover:underline"
              >
                {destino.nombre}
              </Link>
            </span>
          </div>

          <p className="mt-6 max-w-[68ch] leading-relaxed text-texto-suave">
            {barco.descripcion}
          </p>

          {/* Ficha técnica */}
          <section className="mt-9" aria-labelledby="ficha">
            <h2 id="ficha" className="font-display text-2xl font-semibold text-texto">
              Ficha técnica
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {especificaciones.map((spec) => (
                <div key={spec.etiqueta}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                    {spec.etiqueta}
                  </dt>
                  <dd className="cifra mt-1 font-medium text-texto">{spec.valor}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Equipamiento */}
          <section className="mt-9" aria-labelledby="equipamiento">
            <h2 id="equipamiento" className="font-display text-2xl font-semibold text-texto">
              Equipamiento a bordo
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {porGrupo
                .filter((g) => g.piezas.length > 0)
                .map((grupo) => (
                  <div key={grupo.titulo}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                      {grupo.titulo}
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {grupo.piezas.map((pieza) => (
                        <li
                          key={pieza.id}
                          className="flex items-center gap-2 text-sm text-texto"
                        >
                          <Tic />
                          {pieza.nombre}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </section>

          {/* Propietario */}
          <section className="mt-9" aria-labelledby="propietario">
            <h2 id="propietario" className="font-display text-2xl font-semibold text-texto">
              Quién lo alquila
            </h2>
            <div className="mt-4 flex items-start gap-4 rounded-carta border border-borde bg-superficie p-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-marca-suave font-display text-lg font-semibold text-marca"
                aria-hidden="true"
              >
                {barco.propietario.nombre.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-texto">
                  {barco.propietario.nombre}
                  {barco.propietario.superAnfitrion && (
                    <span className="ml-2 align-middle">
                      <Etiqueta tono="acento">Superanfitrión</Etiqueta>
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-texto-suave">
                  {barco.propietario.clase === "empresa"
                    ? "Empresa de chárter"
                    : "Propietario particular"}{" "}
                  · Responde en unos {barco.propietario.respondeEnMin} minutos
                </p>
              </div>
            </div>
          </section>

          {/* Opiniones */}
          <section className="mt-9" aria-labelledby="opiniones">
            <h2 id="opiniones" className="font-display text-2xl font-semibold text-texto">
              Opiniones
            </h2>
            <div className="mt-4 space-y-4">
              {barco.opiniones.map((opinion) => (
                <article
                  key={opinion.id}
                  className="rounded-carta border border-borde bg-superficie p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-texto">{opinion.autor}</p>
                    <p className="text-sm text-texto-tenue">{mesYAno(opinion.fecha)}</p>
                  </div>
                  <div className="mt-1.5">
                    <Estrellas nota={opinion.nota} />
                  </div>
                  <p className="mt-3 leading-relaxed text-texto-suave">{opinion.texto}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* ------------------------------------------------------- lateral */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reserva
            tarifa={tarifa}
            temporada={temporada}
            minimoDias={barco.minimoDias}
            reservaInstantanea={barco.reservaInstantanea}
            requiereTitulacion={barco.requiereTitulacion}
          />
        </aside>
      </div>

      {/* ------------------------------------------------------ similares */}
      {similares.length > 0 && (
        <section className="border-t border-borde bg-superficie">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-texto sm:text-3xl">
              Otros barcos en {destino.nombre}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similares.map((similar) => (
                <TarjetaBarco key={similar.slug} barco={similar} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Tic() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0 text-exito"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5l3.2 3.2L13 5" />
    </svg>
  );
}
