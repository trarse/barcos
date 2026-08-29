/**
 * Motor de precios.
 *
 * Es el diferenciador de Barlovento: la competencia anuncia el precio base y
 * suma combustible, limpieza, amarre y tasas en el último paso del pago. Aquí
 * el total sale calculado desde la primera tarjeta de resultados.
 *
 * Todos los importes son CÉNTIMOS en enteros. Se redondea una sola vez por
 * concepto, nunca al final sobre un acumulado en coma flotante.
 */

export type Temporada = "baja" | "media" | "alta";

/** Cuánto encarece cada temporada sobre la tarifa base del barco. */
export const MULTIPLICADOR_TEMPORADA: Record<Temporada, number> = {
  baja: 0.75,
  media: 1,
  alta: 1.35,
};

/** Precio del gasóleo náutico en céntimos por litro. */
export const PRECIO_LITRO = 165;

/** Horas de navegación que se asumen por día si no se indica otra cosa. */
export const HORAS_NAVEGACION_DIA = 4;

/** IVA aplicable al chárter náutico en España. */
export const IVA = 0.21;

/** Días a partir de los cuales se aplica el descuento por estancia larga. */
export const DIAS_DESCUENTO = 7;

export interface Tarifa {
  precioBaseDia: number;
  limpieza: number;
  tasaPortuariaDia: number;
  /** `null` cuando el barco no ofrece patrón. */
  patronDia: number | null;
  fianza: number;
  consumoLitrosHora: number;
  /** Porcentaje entero (0-100) que se descuenta a partir de `DIAS_DESCUENTO`. */
  descuentoSemana: number;
}

export interface Peticion {
  dias: number;
  temporada: Temporada;
  conPatron: boolean;
  horasNavegacionDia?: number;
}

export type ClaseLinea = "base" | "descuento" | "obligatorio" | "opcional";

/**
 * Identificador estable de cada concepto. La interfaz traduce a partir de
 * esta clave, nunca del texto: si se tradujera leyendo la etiqueta en
 * castellano, cambiar una palabra rompería los otros idiomas en silencio.
 */
export type ClaveLinea =
  | "alquiler"
  | "descuento"
  | "combustible"
  | "limpieza"
  | "amarre"
  | "patron";

export interface Linea {
  clave: ClaveLinea;
  concepto: string;
  detalle: string;
  importe: number;
  clase: ClaseLinea;
  /** Días facturados en esta línea, cuando el concepto va por día. */
  dias?: number;
  /** Precio unitario por día, en céntimos. */
  importeUnitario?: number;
  /** Porcentaje aplicado, solo en la línea de descuento. */
  porcentaje?: number;
  /** Litros estimados, solo en la línea de combustible. */
  litros?: number;
  /** Horas de navegación asumidas, solo en la línea de combustible. */
  horas?: number;
}

export interface Desglose {
  lineas: Linea[];
  /** Suma de las líneas, antes de IVA. */
  subtotal: number;
  iva: number;
  /** Lo que el cliente paga de verdad. */
  total: number;
  /** Total dividido entre los días, para comparar barcos entre sí. */
  totalPorDia: number;
  /** Se bloquea, no se cobra. Va siempre fuera del total. */
  fianza: number;
  /** Litros estimados, para poder explicar de dónde sale el combustible. */
  litrosEstimados: number;
}

/**
 * Calcula el desglose completo de una reserva.
 *
 * Devuelve todas las líneas por separado para poder enseñarlas: la
 * transparencia solo vale si el usuario puede ver de dónde sale cada euro.
 */
export function calcularDesglose(tarifa: Tarifa, peticion: Peticion): Desglose {
  const dias = Math.max(1, Math.floor(peticion.dias));
  const horasDia = peticion.horasNavegacionDia ?? HORAS_NAVEGACION_DIA;
  const lineas: Linea[] = [];

  // 1. Alquiler base, ajustado por temporada.
  const multiplicador = MULTIPLICADOR_TEMPORADA[peticion.temporada];
  const baseDia = Math.round(tarifa.precioBaseDia * multiplicador);
  const base = baseDia * dias;
  lineas.push({
    clave: "alquiler",
    concepto: "Alquiler",
    detalle: `${formatearDias(dias)} × ${euros(baseDia)}`,
    importe: base,
    clase: "base",
    dias,
    importeUnitario: baseDia,
  });

  // 2. Descuento por estancia larga.
  if (dias >= DIAS_DESCUENTO && tarifa.descuentoSemana > 0) {
    const descuento = Math.round((base * tarifa.descuentoSemana) / 100);
    lineas.push({
      clave: "descuento",
      concepto: `Descuento ${tarifa.descuentoSemana} %`,
      detalle: `Por reservar ${DIAS_DESCUENTO} días o más`,
      importe: -descuento,
      clase: "descuento",
      porcentaje: tarifa.descuentoSemana,
    });
  }

  // 3. Combustible estimado. Es el coste que más sorpresas da al pagar.
  const litros = Math.round(tarifa.consumoLitrosHora * horasDia * dias);
  if (litros > 0) {
    lineas.push({
      clave: "combustible",
      concepto: "Combustible estimado",
      detalle: `${litros} l · ${horasDia} h de navegación al día`,
      importe: litros * PRECIO_LITRO,
      clase: "obligatorio",
      litros,
      horas: horasDia,
    });
  }

  // 4. Limpieza final, pago único.
  if (tarifa.limpieza > 0) {
    lineas.push({
      clave: "limpieza",
      concepto: "Limpieza final",
      detalle: "Pago único",
      importe: tarifa.limpieza,
      clase: "obligatorio",
    });
  }

  // 5. Amarre y tasas portuarias.
  if (tarifa.tasaPortuariaDia > 0) {
    lineas.push({
      clave: "amarre",
      concepto: "Amarre y tasas",
      detalle: `${formatearDias(dias)} × ${euros(tarifa.tasaPortuariaDia)}`,
      importe: tarifa.tasaPortuariaDia * dias,
      clase: "obligatorio",
      dias,
      importeUnitario: tarifa.tasaPortuariaDia,
    });
  }

  // 6. Patrón, solo si se ha pedido y el barco lo ofrece.
  if (peticion.conPatron && tarifa.patronDia !== null) {
    lineas.push({
      clave: "patron",
      concepto: "Patrón",
      detalle: `${formatearDias(dias)} × ${euros(tarifa.patronDia)}`,
      importe: tarifa.patronDia * dias,
      clase: "opcional",
      dias,
      importeUnitario: tarifa.patronDia,
    });
  }

  const subtotal = lineas.reduce((suma, linea) => suma + linea.importe, 0);
  const iva = Math.round(subtotal * IVA);
  const total = subtotal + iva;

  return {
    lineas,
    subtotal,
    iva,
    total,
    totalPorDia: Math.round(total / dias),
    fianza: tarifa.fianza,
    litrosEstimados: litros,
  };
}

/**
 * Precio por día con todo incluido, que es lo que se enseña en las tarjetas
 * de resultados. La competencia enseña aquí el precio base pelado.
 */
export function precioTodoIncluidoPorDia(
  tarifa: Tarifa,
  temporada: Temporada,
  dias = 1,
): number {
  return calcularDesglose(tarifa, { dias, temporada, conPatron: false })
    .totalPorDia;
}

/**
 * Cuánto se ahorra el cliente respecto a lo que costaría reservar los mismos
 * días en temporada alta. Sirve para señalar las fechas que salen a cuenta.
 */
export function ahorroFrenteATemporadaAlta(
  tarifa: Tarifa,
  peticion: Peticion,
): number {
  if (peticion.temporada === "alta") return 0;
  const enAlta = calcularDesglose(tarifa, { ...peticion, temporada: "alta" });
  const real = calcularDesglose(tarifa, peticion);
  return enAlta.total - real.total;
}

/**
 * Deduce la temporada de una fecha a partir de los meses altos del destino.
 * `mesesAlta` llega del modelo como "7,8" (meses en base 1).
 */
export function temporadaDe(fecha: Date, mesesAlta: string): Temporada {
  const mes = fecha.getMonth() + 1;
  const altos = mesesAlta
    .split(",")
    .map((m) => Number.parseInt(m.trim(), 10))
    .filter((m) => Number.isInteger(m) && m >= 1 && m <= 12);

  if (altos.includes(mes)) return "alta";

  // Los meses pegados a la temporada alta son media; el resto, baja.
  const pegado = altos.some(
    (alto) => Math.abs(alto - mes) === 1 || Math.abs(alto - mes) === 11,
  );
  return pegado ? "media" : "baja";
}

/** Días naturales entre dos fechas, mínimo uno. */
export function diasEntre(entrada: Date, salida: Date): number {
  const MS_DIA = 86_400_000;
  const bruto = Math.round((salida.getTime() - entrada.getTime()) / MS_DIA);
  return Math.max(1, bruto);
}

function formatearDias(dias: number): string {
  return dias === 1 ? "1 día" : `${dias} días`;
}

function euros(centimos: number): string {
  return `${(centimos / 100).toFixed(0)} €`;
}
