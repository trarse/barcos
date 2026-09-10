import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const FECHA = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Calendario total de la flota: para un rango de fechas devuelve, por barco,
 * sus reservas (pendiente/confirmada) y sus bloqueos. El admin ve toda la
 * flota; el armador solo sus barcos.
 */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const url = new URL(req.url);
  const desde = url.searchParams.get("desde");
  const hasta = url.searchParams.get("hasta");
  if (!desde || !hasta || !FECHA.test(desde) || !FECHA.test(hasta)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const inicio = new Date(`${desde}T00:00:00Z`);
  const fin = new Date(`${hasta}T00:00:00Z`);
  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime()) || fin.getTime() <= inicio.getTime()) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const where =
    usuario.rol === "armador" && usuario.propietarioId
      ? { propietarioId: usuario.propietarioId }
      : {};

  const barcos = await db.barco.findMany({
    where,
    orderBy: { nombre: "asc" },
    select: { id: true, nombre: true, puerto: { select: { nombre: true } } },
  });

  const ids = barcos.map((b) => b.id);
  const [reservas, bloques] = await Promise.all([
    db.reserva.findMany({
      where: {
        barcoId: { in: ids },
        estado: { in: ["pendiente", "confirmada"] },
        fechaInicio: { lt: fin },
        fechaFin: { gt: inicio },
      },
      select: { barcoId: true, fechaInicio: true, fechaFin: true, referencia: true },
    }),
    db.bloqueo.findMany({
      where: {
        barcoId: { in: ids },
        fechaInicio: { lt: fin },
        fechaFin: { gt: inicio },
      },
      select: { barcoId: true, fechaInicio: true, fechaFin: true, motivo: true },
    }),
  ]);

  const aFecha = (d: Date) => d.toISOString().slice(0, 10);

  const eventosPorBarco = new Map<
    string,
    Array<{ desde: string; hasta: string; tipo: string; referencia?: string; motivo?: string | null }>
  >();
  for (const b of barcos) eventosPorBarco.set(b.id, []);
  for (const r of reservas) {
    eventosPorBarco.get(r.barcoId)?.push({
      desde: aFecha(r.fechaInicio),
      hasta: aFecha(r.fechaFin),
      tipo: "reserva",
      referencia: r.referencia,
    });
  }
  for (const bl of bloques) {
    eventosPorBarco.get(bl.barcoId)?.push({
      desde: aFecha(bl.fechaInicio),
      hasta: aFecha(bl.fechaFin),
      tipo: "bloqueo",
      motivo: bl.motivo,
    });
  }

  return NextResponse.json({
    ok: true,
    desde,
    hasta,
    barcos: barcos.map((b) => ({
      id: b.id,
      nombre: b.nombre,
      puerto: b.puerto.nombre,
      eventos: eventosPorBarco.get(b.id) ?? [],
    })),
  });
}
