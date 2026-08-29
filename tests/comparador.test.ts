import { describe, expect, it } from "vitest";

import {
  alternar,
  cruzarEquipamiento,
  escribirSeleccion,
  estaLleno,
  leerSeleccion,
  MAXIMO,
  resolverFila,
  rutaComparativa,
} from "@/lib/comparador";

describe("leerSeleccion", () => {
  it("devuelve una lista vacía si no hay parámetro", () => {
    expect(leerSeleccion(null)).toEqual([]);
    expect(leerSeleccion(undefined)).toEqual([]);
    expect(leerSeleccion("")).toEqual([]);
  });

  it("parte por comas y limpia espacios", () => {
    expect(leerSeleccion(" uno , dos ")).toEqual(["uno", "dos"]);
  });

  it("descarta huecos vacíos", () => {
    expect(leerSeleccion(",uno,,dos,")).toEqual(["uno", "dos"]);
  });

  it("no repite un barco aunque venga dos veces", () => {
    expect(leerSeleccion("uno,dos,uno")).toEqual(["uno", "dos"]);
  });

  it("nunca devuelve más del máximo", () => {
    expect(leerSeleccion("a,b,c,d,e")).toHaveLength(MAXIMO);
  });
});

describe("escribirSeleccion", () => {
  it("une con comas", () => {
    expect(escribirSeleccion(["uno", "dos"])).toBe("uno,dos");
  });

  it("recorta al máximo", () => {
    expect(escribirSeleccion(["a", "b", "c", "d"])).toBe("a,b,c");
  });

  it("va y vuelve sin perder nada", () => {
    const original = ["velero-palma", "lancha-denia"];
    expect(leerSeleccion(escribirSeleccion(original))).toEqual(original);
  });
});

describe("alternar", () => {
  it("añade un barco que no estaba", () => {
    expect(alternar([], "uno")).toEqual(["uno"]);
  });

  it("quita un barco que ya estaba", () => {
    expect(alternar(["uno", "dos"], "uno")).toEqual(["dos"]);
  });

  it("al llegar al tope desplaza el más antiguo", () => {
    // Quien ya tiene tres y pulsa un cuarto quiere cambiar, no que le ignoren.
    expect(alternar(["a", "b", "c"], "d")).toEqual(["b", "c", "d"]);
  });

  it("no modifica la lista original", () => {
    const original = ["a", "b"];
    alternar(original, "c");
    expect(original).toEqual(["a", "b"]);
  });
});

describe("estaLleno", () => {
  it("avisa solo al alcanzar el máximo", () => {
    expect(estaLleno(["a", "b"])).toBe(false);
    expect(estaLleno(["a", "b", "c"])).toBe(true);
  });
});

describe("rutaComparativa", () => {
  it("no hay comparativa con menos de dos barcos", () => {
    expect(rutaComparativa([])).toBeNull();
    expect(rutaComparativa(["uno"])).toBeNull();
  });

  it("construye el enlace con la selección", () => {
    expect(rutaComparativa(["uno", "dos"])).toBe("/comparar?barcos=uno,dos");
  });
});

describe("resolverFila", () => {
  it("detecta que no hay nada que comparar", () => {
    const fila = resolverFila("Plazas", ["8", "8"], [8, 8], "mayor");
    expect(fila.hayDiferencia).toBe(false);
    expect(fila.ganadores).toEqual([]);
  });

  it("marca el más barato cuando lo bueno es lo menor", () => {
    const fila = resolverFila(
      "Precio",
      ["500 €", "300 €", "700 €"],
      [500, 300, 700],
      "menor",
    );
    expect(fila.ganadores).toEqual([1]);
    expect(fila.hayDiferencia).toBe(true);
  });

  it("marca el mayor cuando lo bueno es lo mayor", () => {
    const fila = resolverFila("Plazas", ["6", "12"], [6, 12], "mayor");
    expect(fila.ganadores).toEqual([1]);
  });

  it("marca a todos los que empatan en cabeza", () => {
    const fila = resolverFila(
      "Plazas",
      ["12", "12", "6"],
      [12, 12, 6],
      "mayor",
    );
    expect(fila.ganadores).toEqual([0, 1]);
  });

  it("no señala ganador si el valor no es comparable", () => {
    const fila = resolverFila(
      "Puerto",
      ["Palma", "Dénia"],
      [null, null],
      "ninguno",
    );
    expect(fila.ganadores).toEqual([]);
    expect(fila.hayDiferencia).toBe(true);
  });

  it("ignora los valores ausentes al buscar el mejor", () => {
    const fila = resolverFila(
      "Consumo",
      ["35 l/h", "—", "12 l/h"],
      [35, null, 12],
      "menor",
    );
    expect(fila.ganadores).toEqual([2]);
  });
});

describe("cruzarEquipamiento", () => {
  const a = [
    { slug: "gps", nombre: "GPS" },
    { slug: "nevera", nombre: "Nevera" },
  ];
  const b = [
    { slug: "gps", nombre: "GPS" },
    { slug: "bimini", nombre: "Toldo bimini" },
  ];

  it("reúne todas las piezas de todos los barcos", () => {
    const cruce = cruzarEquipamiento([a, b]);
    expect(cruce.map((c) => c.slug).sort()).toEqual(["bimini", "gps", "nevera"]);
  });

  it("dice qué barco lleva cada pieza", () => {
    const cruce = cruzarEquipamiento([a, b]);
    expect(cruce.find((c) => c.slug === "gps")?.tienen).toEqual([true, true]);
    expect(cruce.find((c) => c.slug === "nevera")?.tienen).toEqual([true, false]);
  });

  it("pone primero lo que diferencia a unos de otros", () => {
    const cruce = cruzarEquipamiento([a, b]);
    expect(cruce[0].hayDiferencia).toBe(true);
    expect(cruce.at(-1)?.slug).toBe("gps");
  });

  it("aguanta un barco sin equipamiento", () => {
    const cruce = cruzarEquipamiento([a, []]);
    expect(cruce.every((c) => c.hayDiferencia)).toBe(true);
    expect(cruce.find((c) => c.slug === "gps")?.tienen).toEqual([true, false]);
  });
});
