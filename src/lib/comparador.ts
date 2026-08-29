/**
 * Comparador de barcos.
 *
 * Ninguna plataforma del sector deja poner dos barcos uno al lado del otro:
 * el usuario acaba abriendo pestañas y comparando de memoria. Aquí la
 * selección vive en la URL, así que una comparativa se puede mandar por
 * WhatsApp y abrirse igual al otro lado.
 *
 * Todo este módulo es puro: entra texto, salen datos validados.
 */

import type { Idioma } from "./idiomas";
import { ruta } from "./rutas";

/** Más de tres columnas no caben en una pantalla de móvil sin marearse. */
export const MAXIMO = 3;

/** Interpreta el parámetro `barcos=a,b,c`. Descarta vacíos y repetidos. */
export function leerSeleccion(valor: string | null | undefined): string[] {
  if (!valor) return [];
  return [
    ...new Set(
      valor
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ].slice(0, MAXIMO);
}

export function escribirSeleccion(slugs: readonly string[]): string {
  return slugs.slice(0, MAXIMO).join(",");
}

/**
 * Añade o quita un barco. Al llegar al tope no se ignora la pulsación: se
 * desplaza el más antiguo, que es lo que espera quien está comparando y
 * quiere cambiar un candidato por otro.
 */
export function alternar(seleccion: readonly string[], slug: string): string[] {
  if (seleccion.includes(slug)) {
    return seleccion.filter((s) => s !== slug);
  }
  const siguiente = [...seleccion, slug];
  return siguiente.slice(-MAXIMO);
}

export function estaLleno(seleccion: readonly string[]): boolean {
  return seleccion.length >= MAXIMO;
}

/** Enlace a la comparativa. `null` si no hay al menos dos barcos que comparar. */
export function rutaComparativa(
  seleccion: readonly string[],
  idioma: Idioma,
): string | null {
  if (seleccion.length < 2) return null;
  return `${ruta({ tipo: "comparar" }, idioma)}?barcos=${escribirSeleccion(seleccion)}`;
}

// ---------------------------------------------------------------- la tabla

export type Mejor = "menor" | "mayor" | "ninguno";

export interface Fila {
  etiqueta: string;
  /** Un valor por barco, ya formateado para pintar. */
  valores: string[];
  /** El valor bruto, para decidir quién gana. `null` si no aplica. */
  brutos: (number | null)[];
  /** Qué extremo es el bueno en esta fila. */
  mejor: Mejor;
  /** Índices de los barcos que ganan la fila. Vacío si todos empatan. */
  ganadores: number[];
  /** Si hay algo que distinga a unos de otros. */
  hayDiferencia: boolean;
}

/**
 * Marca quién gana cada fila y si la fila aporta algo.
 *
 * Una fila donde los tres barcos valen lo mismo no ayuda a decidir, y por eso
 * se puede plegar: comparar es mirar las diferencias, no leerlo todo.
 */
export function resolverFila(
  etiqueta: string,
  valores: string[],
  brutos: (number | null)[],
  mejor: Mejor,
): Fila {
  const hayDiferencia = new Set(valores).size > 1;

  let ganadores: number[] = [];
  if (mejor !== "ninguno" && hayDiferencia) {
    const validos = brutos.filter((b): b is number => b !== null);
    if (validos.length > 1) {
      const objetivo =
        mejor === "menor" ? Math.min(...validos) : Math.max(...validos);
      ganadores = brutos
        .map((b, i) => (b === objetivo ? i : -1))
        .filter((i) => i >= 0);
      // Si ganan todos, no gana nadie.
      if (ganadores.length === brutos.length) ganadores = [];
    }
  }

  return { etiqueta, valores, brutos, mejor, ganadores, hayDiferencia };
}

/**
 * Cruza el equipamiento de varios barcos: devuelve cada pieza que aparece en
 * al menos uno, con qué barcos la llevan. Lo interesante de comparar
 * equipamiento es justo lo que le falta a uno y el otro sí tiene.
 */
export function cruzarEquipamiento(
  equipamientos: readonly { slug: string; nombre: string }[][],
): { slug: string; nombre: string; tienen: boolean[]; hayDiferencia: boolean }[] {
  const nombres = new Map<string, string>();
  for (const lista of equipamientos) {
    for (const pieza of lista) nombres.set(pieza.slug, pieza.nombre);
  }

  return [...nombres.entries()]
    .map(([slug, nombre]) => {
      const tienen = equipamientos.map((lista) =>
        lista.some((p) => p.slug === slug),
      );
      return {
        slug,
        nombre,
        tienen,
        hayDiferencia: new Set(tienen).size > 1,
      };
    })
    .sort((a, b) => {
      // Primero lo que diferencia, que es lo que se está mirando.
      if (a.hayDiferencia !== b.hayDiferencia) return a.hayDiferencia ? -1 : 1;
      return a.nombre.localeCompare(b.nombre, "es");
    });
}
