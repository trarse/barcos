"use client";

import { useSyncExternalStore } from "react";

import { alternar, escribirSeleccion, leerSeleccion } from "@/lib/comparador";

/**
 * Almacén de la selección del comparador.
 *
 * Es un store externo mínimo consumido con `useSyncExternalStore`, que es la
 * API que React tiene justo para esto. La alternativa —leer localStorage en un
 * efecto y copiarlo al estado— provoca un render en cascada y un desajuste de
 * hidratación; aquí React usa la instantánea del servidor mientras hidrata y
 * cambia a la del cliente después, sin parpadeo ni aviso en consola.
 */

const CLAVE = "comparar";

/** Referencia estable: si `getSnapshot` devuelve un array nuevo cada vez, React entra en bucle. */
const VACIO: readonly string[] = Object.freeze([]);

let seleccion: readonly string[] = VACIO;
const oyentes = new Set<() => void>();

// El módulo se evalúa en el navegador antes del primer render del cliente.
if (typeof window !== "undefined") {
  try {
    const guardado = leerSeleccion(window.localStorage.getItem(CLAVE));
    if (guardado.length > 0) seleccion = Object.freeze(guardado);
  } catch {
    // Navegación privada o almacenamiento bloqueado: se empieza en blanco.
  }
}

function emitir() {
  for (const oyente of oyentes) oyente();
}

function guardar() {
  try {
    if (seleccion.length === 0) {
      window.localStorage.removeItem(CLAVE);
    } else {
      window.localStorage.setItem(CLAVE, escribirSeleccion(seleccion));
    }
  } catch {
    // Si no se puede guardar, la selección vale para esta sesión y ya está.
  }
}

function suscribir(oyente: () => void) {
  oyentes.add(oyente);
  return () => {
    oyentes.delete(oyente);
  };
}

function instantanea(): readonly string[] {
  return seleccion;
}

/** Durante el render del servidor y la hidratación no hay nada seleccionado. */
function instantaneaServidor(): readonly string[] {
  return VACIO;
}

export function useSeleccion(): readonly string[] {
  return useSyncExternalStore(suscribir, instantanea, instantaneaServidor);
}

export function alternarBarco(slug: string) {
  seleccion = Object.freeze(alternar(seleccion, slug));
  guardar();
  emitir();
}

export function quitarBarco(slug: string) {
  if (!seleccion.includes(slug)) return;
  seleccion = Object.freeze(seleccion.filter((s) => s !== slug));
  guardar();
  emitir();
}

export function vaciarSeleccion() {
  if (seleccion.length === 0) return;
  seleccion = VACIO;
  guardar();
  emitir();
}
