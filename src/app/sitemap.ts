import type { MetadataRoute } from "next";

import { ARTICULOS } from "@/datos/blog";
import { GUIAS } from "@/datos/guias";
import { OCASIONES } from "@/datos/ocasiones";
import {
  contarSinTitulacion,
  listarDestinos,
  listarExperiencias,
  listarLugares,
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
 *
 * REGLA IMPORTANTE: aquí solo entra lo que es indexable. Meter en el sitemap
 * una página que emite `noindex` es mandarle al buscador dos órdenes opuestas
 * sobre la misma URL, y lo que se gana es que desconfíe del sitemap entero.
 * Por eso las landings «sin licencia» se filtran con el mismo umbral que usa
 * la propia página, y el contenido editorial solo se declara en el idioma en
 * el que existe de verdad.
 */

type Frecuencia = "daily" | "weekly" | "monthly";

/** Los mismos umbrales que aplica `sin-licencia/[destino]`. */
const MINIMO_BARCOS = 6;
const MINIMO_PALABRAS = 250;

function palabras(texto: string | null | undefined): number {
  if (!texto) return 0;
  return texto.trim().split(/\s+/).filter(Boolean).length;
}

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
  const [destinos, tipos, pares, barcos, experiencias, lugares, sinTitulacion] =
    await Promise.all([
      listarDestinos(),
      listarTipos(),
      paresDestinoTipo(),
      slugsDeBarcos(),
      listarExperiencias(),
      listarLugares(),
      contarSinTitulacion(),
    ]);

  const ahora = new Date();

  const fijas: [Pagina, number, Frecuencia][] = [
    [{ tipo: "home" }, 1, "daily"],
    [{ tipo: "busqueda" }, 0.9, "daily"],
    [{ tipo: "sinLicencia" }, 0.8, "weekly"],
    [{ tipo: "lugares" }, 0.8, "weekly"],
    [{ tipo: "ocasiones" }, 0.7, "weekly"],
    [{ tipo: "experiencias" }, 0.7, "weekly"],
    [{ tipo: "guias" }, 0.7, "weekly"],
    [{ tipo: "blog" }, 0.6, "weekly"],
    [{ tipo: "comparar" }, 0.5, "monthly"],
    [{ tipo: "comoFunciona" }, 0.4, "monthly"],
    [{ tipo: "publicar" }, 0.4, "monthly"],
  ];

  // Solo las que superan el umbral: las demás emiten noindex.
  const sinLicenciaIndexables = destinos.filter(
    (d) =>
      (sinTitulacion.get(d.slug) ?? 0) >= MINIMO_BARCOS &&
      palabras(d.sinLicencia) >= MINIMO_PALABRAS,
  );

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

    // Máxima intención de compra del sitio, por delante de tipo y experiencia.
    ...sinLicenciaIndexables.flatMap((d) =>
      entradas({ tipo: "sinLicenciaDestino", destino: d.slug }, 0.85, "daily", ahora),
    ),

    ...lugares.flatMap((l) =>
      entradas({ tipo: "lugar", slug: l.slug }, 0.8, "weekly", ahora),
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

    // El contenido editorial solo existe en el idioma en que está escrito: no
    // se declaran alternativas que no hay ni URLs que darían 404.
    ...OCASIONES.map((o) => ({
      url: urlAbsoluta(ruta({ tipo: "ocasion", slug: o.slug }, o.idioma)),
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...GUIAS.map((g) => ({
      url: urlAbsoluta(ruta({ tipo: "guia", slug: g.slug }, g.idioma)),
      lastModified: new Date(g.revisada),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    ...ARTICULOS.map((a) => ({
      url: urlAbsoluta(ruta({ tipo: "articulo", slug: a.slug }, a.idioma)),
      lastModified: new Date(a.fecha),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
