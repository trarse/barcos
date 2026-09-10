/**
 * Parser y generador de iCal (RFC 5545) mínimo, sin dependencias.
 *
 * Basta para importar calendarios de Google, Airbnb, Nautal, etc. (VEVENT con
 * DTSTART/DTEND en DATE o DATE-TIME) y para exportar el calendario de Estribor
 * como eventos de día completo (ocupado).
 */

export type EventoExterno = {
  inicio: Date;
  fin: Date;
  uid: string;
  resumen: string;
};

function desplegar(texto: string): string {
  return texto.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
}

function campoDe(cuerpo: string, nombre: string): string | undefined {
  const re = new RegExp(`^${nombre}(?:;[^:]*)?:(.*)$`, "m");
  const m = cuerpo.match(re);
  return m ? m[1].trim() : undefined;
}

function aFecha(valor: string): Date | null {
  const m = valor.trim().match(/^(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
}

/** Extrae los VEVENT de un calendario iCal. */
export function parsearIcal(texto: string): EventoExterno[] {
  const eventos: EventoExterno[] = [];
  const plano = desplegar(texto);
  const bloques = plano.split("BEGIN:VEVENT");
  for (let i = 1; i < bloques.length; i++) {
    const cuerpo = bloques[i].split("END:VEVENT")[0];
    const inicio = aFecha(campoDe(cuerpo, "DTSTART") ?? "");
    const fin = aFecha(campoDe(cuerpo, "DTEND") ?? "");
    if (!inicio || !fin) continue;
    eventos.push({
      inicio,
      fin,
      uid: campoDe(cuerpo, "UID") ?? `evt-${i}`,
      resumen: campoDe(cuerpo, "SUMMARY") ?? "Reserva externa",
    });
  }
  return eventos;
}

function fechaIcal(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

function sello(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Genera un iCal con los eventos (reservas y bloqueos) de un barco. */
export function generarIcal(opciones: {
  reservas: Array<{ referencia: string; fechaInicio: Date; fechaFin: Date }>;
  bloques: Array<{ id: string; fechaInicio: Date; fechaFin: Date; motivo: string | null }>;
}): string {
  const lineas: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Estribor//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  const ahora = new Date();

  for (const r of opciones.reservas) {
    lineas.push(
      "BEGIN:VEVENT",
      `UID:res-${r.referencia}@estribor`,
      `DTSTAMP:${sello(ahora)}`,
      `DTSTART;VALUE=DATE:${fechaIcal(r.fechaInicio)}`,
      `DTEND;VALUE=DATE:${fechaIcal(r.fechaFin)}`,
      "SUMMARY:Reservado",
      "TRANSP:OPAQUE",
      "END:VEVENT",
    );
  }
  for (const b of opciones.bloques) {
    lineas.push(
      "BEGIN:VEVENT",
      `UID:bloqueo-${b.id}@estribor`,
      `DTSTAMP:${sello(ahora)}`,
      `DTSTART;VALUE=DATE:${fechaIcal(b.fechaInicio)}`,
      `DTEND;VALUE=DATE:${fechaIcal(b.fechaFin)}`,
      `SUMMARY:${b.motivo ? `Bloqueado: ${b.motivo}` : "Bloqueado"}`,
      "TRANSP:OPAQUE",
      "END:VEVENT",
    );
  }

  lineas.push("END:VCALENDAR");
  return lineas.join("\r\n");
}
