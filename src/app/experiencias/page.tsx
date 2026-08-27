import type { Metadata } from "next";
import Link from "next/link";

import { Migas } from "@/components/migas";
import { listarExperiencias } from "@/lib/consultas";
import { entero } from "@/lib/formato";
import { rutas } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Experiencias en barco",
  description:
    "Atardecer, pesca, calas y snorkel, avistamiento de cetáceos o celebraciones. Cada plan con sus barcos y el precio final calculado.",
  alternates: { canonical: rutas.experiencias() },
};

export default async function Experiencias() {
  const experiencias = await listarExperiencias();

  return (
    <>
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: "Inicio", ruta: rutas.home() },
              { nombre: "Experiencias", ruta: rutas.experiencias() },
            ]}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            No alquiles un barco: elige un plan
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            El resto del sector vende cascos y deja el plan de tu cuenta. Aquí
            cada experiencia tiene sus barcos, sus horas de navegación y su
            precio calculado con el combustible que realmente gasta.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {experiencias.map((exp) => (
            <Link
              key={exp.slug}
              href={rutas.experiencia(exp.slug)}
              className="flex flex-col rounded-carta border border-borde bg-superficie p-6 transition-colors hover:border-acento"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl font-semibold text-texto">
                  {exp.nombre}
                </h2>
                <span className="cifra shrink-0 text-sm text-texto-tenue">
                  ~{exp.horas} h
                </span>
              </div>
              <p className="mt-2.5 flex-1 leading-relaxed text-texto-suave">
                {exp.descripcion}
              </p>
              <p className="mt-4 text-sm font-semibold text-acento">
                {entero(exp._count.barcos)} barcos →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
