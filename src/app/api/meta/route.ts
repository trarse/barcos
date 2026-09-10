import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

/** Tipos y puertos para los formularios del panel. Solo autenticado. */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const [tipos, puertos] = await Promise.all([
    db.tipoBarco.findMany({
      orderBy: { orden: "asc" },
      select: { id: true, slug: true, nombre: true },
    }),
    db.puerto.findMany({
      orderBy: [{ destino: { nombre: "asc" } }, { nombre: "asc" }],
      include: { destino: { select: { nombre: true } } },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    tipos,
    puertos: puertos.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      destino: p.destino.nombre,
    })),
  });
}
