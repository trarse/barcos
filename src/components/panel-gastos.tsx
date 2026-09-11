"use client";

import { useCallback, useEffect, useState } from "react";

import {
  CATEGORIAS_GASTO,
  CONCEPTOS_GASTO,
  ETIQUETA_VENCIMIENTO,
  TIPOS_VENCIMIENTO,
} from "@/datos/gastos";

type Gasto = {
  id: string;
  categoria: string;
  concepto: string;
  importeCents: number;
  factura: string | null;
  notas: string | null;
  fecha: string;
  barcoId: string | null;
  barco: string | null;
};

type Vencimiento = {
  id: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  barcoId: string | null;
  barco: string | null;
};

type Salida = {
  referencia: string;
  barco: string;
  fechaInicio: string;
  clienteNombre: string;
  estado: string;
};

type Mes = {
  mes: string;
  etiqueta: string;
  ingresosCents: number;
  gastosCents: number;
};

type Resumen = {
  gastosCents: number;
  ingresosCents: number;
  beneficioCents: number;
  porCategoria: Array<{ categoria: string; totalCents: number }>;
};

type Barco = { id: string; nombre: string };

type Aviso = { tipo: "ok" | "error"; mensaje: string };

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function fecha(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Días que faltan hasta una fecha (negativo si ya pasó). */
function diasHasta(iso: string): number {
  return Math.ceil((new Date(`${iso}T00:00:00`).getTime() - Date.now()) / 86_400_000);
}

function colorVencimiento(dias: number): string {
  if (dias < 0) return "text-rose-600";
  if (dias <= 30) return "text-rose-600";
  if (dias <= 60) return "text-amber-600";
  return "text-emerald-600";
}

/** Cuadro de mando del armador: tesorería, gráfico, vencimientos y salidas. */
export function PanelGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [mensual, setMensual] = useState<Mes[]>([]);
  const [vencimientos, setVencimientos] = useState<Vencimiento[]>([]);
  const [salidas, setSalidas] = useState<Salida[]>([]);
  const [barcos, setBarcos] = useState<Barco[]>([]);
  const [cargando, setCargando] = useState(false);
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [guardandoGasto, setGuardandoGasto] = useState(false);
  const [guardandoVencimiento, setGuardandoVencimiento] = useState(false);

  // Alta de gasto.
  const [categoria, setCategoria] = useState<string>(CATEGORIAS_GASTO[0]);
  const [concepto, setConcepto] = useState("");
  const [importe, setImporte] = useState("");
  const [fechaGasto, setFechaGasto] = useState(hoyISO());
  const [barcoId, setBarcoId] = useState("");
  const [factura, setFactura] = useState("");
  const [notas, setNotas] = useState("");

  // Alta de vencimiento.
  const [tipoV, setTipoV] = useState(TIPOS_VENCIMIENTO[0].clave);
  const [descV, setDescV] = useState("");
  const [fechaV, setFechaV] = useState(hoyISO());
  const [barcoIdV, setBarcoIdV] = useState("");

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const [rg, rb] = await Promise.all([
        fetch("/api/gastos").then((r) => r.json()),
        fetch("/api/barcos").then((r) => r.json()),
      ]);
      setGastos(rg?.gastos ?? []);
      setResumen(rg?.resumen ?? null);
      setMensual(rg?.mensual ?? []);
      setVencimientos(rg?.vencimientos ?? []);
      setSalidas(rg?.proximasSalidas ?? []);
      setBarcos(rb?.barcos ?? []);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  async function anadirGasto(e: React.FormEvent) {
    e.preventDefault();
    if (!concepto.trim() || !importe) {
      setAviso({ tipo: "error", mensaje: "Rellena al menos el concepto y el importe." });
      return;
    }
    setGuardandoGasto(true);
    setAviso(null);
    try {
      const res = await fetch("/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoria,
          concepto: concepto.trim(),
          importe: Number(importe),
          fecha: fechaGasto,
          barcoId: barcoId || null,
          factura: factura.trim() || null,
          notas: notas.trim() || null,
        }),
      });
      if (!res.ok) {
        setAviso({ tipo: "error", mensaje: "No se pudo guardar el gasto. Revisa los campos." });
        return;
      }
      setAviso({ tipo: "ok", mensaje: "Gasto añadido correctamente." });
      setConcepto("");
      setImporte("");
      setFactura("");
      setNotas("");
      void cargar();
    } finally {
      setGuardandoGasto(false);
    }
  }

  async function borrarGasto(id: string) {
    await fetch("/api/gastos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    void cargar();
  }

  async function anadirVencimiento(e: React.FormEvent) {
    e.preventDefault();
    if (!descV.trim()) {
      setAviso({ tipo: "error", mensaje: "Escribe una descripción para el vencimiento." });
      return;
    }
    setGuardandoVencimiento(true);
    setAviso(null);
    try {
      const res = await fetch("/api/vencimientos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: tipoV,
          descripcion: descV.trim(),
          fecha: fechaV,
          barcoId: barcoIdV || null,
        }),
      });
      if (!res.ok) {
        setAviso({ tipo: "error", mensaje: "No se pudo guardar el vencimiento." });
        return;
      }
      setAviso({ tipo: "ok", mensaje: "Vencimiento añadido correctamente." });
      setDescV("");
      void cargar();
    } finally {
      setGuardandoVencimiento(false);
    }
  }

  async function borrarVencimiento(id: string) {
    await fetch("/api/vencimientos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    void cargar();
  }

  const maxMensual = Math.max(
    1,
    ...mensual.flatMap((m) => [m.ingresosCents, m.gastosCents]),
  );

  const vencimientosOrdenados = [...vencimientos].sort((a, b) => a.fecha.localeCompare(b.fecha));

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-texto">Gastos e ingresos</h2>

      {/* Aviso de éxito o error */}
      {aviso && (
        <div
          role="status"
          className={`mt-4 flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${
            aviso.tipo === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-700"
          }`}
        >
          <span>{aviso.mensaje}</span>
          <button type="button" onClick={() => setAviso(null)} className="text-xs underline" aria-label="Cerrar aviso">
            cerrar
          </button>
        </div>
      )}

      {/* Resumen */}
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

      {/* Gráfico por mes */}
      {mensual.length > 0 && (
        <div className="mt-4 rounded-carta border border-borde bg-superficie p-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold text-texto">Últimos 12 meses</h3>
            <div className="flex items-center gap-4 text-xs text-texto-suave">
              <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Ingresos</span>
              <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-rose-500" /> Gastos</span>
            </div>
          </div>
          <div className="mt-4 flex items-end gap-1 sm:gap-2">
            {mensual.map((m) => (
              <div key={m.mes} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full items-end justify-center gap-0.5" style={{ height: "140px" }}>
                  <div
                    className="w-1/3 max-w-3 rounded-t bg-emerald-500"
                    style={{ height: `${Math.max(0, (m.ingresosCents / maxMensual) * 140)}px` }}
                    title={`${m.etiqueta}: ingresos ${euros(m.ingresosCents)}`}
                  />
                  <div
                    className="w-1/3 max-w-3 rounded-t bg-rose-500"
                    style={{ height: `${Math.max(0, (m.gastosCents / maxMensual) * 140)}px` }}
                    title={`${m.etiqueta}: gastos ${euros(m.gastosCents)}`}
                  />
                </div>
                <span className="text-[10px] text-texto-tenue">{m.etiqueta}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vencimientos y próximas salidas */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <h3 className="text-sm font-semibold text-texto">Vencimientos</h3>
          <form onSubmit={anadirVencimiento} className="mt-3 grid gap-2 sm:grid-cols-2">
            <select value={tipoV} onChange={(e) => setTipoV(e.target.value)} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Tipo de vencimiento">
              {TIPOS_VENCIMIENTO.map((t) => (
                <option key={t.clave} value={t.clave}>{t.etiqueta}</option>
              ))}
            </select>
            <input value={fechaV} onChange={(e) => setFechaV(e.target.value)} type="date" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Fecha de vencimiento" />
            <input value={descV} onChange={(e) => setDescV(e.target.value)} placeholder="Descripción (p. ej. póliza del Zodiac)" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto sm:col-span-2" aria-label="Descripción del vencimiento" />
            <select value={barcoIdV} onChange={(e) => setBarcoIdV(e.target.value)} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Barco">
              <option value="">Toda la flota</option>
              {barcos.map((b) => <option key={b.id} value={b.id}>{b.nombre}</option>)}
            </select>
            <button type="submit" disabled={guardandoVencimiento} className="rounded-md bg-marca px-3 py-2 text-sm font-semibold text-fondo disabled:opacity-60">
              {guardandoVencimiento ? "Guardando…" : "Añadir vencimiento"}
            </button>
          </form>

          {vencimientosOrdenados.length === 0 ? (
            <p className="mt-3 text-sm text-texto-suave">No hay vencimientos registrados.</p>
          ) : (
            <ul className="mt-3 space-y-1.5">
              {vencimientosOrdenados.map((v) => {
                const d = diasHasta(v.fecha);
                return (
                  <li key={v.id} className="flex items-center justify-between gap-3 rounded-md border border-borde bg-superficie-alt px-3 py-2 text-sm">
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-texto">{ETIQUETA_VENCIMIENTO[v.tipo] ?? v.tipo}</span>
                      <span className="ml-2 text-xs text-texto-suave">{v.descripcion}{v.barco ? ` · ${v.barco}` : ""}</span>
                      <span className="ml-2 text-xs text-texto-tenue">· {fecha(v.fecha)}</span>
                    </div>
                    <span className={`shrink-0 text-xs font-semibold ${colorVencimiento(d)}`}>
                      {d < 0 ? "vencido" : d === 0 ? "hoy" : `${d} días`}
                    </span>
                    <button onClick={() => void borrarVencimiento(v.id)} className="shrink-0 text-xs text-rose-600 underline">borrar</button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-carta border border-borde bg-superficie p-4">
          <h3 className="text-sm font-semibold text-texto">Próximas salidas</h3>
          {salidas.length === 0 ? (
            <p className="mt-3 text-sm text-texto-suave">No hay salidas confirmadas próximamente.</p>
          ) : (
            <ul className="mt-3 space-y-1.5">
              {salidas.map((s) => (
                <li key={s.referencia} className="rounded-md border border-borde bg-superficie-alt px-3 py-2 text-sm">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium text-texto">{s.barco}</span>
                    <span className="shrink-0 text-xs font-semibold text-acento">{fecha(s.fechaInicio)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-texto-suave">
                    {s.clienteNombre} · {s.estado === "confirmada" ? "confirmada" : "pendiente de confirmar"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Alta de gasto */}
      <form onSubmit={anadirGasto} className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Categoría">
          {CATEGORIAS_GASTO.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={concepto} onChange={(e) => setConcepto(e.target.value)} placeholder="Concepto *" list="conceptos-gasto" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Concepto" />
        <datalist id="conceptos-gasto">
          {(CONCEPTOS_GASTO[categoria] ?? []).map((c) => <option key={c} value={c} />)}
        </datalist>
        <input value={importe} onChange={(e) => setImporte(e.target.value)} type="number" min={0} step="0.01" placeholder="Importe (€) *" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Importe en euros" />
        <input value={fechaGasto} onChange={(e) => setFechaGasto(e.target.value)} type="date" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Fecha" />
        <input value={factura} onChange={(e) => setFactura(e.target.value)} placeholder="Nº factura" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Número de factura" />
        <select value={barcoId} onChange={(e) => setBarcoId(e.target.value)} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Barco">
          <option value="">Toda la flota</option>
          {barcos.map((b) => <option key={b.id} value={b.id}>{b.nombre}</option>)}
        </select>
        <input value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Observaciones" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto sm:col-span-2 lg:col-span-5" aria-label="Observaciones" />
        <button type="submit" disabled={guardandoGasto} className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo disabled:opacity-60 lg:col-span-1">
          {guardandoGasto ? "Guardando…" : "Añadir gasto"}
        </button>
      </form>

      {/* Listado de gastos */}
      <h3 className="mt-6 text-sm font-semibold text-texto">Últimos gastos</h3>
      {cargando ? (
        <p className="mt-2 text-sm text-texto-suave">Cargando…</p>
      ) : gastos.length === 0 ? (
        <p className="mt-2 text-sm text-texto-suave">Aún no has registrado gastos.</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {gastos.map((g) => (
            <li key={g.id} className="rounded-md border border-borde bg-superficie px-3 py-2 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className="text-texto">{g.concepto}</span>
                  <span className="ml-2 text-xs text-texto-tenue">{g.categoria}{g.barco ? ` · ${g.barco}` : ""} · {fecha(g.fecha)}</span>
                  {g.factura && <span className="ml-2 text-xs text-texto-suave">Factura {g.factura}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="cifra font-medium text-texto">{euros(g.importeCents)}</span>
                  <button onClick={() => void borrarGasto(g.id)} className="text-xs text-rose-600 underline">borrar</button>
                </div>
              </div>
              {g.notas && <p className="mt-1 text-xs text-texto-suave">{g.notas}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
