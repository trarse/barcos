import { db } from "@/lib/db";

import type { UsuarioSesion } from "@/lib/auth";

/**
 * ¿Puede este usuario gestionar el CRM de un cliente?
 * - Admin: siempre.
 * - Armador: solo si tiene plan "pro" y el cliente ha reservado alguno de
 *   sus barcos (así cada armador ve únicamente a SUS clientes).
 */
export async function puedeGestionarCliente(
  usuario: UsuarioSesion,
  clienteId: string,
): Promise<boolean> {
  if (usuario.rol === "admin") return true;
  if (usuario.plan !== "pro" || !usuario.propietarioId) return false;
  const n = await db.reserva.count({
    where: { clienteId, barco: { propietarioId: usuario.propietarioId } },
  });
  return n > 0;
}
