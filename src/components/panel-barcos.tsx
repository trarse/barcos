"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { FichaBarco } from "@/components/ficha-barco";
import { FormularioEditarBarco, type BarcoDetalle } from "@/components/formulario-editar-barco";

/**
 * Gestión completa de barcos: búsqueda, filtros, lista con tarifas, ficha de
 * detalle (fotos, disponibilidad, reservas, estadísticas), edición, duplicado
 * y acciones en bloque.
 */

type Tipo = { id: string; slug: string; nombre: string };
type Puerto = { id: string; nombre: string; destino: string };

type Barco = {
  id: string;
  nombre: string;
  slug: string;
  fabricante: string;
  modelo: string;
  anio: number;
  publicado: boolean;
  tipo: string;
  puerto: string;
  propietario: string;
  precioBaseDia: number;
  esloraCm: number;
  capacidad: number;
  reservaInstantanea: boolean;
  tipoId: string;
  puertoId: string;
};

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function eslora(cm: number): string {
  return `${(cm / 100).toLocaleString("es-ES", { maximumFractionDigits: 1 })} m`;
}

export function PanelBarcos() {
  const [barcos, setBarcos] = useState<Barco[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [puertos, setPuertos] = useState<Puerto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Filtros
  const [texto, setTexto] = useState("");
  const [filtroPuerto, setFiltroPuerto] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [soloInmediata, setSoloInmediata] = useState(false);

  // Selección para acciones en bloque
  const [seleccion, setSeleccion] = useState<Set<string>>(new Set());

  // Vistas
  const [detalleId, setDetalleId] = useState<string | null>(null);
  const [editando, setEditando] = useState<BarcoDetalle | null>(null);
  const [duplicando, setDuplicando] = useState<Barco | null>(null);
  const [puertoDuplicar, setPuertoDuplicar] = useState("");
  const [tarifaMasiva, setTarifaMasiva] = useState(false);
  const [tarifaModo, setTarifaModo] = useState<"porcentaje" | "fijo">("porcentaje");
  const [tarifaValor, setTarifaValor] = useState("5");

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const [rb, rm] = await Promise.all([
        fetch("/api/barcos").then((r) => r.json()),
        fetch("/api/meta").then((r) => r.json()),
      ]);
      setBarcos(rb?.barcos ?? []);
      setTipos(rm?.tipos ?? []);
      setPuertos(rm?.puertos ?? []);
    } catch {
      setMensaje("No se pudo cargar los barcos.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  const filtrados = useMemo(() => {
    const q = texto.trim().toLowerCase();
    return barcos.filter((b) => {
      if (q && !`${b.nombre} ${b.slug} ${b.puerto} ${b.tipo} ${b.propietario}`.toLowerCase().includes(q)) {
        return false;
      }
      if (filtroPuerto && b.puertoId !== filtroPuerto) return false;
      if (filtroTipo && b.tipoId !== filtroTipo) return false;
      if (filtroEstado === "pendiente" && b.publicado) return false;
      if (filtroEstado === "publicado" && !b.publicado) return false;
      if (soloInmediata && !b.reservaInstantanea) return false;
      return true;
    });
  }, [barcos, texto, filtroPuerto, filtroTipo, filtroEstado, soloInmediata]);

  function toggleSeleccion(id: string) {
    setSeleccion((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleTodos() {
    const ids = filtrados.map((b) => b.id);
    setSeleccion((prev) => (prev.size === ids.length && ids.length > 0 ? new Set() : new Set(ids)));
  }

  async function cambiarPublicado(b: Barco) {
    await fetch("/api/barcos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: b.id, publicado: !b.publicado }),
    });
    void cargar();
  }

  async function borrar(b: Barco) {
    if (!confirm(`¿Borrar "${b.nombre}"?`)) return;
    await fetch("/api/barcos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: b.id }),
    });
    void cargar();
  }

  async function abrirEdicion(id: string) {
    const res = await fetch(`/api/barcos/${id}`);
    const data = await res.json();
    if (data?.ok) setEditando(data.barco);
  }

  async function accionMasiva(accion: "publicar" | "ocultar" | "borrar") {
    if (accion === "borrar" && !confirm(`¿Borrar ${seleccion.size} barcos?`)) return;
    await fetch("/api/barcos/masivo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [...seleccion], accion }),
    });
    setSeleccion(new Set());
    void cargar();
  }

  async function aplicarTarifa() {
    const body: Record<string, unknown> = { ids: [...seleccion], accion: "tarifa" };
    if (tarifaModo === "fijo") body.precioBaseDia = Number(tarifaValor);
    else body.porcentaje = Number(tarifaValor);
    await fetch("/api/barcos/masivo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSeleccion(new Set());
    setTarifaMasiva(false);
    void cargar();
  }

  async function duplicarBarco() {
    if (!duplicando || !puertoDuplicar) return;
    await fetch(`/api/barcos/${duplicando.id}/duplicar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ puertoId: puertoDuplicar }),
    });
    setDuplicando(null);
    setPuertoDuplicar("");
    void cargar();
  }

  if (editando) {
    return (
      <FormularioEditarBarco
        barco={editando}
        tipos={tipos}
        puertos={puertos}
        onCancelar={() => setEditando(null)}
        onGuardado={() => {
          setEditando(null);
          void cargar();
        }}
      />
    );
  }

  if (detalleId) {
    return (
      <FichaBarco
        barcoId={detalleId}
        onCerrar={() => setDetalleId(null)}
        onEditar={(b) => {
          setEditando(b);
          setDetalleId(null);
        }}
      />
    );
  }

  const pendientes = barcos.filter((b) => !b.publicado).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-texto">
          Barcos <span className="text-sm font-normal text-texto-suave">({barcos.length} · {pendientes} pendientes)</span>
        </h2>
        <button
          onClick={() => void cargar()}
          className="text-sm text-texto-suave underline"
        >
          Recargar
        </button>
      </div>
      {mensaje && <p className="mt-2 text-sm text-texto-suave">{mensaje}</p>}

      {/* Búsqueda y filtros */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Buscar nombre, puerto, tipo…"
          className="rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto lg:col-span-2"
        />
        <select
          value={filtroPuerto}
          onChange={(e) => setFiltroPuerto(e.target.value)}
          className="rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
        >
          <option value="">Todos los puertos</option>
          {puertos.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre} · {p.destino}</option>
          ))}
        </select>
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
        >
          <option value="">Todos los tipos</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>{t.nombre}</option>
          ))}
        </select>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
        >
          <option value="todos">Todos</option>
          <option value="publicado">Publicados</option>
          <option value="pendiente">Pendientes</option>
        </select>
        <label className="flex items-center gap-2 rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto">
          <input
            type="checkbox"
            checked={soloInmediata}
            onChange={(e) => setSoloInmediata(e.target.checked)}
            className="h-4 w-4 accent-[var(--acento)]"
          />
          Solo reserva inmediata
        </label>
      </div>

      {/* Barra de acciones en bloque */}
      {seleccion.size > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-carta border border-borde bg-superficie p-3">
          <span className="text-sm font-medium text-texto">{seleccion.size} seleccionados</span>
          <button onClick={() => void accionMasiva("publicar")} className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white">Publicar</button>
          <button onClick={() => void accionMasiva("ocultar")} className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto-suave">Ocultar</button>
          <button onClick={() => setTarifaMasiva(true)} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white">Cambiar tarifa</button>
          <button onClick={() => void accionMasiva("borrar")} className="rounded-md border border-borde px-3 py-1.5 text-sm text-rose-600">Borrar</button>
        </div>
      )}

      {/* Cambio masivo de tarifa */}
      {tarifaMasiva && (
        <div className="mt-4 rounded-carta border border-borde bg-superficie p-4">
          <p className="text-sm font-semibold text-texto">Cambiar tarifa de {seleccion.size} barcos</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select
              value={tarifaModo}
              onChange={(e) => setTarifaModo(e.target.value as "porcentaje" | "fijo")}
              className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
            >
              <option value="porcentaje">Porcentaje (%)</option>
              <option value="fijo">Precio fijo (€/día)</option>
            </select>
            <input
              type="number"
              value={tarifaValor}
              onChange={(e) => setTarifaValor(e.target.value)}
              className="w-32 rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
            />
            <button onClick={() => void aplicarTarifa()} className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo">Aplicar</button>
            <button onClick={() => setTarifaMasiva(false)} className="rounded-md border border-borde px-4 py-2 text-sm text-texto-suave">Cancelar</button>
          </div>
        </div>
      )}

      {cargando ? (
        <p className="mt-6 text-sm text-texto-suave">Cargando…</p>
      ) : filtrados.length === 0 ? (
        <p className="mt-6 text-sm text-texto-suave">No hay barcos que coincidan.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {filtrados.map((b) => (
            <li
              key={b.id}
              className={`rounded-carta border bg-superficie p-4 transition-colors ${seleccion.has(b.id) ? "border-acento" : "border-borde"}`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="checkbox"
                  checked={seleccion.has(b.id)}
                  onChange={() => toggleSeleccion(b.id)}
                  className="h-4 w-4 accent-[var(--acento)]"
                  aria-label={`Seleccionar ${b.nombre}`}
                />
                <button
                  onClick={() => setDetalleId(b.id)}
                  className="flex-1 text-left"
                >
                  <span className="font-display text-lg font-semibold text-texto hover:underline">
                    {b.nombre}
                  </span>
                  <span className="mt-0.5 block text-sm text-texto-suave">
                    {b.puerto} · {b.tipo} · {eslora(b.esloraCm)} · {b.capacidad} plazas
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="cifra font-display text-xl font-semibold text-acento">
                    {euros(b.precioBaseDia)}
                    <span className="text-xs font-normal text-texto-tenue">/día</span>
                  </span>
                  {b.reservaInstantanea && (
                    <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">Inmediata</span>
                  )}
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${b.publicado ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                    {b.publicado ? "Publicado" : "Pendiente"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setDetalleId(b.id)} className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto">Ver</button>
                  <button onClick={() => void abrirEdicion(b.id)} className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto">Editar</button>
                  <button onClick={() => { setDuplicando(b); setPuertoDuplicar(""); }} className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto-suave">Duplicar</button>
                  <button onClick={() => void cambiarPublicado(b)} className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto-suave">
                    {b.publicado ? "Ocultar" : "Publicar"}
                  </button>
                  <button onClick={() => void borrar(b)} className="rounded-md border border-borde px-3 py-1.5 text-sm text-rose-600">Borrar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {filtrados.length > 0 && (
        <button
          onClick={toggleTodos}
          className="mt-3 text-sm text-texto-suave underline"
        >
          {seleccion.size === filtrados.length ? "Quitar selección" : "Seleccionar todos los visibles"}
        </button>
      )}

      {/* Duplicar */}
      {duplicando && (
        <div className="mt-6 rounded-carta border border-borde bg-superficie p-4">
          <p className="text-sm font-semibold text-texto">Duplicar «{duplicando.nombre}» a otro puerto</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select
              value={puertoDuplicar}
              onChange={(e) => setPuertoDuplicar(e.target.value)}
              className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
            >
              <option value="">Elige puerto…</option>
              {puertos.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre} · {p.destino}</option>
              ))}
            </select>
            <button
              onClick={() => void duplicarBarco()}
              disabled={!puertoDuplicar}
              className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo disabled:opacity-50"
            >
              Duplicar
            </button>
            <button onClick={() => setDuplicando(null)} className="rounded-md border border-borde px-4 py-2 text-sm text-texto-suave">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
