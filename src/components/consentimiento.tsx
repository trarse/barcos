"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CLAVE = "estribor-consentimiento";

type Idioma = "es" | "en" | "de";
type Decision = "aceptado" | "rechazado";

const ETIQUETAS: Record<Idioma, { texto: string; aceptar: string; rechazar: string; masInfo: string }> = {
  es: {
    texto:
      "Usamos cookies estrictamente necesarias y, solo si aceptas, una medición anónima de audiencia para saber qué páginas se consultan.",
    aceptar: "Aceptar",
    rechazar: "Rechazar",
    masInfo: "Política de cookies",
  },
  en: {
    texto:
      "We use strictly necessary cookies and, only if you accept, anonymous audience measurement to understand which pages are visited.",
    aceptar: "Accept",
    rechazar: "Reject",
    masInfo: "Cookie policy",
  },
  de: {
    texto:
      "Wir verwenden zwingend notwendige Cookies und, nur wenn Sie zustimmen, eine anonyme Reichweitenmessung, um zu verstehen, welche Seiten aufgerufen werden.",
    aceptar: "Akzeptieren",
    rechazar: "Ablehnen",
    masInfo: "Cookie-Richtlinie",
  },
};

/** Lee la decisión guardada. En el servidor no hay `localStorage`. */
function decisionInicial(): Decision | null {
  if (typeof window === "undefined") return null;
  const previo = localStorage.getItem(CLAVE);
  return previo === "aceptado" || previo === "rechazado" ? previo : null;
}

/**
 * Banner de consentimiento propio, sin terceros. Por defecto no carga nada:
 * la analítica (GA4) solo se inyecta si el visitante acepta. Rechazar es tan
 * fácil como aceptar y guarda la decisión para no volver a preguntar.
 */
export function Consentimiento({ idioma }: { idioma: Idioma }) {
  const [estado, setEstado] = useState<Decision | null>(decisionInicial);
  const t = ETIQUETAS[idioma];

  useEffect(() => {
    if (estado !== "aceptado") return;
    const id = process.env.NEXT_PUBLIC_GA4_ID;
    if (!id) return;

    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function (...a: unknown[]) {
      w.dataLayer!.push(a);
    };

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
    w.gtag("js", new Date());
    w.gtag("config", id);
  }, [estado]);

  function decidir(valor: Decision) {
    localStorage.setItem(CLAVE, valor);
    setEstado(valor);
  }

  if (estado !== null) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-borde bg-superficie p-4"
      suppressHydrationWarning
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-texto-suave">{t.texto}</p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => decidir("aceptado")}
            className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo transition-opacity hover:opacity-90"
          >
            {t.aceptar}
          </button>
          <button
            type="button"
            onClick={() => decidir("rechazado")}
            className="rounded-md border border-borde-fuerte px-4 py-2 text-sm font-semibold text-texto transition-colors hover:bg-superficie-alt"
          >
            {t.rechazar}
          </button>
          <Link
            href={`/${idioma}/cookies`}
            className="text-sm text-acento underline underline-offset-4"
          >
            {t.masInfo}
          </Link>
        </div>
      </div>
    </div>
  );
}
