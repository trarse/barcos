import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Esquema = z.object({
  reservaId: z.string().min(1),
  firmaUrl: z.string().min(1).max(2_000_000),
});

/** Guarda la firma digital del cliente en una reserva. */
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
  const { reservaId, firmaUrl } = parseado.data;

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

  await db.reserva.update({ where: { id: reservaId }, data: { firmaUrl } });
  return NextResponse.json({ ok: true });
}
