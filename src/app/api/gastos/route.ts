import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Esquema = z.object({
  categoria: z.string().trim().min(1).max(80),
  concepto: z.string().trim().min(1).max(300),
  importe: z.coerce.number().min(0),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  barcoId: z.string().optional().nullable(),
  factura: z.string().trim().max(80).optional().nullable(),
  notas: z.string().trim().max(500).optional().nullable(),
});

/** Clave de mes "YYYY-MM" de una fecha. */
function claveMes(d: Date): string {
  return d.toISOString().slice(0, 7);
}

function etiquetaMes(d: Date): string {
  const nombres = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${nombres[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
}

/**
 * Gastos, ingresos y vencimientos del armador. Devuelve además la serie
 * mensual para el gráfico y las próximas salidas, de modo que el panel es un
 * cuadro de mando de verdad y no una simple lista.
 */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const esAdmin = usuario.rol === "admin";
  const propietarioId = usuario.propietarioId;

  const where = esAdmin ? {} : { propietarioId: propietarioId ?? "" };
  const hoy = new Date();
  const inicioMeses = new Date(hoy.getFullYear(), hoy.getMonth() - 11, 1);

  const [gastos, totalGastos, totalIngresos, vencimientos, proximasSalidas, reservasMes] =
    await Promise.all([
      db.gasto.findMany({
        where,
        orderBy: { fecha: "desc" },
        take: 500,
        include: { barco: { select: { nombre: true } } },
      }),
      db.gasto.aggregate({ where, _sum: { importeCents: true } }),
      db.reserva.aggregate({
        where: {
          estado: { in: ["confirmada", "completada"] },
          ...(esAdmin ? {} : { barco: { propietarioId: propietarioId ?? "" } }),
        },
        _sum: { precioTotalCents: true },
      }),
      db.vencimiento.findMany({
        where,
        orderBy: { fecha: "asc" },
        include: { barco: { select: { nombre: true } } },
      }),
      db.reserva.findMany({
        where: {
          estado: { in: ["confirmada", "pendiente"] },
          fechaInicio: { gte: new Date() },
          ...(esAdmin ? {} : { barco: { propietarioId: propietarioId ?? "" } }),
        },
        orderBy: { fechaInicio: "asc" },
        take: 8,
        include: { barco: { select: { nombre: true } } },
      }),
      db.reserva.findMany({
        where: {
          estado: { in: ["confirmada", "completada"] },
          fechaInicio: { gte: inicioMeses },
          ...(esAdmin ? {} : { barco: { propietarioId: propietarioId ?? "" } }),
        },
        select: { fechaInicio: true, precioTotalCents: true },
      }),
    ]);

  const gastosCents = totalGastos._sum.importeCents ?? 0;
  const ingresosCents = totalIngresos._sum.precioTotalCents ?? 0;

  // Serie mensual de los últimos 12 meses, rellenada a partir de los datos.
  const meses = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(hoy.getFullYear(), hoy.getMonth() - 11 + i, 1);
    return { mes: claveMes(d), etiqueta: etiquetaMes(d), ingresosCents: 0, gastosCents: 0 };
  });
  const mapa = new Map(meses.map((m) => [m.mes, m]));
  for (const g of gastos) {
    const m = mapa.get(claveMes(g.fecha));
    if (m) m.gastosCents += g.importeCents;
  }
  for (const r of reservasMes) {
    const m = mapa.get(claveMes(r.fechaInicio));
    if (m) m.ingresosCents += r.precioTotalCents;
  }

  const porCategoria = new Map<string, number>();
  for (const g of gastos) {
    porCategoria.set(g.categoria, (porCategoria.get(g.categoria) ?? 0) + g.importeCents);
  }

  return NextResponse.json({
    ok: true,
    gastos: gastos.map((g) => ({
      id: g.id,
      categoria: g.categoria,
      concepto: g.concepto,
      importeCents: g.importeCents,
      factura: g.factura,
      notas: g.notas,
      fecha: g.fecha.toISOString().slice(0, 10),
      barcoId: g.barcoId,
      barco: g.barco?.nombre ?? null,
    })),
    vencimientos: vencimientos.map((v) => ({
      id: v.id,
      tipo: v.tipo,
      descripcion: v.descripcion,
      fecha: v.fecha.toISOString().slice(0, 10),
      horas: v.horas,
      barcoId: v.barcoId,
      barco: v.barco?.nombre ?? null,
    })),
    proximasSalidas: proximasSalidas.map((r) => ({
      referencia: r.referencia,
      barco: r.barco.nombre,
      fechaInicio: r.fechaInicio.toISOString().slice(0, 10),
      clienteNombre: r.clienteNombre,
      estado: r.estado,
    })),
    mensual: meses,
    resumen: {
      gastosCents,
      ingresosCents,
      beneficioCents: ingresosCents - gastosCents,
      porCategoria: [...porCategoria.entries()]
        .map(([categoria, totalCents]) => ({ categoria, totalCents }))
        .sort((a, b) => b.totalCents - a.totalCents),
    },
  });
}

export async function POST(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  if (!usuario.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const a = parseado.data;

  const gasto = await db.gasto.create({
    data: {
      propietarioId: usuario.propietarioId,
      barcoId: a.barcoId || null,
      categoria: a.categoria,
      concepto: a.concepto,
      importeCents: Math.round(a.importe * 100),
      factura: a.factura || null,
      notas: a.notas || null,
      fecha: new Date(`${a.fecha}T00:00:00Z`),
    },
  });

  return NextResponse.json({ ok: true, id: gasto.id });
}

export async function DELETE(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const id = typeof datos?.id === "string" ? datos.id : "";
  if (!id) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const where = usuario.rol === "admin" ? { id } : { id, propietarioId: usuario.propietarioId ?? "" };
  await db.gasto.deleteMany({ where });
  return NextResponse.json({ ok: true });
}
