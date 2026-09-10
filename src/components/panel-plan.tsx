"use client";

import { useCallback, useEffect, useState } from "react";

/** Plan y suscripción Pro del armador. */
export function PanelPlan() {
  const [plan, setPlan] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  const cargar = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/yo");
      const d = await res.json();
      if (d?.ok) setPlan(d.usuario.plan);
    } catch {
      // sin sesión
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  async function activarPro() {
    setMsg("");
    const res = await fetch("/api/plan-pro", { method: "POST" });
    const d = await res.json().catch(() => null);
    if (res.ok && d?.url) {
      window.location.assign(d.url);
    } else {
      setMsg("La suscripción estará disponible en breve (falta configurar Stripe).");
    }
  }

  const esPro = plan === "pro";

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-texto">Tu plan</h2>

      <div className="mt-4 rounded-carta border border-borde bg-superficie p-6">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${esPro ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
          {esPro ? "Plan Pro" : "Plan Gratis"}
        </span>

        <p className="mt-3 text-sm leading-relaxed text-texto-suave">
          {esPro
            ? "Tienes acceso completo: tu flota, tus reservas, tus clientes (CRM) y tus gastos e ingresos."
            : "Con el plan Pro desbloqueas el CRM de clientes: historial, valor (LTV), notas, etiquetas y comunicación con tus clientes."}
        </p>

        {!esPro && (
          <>
            <button
              onClick={() => void activarPro()}
              className="mt-4 rounded-md bg-marca px-5 py-2.5 font-semibold text-fondo"
            >
              Mejorar a Pro
            </button>
            {msg && <p className="mt-2 text-sm text-texto-suave">{msg}</p>}
          </>
        )}
      </div>
    </div>
  );
}
