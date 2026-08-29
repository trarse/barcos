import "server-only";

import { cache } from "react";

import { db } from "./db";
import type { Filtros } from "./filtros";
import { ordenar, rangoDePagina, totalPaginas } from "./filtros";
import {
  calcularDesglose,
  precioTodoIncluidoPorDia,
  temporadaDe,
  type Tarifa,
  type Temporada,
} from "./precio";

/**
 * Acceso a datos.
 *
 * Todas las funciones van envueltas en `cache` de React: una misma página
 * suele pedir el destino en `generateMetadata` y otra vez en el componente,
 * y así la consulta se hace una sola vez por petición.
 *
 * El precio con todo incluido se calcula aquí, no en la plantilla. Es el dato
 * que gobierna el orden y el filtrado, así que tiene que existir antes de
 * pintar nada.
 */

export interface BarcoResumen {
  slug: string;
  nombre: string;
  fabricante: string;
  anio: number;
  tipoSlug: string;
  tipoNombre: string;
  puertoNombre: string;
  destinoSlug: string;
  destinoNombre: string;
  esloraCm: number;
  capacidad: number;
  camarotes: number;
  potenciaCv: number;
  /** Precio por día con combustible, limpieza, amarre, tasas e IVA. */
  precioDia: number;
  /** Tarifa pelada, la que anuncia la competencia. Se enseña para comparar. */
  precioBaseDia: number;
  valoracion: number;
  opiniones: number;
  requiereTitulacion: boolean;
  reservaInstantanea: boolean;
  imagen: string;
  temporada: Temporada;
}

/** Convierte una fila de Prisma en la tarifa que entiende el motor de precios. */
function tarifaDe(barco: {
  precioBaseDia: number;
  limpieza: number;
  tasaPortuariaDia: number;
  patronDia: number | null;
  fianza: number;
  consumoLitrosHora: number;
  descuentoSemana: number;
}): Tarifa {
  return {
    precioBaseDia: barco.precioBaseDia,
    limpieza: barco.limpieza,
    tasaPortuariaDia: barco.tasaPortuariaDia,
    patronDia: barco.patronDia,
    fianza: barco.fianza,
    consumoLitrosHora: barco.consumoLitrosHora,
    descuentoSemana: barco.descuentoSemana,
  };
}

/** Lo que hay que traer de la base para poder resumir un barco. */
const INCLUIR_RESUMEN = {
  tipo: true,
  puerto: { include: { destino: true } },
  imagenes: { orderBy: { orden: "asc" }, take: 1 },
} as const;

type FilaResumen = Awaited<
  ReturnType<typeof db.barco.findMany<{ include: typeof INCLUIR_RESUMEN }>>
>[number];

function resumir(barco: FilaResumen, hoy: Date): BarcoResumen {
  const temporada = temporadaDe(hoy, barco.puerto.destino.mesesAlta);

  return {
    slug: barco.slug,
    nombre: barco.nombre,
    fabricante: barco.fabricante,
    anio: barco.anio,
    tipoSlug: barco.tipo.slug,
    tipoNombre: barco.tipo.nombre,
    puertoNombre: barco.puerto.nombre,
    destinoSlug: barco.puerto.destino.slug,
    destinoNombre: barco.puerto.destino.nombre,
    esloraCm: barco.esloraCm,
    capacidad: barco.capacidad,
    camarotes: barco.camarotes,
    potenciaCv: barco.potenciaCv,
    precioDia: precioTodoIncluidoPorDia(tarifaDe(barco), temporada),
    precioBaseDia: barco.precioBaseDia,
    valoracion: barco.valoracion,
    opiniones: barco.numOpiniones,
    requiereTitulacion: barco.requiereTitulacion,
    reservaInstantanea: barco.reservaInstantanea,
    imagen: barco.imagenes[0]?.url ?? `carta:${barco.tipo.slug}:0`,
    temporada,
  };
}

// ----------------------------------------------------------------- destinos

export const listarDestinos = cache(async () =>
  db.destino.findMany({
    orderBy: [{ destacado: "desc" }, { orden: "asc" }],
    include: { _count: { select: { puertos: true } } },
  }),
);

export const obtenerDestino = cache(async (slug: string) =>
  db.destino.findUnique({
    where: { slug },
    include: {
      puertos: true,
      preguntas: { orderBy: { orden: "asc" } },
    },
  }),
);

/**
 * Destinos con nombre propio: la isla, el peñón, la cueva. Se piden con sus
 * accesos porque el valor de la página está justo ahí — en enlazar el sitio
 * que la gente busca con el puerto que se lo vende.
 */
export const listarLugares = cache(async () =>
  db.lugar.findMany({
    orderBy: { orden: "asc" },
    include: {
      accesos: {
        orderBy: { minutos: "asc" },
        include: { destino: { select: { slug: true, nombre: true } } },
      },
    },
  }),
);

export const obtenerLugar = cache(async (slug: string) =>
  db.lugar.findUnique({
    where: { slug },
    include: {
      accesos: {
        orderBy: { minutos: "asc" },
        include: { destino: { select: { slug: true, nombre: true } } },
      },
      preguntas: { orderBy: { orden: "asc" } },
    },
  }),
);

/** Los lugares a los que se llega desde un puerto, del más cercano al más lejano. */
export const lugaresDesde = cache(async (destinoSlug: string) =>
  db.lugarDesde.findMany({
    where: { destino: { slug: destinoSlug } },
    orderBy: { minutos: "asc" },
    include: { lugar: { select: { slug: true, nombre: true, clase: true } } },
  }),
);

/** Cuántos barcos hay amarrados en cada destino. Alimenta las tarjetas. */
export const contarPorDestino = cache(async () => {
  const puertos = await db.puerto.findMany({
    select: {
      destino: { select: { slug: true } },
      _count: { select: { barcos: true } },
    },
  });

  const cuenta = new Map<string, number>();
  for (const p of puertos) {
    cuenta.set(p.destino.slug, (cuenta.get(p.destino.slug) ?? 0) + p._count.barcos);
  }
  return cuenta;
});

// -------------------------------------------------------------------- tipos

export const listarTipos = cache(async () =>
  db.tipoBarco.findMany({ orderBy: { orden: "asc" } }),
);

export const obtenerTipo = cache(async (slug: string) =>
  db.tipoBarco.findUnique({ where: { slug } }),
);

/**
 * Tipos de barco con flota en un destino, con su cuenta. Es lo que alimenta
 * los enlaces internos a las landings de cola larga; los tipos sin barcos no
 * salen porque enlazar a una página vacía es tirar autoridad.
 */
export const tiposEnDestino = cache(async (destinoSlug: string) => {
  const filas = await db.barco.findMany({
    where: { publicado: true, puerto: { destino: { slug: destinoSlug } } },
    select: { tipo: true },
  });

  const cuenta = new Map<string, { slug: string; nombre: string; plural: string; n: number }>();
  for (const { tipo } of filas) {
    const previo = cuenta.get(tipo.slug);
    if (previo) {
      previo.n++;
    } else {
      cuenta.set(tipo.slug, {
        slug: tipo.slug,
        nombre: tipo.nombre,
        plural: tipo.plural,
        n: 1,
      });
    }
  }
  return [...cuenta.values()].sort((a, b) => b.n - a.n);
});

// -------------------------------------------------------------- equipamiento

export const listarEquipamiento = cache(async () =>
  db.equipamiento.findMany({ orderBy: { nombre: "asc" } }),
);

// -------------------------------------------------------------- experiencias

export const listarExperiencias = cache(async () =>
  db.experiencia.findMany({
    orderBy: { orden: "asc" },
    include: { _count: { select: { barcos: true } } },
  }),
);

export const obtenerExperiencia = cache(async (slug: string) =>
  db.experiencia.findUnique({
    where: { slug },
    include: { preguntas: { orderBy: { orden: "asc" } } },
  }),
);

// -------------------------------------------------------------------- barcos

export interface Resultado {
  barcos: BarcoResumen[];
  total: number;
  paginas: number;
}

/**
 * Búsqueda con filtros.
 *
 * Lo que se puede resolver en SQL se resuelve en SQL. El tope de precio es la
 * excepción: se aplica sobre el precio con todo incluido, que es un cálculo, no
 * una columna. Con el tamaño de catálogo actual filtrar eso en memoria es
 * inmediato; si la flota creciera, tocaría materializar el precio en la tabla.
 */
export const buscarBarcos = cache(
  async (filtros: Filtros, hoy = new Date()): Promise<Resultado> => {
    const filas = await db.barco.findMany({
      where: {
        publicado: true,
        ...(filtros.tipo ? { tipo: { slug: filtros.tipo } } : {}),
        ...(filtros.destino
          ? { puerto: { destino: { slug: filtros.destino } } }
          : {}),
        ...(filtros.capacidadMinima
          ? { capacidad: { gte: filtros.capacidadMinima } }
          : {}),
        ...(filtros.sinLicencia ? { requiereTitulacion: false } : {}),
        ...(filtros.conPatron ? { patronDia: { not: null } } : {}),
        ...(filtros.reservaInstantanea ? { reservaInstantanea: true } : {}),
        ...(filtros.equipamiento.length > 0
          ? {
              AND: filtros.equipamiento.map((slug) => ({
                equipamiento: { some: { slug } },
              })),
            }
          : {}),
      },
      include: INCLUIR_RESUMEN,
    });

    let barcos = filas.map((fila) => resumir(fila, hoy));

    if (filtros.precioMaximo) {
      barcos = barcos.filter((b) => b.precioDia <= filtros.precioMaximo!);
    }

    barcos = ordenar(barcos, filtros.orden);

    const total = barcos.length;
    const [desde, hasta] = rangoDePagina(filtros.pagina);

    return {
      barcos: barcos.slice(desde, hasta),
      total,
      paginas: totalPaginas(total),
    };
  },
);

/** Cuántos barcos se pueden gobernar sin titulación. */
export const contarSinLicencia = cache(async () =>
  db.barco.count({ where: { publicado: true, requiereTitulacion: false } }),
);

/** Los mejor valorados del catálogo, para la portada. */
export const barcosDestacados = cache(async (cuantos = 6, hoy = new Date()) => {
  const filas = await db.barco.findMany({
    where: { publicado: true },
    include: INCLUIR_RESUMEN,
    orderBy: [{ valoracion: "desc" }, { numOpiniones: "desc" }],
    take: cuantos * 3,
  });

  // Un barco por modelo, para que la portada no repita el mismo casco.
  const vistos = new Set<string>();
  const seleccion: BarcoResumen[] = [];
  for (const fila of filas) {
    if (vistos.has(fila.nombre)) continue;
    vistos.add(fila.nombre);
    seleccion.push(resumir(fila, hoy));
    if (seleccion.length === cuantos) break;
  }
  return seleccion;
});

/** Barcos que ofrecen una experiencia, mejor valorados primero. */
export const barcosDeExperiencia = cache(
  async (slug: string, cuantos = 12, hoy = new Date()): Promise<BarcoResumen[]> => {
    const filas = await db.barco.findMany({
      where: { publicado: true, experiencias: { some: { slug } } },
      include: INCLUIR_RESUMEN,
      orderBy: [{ valoracion: "desc" }, { numOpiniones: "desc" }],
      take: cuantos,
    });
    return filas.map((fila) => resumir(fila, hoy));
  },
);

export const obtenerBarco = cache(async (slug: string) =>
  db.barco.findUnique({
    where: { slug },
    include: {
      tipo: true,
      propietario: true,
      puerto: { include: { destino: true } },
      imagenes: { orderBy: { orden: "asc" } },
      equipamiento: { orderBy: { nombre: "asc" } },
      experiencias: { orderBy: { orden: "asc" } },
      opiniones: { orderBy: { fecha: "desc" } },
    },
  }),
);

/** Barcos parecidos en el mismo destino, para el pie de la ficha. */
export const barcosSimilares = cache(
  async (slug: string, destinoSlug: string, tipoSlug: string, hoy = new Date()) => {
    const filas = await db.barco.findMany({
      where: {
        publicado: true,
        slug: { not: slug },
        puerto: { destino: { slug: destinoSlug } },
      },
      include: INCLUIR_RESUMEN,
      take: 12,
    });

    return filas
      .map((fila) => resumir(fila, hoy))
      // Primero los del mismo tipo: es lo que de verdad compara el usuario.
      .sort((a, b) => {
        const mismoA = a.tipoSlug === tipoSlug ? 0 : 1;
        const mismoB = b.tipoSlug === tipoSlug ? 0 : 1;
        return mismoA - mismoB || b.valoracion - a.valoracion;
      })
      .slice(0, 3);
  },
);

/** Desglose completo de una reserva concreta. Lo usa la ficha del barco. */
export async function desgloseDeBarco(
  slug: string,
  dias: number,
  conPatron: boolean,
  hoy = new Date(),
) {
  const barco = await obtenerBarco(slug);
  if (!barco) return null;

  const temporada = temporadaDe(hoy, barco.puerto.destino.mesesAlta);
  return calcularDesglose(tarifaDe(barco), { dias, temporada, conPatron });
}

/**
 * Barcos de la comparativa, en el mismo orden en que los eligió el usuario.
 * Prisma devuelve las filas en el orden que quiere, así que se reordenan aquí:
 * si las columnas bailan respecto a lo que se seleccionó, la tabla confunde.
 */
export const barcosParaComparar = cache(async (slugs: readonly string[]) => {
  if (slugs.length === 0) return [];

  const filas = await db.barco.findMany({
    where: { publicado: true, slug: { in: [...slugs] } },
    include: {
      tipo: true,
      puerto: { include: { destino: true } },
      imagenes: { orderBy: { orden: "asc" }, take: 1 },
      equipamiento: { orderBy: { nombre: "asc" } },
    },
  });

  const porSlug = new Map(filas.map((f) => [f.slug, f]));
  return slugs
    .map((slug) => porSlug.get(slug))
    .filter((f): f is (typeof filas)[number] => f !== undefined);
});

/** Todos los slugs publicados, para `generateStaticParams` y el sitemap. */
export const slugsDeBarcos = cache(async () =>
  db.barco.findMany({
    where: { publicado: true },
    select: { slug: true },
    orderBy: { slug: "asc" },
  }),
);

/**
 * Pares destino × tipo que tienen al menos un barco. Es la lista de landings
 * de cola larga que se prerenderizan: generar combinaciones vacías sería
 * llenar el índice de páginas sin contenido.
 */
export const paresDestinoTipo = cache(async () => {
  const filas = await db.barco.findMany({
    where: { publicado: true },
    select: {
      tipo: { select: { slug: true } },
      puerto: { select: { destino: { select: { slug: true } } } },
    },
  });

  const pares = new Map<string, { destino: string; tipo: string }>();
  for (const fila of filas) {
    const destino = fila.puerto.destino.slug;
    const tipo = fila.tipo.slug;
    pares.set(`${destino}/${tipo}`, { destino, tipo });
  }
  return [...pares.values()];
});
