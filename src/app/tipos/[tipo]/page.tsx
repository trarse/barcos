import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { Migas } from "@/components/migas";
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
import { listaJsonLd, rutas } from "@/lib/seo";

/**
 * Landing por tipo de barco.
 *
 * Vive en /tipos/[tipo] pero se sirve en /alquiler-[tipo] mediante la
 * reescritura de next.config.ts, que es la URL con la palabra clave delante.
 * Por eso el canonical apunta siempre a la forma bonita.
 */

export const revalidate = 3600;

export async function generateStaticParams() {
  const tipos = await listarTipos();
  return tipos.map((t) => ({ tipo: t.slug }));
}

export async function generateMetadata(
  props: PageProps<"/tipos/[tipo]">,
): Promise<Metadata> {
  const { tipo: slug } = await props.params;
  const tipo = await obtenerTipo(slug);
  if (!tipo) return { title: "Tipo no encontrado" };

  const titulo = `Alquiler de ${tipo.plural.toLowerCase()} en España`;

  return {
    title: titulo,
    description: `${titulo} con el precio final por delante: combustible, limpieza, amarre, tasas e IVA incluidos. ${tipo.descripcion}`,
    alternates: { canonical: rutas.tipo(slug) },
    openGraph: { type: "website", title: titulo, url: rutas.tipo(slug) },
  };
}

export default async function LandingTipo(props: PageProps<"/tipos/[tipo]">) {
  const { tipo: slug } = await props.params;

  const tipo = await obtenerTipo(slug);
  if (!tipo) notFound();

  // Sin `searchParams`: esta página tiene que prerenderizarse.
  const filtros = { ...FILTROS_VACIOS, tipo: slug };

  const [{ barcos, total }, pares, destinos] = await Promise.all([
    buscarBarcos(filtros),
    paresDestinoTipo(),
    listarDestinos(),
  ]);

  const conEsteTipo = new Set(
    pares.filter((p) => p.tipo === slug).map((p) => p.destino),
  );
  const destinosAqui = destinos.filter((d) => conEsteTipo.has(d.slug));

  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  const ruta = rutas.tipo(slug);
  const titulo = `Alquiler de ${tipo.plural.toLowerCase()} en España`;

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          titulo,
          barcos.map((b) => ({ nombre: b.nombre, ruta: rutas.barco(b.slug) })),
        )}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: "Inicio", ruta: rutas.home() },
              { nombre: "Alquiler de barcos", ruta: rutas.busqueda() },
              { nombre: tipo.plural, ruta },
            ]}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {tipo.descripcion}
          </p>

          {total > 0 && (
            <p className="mt-5 text-texto-suave">
              <strong className="cifra font-semibold text-texto">
                {entero(total)} {total === 1 ? "barco" : "barcos"}
              </strong>{" "}
              desde{" "}
              <strong className="cifra font-semibold text-texto">{euro(masBarato)}</strong>{" "}
              al día con todo incluido.
            </p>
          )}

          {tipo.sinLicencia && (
            <p className="mt-4 max-w-2xl rounded-md border border-acento bg-acento-suave px-4 py-3 text-sm leading-relaxed text-texto">
              Muchos modelos de esta categoría se gobiernan{" "}
              <Link href={rutas.sinLicencia()} className="font-semibold text-acento hover:underline">
                sin titulación náutica
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {destinosAqui.length > 0 && (
        <nav
          aria-label={`Destinos con ${tipo.plural.toLowerCase()}`}
          className="border-b border-borde bg-superficie"
        >
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <ul className="flex flex-wrap gap-2">
              {destinosAqui.map((destino) => (
                <li key={destino.slug}>
                  <Link
                    href={rutas.destinoTipo(destino.slug, slug)}
                    className="inline-block rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                  >
                    {tipo.plural} en {destino.nombre}
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
            <TarjetaBarco key={barco.slug} barco={barco} prioridad={i < 3} />
          ))}
        </div>

        {total > barcos.length && (
          <div className="mt-8 text-center">
            <Link
              href={`${rutas.busqueda()}?tipo=${slug}`}
              className="inline-block rounded-md bg-marca px-6 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
            >
              Ver los {entero(total)} {tipo.plural.toLowerCase()}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
