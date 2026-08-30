/**
 * La regla de indexación, en un solo sitio.
 *
 * Una landing programática solo entra al índice si tiene flota suficiente y
 * texto propio. Si no, emite `noindex, follow`: la página existe y se puede
 * enlazar, pero no se ofrece al buscador. El `follow` es para que el rastreo
 * siga hasta las fichas de los barcos.
 *
 * Vivía duplicada en tres ficheros —la plantilla «sin licencia», la de lugar
 * y el sitemap— y las tres copias se desincronizaron: el sitemap la aplicaba
 * en castellano y luego declaraba las tres versiones de idioma, así que
 * ofrecía al buscador 36 URL que ellas mismas decían `noindex`. Mandarle dos
 * órdenes opuestas sobre la misma URL no cuesta esa página: cuesta la
 * confianza en el sitemap entero.
 *
 * Los umbrales no se bajan. Si un texto se queda a 245 palabras, se alarga el
 * texto.
 */

import { esIdioma, type Idioma } from "./idiomas";

export const MINIMO_BARCOS = 6;
export const MINIMO_PALABRAS = 250;

/** Palabras de un texto. Vacío o ausente cuenta cero, no falla. */
export function palabras(texto: string | null | undefined): number {
  if (!texto) return 0;
  return texto.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * En qué idiomas entra al índice una landing con texto escrito a mano.
 *
 * La respuesta es una lista y no un sí o un no porque la prosa está escrita
 * en un idioma concreto y no se traduce sola. En los demás idiomas la página
 * existe —el buscador, los filtros y las fichas sí están traducidos— pero se
 * queda sin texto propio, así que no llega al umbral.
 *
 * `barcos` se omite en las páginas que no listan flota, como los destinos con
 * nombre propio: ahí la regla es solo la del texto.
 */
export function idiomasIndexables(entrada: {
  prosa: string | null | undefined;
  idiomaProsa: string;
  barcos?: number;
}): Idioma[] {
  if (entrada.barcos !== undefined && entrada.barcos < MINIMO_BARCOS) return [];
  if (!esIdioma(entrada.idiomaProsa)) return [];
  if (palabras(entrada.prosa) < MINIMO_PALABRAS) return [];
  return [entrada.idiomaProsa];
}

/** La misma regla vista desde una página concreta. */
export function esIndexable(
  idioma: Idioma,
  entrada: { prosa: string | null | undefined; idiomaProsa: string; barcos?: number },
): boolean {
  return idiomasIndexables(entrada).includes(idioma);
}
