"use client";

import { useCallback, useEffect, useState } from "react";

import { CalendarioFlota } from "@/components/calendario-flota";
import { FichaBarco } from "@/components/ficha-barco";
import { FormularioEditarBarco, type BarcoDetalle } from "@/components/formulario-editar-barco";
import { PanelClientes } from "@/components/panel-clientes";
import { PanelCobros } from "@/components/panel-cobros";
import { PanelGastos } from "@/components/panel-gastos";
import { PanelPlan } from "@/components/panel-plan";
import { ParteEntrega } from "@/components/parte-entrega";
import { Firma } from "@/components/firma";

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

type Tipo = { id: string; slug: string; nombre: string };
type Puerto = { id: string; nombre: string; destino: string };

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
  fianzaRetenida: boolean;
  firmaUrl: string | null;
  barco: { nombre: string; slug: string; fianza: number; puerto: { nombre: string } };
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
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [puertos, setPuertos] = useState<Puerto[]>([]);
  const [vista, setVista] = useState<"reservas" | "calendario" | "gastos" | "clientes" | "cobros" | "plan">("reservas");
  const [gestionId, setGestionId] = useState<string | null>(null);
  const [editando, setEditando] = useState<BarcoDetalle | null>(null);
  const [parteDe, setParteDe] = useState<string | null>(null);
  const [firmaDe, setFirmaDe] = useState<string | null>(null);

  const cargarDatos = useCallback(async () => {
    const [rb, rr, rm] = await Promise.all([
      fetch("/api/barcos").then((r) => r.json()),
      fetch("/api/reservas").then((r) => r.json()),
      fetch("/api/meta").then((r) => r.json()),
    ]);
    setBarcos(rb?.barcos ?? []);
    setReservas(rr?.reservas ?? []);
    setTipos(rm?.tipos ?? []);
    setPuertos(rm?.puertos ?? []);
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

  async function fianza(id: string, accion?: "liberar" | "cobrar") {
    const res = await fetch(accion ? "/api/pagos/fianza/gestionar" : "/api/pagos/fianza", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accion ? { reservaId: id, accion } : { reservaId: id }),
    });
    const datos = await res.json().catch(() => null);
    if (accion) {
      if (res.ok) void cargarDatos();
      return;
    }
    if (datos?.urlPago) window.location.assign(datos.urlPago);
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

  if (gestionId) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <FichaBarco
          barcoId={gestionId}
          onCerrar={() => setGestionId(null)}
          onEditar={(b) => {
            setEditando(b);
            setGestionId(null);
          }}
        />
      </main>
    );
  }

  if (editando) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <FormularioEditarBarco
          barco={editando}
          tipos={tipos}
          puertos={puertos}
          onCancelar={() => setEditando(null)}
          onGuardado={() => {
            setEditando(null);
            void cargarDatos();
          }}
        />
      </main>
    );
  }

  if (vista === "calendario") {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-texto">Área del armador</h1>
            {usuario && (
              <p className="mt-1 text-sm text-texto-suave">{usuario.nombre} · {usuario.email}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setVista("reservas")} className="text-sm text-texto-suave underline">
              ← Reservas
            </button>
            <button onClick={() => void salir()} className="text-sm text-texto-suave underline">
              Salir
            </button>
          </div>
        </div>
        <div className="mt-6">
          <CalendarioFlota onAbrirBarco={(id) => setGestionId(id)} />
        </div>
      </main>
    );
  }

  if (vista === "gastos") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-texto">Área del armador</h1>
            {usuario && <p className="mt-1 text-sm text-texto-suave">{usuario.nombre} · {usuario.email}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setVista("reservas")} className="text-sm text-texto-suave underline">← Reservas</button>
            <button onClick={() => void salir()} className="text-sm text-texto-suave underline">Salir</button>
          </div>
        </div>
        <div className="mt-6"><PanelGastos /></div>
      </main>
    );
  }

  if (vista === "clientes") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-texto">Área del armador</h1>
            {usuario && <p className="mt-1 text-sm text-texto-suave">{usuario.nombre} · {usuario.email}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setVista("reservas")} className="text-sm text-texto-suave underline">← Reservas</button>
            <button onClick={() => void salir()} className="text-sm text-texto-suave underline">Salir</button>
          </div>
        </div>
        <div className="mt-6"><PanelClientes /></div>
      </main>
    );
  }

  if (vista === "cobros") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-texto">Área del armador</h1>
            {usuario && <p className="mt-1 text-sm text-texto-suave">{usuario.nombre} · {usuario.email}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setVista("reservas")} className="text-sm text-texto-suave underline">← Reservas</button>
            <button onClick={() => void salir()} className="text-sm text-texto-suave underline">Salir</button>
          </div>
        </div>
        <div className="mt-6"><PanelCobros /></div>
      </main>
    );
  }

  if (vista === "plan") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-texto">Área del armador</h1>
            {usuario && <p className="mt-1 text-sm text-texto-suave">{usuario.nombre} · {usuario.email}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setVista("reservas")} className="text-sm text-texto-suave underline">← Reservas</button>
            <button onClick={() => void salir()} className="text-sm text-texto-suave underline">Salir</button>
          </div>
        </div>
        <div className="mt-6"><PanelPlan /></div>
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
        <div className="flex items-center gap-3">
          <button onClick={() => setVista("calendario")} className="text-sm text-texto-suave underline">
            Calendario
          </button>
          <button onClick={() => setVista("gastos")} className="text-sm text-texto-suave underline">
            Gastos
          </button>
          <button onClick={() => setVista("clientes")} className="text-sm text-texto-suave underline">
            Clientes
          </button>
          <button onClick={() => setVista("cobros")} className="text-sm text-texto-suave underline">
            Cobros
          </button>
          <button onClick={() => setVista("plan")} className="text-sm text-texto-suave underline">
            Plan
          </button>
          <button onClick={() => void salir()} className="text-sm text-texto-suave underline">
            Salir
          </button>
        </div>
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
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      b.publicado ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {b.publicado ? "Publicado" : "Pendiente de revisión"}
                  </span>
                  <button
                    onClick={() => setGestionId(b.id)}
                    className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto"
                  >
                    Gestionar
                  </button>
                </div>
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
                    <a
                      href={`/contrato/${r.referencia}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-borde px-3.5 py-2 text-sm font-medium text-texto-suave transition-colors hover:bg-superficie-alt"
                    >
                      Contrato
                    </a>
                    <button
                      onClick={() => setParteDe(parteDe === r.id ? null : r.id)}
                      className="rounded-md border border-borde px-3.5 py-2 text-sm font-medium text-texto-suave transition-colors hover:bg-superficie-alt"
                    >
                      Parte
                    </button>
                    <button
                      onClick={() => setFirmaDe(firmaDe === r.id ? null : r.id)}
                      className="rounded-md border border-borde px-3.5 py-2 text-sm font-medium text-texto-suave transition-colors hover:bg-superficie-alt"
                    >
                      Firma
                    </button>
                    {r.barco.fianza > 0 && !r.fianzaRetenida && (r.estado === "confirmada" || r.estado === "completada") && (
                      <button onClick={() => void fianza(r.id)} className="rounded-md border border-amber-500 px-3.5 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50">
                        Retener fianza
                      </button>
                    )}
                    {r.fianzaRetenida && (
                      <>
                        <button onClick={() => void fianza(r.id, "liberar")} className="rounded-md border border-emerald-600 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50">Liberar fianza</button>
                        <button onClick={() => void fianza(r.id, "cobrar")} className="rounded-md border border-rose-600 px-3 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50">Cobrar fianza</button>
                      </>
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

                {parteDe === r.id && <ParteEntrega reservaId={r.id} referencia={r.referencia} />}
                {firmaDe === r.id && <Firma reservaId={r.id} firmaInicial={r.firmaUrl} />}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
