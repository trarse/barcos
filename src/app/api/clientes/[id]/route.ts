import { NextResponse } from "next/server";
import { z } from "zod";

import { Prisma } from "@/generated/prisma/client";
import { usuarioAutenticado } from "@/lib/auth";
import { puedeGestionarCliente } from "@/lib/clientes";
import { db } from "@/lib/db";

const Edicion = z.object({
  nombre: z.string().trim().min(1).max(120).optional(),
  telefono: z.string().trim().max(40).optional().nullable(),
  notas: z.string().trim().max(5000).optional().nullable(),
  etiquetas: z.array(z.string().trim().min(1).max(40)).optional(),
});

/** Ficha 360° de un cliente. El armador pro solo ve a sus clientes (sus reservas). */
export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  const { id } = await props.params;

  const esAdmin = usuario.rol === "admin";
  if (!esAdmin && !(await puedeGestionarCliente(usuario, id))) {
    return NextResponse.json({ ok: false, error: "plan" }, { status: 403 });
  }

  const reservasWhere: Prisma.ReservaWhereInput = esAdmin
    ? {}
    : { barco: { propietarioId: usuario.propietarioId! } };

  const cliente = await db.cliente.findUnique({
    where: { id },
    include: {
      reservas: {
        where: reservasWhere,
        orderBy: { fechaInicio: "desc" },
        include: { barco: { select: { nombre: true } } },
      },
      comunicaciones: { orderBy: { creadoEn: "desc" } },
      tareas: { orderBy: { creadoEn: "desc" } },
    },
  });
  if (!cliente) {
    return NextResponse.json({ ok: false, error: "cliente" }, { status: 404 });
  }

  const totalCents = cliente.reservas.reduce((n, r) => n + r.precioTotalCents, 0);

  return NextResponse.json({
    ok: true,
    cliente: {
      id: cliente.id,
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      pais: cliente.pais,
      idioma: cliente.idioma,
      notas: cliente.notas,
      etiquetas: cliente.etiquetas,
      creadoEn: cliente.creadoEn.toISOString(),
      totalCents,
      numReservas: cliente.reservas.length,
      reservas: cliente.reservas.map((r) => ({
        id: r.id,
        referencia: r.referencia,
        barco: r.barco.nombre,
        fechaInicio: r.fechaInicio.toISOString(),
        fechaFin: r.fechaFin.toISOString(),
        numDias: r.numDias,
        numPersonas: r.numPersonas,
        precioTotalCents: r.precioTotalCents,
        estado: r.estado,
        pagado: r.pagado,
      })),
      comunicaciones: cliente.comunicaciones.map((c) => ({
        id: c.id,
        tipo: c.tipo,
        asunto: c.asunto,
        creadoEn: c.creadoEn.toISOString(),
      })),
      tareas: cliente.tareas.map((t) => ({
        id: t.id,
        texto: t.texto,
        hecho: t.hecho,
        creadoEn: t.creadoEn.toISOString(),
      })),
    },
  });
}

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  const { id } = await props.params;
  if (usuario.rol !== "admin" && !(await puedeGestionarCliente(usuario, id))) {
    return NextResponse.json({ ok: false, error: "plan" }, { status: 403 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Edicion.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (parseado.data.nombre !== undefined) data.nombre = parseado.data.nombre;
  if (parseado.data.telefono !== undefined) data.telefono = parseado.data.telefono;
  if (parseado.data.notas !== undefined) data.notas = parseado.data.notas;
  if (parseado.data.etiquetas !== undefined) data.etiquetas = parseado.data.etiquetas;

  await db.cliente.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}
