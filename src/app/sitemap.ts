import type { MetadataRoute } from "next";

import { ARTICULOS } from "@/datos/blog";
import {
  listarDestinos,
  listarExperiencias,
  listarTipos,
  paresDestinoTipo,
  slugsDeBarcos,
} from "@/lib/consultas";
import { IDIOMAS } from "@/lib/idiomas";
import { ruta, todasLasRutas, type Pagina } from "@/lib/rutas";
import { urlAbsoluta } from "@/lib/sitio";

/**
 * Mapa del sitio.
 *
 * Se genera desde la base, así que publicar un barco nuevo lo mete solo. Cada
 * entrada declara sus versiones en otros idiomas con `alternates`, que es lo
 * que le dice al buscador que no son páginas distintas sino la misma en tres
 * lenguas.
 *
 * Las prioridades no son decorativas: reflejan qué páginas queremos que se
 * rastreen antes cuando el presupuesto de rastreo es limitado.
 */

type Frecuencia = "daily" | "weekly" | "monthly";

/** Una entrada por idioma, todas enlazadas entre sí. */
function entradas(
  pagina: Pagina,
  prioridad: number,
  frecuencia: Frecuencia,
  fecha: Date,
): MetadataRoute.Sitemap {
  const rutas = todasLasRutas(pagina);
  const languages = Object.fromEntries(
    IDIOMAS.map((idioma) => [idioma, urlAbsoluta(rutas[idioma])]),
  );

  return IDIOMAS.map((idioma) => ({
    url: urlAbsoluta(rutas[idioma]),
    lastModified: fecha,
    changeFrequency: frecuencia,
    priority: prioridad,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinos, tipos, pares, barcos, experiencias] = await Promise.all([
    listarDestinos(),
    listarTipos(),
    paresDestinoTipo(),
    slugsDeBarcos(),
    listarExperiencias(),
  ]);

  const ahora = new Date();

  const fijas: [Pagina, number, Frecuencia][] = [
    [{ tipo: "home" }, 1, "daily"],
    [{ tipo: "busqueda" }, 0.9, "daily"],
    [{ tipo: "sinLicencia" }, 0.8, "weekly"],
    [{ tipo: "experiencias" }, 0.7, "weekly"],
    [{ tipo: "blog" }, 0.6, "weekly"],
    [{ tipo: "comoFunciona" }, 0.4, "monthly"],
    [{ tipo: "publicar" }, 0.4, "monthly"],
  ];

  return [
    ...fijas.flatMap(([pagina, prioridad, frecuencia]) =>
      entradas(pagina, prioridad, frecuencia, ahora),
    ),

    ...destinos.flatMap((d) =>
      entradas(
        { tipo: "destino", destino: d.slug },
        d.destacado ? 0.9 : 0.8,
        "daily",
        ahora,
      ),
    ),

    ...tipos.flatMap((t) =>
      entradas({ tipo: "tipoBarco", tipoBarco: t.slug }, 0.7, "weekly", ahora),
    ),

    ...pares.flatMap((p) =>
      entradas(
        { tipo: "destinoTipo", destino: p.destino, tipoBarco: p.tipo },
        0.6,
        "weekly",
        ahora,
      ),
    ),

    ...experiencias.flatMap((e) =>
      entradas({ tipo: "experiencia", slug: e.slug }, 0.6, "weekly", ahora),
    ),

    ...barcos.flatMap((b) =>
      entradas({ tipo: "barco", slug: b.slug }, 0.5, "weekly", ahora),
    ),

    // Los artículos solo existen en el idioma en que están escritos: no se
    // declaran alternativas que no hay.
    ...ARTICULOS.map((a) => ({
      url: urlAbsoluta(ruta({ tipo: "articulo", slug: a.slug }, a.idioma)),
      lastModified: new Date(a.fecha),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
