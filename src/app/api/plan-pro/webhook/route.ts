import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { verificarWebhook } from "@/lib/stripe";

/**
 * Webhook de la suscripción Pro: activa el plan al completar el pago y lo
 * desactiva cuando se cancela o vence. La URL para Stripe es
 * /api/plan-pro/webhook.
 */
export async function POST(req: Request) {
  const payload = await req.text();
  const firma = req.headers.get("stripe-signature") ?? "";
  const evento = await verificarWebhook(payload, firma);
  if (!evento) {
    return NextResponse.json({ ok: false, error: "firma" }, { status: 400 });
  }

  if (evento.type === "checkout.session.completed") {
    const sesion = evento.data.object as {
      mode?: string;
      customer?: string;
      subscription?: string;
      metadata?: { propietarioId?: string };
    };
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
  }

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
