/**
 * Índice de guías.
 *
 * Separa por público — quien va a alquilar y quien va a publicar su barco —
 * porque son dos búsquedas distintas y mezclarlas confunde a las dos. Las de
 * cliente van primero: tienen más volumen.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { guiasDe } from "@/datos/guias";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/guias">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const t = textos(idioma);

  return {
    title: t.guias.titulo,
    description: t.guias.entradilla,
    alternates: alternativas({ tipo: "guias" }, idioma),
  };
}

export default async function Guias(props: PageProps<"/[idioma]/guias">) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);
  const guias = guiasDe(idioma);
  const deCliente = guias.filter((g) => g.publico === "cliente");
  const deArmador = guias.filter((g) => g.publico === "armador");

  const bloques = [
    { titulo: t.guias.paraNavegar, guias: deCliente },
    { titulo: t.guias.paraArmadores, guias: deArmador },
  ].filter((b) => b.guias.length > 0);

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          t.guias.titulo,
          guias.map((g) => ({
            nombre: g.titulo,
            ruta: ruta({ tipo: "guia", slug: g.slug }, idioma),
          })),
        )}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[...migasBase(idioma), { nombre: t.guias.titulo, pagina: { tipo: "guias" } }]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {t.guias.titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {t.guias.entradilla}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {guias.length === 0 ? (
          <p className="rounded-carta border border-borde bg-superficie p-8 text-center text-texto-suave">
            {t.guias.vacio}
          </p>
        ) : (
          bloques.map((bloque) => (
            <section key={bloque.titulo} className="mb-14 last:mb-0">
              <h2 className="font-display text-2xl font-semibold text-texto">
                {bloque.titulo}
              </h2>
              <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bloque.guias.map((guia) => (
                  <li
                    key={guia.slug}
                    className="flex flex-col rounded-carta border border-borde bg-superficie p-6"
                  >
                    <h3 className="font-display text-lg font-semibold text-texto">
                      <Link
                        className="hover:text-acento"
                        href={ruta({ tipo: "guia", slug: guia.slug }, idioma)}
                      >
                        {guia.titulo}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-texto-suave">
                      {guia.entradilla}
                    </p>
                    <p className="cifra mt-4 text-xs text-texto-tenue">
                      {t.guias.minutos(String(guia.minutos))}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </>
  );
}
