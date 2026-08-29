import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import {
  buscarBarcos,
  obtenerDestino,
  obtenerTipo,
  paresDestinoTipo,
  tiposEnDestino,
} from "@/lib/consultas";
import { FILTROS_VACIOS } from "@/lib/filtros";
import { entero, euro } from "@/lib/formato";
import { esIdioma, IDIOMAS, tipoInterno, tipoSimple } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

/**
 * Solo se prerenderizan las combinaciones que tienen flota, en los tres
 * idiomas. El segmento del tipo va ya localizado: `sailboat`, no `velero`.
 */
export async function generateStaticParams() {
  const pares = await paresDestinoTipo();
  return IDIOMAS.flatMap((idioma) =>
    pares.map((par) => ({
      idioma,
      destino: par.destino,
      tipo: tipoSimple(par.tipo, idioma),
    })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/alquiler-barcos/[destino]/[tipo]">,
): Promise<Metadata> {
  const { idioma, destino: slugDestino, tipo: slugUrl } = await props.params;
  if (!esIdioma(idioma)) return {};

  const slugTipo = tipoInterno(slugUrl, idioma);
  if (!slugTipo) return { title: "404" };

  const [destino, tipo] = await Promise.all([
    obtenerDestino(slugDestino),
    obtenerTipo(slugTipo),
  ]);
  if (!destino || !tipo) return { title: "404" };

  const t = textos(idioma);
  const plural = t.tiposBarco[slugTipo as keyof typeof t.tiposBarco] ?? tipo.plural;
  const titulo = `${t.busqueda.tituloConTipo(plural)} ${t.busqueda.enDestino(destino.nombre)}`;
  const pagina = { tipo: "destinoTipo" as const, destino: slugDestino, tipoBarco: slugTipo };

  return {
    title: titulo,
    description: `${titulo}. ${t.descripcionTipo[tipo.slug as keyof typeof t.descripcionTipo] ?? tipo.descripcion}`,
    alternates: alternativas(pagina, idioma),
    openGraph: {
      type: "website",
      title: titulo,
      url: alternativas(pagina, idioma).canonical,
    },
  };
}

export default async function LandingDestinoTipo(
  props: PageProps<"/[idioma]/alquiler-barcos/[destino]/[tipo]">,
) {
  const { idioma, destino: slugDestino, tipo: slugUrl } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const slugTipo = tipoInterno(slugUrl, idioma);
  if (!slugTipo) notFound();

  const [destino, tipo] = await Promise.all([
    obtenerDestino(slugDestino),
    obtenerTipo(slugTipo),
  ]);
  if (!destino || !tipo) notFound();

  const t = textos(idioma);
  const filtros = { ...FILTROS_VACIOS, destino: slugDestino, tipo: slugTipo };

  const [{ barcos, total }, hermanos] = await Promise.all([
    buscarBarcos(filtros),
    tiposEnDestino(slugDestino),
  ]);

  // Una combinación sin flota no debe existir como página indexable.
  if (total === 0) notFound();

  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  const plural = t.tiposBarco[slugTipo as keyof typeof t.tiposBarco] ?? tipo.plural;
  const titulo = `${t.busqueda.tituloConTipo(plural)} ${t.busqueda.enDestino(destino.nombre)}`;
  const busqueda = ruta({ tipo: "busqueda" }, idioma);

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          titulo,
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
              {
                nombre: destino.nombre,
                pagina: { tipo: "destino", destino: slugDestino },
              },
              {
                nombre: plural,
                pagina: {
                  tipo: "destinoTipo",
                  destino: slugDestino,
                  tipoBarco: slugTipo,
                },
              },
            ]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {t.descripcionTipo[tipo.slug as keyof typeof t.descripcionTipo] ??
              tipo.descripcion}
          </p>

          <p className="mt-5 text-texto-suave">
            {t.destino.disponiblesDesde(
              t.portada.nBarcos(entero(total)),
              euro(masBarato),
            )}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
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

        {total > barcos.length && (
          <div className="mt-8 text-center">
            <Link
              href={`${busqueda}?destino=${slugDestino}&tipo=${slugTipo}`}
              className="inline-block rounded-md bg-marca px-6 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
            >
              {t.destino.verLosN(entero(total))}
            </Link>
          </div>
        )}
      </div>

      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-texto sm:text-3xl">
            {t.destino.tipoEn(plural, destino.nombre)}
          </h2>
          <div className="mt-5">
            {esIdioma(destino.idiomaProsa) && destino.idiomaProsa === idioma ? (
              <Contenido texto={destino.contenido} />
            ) : (
              <p className="text-sm leading-relaxed text-texto-suave">
                {t.destino.guiaOtroIdioma}
              </p>
            )}
          </div>

          {hermanos.length > 1 && (
            <nav aria-label={t.destino.otrosTiposEn(destino.nombre)} className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                {t.destino.otrosTiposEn(destino.nombre)}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {hermanos
                  .filter((h) => h.slug !== slugTipo)
                  .map((hermano) => (
                    <li key={hermano.slug}>
                      <Link
                        href={ruta(
                          {
                            tipo: "destinoTipo",
                            destino: slugDestino,
                            tipoBarco: hermano.slug,
                          },
                          idioma,
                        )}
                        className="inline-flex items-baseline gap-1.5 rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                      >
                        {t.tiposBarco[hermano.slug as keyof typeof t.tiposBarco] ??
                          hermano.plural}
                        <span className="cifra text-xs text-texto-tenue">
                          {hermano.n}
                        </span>
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link
                    href={ruta({ tipo: "destino", destino: slugDestino }, idioma)}
                    className="inline-block rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-acento transition-colors hover:border-acento"
                  >
                    {t.destino.todosLosDe(destino.nombre)}
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
