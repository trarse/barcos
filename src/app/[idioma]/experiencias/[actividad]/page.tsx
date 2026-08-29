import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Contenido } from "@/components/contenido";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Migas } from "@/components/migas";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import {
  barcosDeExperiencia,
  listarExperiencias,
  obtenerExperiencia,
} from "@/lib/consultas";
import { entero, euro } from "@/lib/formato";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { listaJsonLd } from "@/lib/seo";
import { descripcionCorta } from "@/lib/prosa";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export async function generateStaticParams() {
  const experiencias = await listarExperiencias();
  return IDIOMAS.flatMap((idioma) =>
    experiencias.map((e) => ({ idioma, actividad: e.slug })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/experiencias/[actividad]">,
): Promise<Metadata> {
  const { idioma, actividad } = await props.params;
  if (!esIdioma(idioma)) return {};

  const experiencia = await obtenerExperiencia(actividad);
  if (!experiencia) return { title: "404" };

  const t = textos(idioma);
  const nombre =
    t.actividades[actividad as keyof typeof t.actividades] ?? experiencia.nombre;

  return {
    title: `${nombre} · ${t.nav.experiencias}`,
    description: descripcionCorta(experiencia, idioma),
    alternates: alternativas({ tipo: "experiencia", slug: actividad }, idioma),
    openGraph: {
      type: "website",
      title: experiencia.titular,
      description: descripcionCorta(experiencia, idioma),
      url: alternativas({ tipo: "experiencia", slug: actividad }, idioma).canonical,
    },
  };
}

export default async function LandingExperiencia(
  props: PageProps<"/[idioma]/experiencias/[actividad]">,
) {
  const { idioma, actividad } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const experiencia = await obtenerExperiencia(actividad);
  if (!experiencia) notFound();

  const t = textos(idioma);
  const prosaTraducida =
    esIdioma(experiencia.idiomaProsa) && experiencia.idiomaProsa === idioma;
  const barcos = await barcosDeExperiencia(actividad);
  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  const nombre =
    t.actividades[actividad as keyof typeof t.actividades] ?? experiencia.nombre;

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          experiencia.titular,
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
              { nombre: t.migas.inicio, pagina: { tipo: "home" } },
              { nombre: t.migas.experiencias, pagina: { tipo: "experiencias" } },
              { nombre, pagina: { tipo: "experiencia", slug: actividad } },
            ]}
            idioma={idioma}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {experiencia.titular}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {descripcionCorta(experiencia, idioma)}
          </p>

          {barcos.length > 0 && (
            <p className="mt-5 text-texto-suave">
              {t.destino.disponiblesDesde(
                t.portada.nBarcos(entero(barcos.length)),
                euro(masBarato),
              )}{" "}
              · {t.comun.unasHoras(experiencia.horas)}
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
      </div>

      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-texto sm:text-3xl">
              {t.pie.comoFunciona}
            </h2>
            <div className="mt-5">
              {prosaTraducida ? (
                <Contenido texto={experiencia.contenido} />
              ) : (
                <p className="text-sm leading-relaxed text-texto-suave">
                  {t.destino.guiaOtroIdioma}
                </p>
              )}
            </div>

            {prosaTraducida && experiencia.preguntas.length > 0 && (
              <div className="mt-12">
                <Faq
                  idioma={idioma}
                  preguntas={experiencia.preguntas.map((p) => ({
                    pregunta: p.pregunta,
                    respuesta: p.respuesta,
                  }))}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
