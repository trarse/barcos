import { cache } from "react";

import { db } from "@/lib/db";
import type { Idioma } from "@/lib/idiomas";
import type { Pagina } from "@/lib/rutas";

/**
 * Consultas del blog contra la base de datos.
 *
 * El blog pasó de un archivo estático a la base para poder gestionarse desde
 * el panel /admin. El contrato es el mismo que tenía `datos/blog.ts`: las
 * páginas reciben artículos ya publicados, ordenados y con los relacionados
 * resueltos.
 */

export interface ArticuloDb {
  idioma: Idioma;
  slug: string;
  titulo: string;
  entradilla: string;
  /** Fecha ISO (AAAA-MM-DD), visible y datePublished. */
  fecha: string;
  minutos: number;
  categoria: string;
  cuerpo: string;
  relacionados: { texto: string; pagina: Pagina }[];
}

function estaVisible(publicaDesde: Date | null, ahora = new Date()): boolean {
  if (!publicaDesde) return true;
  return publicaDesde.getTime() <= ahora.getTime();
}

function aArticulo(fila: {
  idioma: string;
  slug: string;
  titulo: string;
  entradilla: string;
  fecha: Date;
  minutos: number;
  categoria: string;
  cuerpo: string;
  relacionados: unknown;
}): ArticuloDb {
  return {
    idioma: fila.idioma as Idioma,
    slug: fila.slug,
    titulo: fila.titulo,
    entradilla: fila.entradilla,
    fecha: fila.fecha.toISOString().slice(0, 10),
    minutos: fila.minutos,
    categoria: fila.categoria,
    cuerpo: fila.cuerpo,
    relacionados:
      (fila.relacionados as { texto: string; pagina: Pagina }[] | null) ?? [],
  };
}

export const obtenerArticulo = cache(async (slug: string, idioma: Idioma) => {
  const fila = await db.articulo.findUnique({
    where: { idioma_slug: { idioma, slug } },
  });
  if (!fila || !fila.publicado || !estaVisible(fila.publicaDesde)) return undefined;
  return aArticulo(fila);
});

/** Artículos publicados de un idioma, del más reciente al más antiguo. */
export const articulosPorFecha = cache(async (idioma: Idioma) => {
  const filas = await db.articulo.findMany({
    where: { idioma, publicado: true },
    orderBy: { fecha: "desc" },
  });
  const ahora = new Date();
  return filas.filter((f) => estaVisible(f.publicaDesde, ahora)).map(aArticulo);
});

/** En qué idiomas existe (publicado) un artículo. Alimenta el `hreflang`. */
export const idiomasDelArticulo = cache(async (slug: string) => {
  const filas = await db.articulo.findMany({
    where: { slug, publicado: true },
    select: { idioma: true, publicaDesde: true },
  });
  const ahora = new Date();
  return filas
    .filter((f) => estaVisible(f.publicaDesde, ahora))
    .map((f) => f.idioma as Idioma);
});

/** Slugs publicados, para generar las rutas estáticas del blog. */
export const slugsDeArticulos = cache(async () => {
  const filas = await db.articulo.findMany({
    where: { publicado: true },
    select: { idioma: true, slug: true, publicaDesde: true },
  });
  const ahora = new Date();
  return filas
    .filter((f) => estaVisible(f.publicaDesde, ahora))
    .map((f) => ({ idioma: f.idioma as Idioma, slug: f.slug }));
});

/** Artículos publicados con su fecha, para el sitemap. */
export const articulosPublicados = cache(async () => {
  const filas = await db.articulo.findMany({
    where: { publicado: true },
    select: { idioma: true, slug: true, fecha: true, publicaDesde: true },
  });
  const ahora = new Date();
  return filas
    .filter((f) => estaVisible(f.publicaDesde, ahora))
    .map((f) => ({
      idioma: f.idioma as Idioma,
      slug: f.slug,
      fecha: f.fecha.toISOString().slice(0, 10),
    }));
});
