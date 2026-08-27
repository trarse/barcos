import { describe, expect, it } from "vitest";

import {
  aSlug,
  entero,
  eslora,
  euro,
  euroExacto,
  plural,
  valoracion,
} from "@/lib/formato";

/** Intl usa espacios finos y no separables; se normalizan para comparar. */
function normalizar(texto: string): string {
  return texto.replace(/\s/g, " ");
}

describe("euro", () => {
  it("convierte céntimos a euros sin decimales", () => {
    expect(normalizar(euro(45_900))).toBe("459 €");
  });

  it("separa los miles con punto", () => {
    expect(normalizar(euro(1_234_500))).toBe("12.345 €");
  });

  it("mantiene el signo de los descuentos", () => {
    expect(normalizar(euro(-4_250))).toContain("-");
  });
});

describe("euroExacto", () => {
  it("conserva los dos decimales", () => {
    expect(normalizar(euroExacto(45_912))).toBe("459,12 €");
  });

  it("rellena con ceros los importes redondos", () => {
    expect(normalizar(euroExacto(45_900))).toBe("459,00 €");
  });
});

describe("eslora", () => {
  it("pasa de centímetros a metros con coma decimal", () => {
    expect(eslora(1_250)).toBe("12,5 m");
  });

  it("no arrastra decimales inútiles", () => {
    expect(eslora(1_200)).toBe("12 m");
  });
});

describe("valoracion", () => {
  it("siempre enseña un decimal", () => {
    expect(valoracion(4)).toBe("4,0");
    expect(valoracion(4.85)).toBe("4,9");
  });
});

describe("plural", () => {
  it("concuerda el singular y el plural", () => {
    expect(plural(1, "día", "días")).toBe("1 día");
    expect(plural(3, "día", "días")).toBe("3 días");
    expect(plural(0, "plaza", "plazas")).toBe("0 plazas");
  });
});

describe("entero", () => {
  it("agrupa los miles", () => {
    expect(entero(12_345)).toBe("12.345");
  });
});

describe("aSlug", () => {
  it("quita las tildes", () => {
    expect(aSlug("Cádiz")).toBe("cadiz");
    expect(aSlug("Málaga")).toBe("malaga");
  });

  it("respeta la eñe convirtiéndola en n", () => {
    expect(aSlug("A Coruña")).toBe("a-coruna");
  });

  it("sustituye espacios y signos por guiones", () => {
    expect(aSlug("Sant Antoni de Portmany")).toBe("sant-antoni-de-portmany");
    expect(aSlug("L'Escala")).toBe("l-escala");
  });

  it("no deja guiones sueltos en los extremos", () => {
    expect(aSlug("  ¡Ibiza!  ")).toBe("ibiza");
  });

  it("colapsa los separadores repetidos", () => {
    expect(aSlug("Palma  --  de   Mallorca")).toBe("palma-de-mallorca");
  });
});
