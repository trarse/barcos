import type { Metadata } from "next";
import Link from "next/link";

import { FotoBarco } from "@/components/foto-barco";
import { Migas } from "@/components/migas";
import { barcosParaComparar } from "@/lib/consultas";
import {
  cruzarEquipamiento,
  leerSeleccion,
  resolverFila,
  type Fila,
} from "@/lib/comparador";
import { entero, eslora, euro, valoracion as formatearNota } from "@/lib/formato";
import {
  HORAS_NAVEGACION_DIA,
  PRECIO_LITRO,
  precioTodoIncluidoPorDia,
  temporadaDe,
} from "@/lib/precio";
import { rutas } from "@/lib/seo";

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
export const metadata: Metadata = {
  title: "Comparar barcos",
  description:
    "Compara hasta tres barcos lado a lado: precio con todo incluido, consumo, capacidad, equipamiento y condiciones.",
  robots: { index: false, follow: true },
};

export default async function Comparar(props: PageProps<"/comparar">) {
  const query = await props.searchParams;
  const crudo = Array.isArray(query.barcos) ? query.barcos[0] : query.barcos;
  const slugs = leerSeleccion(crudo);

  const barcos = await barcosParaComparar(slugs);

  if (barcos.length < 2) {
    return <NadaQueComparar encontrados={barcos.length} />;
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
      titulo: "Lo que cuesta",
      filas: [
        resolverFila(
          "Precio al día, todo incluido",
          columna((c) => euro(c.precioDia)),
          columna((c) => c.precioDia),
          "menor",
        ),
        resolverFila(
          "Tarifa base anunciada",
          columna((c) => euro(c.barco.precioBaseDia)),
          columna((c) => c.barco.precioBaseDia),
          "menor",
        ),
        resolverFila(
          "Combustible estimado al día",
          columna((c) =>
            c.combustibleDia > 0 ? euro(c.combustibleDia) : "No consume",
          ),
          columna((c) => c.combustibleDia),
          "menor",
        ),
        resolverFila(
          "Limpieza final",
          columna((c) => euro(c.barco.limpieza)),
          columna((c) => c.barco.limpieza),
          "menor",
        ),
        resolverFila(
          "Amarre y tasas al día",
          columna((c) => euro(c.barco.tasaPortuariaDia)),
          columna((c) => c.barco.tasaPortuariaDia),
          "menor",
        ),
        resolverFila(
          "Patrón al día",
          columna((c) =>
            c.barco.patronDia === null ? "No disponible" : euro(c.barco.patronDia),
          ),
          columna((c) => c.barco.patronDia),
          "menor",
        ),
        resolverFila(
          "Fianza",
          columna((c) => euro(c.barco.fianza)),
          columna((c) => c.barco.fianza),
          "menor",
        ),
        resolverFila(
          "Descuento a partir de 7 días",
          columna((c) =>
            c.barco.descuentoSemana > 0 ? `${c.barco.descuentoSemana} %` : "Sin descuento",
          ),
          columna((c) => c.barco.descuentoSemana),
          "mayor",
        ),
      ],
    },
    {
      titulo: "El barco",
      filas: [
        resolverFila(
          "Plazas",
          columna((c) => entero(c.barco.capacidad)),
          columna((c) => c.barco.capacidad),
          "mayor",
        ),
        resolverFila(
          "Camarotes",
          columna((c) => (c.barco.camarotes > 0 ? entero(c.barco.camarotes) : "Sin camarotes")),
          columna((c) => c.barco.camarotes),
          "mayor",
        ),
        resolverFila(
          "Aseos",
          columna((c) => (c.barco.aseos > 0 ? entero(c.barco.aseos) : "Sin aseo")),
          columna((c) => c.barco.aseos),
          "mayor",
        ),
        resolverFila(
          "Eslora",
          columna((c) => eslora(c.barco.esloraCm)),
          columna((c) => c.barco.esloraCm),
          "mayor",
        ),
        resolverFila(
          "Potencia",
          columna((c) => (c.barco.potenciaCv > 0 ? `${entero(c.barco.potenciaCv)} cv` : "Sin motor")),
          columna((c) => c.barco.potenciaCv),
          "ninguno",
        ),
        resolverFila(
          "Consumo",
          columna((c) =>
            c.barco.consumoLitrosHora > 0 ? `${c.barco.consumoLitrosHora} l/h` : "No consume",
          ),
          columna((c) => c.barco.consumoLitrosHora),
          "menor",
        ),
        resolverFila(
          "Año",
          columna((c) => entero(c.barco.anio)),
          columna((c) => c.barco.anio),
          "mayor",
        ),
        resolverFila(
          "Tipo",
          columna((c) => c.barco.tipo.nombre),
          columna(() => null),
          "ninguno",
        ),
      ],
    },
    {
      titulo: "Condiciones",
      filas: [
        resolverFila(
          "Titulación",
          columna((c) => (c.barco.requiereTitulacion ? "Necesaria" : "No hace falta")),
          columna((c) => (c.barco.requiereTitulacion ? 0 : 1)),
          "mayor",
        ),
        resolverFila(
          "Reserva",
          columna((c) => (c.barco.reservaInstantanea ? "Inmediata" : "Bajo petición")),
          columna((c) => (c.barco.reservaInstantanea ? 1 : 0)),
          "mayor",
        ),
        resolverFila(
          "Mínimo de días",
          columna((c) => entero(c.barco.minimoDias)),
          columna((c) => c.barco.minimoDias),
          "menor",
        ),
        resolverFila(
          "Valoración",
          columna((c) => `${formatearNota(c.barco.valoracion)} (${entero(c.barco.numOpiniones)})`),
          columna((c) => c.barco.valoracion),
          "mayor",
        ),
        resolverFila(
          "Puerto",
          columna((c) => c.barco.puerto.nombre),
          columna(() => null),
          "ninguno",
        ),
        resolverFila(
          "Destino",
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
          { nombre: "Inicio", ruta: rutas.home() },
          { nombre: "Alquiler de barcos", ruta: rutas.busqueda() },
          { nombre: "Comparar", ruta: "/comparar" },
        ]}
      />

      <h1 className="mt-6 font-display text-3xl font-semibold text-texto sm:text-4xl">
        {barcos.length} barcos, lado a lado
      </h1>
      <p className="mt-2 max-w-2xl text-texto-suave">
        El precio de arriba es el total con combustible, limpieza, amarre, tasas
        e IVA. Lo mejor de cada fila va marcado.
      </p>

      <div>
        <input type="checkbox" id="solo-diferencias" className="peer sr-only" />
        <label
          htmlFor="solo-diferencias"
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md border border-borde px-3.5 py-2 text-sm font-medium text-texto transition-colors peer-checked:border-acento peer-checked:bg-acento-suave peer-checked:text-acento peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--acento)]"
        >
          <span aria-hidden="true">⇅</span>
          Enseñar solo las diferencias
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
                      href={rutas.barco(barco.slug)}
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
                          <span className="sr-only"> (lo mejor de la fila)</span>
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
                Equipamiento
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
                        <span className="text-exito" title="Lo lleva">
                          <Tic />
                          <span className="sr-only">Sí</span>
                        </span>
                      ) : (
                        <span className="text-texto-tenue" aria-hidden="true">
                          —
                        </span>
                      )}
                      {!tiene && <span className="sr-only">No</span>}
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
                    href={rutas.barco(barco.slug)}
                    className="block rounded-md bg-marca px-3 py-2.5 text-center text-sm font-semibold text-fondo transition-opacity hover:opacity-90"
                  >
                    Ver ficha
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

function NadaQueComparar({ encontrados }: { encontrados: number }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-texto">
        Hacen falta al menos dos barcos
      </h1>
      <p className="mt-3 leading-relaxed text-texto-suave">
        {encontrados === 1
          ? "Solo hay uno seleccionado. Marca «Comparar» en otra tarjeta de resultados y vuelve aquí."
          : "Marca «Comparar» en las tarjetas de los barcos que quieras enfrentar. Puedes elegir hasta tres."}
      </p>
      <Link
        href={rutas.busqueda()}
        className="mt-8 inline-block rounded-md bg-marca px-6 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
      >
        Ir a los resultados
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
