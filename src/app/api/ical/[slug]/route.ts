import { db } from "@/lib/db";
import { generarIcal } from "@/lib/ical";

/**
 * Exportación iCal pública de un barco: el armador pega esta URL en Google
 * Calendar, Airbnb, Nautal, etc., y allí se ven las reservas y bloqueos de
 * Estribor como días ocupados (sin datos personales del cliente).
 */
export async function GET(
  _req: Request,
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const barco = await db.barco.findUnique({ where: { slug }, select: { id: true } });
  if (!barco) {
    return new Response("No encontrado", { status: 404 });
  }

  const [reservas, bloques] = await Promise.all([
    db.reserva.findMany({
      where: {
        barcoId: barco.id,
        estado: { in: ["pendiente", "confirmada"] },
        fechaFin: { gt: new Date() },
      },
      select: { referencia: true, fechaInicio: true, fechaFin: true },
    }),
    db.bloqueo.findMany({
      where: { barcoId: barco.id, fechaFin: { gt: new Date() } },
      select: { id: true, fechaInicio: true, fechaFin: true, motivo: true },
    }),
  ]);

  const ics = generarIcal({ reservas, bloques });

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="estribor-${slug}.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
