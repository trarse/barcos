import { NextResponse } from "next/server";

import { usuarioAutenticado } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * Detalle de un barco para su ficha en el panel: todos sus datos, sus fotos,
 * sus bloqueos, sus últimas reservas y unas estadísticas básicas.
 */
export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const { id } = await props.params;
  const barco = await db.barco.findUnique({
    where: { id },
    include: {
      tipo: { select: { id: true, nombre: true } },
      puerto: { include: { destino: { select: { nombre: true } } } },
      propietario: { select: { id: true, nombre: true } },
      imagenes: { orderBy: { orden: "asc" } },
    },
  });
  if (!barco) {
    return NextResponse.json({ ok: false, error: "barco" }, { status: 404 });
  }
  if (usuario.rol !== "admin" && usuario.propietarioId !== barco.propietarioId) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 403 });
  }

  const [reservas, totalReservas, pendientes, ingresos, bloques] = await Promise.all([
    db.reserva.findMany({
      where: { barcoId: id },
      orderBy: { creadoEn: "desc" },
      take: 20,
      select: {
        id: true,
        referencia: true,
        fechaInicio: true,
        fechaFin: true,
        numDias: true,
        numPersonas: true,
        clienteNombre: true,
        clienteEmail: true,
        clienteTelefono: true,
        precioTotalCents: true,
        estado: true,
        pagado: true,
        creadoEn: true,
      },
    }),
    db.reserva.count({ where: { barcoId: id } }),
    db.reserva.count({ where: { barcoId: id, estado: "pendiente" } }),
    db.reserva.aggregate({
      where: { barcoId: id, estado: { in: ["confirmada", "completada"] } },
      _sum: { precioTotalCents: true },
    }),
    db.bloqueo.findMany({
      where: { barcoId: id },
      orderBy: { fechaInicio: "asc" },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    barco: {
      id: barco.id,
      slug: barco.slug,
      nombre: barco.nombre,
      fabricante: barco.fabricante,
      modelo: barco.modelo,
      anio: barco.anio,
      descripcion: barco.descripcion,
      esloraCm: barco.esloraCm,
      capacidad: barco.capacidad,
      camarotes: barco.camarotes,
      aseos: barco.aseos,
      potenciaCv: barco.potenciaCv,
      precioBaseDia: barco.precioBaseDia,
      precioAdquisicionCents: barco.precioAdquisicionCents,
      verificadoEn: barco.verificadoEn ? barco.verificadoEn.toISOString().slice(0, 10) : null,
      limpieza: barco.limpieza,
      tasaPortuariaDia: barco.tasaPortuariaDia,
      patronDia: barco.patronDia,
      fianza: barco.fianza,
      consumoLitrosHora: barco.consumoLitrosHora,
      descuentoSemana: barco.descuentoSemana,
      requiereTitulacion: barco.requiereTitulacion,
      reservaInstantanea: barco.reservaInstantanea,
      minimoDias: barco.minimoDias,
      publicado: barco.publicado,
      tipoId: barco.tipoId,
      puertoId: barco.puertoId,
      tipo: barco.tipo.nombre,
      puerto: `${barco.puerto.nombre} · ${barco.puerto.destino.nombre}`,
      propietario: barco.propietario.nombre,
      imagenes: barco.imagenes.map((img) => ({ id: img.id, url: img.url, alt: img.alt, orden: img.orden })),
    },
    estadisticas: {
      totalReservas,
      pendientes,
      ingresosCents: ingresos._sum.precioTotalCents ?? 0,
    },
    reservas: reservas.map((r) => ({
      id: r.id,
      referencia: r.referencia,
      fechaInicio: r.fechaInicio.toISOString(),
      fechaFin: r.fechaFin.toISOString(),
      numDias: r.numDias,
      numPersonas: r.numPersonas,
      clienteNombre: r.clienteNombre,
      clienteEmail: r.clienteEmail,
      clienteTelefono: r.clienteTelefono,
      precioTotalCents: r.precioTotalCents,
      estado: r.estado,
      pagado: r.pagado,
      creadoEn: r.creadoEn.toISOString(),
    })),
    bloques: bloques.map((b) => ({
      id: b.id,
      desde: b.fechaInicio.toISOString().slice(0, 10),
      hasta: b.fechaFin.toISOString().slice(0, 10),
      motivo: b.motivo,
    })),
  });
}
