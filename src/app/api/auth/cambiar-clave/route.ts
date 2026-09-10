import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { hashClave, verificarClave } from "@/lib/claves";
import { db } from "@/lib/db";

const Esquema = z.object({
  actual: z.string().min(1).max(200),
  nueva: z.string().min(8).max(200),
});

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

  const actual = await db.usuario.findUnique({ where: { id: usuario.id } });
  if (!actual || !verificarClave(parseado.data.actual, actual.passwordHash)) {
    return NextResponse.json({ ok: false, error: "credenciales" }, { status: 401 });
  }

  await db.usuario.update({
    where: { id: usuario.id },
    data: { passwordHash: hashClave(parseado.data.nueva) },
  });
  return NextResponse.json({ ok: true });
}
