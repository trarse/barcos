/**
 * Índice de ocasiones. Hub del cluster: reparte autoridad hacia cada motivo
 * de celebración y desde ahí a las landings de puerto que las venden.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { ocasionesDe } from "@/datos/ocasiones";
import { entero } from "@/lib/formato";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/ocasiones">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const t = textos(idioma);

  return {
    title: t.ocasiones.titulo,
    description: t.ocasiones.entradilla,
    alternates: alternativas({ tipo: "ocasiones" }, idioma),
  };
}

export default async function Ocasiones(props: PageProps<"/[idioma]/ocasiones">) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);
  const ocasiones = ocasionesDe(idioma);

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          t.ocasiones.titulo,
          ocasiones.map((o) => ({
            nombre: o.nombre,
            ruta: ruta({ tipo: "ocasion", slug: o.slug }, idioma),
          })),
        )}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              ...migasBase(idioma),
              { nombre: t.ocasiones.titulo, pagina: { tipo: "ocasiones" } },
            ]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {t.ocasiones.titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {t.ocasiones.entradilla}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="grid gap-6 md:grid-cols-2">
          {ocasiones.map((ocasion) => (
            <li
              key={ocasion.slug}
              className="flex flex-col rounded-carta border border-borde bg-superficie p-6"
            >
              <h2 className="font-display text-xl font-semibold text-texto">
                <Link
                  className="hover:text-acento"
                  href={ruta({ tipo: "ocasion", slug: ocasion.slug }, idioma)}
                >
                  {ocasion.titulo}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-texto-suave">
                {ocasion.descripcion}
              </p>
              <p className="cifra mt-4 text-xs text-texto-tenue">
                {t.ocasiones.desdePlazas(entero(ocasion.capacidadMinima))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
