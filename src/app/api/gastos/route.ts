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
});

/** Gastos del armador + resumen de ingresos/gastos/beneficio. */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const esAdmin = usuario.rol === "admin";
  const propietarioId = usuario.propietarioId;

  const where = esAdmin ? {} : { propietarioId: propietarioId ?? "" };
  const whereReservas = esAdmin
    ? { estado: { in: ["confirmada", "completada"] } }
    : { estado: { in: ["confirmada", "completada"] }, barco: { propietarioId: propietarioId ?? "" } };

  const [gastos, totalGastos, totalIngresos] = await Promise.all([
    db.gasto.findMany({
      where,
      orderBy: { fecha: "desc" },
      take: 500,
      include: { barco: { select: { nombre: true } } },
    }),
    db.gasto.aggregate({ where, _sum: { importeCents: true } }),
    db.reserva.aggregate({ where: whereReservas, _sum: { precioTotalCents: true } }),
  ]);

  const gastosCents = totalGastos._sum.importeCents ?? 0;
  const ingresosCents = totalIngresos._sum.precioTotalCents ?? 0;

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
      fecha: g.fecha.toISOString().slice(0, 10),
      barcoId: g.barcoId,
      barco: g.barco?.nombre ?? null,
    })),
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
