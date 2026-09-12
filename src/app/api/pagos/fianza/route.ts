import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";
import { crearSesionFianza } from "@/lib/stripe";

const Esquema = z.object({ reservaId: z.string().min(1) });

/** Crea un enlace de pago para retener la fianza (captura manual en Stripe). */
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

  const reserva = await db.reserva.findUnique({
    where: { id: parseado.data.reservaId },
    include: { barco: { select: { nombre: true, fianza: true, propietarioId: true } } },
  });
  if (!reserva) {
    return NextResponse.json({ ok: false, error: "reserva" }, { status: 404 });
  }
  if (usuario.rol !== "admin" && usuario.propietarioId !== reserva.barco.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }
  if (reserva.fianzaRetenida) {
    return NextResponse.json({ ok: false, error: "retenida" }, { status: 400 });
  }
  if (reserva.barco.fianza <= 0) {
    return NextResponse.json({ ok: false, error: "sinFianza" }, { status: 400 });
  }

  const sesion = await crearSesionFianza({
    reservaId: reserva.id,
    referencia: reserva.referencia,
    descripcion: `Fianza ${reserva.barco.nombre}`,
    fianzaCents: reserva.barco.fianza,
    idioma: reserva.idioma,
  });

  if (!sesion?.url) {
    return NextResponse.json({ ok: false, error: "stripe" }, { status: 503 });
  }

  return NextResponse.json({ ok: true, urlPago: sesion.url });
}
