import { NextResponse } from "next/server";

import { db } from "@/lib/db";

/**
 * Fechas ya reservadas de un barco.
 *
 * Solo se devuelven las reservas que bloquean el calendario (pendiente o
 * confirmada) y que aún no han terminado. Es público a propósito: el
 * formulario de reserva lo consulta para avisar al cliente antes de que
 * intente unas fechas ocupadas.
 */
export async function GET(
  _req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const reservas = await db.reserva.findMany({
    where: {
      barcoId: id,
      estado: { in: ["pendiente", "confirmada"] },
      fechaFin: { gt: new Date() },
    },
    orderBy: { fechaInicio: "asc" },
    select: { fechaInicio: true, fechaFin: true },
  });

  const aFecha = (d: Date) => d.toISOString().slice(0, 10);

  return NextResponse.json({
    ok: true,
    reservado: reservas.map((r) => ({
      desde: aFecha(r.fechaInicio),
      hasta: aFecha(r.fechaFin),
    })),
  });
}
