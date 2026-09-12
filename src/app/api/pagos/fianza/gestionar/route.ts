import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";
import { obtenerStripe } from "@/lib/stripe";

const Esquema = z.object({
  reservaId: z.string().min(1),
  accion: z.enum(["liberar", "cobrar"]),
});

/** Libera (cancela el hold) o cobra (captura) la fianza retenida de una reserva. */
export async function POST(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const { reservaId, accion } = parseado.data;

  const reserva = await db.reserva.findUnique({
    where: { id: reservaId },
    include: { barco: { select: { propietarioId: true } } },
  });
  if (!reserva) {
    return NextResponse.json({ ok: false, error: "reserva" }, { status: 404 });
  }
  if (usuario.rol !== "admin" && usuario.propietarioId !== reserva.barco.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }
  if (!reserva.fianzaRetenida || !reserva.fianzaStripeIntentId) {
    return NextResponse.json({ ok: false, error: "sinRetener" }, { status: 400 });
  }

  const stripe = obtenerStripe();
  if (!stripe) {
    return NextResponse.json({ ok: false, error: "stripe" }, { status: 503 });
  }

  if (accion === "liberar") {
    await stripe.paymentIntents.cancel(reserva.fianzaStripeIntentId);
  } else {
    await stripe.paymentIntents.capture(reserva.fianzaStripeIntentId);
  }

  await db.reserva.update({
    where: { id: reservaId },
    data: { fianzaRetenida: false, fianzaStripeIntentId: null },
  });

  return NextResponse.json({ ok: true, accion });
}
