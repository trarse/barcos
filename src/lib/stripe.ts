import Stripe from "stripe";

import { urlAbsoluta } from "@/lib/sitio";

/**
 * Pagos con Stripe Checkout (página alojada por Stripe): el servidor crea una
 * sesión y devuelve su URL; el cliente redirige y nunca tocamos datos de
 * tarjeta. Si falta STRIPE_SECRET_KEY, los pagos quedan desactivados y el
 * flujo de reserva sigue funcionando como petición.
 *
 * El webhook unificado (cobros de reserva + alta/baja de la suscripción Pro)
 * vive en /api/pagos/stripe y verifica la firma con STRIPE_WEBHOOK_SECRET.
 */

let cliente: Stripe | null | undefined;

export function obtenerStripe(): Stripe | null {
  if (cliente === undefined) {
    const clave = process.env.STRIPE_SECRET_KEY;
    cliente = clave ? new Stripe(clave) : null;
  }
  return cliente;
}

export async function crearSesionPago(opciones: {
  reservaId: string;
  referencia: string;
  descripcion: string;
  totalCents: number;
  idioma: string;
}): Promise<Stripe.Checkout.Session | null> {
  const stripe = obtenerStripe();
  if (!stripe) return null;

  const locale = opciones.idioma === "de" ? "de" : opciones.idioma === "en" ? "en" : "es";

  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: opciones.totalCents,
          product_data: {
            name: opciones.descripcion,
            description: `Reserva ${opciones.referencia}`,
          },
        },
      },
    ],
    metadata: { reservaId: opciones.reservaId, referencia: opciones.referencia },
    success_url: urlAbsoluta(`/reserva/pagada?referencia=${opciones.referencia}`),
    cancel_url: urlAbsoluta(`/reserva/cancelada?referencia=${opciones.referencia}`),
    locale,
  });
}

/** Sesión de pago de una fianza: autoriza (retiene) sin cobrar hasta la devolución. */
export async function crearSesionFianza(opciones: {
  reservaId: string;
  referencia: string;
  descripcion: string;
  fianzaCents: number;
  idioma: string;
}): Promise<Stripe.Checkout.Session | null> {
  const stripe = obtenerStripe();
  if (!stripe) return null;

  const locale = opciones.idioma === "de" ? "de" : opciones.idioma === "en" ? "en" : "es";

  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_intent_data: {
      capture_method: "manual",
      metadata: { tipo: "fianza", reservaId: opciones.reservaId },
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: opciones.fianzaCents,
          product_data: {
            name: opciones.descripcion,
            description: `Fianza ${opciones.referencia}`,
          },
        },
      },
    ],
    metadata: { tipo: "fianza", reservaId: opciones.reservaId, referencia: opciones.referencia },
    success_url: urlAbsoluta(`/reserva/pagada?referencia=${opciones.referencia}&fianza=1`),
    cancel_url: urlAbsoluta(`/reserva/cancelada?referencia=${opciones.referencia}`),
    locale,
  });
}

/** Verifica la firma de un webhook de Stripe; devuelve null si no es válida. */
export async function verificarWebhook(
  payload: string,
  firma: string,
): Promise<Stripe.Event | null> {
  const stripe = obtenerStripe();
  const secreto = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secreto) return null;
  try {
    return stripe.webhooks.constructEvent(payload, firma, secreto);
  } catch {
    return null;
  }
}
