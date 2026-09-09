/**
 * En qué idiomas existe cada contenido editorial.
 *
 * Vive aparte de `guias.ts` y `blog.ts` a propósito: el selector de idioma es
 * un componente de cliente y sirve para todas las páginas, así que importar
 * ahí los ficheros de contenido mandaría al navegador el cuerpo entero de
 * cada guía solo para saber si existe en inglés.
 *
 * El precio de esta separación es que se puede desincronizar, así que hay un
 * test que compara este mapa con el contenido real y falla si no cuadran.
 */

import type { Idioma } from "@/lib/idiomas";

export const IDIOMAS_GUIA: Record<string, Idioma[]> = {
  "licencia-de-navegacion-que-te-ensenan": ["es", "en", "de"],
  "que-titulacion-necesito-para-llevar-un-barco": ["es", "en", "de"],
  "contrato-de-alquiler-de-embarcacion": ["es", "en", "de"],
  "cuanto-puede-ganar-tu-barco": ["es", "en", "de"],
};

export const IDIOMAS_ARTICULO: Record<string, Idioma[]> = {
  "que-hacer-si-aparecen-delfines": ["es", "en", "de"],
  "cruzarse-con-un-crucero-canal-de-puerto": ["es", "en", "de"],
  "posidonia-tabarca-por-que-el-agua-es-asi": ["es", "en", "de"],
  "cuanto-cuesta-alquilar-un-barco-en-espana": ["es", "en", "de"],
};

export const IDIOMAS_OCASION: Record<string, Idioma[]> = {
  despedidas: ["es", "en", "de"],
  cumpleanos: ["es", "en", "de"],
  "eventos-de-empresa": ["es", "en", "de"],
  "pedidas-y-bodas": ["es", "en", "de"],
};
