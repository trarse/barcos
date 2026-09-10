"use client";

import { useCallback, useEffect, useState } from "react";

type Armador = {
  propietario: string;
  pendienteCents: number;
  reservas: Array<{ id: string; referencia: string; netoArmadorCents: number }>;
};

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

/** Liquidaciones: lo que debes pagar a cada armador. */
export function PanelLiquidaciones() {
  const [armadores, setArmadores] = useState<Armador[]>([]);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/liquidaciones");
      const d = await res.json();
      if (d?.ok) {
        setArmadores(d.armadores ?? []);
        setTotal(d.totalPendienteCents ?? 0);
      }
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  async function marcarPagado(a: Armador) {
    await fetch("/api/liquidaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: a.reservas.map((r) => r.id) }),
    });
    void cargar();
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-texto">Liquidaciones</h2>
      <p className="mt-1 text-sm text-texto-suave">
        Pendiente de pagar a armadores: <span className="cifra font-semibold text-amber-600">{euros(total)}</span>
      </p>

      {cargando ? (
        <p className="mt-6 text-sm text-texto-suave">Cargando…</p>
      ) : armadores.length === 0 ? (
        <p className="mt-6 text-sm text-texto-suave">No hay pagos pendientes a armadores.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {armadores.map((a) => (
            <li key={a.propietario} className="flex flex-wrap items-center justify-between gap-3 rounded-carta border border-borde bg-superficie p-4">
              <div>
                <span className="font-medium text-texto">{a.propietario}</span>
                <span className="ml-2 text-sm text-texto-suave">{a.reservas.length} reservas</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="cifra font-display text-lg font-semibold text-acento">{euros(a.pendienteCents)}</span>
                <button
                  onClick={() => void marcarPagado(a)}
                  className="rounded-md bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white"
                >
                  Marcar pagado
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
