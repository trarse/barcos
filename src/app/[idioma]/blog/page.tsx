import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Migas } from "@/components/migas";
import { etiquetaCategoria } from "@/datos/blog";
import { articulosPorFecha } from "@/lib/blog";
import { fechaLarga } from "@/lib/formato";
import { esIdioma, IDIOMA_POR_DEFECTO, IDIOMAS } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/blog">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const t = textos(idioma);

  return {
    title: t.pie.guias,
    description: t.blog.entradilla,
    alternates: alternativas({ tipo: "blog" }, idioma),
  };
}

export default async function Blog(props: PageProps<"/[idioma]/blog">) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);
  const articulos = await articulosPorFecha(idioma);

  return (
    <>
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: t.migas.inicio, pagina: { tipo: "home" } },
              { nombre: t.migas.guias, pagina: { tipo: "blog" } },
            ]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {t.pie.guias}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {t.blog.entradilla}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {articulos.length === 0 ? (
          <div className="rounded-carta border border-borde bg-superficie p-10 text-center">
            <h2 className="font-display text-xl font-semibold text-texto">
              {t.blog.sinArticulos}
            </h2>
            <p className="mx-auto mt-2 max-w-md leading-relaxed text-texto-suave">
              {t.blog.sinArticulosTexto}
            </p>
            <Link
              href={ruta({ tipo: "blog" }, IDIOMA_POR_DEFECTO)}
              hrefLang={IDIOMA_POR_DEFECTO}
              className="mt-6 inline-block rounded-md border border-borde-fuerte px-5 py-3 font-semibold text-texto transition-colors hover:bg-superficie-alt"
            >
              {t.blog.verEnCastellano}
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {articulos.map((articulo) => (
              <article
                key={articulo.slug}
                className="group relative flex flex-col rounded-carta border border-borde bg-superficie p-6 transition-colors hover:border-acento"
              >
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                  <span className="text-acento">{etiquetaCategoria(articulo.categoria, idioma)}</span>
                  <span className="text-texto-tenue">
                    {t.comun.minutosLectura(articulo.minutos)}
                  </span>
                </div>

                <h2 className="mt-2.5 font-display text-2xl font-semibold leading-snug text-texto">
                  <Link
                    href={ruta({ tipo: "articulo", slug: articulo.slug }, idioma)}
                    className="after:absolute after:inset-0"
                  >
                    {articulo.titulo}
                  </Link>
                </h2>

                <p className="mt-3 flex-1 leading-relaxed text-texto-suave">
                  {articulo.entradilla}
                </p>

                <p className="mt-4 text-sm text-texto-tenue">
                  {fechaLarga(new Date(articulo.fecha), idioma)}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
