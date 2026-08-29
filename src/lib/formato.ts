/**
 * Formateo en castellano de España: punto para los miles, coma para los
 * decimales y el símbolo detrás. Se centraliza aquí para que un mismo importe
 * no se vea de dos maneras en dos pantallas.
 */

const EUROS_REDONDOS = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const EUROS_EXACTOS = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const DECIMAL = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });

const ENTERO = new Intl.NumberFormat("es-ES");

/** Céntimos a euros sin decimales: 45900 → "459 €". */
export function euro(centimos: number): string {
  return EUROS_REDONDOS.format(centimos / 100);
}

/** Céntimos a euros con decimales: 45912 → "459,12 €". */
export function euroExacto(centimos: number): string {
  return EUROS_EXACTOS.format(centimos / 100);
}

/** Centímetros a metros: 1250 → "12,5 m". */
export function eslora(centimetros: number): string {
  return `${DECIMAL.format(centimetros / 100)} m`;
}

export function entero(valor: number): string {
  return ENTERO.format(valor);
}

/**
 * Redondea a una décima sin el sesgo del binario. `(4.85).toFixed(1)` da
 * "4.8" porque el double más cercano a 4,85 queda justo por debajo; se
 * escala y se redondea sobre el entero para que 4,85 suba a 4,9.
 */
export function aDecima(valor: number): number {
  return Math.round(Number((valor * 10).toFixed(6))) / 10;
}

/** Valoración con un decimal siempre: 4 → "4,0". */
export function valoracion(nota: number): string {
  return aDecima(nota).toFixed(1).replace(".", ",");
}

/** Concuerda un sustantivo con su número: (1, "día", "días") → "1 día". */
export function plural(n: number, singular: string, plural_: string): string {
  return `${ENTERO.format(n)} ${n === 1 ? singular : plural_}`;
}

/**
 * Fechas.
 *
 * Los importes se dejan siempre en formato español porque la moneda es el
 * euro y el sitio factura en España, pero las fechas sí siguen al idioma: un
 * lector alemán espera "14. August 2026", no "14 de agosto de 2026".
 */

/** Fecha larga: "14 de agosto de 2026", "14 August 2026", "14. August 2026". */
export function fechaLarga(fecha: Date, idioma = "es"): string {
  return new Intl.DateTimeFormat(idioma, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

/** Fecha corta para las opiniones: "ago 2026". */
export function mesYAno(fecha: Date, idioma = "es"): string {
  return new Intl.DateTimeFormat(idioma, {
    month: "short",
    year: "numeric",
  }).format(fecha);
}

/**
 * Convierte un texto a slug apto para URL: sin tildes, sin eñes rotas y sin
 * signos. "Sant Antoni de Portmany" → "sant-antoni-de-portmany".
 */
export function aSlug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
