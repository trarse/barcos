import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FotoBarco } from "@/components/foto-barco";
import { Migas, migasBase } from "@/components/migas";
import { barcosParaComparar } from "@/lib/consultas";
import {
  cruzarEquipamiento,
  leerSeleccion,
  resolverFila,
  type Fila,
} from "@/lib/comparador";
import { entero, eslora, euro, valoracion as formatearNota } from "@/lib/formato";
import { esIdioma, type Idioma } from "@/lib/idiomas";
import {
  HORAS_NAVEGACION_DIA,
  PRECIO_LITRO,
  precioTodoIncluidoPorDia,
  temporadaDe,
} from "@/lib/precio";
import { alternativas, ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

/**
 * Comparativa lado a lado.
 *
 * Es la funcionalidad que no tiene ninguna plataforma del sector: hoy el
 * usuario abre pestañas y compara de memoria. La selección viaja en la URL,
 * así que una comparativa se puede mandar por WhatsApp.
 *
 * Se marca `noindex` a propósito: son combinaciones infinitas del mismo
 * contenido y no aportan nada al índice. Los enlaces sí se siguen.
 */
export async function generateMetadata(
  props: PageProps<"/[idioma]/comparar">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const t = textos(idioma);

  return {
    title: t.comparar.titulo,
    description: t.comparar.descripcion,
    alternates: alternativas({ tipo: "comparar" }, idioma),
    // Son combinaciones infinitas del mismo contenido: no aportan al índice.
    robots: { index: false, follow: true },
  };
}

export default async function Comparar(props: PageProps<"/[idioma]/comparar">) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);
  const query = await props.searchParams;
  const crudo = Array.isArray(query.barcos) ? query.barcos[0] : query.barcos;
  const slugs = leerSeleccion(crudo);

  const barcos = await barcosParaComparar(slugs);

  if (barcos.length < 2) {
    return <NadaQueComparar encontrados={barcos.length} idioma={idioma} />;
  }

  const hoy = new Date();

  const calculados = barcos.map((barco) => {
    const temporada = temporadaDe(hoy, barco.puerto.destino.mesesAlta);
    const precioDia = precioTodoIncluidoPorDia(
      {
        precioBaseDia: barco.precioBaseDia,
        limpieza: barco.limpieza,
        tasaPortuariaDia: barco.tasaPortuariaDia,
        patronDia: barco.patronDia,
        fianza: barco.fianza,
        consumoLitrosHora: barco.consumoLitrosHora,
        descuentoSemana: barco.descuentoSemana,
      },
      temporada,
    );
    const combustibleDia = Math.round(
      barco.consumoLitrosHora * HORAS_NAVEGACION_DIA * PRECIO_LITRO,
    );
    return { barco, precioDia, combustibleDia };
  });

  const columna = <T,>(f: (c: (typeof calculados)[number]) => T) =>
    calculados.map(f);

  const grupos: { titulo: string; filas: Fila[] }[] = [
    {
      titulo: t.comparar.grupos.cuesta,
      filas: [
        resolverFila(
          t.comparar.filas.precioDia,
          columna((c) => euro(c.precioDia)),
          columna((c) => c.precioDia),
          "menor",
        ),
        resolverFila(
          t.comparar.filas.tarifaBase,
          columna((c) => euro(c.barco.precioBaseDia)),
          columna((c) => c.barco.precioBaseDia),
          "menor",
        ),
        resolverFila(
          t.comparar.filas.combustibleDia,
          columna((c) =>
            c.combustibleDia > 0 ? euro(c.combustibleDia) : t.comparar.valores.noConsume,
          ),
          columna((c) => c.combustibleDia),
          "menor",
        ),
        resolverFila(
          t.comparar.filas.limpieza,
          columna((c) => euro(c.barco.limpieza)),
          columna((c) => c.barco.limpieza),
          "menor",
        ),
        resolverFila(
          t.comparar.filas.amarreDia,
          columna((c) => euro(c.barco.tasaPortuariaDia)),
          columna((c) => c.barco.tasaPortuariaDia),
          "menor",
        ),
        resolverFila(
          t.comparar.filas.patronDia,
          columna((c) =>
            c.barco.patronDia === null ? t.comparar.valores.noDisponible : euro(c.barco.patronDia),
          ),
          columna((c) => c.barco.patronDia),
          "menor",
        ),
        resolverFila(
          t.comparar.filas.fianza,
          columna((c) => euro(c.barco.fianza)),
          columna((c) => c.barco.fianza),
          "menor",
        ),
        resolverFila(
          t.comparar.filas.descuentoSemana,
          columna((c) =>
            c.barco.descuentoSemana > 0 ? `${c.barco.descuentoSemana} %` : t.comparar.valores.sinDescuento,
          ),
          columna((c) => c.barco.descuentoSemana),
          "mayor",
        ),
      ],
    },
    {
      titulo: t.comparar.grupos.barco,
      filas: [
        resolverFila(
          t.comparar.filas.plazas,
          columna((c) => entero(c.barco.capacidad)),
          columna((c) => c.barco.capacidad),
          "mayor",
        ),
        resolverFila(
          t.comparar.filas.camarotes,
          columna((c) => (c.barco.camarotes > 0 ? entero(c.barco.camarotes) : t.comparar.valores.sinCamarotes)),
          columna((c) => c.barco.camarotes),
          "mayor",
        ),
        resolverFila(
          t.comparar.filas.aseos,
          columna((c) => (c.barco.aseos > 0 ? entero(c.barco.aseos) : t.comparar.valores.sinAseo)),
          columna((c) => c.barco.aseos),
          "mayor",
        ),
        resolverFila(
          t.comparar.filas.eslora,
          columna((c) => eslora(c.barco.esloraCm)),
          columna((c) => c.barco.esloraCm),
          "mayor",
        ),
        resolverFila(
          t.comparar.filas.potencia,
          columna((c) => (c.barco.potenciaCv > 0 ? `${entero(c.barco.potenciaCv)} cv` : t.comparar.valores.sinMotor)),
          columna((c) => c.barco.potenciaCv),
          "ninguno",
        ),
        resolverFila(
          t.comparar.filas.consumo,
          columna((c) =>
            c.barco.consumoLitrosHora > 0 ? `${c.barco.consumoLitrosHora} l/h` : t.comparar.valores.noConsume,
          ),
          columna((c) => c.barco.consumoLitrosHora),
          "menor",
        ),
        resolverFila(
          t.comparar.filas.anio,
          columna((c) => entero(c.barco.anio)),
          columna((c) => c.barco.anio),
          "mayor",
        ),
        resolverFila(
          t.comparar.filas.tipo,
          columna(
            (c) =>
              t.tiposBarcoSingular[
                c.barco.tipo.slug as keyof typeof t.tiposBarcoSingular
              ] ?? c.barco.tipo.nombre,
          ),
          columna(() => null),
          "ninguno",
        ),
      ],
    },
    {
      titulo: t.comparar.grupos.condiciones,
      filas: [
        resolverFila(
          t.comparar.filas.titulacion,
          columna((c) => (c.barco.requiereTitulacion ? t.ficha.necesaria : t.ficha.noHaceFalta)),
          columna((c) => (c.barco.requiereTitulacion ? 0 : 1)),
          "mayor",
        ),
        resolverFila(
          t.comparar.filas.reserva,
          columna((c) => (c.barco.reservaInstantanea ? t.comparar.valores.inmediata : t.comparar.valores.bajoPeticion)),
          columna((c) => (c.barco.reservaInstantanea ? 1 : 0)),
          "mayor",
        ),
        resolverFila(
          t.comparar.filas.minimoDias,
          columna((c) => entero(c.barco.minimoDias)),
          columna((c) => c.barco.minimoDias),
          "menor",
        ),
        resolverFila(
          t.comparar.filas.valoracion,
          columna((c) => `${formatearNota(c.barco.valoracion)} (${entero(c.barco.numOpiniones)})`),
          columna((c) => c.barco.valoracion),
          "mayor",
        ),
        resolverFila(
          t.comparar.filas.puerto,
          columna((c) => c.barco.puerto.nombre),
          columna(() => null),
          "ninguno",
        ),
        resolverFila(
          t.comparar.filas.destino,
          columna((c) => c.barco.puerto.destino.nombre),
          columna(() => null),
          "ninguno",
        ),
      ],
    },
  ];

  const equipamiento = cruzarEquipamiento(
    barcos.map((b) => b.equipamiento.map((e) => ({ slug: e.slug, nombre: e.nombre }))),
  );

  const columnas = `minmax(11rem,1.1fr) repeat(${barcos.length}, minmax(9rem,1fr))`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:px-6">
      <Migas
        migas={[
          ...migasBase(idioma),
          { nombre: t.migas.comparar, pagina: { tipo: "comparar" } },
        ]}
        idioma={idioma}
      />

      <h1 className="mt-6 font-display text-3xl font-semibold text-texto sm:text-4xl">
        {t.comparar.encabezado(barcos.length)}
      </h1>
      <p className="mt-2 max-w-2xl text-texto-suave">
        {t.comparar.entradilla}
      </p>

      <div>
        <input type="checkbox" id="solo-diferencias" className="peer sr-only" />
        <label
          htmlFor="solo-diferencias"
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md border border-borde px-3.5 py-2 text-sm font-medium text-texto transition-colors peer-checked:border-acento peer-checked:bg-acento-suave peer-checked:text-acento peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--acento)]"
        >
          <span aria-hidden="true">⇅</span>
          {t.comparar.soloDiferencias}
        </label>

        <div className="tabla-comparativa mt-6 overflow-x-auto">
          <div className="min-w-3xl">
            {/* Cabecera con los barcos */}
            <div
              className="sticky top-16 z-20 grid gap-px border-b border-borde-fuerte bg-fondo pb-3"
              style={{ gridTemplateColumns: columnas }}
            >
              <div />
              {calculados.map(({ barco, precioDia }) => (
                <div key={barco.slug} className="px-2">
                  <div className="aspect-[4/3] overflow-hidden rounded bg-superficie-alt">
                    <FotoBarco
                      token={barco.imagenes[0]?.url ?? `carta:${barco.tipo.slug}:0`}
                      alt={barco.nombre}
                      className="h-full w-full"
                    />
                  </div>
                  <h2 className="mt-2 font-display text-base font-semibold leading-snug text-texto">
                    <Link
                      href={ruta({ tipo: "barco", slug: barco.slug }, idioma)}
                      className="hover:text-acento"
                    >
                      {barco.nombre}
                    </Link>
                  </h2>
                  <p className="cifra mt-1 font-display text-xl font-semibold text-acento">
                    {euro(precioDia)}
                    <span className="ml-1 font-sans text-xs font-normal text-texto-suave">
                      /día
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {grupos.map((grupo) => (
              <section key={grupo.titulo} className="mt-8">
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                  {grupo.titulo}
                </h3>

                {grupo.filas.map((fila) => (
                  <div
                    key={fila.etiqueta}
                    data-igual={fila.hayDiferencia ? "no" : "si"}
                    className="grid items-baseline gap-px border-t border-borde py-2.5"
                    style={{ gridTemplateColumns: columnas }}
                  >
                    <div className="px-2 text-sm text-texto-suave">
                      {fila.etiqueta}
                    </div>
                    {fila.valores.map((valor, i) => (
                      <div key={i} className="px-2">
                        <span
                          className={`cifra text-sm ${
                            fila.ganadores.includes(i)
                              ? "font-semibold text-exito"
                              : "text-texto"
                          }`}
                        >
                          {valor}
                        </span>
                        {fila.ganadores.includes(i) && (
                          <span className="sr-only"> {t.comparar.loMejor}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </section>
            ))}

            {/* Equipamiento */}
            <section className="mt-8">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                {t.comparar.grupos.equipamiento}
              </h3>
              {equipamiento.map((pieza) => (
                <div
                  key={pieza.slug}
                  data-igual={pieza.hayDiferencia ? "no" : "si"}
                  className="grid items-center gap-px border-t border-borde py-2.5"
                  style={{ gridTemplateColumns: columnas }}
                >
                  <div className="px-2 text-sm text-texto-suave">{pieza.nombre}</div>
                  {pieza.tienen.map((tiene, i) => (
                    <div key={i} className="px-2">
                      {tiene ? (
                        <span className="text-exito" title={t.comparar.valores.loLleva}>
                          <Tic />
                          <span className="sr-only">{t.comun.si}</span>
                        </span>
                      ) : (
                        <span className="text-texto-tenue" aria-hidden="true">
                          —
                        </span>
                      )}
                      {!tiene && <span className="sr-only">{t.comun.no}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </section>

            {/* Cierre: enlace a cada ficha */}
            <div
              className="mt-8 grid gap-px border-t border-borde-fuerte pt-5"
              style={{ gridTemplateColumns: columnas }}
            >
              <div />
              {barcos.map((barco) => (
                <div key={barco.slug} className="px-2">
                  <Link
                    href={ruta({ tipo: "barco", slug: barco.slug }, idioma)}
                    className="block rounded-md bg-marca px-3 py-2.5 text-center text-sm font-semibold text-fondo transition-opacity hover:opacity-90"
                  >
                    {t.comun.verFicha}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NadaQueComparar({
  encontrados,
  idioma,
}: {
  encontrados: number;
  idioma: Idioma;
}) {
  const t = textos(idioma);
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-texto">
        {t.comparar.hacenFaltaDos}
      </h1>
      <p className="mt-3 leading-relaxed text-texto-suave">
        {encontrados === 1 ? t.comparar.soloUno : t.comparar.ninguno}
      </p>
      <Link
        href={ruta({ tipo: "busqueda" }, idioma)}
        className="mt-8 inline-block rounded-md bg-marca px-6 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
      >
        {t.comparar.irResultados}
      </Link>
    </div>
  );
}

function Tic() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5l3.2 3.2L13 5" />
    </svg>
  );
}
