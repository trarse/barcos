import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Esquema = z.object({
  tipo: z.string().trim().min(1).max(40),
  descripcion: z.string().trim().min(1).max(200),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  barcoId: z.string().optional().nullable(),
});

/** Alta y borrado de vencimientos (seguro, ITB, bengalas, salvamento...). */
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

  const v = await db.vencimiento.create({
    data: {
      propietarioId: usuario.propietarioId,
      barcoId: a.barcoId || null,
      tipo: a.tipo,
      descripcion: a.descripcion,
      fecha: new Date(`${a.fecha}T00:00:00Z`),
    },
  });

  return NextResponse.json({ ok: true, id: v.id });
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
  await db.vencimiento.deleteMany({ where });
  return NextResponse.json({ ok: true });
}
