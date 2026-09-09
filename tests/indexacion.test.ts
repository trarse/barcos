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
  it("con flota y texto propio, entra en el idioma de la prosa", () => {
    expect(
      idiomasIndexables({ prosa: { es: LARGO }, barcos: MINIMO_BARCOS }),
    ).toEqual(["es"]);
  });

  it("entra en cada idioma solo si su texto llega al umbral", () => {
    const entrada = { prosa: { es: LARGO, en: LARGO, de: CORTO }, barcos: MINIMO_BARCOS };
    expect(esIndexable("es", entrada)).toBe(true);
    expect(esIndexable("en", entrada)).toBe(true);
    expect(esIndexable("de", entrada)).toBe(false);
  });

  it("una palabra por debajo del umbral se queda fuera: el umbral no se baja", () => {
    expect(idiomasIndexables({ prosa: { es: CORTO }, barcos: 20 })).toEqual([]);
  });

  it("un barco por debajo del umbral se queda fuera", () => {
    expect(
      idiomasIndexables({ prosa: { es: LARGO }, barcos: MINIMO_BARCOS - 1 }),
    ).toEqual([]);
  });

  it("sin flota que contar, la regla es solo la del texto", () => {
    expect(idiomasIndexables({ prosa: { es: LARGO } })).toEqual(["es"]);
    expect(idiomasIndexables({ prosa: { es: CORTO } })).toEqual([]);
  });

  it("un idioma sin columna de prosa no indexa", () => {
    expect(
      idiomasIndexables({ prosa: { es: LARGO, en: null, de: undefined } }),
    ).toEqual(["es"]);
  });

  it("sin texto propio, ningún idioma", () => {
    expect(idiomasIndexables({ prosa: {}, barcos: 50 })).toEqual([]);
  });
});
