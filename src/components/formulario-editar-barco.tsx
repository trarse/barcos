"use client";

import { useState } from "react";

type Tipo = { id: string; slug: string; nombre: string };
type Puerto = { id: string; nombre: string; destino: string };

export type BarcoDetalle = {
  id: string;
  slug: string;
  nombre: string;
  fabricante: string;
  modelo: string;
  anio: number;
  descripcion: string;
  esloraCm: number;
  capacidad: number;
  camarotes: number;
  aseos: number;
  potenciaCv: number;
  precioBaseDia: number;
  limpieza: number;
  tasaPortuariaDia: number;
  patronDia: number | null;
  fianza: number;
  consumoLitrosHora: number;
  descuentoSemana: number;
  requiereTitulacion: boolean;
  reservaInstantanea: boolean;
  minimoDias: number;
  tipoId: string;
  puertoId: string;
};

/**
 * Formulario de edición de un barco. Los importes se muestran y se envían en
 * EUROS (la API los convierte a céntimos); la eslora se maneja en metros.
 */
export function FormularioEditarBarco({
  barco,
  tipos,
  puertos,
  onCancelar,
  onGuardado,
}: {
  barco: BarcoDetalle;
  tipos: Tipo[];
  puertos: Puerto[];
  onCancelar: () => void;
  onGuardado: () => void;
}) {
  const [f, setF] = useState({
    nombre: barco.nombre,
    fabricante: barco.fabricante,
    modelo: barco.modelo,
    anio: String(barco.anio),
    descripcion: barco.descripcion,
    esloraM: String(barco.esloraCm / 100),
    capacidad: String(barco.capacidad),
    camarotes: String(barco.camarotes),
    aseos: String(barco.aseos),
    potenciaCv: String(barco.potenciaCv),
    consumo: String(barco.consumoLitrosHora),
    tipoId: barco.tipoId,
    puertoId: barco.puertoId,
    precioBaseDia: String(barco.precioBaseDia / 100),
    limpieza: String(barco.limpieza / 100),
    tasaPortuariaDia: String(barco.tasaPortuariaDia / 100),
    patronDia: barco.patronDia !== null ? String(barco.patronDia / 100) : "",
    fianza: String(barco.fianza / 100),
    requiereTitulacion: barco.requiereTitulacion,
    reservaInstantanea: barco.reservaInstantanea,
    minimoDias: String(barco.minimoDias),
    descuentoSemana: String(barco.descuentoSemana),
  });

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const set = (clave: string, valor: string | boolean) =>
    setF((prev) => ({ ...prev, [clave]: valor }));

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError("");
    try {
      const res = await fetch("/api/barcos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: barco.id, ...f }),
      });
      if (res.ok) onGuardado();
      else setError("No se pudo guardar. Revisa los campos.");
    } catch {
      setError("No se pudo guardar.");
    } finally {
      setEnviando(false);
    }
  }

  const campo = (etiqueta: string, children: React.ReactNode) => (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
        {etiqueta}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );

  const input = (clave: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input
      value={String(f[clave as keyof typeof f])}
      onChange={(e) => set(clave, e.target.value)}
      className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
      {...props}
    />
  );

  return (
    <form onSubmit={enviar} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-texto">
          Editar {barco.nombre}
        </h3>
        <button type="button" onClick={onCancelar} className="text-sm text-texto-suave underline">
          Volver
        </button>
      </div>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-texto">El barco</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {campo("Nombre *", input("nombre", { required: true }))}
          {campo("Fabricante", input("fabricante"))}
          {campo("Modelo", input("modelo"))}
          {campo("Año", input("anio", { type: "number" }))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-texto">Ficha técnica</h4>
        <div className="grid gap-3 sm:grid-cols-3">
          {campo("Eslora (m)", input("esloraM", { type: "number", step: "0.1" }))}
          {campo("Capacidad (plazas)", input("capacidad", { type: "number" }))}
          {campo("Camarotes", input("camarotes", { type: "number" }))}
          {campo("Aseos", input("aseos", { type: "number" }))}
          {campo("Potencia (cv)", input("potenciaCv", { type: "number" }))}
          {campo("Consumo (l/h)", input("consumo", { type: "number", step: "0.5" }))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-texto">Ubicación y tipo</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {campo(
            "Tipo",
            <select
              value={f.tipoId}
              onChange={(e) => set("tipoId", e.target.value)}
              className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
            >
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>,
          )}
          {campo(
            "Puerto",
            <select
              value={f.puertoId}
              onChange={(e) => set("puertoId", e.target.value)}
              className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
            >
              {puertos.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre} · {p.destino}</option>
              ))}
            </select>,
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-texto">Tarifas (€)</h4>
        <div className="grid gap-3 sm:grid-cols-3">
          {campo("Precio por día *", input("precioBaseDia", { type: "number", required: true }))}
          {campo("Limpieza final", input("limpieza", { type: "number" }))}
          {campo("Amarre y tasas / día", input("tasaPortuariaDia", { type: "number" }))}
          {campo("Patrón / día (vacío = no)", input("patronDia", { type: "number" }))}
          {campo("Fianza", input("fianza", { type: "number" }))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-texto">Condiciones</h4>
        <div className="grid gap-3 sm:grid-cols-3">
          {campo("Mínimo de días", input("minimoDias", { type: "number" }))}
          {campo("Descuento semana (%)", input("descuentoSemana", { type: "number" }))}
          <label className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              checked={f.requiereTitulacion}
              onChange={(e) => set("requiereTitulacion", e.target.checked)}
              className="h-4 w-4 accent-[var(--acento)]"
            />
            <span className="text-sm text-texto">Requiere titulación</span>
          </label>
          <label className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              checked={f.reservaInstantanea}
              onChange={(e) => set("reservaInstantanea", e.target.checked)}
              className="h-4 w-4 accent-[var(--acento)]"
            />
            <span className="text-sm text-texto">Reserva inmediata</span>
          </label>
        </div>
      </section>

      <section className="space-y-2">
        <h4 className="text-sm font-semibold text-texto">Descripción</h4>
        <textarea
          value={f.descripcion}
          onChange={(e) => set("descripcion", e.target.value)}
          rows={4}
          className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
        />
      </section>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={enviando}
          className="rounded-md bg-marca px-5 py-2.5 font-semibold text-fondo disabled:opacity-60"
        >
          {enviando ? "Guardando…" : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="rounded-md border border-borde px-5 py-2.5 text-texto-suave"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
