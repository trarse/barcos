import type { MetadataRoute } from "next";

import { urlAbsoluta } from "@/lib/sitio";

/**
 * No se bloquea a ningún rastreador. Boatjump cierra la puerta a las
 * herramientas de análisis y a los bots de IA, y lo único que consigue es
 * quedarse fuera de donde cada vez más gente busca.
 *
 * Sí se cierran las búsquedas con filtros: son miles de combinaciones del
 * mismo contenido y se comen el presupuesto de rastreo. Las landings de
 * destino y de destino × tipo cubren esas consultas con URL limpias.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*?orden=", "/*?pagina=", "/*?equipo=", "/*?precio="],
      },
    ],
    sitemap: urlAbsoluta("/sitemap.xml"),
    host: urlAbsoluta("/"),
  };
}
