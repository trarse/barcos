import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

/** Informes del negocio: KPIs por mes, armador y puerto. Solo admin. */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario || usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const reservas = await db.reserva.findMany({
    include: {
      barco: {
        include: {
          propietario: { select: { nombre: true } },
          puerto: { include: { destino: { select: { nombre: true } } } },
        },
      },
    },
    orderBy: { fechaInicio: "asc" },
  });

  const confirmadas = reservas.filter((r) => r.estado === "confirmada" || r.estado === "completada");

  const kpis = {
    totalReservas: reservas.length,
    ingresosCents: confirmadas.reduce((n, r) => n + r.precioTotalCents, 0),
    comisionCents: confirmadas.reduce((n, r) => n + r.comisionCents, 0),
    pendienteArmadoresCents: reservas
      .filter((r) => r.pagado && !r.liquidado)
      .reduce((n, r) => n + r.netoArmadorCents, 0),
  };

  const porMes = new Map<string, { reservas: number; ingresosCents: number }>();
  for (const r of confirmadas) {
    const mes = r.fechaInicio.toISOString().slice(0, 7);
    const g = porMes.get(mes) ?? { reservas: 0, ingresosCents: 0 };
    g.reservas += 1;
    g.ingresosCents += r.precioTotalCents;
    porMes.set(mes, g);
  }

  const porArmador = new Map<string, { reservas: number; ingresosCents: number; comisionCents: number }>();
  for (const r of confirmadas) {
    const nombre = r.barco.propietario.nombre;
    const g = porArmador.get(nombre) ?? { reservas: 0, ingresosCents: 0, comisionCents: 0 };
    g.reservas += 1;
    g.ingresosCents += r.precioTotalCents;
    g.comisionCents += r.comisionCents;
    porArmador.set(nombre, g);
  }

  const porPuerto = new Map<string, { reservas: number; ingresosCents: number }>();
  for (const r of confirmadas) {
    const nombre = r.barco.puerto.destino.nombre;
    const g = porPuerto.get(nombre) ?? { reservas: 0, ingresosCents: 0 };
    g.reservas += 1;
    g.ingresosCents += r.precioTotalCents;
    porPuerto.set(nombre, g);
  }

  return NextResponse.json({
    ok: true,
    kpis,
    porMes: [...porMes.entries()].map(([mes, v]) => ({ mes, ...v })).slice(-12),
    porArmador: [...porArmador.entries()]
      .map(([nombre, v]) => ({ nombre, ...v }))
      .sort((a, b) => b.ingresosCents - a.ingresosCents),
    porPuerto: [...porPuerto.entries()]
      .map(([nombre, v]) => ({ nombre, ...v }))
      .sort((a, b) => b.ingresosCents - a.ingresosCents),
  });
}
