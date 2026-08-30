import { IDIOMAS_ARTICULO, IDIOMAS_GUIA, IDIOMAS_OCASION } from "@/datos/disponibilidad";
import { obtenerArticulo } from "@/datos/blog";
import { obtenerGuia } from "@/datos/guias";
import { obtenerOcasion } from "@/datos/ocasiones";
import type { Idioma } from "@/lib/idiomas";
import type { Pagina } from "@/lib/rutas";

/**
 * Filtra los enlaces relacionados de una pieza de contenido.
 *
 * Con la publicación programada, un texto escrito hoy puede enlazar a otro que
 * todavía no ha salido. Ese enlace apuntaría a un 404 hasta que llegue su
 * fecha, y ensuciar el rastreo con enlaces internos rotos es de las pocas
 * cosas que hacen daño sin dar ninguna señal.
 *
 * El enlace no se borra del contenido: simplemente no se pinta hasta que su
 * destino existe, y aparece solo el día que se publica.
 */
export function enlacesVivos(
  enlaces: { texto: string; pagina: Pagina }[],
  idioma: Idioma,
): { texto: string; pagina: Pagina }[] {
  return enlaces.filter(({ pagina }) => {
    switch (pagina.tipo) {
      case "guia":
        return Boolean(obtenerGuia(pagina.slug, idioma)) && (IDIOMAS_GUIA[pagina.slug] ?? []).includes(idioma);
      case "ocasion":
        return (
          Boolean(obtenerOcasion(pagina.slug, idioma)) &&
          (IDIOMAS_OCASION[pagina.slug] ?? []).includes(idioma)
        );
      case "articulo":
        return (
          Boolean(obtenerArticulo(pagina.slug, idioma)) &&
          (IDIOMAS_ARTICULO[pagina.slug] ?? []).includes(idioma)
        );
      default:
        // Destinos, lugares y páginas fijas existen siempre en los tres idiomas.
        return true;
    }
  });
}
