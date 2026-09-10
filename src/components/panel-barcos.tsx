"use client";

import { useCallback, useEffect, useState } from "react";

type Barco = {
  id: string;
  nombre: string;
  slug: string;
  fabricante: string;
  modelo: string;
  anio: number;
  publicado: boolean;
  creadoEn: string;
  tipo: string;
  puerto: string;
  propietario: string;
};

/**
 * Revisión de barcos: los que llegan del formulario de alta entran como
 * pendientes (publicado=false) y aquí se aprueban o rechazan.
 */
export function PanelBarcos() {
  const [barcos, setBarcos] = useState<Barco[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/barcos");
      if (!res.ok) throw new Error("auth");
      const data = await res.json();
      setBarcos(data.barcos ?? []);
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

  async function publicar(id: string, publicado: boolean) {
    const res = await fetch("/api/barcos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, publicado }),
    });
    if (res.ok) void cargar();
  }

  async function borrar(id: string) {
    if (!confirm("¿Borrar este barco?")) return;
    const res = await fetch("/api/barcos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) void cargar();
  }

  const pendientes = barcos.filter((b) => !b.publicado);
  const publicados = barcos.filter((b) => b.publicado);

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-texto">Barcos</h2>
      {mensaje && <p className="mt-2 text-sm text-texto-suave">{mensaje}</p>}

      {cargando ? (
        <p className="mt-6 text-sm text-texto-suave">Cargando…</p>
      ) : (
        <>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-texto-tenue">
            Pendientes de revisión ({pendientes.length})
          </h3>
          {pendientes.length === 0 ? (
            <p className="mt-2 text-sm text-texto-suave">No hay barcos pendientes.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {pendientes.map((b) => (
                <li
                  key={b.id}
                  className="rounded-carta border border-borde bg-superficie p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-lg font-semibold text-texto">
                      {b.nombre}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      Pendiente
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-texto-suave">
                    {b.fabricante} {b.modelo} ({b.anio}) · {b.tipo} · {b.puerto}
                  </p>
                  <p className="mt-1 text-sm text-texto-suave">
                    Armador: {b.propietario}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => void publicar(b.id, true)}
                      className="rounded-md bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => void borrar(b.id)}
                      className="rounded-md bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                    >
                      Rechazar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-texto-tenue">
            Publicados ({publicados.length})
          </h3>
          {publicados.length === 0 ? (
            <p className="mt-2 text-sm text-texto-suave">No hay barcos publicados.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {publicados.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-carta border border-borde bg-superficie p-3"
                >
                  <div>
                    <span className="font-medium text-texto">{b.nombre}</span>
                    <span className="ml-2 text-sm text-texto-suave">{b.puerto}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => void publicar(b.id, false)}
                      className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto-suave"
                    >
                      Ocultar
                    </button>
                    <button
                      onClick={() => void borrar(b.id)}
                      className="rounded-md border border-borde px-3 py-1.5 text-sm text-rose-600"
                    >
                      Borrar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
