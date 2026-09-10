import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Crear = z.object({
  desde: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hasta: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  motivo: z.string().trim().max(200).optional(),
});

const Borrar = z.object({ bloqueoId: z.string().min(1) });

/** Comprueba que el usuario puede gestionar la disponibilidad de este barco. */
async function puedeGestionar(req: Request, barcoId: string) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) return null;
  const barco = await db.barco.findUnique({ where: { id: barcoId }, select: { propietarioId: true } });
  if (!barco) return null;
  if (usuario.rol !== "admin" && usuario.propietarioId !== barco.propietarioId) return null;
  return usuario;
}

/** Crea un bloqueo de disponibilidad (mantenimiento, cierre…). */
export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  if (!(await puedeGestionar(req, id))) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Crear.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const inicio = new Date(`${parseado.data.desde}T00:00:00Z`);
  const fin = new Date(`${parseado.data.hasta}T00:00:00Z`);
  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime()) || fin.getTime() <= inicio.getTime()) {
    return NextResponse.json({ ok: false, error: "fechas" }, { status: 400 });
  }

  const bloqueo = await db.bloqueo.create({
    data: { barcoId: id, fechaInicio: inicio, fechaFin: fin, motivo: parseado.data.motivo ?? null },
  });

  return NextResponse.json({ ok: true, id: bloqueo.id });
}

/** Elimina un bloqueo de disponibilidad. */
export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  if (!(await puedeGestionar(req, id))) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Borrar.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  await db.bloqueo.deleteMany({ where: { id: parseado.data.bloqueoId, barcoId: id } });
  return NextResponse.json({ ok: true });
}
