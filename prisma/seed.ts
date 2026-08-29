/**
 * Semilla de la base de datos.
 *
 * Es determinista a propósito: dos ejecuciones producen exactamente la misma
 * base de datos. Nada de `Math.random()`, que convierte cualquier captura de
 * pantalla o test de integración en algo irrepetible.
 */

import "dotenv/config";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { PrismaClient } from "../src/generated/prisma/client";
import { MODELOS, OPINIONES, FACTOR_DESTINO } from "./datos/barcos";
import { EQUIPAMIENTO, EXPERIENCIAS, TIPOS } from "./datos/catalogo";
import { DESTINOS } from "./datos/destinos";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! }),
});

/** Nombres de propietario, repartidos de forma estable entre los barcos. */
const PROPIETARIOS = [
  { nombre: "Náutica Llevant", clase: "empresa", superAnfitrion: true, respondeEnMin: 25 },
  { nombre: "Charter Tramuntana", clase: "empresa", superAnfitrion: true, respondeEnMin: 40 },
  { nombre: "Marta y Quique", clase: "particular", superAnfitrion: false, respondeEnMin: 90 },
  { nombre: "Mediterrani Boats", clase: "empresa", superAnfitrion: true, respondeEnMin: 15 },
  { nombre: "Andreu Bonet", clase: "particular", superAnfitrion: true, respondeEnMin: 60 },
  { nombre: "Blau Charter", clase: "empresa", superAnfitrion: false, respondeEnMin: 120 },
  { nombre: "Vela i Vent", clase: "empresa", superAnfitrion: true, respondeEnMin: 30 },
  { nombre: "Rosa Ferrer", clase: "particular", superAnfitrion: false, respondeEnMin: 180 },
];

/**
 * Hash estable de una cadena. Sirve para repartir opiniones, valoraciones y
 * propietarios sin aleatoriedad: la misma clave da siempre el mismo número.
 */
function semillaDe(clave: string): number {
  let h = 2_166_136_261;
  for (let i = 0; i < clave.length; i++) {
    h ^= clave.charCodeAt(i);
    h = Math.imul(h, 16_777_619);
  }
  return Math.abs(h);
}

function aSlug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function limpiar() {
  // El orden importa: primero lo que cuelga de otras tablas.
  await prisma.opinion.deleteMany();
  await prisma.imagen.deleteMany();
  await prisma.pregunta.deleteMany();
  await prisma.barco.deleteMany();
  await prisma.experiencia.deleteMany();
  await prisma.equipamiento.deleteMany();
  await prisma.tipoBarco.deleteMany();
  await prisma.propietario.deleteMany();
  await prisma.puerto.deleteMany();
  await prisma.destino.deleteMany();
}

async function main() {
  console.log("Vaciando la base de datos…");
  await limpiar();

  // ---------------------------------------------------------------- catálogo
  console.log("Sembrando tipos, equipamiento y experiencias…");

  const tipos = new Map<string, string>();
  for (const t of TIPOS) {
    const creado = await prisma.tipoBarco.create({ data: t });
    tipos.set(t.slug, creado.id);
  }

  const equipos = new Map<string, string>();
  for (const e of EQUIPAMIENTO) {
    const creado = await prisma.equipamiento.create({ data: e });
    equipos.set(e.slug, creado.id);
  }

  const experiencias = new Map<string, string>();
  for (const x of EXPERIENCIAS) {
    const creada = await prisma.experiencia.create({
      data: {
        slug: x.slug,
        nombre: x.nombre,
        titular: x.titular,
        descripcion: x.descripcion,
        descripcionEn: x.descripcionEn,
        descripcionDe: x.descripcionDe,
        contenido: x.contenido,
        horas: x.horas,
        orden: x.orden,
        imagen: `carta:${x.slug}`,
        preguntas: {
          create: x.preguntas.map((p, i) => ({ ...p, orden: i })),
        },
      },
    });
    experiencias.set(x.slug, creada.id);
  }

  // ------------------------------------------------------- destinos y puertos
  console.log("Sembrando destinos y puertos…");

  /** puerto slug → { id, destino slug } */
  const puertos = new Map<string, { id: string; destino: string }>();

  for (const d of DESTINOS) {
    const destino = await prisma.destino.create({
      data: {
        slug: d.slug,
        nombre: d.nombre,
        provincia: d.provincia,
        comunidad: d.comunidad,
        clase: d.clase,
        titular: d.titular,
        descripcion: d.descripcion,
        descripcionEn: d.descripcionEn,
        descripcionDe: d.descripcionDe,
        contenido: d.contenido,
        sinLicencia: d.sinLicencia ?? null,
        latitud: d.latitud,
        longitud: d.longitud,
        mesesAlta: d.mesesAlta,
        destacado: d.destacado,
        orden: d.orden,
        imagen: `carta:${d.slug}`,
        preguntas: {
          create: [
            ...d.preguntas.map((p, i) => ({ ...p, orden: i, bloque: "destino" })),
            ...(d.preguntasSinLicencia ?? []).map((p, i) => ({
              ...p,
              orden: i,
              bloque: "sinLicencia",
            })),
          ],
        },
      },
    });

    for (const p of d.puertos) {
      const creado = await prisma.puerto.create({
        data: { ...p, destinoId: destino.id },
      });
      puertos.set(p.slug, { id: creado.id, destino: d.slug });
    }
  }

  // ------------------------------------------------------------ propietarios
  const propietarios: string[] = [];
  for (const p of PROPIETARIOS) {
    const creado = await prisma.propietario.create({ data: p });
    propietarios.push(creado.id);
  }

  // -------------------------------------------------------------------- flota
  console.log("Sembrando la flota…");

  let total = 0;

  for (const modelo of MODELOS) {
    for (const slugPuerto of modelo.puertos) {
      const puerto = puertos.get(slugPuerto);
      if (!puerto) {
        throw new Error(
          `El modelo "${modelo.nombre}" apunta al puerto "${slugPuerto}", que no existe.`,
        );
      }

      const tipoId = tipos.get(modelo.tipo);
      if (!tipoId) {
        throw new Error(`Tipo desconocido: "${modelo.tipo}"`);
      }

      const factor = FACTOR_DESTINO[puerto.destino] ?? 1;
      const slug = `${aSlug(modelo.nombre)}-${slugPuerto}`;
      const semilla = semillaDe(slug);

      // Valoración entre 4,3 y 5,0 y un volumen de opiniones creíble.
      const valoracion = Number((4.3 + (semilla % 8) / 10).toFixed(1));
      const numOpiniones = 6 + (semilla % 180);

      const barco = await prisma.barco.create({
        data: {
          slug,
          nombre: modelo.nombre,
          fabricante: modelo.fabricante,
          modelo: modelo.modelo,
          anio: modelo.anio,
          descripcion: modelo.descripcion,
          esloraCm: modelo.esloraCm,
          capacidad: modelo.capacidad,
          camarotes: modelo.camarotes,
          aseos: modelo.aseos,
          potenciaCv: modelo.potenciaCv,

          precioBaseDia: Math.round(modelo.precioBaseDia * factor),
          limpieza: Math.round(modelo.limpieza * factor),
          tasaPortuariaDia: Math.round(modelo.tasaPortuariaDia * factor),
          patronDia: modelo.patronDia === null ? null : Math.round(modelo.patronDia * factor),
          fianza: modelo.fianza,
          consumoLitrosHora: modelo.consumoLitrosHora,
          descuentoSemana: modelo.descuentoSemana,

          requiereTitulacion: modelo.requiereTitulacion,
          // Los barcos de empresa con más rotación aceptan reserva directa.
          reservaInstantanea: semilla % 3 !== 0,
          minimoDias: modelo.minimoDias,

          valoracion,
          numOpiniones,

          tipoId,
          puertoId: puerto.id,
          propietarioId: propietarios[semilla % propietarios.length],

          equipamiento: {
            connect: modelo.equipamiento
              .map((slugEquipo) => equipos.get(slugEquipo))
              .filter((id): id is string => Boolean(id))
              .map((id) => ({ id })),
          },
          experiencias: {
            connect: modelo.experiencias
              .map((slugExp) => experiencias.get(slugExp))
              .filter((id): id is string => Boolean(id))
              .map((id) => ({ id })),
          },
          imagenes: {
            create: [0, 1, 2, 3].map((i) => ({
              url: `carta:${modelo.tipo}:${(semilla + i) % 6}`,
              alt: `${modelo.nombre} amarrado en ${slugPuerto}`,
              orden: i,
            })),
          },
        },
      });

      // Cuatro opiniones visibles por barco, elegidas de forma estable.
      const muestra = [0, 1, 2, 3].map(
        (i) => OPINIONES[(semilla + i * 5) % OPINIONES.length],
      );
      await prisma.opinion.createMany({
        data: muestra.map((o, i) => ({
          autor: o.autor,
          nota: o.nota,
          texto: o.texto,
          // Fechas escalonadas hacia atrás desde una fecha fija.
          fecha: new Date(2026, 7 - i, 12 - i * 3),
          barcoId: barco.id,
        })),
      });

      total++;
    }
  }

  console.log(`Listo: ${DESTINOS.length} destinos, ${puertos.size} puertos y ${total} barcos.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
