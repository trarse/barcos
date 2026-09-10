import { NextResponse } from "next/server";
import { z } from "zod";

import { COOKIE_SESION, crearSesion } from "@/lib/auth";
import { verificarClave } from "@/lib/claves";
import { db } from "@/lib/db";

const Esquema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200),
});

function ipDe(req: Request): string {
  const reenviada = req.headers.get("x-forwarded-for");
  if (reenviada) return reenviada.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}

// Anti fuerza bruta por IP, en memoria (10 intentos en 15 minutos).
const intentos = new Map<string, number[]>();

export async function POST(req: Request) {
  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const ip = ipDe(req);
  const ahora = Date.now();
  const lista = (intentos.get(ip) ?? []).filter((t) => ahora - t < 15 * 60 * 1000);
  if (lista.length >= 10) {
    return NextResponse.json({ ok: false, error: "limit" }, { status: 429 });
  }

  const email = parseado.data.email.toLowerCase();
  const usuario = await db.usuario.findUnique({ where: { email } });
  if (!usuario || !verificarClave(parseado.data.password, usuario.passwordHash)) {
    intentos.set(ip, [...lista, ahora]);
    return NextResponse.json({ ok: false, error: "credenciales" }, { status: 401 });
  }

  intentos.delete(ip);
  const { token, expiraEn } = await crearSesion(usuario.id);

  const respuesta = NextResponse.json({
    ok: true,
    usuario: { nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
  });
  respuesta.cookies.set(COOKIE_SESION, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiraEn,
  });
  return respuesta;
}
