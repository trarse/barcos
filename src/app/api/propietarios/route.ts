import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

/** Lista de armadores con su plan. Solo admin. */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  if (usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const propietarios = await db.propietario.findMany({
    orderBy: { nombre: "asc" },
    include: {
      _count: { select: { barcos: true } },
      usuario: { select: { email: true } },
    },
  });

  return NextResponse.json({
    ok: true,
    propietarios: propietarios.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      clase: p.clase,
      plan: p.plan,
      barcos: p._count.barcos,
      email: p.usuario?.email ?? null,
    })),
  });
}
