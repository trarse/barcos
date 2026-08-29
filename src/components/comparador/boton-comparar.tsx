"use client";

import { estaLleno } from "@/lib/comparador";

import { alternarBarco, useSeleccion } from "./almacen";

/**
 * Casilla de comparar que va sobre la ilustración de cada tarjeta.
 *
 * Se apoya en `z-10` porque el título de la tarjeta lleva un enlace que cubre
 * toda la superficie: sin eso, pulsar aquí abriría la ficha.
 */
export function BotonComparar({ slug, nombre }: { slug: string; nombre: string }) {
  const seleccion = useSeleccion();
  const marcado = seleccion.includes(slug);
  const lleno = estaLleno(seleccion);

  return (
    <label
      className={`relative z-10 flex cursor-pointer items-center gap-1.5 rounded border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm transition-colors ${
        marcado
          ? "border-transparent bg-acento text-white"
          : "border-borde bg-superficie/90 text-texto-suave hover:text-texto"
      }`}
      title={
        lleno && !marcado
          ? "Se quitará el primero que elegiste"
          : "Comparar este barco con otros"
      }
    >
      <input
        type="checkbox"
        checked={marcado}
        onChange={() => alternarBarco(slug)}
        className="h-3.5 w-3.5 accent-[var(--acento)]"
      />
      Comparar
      <span className="sr-only">{nombre}</span>
    </label>
  );
}
