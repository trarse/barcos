import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Crear = z.object({
  accion: z.literal("crear"),
  barcoNombre: z.string().trim().min(2).max(120),
});
const Posicion = z.object({
  accion: z.literal("posicion"),
  token: z.string().min(1),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});
const Fin = z.object({
  accion: z.literal("fin"),
  token: z.string().min(1),
});

/** Travesía: crear (compartir posición), registrar posición y finalizar. */
export async function POST(req: Request) {
  const datos = await req.json().catch(() => null);
  const accion = (datos as { accion?: string } | null)?.accion;

  if (accion === "crear") {
    const usuario = await usuarioAutenticado(req);
    if (!usuario) {
      return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
    }
    const parseado = Crear.safeParse(datos);
    if (!parseado.success) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    const token = crypto.randomUUID().replaceAll("-", "").slice(0, 16);
    const travesia = await db.travesia.create({
      data: { token, barcoNombre: parseado.data.barcoNombre, propietarioId: usuario.propietarioId ?? null },
    });
    return NextResponse.json({ ok: true, token: travesia.token });
  }

  if (accion === "posicion") {
    const parseado = Posicion.safeParse(datos);
    if (!parseado.success) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    const travesia = await db.travesia.findUnique({ where: { token: parseado.data.token } });
    if (!travesia || !travesia.activo) {
      return NextResponse.json({ ok: false, error: "token" }, { status: 404 });
    }
    await db.posicionTravesia.create({
      data: { travesiaId: travesia.id, lat: parseado.data.lat, lng: parseado.data.lng },
    });
    return NextResponse.json({ ok: true });
  }

  if (accion === "fin") {
    const usuario = await usuarioAutenticado(req);
    if (!usuario) {
      return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
    }
    const parseado = Fin.safeParse(datos);
    if (!parseado.success) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    await db.travesia.updateMany({
      where: { token: parseado.data.token, ...(usuario.rol === "admin" ? {} : { propietarioId: usuario.propietarioId ?? "" }) },
      data: { activo: false },
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const travesia = await db.travesia.findUnique({
    where: { token },
    include: { posiciones: { orderBy: { creadoEn: "asc" }, take: 2000 } },
  });
  if (!travesia) {
    return NextResponse.json({ ok: false, error: "token" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    travesia: {
      token: travesia.token,
      barcoNombre: travesia.barcoNombre,
      activo: travesia.activo,
      creadoEn: travesia.creadoEn.toISOString(),
      posiciones: travesia.posiciones.map((p) => ({ lat: p.lat, lng: p.lng, creadoEn: p.creadoEn.toISOString() })),
    },
  });
}
