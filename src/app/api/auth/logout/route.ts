import { NextResponse } from "next/server";

import { COOKIE_SESION, cerrarSesion } from "@/lib/auth";

export async function POST(req: Request) {
  await cerrarSesion(req);
  const respuesta = NextResponse.json({ ok: true });
  respuesta.cookies.set(COOKIE_SESION, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return respuesta;
}
