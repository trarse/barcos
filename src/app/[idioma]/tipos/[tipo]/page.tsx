import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import {
  buscarBarcos,
  listarDestinos,
  listarTipos,
  obtenerTipo,
  paresDestinoTipo,
} from "@/lib/consultas";
import { FILTROS_VACIOS } from "@/lib/filtros";
import { entero, euro } from "@/lib/formato";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { textos } from "@/lib/textos";

/**
 * Landing por tipo de barco.
 *
 * Vive en /[idioma]/tipos/[tipo] pero se sirve en la URL con la palabra clave
 * delante —/es/alquiler-velero, /en/sailboat-rental, /de/segelboot-mieten—
 * mediante la reescritura de next.config.ts. El canónico apunta siempre a esa
 * forma, que es la que se enlaza y la que se indexa.
 */

export const revalidate = 3600;

export async function generateStaticParams() {
  const tipos = await listarTipos();
  return IDIOMAS.flatMap((idioma) => tipos.map((t) => ({ idioma, tipo: t.slug })));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/tipos/[tipo]">,
): Promise<Metadata> {
  const { idioma, tipo: slug } = await props.params;
  if (!esIdioma(idioma)) return {};

  const tipo = await obtenerTipo(slug);
  if (!tipo) return { title: "404" };

  const t = textos(idioma);
  const plural = t.tiposBarco[slug as keyof typeof t.tiposBarco] ?? tipo.plural;
  const titulo = `${t.busqueda.tituloConTipo(plural)} ${t.busqueda.enEspana}`;

  return {
    title: titulo,
    description: `${titulo}. ${t.descripcionTipo[tipo.slug as keyof typeof t.descripcionTipo] ?? tipo.descripcion}`,
    alternates: alternativas({ tipo: "tipoBarco", tipoBarco: slug }, idioma),
    openGraph: {
      type: "website",
      title: titulo,
      url: alternativas({ tipo: "tipoBarco", tipoBarco: slug }, idioma).canonical,
    },
  };
}

export default async function LandingTipo(props: PageProps<"/[idioma]/tipos/[tipo]">) {
  const { idioma, tipo: slug } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const tipo = await obtenerTipo(slug);
  if (!tipo) notFound();

  const t = textos(idioma);
  // Sin `searchParams`: esta página tiene que prerenderizarse.
  const filtros = { ...FILTROS_VACIOS, tipo: slug };

  const [{ barcos, total }, pares, destinos] = await Promise.all([
    buscarBarcos(filtros),
    paresDestinoTipo(),
    listarDestinos(),
  ]);

  const conEsteTipo = new Set(pares.filter((p) => p.tipo === slug).map((p) => p.destino));
  const destinosAqui = destinos.filter((d) => conEsteTipo.has(d.slug));

  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  const plural = t.tiposBarco[slug as keyof typeof t.tiposBarco] ?? tipo.plural;
  const titulo = `${t.busqueda.tituloConTipo(plural)} ${t.busqueda.enEspana}`;
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
              { nombre: plural, pagina: { tipo: "tipoBarco", tipoBarco: slug } },
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

          {total > 0 && (
            <p className="mt-5 text-texto-suave">
              {t.destino.disponiblesDesde(
                t.portada.nBarcos(entero(total)),
                euro(masBarato),
              )}
            </p>
          )}

          {tipo.sinLicencia && (
            <p className="mt-4 max-w-2xl rounded-md border border-acento bg-acento-suave px-4 py-3 text-sm leading-relaxed text-texto">
              <Link
                href={ruta({ tipo: "sinLicencia" }, idioma)}
                className="font-semibold text-acento hover:underline"
              >
                {t.pie.sinLicencia}
              </Link>
            </p>
          )}
        </div>
      </section>

      {destinosAqui.length > 0 && (
        <nav aria-label={t.destino.otrosDestinos} className="border-b border-borde bg-superficie">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <ul className="flex flex-wrap gap-2">
              {destinosAqui.map((destino) => (
                <li key={destino.slug}>
                  <Link
                    href={ruta(
                      { tipo: "destinoTipo", destino: destino.slug, tipoBarco: slug },
                      idioma,
                    )}
                    className="inline-block rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                  >
                    {t.destino.tipoEn(plural, destino.nombre)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

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
              href={`${busqueda}?tipo=${slug}`}
              className="inline-block rounded-md bg-marca px-6 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
            >
              {t.destino.verLosN(entero(total))}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
