"use client";

import Link from "next/link";

import { MAXIMO, rutaComparativa } from "@/lib/comparador";
import type { Idioma } from "@/lib/idiomas";
import { textos } from "@/lib/textos";

import { quitarBarco, useSeleccion, vaciarSeleccion } from "./almacen";

/**
 * Barra flotante con lo que se lleva seleccionado.
 *
 * Solo aparece cuando hay algo elegido, y avisa de que hace falta un segundo
 * barco en vez de dejar el botón muerto sin explicar por qué.
 */
export function BarraComparar({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma);
  const seleccion = useSeleccion();
  if (seleccion.length === 0) return null;

  const destino = rutaComparativa(seleccion, idioma);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-wrap items-center gap-3 rounded-carta border border-borde-fuerte bg-superficie p-3 shadow-[0_8px_32px_-8px_rgb(var(--sombra)/0.35)]">
        <p className="text-sm font-medium text-texto">
          {t.comparar.barra.deTres(seleccion.length, MAXIMO)}
          <span className="ml-1.5 font-normal text-texto-suave">
            {t.comparar.barra.paraComparar}
          </span>
        </p>

        <ul className="flex flex-1 flex-wrap items-center gap-1.5">
          {seleccion.map((slug) => (
            <li key={slug}>
              <button
                type="button"
                onClick={() => quitarBarco(slug)}
                className="flex items-center gap-1 rounded border border-borde px-2 py-1 text-xs text-texto-suave transition-colors hover:border-acento hover:text-acento"
                aria-label={t.comparar.barra.quitar(nombreCorto(slug))}
              >
                <span className="max-w-32 truncate">{nombreCorto(slug)}</span>
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={vaciarSeleccion}
            className="rounded-md px-2.5 py-2 text-sm text-texto-suave transition-colors hover:text-texto"
          >
            {t.comparar.barra.vaciar}
          </button>

          {destino ? (
            <Link
              href={destino}
              className="rounded-md bg-marca px-4 py-2.5 text-sm font-semibold text-fondo transition-opacity hover:opacity-90"
            >
              {t.comparar.barra.comparar}
            </Link>
          ) : (
            <span className="rounded-md border border-borde px-4 py-2.5 text-sm text-texto-tenue">
              {t.comparar.barra.eligeOtro}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * El slug lleva dentro el modelo y el puerto (`lagoon-42-palma`). Para la
 * pastilla basta con quitar el puerto y devolverle las mayúsculas.
 */
function nombreCorto(slug: string): string {
  return slug
    .split("-")
    .slice(0, 3)
    .join(" ")
    .replace(/^\w/, (c) => c.toUpperCase());
}
