import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";

/**
 * Captación de correos: las dos variantes del plan más el formulario de
 * armador. Sin autenticación ni cookies de terceros; el anti-spam es un
 * honeypot y un límite por IP en memoria.
 */

const Esquema = z.object({
  correo: z.string().trim().email().max(200),
  variante: z.enum(["puerto", "normativa", "armador"]),
  destino: z.string().trim().max(80).optional(),
  idioma: z.enum(["es", "en", "de"]).default("es"),
  paginaOrigen: z.string().trim().max(200).optional(),
  // Honeypot: un humano no lo ve. Si llega relleno, es un bot.
  web: z.string().max(0).optional(),
});

// Límite por IP en memoria. En producción sin estado esto se sustituye por un
// almacén compartido; para la ventana de validación es suficiente para frenar
// envíos repetidos desde la misma dirección.
const recientes = new Map<string, number[]>();

function ipDe(req: Request): string {
  const reenviada = req.headers.get("x-forwarded-for");
  if (reenviada) return reenviada.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}

function dentroDeLimite(ip: string): boolean {
  const ahora = Date.now();
  const ventana = 60 * 60 * 1000; // una hora
  const lista = (recientes.get(ip) ?? []).filter((t) => ahora - t < ventana);
  recientes.set(ip, lista);
  return lista.length < 5;
}

export async function POST(req: Request) {
  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { correo, variante, destino, idioma, paginaOrigen, web } = parseado.data;

  // Honeypot relleno: responde OK pero no guarda nada.
  if (web) return NextResponse.json({ ok: true });

  const ip = ipDe(req);
  if (!dentroDeLimite(ip)) {
    return NextResponse.json({ ok: false, error: "limit" }, { status: 429 });
  }
  recientes.set(ip, [...(recientes.get(ip) ?? []), Date.now()]);

  await db.suscripcion.create({
    data: {
      correo,
      variante,
      destino: destino ?? null,
      idioma,
      paginaOrigen: paginaOrigen ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
