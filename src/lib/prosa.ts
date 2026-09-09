import type { Idioma } from "./idiomas";

/**
 * Resolución de la prosa escrita a mano en el idioma de la página.
 *
 * La regla 2 prohíbe servir texto en otro idioma dentro de una página que
 * declara `hreflang`. Por eso estas funciones NO hacen respaldo al castellano
 * para el texto largo: si la traducción falta, devuelven `null` y la plantilla
 * no pinta el bloque (la página emitirá `noindex`). Solo la descripción corta
 * y el titular conservan el respaldo, porque alimentan el meta y prefieren no
 * ir vacíos.
 */

/** Descripción corta en el idioma de la página. */
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

/** Titular en el idioma de la página. Mismo criterio que la descripción. */
export function titularCorto(
  entidad: { titular: string; titularEn: string | null; titularDe: string | null },
  idioma: Idioma,
): string {
  if (idioma === "en") return entidad.titularEn ?? entidad.titular;
  if (idioma === "de") return entidad.titularDe ?? entidad.titular;
  return entidad.titular;
}

/** Texto largo (guía) en el idioma de la página, o null si no existe. */
export function contenidoEnIdioma(
  entidad: { contenido: string; contenidoEn: string | null; contenidoDe: string | null },
  idioma: Idioma,
): string | null {
  if (idioma === "en") return entidad.contenidoEn;
  if (idioma === "de") return entidad.contenidoDe;
  return entidad.contenido;
}

/** Prosa de la landing «sin licencia» en el idioma de la página, o null. */
export function sinLicenciaEnIdioma(
  entidad: {
    sinLicencia: string | null;
    sinLicenciaEn: string | null;
    sinLicenciaDe: string | null;
  },
  idioma: Idioma,
): string | null {
  if (idioma === "en") return entidad.sinLicenciaEn;
  if (idioma === "de") return entidad.sinLicenciaDe;
  return entidad.sinLicencia;
}

/** Pregunta y respuesta en el idioma de la página, o null si no existe. */
export function preguntaEnIdioma(
  p: {
    pregunta: string;
    respuesta: string;
    preguntaEn: string | null;
    respuestaEn: string | null;
    preguntaDe: string | null;
    respuestaDe: string | null;
  },
  idioma: Idioma,
): { pregunta: string; respuesta: string } | null {
  if (idioma === "en") {
    return p.preguntaEn && p.respuestaEn
      ? { pregunta: p.preguntaEn, respuesta: p.respuestaEn }
      : null;
  }
  if (idioma === "de") {
    return p.preguntaDe && p.respuestaDe
      ? { pregunta: p.preguntaDe, respuesta: p.respuestaDe }
      : null;
  }
  return { pregunta: p.pregunta, respuesta: p.respuesta };
}
