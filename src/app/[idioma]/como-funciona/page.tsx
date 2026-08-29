import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Faq } from "@/components/faq";
import { Migas } from "@/components/migas";
import { paginasFijas } from "@/datos/paginas";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/como-funciona">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const p = paginasFijas(idioma).comoFunciona;

  return {
    title: p.titulo,
    description: p.descripcion,
    alternates: alternativas({ tipo: "comoFunciona" }, idioma),
  };
}

export default async function ComoFunciona(
  props: PageProps<"/[idioma]/como-funciona">,
) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);
  const p = paginasFijas(idioma).comoFunciona;

  return (
    <>
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: t.migas.inicio, pagina: { tipo: "home" } },
              { nombre: t.migas.comoFunciona, pagina: { tipo: "comoFunciona" } },
            ]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {p.titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {p.entradilla}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ol className="space-y-8">
          {p.pasos.map((paso, i) => (
            <li key={paso.titulo} className="flex gap-5">
              <span
                className="cifra flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-borde-fuerte font-display text-sm font-semibold text-marca"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-texto">
                  {paso.titulo}
                </h2>
                <p className="mt-1.5 leading-relaxed text-texto-suave">{paso.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <Faq preguntas={p.faq} idioma={idioma} />
        </div>

        <div className="mt-12 text-center">
          <Link
            href={ruta({ tipo: "busqueda" }, idioma)}
            className="inline-block rounded-md bg-marca px-6 py-3.5 font-semibold text-fondo transition-opacity hover:opacity-90"
          >
            {p.cta}
          </Link>
        </div>
      </div>
    </>
  );
}
