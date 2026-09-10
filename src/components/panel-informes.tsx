"use client";

import { useCallback, useEffect, useState } from "react";

type Informes = {
  kpis: { totalReservas: number; ingresosCents: number; comisionCents: number; pendienteArmadoresCents: number };
  porMes: Array<{ mes: string; reservas: number; ingresosCents: number }>;
  porArmador: Array<{ nombre: string; reservas: number; ingresosCents: number; comisionCents: number }>;
  porPuerto: Array<{ nombre: string; reservas: number; ingresosCents: number }>;
};

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

export function PanelInformes() {
  const [data, setData] = useState<Informes | null>(null);
  const [cargando, setCargando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/informes");
      const d = await res.json();
      if (d?.ok) setData(d);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  if (cargando || !data) {
    return <p className="mt-6 text-sm text-texto-suave">Cargando…</p>;
  }

  const { kpis } = data;

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-texto">Informes del negocio</h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Reservas</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-texto">{kpis.totalReservas}</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Ingresos</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-emerald-600">{euros(kpis.ingresosCents)}</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Tu comisión</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-acento">{euros(kpis.comisionCents)}</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Pendiente a armadores</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-amber-600">{euros(kpis.pendienteArmadoresCents)}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section>
          <h3 className="text-sm font-semibold text-texto">Ingresos por mes</h3>
          <ul className="mt-2 space-y-1">
            {data.porMes.map((m) => (
              <li key={m.mes} className="flex items-baseline justify-between gap-3 rounded-md border border-borde bg-superficie px-3 py-2 text-sm">
                <span className="text-texto">{m.mes}</span>
                <span className="text-texto-suave">{m.reservas} reservas · <span className="cifra font-medium">{euros(m.ingresosCents)}</span></span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-texto">Por armador</h3>
          <ul className="mt-2 space-y-1">
            {data.porArmador.map((a) => (
              <li key={a.nombre} className="flex items-baseline justify-between gap-3 rounded-md border border-borde bg-superficie px-3 py-2 text-sm">
                <span className="text-texto">{a.nombre}</span>
                <span className="text-texto-suave">{a.reservas} res. · <span className="cifra font-medium">{euros(a.ingresosCents)}</span> · comisión {euros(a.comisionCents)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8">
        <h3 className="text-sm font-semibold text-texto">Por puerto (destino)</h3>
        <ul className="mt-2 space-y-1">
          {data.porPuerto.map((p) => (
            <li key={p.nombre} className="flex items-baseline justify-between gap-3 rounded-md border border-borde bg-superficie px-3 py-2 text-sm">
              <span className="text-texto">{p.nombre}</span>
              <span className="text-texto-suave">{p.reservas} res. · <span className="cifra font-medium">{euros(p.ingresosCents)}</span></span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
