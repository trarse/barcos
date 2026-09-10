/**
 * Crea (o actualiza) el usuario administrador del panel. Idempotente: se puede
 * ejecutar varias veces y siempre deja el mismo usuario con la contraseña
 * actual. Lee ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NOMBRE del entorno.
 */
import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { hashClave } from "../src/lib/claves";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@estribor.es").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("Falta ADMIN_PASSWORD en .env");
  const nombre = process.env.ADMIN_NOMBRE ?? "Administración";

  const existente = await prisma.usuario.findUnique({ where: { email } });
  if (existente) {
    await prisma.usuario.update({
      where: { email },
      data: { nombre, passwordHash: hashClave(password) },
    });
    console.log(`Usuario ${email} actualizado.`);
  } else {
    await prisma.usuario.create({
      data: { email, nombre, passwordHash: hashClave(password), rol: "admin" },
    });
    console.log(`Usuario ${email} creado.`);
  }
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
