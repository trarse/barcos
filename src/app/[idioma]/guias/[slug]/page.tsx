/**
 * Guía perenne.
 *
 * A diferencia del blog, no lleva fecha de publicación visible: lleva fecha
 * de revisión. Una guía sobre titulaciones no debería parecer vieja en marzo
 * por haberse escrito en octubre, pero sí debe decir cuándo se comprobó.
 *
 * El `hreflang` solo declara los idiomas en los que la guía existe de verdad.
 * Prometer una traducción que no está es peor que no declararla.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { guiasDe, idiomasDeLaGuia, obtenerGuia } from "@/datos/guias";
import { enlacesVivos } from "@/lib/enlaces";
import { esIdioma, ETIQUETAS, IDIOMAS } from "@/lib/idiomas";
import { ruta } from "@/lib/rutas";
import { SITIO, urlAbsoluta } from "@/lib/sitio";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

function alternativasGuia(slug: string, idioma: string) {
  const languages: Record<string, string> = {};
  for (const otro of idiomasDeLaGuia(slug)) {
    languages[ETIQUETAS[otro].hreflang] = ruta({ tipo: "guia", slug }, otro);
  }
  return { canonical: ruta({ tipo: "guia", slug }, idioma as never), languages };
}

export function generateStaticParams() {
  // Solo lo ya publicado: una guía programada para dentro de un mes no debe
  // tener página hasta que llegue su fecha. `dynamicParams` la sirve sola ese
  // día sin necesidad de volver a desplegar.
  return IDIOMAS.flatMap((idioma) =>
    guiasDe(idioma).map((g) => ({ idioma, slug: g.slug })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/guias/[slug]">,
): Promise<Metadata> {
  const { idioma, slug } = await props.params;
  if (!esIdioma(idioma)) return {};

  const guia = obtenerGuia(slug, idioma);
  if (!guia) return { title: "404" };

  return {
    title: guia.titulo,
    description: guia.entradilla,
    alternates: alternativasGuia(slug, idioma),
    openGraph: {
      type: "article",
      title: guia.titulo,
      description: guia.entradilla,
      url: urlAbsoluta(ruta({ tipo: "guia", slug }, idioma)),
    },
  };
}

export default async function PaginaGuia(props: PageProps<"/[idioma]/guias/[slug]">) {
  const { idioma, slug } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const guia = obtenerGuia(slug, idioma);
  if (!guia) notFound();

  const t = textos(idioma);
  const otras = guiasDe(idioma).filter((g) => g.slug !== slug);
  // No se enlaza a lo que todavía no se ha publicado.
  const relacionados = await enlacesVivos(guia.relacionados, idioma);

  return (
    <>
      <JsonLd
        datos={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guia.titulo,
          description: guia.entradilla,
          inLanguage: ETIQUETAS[idioma].hreflang,
          dateModified: guia.revisada,
          author: { "@type": "Organization", name: SITIO.nombre },
          publisher: { "@type": "Organization", name: SITIO.nombre },
          mainEntityOfPage: urlAbsoluta(ruta({ tipo: "guia", slug }, idioma)),
        }}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              ...migasBase(idioma),
              { nombre: t.guias.titulo, pagina: { tipo: "guias" } },
              { nombre: guia.titulo, pagina: { tipo: "guia", slug } },
            ]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {guia.titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {guia.entradilla}
          </p>

          <p className="cifra mt-5 text-sm text-texto-tenue">
            {t.guias.revisada(guia.revisada)} · {t.guias.minutos(String(guia.minutos))}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="max-w-3xl">
          <Contenido texto={guia.cuerpo} />

          {guia.preguntas.length > 0 && (
            <div className="mt-14">
              <Faq idioma={idioma} preguntas={guia.preguntas} />
            </div>
          )}

          {relacionados.length > 0 && (
            <section className="mt-14 border-t border-borde pt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                {t.guias.seguirPor}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {relacionados.map((r) => (
                  <li key={r.texto}>
                    <Link
                      href={ruta(r.pagina, idioma)}
                      className="inline-block rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                    >
                      {r.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {otras.length > 0 && (
        <section className="border-t border-borde bg-superficie">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-texto">
              {t.guias.otras}
            </h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otras.map((otra) => (
                <li
                  key={otra.slug}
                  className="rounded-carta border border-borde bg-fondo p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-texto">
                    <Link
                      className="hover:text-acento"
                      href={ruta({ tipo: "guia", slug: otra.slug }, idioma)}
                    >
                      {otra.titulo}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-texto-suave">
                    {otra.entradilla}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
