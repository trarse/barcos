import { IDIOMAS_GUIA, IDIOMAS_OCASION } from "@/datos/disponibilidad";
import { obtenerGuia } from "@/datos/guias";
import { obtenerOcasion } from "@/datos/ocasiones";
import { obtenerArticulo } from "@/lib/blog";
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
export async function enlacesVivos(
  enlaces: { texto: string; pagina: Pagina }[],
  idioma: Idioma,
): Promise<{ texto: string; pagina: Pagina }[]> {
  const resueltos = await Promise.all(
    enlaces.map(async (enlace): Promise<{ texto: string; pagina: Pagina } | null> => {
      const { pagina } = enlace;
      switch (pagina.tipo) {
        case "guia":
          return Boolean(obtenerGuia(pagina.slug, idioma)) &&
            (IDIOMAS_GUIA[pagina.slug] ?? []).includes(idioma)
            ? enlace
            : null;
        case "ocasion":
          return Boolean(obtenerOcasion(pagina.slug, idioma)) &&
            (IDIOMAS_OCASION[pagina.slug] ?? []).includes(idioma)
            ? enlace
            : null;
        case "articulo":
          // El artículo vive en la base; la consulta ya filtra idioma y
          // publicación programada.
          return (await obtenerArticulo(pagina.slug, idioma)) ? enlace : null;
        default:
          // Destinos, lugares y páginas fijas existen siempre en los tres idiomas.
          return enlace;
      }
    }),
  );

  return resueltos.filter(
    (e): e is { texto: string; pagina: Pagina } => e !== null,
  );
}
