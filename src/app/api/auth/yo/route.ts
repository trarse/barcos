import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";

/** Devuelve el usuario de la sesión actual, o 401 si no hay sesión. */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, usuario });
}
