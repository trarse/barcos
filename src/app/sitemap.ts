import type { MetadataRoute } from "next";

import {
  listarDestinos,
  listarExperiencias,
  listarTipos,
  paresDestinoTipo,
  slugsDeBarcos,
} from "@/lib/consultas";
import { ARTICULOS } from "@/datos/blog";
import { rutas } from "@/lib/seo";
import { urlAbsoluta } from "@/lib/sitio";

/**
 * Mapa del sitio.
 *
 * Se genera desde la base, así que publicar un barco nuevo lo mete solo. Las
 * prioridades no son decorativas: reflejan qué páginas queremos que se
 * rastreen antes cuando el presupuesto de rastreo es limitado.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinos, tipos, pares, barcos, experiencias] = await Promise.all([
    listarDestinos(),
    listarTipos(),
    paresDestinoTipo(),
    slugsDeBarcos(),
    listarExperiencias(),
  ]);

  const ahora = new Date();

  const estaticas: MetadataRoute.Sitemap = [
    { url: urlAbsoluta(rutas.home()), changeFrequency: "daily", priority: 1 },
    { url: urlAbsoluta(rutas.busqueda()), changeFrequency: "daily", priority: 0.9 },
    { url: urlAbsoluta(rutas.sinLicencia()), changeFrequency: "weekly", priority: 0.8 },
    { url: urlAbsoluta(rutas.experiencias()), changeFrequency: "weekly", priority: 0.7 },
    { url: urlAbsoluta(rutas.blog()), changeFrequency: "weekly", priority: 0.6 },
    { url: urlAbsoluta("/como-funciona"), changeFrequency: "monthly", priority: 0.4 },
    { url: urlAbsoluta("/registrar-barco"), changeFrequency: "monthly", priority: 0.4 },
  ];

  return [
    ...estaticas.map((e) => ({ ...e, lastModified: ahora })),

    ...destinos.map((d) => ({
      url: urlAbsoluta(rutas.destino(d.slug)),
      lastModified: ahora,
      changeFrequency: "daily" as const,
      priority: d.destacado ? 0.9 : 0.8,
    })),

    ...tipos.map((t) => ({
      url: urlAbsoluta(rutas.tipo(t.slug)),
      lastModified: ahora,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    ...pares.map((p) => ({
      url: urlAbsoluta(rutas.destinoTipo(p.destino, p.tipo)),
      lastModified: ahora,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),

    ...experiencias.map((e) => ({
      url: urlAbsoluta(rutas.experiencia(e.slug)),
      lastModified: ahora,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),

    ...barcos.map((b) => ({
      url: urlAbsoluta(rutas.barco(b.slug)),
      lastModified: ahora,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),

    ...ARTICULOS.map((a) => ({
      url: urlAbsoluta(rutas.articulo(a.slug)),
      lastModified: new Date(a.fecha),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
