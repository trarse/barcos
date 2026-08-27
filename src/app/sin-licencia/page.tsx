import type { Metadata } from "next";
import Link from "next/link";

import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Migas } from "@/components/migas";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import { buscarBarcos, listarDestinos } from "@/lib/consultas";
import { FILTROS_VACIOS } from "@/lib/filtros";
import { entero, euro } from "@/lib/formato";
import { listaJsonLd, rutas } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Alquiler de barcos sin licencia",
  description:
    "Embarcaciones que puedes gobernar sin titulación náutica: hasta 5 metros y 15 caballos. Qué dice la ley, dónde puedes navegar y el precio final de cada barco.",
  alternates: { canonical: rutas.sinLicencia() },
};

const PREGUNTAS = [
  {
    pregunta: "¿Qué barcos se pueden alquilar sin licencia en España?",
    respuesta:
      "Embarcaciones de hasta 5 metros de eslora con motor de potencia máxima 15 caballos (11,03 kW). Es lo que permite el Real Decreto 875/2014 sin ninguna titulación náutica, siempre que se reciba una instrucción previa de la empresa de alquiler y se navegue de día.",
  },
  {
    pregunta: "¿Hasta dónde puedo alejarme de la costa sin título?",
    respuesta:
      "Hasta 2 millas náuticas de un puerto, marina o lugar de abrigo, y solo durante el día. Fuera de ese límite hace falta al menos la licencia de navegación o el PER. Muchos contratos de alquiler restringen además la zona a una bahía concreta.",
  },
  {
    pregunta: "¿Necesito hacer algún curso antes?",
    respuesta:
      "No hay curso oficial, pero la empresa de alquiler está obligada a darte una instrucción básica antes de soltar amarras: manejo del motor, normas de seguridad, uso de la radio y qué hacer ante una emergencia. Suele durar entre quince y treinta minutos en el pantalán.",
  },
  {
    pregunta: "¿Puedo llevar un barco sin licencia de noche?",
    respuesta:
      "No. La exención de titulación solo cubre la navegación diurna. Si quieres salir al atardecer y volver con luces, necesitas título o contratar un patrón.",
  },
  {
    pregunta: "¿Qué pasa con la fianza si no tengo título?",
    respuesta:
      "Es igual que en cualquier alquiler: se bloquea un importe en la tarjeta al recoger el barco y se libera al devolverlo sin daños. En las embarcaciones sin licencia suele ser más baja, entre 300 y 600 euros, porque el valor del barco también lo es.",
  },
];

export default async function SinLicencia() {
  const [{ barcos, total }, destinos] = await Promise.all([
    buscarBarcos({ ...FILTROS_VACIOS, sinLicencia: true, orden: "precio-asc" }),
    listarDestinos(),
  ]);

  const masBarato = barcos.length > 0 ? Math.min(...barcos.map((b) => b.precioDia)) : 0;
  const conFlota = new Set(barcos.map((b) => b.destinoSlug));

  return (
    <>
      <JsonLd
        datos={listaJsonLd(
          "Barcos sin licencia en España",
          barcos.map((b) => ({ nombre: b.nombre, ruta: rutas.barco(b.slug) })),
        )}
      />

      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: "Inicio", ruta: rutas.home() },
              { nombre: "Sin licencia", ruta: rutas.sinLicencia() },
            ]}
          />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            Sin titulación náutica
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            Alquiler de barcos sin licencia
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            Hasta 5 metros y 15 caballos se pueden gobernar sin ningún título.
            Es el segmento que más crece en España y el que peor explica el
            resto del sector.
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
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {barcos.map((barco, i) => (
            <TarjetaBarco key={barco.slug} barco={barco} prioridad={i < 3} />
          ))}
        </div>

        {conFlota.size > 0 && (
          <nav aria-label="Destinos con barcos sin licencia" className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
              Dónde hay barcos sin licencia
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {destinos
                .filter((d) => conFlota.has(d.slug))
                .map((destino) => (
                  <li key={destino.slug}>
                    <Link
                      href={`${rutas.destino(destino.slug)}?sin-licencia=1`}
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
              Qué dice exactamente la ley
            </h2>

            <div className="mt-5 space-y-4">
              <p className="max-w-[68ch] leading-relaxed text-texto-suave">
                El Real Decreto 875/2014 permite gobernar sin titulación
                embarcaciones de motor de hasta 5 metros de eslora y potencia
                máxima de 15 caballos, y motos náuticas dentro de un circuito
                cerrado y vigilado. La condición es recibir una instrucción
                previa de la empresa de alquiler y no alejarse más de 2 millas
                de un puerto o lugar de abrigo, siempre de día.
              </p>
              <p className="max-w-[68ch] leading-relaxed text-texto-suave">
                Con esas restricciones se llega perfectamente a las calas de la
                misma bahía, que es para lo que la mayoría de la gente alquila.
                Lo que no se puede hacer es cruzar entre islas, salir de noche
                ni navegar con mar formada: para eso hacen falta título y un
                barco más grande, o contratar patrón.
              </p>
              <p className="max-w-[68ch] leading-relaxed text-texto-suave">
                La alternativa que casi nadie menciona: cualquier barco de esta
                web se puede alquilar con patrón profesional incluido. Sale más
                caro que una neumática pequeña, pero abre toda la flota sin
                necesidad de ningún papel.
              </p>
            </div>

            <div className="mt-12">
              <Faq preguntas={PREGUNTAS} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
