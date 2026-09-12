import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Esquema = z.object({
  reservaId: z.string().min(1),
  tipo: z.enum(["salida", "entrada"]),
  items: z.array(z.object({ texto: z.string().min(1).max(200), ok: z.boolean() })),
  notas: z.string().trim().max(1000).optional().default(""),
  fotos: z.array(z.string().min(1)).optional().default([]),
});

/** Alta y listado de partes de entrega (checklist con fotos fechadas). */
export async function POST(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const a = parseado.data;

  const reserva = await db.reserva.findUnique({
    where: { id: a.reservaId },
    select: { barco: { select: { propietarioId: true } } },
  });
  if (!reserva) {
    return NextResponse.json({ ok: false, error: "reserva" }, { status: 404 });
  }
  if (usuario.rol !== "admin" && usuario.propietarioId !== reserva.barco.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const parte = await db.parteEntrega.create({
    data: {
      reservaId: a.reservaId,
      tipo: a.tipo,
      items: a.items as unknown as object,
      notas: a.notas || null,
      fotos: { create: a.fotos.map((url) => ({ url })) },
    },
    include: { fotos: { orderBy: { creadoEn: "asc" } } },
  });

  return NextResponse.json({ ok: true, id: parte.id });
}

export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const url = new URL(req.url);
  const reservaId = url.searchParams.get("reservaId");
  if (!reservaId) {
    return NextResponse.json({ ok: true, partes: [] });
  }

  const reserva = await db.reserva.findUnique({
    where: { id: reservaId },
    select: { barco: { select: { propietarioId: true } } },
  });
  if (!reserva) {
    return NextResponse.json({ ok: false, error: "reserva" }, { status: 404 });
  }
  if (usuario.rol !== "admin" && usuario.propietarioId !== reserva.barco.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const partes = await db.parteEntrega.findMany({
    where: { reservaId },
    orderBy: { creadoEn: "desc" },
    include: { fotos: { orderBy: { creadoEn: "asc" } } },
  });

  return NextResponse.json({
    ok: true,
    partes: partes.map((p) => ({
      id: p.id,
      tipo: p.tipo,
      items: p.items,
      notas: p.notas,
      creadoEn: p.creadoEn.toISOString(),
      fotos: p.fotos.map((f) => ({ url: f.url, creadoEn: f.creadoEn.toISOString() })),
    })),
  });
}
