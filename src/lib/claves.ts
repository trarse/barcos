import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * Hash y verificación de contraseñas con scrypt (del módulo `node:crypto`),
 * sin dependencias nativas. El formato guardado es "sal:hash" en hexadecimal.
 */

export function hashClave(clave: string): string {
  const sal = randomBytes(16).toString("hex");
  const hash = scryptSync(clave, sal, 64).toString("hex");
  return `${sal}:${hash}`;
}

export function verificarClave(clave: string, almacenada: string): boolean {
  const [sal, hash] = almacenada.split(":");
  if (!sal || !hash) return false;
  const intento = scryptSync(clave, sal, 64);
  const esperado = Buffer.from(hash, "hex");
  return intento.length === esperado.length && timingSafeEqual(intento, esperado);
}

/** Token opaco para la sesión; viaja en la cookie. */
export function tokenAleatorio(): string {
  return randomBytes(32).toString("base64url");
}

/** En la base de datos solo se guarda el hash del token, nunca el token. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
