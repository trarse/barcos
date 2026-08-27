import type { Metadata } from "next";
import Link from "next/link";

import { Migas } from "@/components/migas";
import { articulosPorFecha } from "@/datos/blog";
import { fechaLarga } from "@/lib/formato";
import { rutas } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guías de navegación",
  description:
    "Precios reales, titulaciones, fondeo responsable y rutas por la costa española. Lo que hay que saber antes de alquilar un barco.",
  alternates: { canonical: rutas.blog() },
};

export default function Blog() {
  const articulos = articulosPorFecha();

  return (
    <>
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: "Inicio", ruta: rutas.home() },
              { nombre: "Guías", ruta: rutas.blog() },
            ]}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            Guías de navegación
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            Precios con las cuentas hechas, titulaciones explicadas sin jerga y
            rutas contadas por tramos. Sin relleno.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-2">
          {articulos.map((articulo) => (
            <article
              key={articulo.slug}
              className="group relative flex flex-col rounded-carta border border-borde bg-superficie p-6 transition-colors hover:border-acento"
            >
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                <span className="text-acento">{articulo.categoria}</span>
                <span className="text-texto-tenue">{articulo.minutos} min</span>
              </div>

              <h2 className="mt-2.5 font-display text-2xl font-semibold leading-snug text-texto">
                <Link
                  href={rutas.articulo(articulo.slug)}
                  className="after:absolute after:inset-0"
                >
                  {articulo.titulo}
                </Link>
              </h2>

              <p className="mt-3 flex-1 leading-relaxed text-texto-suave">
                {articulo.entradilla}
              </p>

              <p className="mt-4 text-sm text-texto-tenue">
                {fechaLarga(new Date(articulo.fecha))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
