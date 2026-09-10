import { db } from "@/lib/db";

import { hashToken, tokenAleatorio } from "@/lib/claves";

/**
 * Autenticación real del panel: sesiones en base de datos identificadas por
 * una cookie httpOnly. El token viaja en la cookie; en la tabla solo se guarda
 * su hash, de modo que una fuga de la base de datos no permite suplantar a
 * nadie.
 */

export const COOKIE_SESION = "estribor_sesion";
const DURACION_SESION_MS = 1000 * 60 * 60 * 24 * 30; // 30 días

export function leerCookie(req: Request, nombre: string): string | undefined {
  const cabecera = req.headers.get("cookie");
  if (!cabecera) return undefined;
  for (const parte of cabecera.split(";")) {
    const i = parte.indexOf("=");
    if (i === -1) continue;
    if (parte.slice(0, i).trim() === nombre) return parte.slice(i + 1).trim();
  }
  return undefined;
}

export async function crearSesion(usuarioId: string) {
  const token = tokenAleatorio();
  const expiraEn = new Date(Date.now() + DURACION_SESION_MS);
  await db.sesion.create({
    data: { tokenHash: hashToken(token), usuarioId, expiraEn },
  });
  return { token, expiraEn };
}

export async function cerrarSesion(req: Request): Promise<void> {
  const token = leerCookie(req, COOKIE_SESION);
  if (!token) return;
  await db.sesion.deleteMany({ where: { tokenHash: hashToken(token) } });
}

export type UsuarioSesion = {
  id: string;
  email: string;
  nombre: string;
  rol: string;
};

/** Devuelve el usuario de la sesión de la cookie, o null si no hay sesión válida. */
export async function usuarioAutenticado(req: Request): Promise<UsuarioSesion | null> {
  const token = leerCookie(req, COOKIE_SESION);
  if (!token) return null;
  const sesion = await db.sesion.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { usuario: true },
  });
  if (!sesion || sesion.expiraEn.getTime() < Date.now()) return null;
  return {
    id: sesion.usuario.id,
    email: sesion.usuario.email,
    nombre: sesion.usuario.nombre,
    rol: sesion.usuario.rol,
  };
}
