/**
 * Artículos del blog.
 *
 * Viven en código y no en la base porque son contenido editorial que cambia
 * con el despliegue, no con la operativa. Cada uno enlaza a las landings
 * transaccionales que le corresponden: un blog que no reparte autoridad a las
 * páginas que venden es un blog decorativo.
 */

import type { Idioma } from "@/lib/idiomas";
import type { Pagina } from "@/lib/rutas";

export interface Articulo {
  /** Idioma en el que está escrito. No se traduce automáticamente nada. */
  idioma: Idioma;
  slug: string;
  titulo: string;
  entradilla: string;
  fecha: string;
  minutos: number;
  categoria: "Precios" | "Normativa" | "Rutas" | "Medio ambiente";
  cuerpo: string;
  /**
   * Enlaces internos que se pintan al final. Se guardan como identidad de
   * página, no como URL: así apuntan al idioma correcto sin reescribirlos.
   */
  relacionados: { texto: string; pagina: Pagina }[];
}

export const ARTICULOS: Articulo[] = [
  {
    idioma: "es",
    slug: "cuanto-cuesta-alquilar-un-barco-en-espana",
    titulo: "Cuánto cuesta de verdad alquilar un barco en España",
    entradilla:
      "La tarifa que anuncian las plataformas es entre un 40 y un 130 % inferior a lo que se acaba pagando. Estos son todos los conceptos que aparecen después, con cifras.",
    fecha: "2026-06-12",
    minutos: 8,
    categoria: "Precios",
    cuerpo: `Busca cualquier lancha de día en cualquier plataforma y verás un número redondo: 250 €, 300 €, 350 €. Ese número casi nunca es lo que pagarás. No porque nadie mienta, sino porque el precio anunciado es solo el alquiler del casco y el resto se suma en el último paso del proceso de reserva, cuando ya has invertido veinte minutos eligiendo.

Vamos con los conceptos, uno a uno.

**El combustible es el grande.** Una lancha de 250 caballos consume entre 35 y 45 litros por hora de navegación. Un día normal de calas son cuatro horas de motor: entre 140 y 180 litros. A 1,65 € el litro de gasóleo náutico, eso son entre 230 y 300 euros. Casi tanto como el alquiler. En un velero el problema no existe —consume cuatro litros a la hora y solo para maniobrar— y en un yate se dispara: 140 litros a la hora son más de 900 euros al día.

**La limpieza final** es un pago único de entre 60 y 250 euros según el tamaño. No es negociable y no aparece en la tarifa.

**El amarre y las tasas portuarias** se cobran por día y van de 20 a 300 euros. En puertos con lista de espera, como Ibiza en agosto, es donde más sube.

**El IVA** es el 21 %, y se aplica sobre todo lo anterior. Sobre 600 euros de conceptos son 126 euros más.

**La fianza** no es un coste: se bloquea en la tarjeta y se libera al devolver el barco. Va de 300 euros en una neumática pequeña a 12.000 en un yate. No forma parte del precio, pero sí del dinero que necesitas tener disponible.

### El ejemplo completo

Una Quicksilver Activ 675 en Dénia, un día de agosto, cuatro horas de navegación:

- Alquiler: 344 €
- Combustible (140 l): 231 €
- Limpieza: 68 €
- Amarre y tasas: 38 €
- IVA: 143 €
- **Total: 824 €**

La tarifa anunciada para ese mismo barco es 255 €. El precio real es 3,2 veces mayor.

### Cómo pagar menos

Lo que más baja la factura no es regatear, es elegir bien.

**Cambia el mes.** Junio y septiembre cuestan alrededor de un 25 % menos que agosto con el agua a la misma temperatura. Mayo y octubre, hasta un 45 % menos.

**Mira el consumo antes que la tarifa.** Entre dos lanchas parecidas, la de 150 caballos gastará la mitad de gasóleo que la de 250. En una semana esa diferencia son varios cientos de euros.

**Alarga la estancia.** La limpieza es un pago único: repartida entre siete días en vez de uno, deja de pesar. Y a partir de una semana casi todos los barcos aplican descuentos del 15 al 22 %.

**Plantéate el velero.** Si no tienes prisa, un velero de 12 metros cuesta menos que una lancha de 8 en total, porque el combustible es anecdótico.`,
    relacionados: [
      { texto: "Ver barcos con el precio final calculado", pagina: { tipo: "busqueda" } },
      { texto: "Alquiler de veleros en España", pagina: { tipo: "tipoBarco", tipoBarco: "velero" } },
      { texto: "Alquiler de barcos en Dénia", pagina: { tipo: "destino", destino: "denia" } },
    ],
  },
];

export function obtenerArticulo(slug: string, idioma: Idioma): Articulo | undefined {
  return ARTICULOS.find((a) => a.slug === slug && a.idioma === idioma);
}

/**
 * Artículos de un idioma, del más reciente al más antiguo.
 *
 * No hay respaldo al castellano a propósito: servir un texto en español
 * dentro de una página marcada como inglesa es peor que no tener el artículo,
 * tanto para quien lo lee como para quien lo indexa.
 */
export function articulosPorFecha(idioma: Idioma): Articulo[] {
  return ARTICULOS.filter((a) => a.idioma === idioma).sort((a, b) =>
    b.fecha.localeCompare(a.fecha),
  );
}

/** En qué idiomas existe un artículo. Alimenta el `hreflang`. */
export function idiomasDelArticulo(slug: string): Idioma[] {
  return ARTICULOS.filter((a) => a.slug === slug).map((a) => a.idioma);
}
