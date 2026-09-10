import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";
import { sincronizarBarco } from "@/lib/sincronizacion";

/**
 * Sincronización en segundo plano de la flota (TTL-aware): refresca los
 * calendarios externos que hayan vencido. El admin sincroniza toda la flota;
 * el armador solo sus barcos. Se limita la concurrencia para no disparar
 * cientos de peticiones externas a la vez.
 */
export async function POST(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const where =
    usuario.rol === "armador" && usuario.propietarioId
      ? { propietarioId: usuario.propietarioId, calendarios: { some: {} } }
      : { calendarios: { some: {} } };

  const barcos = await db.barco.findMany({ where, select: { id: true } });

  let sincronizados = 0;
  let importados = 0;
  const limite = 6;
  const cola = [...barcos];
  const trabajadores = Array.from({ length: Math.min(limite, cola.length) }, async () => {
    while (cola.length) {
      const b = cola.shift()!;
      const r = await sincronizarBarco(b.id); // TTL-aware: salta los frescos
      if (r.sincronizado) {
        sincronizados += 1;
        importados += r.importados;
      }
    }
  });
  await Promise.all(trabajadores);

  return NextResponse.json({ ok: true, barcos: barcos.length, sincronizados, importados });
}
