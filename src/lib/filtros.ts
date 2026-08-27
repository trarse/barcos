/**
 * Lectura y escritura de los filtros de búsqueda.
 *
 * Los filtros viven en la query string porque una búsqueda tiene que poder
 * compartirse por WhatsApp y volver exactamente igual. Todo lo de este módulo
 * es puro: entra `URLSearchParams`, sale un objeto validado.
 */

export type Orden = "recomendados" | "precio-asc" | "precio-desc" | "valoracion";

export const ORDENES: { valor: Orden; texto: string }[] = [
  { valor: "recomendados", texto: "Recomendados" },
  { valor: "precio-asc", texto: "Precio: más bajo primero" },
  { valor: "precio-desc", texto: "Precio: más alto primero" },
  { valor: "valoracion", texto: "Mejor valorados" },
];

export interface Filtros {
  destino: string | null;
  tipo: string | null;
  capacidadMinima: number | null;
  /** Tope de precio por día con todo incluido, en céntimos. */
  precioMaximo: number | null;
  sinLicencia: boolean;
  conPatron: boolean;
  reservaInstantanea: boolean;
  equipamiento: string[];
  orden: Orden;
  pagina: number;
}

export const FILTROS_VACIOS: Filtros = {
  destino: null,
  tipo: null,
  capacidadMinima: null,
  precioMaximo: null,
  sinLicencia: false,
  conPatron: false,
  reservaInstantanea: false,
  equipamiento: [],
  orden: "recomendados",
  pagina: 1,
};

export const POR_PAGINA = 12;

/**
 * Normaliza el `searchParams` que entrega Next —un objeto con valores sueltos
 * o repetidos— a `URLSearchParams`, para que `leerFiltros` siga siendo el
 * único sitio del código que sabe interpretar una query.
 */
export function aParams(
  entrada: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [clave, valor] of Object.entries(entrada)) {
    if (valor === undefined) continue;
    if (Array.isArray(valor)) {
      for (const v of valor) params.append(clave, v);
    } else {
      params.append(clave, valor);
    }
  }
  return params;
}

/** Interpreta la query string. Todo lo que no se entienda se ignora. */
export function leerFiltros(params: URLSearchParams): Filtros {
  return {
    destino: texto(params.get("destino")),
    tipo: texto(params.get("tipo")),
    capacidadMinima: enteroPositivo(params.get("capacidad")),
    precioMaximo: enteroPositivo(params.get("precio")),
    sinLicencia: params.get("sin-licencia") === "1",
    conPatron: params.get("patron") === "1",
    reservaInstantanea: params.get("instantanea") === "1",
    // Se aceptan las dos formas: "equipo=gps,nevera" (la que escribimos, más
    // corta) y "equipo=gps&equipo=nevera" (la que produce un formulario con
    // varias casillas del mismo nombre).
    equipamiento: [
      ...new Set(
        params
          .getAll("equipo")
          .flatMap((valor) => valor.split(","))
          .map((e) => e.trim())
          .filter(Boolean),
      ),
    ],
    orden: esOrden(params.get("orden")) ? (params.get("orden") as Orden) : "recomendados",
    pagina: enteroPositivo(params.get("pagina")) ?? 1,
  };
}

/**
 * Vuelve a la query string omitiendo lo que esté en su valor por defecto, para
 * que las URL queden cortas y no se generen duplicados de la misma búsqueda.
 */
export function escribirFiltros(filtros: Filtros): string {
  const params = new URLSearchParams();

  if (filtros.destino) params.set("destino", filtros.destino);
  if (filtros.tipo) params.set("tipo", filtros.tipo);
  if (filtros.capacidadMinima) params.set("capacidad", String(filtros.capacidadMinima));
  if (filtros.precioMaximo) params.set("precio", String(filtros.precioMaximo));
  if (filtros.sinLicencia) params.set("sin-licencia", "1");
  if (filtros.conPatron) params.set("patron", "1");
  if (filtros.reservaInstantanea) params.set("instantanea", "1");
  if (filtros.equipamiento.length > 0) params.set("equipo", filtros.equipamiento.join(","));
  if (filtros.orden !== "recomendados") params.set("orden", filtros.orden);
  if (filtros.pagina > 1) params.set("pagina", String(filtros.pagina));

  return params.toString();
}

/** Cuántos filtros ha tocado el usuario, para el contador del botón en móvil. */
export function contarActivos(filtros: Filtros): number {
  let n = 0;
  if (filtros.tipo) n++;
  if (filtros.capacidadMinima) n++;
  if (filtros.precioMaximo) n++;
  if (filtros.sinLicencia) n++;
  if (filtros.conPatron) n++;
  if (filtros.reservaInstantanea) n++;
  n += filtros.equipamiento.length;
  return n;
}

/** Alterna un elemento de equipamiento y vuelve a la primera página. */
export function alternarEquipamiento(filtros: Filtros, slug: string): Filtros {
  const puesto = filtros.equipamiento.includes(slug);
  return {
    ...filtros,
    equipamiento: puesto
      ? filtros.equipamiento.filter((e) => e !== slug)
      : [...filtros.equipamiento, slug],
    pagina: 1,
  };
}

/**
 * Cambiar cualquier filtro devuelve al usuario a la página 1: quedarse en la
 * 4 tras estrechar la búsqueda es el clásico "no hay resultados" falso.
 */
export function aplicar(filtros: Filtros, cambio: Partial<Filtros>): Filtros {
  const tocaPaginacion = "pagina" in cambio;
  return { ...filtros, ...cambio, pagina: tocaPaginacion ? cambio.pagina! : 1 };
}

/** Total de páginas para un número de resultados. */
export function totalPaginas(resultados: number): number {
  return Math.max(1, Math.ceil(resultados / POR_PAGINA));
}

/** Rango `[desde, hasta)` de resultados que toca a una página. */
export function rangoDePagina(pagina: number): [number, number] {
  const desde = (Math.max(1, pagina) - 1) * POR_PAGINA;
  return [desde, desde + POR_PAGINA];
}

/**
 * Ordena índices de resultados según el criterio elegido. Se trabaja con una
 * copia: ordenar la lista original en sitio rompe la caché de React.
 */
export function ordenar<T extends { precioDia: number; valoracion: number; opiniones: number }>(
  barcos: readonly T[],
  orden: Orden,
): T[] {
  const copia = [...barcos];
  switch (orden) {
    case "precio-asc":
      return copia.sort((a, b) => a.precioDia - b.precioDia);
    case "precio-desc":
      return copia.sort((a, b) => b.precioDia - a.precioDia);
    case "valoracion":
      return copia.sort((a, b) => b.valoracion - a.valoracion || b.opiniones - a.opiniones);
    default:
      // Recomendados: nota y volumen de opiniones pesan por igual frente al
      // precio, para que no gane siempre el barco más barato sin reseñas.
      return copia.sort(
        (a, b) => puntuar(b) - puntuar(a) || a.precioDia - b.precioDia,
      );
  }
}

function puntuar(b: { valoracion: number; opiniones: number }): number {
  return b.valoracion * Math.log10(b.opiniones + 10);
}

function texto(valor: string | null): string | null {
  const limpio = valor?.trim();
  return limpio ? limpio : null;
}

function enteroPositivo(valor: string | null): number | null {
  if (!valor) return null;
  const n = Number.parseInt(valor, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function esOrden(valor: string | null): boolean {
  return ORDENES.some((o) => o.valor === valor);
}
