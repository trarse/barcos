import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { puedeGestionarCliente } from "@/lib/clientes";
import { db } from "@/lib/db";
import { enviarCorreo } from "@/lib/correo";

const Esquema = z.object({
  asunto: z.string().trim().min(1).max(200),
  mensaje: z.string().trim().min(1).max(10000),
});

/** Envía un correo al cliente (Resend) y lo registra en su historial. */
export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  const { id } = await props.params;
  if (usuario.rol !== "admin" && !(await puedeGestionarCliente(usuario, id))) {
    return NextResponse.json({ ok: false, error: "plan" }, { status: 403 });
  }
  const cliente = await db.cliente.findUnique({ where: { id }, select: { email: true } });
  if (!cliente) {
    return NextResponse.json({ ok: false, error: "cliente" }, { status: 404 });
  }

  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const enviado = await enviarCorreo({
    to: cliente.email,
    asunto: parseado.data.asunto,
    html: `<p>${parseado.data.mensaje.replace(/\n/g, "<br/>")}</p>`,
  });

  if (enviado) {
    await db.comunicacion.create({
      data: { clienteId: id, tipo: "manual", asunto: parseado.data.asunto },
    });
  }

  return NextResponse.json({ ok: true, enviado });
}
