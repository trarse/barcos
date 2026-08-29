import Link from "next/link";

import type { BarcoResumen } from "@/lib/consultas";
import { entero, eslora, euro } from "@/lib/formato";
import type { Idioma } from "@/lib/idiomas";
import { ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

import { BotonComparar } from "./comparador/boton-comparar";
import { Estrellas } from "./estrellas";
import { FotoBarco } from "./foto-barco";

/**
 * Tarjeta de resultado.
 *
 * El precio grande es el total con todo dentro, y justo debajo se enseña de
 * qué se compone. Es deliberado: la competencia pone ahí la tarifa base y por
 * eso el usuario llega al pago con una cifra distinta de la que buscó.
 */
export function TarjetaBarco({
  barco,
  idioma,
  prioridad = false,
}: {
  barco: BarcoResumen;
  idioma: Idioma;
  prioridad?: boolean;
}) {
  const t = textos(idioma);
  const extras = barco.precioDia - barco.precioBaseDia;
  const tipoNombre =
    t.tiposBarcoSingular[barco.tipoSlug as keyof typeof t.tiposBarcoSingular] ??
    barco.tipoNombre;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-carta border border-borde bg-superficie transition-shadow hover:shadow-[0_2px_20px_-4px_rgb(var(--sombra)/0.18)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-superficie-alt">
        <FotoBarco
          token={barco.imagen}
          alt={`${barco.nombre} · ${barco.puertoNombre}`}
          prioridad={prioridad}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />

        <div className="absolute left-3 top-3 flex max-w-[60%] flex-wrap gap-1.5">
          {!barco.requiereTitulacion && (
            <Etiqueta tono="acento">{t.comun.sinLicencia}</Etiqueta>
          )}
          {barco.reservaInstantanea && (
            <Etiqueta tono="exito">{t.comun.reservaInmediata}</Etiqueta>
          )}
        </div>

        <div className="absolute right-3 top-3">
          <BotonComparar slug={barco.slug} nombre={barco.nombre} idioma={idioma} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-texto-tenue">
          {tipoNombre} · {barco.destinoNombre}
        </p>

        <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-texto">
          <Link
            href={ruta({ tipo: "barco", slug: barco.slug }, idioma)}
            className="after:absolute after:inset-0"
          >
            {barco.nombre}
          </Link>
        </h3>

        <div className="mt-1.5">
          <Estrellas nota={barco.valoracion} opiniones={barco.opiniones} idioma={idioma} />
        </div>

        <p className="mt-2 text-sm text-texto-suave">
          {entero(barco.capacidad)} {t.comun.plazas} · {eslora(barco.esloraCm)}
          {barco.camarotes > 0 &&
            ` · ${entero(barco.camarotes)} ${t.comun.camarotes}`}
        </p>

        <p className="mt-1 text-sm text-texto-tenue">{barco.puertoNombre}</p>

        <div className="isobata mt-3.5" />

        <div className="mt-3">
          <p className="flex items-baseline gap-1.5">
            <span className="cifra font-display text-2xl font-semibold text-texto">
              {euro(barco.precioDia)}
            </span>
            <span className="text-sm text-texto-suave">{t.comun.alDia}</span>
          </p>
          <p className="mt-0.5 text-xs font-medium text-exito">{t.comun.sinExtras}</p>
          <p className="cifra mt-1.5 text-xs leading-relaxed text-texto-tenue">
            {t.tarjeta.desglose(euro(barco.precioBaseDia), euro(extras))}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Etiqueta({
  children,
  tono = "neutro",
}: {
  children: React.ReactNode;
  tono?: "neutro" | "acento" | "exito";
}) {
  const tonos = {
    neutro: "bg-superficie text-texto border-borde",
    acento: "bg-acento text-white border-transparent",
    exito: "bg-exito text-white border-transparent",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tonos[tono]}`}
    >
      {children}
    </span>
  );
}
