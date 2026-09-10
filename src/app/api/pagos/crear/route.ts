import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";
import { crearSesionPago } from "@/lib/stripe";

const Esquema = z.object({ reservaId: z.string().min(1) });

/**
 * Crea un enlace de pago (Checkout) para cobrar una reserva desde el panel.
 */
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

  const reserva = await db.reserva.findUnique({
    where: { id: parseado.data.reservaId },
    include: { barco: { select: { nombre: true } } },
  });
  if (!reserva) {
    return NextResponse.json({ ok: false, error: "reserva" }, { status: 404 });
  }
  if (reserva.pagado) {
    return NextResponse.json({ ok: false, error: "pagada" }, { status: 400 });
  }

  const sesion = await crearSesionPago({
    reservaId: reserva.id,
    referencia: reserva.referencia,
    descripcion: `Alquiler ${reserva.barco.nombre}`,
    totalCents: reserva.precioTotalCents,
    idioma: reserva.idioma,
  });

  if (!sesion?.url) {
    return NextResponse.json({ ok: false, error: "stripe" }, { status: 503 });
  }

  await db.reserva.update({
    where: { id: reserva.id },
    data: { stripeSessionId: sesion.id },
  });

  return NextResponse.json({ ok: true, urlPago: sesion.url });
}
