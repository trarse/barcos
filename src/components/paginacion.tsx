import Link from "next/link";

import { escribirFiltros, type Filtros } from "@/lib/filtros";

/**
 * Paginación por enlaces reales.
 *
 * Cada página es un `<a href>` con su query, no un botón: así el buscador
 * puede rastrear el catálogo entero y el usuario puede abrir en otra pestaña.
 */
export function Paginacion({
  filtros,
  paginas,
  base,
}: {
  filtros: Filtros;
  paginas: number;
  base: string;
}) {
  if (paginas <= 1) return null;

  const actual = Math.min(Math.max(1, filtros.pagina), paginas);
  const numeros = ventana(actual, paginas);

  const enlace = (pagina: number) => {
    const query = escribirFiltros({ ...filtros, pagina });
    return query ? `${base}?${query}` : base;
  };

  return (
    <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-1.5">
      {actual > 1 && (
        <Link
          href={enlace(actual - 1)}
          rel="prev"
          className="rounded-md border border-borde px-3 py-2 text-sm font-medium text-texto transition-colors hover:bg-superficie-alt"
        >
          Anterior
        </Link>
      )}

      {numeros.map((n, i) =>
        n === null ? (
          <span key={`hueco-${i}`} className="px-2 text-texto-tenue" aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={n}
            href={enlace(n)}
            aria-current={n === actual ? "page" : undefined}
            className={`cifra min-w-10 rounded-md border px-3 py-2 text-center text-sm font-medium transition-colors ${
              n === actual
                ? "border-marca bg-marca text-fondo"
                : "border-borde text-texto hover:bg-superficie-alt"
            }`}
          >
            {n}
          </Link>
        ),
      )}

      {actual < paginas && (
        <Link
          href={enlace(actual + 1)}
          rel="next"
          className="rounded-md border border-borde px-3 py-2 text-sm font-medium text-texto transition-colors hover:bg-superficie-alt"
        >
          Siguiente
        </Link>
      )}
    </nav>
  );
}

/**
 * Números a mostrar: siempre la primera, la última y las vecinas de la actual.
 * `null` marca dónde va un salto.
 */
export function ventana(actual: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const cerca = new Set([1, total, actual, actual - 1, actual + 1]);
  if (actual <= 3) [2, 3, 4].forEach((n) => cerca.add(n));
  if (actual >= total - 2) [total - 3, total - 2, total - 1].forEach((n) => cerca.add(n));

  const paginas = [...cerca]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);

  const salida: (number | null)[] = [];
  let anterior = 0;
  for (const n of paginas) {
    if (anterior && n - anterior > 1) salida.push(null);
    salida.push(n);
    anterior = n;
  }
  return salida;
}
