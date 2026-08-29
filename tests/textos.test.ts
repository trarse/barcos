import { describe, expect, it } from "vitest";

import { IDIOMAS, type Idioma } from "@/lib/idiomas";
import { textos } from "@/lib/textos";

/** Recorre el catálogo y devuelve la ruta de cada hoja: "nav.buscar". */
function hojas(objeto: unknown, prefijo = ""): string[] {
  if (typeof objeto !== "object" || objeto === null) return [prefijo];
  return Object.entries(objeto).flatMap(([clave, valor]) =>
    hojas(valor, prefijo ? `${prefijo}.${clave}` : clave),
  );
}

function tipoDeHoja(objeto: unknown, ruta: string): string {
  let actual: unknown = objeto;
  for (const paso of ruta.split(".")) {
    actual = (actual as Record<string, unknown>)[paso];
  }
  return typeof actual;
}

describe("catálogo de textos", () => {
  const referencia = hojas(textos("es")).sort();

  it.each(IDIOMAS)("%s tiene exactamente las mismas claves", (idioma: Idioma) => {
    expect(hojas(textos(idioma)).sort()).toEqual(referencia);
  });

  it.each(IDIOMAS)("%s respeta el tipo de cada entrada", (idioma: Idioma) => {
    for (const ruta of referencia) {
      expect(tipoDeHoja(textos(idioma), ruta)).toBe(
        tipoDeHoja(textos("es"), ruta),
      );
    }
  });

  it("ninguna cadena se ha quedado vacía", () => {
    for (const idioma of IDIOMAS) {
      for (const ruta of referencia) {
        if (tipoDeHoja(textos(idioma), ruta) !== "string") continue;
        let actual: unknown = textos(idioma);
        for (const paso of ruta.split(".")) {
          actual = (actual as Record<string, unknown>)[paso];
        }
        expect(actual, `${idioma}.${ruta}`).not.toBe("");
      }
    }
  });

  it("las traducciones no se han quedado en castellano por descuido", () => {
    // Muestra de cadenas visibles que tienen que sonar distinto en cada idioma.
    expect(textos("en").nav.alquilar).not.toBe(textos("es").nav.alquilar);
    expect(textos("de").nav.alquilar).not.toBe(textos("es").nav.alquilar);
    expect(textos("en").portada.titular).not.toBe(textos("es").portada.titular);
    expect(textos("de").portada.titular).not.toBe(textos("es").portada.titular);
    expect(textos("en").reserva.total).not.toBe(textos("de").reserva.total);
  });

  it("las funciones interpolan en los tres idiomas", () => {
    for (const idioma of IDIOMAS) {
      const t = textos(idioma);
      expect(t.comun.minutosLectura(8)).toContain("8");
      expect(t.portada.nBarcos("76")).toContain("76");
      expect(t.reserva.patronDia("180 €")).toContain("180 €");
      expect(t.comparar.barra.deTres(2, 3)).toContain("2");
    }
  });
});
