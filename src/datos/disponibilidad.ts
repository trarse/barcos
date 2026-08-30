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
  "que-titulacion-necesito-para-llevar-un-barco": ["es"],
  "contrato-de-alquiler-de-embarcacion": ["es"],
  "cuanto-puede-ganar-tu-barco": ["es"],
};

export const IDIOMAS_ARTICULO: Record<string, Idioma[]> = {
  "que-hacer-si-aparecen-delfines": ["es"],
  "cruzarse-con-un-crucero-canal-de-puerto": ["es"],
  "posidonia-tabarca-por-que-el-agua-es-asi": ["es"],
  "cuanto-cuesta-alquilar-un-barco-en-espana": ["es"],
};
