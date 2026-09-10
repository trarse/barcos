import { Resend } from "resend";

import { euro } from "@/lib/formato";
import { urlAbsoluta } from "@/lib/sitio";

/**
 * Correo transaccional con Resend. Si falta RESEND_API_KEY o EMAIL_DE, las
 * funciones no envían nada y devuelven false: el flujo de reserva sigue
 * funcionando exactamente igual.
 */

let cliente: Resend | null | undefined;

function obtenerResend(): Resend | null {
  if (cliente === undefined) {
    const clave = process.env.RESEND_API_KEY;
    cliente = clave ? new Resend(clave) : null;
  }
  return cliente;
}

export async function enviarCorreo(opciones: {
  to: string;
  asunto: string;
  html: string;
}): Promise<boolean> {
  const resend = obtenerResend();
  const de = process.env.EMAIL_DE;
  if (!resend || !de) return false;
  try {
    await resend.emails.send({
      from: de,
      to: [opciones.to],
      subject: opciones.asunto,
      html: opciones.html,
    });
    return true;
  } catch {
    return false;
  }
}

function fecha(d: Date): string {
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const ESTADO_TXT: Record<string, string> = {
  pendiente: "pendiente de confirmación",
  confirmada: "confirmada",
  cancelada: "cancelada",
  rechazada: "rechazada",
  completada: "completada",
};

/** Confirmación al cliente con el enlace a su contrato. */
export function enviarConfirmacionReserva(r: {
  clienteEmail: string;
  clienteNombre: string;
  referencia: string;
  barco: string;
  inicio: Date;
  fin: Date;
  totalCents: number;
}): Promise<boolean> {
  const url = urlAbsoluta(`/contrato/${r.referencia}`);
  return enviarCorreo({
    to: r.clienteEmail,
    asunto: `Reserva ${r.referencia} recibida`,
    html: `
      <p>Hola ${r.clienteNombre},</p>
      <p>Hemos recibido tu solicitud de reserva <strong>${r.referencia}</strong> para <strong>${r.barco}</strong>.</p>
      <p>Del <strong>${fecha(r.inicio)}</strong> al <strong>${fecha(r.fin)}</strong> · Total: <strong>${euro(r.totalCents)}</strong>.</p>
      <p><a href="${url}">Ver tu contrato</a></p>
      <p>Te contactaremos en breve para confirmar la disponibilidad.</p>
    `,
  });
}

/** Aviso al cliente cuando cambia el estado de su reserva. */
export function enviarCambioEstado(r: {
  clienteEmail: string;
  clienteNombre: string;
  referencia: string;
  barco: string;
  estado: string;
}): Promise<boolean> {
  const url = urlAbsoluta(`/contrato/${r.referencia}`);
  const estadoTxt = ESTADO_TXT[r.estado] ?? r.estado;
  return enviarCorreo({
    to: r.clienteEmail,
    asunto: `Tu reserva ${r.referencia} está ${estadoTxt}`,
    html: `
      <p>Hola ${r.clienteNombre},</p>
      <p>Tu reserva <strong>${r.referencia}</strong> para <strong>${r.barco}</strong> está <strong>${estadoTxt}</strong>.</p>
      <p><a href="${url}">Ver tu contrato</a></p>
    `,
  });
}

/** Aviso al administrador de una nueva reserva. */
export function avisarAdminNuevaReserva(r: {
  referencia: string;
  barco: string;
  clienteNombre: string;
  inicio: Date;
  fin: Date;
  totalCents: number;
}): Promise<boolean> {
  const destino = process.env.EMAIL_ADMIN ?? process.env.EMAIL_DE;
  if (!destino) return Promise.resolve(false);
  return enviarCorreo({
    to: destino,
    asunto: `Nueva reserva ${r.referencia}`,
    html: `
      <p>Nueva reserva <strong>${r.referencia}</strong> de <strong>${r.clienteNombre}</strong>.</p>
      <p>Barco: ${r.barco} · Del ${fecha(r.inicio)} al ${fecha(r.fin)} · Total: ${euro(r.totalCents)}.</p>
    `,
  });
}
