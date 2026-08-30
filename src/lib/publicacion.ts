/**
 * Publicación programada.
 *
 * Un contenido puede llevar `publicaDesde`. Hasta esa fecha no se pinta, no
 * aparece en los índices y no entra en el sitemap: para el mundo no existe.
 *
 * Sirve para lo que el calendario editorial necesita de verdad: escribir doce
 * piezas en enero y que salgan una por semana sin que nadie tenga que
 * acordarse. Publicar veinte páginas el mismo día es además el patrón que peor
 * se lee desde fuera; goteo constante es lo que hace un sitio vivo.
 *
 * Sin `publicaDesde`, publicado. Así el contenido antiguo no cambia de
 * comportamiento por existir este mecanismo.
 */

export interface Programable {
  /** Fecha ISO (AAAA-MM-DD) a partir de la cual el contenido es público. */
  publicaDesde?: string;
}

/** Si un contenido ya debe verse. La comparación es por día, no por hora. */
export function estaPublicado(item: Programable, ahora = new Date()): boolean {
  if (!item.publicaDesde) return true;

  const fecha = new Date(`${item.publicaDesde}T00:00:00Z`);
  if (Number.isNaN(fecha.getTime())) {
    // Una fecha ilegible no debe esconder contenido en silencio: se publica y
    // que se vea el fallo, que es menos malo que una página que desaparece.
    return true;
  }

  const hoy = new Date(
    Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate()),
  );
  return fecha.getTime() <= hoy.getTime();
}

/** Filtra una lista dejando solo lo ya publicado. */
export function soloPublicados<T extends Programable>(items: T[], ahora = new Date()): T[] {
  return items.filter((item) => estaPublicado(item, ahora));
}
