"use client";

import { useState } from "react";

type Tipo = { id: string; slug: string; nombre: string };
type Puerto = { id: string; nombre: string; destino: { nombre: string } };

/**
 * Alta real de barco por parte del armador.
 *
 * Envía los datos a /api/barcos, que los guarda como pendientes de revisión
 * (publicado=false). Los importes se escriben en EUROS; la API los convierte
 * a céntimos.
 */
export function FormularioAltaBarco({
  tipos,
  puertos,
}: {
  tipos: Tipo[];
  puertos: Puerto[];
}) {
  const [f, setF] = useState({
    nombre: "",
    fabricante: "",
    modelo: "",
    anio: String(new Date().getFullYear()),
    esloraM: "8",
    capacidad: "8",
    camarotes: "2",
    aseos: "1",
    potenciaCv: "150",
    consumo: "40",
    tipoId: tipos[0]?.id ?? "",
    puertoId: puertos[0]?.id ?? "",
    precioBaseDia: "350",
    limpieza: "80",
    tasaPortuariaDia: "40",
    patronDia: "",
    fianza: "1000",
    requiereTitulacion: true,
    minimoDias: "1",
    descuentoSemana: "15",
    reservaInstantanea: false,
    descripcion: "",
    contactoNombre: "",
    contactoEmail: "",
    contactoTelefono: "",
    web: "",
  });

  const [estado, setEstado] = useState<"inicial" | "enviando" | "hecho" | "error">(
    "inicial",
  );

  const set = (clave: string, valor: string | boolean) =>
    setF((prev) => ({ ...prev, [clave]: valor }));

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    try {
      const r = await fetch("/api/barcos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(f),
      });
      setEstado(r.ok ? "hecho" : "error");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "hecho") {
    return (
      <div className="rounded-carta border border-borde bg-superficie p-6">
        <p className="font-display text-xl font-semibold text-texto">
          Recibido, gracias.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-texto-suave">
          Revisaremos tu barco y lo publicaremos en breve. Te escribiremos al
          correo que nos has dejado si necesitamos algo más.
        </p>
      </div>
    );
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
      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-texto">El barco</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {campo("Nombre *", input("nombre", { required: true, placeholder: "Quicksilver 675" }))}
          {campo("Fabricante", input("fabricante", { placeholder: "Quicksilver" }))}
          {campo("Modelo", input("modelo", { placeholder: "Activ 675" }))}
          {campo("Año", input("anio", { type: "number" }))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-texto">Ficha técnica</h2>
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
        <h2 className="font-display text-lg font-semibold text-texto">Ubicación y tipo</h2>
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
                <option key={p.id} value={p.id}>
                  {p.nombre} · {p.destino.nombre}
                </option>
              ))}
            </select>,
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-texto">Tarifas (€)</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {campo("Precio por día *", input("precioBaseDia", { type: "number", required: true }))}
          {campo("Limpieza final", input("limpieza", { type: "number" }))}
          {campo("Amarre y tasas / día", input("tasaPortuariaDia", { type: "number" }))}
          {campo("Patrón / día (opcional)", input("patronDia", { type: "number", placeholder: "vacío si no ofreces" }))}
          {campo("Fianza", input("fianza", { type: "number" }))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-texto">Condiciones</h2>
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

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-texto">Descripción</h2>
        <textarea
          value={f.descripcion}
          onChange={(e) => set("descripcion", e.target.value)}
          rows={4}
          placeholder="Describe tu barco: qué lo hace especial, para qué planes va bien…"
          className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-texto">Tu contacto</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {campo("Nombre *", input("contactoNombre", { required: true }))}
          {campo("Email *", input("contactoEmail", { type: "email", required: true }))}
          {campo("Teléfono", input("contactoTelefono", { placeholder: "+34 …" }))}
        </div>
      </section>

      {/* Honeypot: oculto a los humanos */}
      <input
        type="text"
        value={f.web}
        onChange={(e) => set("web", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="w-full rounded-md bg-marca px-5 py-3 font-semibold text-fondo transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar mi barco"}
      </button>

      {estado === "error" && (
        <p className="text-sm text-rose-600">
          No se pudo enviar. Revisa los campos e inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
