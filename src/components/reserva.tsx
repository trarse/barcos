"use client";

import { useMemo, useState } from "react";

import { euro, euroExacto, plural } from "@/lib/formato";
import type { Idioma } from "@/lib/idiomas";
import {
  calcularDesglose,
  DIAS_DESCUENTO,
  HORAS_NAVEGACION_DIA,
  type Tarifa,
  type Temporada,
} from "@/lib/precio";
import { textos } from "@/lib/textos";

/**
 * Panel de reserva con el desglose en vivo.
 *
 * Usa exactamente la misma función que el servidor, así que el precio de la
 * tarjeta de resultados y el de aquí no pueden desviarse. Y como el cálculo es
 * puro, mover un control no cuesta ni una petición.
 *
 * El deslizador de horas de navegación no lo tiene nadie del sector: es lo que
 * convierte el combustible de sorpresa final en una decisión informada.
 *
 * Se recibe `idioma` y no el objeto de textos porque este catálogo contiene
 * funciones, y una función no cruza la frontera servidor-cliente.
 */
export function Reserva({
  tarifa,
  temporada,
  minimoDias,
  reservaInstantanea,
  requiereTitulacion,
  idioma,
}: {
  tarifa: Tarifa;
  temporada: Temporada;
  minimoDias: number;
  reservaInstantanea: boolean;
  requiereTitulacion: boolean;
  idioma: Idioma;
}) {
  const t = textos(idioma);
  const [dias, setDias] = useState(minimoDias);
  const [horas, setHoras] = useState(HORAS_NAVEGACION_DIA);
  const [conPatron, setConPatron] = useState(false);

  const desglose = useMemo(
    () =>
      calcularDesglose(tarifa, {
        dias,
        temporada,
        conPatron,
        horasNavegacionDia: horas,
      }),
    [tarifa, dias, temporada, conPatron, horas],
  );

  const etiquetaTemporada = {
    alta: t.reserva.temporadaAlta,
    media: t.reserva.temporadaMedia,
    baja: t.reserva.temporadaBaja,
  }[temporada];

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

      {/* ------------------------------------------------------- controles */}
      <div className="mt-5 space-y-4">
        <Control
          etiqueta={t.reserva.diasAlquiler}
          valor={plural(dias, t.comun.dia, t.comun.dias)}
        >
          <div className="flex items-center gap-2">
            <BotonPaso
              signo="−"
              onClick={() => setDias((d) => Math.max(minimoDias, d - 1))}
              inhabilitado={dias <= minimoDias}
              etiqueta={t.reserva.unDiaMenos}
            />
            <input
              type="range"
              min={minimoDias}
              max={21}
              value={dias}
              onChange={(e) => setDias(Number(e.target.value))}
              className="flex-1 accent-[var(--acento)]"
              aria-label={t.reserva.diasAlquiler}
            />
            <BotonPaso
              signo="+"
              onClick={() => setDias((d) => Math.min(21, d + 1))}
              inhabilitado={dias >= 21}
              etiqueta={t.reserva.unDiaMas}
            />
          </div>
          {minimoDias > 1 && (
            <p className="mt-1.5 text-xs text-texto-tenue">
              {t.reserva.minimoDias(plural(minimoDias, t.comun.dia, t.comun.dias))}
            </p>
          )}
        </Control>

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

      <button
        type="button"
        className="mt-5 w-full rounded-md bg-marca px-5 py-3.5 font-semibold text-fondo transition-opacity hover:opacity-90"
      >
        {reservaInstantanea
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

function BotonPaso({
  signo,
  onClick,
  inhabilitado,
  etiqueta,
}: {
  signo: string;
  onClick: () => void;
  inhabilitado: boolean;
  etiqueta: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={inhabilitado}
      aria-label={etiqueta}
      className="h-8 w-8 shrink-0 rounded-md border border-borde text-texto transition-colors hover:bg-superficie-alt disabled:opacity-35"
    >
      {signo}
    </button>
  );
}
