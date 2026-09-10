import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { puedeGestionarCliente } from "@/lib/clientes";
import { db } from "@/lib/db";

const Crear = z.object({ texto: z.string().trim().min(1).max(500) });
const Cambiar = z.object({ tareaId: z.string().min(1), hecho: z.boolean() });
const Borrar = z.object({ tareaId: z.string().min(1) });

async function autorizado(req: Request, clienteId: string) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) return false;
  return usuario.rol === "admin" || (await puedeGestionarCliente(usuario, clienteId));
}

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  if (!(await autorizado(req, id))) {
    return NextResponse.json({ ok: false, error: "plan" }, { status: 403 });
  }
  const datos = await req.json().catch(() => null);
  const parseado = Crear.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const tarea = await db.tarea.create({ data: { clienteId: id, texto: parseado.data.texto } });
  return NextResponse.json({ ok: true, id: tarea.id });
}

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  if (!(await autorizado(req, id))) {
    return NextResponse.json({ ok: false, error: "plan" }, { status: 403 });
  }
  const datos = await req.json().catch(() => null);
  const parseado = Cambiar.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  await db.tarea.updateMany({
    where: { id: parseado.data.tareaId, clienteId: id },
    data: { hecho: parseado.data.hecho },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  if (!(await autorizado(req, id))) {
    return NextResponse.json({ ok: false, error: "plan" }, { status: 403 });
  }
  const datos = await req.json().catch(() => null);
  const parseado = Borrar.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  await db.tarea.deleteMany({ where: { id: parseado.data.tareaId, clienteId: id } });
  return NextResponse.json({ ok: true });
}
