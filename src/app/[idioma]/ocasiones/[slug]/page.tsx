/**
 * Ocasión: despedida, cumpleaños, empresa, pedida.
 *
 * No es una actividad —eso son las experiencias— sino el motivo por el que se
 * celebra algo a bordo. Son consultas distintas con intención y ticket
 * distintos, y por eso cada una tiene su página: una sola no puede rankear
 * para «despedida de soltera en barco» y «barco para evento de empresa».
 *
 * La flota se filtra por capacidad. Enseñar un barco de cinco plazas a un
 * grupo de doce es hacerle perder el tiempo a todo el mundo.
 *
 * Las de empresa y las bodas no van al carrito: necesitan factura, seguro
 * documentado y a veces contrato. Mandarlas al checkout es perder la venta.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import { idiomasDeLaOcasion, obtenerOcasion, ocasionesDe } from "@/datos/ocasiones";
import { buscarBarcos } from "@/lib/consultas";
import { FILTROS_VACIOS } from "@/lib/filtros";
import { entero, euro } from "@/lib/formato";
import { enlacesVivos } from "@/lib/enlaces";
import { esIdioma, ETIQUETAS, IDIOMAS } from "@/lib/idiomas";
import { ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { urlAbsoluta } from "@/lib/sitio";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

function alternativasOcasion(slug: string, idioma: string) {
  const languages: Record<string, string> = {};
  for (const otro of idiomasDeLaOcasion(slug)) {
    languages[ETIQUETAS[otro].hreflang] = ruta({ tipo: "ocasion", slug }, otro);
  }
  return { canonical: ruta({ tipo: "ocasion", slug }, idioma as never), languages };
}

export function generateStaticParams() {
  return IDIOMAS.flatMap((idioma) =>
    ocasionesDe(idioma).map((o) => ({ idioma, slug: o.slug })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/ocasiones/[slug]">,
): Promise<Metadata> {
  const { idioma, slug } = await props.params;
  if (!esIdioma(idioma)) return {};

  const ocasion = obtenerOcasion(slug, idioma);
  if (!ocasion) return { title: "404" };

  return {
    title: ocasion.titulo,
    description: ocasion.descripcion,
    alternates: alternativasOcasion(slug, idioma),
    openGraph: {
      type: "website",
      title: ocasion.titulo,
      description: ocasion.descripcion,
      url: urlAbsoluta(ruta({ tipo: "ocasion", slug }, idioma)),
    },
  };
}

export default async function PaginaOcasion(
  props: PageProps<"/[idioma]/ocasiones/[slug]">,
) {
  const { idioma, slug } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const ocasion = obtenerOcasion(slug, idioma);
  if (!ocasion) notFound();

  const t = textos(idioma);
  const otras = ocasionesDe(idioma).filter((o) => o.slug !== slug);
  const relacionados = await enlacesVivos(ocasion.relacionados, idioma);

  const { barcos, total } = await buscarBarcos({
    ...FILTROS_VACIOS,
    capacidadMinima: ocasion.capacidadMinima,
    conPatron: true,
    orden: "precio-asc",
  });

  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  // El número que decide la reserva no es el del barco: es el de cada uno.
  const porPersona = masBarato > 0 ? Math.round(masBarato / ocasion.capacidadMinima) : 0;

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          ocasion.titulo,
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
              { nombre: t.ocasiones.titulo, pagina: { tipo: "ocasiones" } },
              { nombre: ocasion.nombre, pagina: { tipo: "ocasion", slug } },
            ]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {ocasion.titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {ocasion.descripcion}
          </p>

          {porPersona > 0 && (
            <p className="mt-5 text-texto-suave">
              {t.ocasiones.desdePorPersona(
                euro(porPersona),
                entero(ocasion.capacidadMinima),
              )}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="max-w-3xl">
          <Contenido texto={ocasion.contenido} />
        </div>

        {ocasion.porPresupuesto && (
          <aside className="mt-10 max-w-3xl rounded-carta border border-acento/40 bg-superficie p-6">
            <h2 className="font-display text-lg font-semibold text-texto">
              {t.ocasiones.presupuestoTitulo}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-texto-suave">
              {t.ocasiones.presupuestoTexto}
            </p>
          </aside>
        )}

        {total > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-texto">
              {t.ocasiones.flotaTitulo(entero(ocasion.capacidadMinima))}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-texto-suave">
              {t.ocasiones.flotaNota}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {barcos.map((barco, i) => (
                <TarjetaBarco
                  key={barco.slug}
                  barco={barco}
                  idioma={idioma}
                  prioridad={i < 3}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-14 max-w-3xl">
          <Faq idioma={idioma} preguntas={ocasion.preguntas} />

          {relacionados.length > 0 && (
            <div className="mt-12 border-t border-borde pt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                {t.guias.seguirPor}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {relacionados.map((r) => (
                  <li key={r.texto}>
                    <Link
                      href={ruta(r.pagina, idioma)}
                      className="inline-block rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                    >
                      {r.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      {otras.length > 0 && (
        <section className="border-t border-borde bg-superficie">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-texto">
              {t.ocasiones.otras}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {otras.map((otra) => (
                <li key={otra.slug}>
                  <Link
                    href={ruta({ tipo: "ocasion", slug: otra.slug }, idioma)}
                    className="inline-block rounded-md border border-borde px-3 py-1.5 text-sm font-medium text-texto transition-colors hover:border-acento hover:text-acento"
                  >
                    {otra.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
