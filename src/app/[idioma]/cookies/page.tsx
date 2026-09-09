import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { Migas } from "@/components/migas";
import { paginaLegal } from "@/datos/legales";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { alternativas } from "@/lib/rutas";
import { textos } from "@/lib/textos";

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/cookies">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const p = paginaLegal(idioma, "cookies");
  return {
    title: p.titulo,
    description: p.descripcion,
    alternates: alternativas({ tipo: "cookies" }, idioma),
  };
}

export default async function Cookies(props: PageProps<"/[idioma]/cookies">) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();
  const t = textos(idioma);
  const p = paginaLegal(idioma, "cookies");

  return (
    <>
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: t.migas.inicio, pagina: { tipo: "home" } },
              { nombre: p.titulo, pagina: { tipo: "cookies" } },
            ]}
            idioma={idioma}
          />
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {p.titulo}
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Contenido texto={p.cuerpo} />
      </div>
    </>
  );
}
