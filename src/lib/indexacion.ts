/**
 * La regla de indexación, en un solo sitio.
 *
 * Una landing programática solo entra al índice si tiene flota suficiente y
 * texto propio. Si no, emite `noindex, follow`: la página existe y se puede
 * enlazar, pero no se ofrece al buscador. El `follow` es para que el rastreo
 * siga hasta las fichas de los barcos.
 *
 * Desde que la prosa vive en columnas por idioma, la regla cuenta palabras
 * POR IDIOMA: cada versión de la landing tiene su propio texto y su propia
 * decisión de indexarse. Los umbrales no se bajan. Si un texto se queda a
 * 245 palabras, se alarga el texto.
 */

import { IDIOMAS, type Idioma } from "./idiomas";

export const MINIMO_BARCOS = 6;
export const MINIMO_PALABRAS = 250;

/** Palabras de un texto. Vacío o ausente cuenta cero, no falla. */
export function palabras(texto: string | null | undefined): number {
  if (!texto) return 0;
  return texto.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * En qué idiomas entra al índice una landing con prosa por idioma.
 *
 * La respuesta es una lista porque cada idioma tiene su propio texto. Un
 * idioma sin columna de prosa (o con menos de 250 palabras) se queda fuera:
 * la página existe, pero emite `noindex`.
 *
 * `barcos` se omite en las páginas que no listan flota, como los destinos con
 * nombre propio: ahí la regla es solo la del texto.
 */
export function idiomasIndexables(entrada: {
  prosa: Partial<Record<Idioma, string | null | undefined>>;
  barcos?: number;
}): Idioma[] {
  if (entrada.barcos !== undefined && entrada.barcos < MINIMO_BARCOS) return [];
  return IDIOMAS.filter((idioma) => palabras(entrada.prosa[idioma]) >= MINIMO_PALABRAS);
}

/** La misma regla vista desde una página concreta. */
export function esIndexable(
  idioma: Idioma,
  entrada: { prosa: Partial<Record<Idioma, string | null | undefined>>; barcos?: number },
): boolean {
  return idiomasIndexables(entrada).includes(idioma);
}
