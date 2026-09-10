import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Agregar = z.object({
  url: z.string().trim().url().max(500),
  nombre: z.string().trim().max(120).optional(),
});

const Borrar = z.object({ id: z.string().min(1) });

async function puedeGestionar(req: Request, barcoId: string) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) return null;
  const barco = await db.barco.findUnique({ where: { id: barcoId }, select: { propietarioId: true } });
  if (!barco) return null;
  if (usuario.rol !== "admin" && usuario.propietarioId !== barco.propietarioId) return null;
  return usuario;
}

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  if (!(await puedeGestionar(req, id))) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const calendarios = await db.calendarioExterno.findMany({
    where: { barcoId: id },
    orderBy: { creadoEn: "asc" },
  });

  return NextResponse.json({
    ok: true,
    calendarios: calendarios.map((c) => ({
      id: c.id,
      url: c.url,
      nombre: c.nombre,
      ultimaSync: c.ultimaSync?.toISOString() ?? null,
      error: c.error,
    })),
  });
}

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;
  if (!(await puedeGestionar(req, id))) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Agregar.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const creado = await db.calendarioExterno.create({
    data: { barcoId: id, url: parseado.data.url, nombre: parseado.data.nombre ?? null },
  });

  return NextResponse.json({ ok: true, id: creado.id });
}

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

  await db.calendarioExterno.deleteMany({ where: { id: parseado.data.id, barcoId: id } });
  return NextResponse.json({ ok: true });
}
