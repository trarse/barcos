import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";
import { parsearIcal } from "@/lib/ical";

/** Importa los calendarios externos de un barco y crea bloqueos "externos". */
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

  const calendarios = await db.calendarioExterno.findMany({ where: { barcoId: id } });

  const eventos: Array<{ inicio: Date; fin: Date; uid: string; resumen: string }> = [];
  const errores: string[] = [];

  for (const cal of calendarios) {
    try {
      const res = await fetch(cal.url, { signal: AbortSignal.timeout(15000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const texto = await res.text();
      eventos.push(...parsearIcal(texto));
    } catch (e) {
      errores.push(cal.url);
      await db.calendarioExterno.update({
        where: { id: cal.id },
        data: { error: (e as Error).message.slice(0, 200) },
      });
    }
  }

  // Reemplaza los bloqueos externos previos por los recién leídos.
  await db.bloqueo.deleteMany({ where: { barcoId: id, fuente: "externo" } });
  const ahora = new Date();
  const futuros = eventos.filter((e) => e.fin.getTime() > ahora.getTime());
  if (futuros.length > 0) {
    await db.bloqueo.createMany({
      data: futuros.map((e) => ({
        barcoId: id,
        fechaInicio: e.inicio,
        fechaFin: e.fin,
        motivo: e.resumen,
        fuente: "externo",
        uid: e.uid,
      })),
    });
  }

  await db.calendarioExterno.updateMany({
    where: { barcoId: id },
    data: { ultimaSync: new Date(), error: null },
  });

  return NextResponse.json({ ok: true, importados: futuros.length, errores });
}
