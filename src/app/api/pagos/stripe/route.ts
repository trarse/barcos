import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { verificarWebhook } from "@/lib/stripe";

/**
 * Webhook UNIFICADO de Stripe. Recibe en un único endpoint (/api/pagos/stripe)
 * tanto los cobros de reserva (Checkout de pago) como la suscripción Pro
 * (Checkout de suscripción y su cancelación). En Stripe hay un solo destino
 * escuchando los tres eventos, así que aquí se enruta cada uno.
 */
export async function POST(req: Request) {
  const payload = await req.text();
  const firma = req.headers.get("stripe-signature") ?? "";
  const evento = await verificarWebhook(payload, firma);
  if (!evento) {
    return NextResponse.json({ ok: false, error: "firma" }, { status: 400 });
  }

  // 1) Cobros y suscripciones que completan un Checkout.
  if (
    evento.type === "checkout.session.completed" ||
    evento.type === "checkout.session.async_payment_succeeded"
  ) {
    const sesion = evento.data.object as {
      mode?: string;
      customer?: string;
      subscription?: string;
      metadata?: { reservaId?: string; propietarioId?: string } | null;
    };

    // Suscripción Pro completada: activa el plan en el Propietario.
    if (sesion.mode === "subscription" && sesion.metadata?.propietarioId) {
      await db.propietario.update({
        where: { id: sesion.metadata.propietarioId },
        data: {
          suscripcionActiva: true,
          plan: "pro",
          stripeCustomerId: sesion.customer ?? null,
          stripeSubscriptionId: sesion.subscription ?? null,
        },
      });
    }

    // Reserva pagada: marca pagada (y confirmada si estaba pendiente).
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

  // 2) Suscripción Pro cancelada o vencida: vuelve al plan gratis.
  if (evento.type === "customer.subscription.deleted") {
    const sub = evento.data.object as { id?: string };
    if (sub.id) {
      await db.propietario.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: { suscripcionActiva: false, plan: "gratis" },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
