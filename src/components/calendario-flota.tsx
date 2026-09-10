"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Evento = {
  desde: string;
  hasta: string;
  tipo: string;
  referencia?: string;
  motivo?: string | null;
};
type BarcoCal = { id: string; nombre: string; puerto: string; eventos: Evento[] };

function iso(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dia}`;
}

/**
 * Calendario mensual de la flota: una fila por barco y una columna por día,
 * con celdas de color según el estado (libre, reservado, bloqueado).
 */
export function CalendarioFlota({
  onAbrirBarco,
}: {
  onAbrirBarco?: (id: string) => void;
}) {
  const [mes, setMes] = useState(() => new Date());
  const [barcos, setBarcos] = useState<BarcoCal[]>([]);
  const [cargando, setCargando] = useState(false);

  const desde = useMemo(
    () => iso(new Date(mes.getFullYear(), mes.getMonth(), 1)),
    [mes],
  );
  const hasta = useMemo(
    () => iso(new Date(mes.getFullYear(), mes.getMonth() + 1, 0)),
    [mes],
  );

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch(`/api/calendario?desde=${desde}&hasta=${hasta}`);
      const data = await res.json();
      setBarcos(data?.barcos ?? []);
    } catch {
      // sin conexión
    } finally {
      setCargando(false);
    }
  }, [desde, hasta]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  const dias = useMemo(() => {
    const total = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [mes]);

  function estadoDe(b: BarcoCal, dia: number): "libre" | "reserva" | "bloqueo" {
    const fecha = iso(new Date(mes.getFullYear(), mes.getMonth(), dia));
    for (const e of b.eventos) {
      if (fecha >= e.desde && fecha < e.hasta) {
        return e.tipo === "bloqueo" ? "bloqueo" : "reserva";
      }
    }
    return "libre";
  }

  function tituloDe(b: BarcoCal, dia: number): string {
    const fecha = iso(new Date(mes.getFullYear(), mes.getMonth(), dia));
    for (const e of b.eventos) {
      if (fecha >= e.desde && fecha < e.hasta) {
        return e.tipo === "bloqueo"
          ? `Bloqueado${e.motivo ? ` · ${e.motivo}` : ""}`
          : `Reserva ${e.referencia ?? ""}`;
      }
    }
    return "Libre";
  }

  const etiquetaMes = mes.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-texto">Calendario</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))}
            className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto-suave"
          >
            ←
          </button>
          <span className="w-40 text-center text-sm font-medium capitalize text-texto">
            {etiquetaMes}
          </span>
          <button
            onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))}
            className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto-suave"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-texto-suave">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-emerald-200" /> Libre
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-amber-400" /> Reservado
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-slate-400" /> Bloqueado
        </span>
      </div>

      {cargando ? (
        <p className="mt-6 text-sm text-texto-suave">Cargando…</p>
      ) : barcos.length === 0 ? (
        <p className="mt-6 text-sm text-texto-suave">No hay barcos para este mes.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="border-collapse text-xs">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 min-w-44 bg-superficie p-2 text-left font-semibold text-texto">
                  Barco
                </th>
                {dias.map((d) => (
                  <th key={d} className="w-7 p-1 text-center font-medium text-texto-tenue">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {barcos.map((b) => (
                <tr key={b.id}>
                  <td className="sticky left-0 z-10 bg-superficie p-2">
                    <button
                      type="button"
                      onClick={() => onAbrirBarco?.(b.id)}
                      className="block max-w-40 truncate text-left hover:underline"
                      title={`${b.nombre} · ${b.puerto}`}
                    >
                      <span className="block font-medium text-texto">{b.nombre}</span>
                      <span className="block text-[10px] text-texto-tenue">{b.puerto}</span>
                    </button>
                  </td>
                  {dias.map((d) => {
                    const est = estadoDe(b, d);
                    const color =
                      est === "libre"
                        ? "bg-emerald-200"
                        : est === "reserva"
                          ? "bg-amber-400"
                          : "bg-slate-400";
                    return (
                      <td key={d} className="p-0.5">
                        <div className={`h-4 w-6 rounded-sm ${color}`} title={tituloDe(b, d)} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
