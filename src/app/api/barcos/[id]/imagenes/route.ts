import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Esquema = z.object({
  imagenes: z.array(
    z.object({
      url: z.string().trim().min(1).max(500),
      alt: z.string().trim().max(200),
    }),
  ),
});

/** Reemplaza la lista completa de fotos del barco (el orden es el del array). */
export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  if (usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const { id } = await props.params;
  const barco = await db.barco.findUnique({ where: { id }, select: { id: true } });
  if (!barco) {
    return NextResponse.json({ ok: false, error: "barco" }, { status: 404 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  await db.imagen.deleteMany({ where: { barcoId: id } });
  await db.imagen.createMany({
    data: parseado.data.imagenes.map((img, i) => ({
      barcoId: id,
      url: img.url,
      alt: img.alt,
      orden: i,
    })),
  });

  return NextResponse.json({ ok: true });
}
