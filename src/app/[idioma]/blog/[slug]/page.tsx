import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CuerpoArticulo } from "@/components/cuerpo-articulo";
import { JsonLd } from "@/components/json-ld";
import { Migas } from "@/components/migas";
import { ARTICULOS, etiquetaCategoria, idiomasDelArticulo, obtenerArticulo } from "@/datos/blog";
import { fechaLarga } from "@/lib/formato";
import { esIdioma, ETIQUETAS } from "@/lib/idiomas";
import { ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";
import { SITIO, urlAbsoluta } from "@/lib/sitio";

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ idioma: a.idioma, slug: a.slug }));
}

/**
 * El `hreflang` de un artículo solo declara los idiomas en los que existe de
 * verdad. Declarar una traducción que no está es peor que no declarar nada.
 */
function alternativasArticulo(slug: string, idioma: string) {
  const disponibles = idiomasDelArticulo(slug);
  const languages: Record<string, string> = {};
  for (const otro of disponibles) {
    languages[ETIQUETAS[otro].hreflang] = ruta({ tipo: "articulo", slug }, otro);
  }
  return {
    canonical: ruta({ tipo: "articulo", slug }, idioma as never),
    languages,
  };
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/blog/[slug]">,
): Promise<Metadata> {
  const { idioma, slug } = await props.params;
  if (!esIdioma(idioma)) return {};

  const articulo = obtenerArticulo(slug, idioma);
  if (!articulo) return { title: "404" };

  return {
    title: articulo.titulo,
    description: articulo.entradilla,
    alternates: alternativasArticulo(slug, idioma),
    openGraph: {
      type: "article",
      title: articulo.titulo,
      description: articulo.entradilla,
      url: ruta({ tipo: "articulo", slug }, idioma),
      publishedTime: articulo.fecha,
    },
  };
}

export default async function Articulo(props: PageProps<"/[idioma]/blog/[slug]">) {
  const { idioma, slug } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const articulo = obtenerArticulo(slug, idioma);
  if (!articulo) notFound();

  const t = textos(idioma);
  const otros = ARTICULOS.filter((a) => a.idioma === idioma && a.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        datos={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: articulo.titulo,
          description: articulo.entradilla,
          inLanguage: ETIQUETAS[idioma].hreflang,
          datePublished: articulo.fecha,
          dateModified: articulo.fecha,
          mainEntityOfPage: urlAbsoluta(ruta({ tipo: "articulo", slug }, idioma)),
          author: { "@type": "Organization", name: SITIO.nombre },
          publisher: { "@type": "Organization", name: SITIO.nombre },
        }}
      />

      <article>
        <header className="reticula border-b border-borde">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
            <Migas
              migas={[
                { nombre: t.migas.inicio, pagina: { tipo: "home" } },
                { nombre: t.migas.guias, pagina: { tipo: "blog" } },
                { nombre: articulo.titulo, pagina: { tipo: "articulo", slug } },
              ]}
              idioma={idioma}
            />

            <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
              <span className="text-acento">{etiquetaCategoria(articulo.categoria, idioma)}</span>
              <span className="text-texto-tenue">
                {t.comun.minutosLectura(articulo.minutos)}
              </span>
            </div>

            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
              {articulo.titulo}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-texto-suave">
              {articulo.entradilla}
            </p>

            <p className="mt-5 text-sm text-texto-tenue">
              <time dateTime={articulo.fecha}>
                {fechaLarga(new Date(articulo.fecha), idioma)}
              </time>
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <CuerpoArticulo texto={articulo.cuerpo} />

          <nav
            aria-label={t.blog.sigueAqui}
            className="mt-12 rounded-carta border border-borde bg-superficie p-6"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
              {t.blog.sigueAqui}
            </h2>
            <ul className="mt-3 space-y-2">
              {articulo.relacionados.map((rel) => (
                <li key={rel.texto}>
                  <Link
                    href={ruta(rel.pagina, idioma)}
                    className="font-medium text-acento hover:underline"
                  >
                    {rel.texto} →
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </article>

      {otros.length > 0 && (
        <section className="border-t border-borde bg-superficie">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-texto">
              {t.blog.otrasGuias}
            </h2>
            <ul className="mt-5 space-y-4">
              {otros.map((otro) => (
                <li key={otro.slug}>
                  <Link
                    href={ruta({ tipo: "articulo", slug: otro.slug }, idioma)}
                    className="font-display text-lg font-semibold text-texto hover:text-acento"
                  >
                    {otro.titulo}
                  </Link>
                  <p className="mt-1 text-sm leading-relaxed text-texto-suave">
                    {otro.entradilla}
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
