import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";

/**
 * CRUD de artículos del blog para el panel /admin.
 *
 * El `slug` es parte de la URL y del SEO: se valida para que solo lleve
 * minúsculas, números y guiones. El título y la entradilla alimentan <title>
 * y meta description, así que aquí se tratan como campos críticos.
 */

const IDIOMAS = ["es", "en", "de"] as const;
const CATEGORIAS = ["Precios", "Normativa", "Rutas", "Medio ambiente"] as const;

const Esquema = z.object({
  id: z.string().optional(),
  idioma: z.enum(IDIOMAS),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "solo minúsculas, números y guiones"),
  titulo: z.string().trim().min(3).max(160),
  entradilla: z.string().trim().min(10).max(300),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  minutos: z.coerce.number().int().min(1).max(60).default(5),
  categoria: z.enum(CATEGORIAS),
  cuerpo: z.string().min(50),
  relacionados: z
    .array(z.object({ texto: z.string().min(1), pagina: z.unknown() }))
    .default([]),
  publicado: z.boolean().default(true),
  publicaDesde: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable(),
});

function esAdmin(req: Request): boolean {
  const clave = process.env.ADMIN_CLAVE;
  if (!clave) return false;
  return req.headers.get("authorization") === `Bearer ${clave}`;
}

function datosDe(a: z.infer<typeof Esquema>): Prisma.ArticuloUncheckedCreateInput {
  return {
    idioma: a.idioma,
    slug: a.slug,
    titulo: a.titulo,
    entradilla: a.entradilla,
    fecha: new Date(`${a.fecha}T00:00:00Z`),
    minutos: a.minutos,
    categoria: a.categoria,
    cuerpo: a.cuerpo,
    relacionados: a.relacionados as unknown as Prisma.InputJsonValue,
    publicado: a.publicado,
    publicaDesde: a.publicaDesde ? new Date(`${a.publicaDesde}T00:00:00Z`) : null,
  };
}

export async function GET(req: Request) {
  if (!esAdmin(req)) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const articulos = await db.articulo.findMany({
    orderBy: [{ idioma: "asc" }, { fecha: "desc" }],
  });

  return NextResponse.json({
    ok: true,
    articulos: articulos.map((a) => ({
      id: a.id,
      idioma: a.idioma,
      slug: a.slug,
      titulo: a.titulo,
      entradilla: a.entradilla,
      fecha: a.fecha.toISOString().slice(0, 10),
      minutos: a.minutos,
      categoria: a.categoria,
      cuerpo: a.cuerpo,
      relacionados: a.relacionados ?? [],
      publicado: a.publicado,
      publicaDesde: a.publicaDesde ? a.publicaDesde.toISOString().slice(0, 10) : null,
    })),
  });
}

export async function POST(req: Request) {
  if (!esAdmin(req)) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  try {
    const creado = await db.articulo.create({ data: datosDe(parseado.data) });
    return NextResponse.json({ ok: true, id: creado.id });
  } catch {
    // Normalmente: slug duplicado para ese idioma (clave única idioma+slug).
    return NextResponse.json({ ok: false, error: "duplicado" }, { status: 409 });
  }
}

export async function PATCH(req: Request) {
  if (!esAdmin(req)) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success || !parseado.data.id) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { id, ...resto } = parseado.data;

  try {
    await db.articulo.update({
      where: { id },
      data: datosDe(resto as z.infer<typeof Esquema>),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "duplicado" }, { status: 409 });
  }
}

export async function DELETE(req: Request) {
  if (!esAdmin(req)) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const id = typeof datos?.id === "string" ? datos.id : "";
  if (!id) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  await db.articulo.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
