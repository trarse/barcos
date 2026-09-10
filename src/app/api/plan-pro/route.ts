import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { obtenerStripe } from "@/lib/stripe";
import { urlAbsoluta } from "@/lib/sitio";

/**
 * Crea la sesión de pago (suscripción) del plan Pro con Stripe Checkout.
 * Sin STRIPE_SECRET_KEY ni STRIPE_PRECIO_PRO, devuelve 503 (degradación).
 */
export async function POST(req: Request) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario || !usuario.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const stripe = obtenerStripe();
  const precioId = process.env.STRIPE_PRECIO_PRO;
  if (!stripe || !precioId) {
    return NextResponse.json({ ok: false, error: "stripe" }, { status: 503 });
  }

  const sesion = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: precioId, quantity: 1 }],
    customer_email: usuario.email,
    metadata: { propietarioId: usuario.propietarioId },
    success_url: urlAbsoluta("/armador"),
    cancel_url: urlAbsoluta("/armador"),
  });

  return NextResponse.json({ ok: true, url: sesion.url });
}
