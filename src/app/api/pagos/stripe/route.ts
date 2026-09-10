import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { verificarWebhook } from "@/lib/stripe";

/**
 * Webhook de Stripe: confirma los cobros. Stripe llama aquí cuando una sesión
 * de Checkout se completa; marcamos la reserva como pagada (y confirmada, si
 * estaba pendiente).
 */
export async function POST(req: Request) {
  const payload = await req.text();
  const firma = req.headers.get("stripe-signature") ?? "";
  const evento = await verificarWebhook(payload, firma);
  if (!evento) {
    return NextResponse.json({ ok: false, error: "firma" }, { status: 400 });
  }

  if (
    evento.type === "checkout.session.completed" ||
    evento.type === "checkout.session.async_payment_succeeded"
  ) {
    const sesion = evento.data.object as { metadata?: { reservaId?: string } | null };
    const reservaId = sesion.metadata?.reservaId;
    if (reservaId) {
      const reserva = await db.reserva.findUnique({ where: { id: reservaId } });
      if (reserva) {
        await db.reserva.update({
          where: { id: reservaId },
          data: {
            pagado: true,
            pagadoEn: new Date(),
            estado: reserva.estado === "pendiente" ? "confirmada" : reserva.estado,
          },
        });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
