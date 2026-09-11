import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

function fechaHace(meses: number, dia = 15): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - meses);
  d.setDate(dia);
  d.setHours(0, 0, 0, 0);
  return d;
}

function enDias(dias: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function main() {
  const propietario = await prisma.propietario.findFirst({ where: { nombre: "Náutica Llevant" } });
  if (!propietario) {
    throw new Error("No se encontró el propietario 'Náutica Llevant'. Ejecuta antes seed-armador.");
  }

  await prisma.gasto.deleteMany({ where: { propietarioId: propietario.id } });
  await prisma.vencimiento.deleteMany({ where: { propietarioId: propietario.id } });

  const barcos = await prisma.barco.findMany({ where: { propietarioId: propietario.id } });

  const puerto = await prisma.puerto.findFirst();
  const tipos = await prisma.tipoBarco.findMany();
  const tipo = (slug: string) => tipos.find((t) => t.slug === slug) ?? tipos[0];

  const plantilla = [
    { slug: "zodiac-open-55-demo", nombre: "Zodiac Open 5.5", fabricante: "Zodiac", modelo: "Open 5.5", anio: 2021, esloraCm: 550, capacidad: 8, precioBaseDia: 18000, tipoSlug: "neumatica" },
    { slug: "copino-38-demo", nombre: "Copino 38", fabricante: "Copino", modelo: "38", anio: 2019, esloraCm: 1150, capacidad: 12, precioBaseDia: 35000, tipoSlug: "lancha" },
    { slug: "lagoon-42-demo", nombre: "Lagoon 42", fabricante: "Lagoon", modelo: "42", anio: 2022, esloraCm: 1280, capacidad: 10, precioBaseDia: 45000, tipoSlug: "catamaran" },
    { slug: "oceanis-40-demo", nombre: "Oceanis 40", fabricante: "Beneteau", modelo: "Oceanis 40", anio: 2020, esloraCm: 1220, capacidad: 8, precioBaseDia: 32000, tipoSlug: "velero" },
    { slug: "sea-ray-320-demo", nombre: "Sea Ray 320", fabricante: "Sea Ray", modelo: "320", anio: 2018, esloraCm: 980, capacidad: 8, precioBaseDia: 28000, tipoSlug: "lancha" },
    { slug: "bayliner-vr5-demo", nombre: "Bayliner VR5", fabricante: "Bayliner", modelo: "VR5", anio: 2022, esloraCm: 640, capacidad: 9, precioBaseDia: 22000, tipoSlug: "lancha" },
    { slug: "quicksilver-675-demo", nombre: "Quicksilver Activ 675", fabricante: "Quicksilver", modelo: "Activ 675", anio: 2021, esloraCm: 675, capacidad: 10, precioBaseDia: 24000, tipoSlug: "lancha" },
    { slug: "dufour-390-demo", nombre: "Dufour 390 Grand Large", fabricante: "Dufour", modelo: "390 GL", anio: 2019, esloraCm: 1190, capacidad: 8, precioBaseDia: 30000, tipoSlug: "velero" },
    { slug: "flyer-8-demo", nombre: "Beneteau Flyer 8", fabricante: "Beneteau", modelo: "Flyer 8", anio: 2020, esloraCm: 780, capacidad: 9, precioBaseDia: 26000, tipoSlug: "lancha" },
    { slug: "oceanis-381-demo", nombre: "Bénéteau Oceanis 38.1", fabricante: "Bénéteau", modelo: "Oceanis 38.1", anio: 2021, esloraCm: 1140, capacidad: 8, precioBaseDia: 31000, tipoSlug: "velero" },
  ];

  for (const b of plantilla) {
    if (barcos.some((x) => x.nombre === b.nombre)) continue;
    if (!puerto) break;
    const t = tipo(b.tipoSlug);
    if (!t) continue;
    const creado = await prisma.barco.create({
      data: {
        slug: b.slug,
        nombre: b.nombre,
        fabricante: b.fabricante,
        modelo: b.modelo,
        anio: b.anio,
        descripcion: `${b.nombre}, de la flota de Náutica Llevant, en la Costa Blanca.`,
        esloraCm: b.esloraCm,
        capacidad: b.capacidad,
        precioBaseDia: b.precioBaseDia,
        tipoId: t.id,
        puertoId: puerto.id,
        propietarioId: propietario.id,
      },
    });
    barcos.push(creado);
  }

  if (barcos.length === 0) {
    throw new Error("El armador no tiene barcos y no se pudieron crear.");
  }

  // ---- Vencimientos: 2-3 por cada barco, con urgencias variadas ----
  const extras = ["bengalas", "itb", "salvamento"];
  for (let i = 0; i < barcos.length; i++) {
    const b = barcos[i];
    const horasBase = 350 + i * 140;

    // Seguro (fecha).
    await prisma.vencimiento.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        tipo: "seguro",
        descripcion: "Póliza anual de seguro",
        fecha: enDias(20 + (i % 5) * 22),
      },
    });

    // Motor (horas actuales + próxima revisión + fecha).
    await prisma.vencimiento.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        tipo: "motor",
        descripcion: "Cambio de aceite y filtros",
        fecha: enDias(45 + (i % 4) * 18),
        horas: horasBase + 250,
        horasActuales: horasBase,
      },
    });

    // Uno extra rotando: bengalas / ITB / salvamento.
    const extra = extras[i % extras.length];
    const extraDesc =
      extra === "bengalas" ? "Caducidad del lote de bengalas" : extra === "itb" ? "Inspección técnica (ITB)" : "Revisión de material de salvamento";
    await prisma.vencimiento.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        tipo: extra,
        descripcion: extraDesc,
        fecha: enDias(75 + (i % 6) * 18),
      },
    });
  }

  // ---- Gastos: 2-3 por cada barco, categorías variadas ----
  const ciclos: [string, string, number][] = [
    ["Amarre y puerto", "Plaza de amarre anual", 2400],
    ["Seguros y asistencia", "Póliza anual de seguro", 1850],
    ["Motor y propulsión", "Cambio de aceite y filtros", 460],
    ["Combustible", "Repostaje de diésel", 420],
    ["Limpieza y consumibles", "Limpieza profesional", 260],
    ["Varadero e izadas", "Izada y botadura", 640],
    ["Casco y obra viva", "Antifouling", 890],
    ["Electricidad y electrónica", "Banco de baterías", 720],
    ["Seguridad y salvamento", "Reposición de bengalas", 230],
    ["Tasas y administración", "Tasa portuaria T5", 120],
  ];

  for (let i = 0; i < barcos.length; i++) {
    const b = barcos[i];
    const [cat1, con1, imp1] = ciclos[i % ciclos.length];
    const [cat2, con2, imp2] = ciclos[(i + 3) % ciclos.length];

    await prisma.gasto.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        categoria: "Amarre y puerto",
        concepto: "Alquiler de plaza de amarre",
        importeCents: 180000 + i * 6000,
        factura: `F-2026-${101 + i}`,
        notas: "Puerto base",
        fecha: fechaHace(1 + (i % 3)),
      },
    });
    await prisma.gasto.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        categoria: cat1,
        concepto: `${con1} (${b.nombre})`,
        importeCents: Math.round(imp1 * 100) + i * 1500,
        factura: i % 2 === 0 ? `F-2026-${201 + i}` : null,
        notas: null,
        fecha: fechaHace(2 + (i % 4)),
      },
    });
    await prisma.gasto.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        categoria: cat2,
        concepto: con2,
        importeCents: Math.round(imp2 * 100) + i * 900,
        factura: null,
        notas: null,
        fecha: fechaHace(4 + (i % 5)),
      },
    });
  }

  console.log(
    `Datos de ejemplo listos para "${propietario.nombre}": ${barcos.length} barcos, ${barcos.length * 3} vencimientos, ${barcos.length * 3} gastos.`,
  );
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
