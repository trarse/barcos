import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Migas } from "@/components/migas";
import { listarExperiencias } from "@/lib/consultas";
import { entero } from "@/lib/formato";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/experiencias">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const t = textos(idioma);

  return {
    title: t.nav.experiencias,
    description: t.portada.noSoloBarcoTexto,
    alternates: alternativas({ tipo: "experiencias" }, idioma),
  };
}

export default async function Experiencias(
  props: PageProps<"/[idioma]/experiencias">,
) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);
  const experiencias = await listarExperiencias();

  return (
    <>
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: t.migas.inicio, pagina: { tipo: "home" } },
              { nombre: t.migas.experiencias, pagina: { tipo: "experiencias" } },
            ]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {t.portada.noSoloBarco}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {t.portada.noSoloBarcoTexto}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {experiencias.map((exp) => (
            <Link
              key={exp.slug}
              href={ruta({ tipo: "experiencia", slug: exp.slug }, idioma)}
              className="flex flex-col rounded-carta border border-borde bg-superficie p-6 transition-colors hover:border-acento"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl font-semibold text-texto">
                  {t.actividades[exp.slug as keyof typeof t.actividades] ?? exp.nombre}
                </h2>
                <span className="cifra shrink-0 text-sm text-texto-tenue">
                  ~{exp.horas} h
                </span>
              </div>
              <p className="mt-2.5 flex-1 leading-relaxed text-texto-suave">
                {exp.descripcion}
              </p>
              <p className="mt-4 text-sm font-semibold text-acento">
                {t.portada.nBarcos(entero(exp._count.barcos))} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
