/**
 * Crea (o actualiza) un armador de demostración y lo enlaza a un Propietario
 * existente para que tenga barcos que gestionar en su área. Idempotente.
 *
 * Variables de entorno (con valores por defecto):
 *   ARMADOR_EMAIL, ARMADOR_PASSWORD, ARMADOR_NOMBRE, ARMADOR_PROPIETARIO.
 */
import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { hashClave } from "../src/lib/claves";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const email = (process.env.ARMADOR_EMAIL ?? "armador@estribor.es").trim().toLowerCase();
  const password = process.env.ARMADOR_PASSWORD ?? "Armador2026!";
  const nombre = process.env.ARMADOR_NOMBRE ?? "Armador Demo";
  const nombrePropietario = process.env.ARMADOR_PROPIETARIO ?? "Náutica Llevant";

  let propietario = await prisma.propietario.findFirst({
    where: { nombre: nombrePropietario },
  });
  if (!propietario) {
    propietario = await prisma.propietario.create({
      data: { nombre: nombrePropietario, clase: "empresa" },
    });
  }

  const existente = await prisma.usuario.findUnique({ where: { email } });
  if (existente) {
    await prisma.usuario.update({
      where: { email },
      data: { nombre, passwordHash: hashClave(password), rol: "armador" },
    });
  } else {
    await prisma.usuario.create({
      data: { email, nombre, passwordHash: hashClave(password), rol: "armador" },
    });
  }

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  await prisma.propietario.update({
    where: { id: propietario.id },
    data: { usuarioId: usuario!.id, plan: "pro" },
  });

  console.log(`Armador ${email} listo (plan pro), enlazado a "${nombrePropietario}".`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
