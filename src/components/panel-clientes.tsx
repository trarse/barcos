"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { FichaCliente } from "@/components/ficha-cliente";

type Cliente = {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  pais: string | null;
  idioma: string;
  etiquetas: string[];
  creadoEn: string;
  numReservas: number;
  totalCents: number;
  ultimaReserva: string | null;
};

type Resumen = { total: number; repetidores: number; nuevos: number; ltvMedioCents: number };

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function fecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function PanelClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [cargando, setCargando] = useState(false);
  const [texto, setTexto] = useState("");
  const [segmento, setSegmento] = useState("todos");
  const [detalleId, setDetalleId] = useState<string | null>(null);
  const [ahora, setAhora] = useState(0);
  const [sinPlan, setSinPlan] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/clientes");
      if (res.status === 403) {
        setSinPlan(true);
        return;
      }
      const data = await res.json();
      if (data?.ok) {
        setClientes(data.clientes ?? []);
        setResumen(data.resumen ?? null);
      }
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAhora(Date.now());
  }, []);

  const filtrados = useMemo(() => {
    const q = texto.trim().toLowerCase();
    const VENTANA = 90 * 86400000;
    return clientes.filter((c) => {
      if (q && !`${c.nombre} ${c.email} ${c.telefono ?? ""} ${c.pais ?? ""}`.toLowerCase().includes(q)) return false;
      if (segmento === "repetidores" && c.numReservas < 2) return false;
      if (segmento === "vip" && c.totalCents < 100000) return false;
      if (segmento === "inactivos") {
        const ultima = c.ultimaReserva ? new Date(c.ultimaReserva).getTime() : 0;
        if (ahora && ultima > ahora - VENTANA) return false;
      }
      return true;
    });
  }, [clientes, texto, segmento, ahora]);

  if (detalleId) {
    return <FichaCliente clienteId={detalleId} onCerrar={() => setDetalleId(null)} />;
  }

  if (sinPlan) {
    return (
      <div className="rounded-carta border border-borde bg-superficie p-8 text-center">
        <h2 className="font-display text-xl font-semibold text-texto">El CRM de clientes es Pro</h2>
        <p className="mt-2 text-sm text-texto-suave">
          Con el plan Pro gestionas a tus clientes: historial, valor (LTV), notas, etiquetas y comunicación.
        </p>
        <p className="mt-1 text-sm text-texto-suave">Contacta con nosotros para activarlo.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-texto">Clientes</h2>

      {resumen && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Total clientes</p>
            <p className="mt-1 cifra font-display text-2xl font-semibold text-texto">{resumen.total}</p>
          </div>
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Repetidores</p>
            <p className="mt-1 cifra font-display text-2xl font-semibold text-texto">{resumen.repetidores}</p>
          </div>
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Nuevos este mes</p>
            <p className="mt-1 cifra font-display text-2xl font-semibold text-texto">{resumen.nuevos}</p>
          </div>
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Gasto medio (LTV)</p>
            <p className="mt-1 cifra font-display text-2xl font-semibold text-acento">{euros(resumen.ltvMedioCents)}</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Buscar nombre, email, teléfono, país…"
          className="min-w-60 flex-1 rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
        />
        <select
          value={segmento}
          onChange={(e) => setSegmento(e.target.value)}
          className="rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
        >
          <option value="todos">Todos</option>
          <option value="repetidores">Repetidores (2+ reservas)</option>
          <option value="vip">VIP (≥ 1.000 €)</option>
          <option value="inactivos">Inactivos (90+ días)</option>
        </select>
      </div>

      {cargando ? (
        <p className="mt-6 text-sm text-texto-suave">Cargando…</p>
      ) : filtrados.length === 0 ? (
        <p className="mt-6 text-sm text-texto-suave">No hay clientes que coincidan.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {filtrados.map((c) => (
            <li
              key={c.id}
              className="rounded-carta border border-borde bg-superficie p-4 transition-colors hover:border-acento"
            >
              <button onClick={() => setDetalleId(c.id)} className="flex w-full flex-wrap items-center gap-3 text-left">
                <span className="flex-1">
                  <span className="block font-medium text-texto">{c.nombre}</span>
                  <span className="block text-sm text-texto-suave">
                    {c.email}
                    {c.pais ? ` · ${c.pais}` : ""}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block cifra font-display text-lg font-semibold text-acento">{euros(c.totalCents)}</span>
                  <span className="block text-xs text-texto-tenue">
                    {c.numReservas} {c.numReservas === 1 ? "reserva" : "reservas"}
                    {c.ultimaReserva ? ` · última ${fecha(c.ultimaReserva)}` : ""}
                  </span>
                </span>
                {c.etiquetas.length > 0 && (
                  <span className="flex flex-wrap gap-1">
                    {c.etiquetas.map((e) => (
                      <span key={e} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{e}</span>
                    ))}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
