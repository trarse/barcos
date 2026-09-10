"use client";

import { useCallback, useEffect, useState } from "react";

type Propietario = {
  id: string;
  nombre: string;
  clase: string;
  plan: string;
  barcos: number;
  email: string | null;
};

/** Gestión de armadores: el admin activa o quita el plan Pro (que desbloquea el CRM). */
export function PanelArmadores() {
  const [propietarios, setPropietarios] = useState<Propietario[]>([]);
  const [cargando, setCargando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/propietarios");
      const data = await res.json();
      if (data?.ok) setPropietarios(data.propietarios ?? []);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  async function cambiarPlan(p: Propietario) {
    const nuevo = p.plan === "pro" ? "gratis" : "pro";
    await fetch(`/api/propietarios/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: nuevo }),
    });
    void cargar();
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-texto">Armadores</h2>
      <p className="mt-1 text-sm text-texto-suave">
        El plan <strong>Pro</strong> desbloquea el CRM de clientes de cada armador (sus clientes, historial y comunicación).
      </p>

      {cargando ? (
        <p className="mt-6 text-sm text-texto-suave">Cargando…</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {propietarios.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-carta border border-borde bg-superficie p-4">
              <div>
                <span className="font-medium text-texto">{p.nombre}</span>
                <span className="ml-2 text-sm text-texto-suave">{p.email ?? "sin usuario"}</span>
                <span className="ml-2 text-sm text-texto-tenue">{p.barcos} barcos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${p.plan === "pro" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                  {p.plan === "pro" ? "Pro" : "Gratis"}
                </span>
                <button
                  onClick={() => void cambiarPlan(p)}
                  className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto-suave"
                >
                  {p.plan === "pro" ? "Quitar Pro" : "Activar Pro"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
