import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

const Esquema = z.object({
  ids: z.array(z.string().min(1)).min(1),
  accion: z.enum(["publicar", "ocultar", "borrar", "tarifa"]),
  precioBaseDia: z.coerce.number().min(0).optional(),
  porcentaje: z.coerce.number().min(-100).max(1000).optional(),
});

/** Operaciones en bloque sobre varios barcos. */
export async function POST(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  if (usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const a = parseado.data;

  if (a.accion === "publicar") {
    await db.barco.updateMany({ where: { id: { in: a.ids } }, data: { publicado: true } });
  } else if (a.accion === "ocultar") {
    await db.barco.updateMany({ where: { id: { in: a.ids } }, data: { publicado: false } });
  } else if (a.accion === "borrar") {
    await db.barco.deleteMany({ where: { id: { in: a.ids } } });
  } else if (a.accion === "tarifa") {
    if (a.precioBaseDia !== undefined) {
      await db.barco.updateMany({
        where: { id: { in: a.ids } },
        data: { precioBaseDia: Math.round(a.precioBaseDia * 100) },
      });
    } else if (a.porcentaje !== undefined) {
      const barcos = await db.barco.findMany({
        where: { id: { in: a.ids } },
        select: { id: true, precioBaseDia: true },
      });
      await Promise.all(
        barcos.map((b) =>
          db.barco.update({
            where: { id: b.id },
            data: { precioBaseDia: Math.round(b.precioBaseDia * (1 + a.porcentaje! / 100)) },
          }),
        ),
      );
    }
  }

  return NextResponse.json({ ok: true });
}
