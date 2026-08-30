import { describe, expect, it } from "vitest";

import {
  esIndexable,
  idiomasIndexables,
  MINIMO_BARCOS,
  MINIMO_PALABRAS,
  palabras,
} from "@/lib/indexacion";

const texto = (n: number) => Array.from({ length: n }, (_, i) => `palabra${i}`).join(" ");

const LARGO = texto(MINIMO_PALABRAS);
const CORTO = texto(MINIMO_PALABRAS - 1);

describe("recuento de palabras", () => {
  it("no cuenta los espacios de más", () => {
    expect(palabras("  una   dos \n tres ")).toBe(3);
  });

  it("un texto ausente cuenta cero y no falla", () => {
    expect(palabras(null)).toBe(0);
    expect(palabras(undefined)).toBe(0);
    expect(palabras("")).toBe(0);
  });
});

describe("regla de indexación", () => {
  it("con flota y texto propio, entra al índice en el idioma de la prosa", () => {
    expect(
      idiomasIndexables({ prosa: LARGO, idiomaProsa: "es", barcos: MINIMO_BARCOS }),
    ).toEqual(["es"]);
  });

  it("NO entra en los idiomas a los que la prosa no está traducida", () => {
    const entrada = { prosa: LARGO, idiomaProsa: "es", barcos: MINIMO_BARCOS };
    expect(esIndexable("es", entrada)).toBe(true);
    expect(esIndexable("en", entrada)).toBe(false);
    expect(esIndexable("de", entrada)).toBe(false);
  });

  it("una palabra por debajo del umbral se queda fuera: el umbral no se baja", () => {
    expect(idiomasIndexables({ prosa: CORTO, idiomaProsa: "es", barcos: 20 })).toEqual([]);
  });

  it("un barco por debajo del umbral se queda fuera", () => {
    expect(
      idiomasIndexables({ prosa: LARGO, idiomaProsa: "es", barcos: MINIMO_BARCOS - 1 }),
    ).toEqual([]);
  });

  it("sin flota que contar, la regla es solo la del texto", () => {
    expect(idiomasIndexables({ prosa: LARGO, idiomaProsa: "es" })).toEqual(["es"]);
    expect(idiomasIndexables({ prosa: CORTO, idiomaProsa: "es" })).toEqual([]);
  });

  it("una prosa en un idioma que no servimos no indexa en ninguno", () => {
    expect(idiomasIndexables({ prosa: LARGO, idiomaProsa: "fr" })).toEqual([]);
  });

  it("sin texto propio, ningún idioma", () => {
    expect(idiomasIndexables({ prosa: null, idiomaProsa: "es", barcos: 50 })).toEqual([]);
  });
});
