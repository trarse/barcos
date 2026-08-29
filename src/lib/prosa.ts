import type { Idioma } from "./idiomas";

/**
 * Descripción corta en el idioma de la página.
 *
 * Alimenta el `meta description`, que es el texto que Google enseña en el
 * resultado: servirlo en otro idioma es tirar el clic del que ya te encontró.
 * El respaldo al castellano solo actúa si falta la traducción, y la semilla
 * las trae todas: es un cinturón, no un plan.
 */
export function descripcionCorta(
  entidad: {
    descripcion: string;
    descripcionEn: string | null;
    descripcionDe: string | null;
  },
  idioma: Idioma,
): string {
  if (idioma === "en") return entidad.descripcionEn ?? entidad.descripcion;
  if (idioma === "de") return entidad.descripcionDe ?? entidad.descripcion;
  return entidad.descripcion;
}
