import type { Metadata } from "next";
import Link from "next/link";

import { Faq } from "@/components/faq";
import { Migas } from "@/components/migas";
import { entero, euro } from "@/lib/formato";
import { rutas } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Publica tu barco",
  description:
    "Alquila tu embarcación con una comisión del 12 %, la más baja del sector. Sin exclusividad, tú pones el calendario y el precio.",
  alternates: { canonical: "/registrar-barco" },
};

const VENTAJAS = [
  {
    titulo: "Comisión del 12 %",
    texto:
      "Las plataformas grandes se quedan entre el 15 y el 20 %. Aquí son 12 puntos, sin cuota de alta ni permanencia.",
  },
  {
    titulo: "Sin exclusividad",
    texto:
      "Puedes seguir publicando en otras plataformas y alquilando por tu cuenta. El calendario se sincroniza por iCal con lo que ya uses.",
  },
  {
    titulo: "El precio lo pones tú",
    texto:
      "Tú fijas la tarifa base, el consumo, la limpieza y la fianza. Nosotros calculamos el total que ve el cliente y lo enseñamos desglosado, para que no te lleguen reclamaciones por el combustible.",
  },
  {
    titulo: "Cobro garantizado",
    texto:
      "El importe se transfiere 24 horas después de la salida. Si el cliente no aparece, cobras igual según la política de cancelación.",
  },
];

const PREGUNTAS = [
  {
    pregunta: "¿Qué necesito para publicar mi barco?",
    respuesta:
      "El despacho en vigor, el seguro de responsabilidad civil obligatorio, la última inspección técnica si le corresponde y el certificado de navegabilidad. Si vas a alquilar con patrón, además la titulación de quien vaya a patronear.",
  },
  {
    pregunta: "¿Cuánto puedo ganar?",
    respuesta:
      "Depende del barco y del puerto. Una lancha de 7 metros en la costa de Alicante que se alquile 60 días al año a 300 euros de tarifa base deja unos 15.800 euros netos después de comisión. Un velero de 12 metros en Baleares con 90 días de ocupación supera los 30.000.",
  },
  {
    pregunta: "¿Quién responde si hay un daño?",
    respuesta:
      "La fianza cubre los daños menores y se libera solo cuando confirmas que el barco ha vuelto bien. Por encima de la fianza entra el seguro. En los casos en que el cliente incumpla las condiciones del contrato, nos ocupamos nosotros de la reclamación.",
  },
  {
    pregunta: "¿Puedo bloquear fechas para mí?",
    respuesta:
      "Sí, el calendario es tuyo. Puedes bloquear días sueltos, temporadas enteras o sincronizarlo por iCal con Google Calendar o con la otra plataforma que uses.",
  },
];

export default function RegistrarBarco() {
  // Ejemplo con cifras del propio motor de precios, en céntimos.
  const tarifaDia = 30_000;
  const dias = 60;
  const bruto = tarifaDia * dias;
  const comision = Math.round(bruto * 0.12);

  return (
    <>
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: "Inicio", ruta: rutas.home() },
              { nombre: "Publicar mi barco", ruta: "/registrar-barco" },
            ]}
          />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            Para propietarios
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            Tu barco trabajando los días que tú no lo usas
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            Comisión del 12 %, sin exclusividad y con el precio desglosado para
            el cliente, que es lo que evita la mitad de los conflictos al
            devolver el barco.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {VENTAJAS.map((ventaja) => (
                <div
                  key={ventaja.titulo}
                  className="rounded-carta border border-borde bg-superficie p-5"
                >
                  <h2 className="font-display text-lg font-semibold text-texto">
                    {ventaja.titulo}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-texto-suave">
                    {ventaja.texto}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Faq preguntas={PREGUNTAS} />
            </div>
          </div>

          {/* Estimación de ingresos */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-carta border border-borde bg-superficie p-6">
              <h2 className="font-display text-xl font-semibold text-texto">
                Un ejemplo con números
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-texto-suave">
                Lancha de 7 metros, {entero(dias)} días alquilados al año a{" "}
                {euro(tarifaDia)} de tarifa base.
              </p>

              <dl className="mt-5 space-y-3">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-texto-suave">Ingreso bruto</dt>
                  <dd className="cifra text-sm font-medium text-texto">{euro(bruto)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-texto-suave">Comisión 12 %</dt>
                  <dd className="cifra text-sm font-medium text-texto">
                    −{euro(comision)}
                  </dd>
                </div>
              </dl>

              <div className="isobata my-5" />

              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-lg font-semibold text-texto">
                  Para ti
                </span>
                <span className="cifra font-display text-2xl font-semibold text-acento">
                  {euro(bruto - comision)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-texto-tenue">
                El combustible, la limpieza y el amarre los cobra el cliente
                aparte y llegan íntegros a quien los presta. La comisión se
                aplica solo sobre el alquiler.
              </p>

              <Link
                href={`mailto:hola@barlovento.es?subject=${encodeURIComponent("Quiero publicar mi barco")}`}
                className="mt-6 block rounded-md bg-marca px-5 py-3.5 text-center font-semibold text-fondo transition-opacity hover:opacity-90"
              >
                Empezar
              </Link>

              <p className="mt-3 text-center text-xs text-texto-tenue">
                Te contestamos el mismo día laborable.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
