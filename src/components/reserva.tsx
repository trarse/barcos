"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { euro, euroExacto, plural } from "@/lib/formato";
import type { Idioma } from "@/lib/idiomas";
import {
  calcularDesglose,
  DIAS_DESCUENTO,
  diasEntre,
  HORAS_NAVEGACION_DIA,
  type Tarifa,
  type Temporada,
  temporadaDe,
} from "@/lib/precio";
import { textos } from "@/lib/textos";

/**
 * Panel de reserva con el desglose en vivo y el formulario real de petición.
 *
 * El precio se calcula dos veces con la MISMA función: aquí (para pintarlo) y
 * en el servidor (para guardarlo). El cliente no puede manipular el total
 * porque el servidor lo recalcula siempre desde la tarifa del barco.
 *
 * Se recibe `idioma` y no el objeto de textos porque este catálogo contiene
 * funciones, y una función no cruza la frontera servidor-cliente.
 */
export function Reserva({
  barcoId,
  tarifa,
  temporada,
  mesesAlta,
  capacidad,
  minimoDias,
  reservaInstantanea,
  requiereTitulacion,
  idioma,
}: {
  barcoId: string;
  tarifa: Tarifa;
  temporada: Temporada;
  mesesAlta: string;
  capacidad: number;
  minimoDias: number;
  reservaInstantanea: boolean;
  requiereTitulacion: boolean;
  idioma: Idioma;
}) {
  const t = textos(idioma);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horas, setHoras] = useState(HORAS_NAVEGACION_DIA);
  const [conPatron, setConPatron] = useState(false);
  const [numPersonas, setNumPersonas] = useState(1);
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{
    tipo: "ok" | "error";
    mensaje: string;
  } | null>(null);
  const [reservado, setReservado] = useState<{ desde: string; hasta: string }[]>([]);

  const hoy = aISOFecha(new Date());

  const cargarDisponibilidad = useCallback(async () => {
    try {
      const res = await fetch(`/api/barcos/${barcoId}/disponibilidad`);
      const data = await res.json();
      if (data?.ok) setReservado(data.reservado ?? []);
    } catch {
      // Sin conexión no pasa nada: el servidor bloquea igualmente el solape.
    }
  }, [barcoId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargarDisponibilidad();
  }, [cargarDisponibilidad]);

  const dias = useMemo(() => {
    if (fechaInicio && fechaFin) {
      return diasEntre(new Date(`${fechaInicio}T00:00:00Z`), new Date(`${fechaFin}T00:00:00Z`));
    }
    return minimoDias;
  }, [fechaInicio, fechaFin, minimoDias]);

  const temporadaEfectiva = useMemo(() => {
    if (fechaInicio) {
      return temporadaDe(new Date(`${fechaInicio}T00:00:00Z`), mesesAlta);
    }
    return temporada;
  }, [fechaInicio, mesesAlta, temporada]);

  const desglose = useMemo(
    () =>
      calcularDesglose(tarifa, {
        dias,
        temporada: temporadaEfectiva,
        conPatron,
        horasNavegacionDia: horas,
      }),
    [tarifa, dias, temporadaEfectiva, conPatron, horas],
  );

  const solape = useMemo(() => {
    if (!fechaInicio || !fechaFin) return null;
    const i = new Date(`${fechaInicio}T00:00:00Z`).getTime();
    const f = new Date(`${fechaFin}T00:00:00Z`).getTime();
    return (
      reservado.find(
        (r) =>
          new Date(`${r.desde}T00:00:00Z`).getTime() < f &&
          new Date(`${r.hasta}T00:00:00Z`).getTime() > i,
      ) ?? null
    );
  }, [fechaInicio, fechaFin, reservado]);

  const etiquetaTemporada = {
    alta: t.reserva.temporadaAlta,
    media: t.reserva.temporadaMedia,
    baja: t.reserva.temporadaBaja,
  }[temporadaEfectiva];

  /** Traduce una línea a partir de su clave, nunca de su etiqueta. */
  function traducirLinea(linea: (typeof desglose.lineas)[number]) {
    const porDias = () =>
      t.reserva.conceptos.porDias(
        plural(linea.dias ?? dias, t.comun.dia, t.comun.dias),
        euro(linea.importeUnitario ?? 0),
      );

    switch (linea.clave) {
      case "alquiler":
        return { concepto: t.reserva.conceptos.alquiler, detalle: porDias() };
      case "descuento":
        return {
          concepto: t.reserva.conceptos.descuento(linea.porcentaje ?? 0),
          detalle: t.reserva.conceptos.porReservar(DIAS_DESCUENTO),
        };
      case "combustible":
        return {
          concepto: t.reserva.conceptos.combustible,
          detalle: t.reserva.conceptos.detalleCombustible(
            linea.litros ?? 0,
            linea.horas ?? horas,
          ),
        };
      case "limpieza":
        return {
          concepto: t.reserva.conceptos.limpieza,
          detalle: t.reserva.conceptos.pagoUnico,
        };
      case "amarre":
        return { concepto: t.reserva.conceptos.amarre, detalle: porDias() };
      case "patron":
        return { concepto: t.reserva.conceptos.patron, detalle: porDias() };
    }
  }

  async function enviar() {
    if (!fechaInicio || !fechaFin || !clienteNombre.trim() || !clienteEmail.trim()) {
      setResultado({ tipo: "error", mensaje: t.reserva.error });
      return;
    }
    if (solape) {
      setResultado({ tipo: "error", mensaje: t.reserva.ocupado });
      return;
    }
    setEnviando(true);
    setResultado(null);
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barcoId,
          fechaInicio,
          fechaFin,
          numPersonas,
          conPatron,
          clienteNombre: clienteNombre.trim(),
          clienteEmail: clienteEmail.trim(),
          clienteTelefono: clienteTelefono.trim() || undefined,
          idioma,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        if (data.urlPago) {
          window.location.assign(data.urlPago);
          return;
        }
        setReservado((prev) => [...prev, { desde: fechaInicio, hasta: fechaFin }]);
        setResultado({
          tipo: "ok",
          mensaje: t.reserva.exito(data.reserva.referencia),
        });
      } else if (data?.error === "ocupado") {
        setResultado({ tipo: "error", mensaje: t.reserva.ocupado });
      } else {
        setResultado({ tipo: "error", mensaje: t.reserva.error });
      }
    } catch {
      setResultado({ tipo: "error", mensaje: t.reserva.error });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="rounded-carta border border-borde bg-superficie p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p>
          <span className="cifra font-display text-3xl font-semibold text-texto">
            {euro(desglose.totalPorDia)}
          </span>{" "}
          <span className="text-sm text-texto-suave">{t.comun.alDia}</span>
        </p>
        <span className="rounded border border-borde px-2 py-0.5 text-xs font-medium text-texto-suave">
          {etiquetaTemporada}
        </span>
      </div>
      <p className="mt-1 text-sm font-medium text-exito">{t.reserva.sinExtras}</p>

      {/* -------------------------------------------------------- fechas */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-medium text-texto">{t.reserva.entrada}</span>
          <input
            type="date"
            min={hoy}
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-texto">{t.reserva.salida}</span>
          <input
            type="date"
            min={fechaInicio || hoy}
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
          />
        </label>
      </div>
      <p className="mt-1.5 text-xs text-texto-tenue">
        {fechaInicio && fechaFin
          ? plural(dias, t.comun.dia, t.comun.dias)
          : t.reserva.eligeFechas}
        {minimoDias > 1 && (
          <> · {t.reserva.minimoDias(plural(minimoDias, t.comun.dia, t.comun.dias))}</>
        )}
      </p>

      {solape && (
        <p className="mt-2 rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
          {t.reserva.ocupado}
        </p>
      )}

      {reservado.length > 0 && (
        <div className="mt-3 rounded-md bg-superficie-alt p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
            {t.reserva.fechasReservadas}
          </p>
          <ul className="mt-1.5 space-y-1">
            {reservado.map((r) => (
              <li key={`${r.desde}-${r.hasta}`} className="text-xs text-texto-suave">
                {fechaCorta(r.desde)} – {fechaCorta(r.hasta)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ------------------------------------------------------ controles */}
      <div className="mt-4 space-y-4">
        <Control etiqueta={t.reserva.horasNavegacion} valor={`${horas} h`}>
          <input
            type="range"
            min={1}
            max={10}
            value={horas}
            onChange={(e) => setHoras(Number(e.target.value))}
            className="w-full accent-[var(--acento)]"
            aria-label={t.reserva.horasNavegacion}
          />
          <p className="mt-1.5 text-xs leading-relaxed text-texto-tenue">
            {t.reserva.notaHoras}
          </p>
        </Control>

        <Control etiqueta={t.reserva.personas} valor={`${numPersonas}`}>
          <input
            type="number"
            min={1}
            max={Math.min(30, Math.max(1, capacidad))}
            value={numPersonas}
            onChange={(e) =>
              setNumPersonas(
                Math.max(1, Math.min(Math.min(30, capacidad), Number(e.target.value) || 1)),
              )
            }
            className="mt-1.5 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
            aria-label={t.reserva.personas}
          />
        </Control>

        {tarifa.patronDia !== null && (
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-borde p-3 transition-colors has-checked:border-acento has-checked:bg-acento-suave">
            <input
              type="checkbox"
              checked={conPatron}
              onChange={(e) => setConPatron(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--acento)]"
            />
            <span className="text-sm">
              <span className="font-medium text-texto">{t.reserva.conPatron}</span>
              <span className="ml-1.5 cifra text-texto-suave">
                {t.reserva.patronDia(euro(tarifa.patronDia))}
              </span>
              {requiereTitulacion && (
                <span className="mt-0.5 block text-xs text-texto-tenue">
                  {t.reserva.exigeTitulacion}
                </span>
              )}
            </span>
          </label>
        )}
      </div>

      {/* -------------------------------------------------------- desglose */}
      <div className="isobata my-5" />

      <ul className="space-y-2.5">
        {desglose.lineas.map((linea) => {
          const traducida = traducirLinea(linea);
          return (
            <li key={linea.clave} className="flex items-baseline justify-between gap-4">
              <span className="text-sm">
                <span
                  className={
                    linea.clase === "descuento" ? "font-medium text-exito" : "text-texto"
                  }
                >
                  {traducida.concepto}
                </span>
                <span className="mt-0.5 block text-xs text-texto-tenue">
                  {traducida.detalle}
                </span>
              </span>
              <span
                className={`cifra shrink-0 text-sm font-medium ${
                  linea.clase === "descuento" ? "text-exito" : "text-texto"
                }`}
              >
                {euro(linea.importe)}
              </span>
            </li>
          );
        })}

        <li className="flex items-baseline justify-between gap-4 pt-1">
          <span className="text-sm text-texto-suave">{t.reserva.ivaLinea}</span>
          <span className="cifra shrink-0 text-sm font-medium text-texto">
            {euro(desglose.iva)}
          </span>
        </li>
      </ul>

      <div className="isobata my-5" />

      <div className="flex items-baseline justify-between gap-4">
        <span className="font-display text-lg font-semibold text-texto">
          {t.reserva.total}
        </span>
        <span className="cifra font-display text-2xl font-semibold text-acento">
          {euroExacto(desglose.total)}
        </span>
      </div>

      {/* ---------------------------------------------------------- datos */}
      <div className="mt-5 space-y-3">
        <input
          type="text"
          value={clienteNombre}
          onChange={(e) => setClienteNombre(e.target.value)}
          placeholder={t.reserva.nombre}
          className="w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
          aria-label={t.reserva.nombre}
        />
        <input
          type="email"
          value={clienteEmail}
          onChange={(e) => setClienteEmail(e.target.value)}
          placeholder={t.reserva.email}
          className="w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
          aria-label={t.reserva.email}
        />
        <input
          type="tel"
          value={clienteTelefono}
          onChange={(e) => setClienteTelefono(e.target.value)}
          placeholder={t.reserva.telefono}
          className="w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
          aria-label={t.reserva.telefono}
        />
      </div>

      {resultado && (
        <p
          className={`mt-3 rounded-md px-3 py-2 text-sm ${
            resultado.tipo === "ok"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {resultado.mensaje}
        </p>
      )}

      <button
        type="button"
        onClick={() => void enviar()}
        disabled={enviando || Boolean(solape)}
        className="mt-5 w-full rounded-md bg-marca px-5 py-3.5 font-semibold text-fondo transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {enviando
          ? t.reserva.enviando
          : reservaInstantanea
            ? t.reserva.reservarAhora
            : t.reserva.solicitarDisponibilidad}
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-texto-tenue">
        {reservaInstantanea ? t.reserva.notaInmediata : t.reserva.notaPeticion}
      </p>

      <div className="mt-4 rounded-md bg-superficie-alt p-3">
        <p className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-texto-suave">{t.reserva.fianza}</span>
          <span className="cifra font-medium text-texto">{euro(desglose.fianza)}</span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-texto-tenue">
          {t.reserva.notaFianza}
        </p>
      </div>
    </div>
  );
}

function aISOFecha(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dia}`;
}

/** "2026-07-15" → "15/07/26" para listar rangos ocupados en poco espacio. */
function fechaCorta(iso: string): string {
  const [anio, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${anio.slice(2)}`;
}

function Control({
  etiqueta,
  valor,
  children,
}: {
  etiqueta: string;
  valor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-texto">{etiqueta}</span>
        <span className="cifra text-sm text-texto-suave">{valor}</span>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
