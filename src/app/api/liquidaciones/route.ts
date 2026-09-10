import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

/** Pendiente de pago a armadores (reservas pagadas aún no liquidadas). Solo admin. */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario || usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const reservas = await db.reserva.findMany({
    where: { pagado: true, liquidado: false },
    include: { barco: { include: { propietario: { select: { id: true, nombre: true } } } } },
    orderBy: { creadoEn: "asc" },
  });

  const porArmador = new Map<
    string,
    { propietario: string; pendienteCents: number; reservas: Array<{ id: string; referencia: string; netoArmadorCents: number }> }
  >();
  for (const r of reservas) {
    const g = porArmador.get(r.barco.propietario.id) ?? {
      propietario: r.barco.propietario.nombre,
      pendienteCents: 0,
      reservas: [],
    };
    g.pendienteCents += r.netoArmadorCents;
    g.reservas.push({ id: r.id, referencia: r.referencia, netoArmadorCents: r.netoArmadorCents });
    porArmador.set(r.barco.propietario.id, g);
  }

  const armadores = [...porArmador.values()];
  const totalPendienteCents = armadores.reduce((n, a) => n + a.pendienteCents, 0);

  return NextResponse.json({ ok: true, armadores, totalPendienteCents });
}

const Esquema = z.object({ ids: z.array(z.string().min(1)).min(1) });

/** Marca reservas como liquidadas (pagadas al armador). */
export async function POST(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario || usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  await db.reserva.updateMany({
    where: { id: { in: parseado.data.ids } },
    data: { liquidado: true, liquidadoEn: new Date() },
  });

  return NextResponse.json({ ok: true });
}
