import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CuerpoArticulo } from "@/components/cuerpo-articulo";
import { JsonLd } from "@/components/json-ld";
import { Migas } from "@/components/migas";
import { ARTICULOS, obtenerArticulo } from "@/datos/blog";
import { fechaLarga } from "@/lib/formato";
import { rutas } from "@/lib/seo";
import { SITIO, urlAbsoluta } from "@/lib/sitio";

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const articulo = obtenerArticulo(slug);
  if (!articulo) return { title: "Artículo no encontrado" };

  return {
    title: articulo.titulo,
    description: articulo.entradilla,
    alternates: { canonical: rutas.articulo(slug) },
    openGraph: {
      type: "article",
      title: articulo.titulo,
      description: articulo.entradilla,
      url: rutas.articulo(slug),
      publishedTime: articulo.fecha,
    },
  };
}

export default async function Articulo(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const articulo = obtenerArticulo(slug);
  if (!articulo) notFound();

  const otros = ARTICULOS.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        datos={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: articulo.titulo,
          description: articulo.entradilla,
          datePublished: articulo.fecha,
          dateModified: articulo.fecha,
          mainEntityOfPage: urlAbsoluta(rutas.articulo(slug)),
          author: { "@type": "Organization", name: SITIO.nombre },
          publisher: { "@type": "Organization", name: SITIO.nombre },
        }}
      />

      <article>
        <header className="reticula border-b border-borde">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
            <Migas
              migas={[
                { nombre: "Inicio", ruta: rutas.home() },
                { nombre: "Guías", ruta: rutas.blog() },
                { nombre: articulo.titulo, ruta: rutas.articulo(slug) },
              ]}
            />

            <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
              <span className="text-acento">{articulo.categoria}</span>
              <span className="text-texto-tenue">
                {articulo.minutos} min de lectura
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
                {fechaLarga(new Date(articulo.fecha))}
              </time>
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <CuerpoArticulo texto={articulo.cuerpo} />

          <nav aria-label="Enlaces relacionados" className="mt-12 rounded-carta border border-borde bg-superficie p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
              Sigue por aquí
            </h2>
            <ul className="mt-3 space-y-2">
              {articulo.relacionados.map((rel) => (
                <li key={rel.href}>
                  <Link
                    href={rel.href}
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
              Otras guías
            </h2>
            <ul className="mt-5 space-y-4">
              {otros.map((otro) => (
                <li key={otro.slug}>
                  <Link
                    href={rutas.articulo(otro.slug)}
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
