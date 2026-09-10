"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Área del armador: cada propietario entra con su email y contraseña y ve
 * solo sus barcos y las reservas de esos barcos. Puede confirmar, rechazar,
 * cancelar o completar reservas; no toca las de otros ni el blog.
 */

type Barco = {
  id: string;
  nombre: string;
  publicado: boolean;
  puerto: string;
};

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
  pagado: boolean;
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

export function PanelArmador() {
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState<{ email: string; nombre: string } | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [barcos, setBarcos] = useState<Barco[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtro, setFiltro] = useState("todas");

  const cargarDatos = useCallback(async () => {
    const [rb, rr] = await Promise.all([
      fetch("/api/barcos").then((r) => r.json()),
      fetch("/api/reservas").then((r) => r.json()),
    ]);
    setBarcos(rb?.barcos ?? []);
    setReservas(rr?.reservas ?? []);
  }, []);

  useEffect(() => {
    // Montaje: comprobar la sesión y, si existe, cargar barcos y reservas.
    void (async () => {
      try {
        const res = await fetch("/api/auth/yo");
        if (res.ok) {
          const data = await res.json();
          setUsuario(data.usuario);
          setAutenticado(true);
          void cargarDatos();
        }
      } catch {
        // Sin sesión: se queda en la pantalla de acceso.
      } finally {
        setCargando(false);
      }
    })();
  }, [cargarDatos]);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setUsuario(data.usuario);
        setAutenticado(true);
        setPassword("");
        void cargarDatos();
      } else if (data?.error === "limit") {
        setError("Demasiados intentos. Espera unos minutos.");
      } else {
        setError("Email o contraseña incorrectos.");
      }
    } catch {
      setError("No se pudo conectar.");
    } finally {
      setCargando(false);
    }
  }

  async function salir() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setAutenticado(false);
    setUsuario(null);
  }

  async function cambiarEstado(id: string, estado: string) {
    const res = await fetch("/api/reservas", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
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
          Área del armador
        </h1>
        <p className="mt-2 text-sm text-texto-suave">
          Entra con tu email y contraseña para gestionar tus barcos y reservas.
        </p>
        <form className="mt-6 space-y-3" onSubmit={entrar}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoFocus
            autoComplete="username"
            className="w-full rounded-carta border border-borde bg-superficie px-4 py-2 text-texto"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoComplete="current-password"
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

  const pendientes = reservas.filter((r) => r.estado === "pendiente").length;
  const visibles = filtro === "todas" ? reservas : reservas.filter((r) => r.estado === filtro);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-texto">
            Área del armador
          </h1>
          {usuario && (
            <p className="mt-1 text-sm text-texto-suave">
              {usuario.nombre} · {usuario.email}
            </p>
          )}
        </div>
        <button onClick={() => void salir()} className="text-sm text-texto-suave underline">
          Salir
        </button>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-texto">Tus barcos</h2>
        {barcos.length === 0 ? (
          <p className="mt-2 text-sm text-texto-suave">No tienes barcos dados de alta.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {barcos.map((b) => (
              <li
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-carta border border-borde bg-superficie p-4"
              >
                <div>
                  <span className="font-medium text-texto">{b.nombre}</span>
                  <span className="ml-2 text-sm text-texto-suave">{b.puerto}</span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    b.publicado ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {b.publicado ? "Publicado" : "Pendiente de revisión"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-texto">
            Reservas{" "}
            <span className="text-sm font-normal text-texto-suave">
              ({pendientes} pendientes)
            </span>
          </h2>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["todas", ...ESTADOS].map((estado) => {
            const n = estado === "todas" ? reservas.length : reservas.filter((r) => r.estado === estado).length;
            const etiqueta = estado === "todas" ? "Todas" : ETIQUETA[estado];
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
                {etiqueta} ({n})
              </button>
            );
          })}
        </div>

        {visibles.length === 0 ? (
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
                  <span className="flex items-center gap-2">
                    {r.pagado && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                        Pagado
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${COLOR[r.estado]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                      {ETIQUETA[r.estado]}
                    </span>
                  </span>
                </div>

                <h3 className="mt-3 font-display text-xl font-semibold text-texto">
                  {r.barco.nombre}
                </h3>
                <p className="text-sm text-texto-suave">
                  {fecha(r.fechaInicio)} → {fecha(r.fechaFin)} · {r.numDias}{" "}
                  {r.numDias === 1 ? "día" : "días"} · {r.numPersonas} personas
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md bg-superficie-alt px-3 py-2 text-sm">
                  <span className="font-semibold text-texto">{r.clienteNombre}</span>
                  <span className="text-texto-suave">{r.clienteEmail}</span>
                  {r.clienteTelefono && (
                    <span className="text-texto-suave">{r.clienteTelefono}</span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-borde pt-4">
                  <span className="cifra font-display text-2xl font-semibold text-acento">
                    {euros(r.precioTotalCents)}
                  </span>
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
      </section>
    </main>
  );
}
