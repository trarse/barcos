import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { calcularDesglose, diasEntre, temporadaDe, type Tarifa } from "@/lib/precio";

/**
 * Reservas: creación pública y gestión desde el panel de administración.
 *
 * El precio sale SIEMPRE del motor de precios (`precio.ts`), nunca de lo que
 * envía el cliente: es el diferenciador de Estribor y evita que se manipule
 * el total desde el navegador.
 */

const Esquema = z.object({
  barcoId: z.string().trim().min(1).max(40),
  fechaInicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  fechaFin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  numPersonas: z.coerce.number().int().min(1).max(30).default(1),
  conPatron: z.boolean().default(false),
  clienteNombre: z.string().trim().min(2).max(120),
  clienteEmail: z.string().trim().email().max(200),
  clienteTelefono: z.string().trim().max(40).optional(),
  notas: z.string().trim().max(1000).optional(),
  idioma: z.enum(["es", "en", "de"]).default("es"),
  paginaOrigen: z.string().trim().max(200).optional(),
  // Honeypot: un humano no lo ve. Si llega relleno, es un bot.
  web: z.string().optional(),
});

const ESTADOS = [
  "pendiente",
  "confirmada",
  "cancelada",
  "rechazada",
  "completada",
] as const;

type Estado = (typeof ESTADOS)[number];

/** Referencia corta y legible para el cliente y el armador: "RES-XXXXXX". */
function referenciaAleatoria(): string {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += caracteres[Math.floor(Math.random() * caracteres.length)];
  }
  return `RES-${s}`;
}

/** El panel se protege con una clave simple por cabecera Bearer. */
function esAdmin(req: Request): boolean {
  const clave = process.env.ADMIN_CLAVE;
  if (!clave) return false;
  return req.headers.get("authorization") === `Bearer ${clave}`;
}

function ipDe(req: Request): string {
  const reenviada = req.headers.get("x-forwarded-for");
  if (reenviada) return reenviada.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}

// Límite por IP en memoria, como en /api/suscripcion.
const recientes = new Map<string, number[]>();

function dentroDeLimite(ip: string): boolean {
  const ahora = Date.now();
  const ventana = 60 * 60 * 1000;
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

  const r = parseado.data;
  if (r.web) return NextResponse.json({ ok: true }); // honeypot relleno

  const ip = ipDe(req);
  if (!dentroDeLimite(ip)) {
    return NextResponse.json({ ok: false, error: "limit" }, { status: 429 });
  }

  const barco = await db.barco.findUnique({
    where: { id: r.barcoId },
    include: { puerto: { include: { destino: true } } },
  });
  if (!barco) {
    return NextResponse.json({ ok: false, error: "barco" }, { status: 404 });
  }

  const entrada = new Date(`${r.fechaInicio}T00:00:00Z`);
  const salida = new Date(`${r.fechaFin}T00:00:00Z`);

  if (Number.isNaN(entrada.getTime()) || Number.isNaN(salida.getTime())) {
    return NextResponse.json({ ok: false, error: "fechas" }, { status: 400 });
  }
  if (salida.getTime() <= entrada.getTime()) {
    return NextResponse.json({ ok: false, error: "fechas" }, { status: 400 });
  }

  const dias = diasEntre(entrada, salida);
  if (dias < barco.minimoDias) {
    return NextResponse.json(
      { ok: false, error: "minimo", minimoDias: barco.minimoDias },
      { status: 400 },
    );
  }

  // Solapamiento: si ya hay una reserva pendiente o confirmada que se cruza
  // con estas fechas, el barco no está libre. Evita la doble reserva.
  const ocupada = await db.reserva.findFirst({
    where: {
      barcoId: barco.id,
      estado: { in: ["pendiente", "confirmada"] },
      fechaInicio: { lt: salida },
      fechaFin: { gt: entrada },
    },
    select: { id: true },
  });
  if (ocupada) {
    return NextResponse.json({ ok: false, error: "ocupado" }, { status: 409 });
  }

  const temporada = temporadaDe(entrada, barco.puerto.destino.mesesAlta);
  const tarifa: Tarifa = {
    precioBaseDia: barco.precioBaseDia,
    limpieza: barco.limpieza,
    tasaPortuariaDia: barco.tasaPortuariaDia,
    patronDia: barco.patronDia,
    fianza: barco.fianza,
    consumoLitrosHora: barco.consumoLitrosHora,
    descuentoSemana: barco.descuentoSemana,
  };
  const desglose = calcularDesglose(tarifa, {
    dias,
    temporada,
    conPatron: r.conPatron,
  });

  recientes.set(ip, [...(recientes.get(ip) ?? []), Date.now()]);

  const reserva = await db.reserva.create({
    data: {
      referencia: referenciaAleatoria(),
      barcoId: barco.id,
      fechaInicio: entrada,
      fechaFin: salida,
      numDias: dias,
      numPersonas: r.numPersonas,
      clienteNombre: r.clienteNombre,
      clienteEmail: r.clienteEmail,
      clienteTelefono: r.clienteTelefono ?? null,
      precioTotalCents: desglose.total,
      estado: "pendiente",
      notas: r.notas ?? null,
      idioma: r.idioma,
      paginaOrigen: r.paginaOrigen ?? null,
    },
  });

  return NextResponse.json({
    ok: true,
    reserva: {
      referencia: reserva.referencia,
      estado: reserva.estado,
      precioTotalCents: reserva.precioTotalCents,
    },
    desglose,
  });
}

export async function GET(req: Request) {
  if (!esAdmin(req)) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const reservas = await db.reserva.findMany({
    include: {
      barco: {
        select: { nombre: true, slug: true, puerto: { select: { nombre: true } } },
      },
    },
    orderBy: { creadoEn: "desc" },
    take: 200,
  });

  return NextResponse.json({ ok: true, reservas });
}

export async function PATCH(req: Request) {
  if (!esAdmin(req)) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const id = typeof datos?.id === "string" ? datos.id : "";
  const estado = datos?.estado as Estado;

  if (!id || !ESTADOS.includes(estado)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const reserva = await db.reserva.update({
    where: { id },
    data: { estado },
  });

  return NextResponse.json({ ok: true, estado: reserva.estado });
}
