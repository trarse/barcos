import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { PanelFiltros } from "@/components/panel-filtros";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import {
  buscarBarcos,
  listarDestinos,
  lugaresDesde,
  listarEquipamiento,
  listarTipos,
  obtenerDestino,
  tiposEnDestino,
} from "@/lib/consultas";
import { FILTROS_VACIOS } from "@/lib/filtros";
import { entero, euro } from "@/lib/formato";
import { esIdioma, IDIOMA_POR_DEFECTO, IDIOMAS, type Idioma } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { descripcionCorta } from "@/lib/prosa";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export async function generateStaticParams() {
  const destinos = await listarDestinos();
  return IDIOMAS.flatMap((idioma) =>
    destinos.map((d) => ({ idioma, destino: d.slug })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/alquiler-barcos/[destino]">,
): Promise<Metadata> {
  const { idioma, destino: slug } = await props.params;
  if (!esIdioma(idioma)) return {};

  const destino = await obtenerDestino(slug);
  if (!destino) return { title: "404" };

  const t = textos(idioma);
  const titulo = `${t.busqueda.tituloGenerico} ${t.busqueda.enDestino(destino.nombre)}`;

  return {
    title: titulo,
    description: descripcionCorta(destino, idioma),
    alternates: alternativas({ tipo: "destino", destino: slug }, idioma),
    openGraph: {
      type: "website",
      title: titulo,
      description: descripcionCorta(destino, idioma),
      url: alternativas({ tipo: "destino", destino: slug }, idioma).canonical,
    },
  };
}

export default async function LandingDestino(
  props: PageProps<"/[idioma]/alquiler-barcos/[destino]">,
) {
  const { idioma, destino: slug } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const destino = await obtenerDestino(slug);
  if (!destino) notFound();

  const t = textos(idioma);

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

  // Adónde se llega desde aquí. Enlazar el puerto con el destino que la
  // gente busca por su nombre es lo que hace que las dos páginas se
  // sostengan la una a la otra.
  const alcanzables = await lugaresDesde(slug);

  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  const otros = destinos.filter((d) => d.slug !== slug).slice(0, 6);
  const busqueda = ruta({ tipo: "busqueda" }, idioma);
  const titulo = `${t.busqueda.tituloGenerico} ${t.busqueda.enDestino(destino.nombre)}`;
  // La guía del puerto y sus preguntas están escritas a mano en un idioma
  // concreto. Servirlas dentro de una página declarada en otro sería peor que
  // no tenerlas: el hreflang prometería algo que la página no cumple, y el
  // FAQPage marcaría en JSON-LD un idioma que no es el suyo.
  const prosaTraducida = esIdioma(destino.idiomaProsa) && destino.idiomaProsa === idioma;

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          titulo,
          barcos.map((b) => ({
            nombre: b.nombre,
            ruta: ruta({ tipo: "barco", slug: b.slug }, idioma),
          })),
        )}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              ...migasBase(idioma),
              { nombre: destino.nombre, pagina: { tipo: "destino", destino: slug } },
            ]}
            idioma={idioma}
          />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            {destino.provincia} · {destino.comunidad}
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {descripcionCorta(destino, idioma)}
          </p>

          {total > 0 && (
            <p className="mt-5 text-texto-suave">
              {t.destino.disponiblesDesde(
                t.portada.nBarcos(entero(total)),
                euro(masBarato),
              )}
            </p>
          )}
        </div>
      </section>

      {tiposAqui.length > 1 && (
        <nav
          aria-label={t.destino.tiposAqui(destino.nombre)}
          className="border-b border-borde bg-superficie"
        >
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <ul className="flex flex-wrap gap-2">
              {tiposAqui.map((tipo) => (
                <li key={tipo.slug}>
                  <Link
                    href={ruta(
                      { tipo: "destinoTipo", destino: slug, tipoBarco: tipo.slug },
                      idioma,
                    )}
                    className="inline-flex items-baseline gap-1.5 rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                  >
                    {t.destino.tipoEn(
                      t.tiposBarco[tipo.slug as keyof typeof t.tiposBarco] ?? tipo.plural,
                      destino.nombre,
                    )}
                    <span className="cifra text-xs text-texto-tenue">{tipo.n}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
          <div>
            <details className="lg:hidden">
              <summary className="cursor-pointer rounded-md border border-borde bg-superficie px-4 py-3 font-medium text-texto">
                {t.busqueda.filtrarOrdenar}
              </summary>
              <div className="mt-4">
                <PanelFiltros
                  filtros={filtros}
                  tipos={tipos}
                  equipamiento={equipamiento}
                  accion={busqueda}
                  idioma={idioma}
                  destinoFijo={slug}
                />
              </div>
            </details>

            <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
              <PanelFiltros
                filtros={filtros}
                tipos={tipos}
                equipamiento={equipamiento}
                accion={busqueda}
                idioma={idioma}
                destinoFijo={slug}
              />
              <p className="mt-4 text-xs leading-relaxed text-texto-tenue">
                {t.filtros.llevaAlBuscador(destino.nombre)}
              </p>
            </aside>
          </div>

          <div>
            {barcos.length === 0 ? (
              <p className="rounded-carta border border-borde bg-superficie p-8 text-center text-texto-suave">
                {t.destino.sinFlota(destino.nombre)}
              </p>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {barcos.map((barco, i) => (
                    <TarjetaBarco
                      key={barco.slug}
                      barco={barco}
                      idioma={idioma}
                      prioridad={i < 3}
                    />
                  ))}
                </div>

                {total > barcos.length && (
                  <div className="mt-8 text-center">
                    <Link
                      href={`${busqueda}?destino=${slug}`}
                      className="inline-block rounded-md bg-marca px-6 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
                    >
                      {t.destino.verTodosDe(entero(total), destino.nombre)}
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
            <div>
              <h2 className="font-display text-2xl font-semibold text-texto sm:text-3xl">
                {t.destino.navegarEn(destino.nombre)}
              </h2>
              {prosaTraducida ? (
                <div className="mt-5">
                  <Contenido texto={destino.contenido} />
                </div>
              ) : (
                <p className="mt-5 text-sm leading-relaxed text-texto-suave">
                  {t.destino.guiaOtroIdioma}{" "}
                  <Link
                    className="underline underline-offset-4"
                    href={ruta({ tipo: "destino", destino: slug }, IDIOMA_POR_DEFECTO)}
                  >
                    {t.destino.verGuiaEs}
                  </Link>
                </p>
              )}
            </div>

            <aside>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                {t.destino.puertos}
              </h2>
              <ul className="mt-3 space-y-2">
                {destino.puertos.map((puerto) => (
                  <li key={puerto.id} className="text-sm text-texto">
                    {puerto.nombre}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                {t.destino.temporadaAlta}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-texto-suave">
                {mesesEnTexto(destino.mesesAlta, idioma)}. {t.destino.notaTemporada}
              </p>
            </aside>
          </div>

          {prosaTraducida && destino.preguntas.length > 0 && (
            <div className="mt-14 max-w-3xl">
              <Faq
                idioma={idioma}
                preguntas={destino.preguntas.map((p) => ({
                  pregunta: p.pregunta,
                  respuesta: p.respuesta,
                }))}
              />
            </div>
          )}
        </div>
      </section>

      {alcanzables.length > 0 && (
        <section className="border-t border-borde bg-superficie">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-texto">
              {t.destino.adondeSeLlega(destino.nombre)}
            </h2>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-carta border border-borde bg-borde sm:grid-cols-2 lg:grid-cols-3">
              {alcanzables.map((a) => (
                <li key={a.id} className="bg-fondo p-5">
                  <p className="font-display text-lg font-semibold text-texto">
                    <Link
                      className="hover:text-acento"
                      href={ruta({ tipo: "lugar", slug: a.lugar.slug }, idioma)}
                    >
                      {a.lugar.nombre}
                    </Link>
                  </p>
                  <p className="cifra mt-1 text-sm text-texto-suave">
                    {t.lugar.minutos(entero(a.minutos))}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-texto-tenue">
                    {a.sinTitulo ? t.lugar.sinTitulo : t.lugar.conPatron}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-texto">
          {t.destino.otrosDestinos}
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {otros.map((otro) => (
            <li key={otro.slug}>
              <Link
                href={ruta({ tipo: "destino", destino: otro.slug }, idioma)}
                className="inline-block rounded-md border border-borde px-3.5 py-2 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
              >
                {t.destino.barcosEn(otro.nombre)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/** Nombres de mes en cada idioma, tomados de `Intl` para no mantener listas. */
function mesesEnTexto(meses: string, idioma: Idioma): string {
  const formato = new Intl.DateTimeFormat(idioma, { month: "long" });
  const nombres = meses
    .split(",")
    .map((m) => Number.parseInt(m.trim(), 10))
    .filter((m) => m >= 1 && m <= 12)
    .map((m) => formato.format(new Date(2026, m - 1, 1)));

  if (nombres.length === 0) return "—";
  const texto =
    nombres.length === 1
      ? nombres[0]
      : `${nombres.slice(0, -1).join(", ")} · ${nombres.at(-1)}`;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
