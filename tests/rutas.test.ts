import { describe, expect, it } from "vitest";

import {
  esIdioma,
  IDIOMAS,
  reescriturasLocalizadas,
  segmentoTipo,
  tipoDesdeSegmento,
  tipoInterno,
  tipoSimple,
  TIPOS_LOCALIZADOS,
} from "@/lib/idiomas";
import {
  alternativas,
  analizarRuta,
  ruta,
  todasLasRutas,
  traducirRuta,
  type Pagina,
} from "@/lib/rutas";

const PAGINAS: Pagina[] = [
  { tipo: "home" },
  { tipo: "busqueda" },
  { tipo: "destino", destino: "ibiza" },
  { tipo: "destinoTipo", destino: "ibiza", tipoBarco: "catamaran" },
  { tipo: "tipoBarco", tipoBarco: "lancha" },
  { tipo: "barco", slug: "lagoon-42-palma" },
  { tipo: "experiencias" },
  { tipo: "experiencia", slug: "pesca" },
  { tipo: "sinLicencia" },
  { tipo: "blog" },
  { tipo: "articulo", slug: "ruta-siete-dias-mallorca-velero" },
  { tipo: "comoFunciona" },
  { tipo: "publicar" },
  { tipo: "comparar" },
];

describe("esIdioma", () => {
  it("reconoce los tres idiomas", () => {
    expect(esIdioma("es")).toBe(true);
    expect(esIdioma("en")).toBe(true);
    expect(esIdioma("de")).toBe(true);
  });

  it("rechaza cualquier otra cosa", () => {
    expect(esIdioma("fr")).toBe(false);
    expect(esIdioma("ES")).toBe(false);
    expect(esIdioma("")).toBe(false);
  });
});

describe("ruta", () => {
  it("traduce el segmento de alquiler en cada idioma", () => {
    expect(ruta({ tipo: "busqueda" }, "es")).toBe("/es/alquiler-barcos");
    expect(ruta({ tipo: "busqueda" }, "en")).toBe("/en/boat-rental");
    expect(ruta({ tipo: "busqueda" }, "de")).toBe("/de/bootsverleih");
  });

  it("mantiene el nombre propio del destino sin traducir", () => {
    expect(ruta({ tipo: "destino", destino: "mallorca" }, "en")).toBe(
      "/en/boat-rental/mallorca",
    );
    expect(ruta({ tipo: "destino", destino: "mallorca" }, "de")).toBe(
      "/de/bootsverleih/mallorca",
    );
  });

  it("traduce el tipo dentro de la ruta de destino", () => {
    expect(
      ruta({ tipo: "destinoTipo", destino: "mallorca", tipoBarco: "velero" }, "en"),
    ).toBe("/en/boat-rental/mallorca/sailboat");
    expect(
      ruta({ tipo: "destinoTipo", destino: "mallorca", tipoBarco: "velero" }, "de"),
    ).toBe("/de/bootsverleih/mallorca/segelboot");
  });

  it("pone la palabra clave delante en la landing de tipo", () => {
    expect(ruta({ tipo: "tipoBarco", tipoBarco: "velero" }, "es")).toBe(
      "/es/alquiler-velero",
    );
    expect(ruta({ tipo: "tipoBarco", tipoBarco: "velero" }, "en")).toBe(
      "/en/sailboat-rental",
    );
    expect(ruta({ tipo: "tipoBarco", tipoBarco: "velero" }, "de")).toBe(
      "/de/segelboot-mieten",
    );
  });

  it("traduce las secciones fijas", () => {
    expect(ruta({ tipo: "sinLicencia" }, "de")).toBe(
      "/de/boot-mieten-ohne-fuehrerschein",
    );
    expect(ruta({ tipo: "blog" }, "en")).toBe("/en/guides");
    expect(ruta({ tipo: "comparar" }, "de")).toBe("/de/vergleichen");
    expect(ruta({ tipo: "publicar" }, "en")).toBe("/en/list-your-boat");
  });

  it("la portada es solo el prefijo del idioma", () => {
    expect(ruta({ tipo: "home" }, "es")).toBe("/es");
    expect(ruta({ tipo: "home" }, "de")).toBe("/de");
  });

  it("ninguna ruta termina en barra", () => {
    const paginas: Pagina[] = [
      { tipo: "home" },
      { tipo: "busqueda" },
      { tipo: "destino", destino: "ibiza" },
      { tipo: "destinoTipo", destino: "ibiza", tipoBarco: "catamaran" },
      { tipo: "tipoBarco", tipoBarco: "lancha" },
      { tipo: "barco", slug: "lagoon-42-palma" },
      { tipo: "experiencias" },
      { tipo: "experiencia", slug: "pesca" },
      { tipo: "sinLicencia" },
      { tipo: "blog" },
      { tipo: "articulo", slug: "x" },
      { tipo: "comoFunciona" },
      { tipo: "publicar" },
      { tipo: "comparar" },
    ];

    for (const pagina of paginas) {
      for (const idioma of IDIOMAS) {
        expect(ruta(pagina, idioma).endsWith("/")).toBe(false);
      }
    }
  });

  it("toda ruta empieza por el prefijo de su idioma", () => {
    for (const idioma of IDIOMAS) {
      expect(ruta({ tipo: "experiencia", slug: "pesca" }, idioma)).toMatch(
        new RegExp(`^/${idioma}/`),
      );
    }
  });
});

describe("analizarRuta", () => {
  it("reconoce cualquier ruta que genere `ruta`, en los tres idiomas", () => {
    for (const pagina of PAGINAS) {
      for (const idioma of IDIOMAS) {
        const analizada = analizarRuta(ruta(pagina, idioma));
        expect(analizada, `${pagina.tipo} en ${idioma}`).not.toBeNull();
        expect(analizada!.idioma).toBe(idioma);
        expect(analizada!.pagina).toEqual(pagina);
      }
    }
  });

  it("no confunde la búsqueda con una landing de tipo", () => {
    expect(analizarRuta("/es/alquiler-barcos")?.pagina).toEqual({ tipo: "busqueda" });
    expect(analizarRuta("/es/alquiler-velero")?.pagina).toEqual({
      tipo: "tipoBarco",
      tipoBarco: "velero",
    });
  });

  it("rechaza lo que no reconoce", () => {
    expect(analizarRuta("/fr/bateaux")).toBeNull();
    expect(analizarRuta("/es/inventado")).toBeNull();
    expect(analizarRuta("/es/alquiler-barcos/ibiza/submarino")).toBeNull();
    expect(analizarRuta("")).toBeNull();
  });

  it("aguanta la barra final y las dobles", () => {
    expect(analizarRuta("/es/alquiler-barcos/")?.pagina).toEqual({ tipo: "busqueda" });
    expect(analizarRuta("//es//alquiler-barcos")?.pagina).toEqual({ tipo: "busqueda" });
  });
});

describe("traducirRuta", () => {
  it("lleva a la misma página en el otro idioma", () => {
    expect(traducirRuta("/es/alquiler-barcos/mallorca/velero", "de")).toBe(
      "/de/bootsverleih/mallorca/segelboot",
    );
    expect(traducirRuta("/de/segelboot-mieten", "en")).toBe("/en/sailboat-rental");
    expect(traducirRuta("/en/boat/lagoon-42-palma", "es")).toBe(
      "/es/barco/lagoon-42-palma",
    );
  });

  it("cambiar de idioma y volver deja la ruta como estaba", () => {
    for (const pagina of PAGINAS) {
      const original = ruta(pagina, "es");
      const ida = traducirRuta(original, "de");
      expect(traducirRuta(ida, "es")).toBe(original);
    }
  });

  it("ante una ruta desconocida cae en la portada, no en un enlace roto", () => {
    expect(traducirRuta("/es/lo-que-sea", "en")).toBe("/en");
  });
});

describe("todasLasRutas", () => {
  it("da una URL distinta por idioma para la misma página", () => {
    const rutas = todasLasRutas({ tipo: "destino", destino: "menorca" });
    expect(new Set(Object.values(rutas)).size).toBe(IDIOMAS.length);
  });
});

describe("alternativas", () => {
  const pagina: Pagina = { tipo: "destino", destino: "ibiza" };

  it("el canónico es la ruta del idioma que se está viendo", () => {
    expect(alternativas(pagina, "de").canonical).toBe("/de/bootsverleih/ibiza");
  });

  it("declara un hreflang por idioma más x-default", () => {
    const { languages } = alternativas(pagina, "es");
    expect(Object.keys(languages).sort()).toEqual([
      "de",
      "en",
      "es-ES",
      "x-default",
    ]);
  });

  it("x-default apunta al castellano, que es el mercado principal", () => {
    const { languages } = alternativas(pagina, "en");
    expect(languages["x-default"]).toBe("/es/alquiler-barcos/ibiza");
  });

  it("cada hreflang apunta a la misma página en su idioma", () => {
    const { languages } = alternativas(pagina, "es");
    expect(languages["en"]).toBe("/en/boat-rental/ibiza");
    expect(languages["de"]).toBe("/de/bootsverleih/ibiza");
  });
});

describe("traducción de tipos", () => {
  it("va y vuelve sin perder el slug interno", () => {
    for (const interno of Object.keys(TIPOS_LOCALIZADOS)) {
      for (const idioma of IDIOMAS) {
        expect(tipoInterno(tipoSimple(interno, idioma), idioma)).toBe(interno);
        expect(tipoDesdeSegmento(segmentoTipo(interno, idioma), idioma)).toBe(interno);
      }
    }
  });

  it("no inventa un tipo que no existe", () => {
    expect(tipoInterno("submarino", "en")).toBeNull();
    expect(tipoDesdeSegmento("submarine-rental", "en")).toBeNull();
  });

  it("deja pasar un slug desconocido en vez de romper", () => {
    expect(tipoSimple("goleta", "en")).toBe("goleta");
  });
});

describe("reescriturasLocalizadas", () => {
  const reglas = reescriturasLocalizadas();

  it("mapea cada landing de tipo a su carpeta interna", () => {
    expect(reglas).toContainEqual({
      source: "/en/sailboat-rental",
      destination: "/en/tipos/velero",
    });
    expect(reglas).toContainEqual({
      source: "/de/segelboot-mieten",
      destination: "/de/tipos/velero",
    });
  });

  it("mapea los segmentos fijos traducidos", () => {
    expect(reglas).toContainEqual({
      source: "/en/boat-rental",
      destination: "/en/alquiler-barcos",
    });
    expect(reglas).toContainEqual({
      source: "/en/boat-rental/:resto*",
      destination: "/en/alquiler-barcos/:resto*",
    });
  });

  it("no genera reglas para el castellano, que ya coincide con la carpeta", () => {
    const inutiles = reglas.filter(
      (r) => r.source === r.destination,
    );
    expect(inutiles).toEqual([]);
  });

  it("ninguna regla se repite", () => {
    const fuentes = reglas.map((r) => r.source);
    expect(new Set(fuentes).size).toBe(fuentes.length);
  });
});
