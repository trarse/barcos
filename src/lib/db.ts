import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

/**
 * Cliente de Prisma.
 *
 * Desde la versión 7 la conexión no se declara en el esquema sino a través de
 * un driver adapter. Corre sobre PostgreSQL con `@prisma/adapter-pg`.
 *
 * Se cachea en `globalThis` porque en desarrollo Next recarga los módulos en
 * cada cambio y, sin esto, cada recarga abriría una conexión nueva.
 */

function crearCliente() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Falta DATABASE_URL. Copia .env.example a .env.");
  }

  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
}

const cache = globalThis as unknown as {
  prisma?: ReturnType<typeof crearCliente>;
};

export const db = cache.prisma ?? crearCliente();

if (process.env.NODE_ENV !== "production") {
  cache.prisma = db;
}
