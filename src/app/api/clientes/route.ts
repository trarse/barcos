import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

/** Listado de clientes del CRM con sus métricas agregadas. Solo admin. */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  if (usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const [clientes, agregados] = await Promise.all([
    db.cliente.findMany({ orderBy: { creadoEn: "desc" }, take: 500 }),
    db.reserva.groupBy({
      by: ["clienteId"],
      where: { clienteId: { not: null } },
      _count: { _all: true },
      _sum: { precioTotalCents: true },
      _max: { fechaInicio: true },
    }),
  ]);

  const mapa = new Map(agregados.map((a) => [a.clienteId, a]));

  const conMetricas = clientes.map((c) => {
    const agg = mapa.get(c.id);
    return {
      id: c.id,
      nombre: c.nombre,
      email: c.email,
      telefono: c.telefono,
      pais: c.pais,
      idioma: c.idioma,
      etiquetas: c.etiquetas,
      creadoEn: c.creadoEn.toISOString(),
      numReservas: agg?._count._all ?? 0,
      totalCents: agg?._sum.precioTotalCents ?? 0,
      ultimaReserva: agg?._max.fechaInicio?.toISOString() ?? null,
    };
  });

  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
  const repetidores = conMetricas.filter((c) => c.numReservas >= 2).length;
  const nuevos = conMetricas.filter((c) => new Date(c.creadoEn) >= inicioMes).length;
  const ltvMedio =
    conMetricas.length > 0
      ? Math.round(conMetricas.reduce((n, c) => n + c.totalCents, 0) / conMetricas.length)
      : 0;

  return NextResponse.json({
    ok: true,
    clientes: conMetricas,
    resumen: {
      total: conMetricas.length,
      repetidores,
      nuevos,
      ltvMedioCents: ltvMedio,
    },
  });
}
