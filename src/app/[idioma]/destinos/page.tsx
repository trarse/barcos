/**
 * Índice de destinos con nombre propio.
 *
 * Es el hub del cluster: reparte autoridad hacia cada destino y, desde
 * ellos, hacia las landings de puerto. Sin él las páginas de destino
 * quedarían colgando de los enlaces internos de cada municipio.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { MapaCalas } from "@/components/mapa-calas";
import { listarLugares } from "@/lib/consultas";
import { entero } from "@/lib/formato";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { descripcionCorta } from "@/lib/prosa";
import { alternativas, ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/destinos">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const t = textos(idioma);

  return {
    title: t.lugar.titulo,
    description: t.lugar.entradilla,
    alternates: alternativas({ tipo: "lugares" }, idioma),
  };
}

export default async function Lugares(props: PageProps<"/[idioma]/destinos">) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);
  const lugares = await listarLugares();

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          t.lugar.titulo,
          lugares.map((l) => ({
            nombre: l.nombre,
            ruta: ruta({ tipo: "lugar", slug: l.slug }, idioma),
          })),
        )}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[...migasBase(idioma), { nombre: t.lugar.titulo, pagina: { tipo: "lugares" } }]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {t.lugar.titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {t.lugar.entradilla}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-texto">Fondeaderos de la Costa Blanca</h2>
        <p className="mt-2 max-w-2xl text-sm text-texto-suave">Calas y fondeaderos con su tipo de fondeo y avisos. La normativa se revisa cada temporada.</p>
        <div className="mt-5">
          <MapaCalas />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lugares.map((lugar) => (
            <li
              key={lugar.slug}
              className="flex flex-col rounded-carta border border-borde bg-superficie p-6"
            >
              <h2 className="font-display text-xl font-semibold text-texto">
                <Link
                  className="hover:text-acento"
                  href={ruta({ tipo: "lugar", slug: lugar.slug }, idioma)}
                >
                  {lugar.nombre}
                </Link>
              </h2>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-texto-suave">
                {descripcionCorta(lugar, idioma)}
              </p>

              {lugar.accesos.length > 0 && (
                <p className="cifra mt-4 text-xs text-texto-tenue">
                  {t.lugar.desde(lugar.accesos[0].destino.nombre)} ·{" "}
                  {t.lugar.minutos(entero(lugar.accesos[0].minutos))}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
