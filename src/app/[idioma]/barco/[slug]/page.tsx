import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Estrellas } from "@/components/estrellas";
import { FotoBarco } from "@/components/foto-barco";
import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { Reserva } from "@/components/reserva";
import { Etiqueta, TarjetaBarco } from "@/components/tarjeta-barco";
import { barcosSimilares, obtenerBarco, slugsDeBarcos } from "@/lib/consultas";
import { entero, eslora, euro, mesYAno } from "@/lib/formato";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { precioTodoIncluidoPorDia, temporadaDe } from "@/lib/precio";
import { alternativas, ruta } from "@/lib/rutas";
import { barcoJsonLd } from "@/lib/seo";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export async function generateStaticParams() {
  const barcos = await slugsDeBarcos();
  return IDIOMAS.flatMap((idioma) => barcos.map(({ slug }) => ({ idioma, slug })));
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

export async function generateMetadata(
  props: PageProps<"/[idioma]/barco/[slug]">,
): Promise<Metadata> {
  const { idioma, slug } = await props.params;
  if (!esIdioma(idioma)) return {};

  const barco = await obtenerBarco(slug);
  if (!barco) return { title: "404" };

  const t = textos(idioma);
  const temporada = temporadaDe(new Date(), barco.puerto.destino.mesesAlta);
  const precio = precioTodoIncluidoPorDia(tarifaDe(barco), temporada);
  // Si el municipio tiene varios puertos, el título los distingue: sin esto
  // dos barcos iguales en Calpe y en Les Bassetes comparten <title>.
  const base = `${barco.nombre} ${t.busqueda.enDestino(barco.puerto.destino.nombre)}`;
  // El nombre del puerto suele repetir el del municipio ("Real Club Náutico
  // de Calpe" dentro de Calpe): se recorta esa parte para no gastar en el
  // title los caracteres que Google recorta.
  const puertoCorto = barco.puerto.nombre
    .replace(new RegExp(`\s*(de\s+)?${barco.puerto.destino.nombre}\s*$`, "i"), "")
    .replace(/^(Puerto|Marina|Club Náutico|Real Club Náutico)\s+(de\s+)?/i, "")
    .trim();
  const titulo =
    barco.puerto.destino._count.puertos > 1 && puertoCorto
      ? `${base} — ${puertoCorto}`
      : base;

  return {
    title: titulo,
    description: t.ficha.metaDescripcion(
      barco.nombre,
      barco.puerto.nombre,
      euro(precio),
      entero(barco.capacidad),
    ),
    alternates: alternativas({ tipo: "barco", slug }, idioma),
    openGraph: {
      type: "website",
      title: titulo,
      url: alternativas({ tipo: "barco", slug }, idioma).canonical,
    },
  };
}

export default async function FichaBarco(props: PageProps<"/[idioma]/barco/[slug]">) {
  const { idioma, slug } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const barco = await obtenerBarco(slug);
  if (!barco) notFound();

  const t = textos(idioma);
  // La descripcion la escribe el armador en su idioma. Si no coincide con
  // el de la pagina no se pinta ni entra en el Product: la ficha se sostiene
  // con los datos tecnicos, el equipamiento y el desglose de precio, que si
  // estan traducidos.
  const prosaTraducida = esIdioma(barco.idiomaProsa) && barco.idiomaProsa === idioma;
  const destino = barco.puerto.destino;
  const temporada = temporadaDe(new Date(), destino.mesesAlta);
  const tarifa = tarifaDe(barco);
  const precioDia = precioTodoIncluidoPorDia(tarifa, temporada);
  const similares = await barcosSimilares(slug, destino.slug, barco.tipo.slug);

  const grupos = [
    { clave: "navegacion", titulo: t.ficha.grupos.navegacion },
    { clave: "confort", titulo: t.ficha.grupos.confort },
    { clave: "ocio", titulo: t.ficha.grupos.ocio },
    { clave: "seguridad", titulo: t.ficha.grupos.seguridad },
  ].map((g) => ({
    titulo: g.titulo,
    piezas: barco.equipamiento.filter((e) => e.grupo === g.clave),
  }));

  const especificaciones = [
    { etiqueta: t.ficha.eslora, valor: eslora(barco.esloraCm) },
    {
      etiqueta: t.ficha.capacidad,
      valor: `${entero(barco.capacidad)} ${t.comun.plazas}`,
    },
    ...(barco.camarotes > 0
      ? [{ etiqueta: t.ficha.camarotes, valor: entero(barco.camarotes) }]
      : []),
    ...(barco.aseos > 0 ? [{ etiqueta: t.ficha.aseos, valor: entero(barco.aseos) }] : []),
    ...(barco.potenciaCv > 0
      ? [{ etiqueta: t.ficha.potencia, valor: `${entero(barco.potenciaCv)} cv` }]
      : []),
    { etiqueta: t.ficha.anio, valor: entero(barco.anio) },
    ...(barco.consumoLitrosHora > 0
      ? [{ etiqueta: t.ficha.consumo, valor: `${barco.consumoLitrosHora} l/h` }]
      : []),
    {
      etiqueta: t.ficha.titulacion,
      valor: barco.requiereTitulacion ? t.ficha.necesaria : t.ficha.noHaceFalta,
    },
  ];

  const tipoNombre =
    t.tiposBarcoSingular[barco.tipo.slug as keyof typeof t.tiposBarcoSingular] ??
    barco.tipo.nombre;

  return (
    <>
      <JsonLd
        datos={barcoJsonLd({
          nombre: `${barco.nombre} · ${destino.nombre}`,
          descripcion: prosaTraducida ? barco.descripcion : undefined,
          ruta: ruta({ tipo: "barco", slug }, idioma),
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
            ...migasBase(idioma),
            { nombre: destino.nombre, pagina: { tipo: "destino", destino: destino.slug } },
            { nombre: barco.nombre, pagina: { tipo: "barco", slug } },
          ]}
          idioma={idioma}
        />
      </div>

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
                alt={`${barco.nombre} · ${barco.puerto.nombre}`}
                prioridad={i === 0}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Etiqueta>{tipoNombre}</Etiqueta>
            {!barco.requiereTitulacion && (
              <Etiqueta tono="acento">{t.comun.sinLicencia}</Etiqueta>
            )}
            {barco.reservaInstantanea && (
              <Etiqueta tono="exito">{t.comun.reservaInmediata}</Etiqueta>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-texto sm:text-4xl">
            {barco.nombre}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Estrellas
              nota={barco.valoracion}
              opiniones={barco.numOpiniones}
              idioma={idioma}
              tamano="grande"
            />
            <span className="text-texto-suave">
              {barco.puerto.nombre} ·{" "}
              <Link
                href={ruta({ tipo: "destino", destino: destino.slug }, idioma)}
                className="font-medium text-acento hover:underline"
              >
                {destino.nombre}
              </Link>
            </span>
          </div>

          {prosaTraducida && (
            <p className="mt-6 max-w-[68ch] leading-relaxed text-texto-suave">
              {barco.descripcion}
            </p>
          )}

          <section className="mt-9" aria-labelledby="ficha">
            <h2 id="ficha" className="font-display text-2xl font-semibold text-texto">
              {t.ficha.fichaTecnica}
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

          <section className="mt-9" aria-labelledby="equipamiento">
            <h2
              id="equipamiento"
              className="font-display text-2xl font-semibold text-texto"
            >
              {t.ficha.equipamiento}
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {grupos
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

          <section className="mt-9" aria-labelledby="propietario">
            <h2
              id="propietario"
              className="font-display text-2xl font-semibold text-texto"
            >
              {t.ficha.quienAlquila}
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
                      <Etiqueta tono="acento">{t.ficha.superAnfitrion}</Etiqueta>
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-texto-suave">
                  {barco.propietario.clase === "empresa"
                    ? t.ficha.empresa
                    : t.ficha.particular}{" "}
                  · {t.ficha.respondeEn(barco.propietario.respondeEnMin)}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-9" aria-labelledby="opiniones">
            <h2 id="opiniones" className="font-display text-2xl font-semibold text-texto">
              {t.ficha.opiniones}
            </h2>
            <div className="mt-4 space-y-4">
              {barco.opiniones.map((opinion) => (
                <article
                  key={opinion.id}
                  className="rounded-carta border border-borde bg-superficie p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-texto">{opinion.autor}</p>
                    <p className="text-sm text-texto-tenue">
                      {mesYAno(opinion.fecha, idioma)}
                    </p>
                  </div>
                  <div className="mt-1.5">
                    <Estrellas nota={opinion.nota} idioma={idioma} />
                  </div>
                  <p className="mt-3 leading-relaxed text-texto-suave">{opinion.texto}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reserva
            barcoId={barco.id}
            tarifa={tarifa}
            temporada={temporada}
            mesesAlta={destino.mesesAlta}
            capacidad={barco.capacidad}
            minimoDias={barco.minimoDias}
            reservaInstantanea={barco.reservaInstantanea}
            requiereTitulacion={barco.requiereTitulacion}
            idioma={idioma}
          />
        </aside>
      </div>

      {similares.length > 0 && (
        <section className="border-t border-borde bg-superficie">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-texto sm:text-3xl">
              {t.ficha.otrosEn(destino.nombre)}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similares.map((similar) => (
                <TarjetaBarco key={similar.slug} barco={similar} idioma={idioma} />
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
