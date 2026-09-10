"use client";

import { useCallback, useEffect, useState } from "react";

import { CalendarioFlota } from "@/components/calendario-flota";
import { PanelBarcos } from "@/components/panel-barcos";
import { PanelArmadores } from "@/components/panel-armadores";
import { PanelClientes } from "@/components/panel-clientes";
import { PanelInformes } from "@/components/panel-informes";
import { PanelLiquidaciones } from "@/components/panel-liquidaciones";
import { PanelBlog } from "@/components/panel-blog";
import { paisDeTelefono } from "@/lib/telefonos";

/**
 * Panel de administración de reservas, barcos y blog.
 *
 * La autenticación es real: email + contraseña contra /api/auth/login, que
 * deja una cookie httpOnly de sesión. Las peticiones al API no mandan ninguna
 * cabecera: la sesión viaja sola en la cookie.
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
  pagado: boolean;
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
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState<{ email: string; nombre: string } | null>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoReservas, setCargandoReservas] = useState(false);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("pendiente");
  const [vista, setVista] = useState<"reservas" | "blog" | "barcos" | "calendario" | "clientes" | "armadores" | "informes" | "liquidaciones">("reservas");

  // Campos del formulario de acceso.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Cambio de contraseña.
  const [mostrarCambioClave, setMostrarCambioClave] = useState(false);
  const [claveActual, setClaveActual] = useState("");
  const [claveNueva, setClaveNueva] = useState("");
  const [msgClave, setMsgClave] = useState("");

  const cargarReservas = useCallback(async () => {
    setCargandoReservas(true);
    try {
      const res = await fetch("/api/reservas");
      if (!res.ok) throw new Error("auth");
      const data = await res.json();
      setReservas(data.reservas ?? []);
    } catch {
      // La sesión ya la valida /api/auth/yo.
    } finally {
      setCargandoReservas(false);
    }
  }, []);

  useEffect(() => {
    // Montaje: comprobar la sesión y, si existe, cargar las reservas.
    void (async () => {
      try {
        const res = await fetch("/api/auth/yo");
        if (res.ok) {
          const data = await res.json();
          setUsuario(data.usuario);
          setAutenticado(true);
          void cargarReservas();
        }
      } catch {
        // Sin sesión: se queda en la pantalla de acceso.
      } finally {
        setCargando(false);
      }
    })();
  }, [cargarReservas]);

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
        void cargarReservas();
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
    setVista("reservas");
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

  async function cobrar(id: string) {
    const res = await fetch("/api/pagos/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservaId: id }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.urlPago) {
      window.open(data.urlPago, "_blank", "noopener,noreferrer");
    } else {
      alert("No se pudo crear el enlace de pago. Comprueba que Stripe está configurado.");
    }
  }

  async function cambiarClave(e: React.FormEvent) {
    e.preventDefault();
    setMsgClave("");
    try {
      const res = await fetch("/api/auth/cambiar-clave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actual: claveActual, nueva: claveNueva }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setClaveActual("");
        setClaveNueva("");
        setMostrarCambioClave(false);
        setMsgClave("Contraseña actualizada.");
      } else if (data?.error === "credenciales") {
        setMsgClave("La contraseña actual no es correcta.");
      } else {
        setMsgClave("La nueva debe tener al menos 8 caracteres.");
      }
    } catch {
      setMsgClave("No se pudo actualizar.");
    }
  }

  if (!autenticado) {
    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-2xl font-semibold text-texto">
          Panel · Estribor
        </h1>
        <p className="mt-2 text-sm text-texto-suave">
          Entra con tu email y contraseña.
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
          <button onClick={() => void salir()} className="text-sm text-texto-suave underline">
            Salir
          </button>
        </div>
        <div className="mt-8">
          <PanelBlog />
        </div>
      </main>
    );
  }

  if (vista === "barcos") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setVista("reservas")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            ← Reservas
          </button>
          <button onClick={() => void salir()} className="text-sm text-texto-suave underline">
            Salir
          </button>
        </div>
        <div className="mt-8">
          <PanelBarcos />
        </div>
      </main>
    );
  }

  if (vista === "calendario") {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setVista("reservas")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            ← Reservas
          </button>
          <button onClick={() => void salir()} className="text-sm text-texto-suave underline">
            Salir
          </button>
        </div>
        <div className="mt-8">
          <CalendarioFlota />
        </div>
      </main>
    );
  }

  if (vista === "clientes") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setVista("reservas")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            ← Reservas
          </button>
          <button onClick={() => void salir()} className="text-sm text-texto-suave underline">
            Salir
          </button>
        </div>
        <div className="mt-8">
          <PanelClientes />
        </div>
      </main>
    );
  }

  if (vista === "armadores") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setVista("reservas")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            ← Reservas
          </button>
          <button onClick={() => void salir()} className="text-sm text-texto-suave underline">
            Salir
          </button>
        </div>
        <div className="mt-8">
          <PanelArmadores />
        </div>
      </main>
    );
  }

  if (vista === "informes") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <button onClick={() => setVista("reservas")} className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave">← Reservas</button>
          <button onClick={() => void salir()} className="text-sm text-texto-suave underline">Salir</button>
        </div>
        <div className="mt-8"><PanelInformes /></div>
      </main>
    );
  }

  if (vista === "liquidaciones") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <button onClick={() => setVista("reservas")} className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave">← Reservas</button>
          <button onClick={() => void salir()} className="text-sm text-texto-suave underline">Salir</button>
        </div>
        <div className="mt-8"><PanelLiquidaciones /></div>
      </main>
    );
  }

  const visibles = reservas.filter((r) => r.estado === filtro);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
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
          <button
            onClick={() => setVista("barcos")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            Barcos
          </button>
          <button
            onClick={() => setVista("calendario")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            Calendario
          </button>
          <button
            onClick={() => setVista("clientes")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            Clientes
          </button>
          <button
            onClick={() => setVista("armadores")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            Armadores
          </button>
          <button
            onClick={() => setVista("informes")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            Informes
          </button>
          <button
            onClick={() => setVista("liquidaciones")}
            className="rounded-full border border-borde px-4 py-1.5 text-sm font-medium text-texto-suave"
          >
            Liquidaciones
          </button>
        </div>
        <div className="flex items-center gap-3">
          {usuario && (
            <span className="text-sm text-texto-suave">
              {usuario.nombre} · {usuario.email}
            </span>
          )}
          <button
            onClick={() => setMostrarCambioClave((v) => !v)}
            className="text-sm text-texto-suave underline"
          >
            Cambiar clave
          </button>
          <button onClick={() => void salir()} className="text-sm text-texto-suave underline">
            Salir
          </button>
        </div>
      </div>

      {mostrarCambioClave && (
        <form
          onSubmit={cambiarClave}
          className="mt-4 grid gap-3 rounded-carta border border-borde bg-superficie p-4 sm:grid-cols-2"
        >
          <input
            type="password"
            value={claveActual}
            onChange={(e) => setClaveActual(e.target.value)}
            placeholder="Contraseña actual"
            autoComplete="current-password"
            className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
          />
          <input
            type="password"
            value={claveNueva}
            onChange={(e) => setClaveNueva(e.target.value)}
            placeholder="Nueva contraseña (mín. 8)"
            autoComplete="new-password"
            className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
          />
          {msgClave && (
            <p className="text-sm text-texto-suave sm:col-span-2">{msgClave}</p>
          )}
          <button
            type="submit"
            className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo sm:col-span-2"
          >
            Actualizar contraseña
          </button>
        </form>
      )}

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

      {cargandoReservas ? (
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
                  <span className="text-texto-suave">
                    {r.clienteTelefono}
                    {(() => {
                      const pais = paisDeTelefono(r.clienteTelefono);
                      return pais ? (
                        <span className="ml-1.5 text-texto-tenue">
                          {pais.bandera} {pais.pais}
                        </span>
                      ) : null;
                    })()}
                  </span>
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
                  <a
                    href={`/contrato/${r.referencia}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-borde px-3.5 py-2 text-sm font-medium text-texto-suave transition-colors hover:bg-superficie-alt"
                  >
                    Contrato
                  </a>
                  {!r.pagado && (r.estado === "pendiente" || r.estado === "confirmada") && (
                    <button
                      onClick={() => void cobrar(r.id)}
                      className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                    >
                      Cobrar
                    </button>
                  )}
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
