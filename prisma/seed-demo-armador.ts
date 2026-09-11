import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";
import type { Prisma } from "../src/generated/prisma/client";

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

function fechaEnMeses(meses: number, dia: number): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + meses, dia, 0, 0, 0, 0);
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

  // ---- Precio de adquisición de referencia, para la recuperación de la inversión ----
  const preciosAdquisicion: Record<string, number> = {
    "Zodiac Open 5.5": 45000,
    "Copino 38": 180000,
    "Lagoon 42": 350000,
    "Oceanis 40": 220000,
    "Sea Ray 320": 150000,
    "Bayliner VR5": 60000,
    "Quicksilver Activ 675": 70000,
    "Dufour 390 Grand Large": 200000,
    "Beneteau Flyer 8": 120000,
    "Bénéteau Oceanis 38.1": 190000,
  };
  for (const b of barcos) {
    const precio = preciosAdquisicion[b.nombre] ?? Math.round((b.esloraCm / 100) * 9000);
    await prisma.barco.update({ where: { id: b.id }, data: { precioAdquisicionCents: Math.round(precio * 100) } });
  }

  // ---- Vencimientos: mantenimiento completo al día (seguro, motor, ITB, bengalas, salvamento) ----
  for (let i = 0; i < barcos.length; i++) {
    const b = barcos[i];
    const horasBase = 350 + i * 140;
    const eslora = b.esloraCm / 100; // metros

    await prisma.vencimiento.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        tipo: "seguro",
        descripcion: "Póliza anual de seguro",
        fecha: fechaEnMeses(5 + (i % 4), 10 + (i % 5)),
        importeCents: Math.round((1500 + eslora * 150) * 100),
      },
    });

    await prisma.vencimiento.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        tipo: "motor",
        descripcion: "Cambio de aceite y filtros",
        fecha: fechaEnMeses(1 + (i % 3), 6 + (i % 7)),
        horas: horasBase + 250,
        horasActuales: horasBase,
        importeCents: Math.round((420 + eslora * 30) * 100),
      },
    });

    await prisma.vencimiento.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        tipo: "itb",
        descripcion: "Inspección técnica (ITB)",
        fecha: fechaEnMeses(3 + (i % 5), 15 + (i % 6)),
        importeCents: Math.round((280 + eslora * 20) * 100),
      },
    });

    await prisma.vencimiento.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        tipo: "bengalas",
        descripcion: "Caducidad del lote de bengalas",
        fecha: fechaEnMeses(6 + (i % 4), 20 + (i % 5)),
        importeCents: Math.round((180 + eslora * 10) * 100),
      },
    });

    await prisma.vencimiento.create({
      data: {
        propietarioId: propietario.id,
        barcoId: b.id,
        tipo: "salvamento",
        descripcion: "Revisión de material de salvamento",
        fecha: fechaEnMeses(2 + (i % 5), 12 + (i % 4)),
        importeCents: Math.round((150 + eslora * 8) * 100),
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

  // ---- Reservas (ingresos): historial + temporada completa con pico en verano ----
  await prisma.reserva.deleteMany({
    where: { barco: { propietarioId: propietario.id }, referencia: { startsWith: "RES-DEMO-" } },
  });

  // Históricas (completadas) para alimentar el gráfico y la rentabilidad.
  const historico: Array<[number, number, number]> = [
    [5, 8, 3],
    [4, 16, 4],
    [3, 5, 7],
    [2, 20, 3],
    [1, 12, 2],
  ];
  // Futuras: temporada completa desde octubre, con mucha más actividad en verano (jun-ago).
  const temporada: Array<[number, number, number]> = [
    [1, 9, 3],
    [2, 12, 2],
    [3, 22, 4],
    [4, 17, 3],
    [5, 14, 3],
    [6, 10, 4],
    [7, 6, 7],
    [8, 8, 3],
    [8, 20, 4],
    [9, 6, 7],
    [9, 13, 7],
    [9, 20, 7],
    [9, 27, 7],
    [10, 4, 7],
    [10, 11, 7],
    [10, 18, 7],
    [10, 25, 7],
    [11, 1, 7],
    [11, 8, 7],
    [11, 15, 7],
    [11, 22, 7],
    [12, 6, 3],
  ];

  const reservas: Prisma.ReservaCreateManyInput[] = [];
  let contador = 1;
  for (let i = 0; i < barcos.length; i++) {
    const b = barcos[i];

    for (let h = 0; h < historico.length; h++) {
      if ((i + h) % 4 === 0) continue;
      const [meses, dia, dias] = historico[h];
      const inicio = fechaHace(meses, dia + (i % 3));
      const fin = new Date(inicio);
      fin.setDate(fin.getDate() + dias);
      const total = Math.round(b.precioBaseDia * dias * 1.21);
      const cliente = i * 40 + h + 1;
      reservas.push({
        referencia: `RES-DEMO-${String(contador).padStart(3, "0")}`,
        barcoId: b.id,
        fechaInicio: inicio,
        fechaFin: fin,
        numDias: dias,
        numPersonas: 4 + (h % 5),
        clienteNombre: `Cliente ${cliente}`,
        clienteEmail: `cliente${cliente}@ejemplo.com`,
        precioTotalCents: total,
        estado: "completada",
        pagado: true,
        comisionCents: Math.round(total * 0.12),
        netoArmadorCents: Math.round(total * 0.88),
      });
      contador++;
    }

    for (let k = 0; k < temporada.length; k++) {
      if ((i + k) % 7 === 0) continue;
      const [meses, dia, dias] = temporada[k];
      const diaReal = Math.min(dia + (i % 3), 27);
      const inicio = fechaEnMeses(meses, diaReal);
      const fin = new Date(inicio);
      fin.setDate(fin.getDate() + dias);
      const total = Math.round(b.precioBaseDia * dias * 1.21);
      const estado = k % 5 === 0 ? "pendiente" : "confirmada";
      const cliente = 1000 + i * 40 + k;
      reservas.push({
        referencia: `RES-DEMO-${String(contador).padStart(3, "0")}`,
        barcoId: b.id,
        fechaInicio: inicio,
        fechaFin: fin,
        numDias: dias,
        numPersonas: 4 + (k % 5),
        clienteNombre: `Cliente ${cliente}`,
        clienteEmail: `cliente${cliente}@ejemplo.com`,
        precioTotalCents: total,
        estado,
        pagado: estado === "confirmada",
        comisionCents: Math.round(total * 0.12),
        netoArmadorCents: Math.round(total * 0.88),
      });
      contador++;
    }
  }

  if (reservas.length > 0) {
    await prisma.reserva.createMany({ data: reservas });
  }

  console.log(
    `Datos de ejemplo listos para "${propietario.nombre}": ${barcos.length} barcos, ${barcos.length * 5} vencimientos, ${barcos.length * 3} gastos y ${reservas.length} reservas (temporada con pico en verano).`,
  );
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
