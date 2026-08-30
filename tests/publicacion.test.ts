import { describe, expect, it } from "vitest";

import { estaPublicado, soloPublicados } from "@/lib/publicacion";

const HOY = new Date("2026-08-30T10:00:00Z");

describe("publicación programada", () => {
  it("sin fecha, publicado", () => {
    expect(estaPublicado({}, HOY)).toBe(true);
  });

  it("con fecha pasada, publicado", () => {
    expect(estaPublicado({ publicaDesde: "2026-01-01" }, HOY)).toBe(true);
  });

  it("el mismo día, publicado", () => {
    expect(estaPublicado({ publicaDesde: "2026-08-30" }, HOY)).toBe(true);
  });

  it("con fecha futura, todavía no", () => {
    expect(estaPublicado({ publicaDesde: "2026-09-15" }, HOY)).toBe(false);
  });

  it("una fecha ilegible no esconde el contenido en silencio", () => {
    expect(estaPublicado({ publicaDesde: "el martes" }, HOY)).toBe(true);
  });

  it("filtra listas dejando solo lo publicado", () => {
    const items = [
      { slug: "a" },
      { slug: "b", publicaDesde: "2026-01-01" },
      { slug: "c", publicaDesde: "2026-12-01" },
    ];
    expect(soloPublicados(items, HOY).map((i) => i.slug)).toEqual(["a", "b"]);
  });
});
