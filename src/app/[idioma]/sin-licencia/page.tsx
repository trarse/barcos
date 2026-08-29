import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import { paginasFijas } from "@/datos/paginas";
import { buscarBarcos, listarDestinos } from "@/lib/consultas";
import { FILTROS_VACIOS } from "@/lib/filtros";
import { entero, euro } from "@/lib/formato";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/sin-licencia">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const p = paginasFijas(idioma).sinLicencia;

  return {
    title: p.titulo,
    description: p.descripcion,
    alternates: alternativas({ tipo: "sinLicencia" }, idioma),
  };
}

export default async function SinLicencia(
  props: PageProps<"/[idioma]/sin-licencia">,
) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);
  const p = paginasFijas(idioma).sinLicencia;

  const [{ barcos, total }, destinos] = await Promise.all([
    buscarBarcos({ ...FILTROS_VACIOS, sinLicencia: true, orden: "precio-asc" }),
    listarDestinos(),
  ]);

  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  const conFlota = new Set(barcos.map((b) => b.destinoSlug));
  const busqueda = ruta({ tipo: "busqueda" }, idioma);

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          p.titulo,
          barcos.map((b) => ({
            nombre: b.nombre,
            ruta: ruta({ tipo: "barco", slug: b.slug }, idioma),
          })),
        )}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              ...migasBase(idioma),
              { nombre: t.migas.sinLicencia, pagina: { tipo: "sinLicencia" } },
            ]}
            idioma={idioma}
          />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            {p.eyebrow}
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {p.titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {p.entradilla}
          </p>

          {total > 0 && (
            <p className="mt-5 text-texto-suave">
              {t.destino.disponiblesDesde(
                t.portada.nBarcos(entero(total)),
                euro(masBarato),
              )}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {barcos.map((barco, i) => (
            <TarjetaBarco
              key={barco.slug}
              barco={barco}
              idioma={idioma}
              prioridad={i < 3}
            />
          ))}
        </div>

        {conFlota.size > 0 && (
          <nav aria-label={p.dondeHay} className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
              {p.dondeHay}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {destinos
                .filter((d) => conFlota.has(d.slug))
                .map((destino) => (
                  <li key={destino.slug}>
                    <Link
                      href={`${busqueda}?destino=${destino.slug}&sin-licencia=1`}
                      className="inline-block rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                    >
                      {destino.nombre}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        )}
      </div>

      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-texto sm:text-3xl">
              {p.leyTitulo}
            </h2>

            <div className="mt-5 space-y-4">
              {p.parrafos.map((parrafo, i) => (
                <p key={i} className="max-w-[68ch] leading-relaxed text-texto-suave">
                  {parrafo}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <Faq preguntas={p.faq} idioma={idioma} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
