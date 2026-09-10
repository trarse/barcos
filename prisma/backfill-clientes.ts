/**
 * Backfill: crea la entidad Cliente a partir de las reservas existentes y
 * enlaza cada reserva a su cliente (por email). Idempotente.
 */
import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { paisDeTelefono } from "../src/lib/telefonos";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const sinCliente = await prisma.reserva.findMany({
    where: { clienteId: null },
    select: { id: true, clienteEmail: true, clienteNombre: true, clienteTelefono: true, idioma: true },
  });

  const porEmail = new Map<
    string,
    { nombre: string; telefono: string | null; idioma: string; ids: string[] }
  >();
  for (const r of sinCliente) {
    const email = r.clienteEmail.toLowerCase();
    const grupo = porEmail.get(email) ?? {
      nombre: r.clienteNombre,
      telefono: r.clienteTelefono,
      idioma: r.idioma,
      ids: [],
    };
    grupo.ids.push(r.id);
    porEmail.set(email, grupo);
  }

  for (const [email, grupo] of porEmail) {
    const cliente = await prisma.cliente.upsert({
      where: { email },
      update: {},
      create: {
        email,
        nombre: grupo.nombre,
        telefono: grupo.telefono,
        idioma: grupo.idioma,
        pais: paisDeTelefono(grupo.telefono ?? "")?.pais ?? null,
      },
    });
    await prisma.reserva.updateMany({
      where: { id: { in: grupo.ids } },
      data: { clienteId: cliente.id },
    });
  }

  console.log(`Backfill: ${porEmail.size} clientes creados/enlazados.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
