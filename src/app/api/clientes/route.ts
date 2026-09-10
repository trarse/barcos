import { NextResponse } from "next/server";

import { Prisma } from "@/generated/prisma/client";
import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

/** Listado de clientes del CRM con métricas. Admin ve todos; el armador pro solo los suyos. */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const esAdmin = usuario.rol === "admin";
  if (!esAdmin) {
    if (usuario.plan !== "pro") {
      return NextResponse.json({ ok: false, error: "plan" }, { status: 403 });
    }
    if (!usuario.propietarioId) {
      return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
    }
  }

  const whereReservas: Prisma.ReservaWhereInput = esAdmin
    ? { clienteId: { not: null } }
    : { clienteId: { not: null }, barco: { propietarioId: usuario.propietarioId! } };

  const agregados = await db.reserva.groupBy({
    by: ["clienteId"],
    where: whereReservas,
    _count: { _all: true },
    _sum: { precioTotalCents: true },
    _max: { fechaInicio: true },
  });

  const clienteIds = agregados.map((a) => a.clienteId).filter((x): x is string => Boolean(x));

  const clientes = await db.cliente.findMany({
    where: esAdmin ? {} : { id: { in: clienteIds } },
    orderBy: { creadoEn: "desc" },
    take: 500,
  });

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
      numReservas: (agg?._count as { _all?: number } | undefined)?._all ?? 0,
      totalCents: agg?._sum?.precioTotalCents ?? 0,
      ultimaReserva: agg?._max?.fechaInicio?.toISOString() ?? null,
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
    resumen: { total: conMetricas.length, repetidores, nuevos, ltvMedioCents: ltvMedio },
  });
}
