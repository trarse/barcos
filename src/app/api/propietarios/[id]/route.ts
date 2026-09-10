import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Esquema = z.object({ plan: z.enum(["gratis", "pro"]) });

/** Cambia el plan de un armador (gratis/pro). Solo admin. */
export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  if (usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const { id } = await props.params;
  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  await db.propietario.update({ where: { id }, data: { plan: parseado.data.plan } });
  return NextResponse.json({ ok: true });
}
