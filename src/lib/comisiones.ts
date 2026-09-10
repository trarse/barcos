/**
 * Comisión de la plataforma sobre cada alquiler. Es el margen del marketplace:
 * el armador cobra el total menos la comisión.
 */

export const COMISION_PCT = 12;

export function calcularComision(totalCents: number): {
  comisionCents: number;
  netoArmadorCents: number;
} {
  const comisionCents = Math.round((totalCents * COMISION_PCT) / 100);
  return { comisionCents, netoArmadorCents: totalCents - comisionCents };
}
