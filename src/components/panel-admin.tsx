"use client";

import { useCallback, useEffect, useState } from "react";

import { PanelBlog } from "@/components/panel-blog";

/**
 * Panel de administración de reservas.
 *
 * La "sesión" es la clave guardada en sessionStorage y enviada como cabecera
 * Bearer a /api/reservas. Es lo bastante sencillo para la fase de validación;
 * antes de abrir a armadores habrá que sustituirlo por autenticación real.
 */

type Reserva = {
  id: string;
  referencia: string;
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono: string | null;
  fechaInicio: string;
  fechaFin: string;
  numDias: number;
  numPersonas: number;
  precioTotalCents: number;
  estado: string;
  notas: string | null;
  idioma: string;
  creadoEn: string;
  barco: { nombre: string; slug: string; puerto: { nombre: string } };
};

const ESTADOS = ["pendiente", "confirmada", "cancelada", "rechazada", "completada"];

const ETIQUETA: Record<string, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
  rechazada: "Rechazada",
  completada: "Completada",
};

const COLOR: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-800",
  confirmada: "bg-emerald-100 text-emerald-800",
  cancelada: "bg-slate-200 text-slate-600",
  rechazada: "bg-rose-100 text-rose-800",
  completada: "bg-sky-100 text-sky-800",
};

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

function fecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function PanelAdmin() {
  const [clave, setClave] = useState(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("estribor_admin") ?? "";
  });
  const [autenticado, setAutenticado] = useState(false);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("pendiente");
  const [vista, setVista] = useState<"reservas" | "blog">("reservas");

  const cargar = useCallback(async (token: string) => {
    try {
      const res = await fetch("/api/reservas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("auth");
      const data = await res.json();
      setReservas(data.reservas ?? []);
      setAutenticado(true);
      setError("");
      sessionStorage.setItem("estribor_admin", token);
    } catch {
      setError("Clave incorrecta o no se pudo cargar.");
      setAutenticado(false);
    }
  }, []);

  useEffect(() => {
    if (clave) {
      // Carga inicial en el montaje: fetch asíncrono; el setState ocurre
      // después del await, no de forma síncrona en el efecto.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void cargar(clave);
    }
  }, [clave, cargar]);

  async function cambiarEstado(id: string, estado: string) {
    const token = sessionStorage.getItem("estribor_admin");
    if (!token) return;
    const res = await fetch("/api/reservas", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, estado }),
    });
    if (res.ok) {
      setReservas((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado } : r)),
      );
    }
  }

  if (!autenticado) {
    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-2xl font-semibold text-texto">
          Panel · Estribor
        </h1>
        <p className="mt-2 text-sm text-texto-suave">
          Introduce la clave de administración.
        </p>
        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setCargando(true);
            void cargar(clave).finally(() => setCargando(false));
          }}
        >
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder="Clave"
            autoFocus
            className="w-full rounded-carta border border-borde bg-superficie px-4 py-2 text-texto"
          />
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-carta bg-acento px-4 py-2 font-medium text-white disabled:opacity-50"
          >
            {cargando ? "Comprobando…" : "Entrar"}
          </button>
        </form>
      </main>
    );
  }

  if (vista === "blog") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setVista("reservas")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            ← Reservas
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("estribor_admin");
              setAutenticado(false);
            }}
            className="text-sm text-texto-suave underline"
          >
            Salir
          </button>
        </div>
        <div className="mt-8">
          <PanelBlog clave={clave} />
        </div>
      </main>
    );
  }

  const visibles = reservas.filter((r) => r.estado === filtro);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="rounded-full bg-acento px-4 py-1.5 text-sm font-medium text-white">
            Reservas
          </span>
          <button
            onClick={() => setVista("blog")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            Blog
          </button>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("estribor_admin");
            setAutenticado(false);
          }}
          className="text-sm text-texto-suave underline"
        >
          Salir
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {ESTADOS.map((estado) => {
          const n = reservas.filter((r) => r.estado === estado).length;
          return (
            <button
              key={estado}
              onClick={() => setFiltro(estado)}
              className={`rounded-full px-3 py-1 text-sm ${
                filtro === estado
                  ? "bg-acento text-white"
                  : "border border-borde bg-superficie text-texto-suave"
              }`}
            >
              {ETIQUETA[estado]} ({n})
            </button>
          );
        })}
      </div>

      {cargando ? (
        <p className="mt-6 text-sm text-texto-suave">Cargando…</p>
      ) : visibles.length === 0 ? (
        <p className="mt-6 text-sm text-texto-suave">
          No hay reservas en este estado.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {visibles.map((r) => (
            <li
              key={r.id}
              className="rounded-carta border border-borde bg-superficie p-5 transition-colors hover:border-acento"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm font-semibold tracking-wider text-texto-suave">
                  {r.referencia}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${COLOR[r.estado]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  {ETIQUETA[r.estado]}
                </span>
              </div>

              <h3 className="mt-3 font-display text-xl font-semibold text-texto">
                {r.barco.nombre}
              </h3>
              <p className="text-sm text-texto-suave">{r.barco.puerto.nombre}</p>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Entrada</dt>
                  <dd className="mt-0.5 text-texto">{fecha(r.fechaInicio)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Salida</dt>
                  <dd className="mt-0.5 text-texto">{fecha(r.fechaFin)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Duración</dt>
                  <dd className="mt-0.5 text-texto">
                    {r.numDias} {r.numDias === 1 ? "día" : "días"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Personas</dt>
                  <dd className="mt-0.5 text-texto">{r.numPersonas}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md bg-superficie-alt px-3 py-2 text-sm">
                <span className="font-semibold text-texto">{r.clienteNombre}</span>
                <span className="text-texto-suave">{r.clienteEmail}</span>
                {r.clienteTelefono && (
                  <span className="text-texto-suave">{r.clienteTelefono}</span>
                )}
              </div>

              {r.notas && (
                <p className="mt-2 text-xs italic text-texto-tenue">{r.notas}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-borde pt-4">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                    Total
                  </span>
                  <span className="cifra font-display text-2xl font-semibold text-acento">
                    {euros(r.precioTotalCents)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {r.estado === "pendiente" && (
                    <>
                      <button
                        onClick={() => void cambiarEstado(r.id, "confirmada")}
                        className="rounded-md bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => void cambiarEstado(r.id, "rechazada")}
                        className="rounded-md bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {(r.estado === "pendiente" || r.estado === "confirmada") && (
                    <button
                      onClick={() => void cambiarEstado(r.id, "cancelada")}
                      className="rounded-md border border-borde px-3.5 py-2 text-sm font-medium text-texto-suave transition-colors hover:bg-superficie-alt"
                    >
                      Cancelar
                    </button>
                  )}
                  {r.estado === "confirmada" && (
                    <button
                      onClick={() => void cambiarEstado(r.id, "completada")}
                      className="rounded-md bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                    >
                      Completar
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
