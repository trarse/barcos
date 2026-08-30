import { describe, expect, it } from "vitest";

import { ARTICULOS } from "@/datos/blog";
import { IDIOMAS_ARTICULO, IDIOMAS_GUIA } from "@/datos/disponibilidad";
import { GUIAS } from "@/datos/guias";

/**
 * El mapa de disponibilidad existe para no mandar el texto de las guías al
 * navegador solo para saber en qué idiomas están. El precio es que puede
 * quedarse desfasado, y de eso se encarga este test: si alguien añade una
 * guía o la traduce y no toca el mapa, aquí salta.
 */
function idiomasReales(items: { slug: string; idioma: string }[]) {
  const mapa: Record<string, string[]> = {};
  for (const item of items) {
    (mapa[item.slug] ??= []).push(item.idioma);
  }
  for (const slug of Object.keys(mapa)) mapa[slug].sort();
  return mapa;
}

function normalizar(mapa: Record<string, readonly string[]>) {
  return Object.fromEntries(
    Object.entries(mapa).map(([slug, idiomas]) => [slug, [...idiomas].sort()]),
  );
}

describe("mapa de disponibilidad", () => {
  it("coincide con las guías que existen de verdad", () => {
    expect(normalizar(IDIOMAS_GUIA)).toEqual(idiomasReales(GUIAS));
  });

  it("coincide con los artículos que existen de verdad", () => {
    expect(normalizar(IDIOMAS_ARTICULO)).toEqual(idiomasReales(ARTICULOS));
  });
});
