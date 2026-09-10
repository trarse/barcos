import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BotonImprimir } from "@/components/boton-imprimir";
import { db } from "@/lib/db";
import { eslora, euro, euroExacto, fechaLarga } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Contrato de alquiler · Estribor",
  description: "Contrato de alquiler de embarcación de recreo.",
  robots: { index: false, follow: false },
};

export default async function Contrato({
  params,
}: {
  params: Promise<{ referencia: string }>;
}) {
  const { referencia } = await params;
  const reserva = await db.reserva.findUnique({
    where: { referencia },
    include: {
      barco: {
        include: {
          tipo: { select: { nombre: true } },
          puerto: { include: { destino: { select: { nombre: true } } } },
          propietario: { select: { nombre: true } },
        },
      },
    },
  });
  if (!reserva) notFound();

  const b = reserva.barco;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            Estribor
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-texto">
            Contrato de alquiler de embarcación
          </h1>
          <p className="mt-1 text-sm text-texto-suave">
            Referencia {reserva.referencia} · Emitido el {fechaLarga(new Date(), "es")}
          </p>
        </div>
        <BotonImprimir />
      </div>

      <section>
        <h2 className="font-display text-lg font-semibold text-texto">Partes</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Armador</p>
            <p className="mt-1 font-medium text-texto">{b.propietario.nombre}</p>
          </div>
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Cliente</p>
            <p className="mt-1 font-medium text-texto">{reserva.clienteNombre}</p>
            <p className="text-sm text-texto-suave">{reserva.clienteEmail}</p>
            {reserva.clienteTelefono && (
              <p className="text-sm text-texto-suave">{reserva.clienteTelefono}</p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-texto">Embarcación</h2>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
          <Campo etiqueta="Barco" valor={b.nombre} />
          <Campo etiqueta="Fabricante" valor={`${b.fabricante} ${b.modelo}`} />
          <Campo etiqueta="Año" valor={String(b.anio)} />
          <Campo etiqueta="Eslora" valor={eslora(b.esloraCm)} />
          <Campo etiqueta="Capacidad" valor={`${b.capacidad} plazas`} />
          <Campo etiqueta="Tipo" valor={b.tipo.nombre} />
          <Campo etiqueta="Puerto base" valor={`${b.puerto.nombre} (${b.puerto.destino.nombre})`} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-texto">Periodo de alquiler</h2>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
          <Campo etiqueta="Embarque" valor={fechaLarga(reserva.fechaInicio, "es")} />
          <Campo etiqueta="Desembarque" valor={fechaLarga(reserva.fechaFin, "es")} />
          <Campo
            etiqueta="Duración"
            valor={`${reserva.numDias} ${reserva.numDias === 1 ? "día" : "días"}`}
          />
          <Campo etiqueta="Pasajeros" valor={String(reserva.numPersonas)} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-texto">Precio</h2>
        <div className="mt-3 rounded-carta border border-borde bg-superficie p-4">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-texto-suave">Total del alquiler (IVA incluido)</span>
            <span className="cifra font-display text-xl font-semibold text-acento">
              {euroExacto(reserva.precioTotalCents)}
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-4">
            <span className="text-sm text-texto-suave">Fianza (se devuelve tras la revisión)</span>
            <span className="cifra font-medium text-texto">{euro(b.fianza)}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-texto-tenue">
            Incluye combustible estimado, limpieza final, amarre y tasas, e IVA 21 %.
            {b.patronDia !== null && " Patrón disponible con suplemento."}
            {b.requiereTitulacion &&
              " Se exige titulación náutica para gobernar sin patrón."}
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-texto">Condiciones</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-texto-suave">
          <li>
            El cliente se compromete a gobernar la embarcación de forma prudente y a
            respetar la normativa marítima vigente, la capacidad máxima y la zona de
            navegación acordada.
          </li>
          <li>
            {b.requiereTitulacion
              ? "Es obligatorio presentar la titulación náutica válida antes del embarque."
              : "No se exige titulación; se realizará una instrucción de seguridad antes de zarpar."}
          </li>
          <li>
            El combustible no incluido en el estimado se abonará según consumo real al
            regreso.
          </li>
          <li>
            La fianza se retiene como garantía y se devuelve íntegra tras la revisión del
            barco, salvo daños o pérdidas imputables al cliente.
          </li>
          <li>
            Las cancelaciones deben comunicarse por escrito; la devolución se rige por la
            política de cancelación vigente en el momento de la reserva.
          </li>
          <li>
            La entrega del barco se realiza con el inventario y el estado reflejados en la
            hoja de entrega que firma el cliente al embarcar.
          </li>
        </ol>
      </section>

      <section className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="border-t border-borde pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
            El armador
          </p>
          <p className="mt-1 text-sm text-texto">{b.propietario.nombre}</p>
          <p className="mt-8 text-sm text-texto-tenue">Firma: ________________________</p>
        </div>
        <div className="border-t border-borde pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
            El cliente
          </p>
          <p className="mt-1 text-sm text-texto">{reserva.clienteNombre}</p>
          <p className="mt-8 text-sm text-texto-tenue">Firma: ________________________</p>
        </div>
      </section>
    </main>
  );
}

function Campo({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
        {etiqueta}
      </p>
      <p className="mt-0.5 text-texto">{valor}</p>
    </div>
  );
}
