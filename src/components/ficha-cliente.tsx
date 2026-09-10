"use client";

import { useCallback, useEffect, useState } from "react";

type ClienteDetalle = {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  pais: string | null;
  idioma: string;
  notas: string | null;
  etiquetas: string[];
  creadoEn: string;
  totalCents: number;
  numReservas: number;
  reservas: Array<{
    id: string;
    referencia: string;
    barco: string;
    fechaInicio: string;
    fechaFin: string;
    numDias: number;
    numPersonas: number;
    precioTotalCents: number;
    estado: string;
    pagado: boolean;
  }>;
  comunicaciones: Array<{ id: string; tipo: string; asunto: string; creadoEn: string }>;
  tareas: Array<{ id: string; texto: string; hecho: boolean; creadoEn: string }>;
};

const ETIQUETA: Record<string, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
  rechazada: "Rechazada",
  completada: "Completada",
};

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function fecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function FichaCliente({ clienteId, onCerrar }: { clienteId: string; onCerrar: () => void }) {
  const [cliente, setCliente] = useState<ClienteDetalle | null>(null);
  const [cargando, setCargando] = useState(true);

  const [notas, setNotas] = useState("");
  const [etiquetasTexto, setEtiquetasTexto] = useState("");
  const [msgDatos, setMsgDatos] = useState("");

  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [msgCorreo, setMsgCorreo] = useState("");

  const [nuevaTarea, setNuevaTarea] = useState("");

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch(`/api/clientes/${clienteId}`);
      const data = await res.json();
      if (data?.ok) {
        setCliente(data.cliente);
        setNotas(data.cliente.notas ?? "");
        setEtiquetasTexto((data.cliente.etiquetas ?? []).join(", "));
      }
    } finally {
      setCargando(false);
    }
  }, [clienteId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  async function guardarDatos() {
    setMsgDatos("");
    const res = await fetch(`/api/clientes/${clienteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notas,
        etiquetas: etiquetasTexto.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });
    setMsgDatos(res.ok ? "Guardado." : "No se pudo guardar.");
  }

  async function enviarCorreo() {
    setMsgCorreo("");
    if (!asunto.trim() || !mensaje.trim()) return;
    const res = await fetch(`/api/clientes/${clienteId}/correo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asunto, mensaje }),
    });
    const data = await res.json().catch(() => null);
    setMsgCorreo(res.ok && data?.enviado ? "Correo enviado." : "No se pudo enviar (¿Resend configurado?).");
    if (res.ok) {
      setAsunto("");
      setMensaje("");
      void cargar();
    }
  }

  async function anadirTarea(e: React.FormEvent) {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;
    await fetch(`/api/clientes/${clienteId}/tareas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: nuevaTarea.trim() }),
    });
    setNuevaTarea("");
    void cargar();
  }

  async function toggleTarea(tareaId: string, hecho: boolean) {
    await fetch(`/api/clientes/${clienteId}/tareas`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tareaId, hecho }),
    });
    void cargar();
  }

  async function borrarTarea(tareaId: string) {
    await fetch(`/api/clientes/${clienteId}/tareas`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tareaId }),
    });
    void cargar();
  }

  if (cargando || !cliente) {
    return <p className="mt-6 text-sm text-texto-suave">Cargando…</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={onCerrar} className="text-sm text-texto-suave underline">← Clientes</button>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="font-display text-2xl font-semibold text-texto">{cliente.nombre}</h2>
        <span className="text-sm text-texto-suave">{cliente.email}</span>
        {cliente.telefono && <span className="text-sm text-texto-suave">{cliente.telefono}</span>}
        {cliente.pais && <span className="text-sm text-texto-suave">{cliente.pais}</span>}
      </div>
      {cliente.etiquetas.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {cliente.etiquetas.map((e) => (
            <span key={e} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{e}</span>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Reservas</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-texto">{cliente.numReservas}</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Gasto total (LTV)</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-acento">{euros(cliente.totalCents)}</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Cliente desde</p>
          <p className="mt-1 text-texto">{fecha(cliente.creadoEn)}</p>
        </div>
      </div>

      {/* Notas y etiquetas */}
      <section className="mt-8">
        <h3 className="font-display text-lg font-semibold text-texto">Notas y etiquetas</h3>
        <div className="mt-3 space-y-3">
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={3}
            placeholder="Notas internas sobre este cliente…"
            className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
          />
          <input
            value={etiquetasTexto}
            onChange={(e) => setEtiquetasTexto(e.target.value)}
            placeholder="Etiquetas separadas por coma (vip, repetidor, moroso…)"
            className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
          />
          <div className="flex items-center gap-2">
            <button onClick={() => void guardarDatos()} className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo">Guardar</button>
            {msgDatos && <span className="text-sm text-texto-suave">{msgDatos}</span>}
          </div>
        </div>
      </section>

      {/* Enviar correo */}
      <section className="mt-8">
        <h3 className="font-display text-lg font-semibold text-texto">Enviar correo</h3>
        <div className="mt-3 space-y-2">
          <input
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            placeholder="Asunto"
            className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
          />
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
            placeholder="Mensaje…"
            className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
          />
          <div className="flex items-center gap-2">
            <button onClick={() => void enviarCorreo()} className="rounded-md bg-acento px-4 py-2 text-sm font-medium text-white">Enviar</button>
            {msgCorreo && <span className="text-sm text-texto-suave">{msgCorreo}</span>}
          </div>
        </div>
      </section>

      {/* Tareas */}
      <section className="mt-8">
        <h3 className="font-display text-lg font-semibold text-texto">Tareas de seguimiento</h3>
        <ul className="mt-3 space-y-1">
          {cliente.tareas.length === 0 && <li className="text-sm text-texto-suave">Sin tareas.</li>}
          {cliente.tareas.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-2 rounded-md border border-borde bg-superficie px-3 py-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={t.hecho}
                  onChange={(e) => void toggleTarea(t.id, e.target.checked)}
                  className="h-4 w-4 accent-[var(--acento)]"
                />
                <span className={t.hecho ? "text-texto-tenue line-through" : "text-texto"}>{t.texto}</span>
              </label>
              <button onClick={() => void borrarTarea(t.id)} className="text-xs text-rose-600 underline">borrar</button>
            </li>
          ))}
        </ul>
        <form onSubmit={anadirTarea} className="mt-2 flex gap-2">
          <input
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nueva tarea (llamar, enviar presupuesto…)"
            className="flex-1 rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
          />
          <button type="submit" className="rounded-md border border-borde px-4 py-2 text-sm text-texto">Añadir</button>
        </form>
      </section>

      {/* Historial de reservas */}
      <section className="mt-8">
        <h3 className="font-display text-lg font-semibold text-texto">Historial de reservas</h3>
        <ul className="mt-3 space-y-2">
          {cliente.reservas.length === 0 && <li className="text-sm text-texto-suave">Sin reservas.</li>}
          {cliente.reservas.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-carta border border-borde bg-superficie p-3 text-sm">
              <div>
                <span className="font-mono font-semibold text-texto-suave">{r.referencia}</span>
                <span className="ml-2 text-texto">{r.barco}</span>
                <span className="ml-2 text-texto-suave">{fecha(r.fechaInicio)} → {fecha(r.fechaFin)}</span>
              </div>
              <div className="flex items-center gap-2">
                {r.pagado && <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Pagado</span>}
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{ETIQUETA[r.estado] ?? r.estado}</span>
                <span className="cifra font-medium text-texto">{euros(r.precioTotalCents)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Comunicaciones */}
      <section className="mt-8">
        <h3 className="font-display text-lg font-semibold text-texto">Comunicaciones</h3>
        <ul className="mt-3 space-y-1">
          {cliente.comunicaciones.length === 0 && <li className="text-sm text-texto-suave">Sin correos registrados.</li>}
          {cliente.comunicaciones.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-2 rounded-md border border-borde bg-superficie px-3 py-2 text-sm">
              <span className="text-texto">{c.asunto}</span>
              <span className="text-xs text-texto-tenue">{fecha(c.creadoEn)} · {c.tipo}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
