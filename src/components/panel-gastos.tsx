"use client";

import { useCallback, useEffect, useState } from "react";

import { CATEGORIAS_GASTO, CONCEPTOS_GASTO } from "@/datos/gastos";

type Gasto = {
  id: string;
  categoria: string;
  concepto: string;
  importeCents: number;
  fecha: string;
  barcoId: string | null;
  barco: string | null;
};

type Resumen = {
  gastosCents: number;
  ingresosCents: number;
  beneficioCents: number;
  porCategoria: Array<{ categoria: string; totalCents: number }>;
};

type Barco = { id: string; nombre: string };

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function fecha(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** Gastos e ingresos del armador: dónde gana y dónde pierde. */
export function PanelGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [barcos, setBarcos] = useState<Barco[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [categoria, setCategoria] = useState<string>(CATEGORIAS_GASTO[0]);
  const [concepto, setConcepto] = useState("");
  const [importe, setImporte] = useState("");
  const [fechaGasto, setFechaGasto] = useState(() => new Date().toISOString().slice(0, 10));
  const [barcoId, setBarcoId] = useState("");

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const [rg, rb] = await Promise.all([
        fetch("/api/gastos").then((r) => r.json()),
        fetch("/api/barcos").then((r) => r.json()),
      ]);
      setGastos(rg?.gastos ?? []);
      setResumen(rg?.resumen ?? null);
      setBarcos(rb?.barcos ?? []);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  async function anadir(e: React.FormEvent) {
    e.preventDefault();
    if (!concepto.trim() || !importe) return;
    const res = await fetch("/api/gastos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoria,
        concepto: concepto.trim(),
        importe: Number(importe),
        fecha: fechaGasto,
        barcoId: barcoId || null,
      }),
    });
    if (!res.ok) {
      setError(
        res.status === 403
          ? "No tienes permiso para añadir gastos: entra con tu cuenta de armador."
          : "No se pudo guardar el gasto. Revisa los campos.",
      );
      return;
    }
    setError("");
    setConcepto("");
    setImporte("");
    void cargar();
  }

  async function borrar(id: string) {
    await fetch("/api/gastos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    void cargar();
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-texto">Gastos e ingresos</h2>

      {resumen && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Ingresos (reservas)</p>
            <p className="mt-1 cifra font-display text-2xl font-semibold text-emerald-600">{euros(resumen.ingresosCents)}</p>
          </div>
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Gastos</p>
            <p className="mt-1 cifra font-display text-2xl font-semibold text-rose-600">{euros(resumen.gastosCents)}</p>
          </div>
          <div className="rounded-carta border border-borde bg-superficie p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Beneficio</p>
            <p className={`mt-1 cifra font-display text-2xl font-semibold ${resumen.beneficioCents >= 0 ? "text-acento" : "text-rose-600"}`}>
              {euros(resumen.beneficioCents)}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={anadir} className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
        >
          {CATEGORIAS_GASTO.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          value={concepto}
          onChange={(e) => setConcepto(e.target.value)}
          placeholder="Concepto"
          list="conceptos-gasto"
          className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
        />
        <datalist id="conceptos-gasto">
          {(CONCEPTOS_GASTO[categoria] ?? []).map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <input
          value={importe}
          onChange={(e) => setImporte(e.target.value)}
          type="number"
          min={0}
          step="0.01"
          placeholder="Importe (€)"
          className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
        />
        <input
          value={fechaGasto}
          onChange={(e) => setFechaGasto(e.target.value)}
          type="date"
          className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
        />
        <select
          value={barcoId}
          onChange={(e) => setBarcoId(e.target.value)}
          className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
        >
          <option value="">Toda la flota</option>
          {barcos.map((b) => (
            <option key={b.id} value={b.id}>{b.nombre}</option>
          ))}
        </select>
        <button type="submit" className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo lg:col-span-5">Añadir gasto</button>
      </form>

      {error && (
        <p role="alert" className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      {resumen && resumen.porCategoria.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-texto">Gasto por categoría</h3>
          <ul className="mt-2 space-y-1">
            {resumen.porCategoria.map((c) => (
              <li key={c.categoria} className="flex items-baseline justify-between gap-3 rounded-md border border-borde bg-superficie px-3 py-2 text-sm">
                <span className="text-texto">{c.categoria}</span>
                <span className="cifra font-medium text-texto-suave">{euros(c.totalCents)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3 className="mt-6 text-sm font-semibold text-texto">Últimos gastos</h3>
      {cargando ? (
        <p className="mt-2 text-sm text-texto-suave">Cargando…</p>
      ) : gastos.length === 0 ? (
        <p className="mt-2 text-sm text-texto-suave">Aún no has registrado gastos.</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {gastos.map((g) => (
            <li key={g.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-borde bg-superficie px-3 py-2 text-sm">
              <div className="min-w-0 flex-1">
                <span className="text-texto">{g.concepto}</span>
                <span className="ml-2 text-xs text-texto-tenue">{g.categoria}{g.barco ? ` · ${g.barco}` : ""} · {fecha(g.fecha)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="cifra font-medium text-texto">{euros(g.importeCents)}</span>
                <button onClick={() => void borrar(g.id)} className="text-xs text-rose-600 underline">borrar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
