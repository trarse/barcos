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
import { listaJsonLd, rutas } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const experiencias = await listarExperiencias();
  return experiencias.map((e) => ({ actividad: e.slug }));
}

export async function generateMetadata(
  props: PageProps<"/experiencias/[actividad]">,
): Promise<Metadata> {
  const { actividad } = await props.params;
  const experiencia = await obtenerExperiencia(actividad);
  if (!experiencia) return { title: "Experiencia no encontrada" };

  return {
    title: experiencia.titular,
    description: experiencia.descripcion,
    alternates: { canonical: rutas.experiencia(actividad) },
    openGraph: {
      type: "website",
      title: experiencia.titular,
      description: experiencia.descripcion,
      url: rutas.experiencia(actividad),
    },
  };
}

export default async function LandingExperiencia(
  props: PageProps<"/experiencias/[actividad]">,
) {
  const { actividad } = await props.params;
  const experiencia = await obtenerExperiencia(actividad);
  if (!experiencia) notFound();

  const barcos = await barcosDeExperiencia(actividad);
  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          experiencia.titular,
          barcos.map((b) => ({ nombre: b.nombre, ruta: rutas.barco(b.slug) })),
        )}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: "Inicio", ruta: rutas.home() },
              { nombre: "Experiencias", ruta: rutas.experiencias() },
              { nombre: experiencia.nombre, ruta: rutas.experiencia(actividad) },
            ]}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {experiencia.titular}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {experiencia.descripcion}
          </p>

          {barcos.length > 0 && (
            <p className="mt-5 text-texto-suave">
              <strong className="cifra font-semibold text-texto">
                {entero(barcos.length)} barcos
              </strong>{" "}
              desde{" "}
              <strong className="cifra font-semibold text-texto">{euro(masBarato)}</strong>{" "}
              al día · unas {experiencia.horas} horas de navegación
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {barcos.map((barco, i) => (
            <TarjetaBarco key={barco.slug} barco={barco} prioridad={i < 3} />
          ))}
        </div>
      </div>

      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-texto sm:text-3xl">
              Cómo funciona
            </h2>
            <div className="mt-5">
              <Contenido texto={experiencia.contenido} />
            </div>

            <div className="mt-12">
              <Faq
                preguntas={experiencia.preguntas.map((p) => ({
                  pregunta: p.pregunta,
                  respuesta: p.respuesta,
                }))}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
