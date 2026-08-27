import { describe, expect, it } from "vitest";

import {
  alternarEquipamiento,
  aplicar,
  contarActivos,
  escribirFiltros,
  FILTROS_VACIOS,
  leerFiltros,
  ordenar,
  POR_PAGINA,
  rangoDePagina,
  totalPaginas,
  type Filtros,
} from "@/lib/filtros";

function leer(query: string): Filtros {
  return leerFiltros(new URLSearchParams(query));
}

describe("leerFiltros", () => {
  it("devuelve los valores por defecto con la query vacía", () => {
    expect(leer("")).toEqual(FILTROS_VACIOS);
  });

  it("interpreta todos los filtros", () => {
    const f = leer(
      "destino=mallorca&tipo=velero&capacidad=8&precio=50000&sin-licencia=1&patron=1&instantanea=1&equipo=nevera,gps&orden=precio-asc&pagina=3",
    );

    expect(f).toEqual({
      destino: "mallorca",
      tipo: "velero",
      capacidadMinima: 8,
      precioMaximo: 50_000,
      sinLicencia: true,
      conPatron: true,
      reservaInstantanea: true,
      equipamiento: ["nevera", "gps"],
      orden: "precio-asc",
      pagina: 3,
    });
  });

  it("ignora los números que no son enteros positivos", () => {
    const f = leer("capacidad=-2&precio=abc&pagina=0");
    expect(f.capacidadMinima).toBeNull();
    expect(f.precioMaximo).toBeNull();
    expect(f.pagina).toBe(1);
  });

  it("cae en el orden recomendado si el criterio no existe", () => {
    expect(leer("orden=por-eslora").orden).toBe("recomendados");
  });

  it("descarta los textos en blanco", () => {
    expect(leer("destino=%20%20").destino).toBeNull();
  });

  it("no deja huecos vacíos en el equipamiento", () => {
    expect(leer("equipo=,gps,,nevera,").equipamiento).toEqual(["gps", "nevera"]);
  });

  it("acepta el equipamiento repetido que envía un formulario", () => {
    expect(leer("equipo=gps&equipo=nevera").equipamiento).toEqual(["gps", "nevera"]);
  });

  it("no duplica el equipamiento si llega por las dos vías", () => {
    expect(leer("equipo=gps,nevera&equipo=gps").equipamiento).toEqual([
      "gps",
      "nevera",
    ]);
  });
});

describe("escribirFiltros", () => {
  it("no escribe nada cuando no hay filtros", () => {
    expect(escribirFiltros(FILTROS_VACIOS)).toBe("");
  });

  it("omite el orden recomendado y la primera página", () => {
    const query = escribirFiltros({
      ...FILTROS_VACIOS,
      tipo: "velero",
      orden: "recomendados",
      pagina: 1,
    });
    expect(query).toBe("tipo=velero");
  });

  it("va y vuelve sin perder información", () => {
    const original: Filtros = {
      destino: "ibiza",
      tipo: "catamaran",
      capacidadMinima: 10,
      precioMaximo: 90_000,
      sinLicencia: true,
      conPatron: false,
      reservaInstantanea: true,
      equipamiento: ["gps", "paddle"],
      orden: "valoracion",
      pagina: 4,
    };

    expect(leer(escribirFiltros(original))).toEqual(original);
  });
});

describe("contarActivos", () => {
  it("no cuenta el destino, que ya va en la ruta", () => {
    expect(contarActivos({ ...FILTROS_VACIOS, destino: "mallorca" })).toBe(0);
  });

  it("suma cada filtro y cada pieza de equipamiento", () => {
    const f: Filtros = {
      ...FILTROS_VACIOS,
      tipo: "velero",
      sinLicencia: true,
      equipamiento: ["gps", "nevera"],
    };
    expect(contarActivos(f)).toBe(4);
  });
});

describe("aplicar", () => {
  it("vuelve a la primera página al cambiar un filtro", () => {
    const f = aplicar({ ...FILTROS_VACIOS, pagina: 5 }, { tipo: "velero" });
    expect(f.pagina).toBe(1);
  });

  it("respeta la página cuando es justo lo que se está cambiando", () => {
    const f = aplicar({ ...FILTROS_VACIOS, tipo: "velero" }, { pagina: 3 });
    expect(f.pagina).toBe(3);
    expect(f.tipo).toBe("velero");
  });
});

describe("alternarEquipamiento", () => {
  it("añade y quita, y siempre vuelve al principio del listado", () => {
    const puesto = alternarEquipamiento({ ...FILTROS_VACIOS, pagina: 3 }, "gps");
    expect(puesto.equipamiento).toEqual(["gps"]);
    expect(puesto.pagina).toBe(1);

    expect(alternarEquipamiento(puesto, "gps").equipamiento).toEqual([]);
  });
});

describe("paginación", () => {
  it("una lista vacía sigue teniendo una página", () => {
    expect(totalPaginas(0)).toBe(1);
  });

  it("reparte los resultados en páginas completas", () => {
    expect(totalPaginas(POR_PAGINA)).toBe(1);
    expect(totalPaginas(POR_PAGINA + 1)).toBe(2);
  });

  it("calcula el rango de cada página", () => {
    expect(rangoDePagina(1)).toEqual([0, POR_PAGINA]);
    expect(rangoDePagina(3)).toEqual([POR_PAGINA * 2, POR_PAGINA * 3]);
  });
});

describe("ordenar", () => {
  const barcos = [
    { id: "caro", precioDia: 90_000, valoracion: 4.9, opiniones: 200 },
    { id: "barato", precioDia: 20_000, valoracion: 3.2, opiniones: 2 },
    { id: "medio", precioDia: 50_000, valoracion: 4.8, opiniones: 40 },
  ];

  it("ordena por precio en los dos sentidos", () => {
    expect(ordenar(barcos, "precio-asc").map((b) => b.id)).toEqual([
      "barato",
      "medio",
      "caro",
    ]);
    expect(ordenar(barcos, "precio-desc").map((b) => b.id)).toEqual([
      "caro",
      "medio",
      "barato",
    ]);
  });

  it("ordena por valoración y desempata por número de opiniones", () => {
    const empatados = [
      { id: "pocas", precioDia: 1, valoracion: 4.8, opiniones: 5 },
      { id: "muchas", precioDia: 1, valoracion: 4.8, opiniones: 90 },
    ];
    expect(ordenar(empatados, "valoracion").map((b) => b.id)).toEqual([
      "muchas",
      "pocas",
    ]);
  });

  it("recomendados no deja ganar a un barato sin opiniones", () => {
    expect(ordenar(barcos, "recomendados")[0].id).not.toBe("barato");
  });

  it("no modifica la lista original", () => {
    const copia = [...barcos];
    ordenar(barcos, "precio-asc");
    expect(barcos).toEqual(copia);
  });
});
