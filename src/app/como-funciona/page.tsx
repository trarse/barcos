import type { Metadata } from "next";
import Link from "next/link";

import { Faq } from "@/components/faq";
import { Migas } from "@/components/migas";
import { rutas } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Cómo reservar un barco en Barlovento: qué incluye el precio, qué pasa con la fianza, qué llevar el día de la salida y cómo se resuelve un problema.",
  alternates: { canonical: "/como-funciona" },
};

const PASOS = [
  {
    titulo: "Busca con el precio real",
    texto:
      "Cada resultado enseña el total por día con combustible estimado, limpieza, amarre, tasas e IVA dentro. Ese es el número que ordena la lista, así que comparar barcos es comparar lo que vas a pagar, no tarifas que se quedan a medias.",
  },
  {
    titulo: "Ajusta la reserva y mira el desglose",
    texto:
      "En la ficha puedes mover los días, las horas de navegación previstas y si quieres patrón. Cada concepto se recalcula delante de ti. Si vas a hacer travesía en vez de un día de calas, súbelo: el combustible cambia mucho y es mejor saberlo antes.",
  },
  {
    titulo: "Reserva",
    texto:
      "Los barcos con reserva inmediata se confirman al momento. En el resto, el propietario responde normalmente en menos de una hora. En ambos casos el importe que ves es el que se cobra: no hay un paso final con sorpresas.",
  },
  {
    titulo: "El día de la salida",
    texto:
      "Lleva el DNI, la titulación si el barco la exige y una tarjeta con saldo para la fianza. En el pantalán te explican el barco, se hace el inventario y se firma el parte de salida con fotos. Si es tu primera vez, pide que te enseñen a fondear.",
  },
  {
    titulo: "A la vuelta",
    texto:
      "Se revisa el barco, se libera la fianza y ya está. El combustible que hayas gastado de menos respecto a lo estimado se te devuelve; el de más, se cobra al precio del surtidor del puerto, sin recargo.",
  },
];

const PREGUNTAS = [
  {
    pregunta: "¿Qué incluye exactamente el precio que veo?",
    respuesta:
      "El alquiler del barco ajustado a la temporada, el combustible estimado para las horas de navegación previstas, la limpieza final, el amarre en el puerto de salida, las tasas portuarias y el IVA. La fianza va aparte porque se bloquea, no se cobra.",
  },
  {
    pregunta: "¿Y si gasto más o menos combustible del estimado?",
    respuesta:
      "Se ajusta a la vuelta. El estimado se calcula con el consumo real del barco y las horas que hayas indicado; si navegas menos, se te devuelve la diferencia, y si navegas más se cobra al precio del surtidor, sin margen añadido.",
  },
  {
    pregunta: "¿Cómo funciona la fianza?",
    respuesta:
      "Se bloquea en la tarjeta el día de la recogida y se libera al devolver el barco sin daños. Va de 300 euros en una neumática a 12.000 en un yate, y el importe exacto aparece en cada ficha antes de reservar.",
  },
  {
    pregunta: "¿Puedo cancelar?",
    respuesta:
      "Sí. Hasta 7 días antes se devuelve el importe íntegro. Entre 7 y 2 días, el 50 %. En las 48 horas previas no hay devolución, salvo que el parte meteorológico impida navegar: en ese caso se devuelve todo o se cambia la fecha, sin coste.",
  },
  {
    pregunta: "¿Qué pasa si hay una avería?",
    respuesta:
      "Llama al teléfono que figura en el parte de salida. Si la avería impide navegar y no es atribuible a un mal uso, se devuelve la parte proporcional del alquiler y del combustible no consumido. No te remitimos al propietario para que lo discutas: lo resolvemos nosotros.",
  },
  {
    pregunta: "¿Necesito titulación?",
    respuesta:
      "Depende del barco. Hasta 5 metros y 15 caballos no hace falta ninguna. Por encima, licencia de navegación o PER según eslora y potencia. Puedes filtrar por barcos sin licencia o contratar patrón en cualquiera de la flota.",
  },
];

export default function ComoFunciona() {
  return (
    <>
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: "Inicio", ruta: rutas.home() },
              { nombre: "Cómo funciona", ruta: "/como-funciona" },
            ]}
          />

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            Cómo funciona
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            De la búsqueda a la devolución del barco, sin letra pequeña en
            ningún paso.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ol className="space-y-8">
          {PASOS.map((paso, i) => (
            <li key={paso.titulo} className="flex gap-5">
              <span
                className="cifra flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-borde-fuerte font-display text-sm font-semibold text-marca"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-texto">
                  {paso.titulo}
                </h2>
                <p className="mt-1.5 leading-relaxed text-texto-suave">{paso.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <Faq preguntas={PREGUNTAS} />
        </div>

        <div className="mt-12 text-center">
          <Link
            href={rutas.busqueda()}
            className="inline-block rounded-md bg-marca px-6 py-3.5 font-semibold text-fondo transition-opacity hover:opacity-90"
          >
            Buscar barco
          </Link>
        </div>
      </div>
    </>
  );
}
