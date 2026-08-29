import { describe, expect, it } from "vitest";

import { negociar } from "@/proxy";

describe("negociar", () => {
  it("cae en castellano si no hay cabecera", () => {
    expect(negociar(null)).toBe("es");
    expect(negociar("")).toBe("es");
  });

  it("reconoce el idioma aunque venga con región", () => {
    expect(negociar("de-AT")).toBe("de");
    expect(negociar("en-US,en;q=0.9")).toBe("en");
    expect(negociar("es-419")).toBe("es");
  });

  it("respeta el factor de calidad, no el orden de aparición", () => {
    expect(negociar("en;q=0.3,de;q=0.9")).toBe("de");
    expect(negociar("fr;q=1.0,en;q=0.8")).toBe("en");
  });

  it("salta los idiomas que no tenemos", () => {
    expect(negociar("fr-FR,it;q=0.9,de;q=0.5")).toBe("de");
  });

  it("ignora un idioma rechazado con q=0", () => {
    expect(negociar("de;q=0,en;q=0.5")).toBe("en");
  });

  it("cae en castellano si no hay ninguno que sirva", () => {
    expect(negociar("fr-FR,it-IT;q=0.8")).toBe("es");
  });

  it("aguanta una cabecera mal formada", () => {
    expect(negociar(";;;")).toBe("es");
    expect(negociar("en;q=abc")).toBe("es");
  });
});
