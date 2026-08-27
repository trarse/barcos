import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { JsonLd } from "@/components/json-ld";
import { Migas } from "@/components/migas";
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
import { listaJsonLd, rutas } from "@/lib/seo";

export const revalidate = 3600;

/**
 * Solo se prerenderizan las combinaciones que tienen flota. `dynamicParams`
 * sigue activo, así que una pareja nueva se genera en cuanto exista.
 */
export async function generateStaticParams() {
  const pares = await paresDestinoTipo();
  return pares.map((par) => ({ destino: par.destino, tipo: par.tipo }));
}

export async function generateMetadata(
  props: PageProps<"/alquiler-barcos/[destino]/[tipo]">,
): Promise<Metadata> {
  const { destino: slugDestino, tipo: slugTipo } = await props.params;
  const [destino, tipo] = await Promise.all([
    obtenerDestino(slugDestino),
    obtenerTipo(slugTipo),
  ]);
  if (!destino || !tipo) return { title: "Página no encontrada" };

  const titulo = `Alquiler de ${tipo.plural.toLowerCase()} en ${destino.nombre}`;

  return {
    title: titulo,
    description: `${titulo} con el precio final calculado: combustible, limpieza, amarre, tasas e IVA incluidos. ${tipo.descripcion}`,
    alternates: { canonical: rutas.destinoTipo(slugDestino, slugTipo) },
    openGraph: {
      type: "website",
      title: titulo,
      url: rutas.destinoTipo(slugDestino, slugTipo),
    },
  };
}

export default async function LandingDestinoTipo(
  props: PageProps<"/alquiler-barcos/[destino]/[tipo]">,
) {
  const { destino: slugDestino, tipo: slugTipo } = await props.params;

  const [destino, tipo] = await Promise.all([
    obtenerDestino(slugDestino),
    obtenerTipo(slugTipo),
  ]);
  if (!destino || !tipo) notFound();

  // Sin `searchParams`, para que la página se prerenderice. Filtrar lleva al
  // buscador, que es donde tiene sentido el render bajo demanda.
  const filtros = {
    ...FILTROS_VACIOS,
    destino: slugDestino,
    tipo: slugTipo,
  };

  const [{ barcos, total }, hermanos] = await Promise.all([
    buscarBarcos(filtros),
    tiposEnDestino(slugDestino),
  ]);

  // Una combinación sin flota no debe existir como página indexable.
  if (total === 0) notFound();

  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  const ruta = rutas.destinoTipo(slugDestino, slugTipo);
  const titulo = `Alquiler de ${tipo.plural.toLowerCase()} en ${destino.nombre}`;

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
              { nombre: destino.nombre, ruta: rutas.destino(slugDestino) },
              { nombre: tipo.plural, ruta },
            ]}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {tipo.descripcion}
          </p>

          <p className="mt-5 text-texto-suave">
            <strong className="cifra font-semibold text-texto">
              {entero(total)} {total === 1 ? "barco" : "barcos"}
            </strong>{" "}
            desde{" "}
            <strong className="cifra font-semibold text-texto">{euro(masBarato)}</strong>{" "}
            al día con todo incluido.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {barcos.map((barco, i) => (
            <TarjetaBarco key={barco.slug} barco={barco} prioridad={i < 3} />
          ))}
        </div>

        {total > barcos.length && (
          <div className="mt-8 text-center">
            <Link
              href={`${rutas.busqueda()}?destino=${slugDestino}&tipo=${slugTipo}`}
              className="inline-block rounded-md bg-marca px-6 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
            >
              Ver los {entero(total)} barcos
            </Link>
          </div>
        )}
      </div>

      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-texto sm:text-3xl">
            {tipo.plural} en {destino.nombre}
          </h2>
          <div className="mt-5">
            <Contenido texto={destino.contenido} />
          </div>

          {hermanos.length > 1 && (
            <nav aria-label="Otros tipos de barco" className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                Otros barcos en {destino.nombre}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {hermanos
                  .filter((h) => h.slug !== slugTipo)
                  .map((hermano) => (
                    <li key={hermano.slug}>
                      <Link
                        href={rutas.destinoTipo(slugDestino, hermano.slug)}
                        className="inline-flex items-baseline gap-1.5 rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                      >
                        {hermano.plural}
                        <span className="cifra text-xs text-texto-tenue">{hermano.n}</span>
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link
                    href={rutas.destino(slugDestino)}
                    className="inline-block rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-acento transition-colors hover:border-acento"
                  >
                    Todos los barcos de {destino.nombre}
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
