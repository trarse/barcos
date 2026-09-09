/**
 * Destino con nombre propio: la isla, el peñón, la cueva.
 *
 * Es el cluster que la competencia deja entero sin cubrir. Los agregadores
 * tienen página de ciudad y ninguna de destino, y sin embargo nadie busca
 * «alquiler de barcos» para luego decidir adónde ir: busca «Tabarca en
 * barco» y a partir de ahí mira desde dónde se sale.
 *
 * El bloque de accesos es la razón de ser de la página. Une lo que la gente
 * busca con la landing que tiene los barcos, y de paso responde a la única
 * pregunta que de verdad importa antes de reservar: cuánto se tarda y si
 * hace falta título.
 *
 * Lo que aquí NO se cuenta: dónde fondear, con qué tenida ni qué vientos
 * abrigan. Eso es información de seguridad y no se publica sin seguro
 * revisado.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { listarLugares, obtenerLugar } from "@/lib/consultas";
import { entero } from "@/lib/formato";
import { esIdioma, IDIOMA_POR_DEFECTO, IDIOMAS } from "@/lib/idiomas";
import { esIndexable } from "@/lib/indexacion";
import { contenidoEnIdioma, descripcionCorta, preguntaEnIdioma, titularCorto } from "@/lib/prosa";
import { alternativas, ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export async function generateStaticParams() {
  const lugares = await listarLugares();
  return IDIOMAS.flatMap((idioma) => lugares.map((l) => ({ idioma, lugar: l.slug })));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/destinos/[lugar]">,
): Promise<Metadata> {
  const { idioma, lugar: slug } = await props.params;
  if (!esIdioma(idioma)) return {};

  const lugar = await obtenerLugar(slug);
  if (!lugar) return { title: "404" };

  // Sin flota que contar: aquí la regla de indexación es solo la del texto.
  const indexable = esIndexable(idioma, {
    prosa: { es: lugar.contenido, en: lugar.contenidoEn, de: lugar.contenidoDe },
  });

  return {
    title: titularCorto(lugar, idioma),
    description: descripcionCorta(lugar, idioma),
    alternates: alternativas({ tipo: "lugar", slug }, idioma),
    openGraph: {
      type: "article",
      title: titularCorto(lugar, idioma),
      description: descripcionCorta(lugar, idioma),
      url: alternativas({ tipo: "lugar", slug }, idioma).canonical,
    },
    robots: indexable ? undefined : { index: false, follow: true },
  };
}

export default async function PaginaLugar(
  props: PageProps<"/[idioma]/destinos/[lugar]">,
) {
  const { idioma, lugar: slug } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const lugar = await obtenerLugar(slug);
  if (!lugar) notFound();

  const t = textos(idioma);
  const lugares = await listarLugares();
  const otros = lugares.filter((l) => l.slug !== slug);

  const prosa = contenidoEnIdioma(lugar, idioma);

  return (
    <>
      <JsonLd
        datos={{
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          name: lugar.nombre,
          description: descripcionCorta(lugar, idioma),
          geo: {
            "@type": "GeoCoordinates",
            latitude: lugar.latitud,
            longitude: lugar.longitud,
          },
          address: {
            "@type": "PostalAddress",
            addressRegion: lugar.provincia,
            addressCountry: "ES",
          },
        }}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              ...migasBase(idioma),
              { nombre: t.lugar.titulo, pagina: { tipo: "lugares" } },
              { nombre: lugar.nombre, pagina: { tipo: "lugar", slug } },
            ]}
            idioma={idioma}
          />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            {lugar.provincia}
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {titularCorto(lugar, idioma)}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {descripcionCorta(lugar, idioma)}
          </p>
        </div>
      </section>

      {/* Los accesos van antes que el texto: es lo que se viene a mirar. */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-texto">
          {t.lugar.comoLlegar(lugar.nombre)}
        </h2>

        <ul className="mt-6 grid gap-px overflow-hidden rounded-carta border border-borde bg-borde sm:grid-cols-2 lg:grid-cols-3">
          {lugar.accesos.map((acceso) => (
            <li key={acceso.id} className="bg-fondo p-5">
              <p className="font-display text-lg font-semibold text-texto">
                {t.lugar.desde(acceso.destino.nombre)}
              </p>
              <p className="cifra mt-1 text-sm text-texto-suave">
                {t.lugar.minutos(entero(acceso.minutos))}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-texto-tenue">
                {acceso.sinTitulo ? t.lugar.sinTitulo : t.lugar.conPatron}
              </p>
              <Link
                className="mt-4 inline-block text-sm font-medium text-acento underline underline-offset-4"
                href={ruta({ tipo: "destino", destino: acceso.destino.slug }, idioma)}
              >
                {t.lugar.verBarcos(acceso.destino.nombre)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            {prosa ? (
              <Contenido texto={prosa} />
            ) : (
              <p className="text-sm leading-relaxed text-texto-suave">
                {t.destino.guiaOtroIdioma}{" "}
                <Link
                  className="underline underline-offset-4"
                  href={ruta({ tipo: "lugar", slug }, IDIOMA_POR_DEFECTO)}
                >
                  {t.destino.verGuiaEs}
                </Link>
              </p>
            )}

            {prosa && lugar.preguntas.length > 0 && (
              <div className="mt-12">
                <Faq
                  idioma={idioma}
                  preguntas={lugar.preguntas
                    .map((p) => preguntaEnIdioma(p, idioma))
                    .filter((q): q is { pregunta: string; respuesta: string } => q !== null)}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {otros.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-texto">
            {t.lugar.otrosLugares}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {otros.map((otro) => (
              <li key={otro.slug}>
                <Link
                  href={ruta({ tipo: "lugar", slug: otro.slug }, idioma)}
                  className="inline-block rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                >
                  {otro.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
