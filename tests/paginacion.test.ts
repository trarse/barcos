import { describe, expect, it } from "vitest";

import { ventana } from "@/components/paginacion";

describe("ventana", () => {
  it("enseña todas las páginas cuando son pocas", () => {
    expect(ventana(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(ventana(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("corta por el final cuando el usuario está al principio", () => {
    expect(ventana(2, 20)).toEqual([1, 2, 3, 4, null, 20]);
  });

  it("corta por los dos lados cuando está en medio", () => {
    expect(ventana(10, 20)).toEqual([1, null, 9, 10, 11, null, 20]);
  });

  it("corta por el principio cuando está al final", () => {
    expect(ventana(19, 20)).toEqual([1, null, 17, 18, 19, 20]);
  });

  it("siempre incluye la primera y la última", () => {
    for (const actual of [1, 5, 12, 30]) {
      const paginas = ventana(actual, 30);
      expect(paginas[0]).toBe(1);
      expect(paginas.at(-1)).toBe(30);
    }
  });

  it("nunca pone dos saltos seguidos", () => {
    const paginas = ventana(15, 40);
    for (let i = 1; i < paginas.length; i++) {
      expect(paginas[i] === null && paginas[i - 1] === null).toBe(false);
    }
  });

  it("incluye siempre la página actual", () => {
    for (const actual of [1, 2, 8, 25, 40]) {
      expect(ventana(actual, 40)).toContain(actual);
    }
  });
});
