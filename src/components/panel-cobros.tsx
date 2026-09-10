"use client";

import { useCallback, useEffect, useState } from "react";

type Cobros = {
  pendienteCents: number;
  cobradoCents: number;
  reservas: Array<{ id: string; referencia: string; barco: string; fechaInicio: string; netoArmadorCents: number; liquidado: boolean }>;
};

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function fecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** Cobros del armador: pendiente y lo ya cobrado (su parte, tras la comisión). */
export function PanelCobros() {
  const [cobros, setCobros] = useState<Cobros | null>(null);
  const [cargando, setCargando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/cobros");
      const d = await res.json();
      if (d?.ok) setCobros(d);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  if (cargando || !cobros) {
    return <p className="mt-6 text-sm text-texto-suave">Cargando…</p>;
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-texto">Mis cobros</h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Pendiente de cobrar</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-amber-600">{euros(cobros.pendienteCents)}</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Ya cobrado</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-emerald-600">{euros(cobros.cobradoCents)}</p>
        </div>
      </div>

      <h3 className="mt-6 text-sm font-semibold text-texto">Detalle</h3>
      {cobros.reservas.length === 0 ? (
        <p className="mt-2 text-sm text-texto-suave">Aún no tienes reservas pagadas.</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {cobros.reservas.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-borde bg-superficie px-3 py-2 text-sm">
              <div>
                <span className="font-mono text-texto-suave">{r.referencia}</span>
                <span className="ml-2 text-texto">{r.barco}</span>
                <span className="ml-2 text-xs text-texto-tenue">{fecha(r.fechaInicio)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="cifra font-medium text-texto">{euros(r.netoArmadorCents)}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.liquidado ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                  {r.liquidado ? "Cobrado" : "Pendiente"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
