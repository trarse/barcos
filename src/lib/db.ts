import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { PrismaClient } from "@/generated/prisma/client";

/**
 * Cliente de Prisma.
 *
 * Desde la versión 7 la conexión no se declara en el esquema sino a través de
 * un driver adapter. Cambiar de SQLite a PostgreSQL en producción es sustituir
 * este adaptador por `@prisma/adapter-pg` y el provider del datasource.
 *
 * Se cachea en `globalThis` porque en desarrollo Next recarga los módulos en
 * cada cambio y, sin esto, cada recarga abriría una conexión nueva.
 */

function crearCliente() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Falta DATABASE_URL. Copia .env.example a .env.");
  }

  return new PrismaClient({ adapter: new PrismaBetterSqlite3({ url }) });
}

const cache = globalThis as unknown as {
  prisma?: ReturnType<typeof crearCliente>;
};

export const db = cache.prisma ?? crearCliente();

if (process.env.NODE_ENV !== "production") {
  cache.prisma = db;
}
