import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { avisarAdminNuevaReserva, enviarCambioEstado, enviarConfirmacionReserva } from "@/lib/correo";
import { db } from "@/lib/db";
import { calcularDesglose, diasEntre, temporadaDe, type Tarifa } from "@/lib/precio";
import { crearSesionPago } from "@/lib/stripe";
import { calcularComision } from "@/lib/comisiones";
import { sincronizarBarco } from "@/lib/sincronizacion";
import { paisDeTelefono } from "@/lib/telefonos";

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

  // Refresca los calendarios externos antes de comprobar disponibilidad: así
  // una reserva de Airbnb/Google recién entrante también bloquea estas fechas.
  try {
    await sincronizarBarco(barco.id);
  } catch {
    // Si la sincronización falla, seguimos con los datos que ya tenemos.
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

  // Bloqueos manuales (mantenimiento, cierres): tampoco se puede reservar.
  const bloqueado = await db.bloqueo.findFirst({
    where: {
      barcoId: barco.id,
      fechaInicio: { lt: salida },
      fechaFin: { gt: entrada },
    },
    select: { id: true },
  });
  if (bloqueado) {
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

  // Cliente del CRM: se crea o actualiza con cada reserva.
  const emailCliente = r.clienteEmail.toLowerCase();
  const cliente = await db.cliente.upsert({
    where: { email: emailCliente },
    update: { nombre: r.clienteNombre, telefono: r.clienteTelefono ?? null, idioma: r.idioma },
    create: {
      email: emailCliente,
      nombre: r.clienteNombre,
      telefono: r.clienteTelefono ?? null,
      idioma: r.idioma,
      pais: paisDeTelefono(r.clienteTelefono ?? "")?.pais ?? null,
    },
  });

  const { comisionCents, netoArmadorCents } = calcularComision(desglose.total);

  const reserva = await db.reserva.create({
    data: {
      referencia: referenciaAleatoria(),
      barcoId: barco.id,
      fechaInicio: entrada,
      fechaFin: salida,
      numDias: dias,
      numPersonas: r.numPersonas,
      clienteNombre: r.clienteNombre,
      clienteEmail: emailCliente,
      clienteTelefono: r.clienteTelefono ?? null,
      clienteId: cliente.id,
      precioTotalCents: desglose.total,
      comisionCents,
      netoArmadorCents,
      estado: "pendiente",
      notas: r.notas ?? null,
      idioma: r.idioma,
      paginaOrigen: r.paginaOrigen ?? null,
    },
  });

  // Correo transaccional: aviso al cliente y al administrador. No bloquea.
  void enviarConfirmacionReserva({
    clienteEmail: r.clienteEmail,
    clienteNombre: r.clienteNombre,
    referencia: reserva.referencia,
    barco: barco.nombre,
    inicio: entrada,
    fin: salida,
    totalCents: desglose.total,
  });
  void avisarAdminNuevaReserva({
    referencia: reserva.referencia,
    barco: barco.nombre,
    clienteNombre: r.clienteNombre,
    inicio: entrada,
    fin: salida,
    totalCents: desglose.total,
  });

  // Reserva instantánea: creamos el enlace de pago para redirigir a Stripe.
  let urlPago: string | undefined;
  if (barco.reservaInstantanea) {
    const sesion = await crearSesionPago({
      reservaId: reserva.id,
      referencia: reserva.referencia,
      descripcion: `Alquiler ${barco.nombre}`,
      totalCents: desglose.total,
      idioma: r.idioma,
    });
    if (sesion?.url) {
      await db.reserva.update({
        where: { id: reserva.id },
        data: { stripeSessionId: sesion.id },
      });
      urlPago = sesion.url;
    }
  }

  return NextResponse.json({
    ok: true,
    reserva: {
      referencia: reserva.referencia,
      estado: reserva.estado,
      precioTotalCents: reserva.precioTotalCents,
    },
    desglose,
    urlPago,
  });
}

export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  // El armador solo ve las reservas de sus barcos; el admin, todas.
  const where =
    usuario.rol === "armador" && usuario.propietarioId
      ? { barco: { propietarioId: usuario.propietarioId } }
      : {};

  const reservas = await db.reserva.findMany({
    where,
    include: {
      barco: {
        select: { nombre: true, slug: true, fianza: true, puerto: { select: { nombre: true } } },
      },
    },
    orderBy: { creadoEn: "desc" },
    take: 200,
  });

  return NextResponse.json({ ok: true, reservas });
}

export async function PATCH(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const id = typeof datos?.id === "string" ? datos.id : "";
  const estado = datos?.estado as Estado;

  if (!id || !ESTADOS.includes(estado)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const existente = await db.reserva.findUnique({
    where: { id },
    include: { barco: { select: { propietarioId: true, nombre: true } } },
  });
  if (!existente) {
    return NextResponse.json({ ok: false, error: "reserva" }, { status: 404 });
  }

  // Un armador solo puede cambiar el estado de las reservas de sus barcos.
  if (usuario.rol !== "admin" && usuario.propietarioId !== existente.barco.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const reserva = await db.reserva.update({
    where: { id },
    data: { estado },
  });

  void enviarCambioEstado({
    clienteEmail: existente.clienteEmail,
    clienteNombre: existente.clienteNombre,
    referencia: existente.referencia,
    barco: existente.barco.nombre,
    estado,
  });

  return NextResponse.json({ ok: true, estado: reserva.estado });
}
