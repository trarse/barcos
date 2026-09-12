"use client";

import { useCallback, useEffect, useState } from "react";

import {
  CATEGORIAS_GASTO,
  CONCEPTOS_GASTO,
  ETIQUETA_VENCIMIENTO,
  TIPOS_VENCIMIENTO,
} from "@/datos/gastos";

import { ComparativaProvincial } from "@/components/comparativa-provincial";

type Gasto = {
  id: string;
  categoria: string;
  concepto: string;
  importeCents: number;
  iva: number;
  deducible: boolean;
  factura: string | null;
  notas: string | null;
  fecha: string;
  barcoId: string | null;
  barco: string | null;
};

type RentabilidadBarco = {
  barcoId: string;
  barco: string;
  ingresosCents: number;
  gastosCents: number;
  beneficioCents: number;
  beneficioTotalCents: number;
  precioAdquisicionCents: number | null;
};

type Vencimiento = {
  id: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  horas: number | null;
  horasActuales: number | null;
  importeCents: number | null;
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

type FlujoMes = {
  mes: string;
  etiqueta: string;
  ingresosCents: number;
  gastosCents: number;
  saldoCents: number;
};

type ResumenIva = {
  totalDeducibleCents: number;
  totalNoDeducibleCents: number;
  totalIvaCents: number;
};

type Barco = { id: string; nombre: string };
type Aviso = { tipo: "ok" | "error"; mensaje: string };
type Orden = { campo: string; dir: "asc" | "desc" };

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function fecha(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function diasHasta(iso: string): number {
  return Math.ceil((new Date(`${iso}T00:00:00`).getTime() - Date.now()) / 86_400_000);
}

function colorVencimiento(dias: number): string {
  if (dias < 0) return "text-rose-600";
  if (dias <= 30) return "text-rose-600";
  if (dias <= 60) return "text-amber-600";
  return "text-emerald-600";
}

type Plazo = "rojo" | "ambar" | "verde";

function colorPlazo(dias: number): Plazo {
  if (dias < 0 || dias <= 30) return "rojo";
  if (dias <= 60) return "ambar";
  return "verde";
}

const PASOS_TOUR = [
  { titulo: "Panel de gastos e ingresos", texto: "Aquí controlas el dinero de tu flota: ingresos, gastos y mantenimientos." },
  { titulo: "Añadir gasto", texto: "Pulsa para registrar una factura o gasto." },
  { titulo: "Rellenar el gasto", texto: "Concepto, importe, IVA y si es deducible." },
  { titulo: "Guardar gasto", texto: "Se guarda y queda registrado." },
  { titulo: "Tabla de gastos", texto: "El gasto aparece aquí al momento." },
  { titulo: "Añadir mantenimiento", texto: "Aquí se programan vencimientos: seguro, motor, bengalas…" },
  { titulo: "Rellenar el mantenimiento", texto: "Tipo, fecha, horas de motor e importe." },
  { titulo: "Guardar mantenimiento", texto: "Se guarda y queda en el calendario de vencimientos." },
  { titulo: "Tabla de vencimientos", texto: "Aquí ves los mantenimientos y su urgencia por colores." },
  { titulo: "Recuperación de la inversión", texto: "Y aquí cuánto te falta por recuperar de cada barco." },
];

/** Cuadro de mando del armador. */
export function PanelGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [mensual, setMensual] = useState<Mes[]>([]);
  const [vencimientos, setVencimientos] = useState<Vencimiento[]>([]);
  const [salidas, setSalidas] = useState<Salida[]>([]);
  const [barcos, setBarcos] = useState<Barco[]>([]);
  const [rentabilidad, setRentabilidad] = useState<RentabilidadBarco[]>([]);
  const [flujoCaja, setFlujoCaja] = useState<FlujoMes[]>([]);
  const [resumenIva, setResumenIva] = useState<ResumenIva | null>(null);
  const [cargando, setCargando] = useState(false);
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [guardandoGasto, setGuardandoGasto] = useState(false);
  const [guardandoVencimiento, setGuardandoVencimiento] = useState(false);
  const [filtroPlazos, setFiltroPlazos] = useState<Plazo[]>(["rojo", "ambar", "verde"]);
  const [abrirGasto, setAbrirGasto] = useState(false);
  const [abrirVencimiento, setAbrirVencimiento] = useState(false);
  const [tour, setTour] = useState<number | null>(null);
  const [ordenGastos, setOrdenGastos] = useState<Orden>({ campo: "fecha", dir: "desc" });
  const [ordenVencimientos, setOrdenVencimientos] = useState<Orden>({ campo: "fecha", dir: "asc" });
  const [busquedaGastos, setBusquedaGastos] = useState("");
  const [busquedaVencimientos, setBusquedaVencimientos] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  // Alta de gasto.
  const [categoria, setCategoria] = useState<string>(CATEGORIAS_GASTO[0]);
  const [concepto, setConcepto] = useState("");
  const [importe, setImporte] = useState("");
  const [fechaGasto, setFechaGasto] = useState(hoyISO());
  const [barcoId, setBarcoId] = useState("");
  const [factura, setFactura] = useState("");
  const [notas, setNotas] = useState("");
  const [iva, setIva] = useState(21);
  const [deducible, setDeducible] = useState(true);
  const [filtroBarco, setFiltroBarco] = useState("");

  // Alta de vencimiento.
  const [tipoV, setTipoV] = useState(TIPOS_VENCIMIENTO[0].clave);
  const [descV, setDescV] = useState("");
  const [fechaV, setFechaV] = useState(hoyISO());
  const [barcoIdV, setBarcoIdV] = useState("");
  const [horasV, setHorasV] = useState("");
  const [horasActualesV, setHorasActualesV] = useState("");
  const [importeV, setImporteV] = useState("");

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const params = new URLSearchParams();
      if (filtroBarco) params.set("barcoId", filtroBarco);
      if (desde) params.set("desde", desde);
      if (hasta) params.set("hasta", hasta);
      const qs = params.toString();
      const [rg, rb] = await Promise.all([
        fetch(`/api/gastos${qs ? `?${qs}` : ""}`).then((r) => r.json()),
        fetch("/api/barcos").then((r) => r.json()),
      ]);
      setGastos(rg?.gastos ?? []);
      setResumen(rg?.resumen ?? null);
      setMensual(rg?.mensual ?? []);
      setVencimientos(rg?.vencimientos ?? []);
      setSalidas(rg?.proximasSalidas ?? []);
      setBarcos(rb?.barcos ?? []);
      setRentabilidad(rg?.rentabilidadPorBarco ?? []);
      setFlujoCaja(rg?.flujoCaja ?? []);
      setResumenIva(rg?.resumenIva ?? null);
    } finally {
      setCargando(false);
    }
  }, [filtroBarco, desde, hasta]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  async function guardarGasto() {
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
          iva,
          deducible,
        }),
      });
      if (!res.ok) {
        setAviso({ tipo: "error", mensaje: "No se pudo guardar el gasto." });
        return;
      }
      setAviso({ tipo: "ok", mensaje: "Gasto añadido correctamente." });
      setConcepto("");
      setImporte("");
      setFactura("");
      setNotas("");
      setAbrirGasto(false);
      await cargar();
    } finally {
      setGuardandoGasto(false);
    }
  }

  function anadirGasto(e: React.FormEvent) {
    e.preventDefault();
    void guardarGasto();
  }

  async function borrarGasto(id: string) {
    if (!window.confirm("¿Seguro que quieres borrar este gasto?")) return;
    await fetch("/api/gastos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    void cargar();
  }

  async function guardarVencimiento() {
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
          horas: horasV ? Number(horasV) : null,
          horasActuales: horasActualesV ? Number(horasActualesV) : null,
          importe: importeV ? Number(importeV) : null,
          barcoId: barcoIdV || null,
        }),
      });
      if (!res.ok) {
        setAviso({ tipo: "error", mensaje: "No se pudo guardar el vencimiento." });
        return;
      }
      setAviso({ tipo: "ok", mensaje: "Vencimiento añadido correctamente." });
      setDescV("");
      setImporteV("");
      setAbrirVencimiento(false);
      await cargar();
    } finally {
      setGuardandoVencimiento(false);
    }
  }

  function anadirVencimiento(e: React.FormEvent) {
    e.preventDefault();
    void guardarVencimiento();
  }

  async function borrarVencimiento(id: string) {
    if (!window.confirm("¿Seguro que quieres borrar este vencimiento?")) return;
    await fetch("/api/vencimientos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    void cargar();
  }

  function alternarPlazo(c: Plazo) {
    setFiltroPlazos((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function resalta(paso: number): string {
    return tour === paso ? "ring-2 ring-acento" : "";
  }

  function compararGastos(a: Gasto, b: Gasto): number {
    const factor = ordenGastos.dir === "asc" ? 1 : -1;
    if (ordenGastos.campo === "concepto") return a.concepto.localeCompare(b.concepto, "es") * factor;
    if (ordenGastos.campo === "categoria") return a.categoria.localeCompare(b.categoria, "es") * factor;
    if (ordenGastos.campo === "barco") return (a.barco ?? "").localeCompare(b.barco ?? "", "es") * factor;
    if (ordenGastos.campo === "factura") return (a.factura ?? "").localeCompare(b.factura ?? "", "es") * factor;
    if (ordenGastos.campo === "importe") return (a.importeCents - b.importeCents) * factor;
    return (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0) * factor;
  }

  function compararVencimientos(a: Vencimiento, b: Vencimiento): number {
    const factor = ordenVencimientos.dir === "asc" ? 1 : -1;
    if (ordenVencimientos.campo === "tipo") {
      const ta = ETIQUETA_VENCIMIENTO[a.tipo] ?? a.tipo;
      const tb = ETIQUETA_VENCIMIENTO[b.tipo] ?? b.tipo;
      return ta.localeCompare(tb, "es") * factor;
    }
    if (ordenVencimientos.campo === "importe") return ((a.importeCents ?? 0) - (b.importeCents ?? 0)) * factor;
    if (ordenVencimientos.campo === "plazo") return (diasHasta(a.fecha) - diasHasta(b.fecha)) * factor;
    return (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0) * factor;
  }

  function irA(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function aplicarPreset(tipo: "todo" | "30d" | "anio" | "12m") {
    const ahora = new Date();
    const fin = ahora.toISOString().slice(0, 10);
    if (tipo === "todo") {
      setDesde("");
      setHasta("");
      return;
    }
    const ini = new Date(ahora);
    if (tipo === "30d") ini.setDate(ini.getDate() - 30);
    else if (tipo === "anio") {
      ini.setMonth(0);
      ini.setDate(1);
    } else if (tipo === "12m") ini.setMonth(ini.getMonth() - 12);
    setDesde(ini.toISOString().slice(0, 10));
    setHasta(fin);
  }

  function thOrden(etiqueta: string, campo: string, orden: Orden, setOrden: React.Dispatch<React.SetStateAction<Orden>>, alineacion = "text-left") {
    const activa = orden.campo === campo;
    return (
      <th className={`px-3 py-2.5 ${alineacion}`}>
        <button
          type="button"
          onClick={() => setOrden((prev) => ({ campo, dir: prev.campo === campo ? (prev.dir === "asc" ? "desc" : "asc") : "asc" }))}
          className={`inline-flex items-center gap-1 font-semibold ${activa ? "text-acento" : ""}`}
          title={`Ordenar por ${etiqueta}`}
        >
          {etiqueta}
          <span className="text-[9px]">{activa ? (orden.dir === "asc" ? "▲" : "▼") : ""}</span>
        </button>
      </th>
    );
  }

  useEffect(() => {
    if (tour === null) return;
    let cancelado = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function ejecutar() {
      if (tour === 1) setAbrirGasto(true);
      if (tour === 2) {
        setCategoria("Motor y propulsión");
        setConcepto("Cambio de aceite y filtros");
        setImporte("460");
        setIva(21);
        setDeducible(true);
        setBarcoId("");
        setFactura("F-TOUR-001");
        setNotas("");
        setFechaGasto(hoyISO());
      }
      if (tour === 3) await guardarGasto();
      if (tour === 5) setAbrirVencimiento(true);
      if (tour === 6) {
        const en30 = new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10);
        setTipoV("motor");
        setDescV("Revisión de motor (tour)");
        setFechaV(en30);
        setHorasActualesV("500");
        setHorasV("750");
        setImporteV("480");
        setBarcoIdV("");
      }
      if (tour === 7) await guardarVencimiento();

      if (cancelado) return;
      timer = setTimeout(() => {
        if (!cancelado) setTour((t) => (t === null ? null : t + 1 >= PASOS_TOUR.length ? null : t + 1));
      }, 3400);
    }

    void ejecutar();
    return () => {
      cancelado = true;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour]);

  const maxMensual = Math.max(1, ...mensual.flatMap((m) => [m.ingresosCents, m.gastosCents]));
  const vencimientosOrdenados = [...vencimientos].sort(compararVencimientos);
  const vencimientosFiltrados = vencimientosOrdenados.filter((v) => {
    if (!filtroPlazos.includes(colorPlazo(diasHasta(v.fecha)))) return false;
    const q = busquedaVencimientos.trim().toLowerCase();
    if (!q) return true;
    return (
      (ETIQUETA_VENCIMIENTO[v.tipo] ?? v.tipo).toLowerCase().includes(q) ||
      v.descripcion.toLowerCase().includes(q) ||
      (v.barco ?? "").toLowerCase().includes(q)
    );
  });
  const margen = resumen && resumen.ingresosCents > 0 ? (resumen.beneficioCents / resumen.ingresosCents) * 100 : 0;
  const gastosFiltrados = gastos
    .filter((g) => {
      const q = busquedaGastos.trim().toLowerCase();
      if (!q) return true;
      return (
        g.concepto.toLowerCase().includes(q) ||
        g.categoria.toLowerCase().includes(q) ||
        (g.barco ?? "").toLowerCase().includes(q) ||
        (g.factura ?? "").toLowerCase().includes(q)
      );
    })
    .sort(compararGastos);
  const totalFiltrado = gastosFiltrados.reduce((sum, g) => sum + g.importeCents, 0);
  const barcoSeleccionado = barcos.find((b) => b.id === filtroBarco)?.nombre ?? null;

  const recuperacion = rentabilidad
    .filter((r) => r.precioAdquisicionCents != null && r.precioAdquisicionCents > 0)
    .map((r) => {
      const precio = r.precioAdquisicionCents ?? 0;
      const ganado = r.beneficioTotalCents;
      return { barcoId: r.barcoId, barco: r.barco, precio, ganado, falta: precio - ganado, pct: precio > 0 ? (ganado / precio) * 100 : 0 };
    })
    .sort((a, b) => b.falta - a.falta);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-texto">Gastos e ingresos</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="filtro-barco-global" className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Barco</label>
          <select id="filtro-barco-global" value={filtroBarco} onChange={(e) => setFiltroBarco(e.target.value)} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Filtrar todo el panel por barco">
            <option value="">Toda la flota</option>
            {barcos.map((b) => <option key={b.id} value={b.id}>{b.nombre}</option>)}
          </select>
          <button
            type="button"
            onClick={() => setTour(0)}
            className="rounded-md border border-borde px-3 py-2 text-xs font-semibold text-texto-suave transition-colors hover:text-acento"
          >
            Recorrido guiado
          </button>
        </div>
      </div>

      <div className="sticky top-0 z-30 flex flex-wrap items-center gap-1.5 rounded-carta border border-borde bg-superficie px-3 py-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-texto-tenue">Ir a</span>
        <button type="button" onClick={() => irA("tabla-gastos")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave transition-colors hover:border-acento hover:text-acento">Gastos</button>
        <button type="button" onClick={() => irA("tabla-vencimientos")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave transition-colors hover:border-acento hover:text-acento">Vencimientos</button>
        <button type="button" onClick={() => irA("tabla-rentabilidad")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave transition-colors hover:border-acento hover:text-acento">Rentabilidad</button>
        <button type="button" onClick={() => irA("tabla-recuperacion")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave transition-colors hover:border-acento hover:text-acento">Recuperación</button>
        <button type="button" onClick={() => irA("tabla-tesoreria")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave transition-colors hover:border-acento hover:text-acento">Tesorería</button>
        <button type="button" onClick={() => irA("tabla-iva")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave transition-colors hover:border-acento hover:text-acento">IVA</button>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-carta border border-borde bg-superficie px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Periodo</span>
        <label className="flex items-center gap-1.5 text-xs text-texto-suave">
          Desde
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} className="rounded-md border border-borde bg-fondo px-2 py-1.5 text-xs text-texto" />
        </label>
        <label className="flex items-center gap-1.5 text-xs text-texto-suave">
          Hasta
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} className="rounded-md border border-borde bg-fondo px-2 py-1.5 text-xs text-texto" />
        </label>
        <button type="button" onClick={() => aplicarPreset("todo")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave hover:border-acento hover:text-acento">Todo</button>
        <button type="button" onClick={() => aplicarPreset("30d")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave hover:border-acento hover:text-acento">30 días</button>
        <button type="button" onClick={() => aplicarPreset("anio")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave hover:border-acento hover:text-acento">Este año</button>
        <button type="button" onClick={() => aplicarPreset("12m")} className="rounded-full border border-borde px-2.5 py-1 text-xs font-medium text-texto-suave hover:border-acento hover:text-acento">12 meses</button>
      </div>

      {aviso && (
        <div
          role="status"
          className={`flex items-center justify-between gap-3 rounded-carta px-4 py-2.5 text-sm font-medium ${
            aviso.tipo === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-700"
          }`}
        >
          <span>{aviso.mensaje}</span>
          <button type="button" onClick={() => setAviso(null)} className="text-xs underline" aria-label="Cerrar aviso">cerrar</button>
        </div>
      )}

      {barcoSeleccionado && (
        <div className="flex items-center justify-between gap-3 rounded-carta border border-acento/30 bg-superficie px-4 py-2.5 text-sm">
          <p className="text-texto">
            Mostrando datos de <span className="font-semibold">{barcoSeleccionado}</span>
          </p>
          <button type="button" onClick={() => setFiltroBarco("")} className="text-xs font-semibold text-acento underline">Quitar filtro</button>
        </div>
      )}

      {/* KPI */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <div className="h-1 w-8 rounded-full bg-emerald-500" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-texto-tenue">Ingresos</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-texto">{euros(resumen?.ingresosCents ?? 0)}</p>
          <p className="mt-1 text-xs text-texto-suave">Reservas completadas (cobradas)</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <div className="h-1 w-8 rounded-full bg-rose-500" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-texto-tenue">Gastos</p>
          <p className="mt-1 cifra font-display text-2xl font-semibold text-texto">{euros(resumen?.gastosCents ?? 0)}</p>
          <p className="mt-1 text-xs text-texto-suave">{gastos.length} apuntes</p>
        </div>
        <div className="rounded-carta border border-borde bg-superficie p-4">
          <div className="h-1 w-8 rounded-full bg-acento" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-texto-tenue">Beneficio</p>
          <p className={`mt-1 cifra font-display text-2xl font-semibold ${(resumen?.beneficioCents ?? 0) >= 0 ? "text-acento" : "text-rose-600"}`}>
            {euros(resumen?.beneficioCents ?? 0)}
          </p>
          <p className="mt-1 text-xs text-texto-suave">{margen.toFixed(0)} % de margen</p>
        </div>
      </div>

      {/* Alta rápida: gasto y vencimiento (colapsable) */}
      <div className="space-y-3">
        <div className={`overflow-hidden rounded-carta border border-borde bg-superficie ${resalta(3)}`}>
          <button
            type="button"
            onClick={() => setAbrirGasto((v) => !v)}
            aria-expanded={abrirGasto}
            className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left ${resalta(1)}`}
          >
            <span className="text-sm font-semibold text-texto">Añadir gasto</span>
            <span className={`text-xs font-semibold ${abrirGasto ? "text-texto-suave" : "text-acento"}`}>{abrirGasto ? "Cerrar" : "Abrir"}</span>
          </button>
          {abrirGasto && (
            <form onSubmit={anadirGasto} className={`grid gap-2 border-t border-borde p-4 sm:grid-cols-2 lg:grid-cols-6 ${resalta(2)}`}>
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto lg:col-span-2" aria-label="Categoría">
                {CATEGORIAS_GASTO.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input value={concepto} onChange={(e) => setConcepto(e.target.value)} placeholder="Concepto *" list="conceptos-gasto" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto lg:col-span-2" aria-label="Concepto" />
              <datalist id="conceptos-gasto">
                {(CONCEPTOS_GASTO[categoria] ?? []).map((c) => <option key={c} value={c} />)}
              </datalist>
              <input value={importe} onChange={(e) => setImporte(e.target.value)} type="number" min={0} step="0.01" placeholder="Importe (€) *" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Importe en euros" />
              <input value={fechaGasto} onChange={(e) => setFechaGasto(e.target.value)} type="date" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Fecha" />
              <input value={factura} onChange={(e) => setFactura(e.target.value)} placeholder="Nº factura" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Número de factura" />
              <select value={iva} onChange={(e) => setIva(Number(e.target.value))} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="IVA">
                <option value={21}>IVA 21 %</option>
                <option value={10}>IVA 10 %</option>
                <option value={0}>Sin IVA</option>
              </select>
              <label className="flex items-center gap-2 rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto">
                <input type="checkbox" checked={deducible} onChange={(e) => setDeducible(e.target.checked)} className="h-4 w-4 accent-[var(--acento)]" />
                Deducible
              </label>
              <select value={barcoId} onChange={(e) => setBarcoId(e.target.value)} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto lg:col-span-2" aria-label="Barco">
                <option value="">Toda la flota</option>
                {barcos.map((b) => <option key={b.id} value={b.id}>{b.nombre}</option>)}
              </select>
              <input value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Observaciones" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto lg:col-span-3" aria-label="Observaciones" />
              <button type="submit" disabled={guardandoGasto} className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo disabled:opacity-60 lg:col-span-1">
                {guardandoGasto ? "Guardando…" : "Añadir gasto"}
              </button>
            </form>
          )}
        </div>

        <div className={`overflow-hidden rounded-carta border border-borde bg-superficie ${resalta(7)}`}>
          <button
            type="button"
            onClick={() => setAbrirVencimiento((v) => !v)}
            aria-expanded={abrirVencimiento}
            className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left ${resalta(5)}`}
          >
            <span className="text-sm font-semibold text-texto">Añadir vencimiento</span>
            <span className={`text-xs font-semibold ${abrirVencimiento ? "text-texto-suave" : "text-acento"}`}>{abrirVencimiento ? "Cerrar" : "Abrir"}</span>
          </button>
          {abrirVencimiento && (
            <form onSubmit={anadirVencimiento} className={`grid gap-2 border-t border-borde p-4 sm:grid-cols-2 ${resalta(6)}`}>
              <select value={tipoV} onChange={(e) => setTipoV(e.target.value)} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Tipo de vencimiento">
                {TIPOS_VENCIMIENTO.map((t) => <option key={t.clave} value={t.clave}>{t.etiqueta}</option>)}
              </select>
              <input value={fechaV} onChange={(e) => setFechaV(e.target.value)} type="date" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Fecha de vencimiento" />
              <input value={horasActualesV} onChange={(e) => setHorasActualesV(e.target.value)} type="number" min={0} step={1} placeholder="Horas actuales" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Horas actuales de motor" />
              <input value={horasV} onChange={(e) => setHorasV(e.target.value)} type="number" min={0} step={1} placeholder="Próxima revisión (h)" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Próxima revisión en horas" />
              <input value={descV} onChange={(e) => setDescV(e.target.value)} placeholder="Descripción (opcional)" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto sm:col-span-2" aria-label="Descripción del vencimiento" />
              <input value={importeV} onChange={(e) => setImporteV(e.target.value)} type="number" min={0} step="0.01" placeholder="Importe (€) opcional" className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto sm:col-span-2" aria-label="Importe del vencimiento" />
              <select value={barcoIdV} onChange={(e) => setBarcoIdV(e.target.value)} className="rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto" aria-label="Barco">
                <option value="">Toda la flota</option>
                {barcos.map((b) => <option key={b.id} value={b.id}>{b.nombre}</option>)}
              </select>
              <button type="submit" disabled={guardandoVencimiento} className="rounded-md bg-marca px-3 py-2 text-sm font-semibold text-fondo disabled:opacity-60">
                {guardandoVencimiento ? "Guardando…" : "Añadir"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Gráfico + desglose por categoría */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-carta border border-borde bg-superficie p-4 lg:col-span-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold text-texto">Ingresos y gastos por mes</h3>
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

        <div className="rounded-carta border border-borde bg-superficie p-4">
          <h3 className="text-sm font-semibold text-texto">Gasto por categoría</h3>
          {resumen && resumen.porCategoria.length > 0 ? (
            <ul className="mt-3 space-y-2.5">
              {resumen.porCategoria.slice(0, 8).map((c) => {
                const pct = resumen.gastosCents > 0 ? (c.totalCents / resumen.gastosCents) * 100 : 0;
                return (
                  <li key={c.categoria}>
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="text-texto">{c.categoria}</span>
                      <span className="shrink-0 text-texto-suave">{euros(c.totalCents)} · {pct.toFixed(0)} %</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-superficie-alt">
                      <div className="h-full rounded-full bg-marca" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-texto-suave">Aún no hay gastos.</p>
          )}
        </div>
      </div>

      {/* Rentabilidad por barco */}
      <div id="tabla-rentabilidad" className="scroll-mt-16 overflow-hidden rounded-carta border border-borde bg-superficie">
        <div className="flex items-baseline justify-between gap-3 border-b border-borde px-4 py-3">
          <h3 className="text-sm font-semibold text-texto">Rentabilidad por barco</h3>
          <p className="text-xs text-texto-suave">Clic en una fila para filtrar el panel</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-texto-tenue">
                <th className="px-4 py-2.5 font-semibold">Barco</th>
                <th className="px-3 py-2.5 text-right font-semibold">Ingresos</th>
                <th className="px-3 py-2.5 text-right font-semibold">Gastos</th>
                <th className="px-3 py-2.5 text-right font-semibold">Beneficio</th>
                <th className="px-4 py-2.5 text-right font-semibold">Margen</th>
              </tr>
            </thead>
            <tbody>
              {rentabilidad.map((r) => {
                const margenB = r.ingresosCents > 0 ? (r.beneficioCents / r.ingresosCents) * 100 : 0;
                return (
                  <tr
                    key={r.barcoId}
                    onClick={() => setFiltroBarco(filtroBarco === r.barcoId ? "" : r.barcoId)}
                    className={`cursor-pointer border-b border-borde last:border-0 hover:bg-superficie-alt/60 ${filtroBarco === r.barcoId ? "bg-acento/10" : ""}`}
                    title="Filtrar el panel por este barco"
                  >
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium text-texto">{r.barco}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right cifra text-emerald-600">{euros(r.ingresosCents)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right cifra text-rose-600">{euros(r.gastosCents)}</td>
                    <td className={`whitespace-nowrap px-3 py-2.5 text-right cifra font-semibold ${r.beneficioCents >= 0 ? "text-texto" : "text-rose-600"}`}>{euros(r.beneficioCents)}</td>
                    <td className={`whitespace-nowrap px-4 py-2.5 text-right text-xs font-semibold ${margenB >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{margenB.toFixed(0)} %</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recuperación de la inversión */}
      <div id="tabla-recuperacion" className={`scroll-mt-16 overflow-hidden rounded-carta border border-borde bg-superficie ${resalta(9)}`}>
        <div className="border-b border-borde px-4 py-3">
          <h3 className="text-sm font-semibold text-texto">Recuperación de la inversión</h3>
          <p className="mt-0.5 text-xs text-texto-suave">Cuánto te falta por recuperar del precio de compra con el beneficio acumulado de cada barco.</p>
        </div>
        {recuperacion.length === 0 ? (
          <p className="px-4 py-4 text-sm text-texto-suave">Añade el precio de adquisición en la ficha de cada barco para verlo aquí.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-texto-tenue">
                  <th className="px-4 py-2.5 font-semibold">Barco</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Precio</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Ganado</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Falta por recuperar</th>
                  <th className="px-4 py-2.5 text-right font-semibold">% recuperado</th>
                </tr>
              </thead>
              <tbody>
                {recuperacion.map((r) => (
                  <tr key={r.barcoId} className="border-b border-borde last:border-0">
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium text-texto">{r.barco}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right cifra text-texto-suave">{euros(r.precio)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right cifra text-emerald-600">{euros(r.ganado)}</td>
                    <td className={`whitespace-nowrap px-3 py-2.5 text-right cifra font-semibold ${r.falta <= 0 ? "text-emerald-600" : "text-amber-600"}`}>
                      {r.falta <= 0 ? "Recuperado" : euros(r.falta)}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2.5 text-right text-xs font-semibold ${r.pct >= 100 ? "text-emerald-600" : "text-amber-600"}`}>{r.pct.toFixed(0)} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ComparativaProvincial ingresosCents={resumen?.ingresosCents ?? 0} numBarcos={barcos.length} />

      {/* Flujo de caja: próximos 12 meses */}
      <div id="tabla-tesoreria" className="scroll-mt-16 overflow-hidden rounded-carta border border-borde bg-superficie">
        <div className="border-b border-borde px-4 py-3">
          <h3 className="text-sm font-semibold text-texto">Previsión de tesorería · próximos 12 meses</h3>
          <p className="mt-0.5 text-xs text-texto-suave">Ingresos por reservas confirmadas y gastos previstos por vencimientos con importe.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-texto-tenue">
                <th className="px-4 py-2.5 font-semibold">Mes</th>
                <th className="px-3 py-2.5 text-right font-semibold">Ingresos</th>
                <th className="px-3 py-2.5 text-right font-semibold">Gastos</th>
                <th className="px-3 py-2.5 text-right font-semibold">Saldo mes</th>
                <th className="px-4 py-2.5 text-right font-semibold">Saldo acumulado</th>
              </tr>
            </thead>
            <tbody>
              {flujoCaja.map((f) => {
                const saldoMes = f.ingresosCents - f.gastosCents;
                return (
                  <tr key={f.mes} className="border-b border-borde last:border-0">
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium capitalize text-texto">{f.etiqueta}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right cifra text-emerald-600">{euros(f.ingresosCents)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right cifra text-rose-600">{euros(f.gastosCents)}</td>
                    <td className={`whitespace-nowrap px-3 py-2.5 text-right cifra font-semibold ${saldoMes >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{euros(saldoMes)}</td>
                    <td className={`whitespace-nowrap px-4 py-2.5 text-right cifra font-semibold ${f.saldoCents >= 0 ? "text-texto" : "text-rose-600"}`}>{euros(f.saldoCents)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen fiscal: IVA y deducibilidad */}
      <div id="tabla-iva" className="scroll-mt-16 overflow-hidden rounded-carta border border-borde bg-superficie">
        <div className="border-b border-borde px-4 py-3">
          <h3 className="text-sm font-semibold text-texto">Resumen fiscal · IVA y deducibilidad</h3>
        </div>
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="border-b border-borde">
              <td className="px-4 py-2.5 text-texto-suave">Base imponible deducible</td>
              <td className="px-4 py-2.5 text-right cifra font-semibold text-texto">{euros(resumenIva?.totalDeducibleCents ?? 0)}</td>
            </tr>
            <tr className="border-b border-borde">
              <td className="px-4 py-2.5 text-texto-suave">Gasto no deducible</td>
              <td className="px-4 py-2.5 text-right cifra font-semibold text-texto">{euros(resumenIva?.totalNoDeducibleCents ?? 0)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-texto-suave">IVA soportado deducible</td>
              <td className="px-4 py-2.5 text-right cifra font-semibold text-acento">{euros(resumenIva?.totalIvaCents ?? 0)}</td>
            </tr>
          </tbody>
        </table>
        <p className="border-t border-borde px-4 py-2.5 text-xs text-texto-suave">El IVA soportado deducible se recupera en la declaración trimestral (modelo 303).</p>
      </div>

      {/* Listado de gastos */}
      <div id="tabla-gastos" className={`scroll-mt-16 overflow-hidden rounded-carta border border-borde bg-superficie ${resalta(4)}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borde px-4 py-3">
          <h3 className="text-sm font-semibold text-texto">Últimos gastos</h3>
          <div className="flex items-center gap-3">
            <input
              value={busquedaGastos}
              onChange={(e) => setBusquedaGastos(e.target.value)}
              placeholder="Buscar gasto…"
              className="w-40 rounded-md border border-borde bg-fondo px-2 py-1.5 text-xs text-texto"
              aria-label="Buscar en gastos"
            />
            {gastosFiltrados.length > 0 && <span className="text-xs text-texto-suave">{gastosFiltrados.length} apuntes</span>}
          </div>
        </div>

        {cargando ? (
          <p className="px-4 py-4 text-sm text-texto-suave">Cargando…</p>
        ) : gastosFiltrados.length === 0 ? (
          <p className="px-4 py-4 text-sm text-texto-suave">
            {filtroBarco ? "Este barco no tiene gastos." : "Aún no has registrado gastos."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-texto-tenue">
                  {thOrden("Fecha", "fecha", ordenGastos, setOrdenGastos)}
                  {thOrden("Concepto", "concepto", ordenGastos, setOrdenGastos)}
                  {thOrden("Categoría", "categoria", ordenGastos, setOrdenGastos)}
                  {thOrden("Barco", "barco", ordenGastos, setOrdenGastos)}
                  {thOrden("Factura", "factura", ordenGastos, setOrdenGastos)}
                  <th className="px-3 py-2.5 text-right font-semibold">IVA</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Deducible</th>
                  {thOrden("Importe", "importe", ordenGastos, setOrdenGastos, "text-right")}
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {gastosFiltrados.map((g) => (
                  <tr key={g.id} className="border-b border-borde last:border-0 hover:bg-superficie-alt/60">
                    <td className="whitespace-nowrap px-4 py-2.5 text-texto-suave">{fecha(g.fecha)}</td>
                    <td className="px-3 py-2.5">
                      <span className="font-medium text-texto">{g.concepto}</span>
                      {g.notas && <p className="text-xs text-texto-suave">{g.notas}</p>}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-texto-suave">{g.categoria}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-texto-suave">{g.barco ?? "—"}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-texto-suave">{g.factura ?? "—"}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-texto-suave">{g.iva > 0 ? `${g.iva} %` : "—"}</td>
                    <td className="px-3 py-2.5 text-center">{g.deducible ? <span className="text-emerald-600">Sí</span> : <span className="text-texto-tenue">No</span>}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right cifra font-semibold text-texto">{euros(g.importeCents)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        onClick={() => void borrarGasto(g.id)}
                        className="text-texto-tenue transition-colors hover:text-rose-600"
                        aria-label={`Borrar ${g.concepto}`}
                        title="Borrar"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-borde-fuerte bg-superficie-alt/50">
                  <td className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-texto-suave" colSpan={7}>
                    Total
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right cifra font-display text-base font-semibold text-texto">
                    {euros(totalFiltrado)}
                  </td>
                  <td className="px-4 py-2.5" />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Vencimientos */}
      <div id="tabla-vencimientos" className={`scroll-mt-16 overflow-hidden rounded-carta border border-borde bg-superficie ${resalta(8)}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borde px-4 py-3">
          <h3 className="text-sm font-semibold text-texto">Vencimientos</h3>
          <div className="flex flex-wrap items-center gap-1.5">
            <input
              value={busquedaVencimientos}
              onChange={(e) => setBusquedaVencimientos(e.target.value)}
              placeholder="Buscar…"
              className="w-32 rounded-md border border-borde bg-fondo px-2 py-1.5 text-xs text-texto"
              aria-label="Buscar en vencimientos"
            />
            <button type="button" onClick={() => alternarPlazo("rojo")} className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${filtroPlazos.includes("rojo") ? "border-rose-500 bg-rose-50 text-rose-700" : "border-borde text-texto-tenue"}`}>≤ 30 días</button>
            <button type="button" onClick={() => alternarPlazo("ambar")} className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${filtroPlazos.includes("ambar") ? "border-amber-500 bg-amber-50 text-amber-700" : "border-borde text-texto-tenue"}`}>31–60 días</button>
            <button type="button" onClick={() => alternarPlazo("verde")} className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${filtroPlazos.includes("verde") ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-borde text-texto-tenue"}`}>&gt; 60 días</button>
          </div>
        </div>
        {vencimientosFiltrados.length === 0 ? (
          <p className="px-4 py-4 text-sm text-texto-suave">
            {vencimientos.length === 0 ? (filtroBarco ? "Este barco no tiene vencimientos." : "No hay vencimientos registrados.") : "No hay vencimientos con estos filtros."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-borde text-left text-[11px] uppercase tracking-wider text-texto-tenue">
                  {thOrden("Tipo", "tipo", ordenVencimientos, setOrdenVencimientos)}
                  <th className="px-3 py-2.5 font-semibold">Detalle</th>
                  {thOrden("Fecha", "fecha", ordenVencimientos, setOrdenVencimientos)}
                  <th className="px-3 py-2.5 font-semibold">Horas</th>
                  {thOrden("Importe", "importe", ordenVencimientos, setOrdenVencimientos, "text-right")}
                  {thOrden("Plazo", "plazo", ordenVencimientos, setOrdenVencimientos, "text-right")}
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {vencimientosFiltrados.map((v) => {
                  const d = diasHasta(v.fecha);
                  return (
                    <tr key={v.id} className="border-b border-borde last:border-0 hover:bg-superficie-alt/60">
                      <td className="whitespace-nowrap px-4 py-2.5 font-medium text-texto">{ETIQUETA_VENCIMIENTO[v.tipo] ?? v.tipo}</td>
                      <td className="px-3 py-2.5">
                        <span className="text-texto">{v.descripcion || "—"}</span>
                        {v.barco && <p className="text-xs text-texto-suave">{v.barco}</p>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-texto-suave">{fecha(v.fecha)}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-texto-suave">
                        {v.horasActuales != null && <span>actuales {v.horasActuales} h</span>}
                        {v.horasActuales != null && v.horas != null && <span> · </span>}
                        {v.horas != null && <span>próxima {v.horas} h</span>}
                        {v.horasActuales == null && v.horas == null && "—"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-right cifra text-texto-suave">{v.importeCents != null ? euros(v.importeCents) : "—"}</td>
                      <td className={`whitespace-nowrap px-3 py-2.5 text-right text-xs font-semibold ${colorVencimiento(d)}`}>
                        {d < 0 ? "vencido" : d === 0 ? "hoy" : `${d} días`}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <button
                          onClick={() => void borrarVencimiento(v.id)}
                          className="text-texto-tenue transition-colors hover:text-rose-600"
                          aria-label={`Borrar ${ETIQUETA_VENCIMIENTO[v.tipo]}`}
                          title="Borrar"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Próximas salidas */}
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

      {tour !== null && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,540px)] -translate-x-1/2 rounded-carta border border-acento/40 bg-superficie p-4 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-acento">Recorrido · Paso {tour + 1} de {PASOS_TOUR.length}</p>
              <h3 className="mt-1 text-sm font-semibold text-texto">{PASOS_TOUR[tour].titulo}</h3>
              <p className="mt-1 text-xs text-texto-suave">{PASOS_TOUR[tour].texto}</p>
            </div>
            <button type="button" onClick={() => setTour(null)} className="shrink-0 text-xs font-semibold text-texto-suave underline">Saltar</button>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-superficie-alt">
            <div className="h-full bg-acento transition-all" style={{ width: `${((tour + 1) / PASOS_TOUR.length) * 100}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
