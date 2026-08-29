import { describe, expect, it } from "vitest";

import {
  ahorroFrenteATemporadaAlta,
  calcularDesglose,
  diasEntre,
  precioTodoIncluidoPorDia,
  temporadaDe,
  type Tarifa,
} from "@/lib/precio";

/** Lancha tipo: 300 €/día de base, 20 l/h, patrón disponible. */
const TARIFA: Tarifa = {
  precioBaseDia: 30_000,
  limpieza: 8_000,
  tasaPortuariaDia: 4_500,
  patronDia: 18_000,
  fianza: 100_000,
  consumoLitrosHora: 20,
  descuentoSemana: 15,
};

describe("calcularDesglose", () => {
  it("suma combustible, limpieza y tasas al alquiler de un día", () => {
    const d = calcularDesglose(TARIFA, {
      dias: 1,
      temporada: "media",
      conPatron: false,
    });

    // 30000 base + 13200 combustible + 8000 limpieza + 4500 tasas
    expect(d.subtotal).toBe(55_700);
    expect(d.iva).toBe(11_697);
    expect(d.total).toBe(67_397);
    expect(d.litrosEstimados).toBe(80);
  });

  it("el precio anunciado por la competencia se queda muy corto", () => {
    // El objetivo del producto: 300 € de tarifa base son 674 € reales.
    const d = calcularDesglose(TARIFA, {
      dias: 1,
      temporada: "media",
      conPatron: false,
    });

    expect(d.total).toBeGreaterThan(TARIFA.precioBaseDia * 2);
  });

  it("aplica el multiplicador de temporada sobre la base", () => {
    const alta = calcularDesglose(TARIFA, {
      dias: 1,
      temporada: "alta",
      conPatron: false,
    });
    const baja = calcularDesglose(TARIFA, {
      dias: 1,
      temporada: "baja",
      conPatron: false,
    });

    expect(alta.lineas[0].importe).toBe(40_500);
    expect(baja.lineas[0].importe).toBe(22_500);
    // El combustible y la limpieza no dependen de la temporada.
    expect(alta.litrosEstimados).toBe(baja.litrosEstimados);
  });

  it("calcula una semana en temporada alta con patrón", () => {
    const d = calcularDesglose(TARIFA, {
      dias: 7,
      temporada: "alta",
      conPatron: true,
    });

    expect(d.subtotal).toBe(498_875);
    expect(d.iva).toBe(104_764);
    expect(d.total).toBe(603_639);
    expect(d.totalPorDia).toBe(86_234);
  });

  it("descuenta por estancia larga solo a partir del séptimo día", () => {
    const seis = calcularDesglose(TARIFA, {
      dias: 6,
      temporada: "media",
      conPatron: false,
    });
    const siete = calcularDesglose(TARIFA, {
      dias: 7,
      temporada: "media",
      conPatron: false,
    });

    expect(seis.lineas.some((l) => l.clase === "descuento")).toBe(false);
    expect(siete.lineas.some((l) => l.clase === "descuento")).toBe(true);
  });

  it("no cobra patrón si no se ha pedido", () => {
    const d = calcularDesglose(TARIFA, {
      dias: 3,
      temporada: "media",
      conPatron: false,
    });

    expect(d.lineas.some((l) => l.clave === "patron")).toBe(false);
  });

  it("no cobra patrón si el barco no lo ofrece, aunque se pida", () => {
    const d = calcularDesglose(
      { ...TARIFA, patronDia: null },
      { dias: 3, temporada: "media", conPatron: true },
    );

    expect(d.lineas.some((l) => l.clave === "patron")).toBe(false);
  });

  it("deja la fianza fuera del total porque se bloquea, no se cobra", () => {
    const d = calcularDesglose(TARIFA, {
      dias: 2,
      temporada: "media",
      conPatron: false,
    });

    expect(d.fianza).toBe(100_000);

    // La propiedad de verdad: cambiar la fianza no mueve ni un céntimo del
    // total, porque se bloquea y no se cobra.
    const conFianzaEnorme = calcularDesglose(
      { ...TARIFA, fianza: 5_000_000 },
      { dias: 2, temporada: "media", conPatron: false },
    );
    expect(conFianzaEnorme.total).toBe(d.total);
    expect(conFianzaEnorme.lineas).toEqual(d.lineas);
  });

  it("escala el combustible con las horas de navegación", () => {
    const pocas = calcularDesglose(TARIFA, {
      dias: 1,
      temporada: "media",
      conPatron: false,
      horasNavegacionDia: 2,
    });
    const muchas = calcularDesglose(TARIFA, {
      dias: 1,
      temporada: "media",
      conPatron: false,
      horasNavegacionDia: 8,
    });

    expect(pocas.litrosEstimados).toBe(40);
    expect(muchas.litrosEstimados).toBe(160);
  });

  it("omite las líneas que valen cero en lugar de enseñar un 0 €", () => {
    const d = calcularDesglose(
      { ...TARIFA, limpieza: 0, tasaPortuariaDia: 0, consumoLitrosHora: 0 },
      { dias: 1, temporada: "media", conPatron: false },
    );

    expect(d.lineas).toHaveLength(1);
    expect(d.lineas[0].clave).toBe("alquiler");
  });

  it("cada línea lleva una clave estable para poder traducirla", () => {
    const d = calcularDesglose(TARIFA, {
      dias: 7,
      temporada: "alta",
      conPatron: true,
    });

    expect(d.lineas.map((l) => l.clave)).toEqual([
      "alquiler",
      "descuento",
      "combustible",
      "limpieza",
      "amarre",
      "patron",
    ]);
  });

  it("las líneas por día llevan los datos para recomponer el detalle", () => {
    const d = calcularDesglose(TARIFA, {
      dias: 4,
      temporada: "media",
      conPatron: true,
    });

    const alquiler = d.lineas.find((l) => l.clave === "alquiler")!;
    expect(alquiler.dias).toBe(4);
    expect(alquiler.importeUnitario).toBe(30_000);
    expect(alquiler.importe).toBe(alquiler.dias! * alquiler.importeUnitario!);

    const combustible = d.lineas.find((l) => l.clave === "combustible")!;
    expect(combustible.litros).toBe(320);
    expect(combustible.horas).toBe(4);
  });

  it("trata media jornada como un día completo", () => {
    const d = calcularDesglose(TARIFA, {
      dias: 0,
      temporada: "media",
      conPatron: false,
    });

    expect(d.lineas[0].detalle).toContain("1 día");
  });

  it("devuelve importes enteros: nunca céntimos fraccionados", () => {
    const d = calcularDesglose(
      { ...TARIFA, consumoLitrosHora: 12.7, descuentoSemana: 13 },
      { dias: 9, temporada: "alta", conPatron: true, horasNavegacionDia: 5 },
    );

    for (const linea of d.lineas) {
      expect(Number.isInteger(linea.importe)).toBe(true);
    }
    expect(Number.isInteger(d.iva)).toBe(true);
    expect(Number.isInteger(d.total)).toBe(true);
    expect(Number.isInteger(d.totalPorDia)).toBe(true);
  });

  it("el subtotal cuadra con la suma de las líneas", () => {
    const d = calcularDesglose(TARIFA, {
      dias: 10,
      temporada: "alta",
      conPatron: true,
    });

    const suma = d.lineas.reduce((t, l) => t + l.importe, 0);
    expect(suma).toBe(d.subtotal);
    expect(d.subtotal + d.iva).toBe(d.total);
  });
});

describe("precioTodoIncluidoPorDia", () => {
  it("es siempre mayor que la tarifa base anunciada", () => {
    const conTodo = precioTodoIncluidoPorDia(TARIFA, "media");
    expect(conTodo).toBeGreaterThan(TARIFA.precioBaseDia);
  });

  it("baja al repartir la limpieza entre más días", () => {
    expect(precioTodoIncluidoPorDia(TARIFA, "media", 7)).toBeLessThan(
      precioTodoIncluidoPorDia(TARIFA, "media", 1),
    );
  });
});

describe("ahorroFrenteATemporadaAlta", () => {
  it("no hay ahorro si ya se viaja en temporada alta", () => {
    const ahorro = ahorroFrenteATemporadaAlta(TARIFA, {
      dias: 3,
      temporada: "alta",
      conPatron: false,
    });
    expect(ahorro).toBe(0);
  });

  it("cuantifica lo que se ahorra reservando en temporada baja", () => {
    const ahorro = ahorroFrenteATemporadaAlta(TARIFA, {
      dias: 3,
      temporada: "baja",
      conPatron: false,
    });
    expect(ahorro).toBeGreaterThan(0);
  });
});

describe("temporadaDe", () => {
  it("marca como alta los meses declarados por el destino", () => {
    expect(temporadaDe(new Date("2026-07-15"), "7,8")).toBe("alta");
    expect(temporadaDe(new Date("2026-08-01"), "7,8")).toBe("alta");
  });

  it("marca como media los meses pegados a la temporada alta", () => {
    expect(temporadaDe(new Date("2026-06-10"), "7,8")).toBe("media");
    expect(temporadaDe(new Date("2026-09-10"), "7,8")).toBe("media");
  });

  it("el resto del año es temporada baja", () => {
    expect(temporadaDe(new Date("2026-01-20"), "7,8")).toBe("baja");
    expect(temporadaDe(new Date("2026-03-05"), "7,8")).toBe("baja");
  });

  it("entiende que diciembre y enero son meses consecutivos", () => {
    // Canarias: la temporada alta cruza el fin de año.
    expect(temporadaDe(new Date("2026-11-15"), "12,1")).toBe("media");
    expect(temporadaDe(new Date("2026-02-15"), "12,1")).toBe("media");
    expect(temporadaDe(new Date("2026-12-15"), "12,1")).toBe("alta");
  });

  it("aguanta una lista de meses mal formada", () => {
    expect(temporadaDe(new Date("2026-07-15"), "")).toBe("baja");
    expect(temporadaDe(new Date("2026-07-15"), "abc,99, 7 ")).toBe("alta");
  });
});

describe("diasEntre", () => {
  it("cuenta los días naturales entre dos fechas", () => {
    expect(diasEntre(new Date("2026-08-01"), new Date("2026-08-08"))).toBe(7);
  });

  it("nunca devuelve menos de un día", () => {
    expect(diasEntre(new Date("2026-08-01"), new Date("2026-08-01"))).toBe(1);
    expect(diasEntre(new Date("2026-08-05"), new Date("2026-08-01"))).toBe(1);
  });
});
