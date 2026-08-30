/**
 * Landing «sin licencia» por municipio.
 *
 * Es la página de mayor intención de compra del sector: quien busca esto ya
 * ha decidido alquilar y solo teme no poder. Los grandes agregadores tienen
 * la página genérica pero no la del municipio, así que aquí se compite en un
 * terreno vacío.
 *
 * Enseña las dos salidas reales de quien no tiene título, y no una sola:
 * los barcos que puede gobernar él y los que van con patrón. Mezclarlas en
 * un único listado sería mentirle a medias.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Migas, migasBase } from "@/components/migas";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import {
  buscarBarcos,
  contarSinTitulacion,
  listarDestinos,
  obtenerDestino,
} from "@/lib/consultas";
import { FILTROS_VACIOS } from "@/lib/filtros";
import { entero, euro } from "@/lib/formato";
import { esIdioma, IDIOMA_POR_DEFECTO, IDIOMAS } from "@/lib/idiomas";
import { esIndexable } from "@/lib/indexacion";
import { alternativas, ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export async function generateStaticParams() {
  const destinos = await listarDestinos();
  return IDIOMAS.flatMap((idioma) =>
    destinos.map((d) => ({ idioma, destino: d.slug })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/sin-licencia/[destino]">,
): Promise<Metadata> {
  const { idioma, destino: slug } = await props.params;
  if (!esIdioma(idioma)) return {};

  const destino = await obtenerDestino(slug);
  if (!destino) return { title: "404" };

  const t = textos(idioma);
  const indexable = esIndexable(idioma, {
    prosa: destino.sinLicencia,
    idiomaProsa: destino.idiomaProsa,
    barcos: (await contarSinTitulacion()).get(slug) ?? 0,
  });

  return {
    title: t.sinLicenciaMunicipio.titulo(destino.nombre),
    description: t.sinLicenciaMunicipio.descripcion(destino.nombre),
    alternates: alternativas({ tipo: "sinLicenciaDestino", destino: slug }, idioma),
    // La página existe y se puede enlazar; simplemente no entra al índice
    // hasta que tenga flota y texto propio. `follow` para que el rastreo
    // siga hasta las fichas de los barcos.
    robots: indexable ? undefined : { index: false, follow: true },
  };
}

export default async function SinLicenciaEnDestino(
  props: PageProps<"/[idioma]/sin-licencia/[destino]">,
) {
  const { idioma, destino: slug } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const destino = await obtenerDestino(slug);
  if (!destino) notFound();

  const t = textos(idioma);

  const [sinTitulo, conPatron, sinTitulacion] = await Promise.all([
    buscarBarcos({ ...FILTROS_VACIOS, destino: slug, sinLicencia: true, orden: "precio-asc" }),
    buscarBarcos({ ...FILTROS_VACIOS, destino: slug, conPatron: true, orden: "precio-asc" }),
    contarSinTitulacion(),
  ]);

  // Un barco que no exige titulación y además ofrece patrón sale en los dos
  // bloques. Sumar los dos totales lo contaría dos veces: diría que hay más
  // flota de la que hay y, peor, dejaría pasar el umbral de seis barcos con
  // cuatro. El recuento bueno es el de la unión, el mismo que usa el sitemap.
  const total = sinTitulacion.get(slug) ?? 0;
  const todos = [...sinTitulo.barcos, ...conPatron.barcos];
  const masBarato = todos.length > 0 ? Math.min(...todos.map((b) => b.precioDia)) : 0;

  // La prosa y las preguntas están escritas a mano en un idioma concreto.
  // Igual que en la landing de destino: o coinciden con el idioma de la
  // página, o no se pintan ni se marcan en JSON-LD.
  const prosaTraducida = esIdioma(destino.idiomaProsa) && destino.idiomaProsa === idioma;
  const prosa = prosaTraducida ? destino.sinLicencia : null;
  const preguntas = prosaTraducida
    ? destino.preguntas.filter((p) => p.bloque === "sinLicencia")
    : [];

  const titulo = t.sinLicenciaMunicipio.titulo(destino.nombre);

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          titulo,
          todos.map((b) => ({
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
              {
                nombre: destino.nombre,
                pagina: { tipo: "sinLicenciaDestino", destino: slug },
              },
            ]}
            idioma={idioma}
          />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            {destino.provincia} · {destino.comunidad}
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {titulo}
          </h1>

          {total > 0 && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
              {t.sinLicenciaMunicipio.resumen(
                t.portada.nBarcos(entero(total)),
                destino.nombre,
                euro(masBarato),
              )}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {total === 0 ? (
          <p className="rounded-carta border border-borde bg-superficie p-8 text-center text-texto-suave">
            {t.sinLicenciaMunicipio.sinFlota(destino.nombre)}
          </p>
        ) : (
          <>
            {sinTitulo.barcos.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-semibold text-texto">
                  {t.sinLicenciaMunicipio.bloqueTu}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-texto-suave">
                  {t.sinLicenciaMunicipio.bloqueTuNota}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sinTitulo.barcos.map((barco, i) => (
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

            {conPatron.barcos.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-texto">
                  {t.sinLicenciaMunicipio.bloquePatron}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-texto-suave">
                  {t.sinLicenciaMunicipio.bloquePatronNota}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {conPatron.barcos.map((barco) => (
                    <TarjetaBarco key={barco.slug} barco={barco} idioma={idioma} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            {prosa ? (
              <Contenido texto={prosa} />
            ) : (
              <p className="text-sm leading-relaxed text-texto-suave">
                {t.destino.guiaOtroIdioma}{" "}
                <Link
                  className="underline underline-offset-4"
                  href={ruta(
                    { tipo: "sinLicenciaDestino", destino: slug },
                    IDIOMA_POR_DEFECTO,
                  )}
                >
                  {t.destino.verGuiaEs}
                </Link>
              </p>
            )}

            {preguntas.length > 0 && (
              <div className="mt-12">
                <Faq
                  idioma={idioma}
                  preguntas={preguntas.map((p) => ({
                    pregunta: p.pregunta,
                    respuesta: p.respuesta,
                  }))}
                />
              </div>
            )}

            <p className="mt-10">
              <Link
                className="text-sm font-medium text-acento underline underline-offset-4"
                href={ruta({ tipo: "destino", destino: slug }, idioma)}
              >
                {t.sinLicenciaMunicipio.verTodos(destino.nombre)}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
