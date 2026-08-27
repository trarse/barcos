import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Migas } from "@/components/migas";
import { PanelFiltros } from "@/components/panel-filtros";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import {
  buscarBarcos,
  listarDestinos,
  listarEquipamiento,
  listarTipos,
  obtenerDestino,
  tiposEnDestino,
} from "@/lib/consultas";
import { FILTROS_VACIOS } from "@/lib/filtros";
import { entero, euro } from "@/lib/formato";
import { listaJsonLd, rutas } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const destinos = await listarDestinos();
  return destinos.map((d) => ({ destino: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/alquiler-barcos/[destino]">,
): Promise<Metadata> {
  const { destino: slug } = await props.params;
  const destino = await obtenerDestino(slug);
  if (!destino) return { title: "Destino no encontrado" };

  return {
    title: destino.titular,
    description: destino.descripcion,
    alternates: { canonical: rutas.destino(slug) },
    openGraph: {
      type: "website",
      title: destino.titular,
      description: destino.descripcion,
      url: rutas.destino(slug),
    },
  };
}

export default async function LandingDestino(
  props: PageProps<"/alquiler-barcos/[destino]">,
) {
  const { destino: slug } = await props.params;

  const destino = await obtenerDestino(slug);
  if (!destino) notFound();

  /**
   * La landing no lee `searchParams` a propósito: hacerlo la convertiría en
   * una página dinámica y perdería el prerenderizado, que es justo lo que
   * necesita la página que tiene que posicionar. Filtrar lleva al buscador,
   * que sí es dinámico por naturaleza.
   */
  const filtros = { ...FILTROS_VACIOS, destino: slug };

  const [{ barcos, total }, tipos, equipamiento, tiposAqui, destinos] =
    await Promise.all([
      buscarBarcos(filtros),
      listarTipos(),
      listarEquipamiento(),
      tiposEnDestino(slug),
      listarDestinos(),
    ]);

  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  const otros = destinos.filter((d) => d.slug !== slug).slice(0, 6);

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          destino.titular,
          barcos.map((b) => ({ nombre: b.nombre, ruta: rutas.barco(b.slug) })),
        )}
      />

      {/* --------------------------------------------------------- cabecera */}
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: "Inicio", ruta: rutas.home() },
              { nombre: "Alquiler de barcos", ruta: rutas.busqueda() },
              { nombre: destino.nombre, ruta: rutas.destino(slug) },
            ]}
          />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            {destino.provincia} · {destino.comunidad}
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {destino.titular}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {destino.descripcion}
          </p>

          {total > 0 && (
            <p className="mt-5 text-texto-suave">
              <strong className="cifra font-semibold text-texto">
                {entero(total)} barcos
              </strong>{" "}
              disponibles desde{" "}
              <strong className="cifra font-semibold text-texto">{euro(masBarato)}</strong>{" "}
              al día con todo incluido.
            </p>
          )}
        </div>
      </section>

      {/* -------------------------------------------- enlaces de cola larga */}
      {tiposAqui.length > 1 && (
        <nav
          aria-label={`Tipos de barco en ${destino.nombre}`}
          className="border-b border-borde bg-superficie"
        >
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <ul className="flex flex-wrap gap-2">
              {tiposAqui.map((tipo) => (
                <li key={tipo.slug}>
                  <Link
                    href={rutas.destinoTipo(slug, tipo.slug)}
                    className="inline-flex items-baseline gap-1.5 rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                  >
                    {tipo.plural} en {destino.nombre}
                    <span className="cifra text-xs text-texto-tenue">{tipo.n}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* ------------------------------------------------------ resultados */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
          <div>
            <details className="lg:hidden">
              <summary className="cursor-pointer rounded-md border border-borde bg-superficie px-4 py-3 font-medium text-texto">
                Filtrar y ordenar
              </summary>
              <div className="mt-4">
                <PanelFiltros
                  filtros={filtros}
                  tipos={tipos}
                  equipamiento={equipamiento}
                  accion={rutas.busqueda()}
                  destinoFijo={slug}
                />
              </div>
            </details>

            <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
              <PanelFiltros
                filtros={filtros}
                tipos={tipos}
                equipamiento={equipamiento}
                accion={rutas.destino(slug)}
                destinoFijo={slug}
              />
            </aside>
          </div>

          <div>
            {barcos.length === 0 ? (
              <p className="rounded-carta border border-borde bg-superficie p-8 text-center text-texto-suave">
                Todavía no hay flota publicada en {destino.nombre}.
              </p>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {barcos.map((barco, i) => (
                    <TarjetaBarco key={barco.slug} barco={barco} prioridad={i < 3} />
                  ))}
                </div>

                {total > barcos.length && (
                  <div className="mt-8 text-center">
                    <Link
                      href={`${rutas.busqueda()}?destino=${slug}`}
                      className="inline-block rounded-md bg-marca px-6 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
                    >
                      Ver los {entero(total)} barcos de {destino.nombre}
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- texto largo */}
      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
            <div>
              <h2 className="font-display text-2xl font-semibold text-texto sm:text-3xl">
                Navegar en {destino.nombre}
              </h2>
              <div className="mt-5">
                <Contenido texto={destino.contenido} />
              </div>
            </div>

            <aside>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                Puertos de entrega
              </h2>
              <ul className="mt-3 space-y-2">
                {destino.puertos.map((puerto) => (
                  <li key={puerto.id} className="text-sm text-texto">
                    {puerto.nombre}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                Temporada alta
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-texto-suave">
                {mesesEnTexto(destino.mesesAlta)}. Fuera de esos meses la tarifa
                base baja entre un 25 y un 45 %.
              </p>
            </aside>
          </div>

          <div className="mt-14 max-w-3xl">
            <Faq
              preguntas={destino.preguntas.map((p) => ({
                pregunta: p.pregunta,
                respuesta: p.respuesta,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- otros destinos */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-texto">
          Otros destinos
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {otros.map((otro) => (
            <li key={otro.slug}>
              <Link
                href={rutas.destino(otro.slug)}
                className="inline-block rounded-md border border-borde px-3.5 py-2 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
              >
                Barcos en {otro.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

const NOMBRES_MES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function mesesEnTexto(meses: string): string {
  const nombres = meses
    .split(",")
    .map((m) => Number.parseInt(m.trim(), 10))
    .filter((m) => m >= 1 && m <= 12)
    .map((m) => NOMBRES_MES[m - 1]);

  if (nombres.length === 0) return "Sin temporada alta declarada";
  if (nombres.length === 1) return `Solo ${nombres[0]}`;
  return `${nombres.slice(0, -1).join(", ")} y ${nombres.at(-1)}`;
}
