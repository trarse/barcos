import { NextResponse } from "next/server";
import { z } from "zod";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";
import { aSlug } from "@/lib/formato";

const Esquema = z.object({ puertoId: z.string().min(1) });

/** Duplica un barco (con sus fotos) a otro puerto, como pendiente de revisión. */
export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }
  if (usuario.rol !== "admin") {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const { id } = await props.params;
  const datos = await req.json().catch(() => null);
  const parseado = Esquema.safeParse(datos);
  if (!parseado.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const fuente = await db.barco.findUnique({ where: { id }, include: { imagenes: true } });
  if (!fuente) {
    return NextResponse.json({ ok: false, error: "barco" }, { status: 404 });
  }
  const puerto = await db.puerto.findUnique({ where: { id: parseado.data.puertoId } });
  if (!puerto) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const slug = `${aSlug(fuente.nombre) || "barco"}-${Date.now().toString(36).slice(-4)}`;

  const nuevo = await db.barco.create({
    data: {
      slug,
      nombre: fuente.nombre,
      fabricante: fuente.fabricante,
      modelo: fuente.modelo,
      anio: fuente.anio,
      descripcion: fuente.descripcion,
      idiomaProsa: fuente.idiomaProsa,
      esloraCm: fuente.esloraCm,
      capacidad: fuente.capacidad,
      camarotes: fuente.camarotes,
      aseos: fuente.aseos,
      potenciaCv: fuente.potenciaCv,
      precioBaseDia: fuente.precioBaseDia,
      limpieza: fuente.limpieza,
      tasaPortuariaDia: fuente.tasaPortuariaDia,
      patronDia: fuente.patronDia,
      fianza: fuente.fianza,
      consumoLitrosHora: fuente.consumoLitrosHora,
      descuentoSemana: fuente.descuentoSemana,
      requiereTitulacion: fuente.requiereTitulacion,
      reservaInstantanea: fuente.reservaInstantanea,
      minimoDias: fuente.minimoDias,
      tipoId: fuente.tipoId,
      puertoId: puerto.id,
      propietarioId: fuente.propietarioId,
      publicado: false,
      imagenes: {
        create: fuente.imagenes.map((img, i) => ({
          url: img.url,
          alt: img.alt,
          orden: i,
        })),
      },
    },
  });

  return NextResponse.json({ ok: true, id: nuevo.id });
}
