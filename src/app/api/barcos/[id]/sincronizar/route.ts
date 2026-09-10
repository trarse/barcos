import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";
import { sincronizarBarco } from "@/lib/sincronizacion";

/** Sincroniza ahora los calendarios externos de un barco (ignora la caché). */
export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const { id } = await props.params;
  const barco = await db.barco.findUnique({ where: { id }, select: { propietarioId: true } });
  if (!barco) {
    return NextResponse.json({ ok: false, error: "barco" }, { status: 404 });
  }
  if (usuario.rol !== "admin" && usuario.propietarioId !== barco.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const resultado = await sincronizarBarco(id, { forzar: true });
  return NextResponse.json({ ok: true, ...resultado });
}
