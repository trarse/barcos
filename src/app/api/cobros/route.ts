import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

/** Lo que un armador tiene pendiente de cobrar y lo ya cobrado. */
export async function GET(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  if (!usuario.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const reservas = await db.reserva.findMany({
    where: { barco: { propietarioId: usuario.propietarioId }, pagado: true },
    orderBy: { creadoEn: "desc" },
    include: { barco: { select: { nombre: true } } },
  });

  const pendiente = reservas.filter((r) => !r.liquidado);
  const cobradas = reservas.filter((r) => r.liquidado);

  return NextResponse.json({
    ok: true,
    pendienteCents: pendiente.reduce((n, r) => n + r.netoArmadorCents, 0),
    cobradoCents: cobradas.reduce((n, r) => n + r.netoArmadorCents, 0),
    reservas: reservas.map((r) => ({
      id: r.id,
      referencia: r.referencia,
      barco: r.barco.nombre,
      fechaInicio: r.fechaInicio.toISOString(),
      netoArmadorCents: r.netoArmadorCents,
      liquidado: r.liquidado,
    })),
  });
}
