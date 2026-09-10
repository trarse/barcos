import { db } from "@/lib/db";

import { parsearIcal, type EventoExterno } from "@/lib/ical";

/**
 * Sincronización de calendarios externos con caché TTL y deduplicación.
 *
 * - TTL: si el barco se sincronizó hace menos de TTL_MS, no se vuelve a
 *   consultar (se devuelve el resultado en caché). El guardián real es la
 *   marca `ultimaSync` en base de datos, que sobrevive entre invocaciones
 *   serverless.
 * - Deduplicación: un Map en memoria evita dos sincronizaciones simultáneas
 *   del mismo barco dentro de la misma instancia.
 * - Timeout por calendario: un calendario colgado no bloquea la reserva
 *   eternamente; se marca error y se continúa con el resto.
 */

const TTL_MS = 15 * 60 * 1000; // 15 minutos
const TIMEOUT_MS = 5000;

const enCurso = new Map<string, Promise<{ importados: number; sincronizado: boolean }>>();

export async function sincronizarBarco(
  barcoId: string,
  opciones: { forzar?: boolean } = {},
): Promise<{ importados: number; sincronizado: boolean }> {
  const activa = enCurso.get(barcoId);
  if (activa) return activa;

  const promesa = hacerSync(barcoId, opciones.forzar ?? false).finally(() => {
    enCurso.delete(barcoId);
  });
  enCurso.set(barcoId, promesa);
  return promesa;
}

async function hacerSync(barcoId: string, forzar: boolean) {
  const calendarios = await db.calendarioExterno.findMany({ where: { barcoId } });
  if (calendarios.length === 0) return { importados: 0, sincronizado: false };

  const ahora = Date.now();
  const todoFresco = calendarios.every(
    (c) => c.ultimaSync && ahora - c.ultimaSync.getTime() < TTL_MS,
  );
  if (!forzar && todoFresco) return { importados: 0, sincronizado: false };

  const eventos: EventoExterno[] = [];
  for (const cal of calendarios) {
    try {
      const res = await fetch(cal.url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      eventos.push(...parsearIcal(await res.text()));
      await db.calendarioExterno.update({
        where: { id: cal.id },
        data: { ultimaSync: new Date(), error: null },
      });
    } catch (e) {
      await db.calendarioExterno.update({
        where: { id: cal.id },
        data: { error: (e as Error).message.slice(0, 200) },
      });
    }
  }

  // Reemplaza los bloqueos externos por los recién leídos.
  await db.bloqueo.deleteMany({ where: { barcoId, fuente: "externo" } });
  const futuros = eventos.filter((e) => e.fin.getTime() > Date.now());
  if (futuros.length > 0) {
    await db.bloqueo.createMany({
      data: futuros.map((e) => ({
        barcoId,
        fechaInicio: e.inicio,
        fechaFin: e.fin,
        motivo: e.resumen,
        fuente: "externo",
        uid: e.uid,
      })),
    });
  }

  return { importados: futuros.length, sincronizado: true };
}
