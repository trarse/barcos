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

  // Limpia los datos de ejemplo previos de este armador (no toca los de otros).
  await prisma.gasto.deleteMany({ where: { propietarioId: propietario.id } });
  await prisma.vencimiento.deleteMany({ where: { propietarioId: propietario.id } });

  const barcos = await prisma.barco.findMany({ where: { propietarioId: propietario.id } });

  // Si el armador tiene pocos barcos, crea los que falten.
  const puerto = await prisma.puerto.findFirst();
  const tipos = await prisma.tipoBarco.findMany();
  const tipo = (slug: string) => tipos.find((t) => t.slug === slug) ?? tipos[0];

  const plantilla = [
    { slug: "zodiac-open-55-demo", nombre: "Zodiac Open 5.5", fabricante: "Zodiac", modelo: "Open 5.5", anio: 2021, esloraCm: 550, capacidad: 8, precioBaseDia: 18000, tipoSlug: "neumatica" },
    { slug: "copino-38-demo", nombre: "Copino 38", fabricante: "Copino", modelo: "38", anio: 2019, esloraCm: 1150, capacidad: 12, precioBaseDia: 35000, tipoSlug: "lancha" },
    { slug: "lagoon-42-demo", nombre: "Lagoon 42", fabricante: "Lagoon", modelo: "42", anio: 2022, esloraCm: 1280, capacidad: 10, precioBaseDia: 45000, tipoSlug: "catamaran" },
    { slug: "oceanis-40-demo", nombre: "Oceanis 40", fabricante: "Beneteau", modelo: "Oceanis 40", anio: 2020, esloraCm: 1220, capacidad: 8, precioBaseDia: 32000, tipoSlug: "velero" },
    { slug: "sea-ray-320-demo", nombre: "Sea Ray 320", fabricante: "Sea Ray", modelo: "320", anio: 2018, esloraCm: 980, capacidad: 8, precioBaseDia: 28000, tipoSlug: "lancha" },
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

  const barco = (i: number) => barcos[i % barcos.length];

  // [categoria, concepto, importe, mesesAtras, indiceBarco, factura, notas]
  const gastos: [string, string, number, number, number, string | null, string | null][] = [
    ["Amarre y puerto", "Alquiler de plaza de amarre anual", 2400, 1, 0, "F-2026-101", "Amarre en puerto base"],
    ["Amarre y puerto", "Tarifas de amarre como transeúnte", 120, 2, 1, "F-2026-118", "Escala en Dénia"],
    ["Amarre y puerto", "Suministro de agua y electricidad en pantalán", 90, 3, 2, "F-2026-125", null],
    ["Seguros y asistencia", "Póliza anual de seguro (RC y daños)", 1850, 4, 0, "F-2026-133", "Póliza 2026-2027"],
    ["Seguros y asistencia", "Asistencia en la mar (remolque)", 320, 5, 1, "F-2026-141", "Avería de batería"],
    ["Inspecciones y certificados", "Inspección Técnica de Buques (ITB)", 420, 6, 2, "F-2026-152", null],
    ["Motor y propulsión", "Cambio de aceite, filtros y rodetes", 460, 7, 0, "F-2026-160", "Motor principal"],
    ["Motor y propulsión", "Revisión del generador auxiliar", 380, 8, 1, "F-2026-168", null],
    ["Motor y propulsión", "Reparación de la hélice de proa", 950, 9, 2, "F-2026-175", "Bow thruster"],
    ["Combustible", "Repostaje de diésel", 420, 1, 0, null, "Temporada de verano"],
    ["Combustible", "Repostaje de gasolina", 180, 2, 1, null, null],
    ["Limpieza y consumibles", "Limpieza profesional tras temporada", 260, 3, 2, "F-2026-182", "Baldeo y pulido"],
    ["Varadero e izadas", "Izada y botadura con travelift", 640, 4, 0, "F-2026-189", null],
    ["Casco y obra viva", "Aplicación de antifouling", 890, 5, 1, "F-2026-196", "Pintura patente"],
    ["Electricidad y electrónica", "Sustitución del banco de baterías", 720, 6, 2, "F-2026-203", "Baterías de servicio"],
    ["Seguridad y salvamento", "Reposición de bengalas caducadas", 230, 7, 0, "F-2026-210", null],
    ["Seguridad y salvamento", "Renovación de cabos de amarre", 150, 8, 1, null, "Cabuyería"],
    ["Navegación y comunicaciones", "Cartografía electrónica (suscripción)", 180, 9, 2, "F-2026-217", "Navionics"],
    ["Velero (aparejo y velas)", "Inspección del aparejo", 340, 10, 3, "F-2026-224", "Jarcia firme"],
    ["Transporte y remolque", "Mantenimiento del remolque", 210, 11, 4, "F-2026-231", null],
    ["Tasas y administración", "Tasa portuaria T5", 120, 12, 0, null, "Tasa anual"],
    ["Gobierno y fontanería", "Reparación de la bomba de achique", 280, 6, 1, "F-2026-238", null],
  ];

  for (const [categoria, concepto, importe, meses, idx, factura, notas] of gastos) {
    const b = barco(idx);
    await prisma.gasto.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        categoria,
        concepto,
        importeCents: Math.round(importe * 100),
        factura,
        notas,
        fecha: fechaHace(meses),
      },
    });
  }

  // [tipo, descripcion, diasHasta, horas(próxima), horasActuales, indiceBarco]
  const vencimientos: [string, string, number, number | null, number | null, number][] = [
    ["motor", "Cambio de aceite y filtros", 90, 1057, 800, 2],
    ["seguro", "Póliza anual 2026-2027", 60, null, null, 0],
    ["itb", "Inspección técnica periódica", 120, null, null, 1],
    ["bengalas", "Caducidad del lote de bengalas", 30, null, null, 2],
    ["salvamento", "Revisión de la balsa salvavidas", 180, null, null, 3],
    ["despacho", "Renovación del despacho", 150, null, null, 4],
    ["motor", "Revisión motor Zodiac", 45, 620, 540, 0],
  ];

  for (const [tipoV, descripcion, dias, horas, horasActuales, idx] of vencimientos) {
    const b = barco(idx);
    await prisma.vencimiento.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        tipo: tipoV,
        descripcion,
        fecha: enDias(dias),
        horas,
        horasActuales,
      },
    });
  }

  console.log(
    `Datos de ejemplo listos para "${propietario.nombre}": ${barcos.length} barcos, ${gastos.length} gastos, ${vencimientos.length} vencimientos.`,
  );
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
