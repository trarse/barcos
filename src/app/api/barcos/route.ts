import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";

/**
 * Alta de barcos por parte de los armadores.
 *
 * El barco entra SIEMPRE con `publicado=false` (pendiente de revisión): nadie
 * lo ve hasta que el panel de administración lo aprueba. Los importes llegan
 * en EUROS y se guardan en CÉNTIMOS.
 */

const Esquema = z.object({
  nombre: z.string().trim().min(2).max(120),
  fabricante: z.string().trim().max(80).optional().default(""),
  modelo: z.string().trim().max(80).optional().default(""),
  anio: z.coerce.number().int().min(1900).max(2100),
  esloraM: z.coerce.number().min(1).max(100),
  capacidad: z.coerce.number().int().min(1).max(50),
  camarotes: z.coerce.number().int().min(0).max(20).default(0),
  aseos: z.coerce.number().int().min(0).max(20).default(0),
  potenciaCv: z.coerce.number().int().min(0).max(5000).default(0),
  consumo: z.coerce.number().min(0).max(500).default(0),
  tipoId: z.string().min(1),
  puertoId: z.string().min(1),
  precioBaseDia: z.coerce.number().min(0),
  limpieza: z.coerce.number().min(0).default(0),
  tasaPortuariaDia: z.coerce.number().min(0).default(0),
  patronDia: z.string().trim().optional(),
  fianza: z.coerce.number().min(0).default(0),
  requiereTitulacion: z.boolean().default(true),
  minimoDias: z.coerce.number().int().min(1).max(30).default(1),
  descuentoSemana: z.coerce.number().int().min(0).max(100).default(0),
  reservaInstantanea: z.boolean().default(false),
  descripcion: z.string().trim().max(2000).optional().default(""),
  contactoNombre: z.string().trim().min(2).max(120),
  contactoEmail: z.string().trim().email().max(200),
  contactoTelefono: z.string().trim().max(40).optional(),
  web: z.string().optional(),
});

function aSlug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ipDe(req: Request): string {
  const reenviada = req.headers.get("x-forwarded-for");
  if (reenviada) return reenviada.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}

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

  const a = parseado.data;
  if (a.web) return NextResponse.json({ ok: true }); // honeypot

  const ip = ipDe(req);
  if (!dentroDeLimite(ip)) {
    return NextResponse.json({ ok: false, error: "limit" }, { status: 429 });
  }

  const tipo = await db.tipoBarco.findUnique({ where: { id: a.tipoId } });
  const puerto = await db.puerto.findUnique({ where: { id: a.puertoId } });
  if (!tipo || !puerto) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  recientes.set(ip, [...(recientes.get(ip) ?? []), Date.now()]);

  const propietario = await db.propietario.create({
    data: {
      nombre: a.contactoNombre,
      clase: "particular",
    },
  });

  const base = aSlug(a.nombre) || "barco";
  const slug = `${base}-${Date.now().toString(36).slice(-4)}`;

  await db.barco.create({
    data: {
      slug,
      nombre: a.nombre,
      fabricante: a.fabricante || "Sin fabricante",
      modelo: a.modelo || a.nombre,
      anio: a.anio,
      descripcion: a.descripcion,
      esloraCm: Math.round(a.esloraM * 100),
      capacidad: a.capacidad,
      camarotes: a.camarotes,
      aseos: a.aseos,
      potenciaCv: a.potenciaCv,
      precioBaseDia: Math.round(a.precioBaseDia * 100),
      limpieza: Math.round(a.limpieza * 100),
      tasaPortuariaDia: Math.round(a.tasaPortuariaDia * 100),
      patronDia: a.patronDia ? Math.round(Number(a.patronDia) * 100) : null,
      fianza: Math.round(a.fianza * 100),
      consumoLitrosHora: a.consumo,
      descuentoSemana: a.descuentoSemana,
      requiereTitulacion: a.requiereTitulacion,
      reservaInstantanea: a.reservaInstantanea,
      minimoDias: a.minimoDias,
      tipoId: tipo.id,
      puertoId: puerto.id,
      propietarioId: propietario.id,
      publicado: false,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  // El armador solo ve sus barcos; el admin, todos.
  const where =
    usuario.rol === "armador" && usuario.propietarioId
      ? { propietarioId: usuario.propietarioId }
      : {};

  const barcos = await db.barco.findMany({
    where,
    include: {
      tipo: { select: { nombre: true } },
      puerto: { include: { destino: { select: { nombre: true } } } },
      propietario: { select: { nombre: true } },
    },
    orderBy: [{ publicado: "asc" }, { creadoEn: "desc" }],
  });

  return NextResponse.json({
    ok: true,
    barcos: barcos.map((b) => ({
      id: b.id,
      nombre: b.nombre,
      slug: b.slug,
      fabricante: b.fabricante,
      modelo: b.modelo,
      anio: b.anio,
      publicado: b.publicado,
      creadoEn: b.creadoEn.toISOString(),
      tipo: b.tipo.nombre,
      puerto: `${b.puerto.nombre} · ${b.puerto.destino.nombre}`,
      propietario: b.propietario.nombre,
      precioBaseDia: b.precioBaseDia,
      esloraCm: b.esloraCm,
      capacidad: b.capacidad,
      reservaInstantanea: b.reservaInstantanea,
      tipoId: b.tipoId,
      puertoId: b.puertoId,
    })),
  });
}

const Edicion = z.object({
  id: z.string().min(1),
  publicado: z.boolean().optional(),
  nombre: z.string().trim().min(2).max(120).optional(),
  fabricante: z.string().trim().max(80).optional(),
  modelo: z.string().trim().max(80).optional(),
  anio: z.coerce.number().int().min(1900).max(2100).optional(),
  descripcion: z.string().trim().max(2000).optional(),
  esloraM: z.coerce.number().min(1).max(100).optional(),
  capacidad: z.coerce.number().int().min(1).max(50).optional(),
  camarotes: z.coerce.number().int().min(0).max(20).optional(),
  aseos: z.coerce.number().int().min(0).max(20).optional(),
  potenciaCv: z.coerce.number().int().min(0).max(5000).optional(),
  consumo: z.coerce.number().min(0).max(500).optional(),
  tipoId: z.string().min(1).optional(),
  puertoId: z.string().min(1).optional(),
  precioBaseDia: z.coerce.number().min(0).optional(),
  limpieza: z.coerce.number().min(0).optional(),
  tasaPortuariaDia: z.coerce.number().min(0).optional(),
  patronDia: z.union([z.string().trim(), z.null()]).optional(),
  fianza: z.coerce.number().min(0).optional(),
  requiereTitulacion: z.boolean().optional(),
  minimoDias: z.coerce.number().int().min(1).max(30).optional(),
  descuentoSemana: z.coerce.number().int().min(0).max(100).optional(),
  reservaInstantanea: z.boolean().optional(),
  precioAdquisicion: z.coerce.number().min(0).optional().nullable(),
});

export async function PATCH(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Edicion.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const a = parseado.data;

  const barco = await db.barco.findUnique({ where: { id: a.id }, select: { propietarioId: true } });
  if (!barco) {
    return NextResponse.json({ ok: false, error: "barco" }, { status: 404 });
  }
  // El armador gestiona su barco; publicar/despublicar lo decide el admin.
  if (usuario.rol !== "admin" && usuario.propietarioId !== barco.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const data: Prisma.BarcoUncheckedUpdateInput = {};
  if (usuario.rol === "admin" && a.publicado !== undefined) data.publicado = a.publicado;
  if (a.nombre !== undefined) data.nombre = a.nombre;
  if (a.fabricante !== undefined) data.fabricante = a.fabricante;
  if (a.modelo !== undefined) data.modelo = a.modelo;
  if (a.anio !== undefined) data.anio = a.anio;
  if (a.descripcion !== undefined) data.descripcion = a.descripcion;
  if (a.esloraM !== undefined) data.esloraCm = Math.round(a.esloraM * 100);
  if (a.capacidad !== undefined) data.capacidad = a.capacidad;
  if (a.camarotes !== undefined) data.camarotes = a.camarotes;
  if (a.aseos !== undefined) data.aseos = a.aseos;
  if (a.potenciaCv !== undefined) data.potenciaCv = a.potenciaCv;
  if (a.consumo !== undefined) data.consumoLitrosHora = a.consumo;
  if (a.tipoId !== undefined) data.tipoId = a.tipoId;
  if (a.puertoId !== undefined) data.puertoId = a.puertoId;
  if (a.precioBaseDia !== undefined) data.precioBaseDia = Math.round(a.precioBaseDia * 100);
  if (a.limpieza !== undefined) data.limpieza = Math.round(a.limpieza * 100);
  if (a.tasaPortuariaDia !== undefined) data.tasaPortuariaDia = Math.round(a.tasaPortuariaDia * 100);
  if (a.patronDia !== undefined) {
    data.patronDia = a.patronDia === null || a.patronDia === "" ? null : Math.round(Number(a.patronDia) * 100);
  }
  if (a.fianza !== undefined) data.fianza = Math.round(a.fianza * 100);
  if (a.requiereTitulacion !== undefined) data.requiereTitulacion = a.requiereTitulacion;
  if (a.minimoDias !== undefined) data.minimoDias = a.minimoDias;
  if (a.descuentoSemana !== undefined) data.descuentoSemana = a.descuentoSemana;
  if (a.reservaInstantanea !== undefined) data.reservaInstantanea = a.reservaInstantanea;
  if (a.precioAdquisicion !== undefined) {
    data.precioAdquisicionCents = a.precioAdquisicion === null ? null : Math.round(a.precioAdquisicion * 100);
  }

  await db.barco.update({ where: { id: a.id }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  if (usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const datos = await req.json().catch(() => null);
  const id = typeof datos?.id === "string" ? datos.id : "";
  if (!id) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  await db.barco.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
