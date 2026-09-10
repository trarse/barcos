"use client";

import { useCallback, useEffect, useState } from "react";

import type { BarcoDetalle } from "@/components/formulario-editar-barco";

type Imagen = { id: string; url: string; alt: string; orden: number };
type Reserva = {
  id: string;
  referencia: string;
  fechaInicio: string;
  fechaFin: string;
  numDias: number;
  numPersonas: number;
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono: string | null;
  precioTotalCents: number;
  estado: string;
  pagado: boolean;
};
type Bloque = { id: string; desde: string; hasta: string; motivo: string | null };

type Detalle = {
  barco: BarcoDetalle & {
    slug: string;
    publicado: boolean;
    tipo: string;
    puerto: string;
    propietario: string;
    imagenes: Imagen[];
  };
  estadisticas: { totalReservas: number; pendientes: number; ingresosCents: number };
  reservas: Reserva[];
  bloques: Bloque[];
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

function eslora(cm: number): string {
  return `${(cm / 100).toLocaleString("es-ES", { maximumFractionDigits: 1 })} m`;
}

export function FichaBarco({
  barcoId,
  onCerrar,
  onEditar,
}: {
  barcoId: string;
  onCerrar: () => void;
  onEditar: (barco: BarcoDetalle) => void;
}) {
  const [detalle, setDetalle] = useState<Detalle | null>(null);
  const [reservado, setReservado] = useState<{ desde: string; hasta: string }[]>([]);
  const [cargando, setCargando] = useState(true);

  // Fotos
  const [imgs, setImgs] = useState<{ url: string; alt: string }[]>([]);
  const [msgFotos, setMsgFotos] = useState("");

  // Bloqueos
  const [blDesde, setBlDesde] = useState("");
  const [blHasta, setBlHasta] = useState("");
  const [blMotivo, setBlMotivo] = useState("");
  const [msgBloqueo, setMsgBloqueo] = useState("");

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const [rd, rr] = await Promise.all([
        fetch(`/api/barcos/${barcoId}`).then((r) => r.json()),
        fetch(`/api/barcos/${barcoId}/disponibilidad`).then((r) => r.json()),
      ]);
      if (rd?.ok) {
        setDetalle(rd);
        setImgs(rd.barco.imagenes.map((i: Imagen) => ({ url: i.url, alt: i.alt })));
      }
      if (rr?.ok) setReservado(rr.reservado ?? []);
    } catch {
      // sin conexión
    } finally {
      setCargando(false);
    }
  }, [barcoId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  async function guardarFotos() {
    setMsgFotos("");
    const limpias = imgs.filter((i) => i.url.trim());
    const res = await fetch(`/api/barcos/${barcoId}/imagenes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imagenes: limpias }),
    });
    setMsgFotos(res.ok ? "Fotos guardadas." : "No se pudieron guardar.");
    if (res.ok) void cargar();
  }

  async function anadirBloqueo(e: React.FormEvent) {
    e.preventDefault();
    setMsgBloqueo("");
    const res = await fetch(`/api/barcos/${barcoId}/bloqueos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ desde: blDesde, hasta: blHasta, motivo: blMotivo || undefined }),
    });
    setMsgBloqueo(res.ok ? "Bloqueo añadido." : "Revisa las fechas.");
    if (res.ok) {
      setBlDesde("");
      setBlHasta("");
      setBlMotivo("");
      void cargar();
    }
  }

  async function borrarBloqueo(bloqueoId: string) {
    const res = await fetch(`/api/barcos/${barcoId}/bloqueos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bloqueoId }),
    });
    if (res.ok) void cargar();
  }

  if (cargando || !detalle) {
    return <p className="mt-6 text-sm text-texto-suave">Cargando…</p>;
  }

  const b = detalle.barco;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={onCerrar} className="text-sm text-texto-suave underline">
          ← Barcos
        </button>
        <div className="flex gap-2">
          <a
            href={`/es/barco/${b.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto-suave"
          >
            Ver página pública
          </a>
          <button
            onClick={() => onEditar(b)}
            className="rounded-md bg-marca px-4 py-1.5 text-sm font-semibold text-fondo"
          >
            Editar
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="font-display text-2xl font-semibold text-texto">{b.nombre}</h2>
        <span className="text-sm text-texto-suave">
          {b.fabricante} {b.modelo} ({b.anio})
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${b.publicado ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
          {b.publicado ? "Publicado" : "Pendiente"}
        </span>
        {b.reservaInstantanea && (
          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
            Reserva inmediata
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-texto-suave">
        {b.tipo} · {b.puerto} · {eslora(b.esloraCm)} · {b.capacidad} plazas · Propietario: {b.propietario}
      </p>

      {/* Estadísticas */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Reservas</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-texto">{detalle.estadisticas.totalReservas}</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Pendientes</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-texto">{detalle.estadisticas.pendientes}</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Ingresos confirmados</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-acento">{euros(detalle.estadisticas.ingresosCents)}</p>
        </div>
      </div>

      <div className="mt-4 rounded-carta border border-borde bg-superficie p-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-texto-suave">Precio por día</span>
          <span className="cifra font-display text-xl font-semibold text-texto">{euros(b.precioBaseDia)}</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-texto-tenue">
          Limpieza {euros(b.limpieza)} · Amarre {euros(b.tasaPortuariaDia)}/día · Fianza {euros(b.fianza)}
          {b.patronDia !== null ? ` · Patrón ${euros(b.patronDia)}/día` : ""} · Descuento semana {b.descuentoSemana}%
        </p>
      </div>

      {/* Fotos */}
      <section className="mt-8">
        <h3 className="font-display text-lg font-semibold text-texto">Fotos</h3>
        <ul className="mt-3 space-y-2">
          {imgs.map((img, i) => (
            <li key={i} className="flex gap-2">
              <input
                value={img.url}
                onChange={(e) => setImgs((prev) => prev.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))}
                placeholder="URL de la imagen"
                className="flex-1 rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
              />
              <input
                value={img.alt}
                onChange={(e) => setImgs((prev) => prev.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))}
                placeholder="Texto alternativo"
                className="w-40 rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
              />
              <button
                type="button"
                onClick={() => setImgs((prev) => prev.filter((_, j) => j !== i))}
                className="rounded-md border border-borde px-3 py-2 text-sm text-rose-600"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setImgs((prev) => [...prev, { url: "", alt: "" }])}
            className="rounded-md border border-borde px-4 py-2 text-sm text-texto-suave"
          >
            + Añadir foto
          </button>
          <button
            type="button"
            onClick={() => void guardarFotos()}
            className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo"
          >
            Guardar fotos
          </button>
          {msgFotos && <span className="self-center text-sm text-texto-suave">{msgFotos}</span>}
        </div>
      </section>

      {/* Disponibilidad y bloqueos */}
      <section className="mt-8">
        <h3 className="font-display text-lg font-semibold text-texto">Disponibilidad</h3>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Fechas ya reservadas</p>
            {reservado.length === 0 ? (
              <p className="mt-2 text-sm text-texto-suave">Sin reservas próximas.</p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm text-texto-suave">
                {reservado.map((r, i) => (
                  <li key={i}>{fecha(r.desde)} → {fecha(r.hasta)}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Bloqueos (mantenimiento, cierre…)</p>
            {detalle.bloques.length === 0 ? (
              <p className="mt-2 text-sm text-texto-suave">Sin bloqueos.</p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm">
                {detalle.bloques.map((bl) => (
                  <li key={bl.id} className="flex items-center justify-between gap-2 text-texto-suave">
                    <span>
                      {fecha(bl.desde)} → {fecha(bl.hasta)}
                      {bl.motivo ? ` · ${bl.motivo}` : ""}
                    </span>
                    <button
                      onClick={() => void borrarBloqueo(bl.id)}
                      className="text-xs text-rose-600 underline"
                    >
                      quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <form onSubmit={anadirBloqueo} className="mt-3 grid grid-cols-2 gap-2">
              <input
                type="date"
                value={blDesde}
                onChange={(e) => setBlDesde(e.target.value)}
                required
                className="rounded-md border border-borde bg-fondo px-2 py-1.5 text-sm text-texto"
              />
              <input
                type="date"
                value={blHasta}
                onChange={(e) => setBlHasta(e.target.value)}
                required
                className="rounded-md border border-borde bg-fondo px-2 py-1.5 text-sm text-texto"
              />
              <input
                value={blMotivo}
                onChange={(e) => setBlMotivo(e.target.value)}
                placeholder="Motivo (opcional)"
                className="col-span-2 rounded-md border border-borde bg-fondo px-2 py-1.5 text-sm text-texto"
              />
              <button type="submit" className="col-span-2 rounded-md bg-acento px-3 py-1.5 text-sm font-medium text-white">
                Bloquear fechas
              </button>
              {msgBloqueo && <span className="col-span-2 text-sm text-texto-suave">{msgBloqueo}</span>}
            </form>
          </div>
        </div>
      </section>

      {/* Reservas */}
      <section className="mt-8">
        <h3 className="font-display text-lg font-semibold text-texto">Últimas reservas</h3>
        {detalle.reservas.length === 0 ? (
          <p className="mt-2 text-sm text-texto-suave">Este barco aún no tiene reservas.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {detalle.reservas.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-carta border border-borde bg-superficie p-3">
                <div>
                  <span className="font-mono text-sm font-semibold text-texto-suave">{r.referencia}</span>
                  <span className="ml-2 text-sm text-texto">{r.clienteNombre}</span>
                  <span className="ml-2 text-sm text-texto-suave">
                    {fecha(r.fechaInicio)} → {fecha(r.fechaFin)} · {r.numDias} días
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {r.pagado && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Pagado</span>
                  )}
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{ETIQUETA[r.estado] ?? r.estado}</span>
                  <span className="cifra font-medium text-texto">{euros(r.precioTotalCents)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
