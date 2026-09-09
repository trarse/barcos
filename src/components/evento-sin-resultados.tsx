"use client";

import { useEffect } from "react";

/**
 * Dispara el evento `sin_resultados` con puerto y fecha cuando una consulta
 * devuelve cero resultados. Es el único dato del sitio que dice dónde falta
 * inventario; gobierna la agenda comercial (plan 5.5).
 *
 * Solo se emite si la analítica está cargada (consentimiento aceptado).
 */
export function EventoSinResultados({ puerto }: { puerto: string }) {
  useEffect(() => {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    if (w.gtag) {
      w.gtag("event", "sin_resultados", {
        puerto,
        fecha: new Date().toISOString().slice(0, 10),
      });
    }
  }, [puerto]);

  return null;
}
