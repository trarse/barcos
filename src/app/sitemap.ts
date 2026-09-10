import type { MetadataRoute } from "next";

import { GUIAS } from "@/datos/guias";
import { OCASIONES } from "@/datos/ocasiones";
import { soloPublicados } from "@/lib/publicacion";
import {
  contarSinTitulacion,
  listarDestinos,
  listarExperiencias,
  listarLugares,
  listarTipos,
  paresDestinoTipo,
  slugsDeBarcos,
} from "@/lib/consultas";
import { articulosPublicados } from "@/lib/blog";
import { IDIOMAS, type Idioma } from "@/lib/idiomas";
import { idiomasIndexables } from "@/lib/indexacion";
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
 *
 * La regla se aplica POR IDIOMA, no una vez y en castellano. La prosa de una
 * landing está escrita en una lengua y no se traduce sola: la versión inglesa
 * de la misma URL existe, pero sin texto propio no llega al umbral y emite
 * `noindex`. Filtrar en castellano y luego declarar los tres idiomas fue
 * exactamente el fallo que metió 36 URL con `noindex` en este fichero.
 *
 * Por lo mismo, un `alternate` solo apunta a versiones indexables: declarar
 * como alternativa una URL que el buscador va a descartar es describirle un
 * grupo de idiomas que no existe.
 */

type Frecuencia = "daily" | "weekly" | "monthly";

/**
 * Una entrada por idioma indexable, todas enlazadas entre sí.
 *
 * `idiomas` se recorta cuando la página no entra al índice en los tres. Con
 * uno solo no se declaran alternativas: un grupo de idiomas de un miembro no
 * dice nada.
 */
function entradas(
  pagina: Pagina,
  prioridad: number,
  frecuencia: Frecuencia,
  fecha: Date,
  idiomas: readonly Idioma[] = IDIOMAS,
): MetadataRoute.Sitemap {
  if (idiomas.length === 0) return [];

  const rutas = todasLasRutas(pagina);
  const languages = Object.fromEntries(
    idiomas.map((idioma) => [idioma, urlAbsoluta(rutas[idioma])]),
  );

  return idiomas.map((idioma) => ({
    url: urlAbsoluta(rutas[idioma]),
    lastModified: fecha,
    changeFrequency: frecuencia,
    priority: prioridad,
    ...(idiomas.length > 1 ? { alternates: { languages } } : {}),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinos, tipos, pares, barcos, experiencias, lugares, sinTitulacion, articulos] =
    await Promise.all([
      listarDestinos(),
      listarTipos(),
      paresDestinoTipo(),
      slugsDeBarcos(),
      listarExperiencias(),
      listarLugares(),
      contarSinTitulacion(),
      articulosPublicados(),
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
    [{ tipo: "comoFunciona" }, 0.4, "monthly"],
    [{ tipo: "publicar" }, 0.4, "monthly"],
    [{ tipo: "avisoLegal" }, 0.2, "monthly"],
    [{ tipo: "privacidad" }, 0.2, "monthly"],
    [{ tipo: "cookies" }, 0.2, "monthly"],
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

    // Máxima intención de compra del sitio, por delante de tipo y experiencia.
    // Solo en los idiomas donde hay flota y texto propio; en los demás la
    // página existe pero emite `noindex`.
    ...destinos.flatMap((d) =>
      entradas(
        { tipo: "sinLicenciaDestino", destino: d.slug },
        0.85,
        "daily",
        ahora,
        idiomasIndexables({
          prosa: { es: d.sinLicencia, en: d.sinLicenciaEn, de: d.sinLicenciaDe },
          barcos: sinTitulacion.get(d.slug) ?? 0,
        }),
      ),
    ),

    ...lugares.flatMap((l) =>
      entradas(
        { tipo: "lugar", slug: l.slug },
        0.8,
        "weekly",
        ahora,
        idiomasIndexables({ prosa: { es: l.contenido, en: l.contenidoEn, de: l.contenidoDe } }),
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

    // El contenido editorial solo existe en el idioma en que está escrito: no
    // se declaran alternativas que no hay ni URLs que darían 404.
    ...soloPublicados(OCASIONES).map((o) => ({
      url: urlAbsoluta(ruta({ tipo: "ocasion", slug: o.slug }, o.idioma)),
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...soloPublicados(GUIAS).map((g) => ({
      url: urlAbsoluta(ruta({ tipo: "guia", slug: g.slug }, g.idioma)),
      lastModified: new Date(g.revisada),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    ...articulos.map((a) => ({
      url: urlAbsoluta(ruta({ tipo: "articulo", slug: a.slug }, a.idioma)),
      lastModified: new Date(a.fecha),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
