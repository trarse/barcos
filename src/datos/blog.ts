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
  {
    idioma: "es",
    slug: "que-titulacion-necesitas-para-llevar-un-barco",
    titulo: "Qué titulación necesitas para llevar un barco en España",
    entradilla:
      "Desde la exención total hasta el Capitán de Yate: qué permite cada título, cuánto cuesta sacarlo y qué se puede alquilar sin ninguno.",
    fecha: "2026-05-28",
    minutos: 7,
    categoria: "Normativa",
    cuerpo: `La normativa española de titulaciones náuticas de recreo está en el Real Decreto 875/2014. Se resume en cinco escalones y una exención.

### Sin titulación

Puedes gobernar embarcaciones de hasta **5 metros de eslora y 15 caballos** (11,03 kW) de potencia máxima, de día, sin alejarte más de **2 millas** de un puerto o lugar de abrigo. La empresa de alquiler está obligada a darte una instrucción básica antes de salir: manejo, seguridad y radio. Suele durar media hora en el pantalán.

Con eso llegas de sobra a las calas de la misma bahía, que es para lo que alquila la mayoría de la gente. No llegas a cruzar entre islas ni a salir de noche.

### Licencia de Navegación (LN)

Un curso de 6 horas y una práctica de 4. Sin examen teórico. Permite embarcaciones de hasta **6 metros** y navegar hasta **2 millas** de la costa, siempre de día. Cuesta entre 150 y 250 euros y se saca en un fin de semana.

### Patrón de Navegación Básica (PNB)

Examen teórico. Permite hasta **8 metros** de eslora y **5 millas** de la costa. Es el escalón que casi nadie hace, porque por poco más está el PER.

### Patrón de Embarcaciones de Recreo (PER)

El título de referencia en España. Examen teórico de 45 preguntas y prácticas obligatorias. Permite hasta **15 metros** de eslora y **12 millas** de la costa. Con el módulo de vela añadido, también veleros. Entre 400 y 700 euros con las prácticas incluidas.

Con el PER se puede alquilar prácticamente toda la flota de charter del Mediterráneo español, incluidos los veleros de 40 pies y la mayoría de catamaranes.

### Patrón de Yate y Capitán de Yate

24 metros y 150 millas el primero; sin límite de distancia el segundo. Son títulos para travesía oceánica y muy poca gente los necesita para alquilar.

### La alternativa: patrón contratado

Cualquier barco se puede alquilar con patrón profesional. Cuesta entre 150 y 500 euros al día según la eslora, y abre toda la flota sin ningún papel. Para un grupo de ocho personas, repartir 200 euros entre todos sale a 25 por cabeza: menos de lo que cuesta la diferencia entre una neumática pequeña y una lancha decente.

Es también la opción sensata si es tu primera vez en una zona que no conoces. Un patrón que sabe dónde está el fondo de arena y a qué hora entra el térmico cambia el día por completo.`,
    relacionados: [
      { texto: "Barcos que puedes llevar sin licencia", pagina: { tipo: "sinLicencia" } },
      { texto: "Alquiler de neumáticas", pagina: { tipo: "tipoBarco", tipoBarco: "neumatica" } },
      { texto: "Ver toda la flota", pagina: { tipo: "busqueda" } },
    ],
  },
  {
    idioma: "es",
    slug: "fondear-sin-danar-la-posidonia",
    titulo: "Fondear sin dañar la posidonia: guía práctica",
    entradilla:
      "Las multas llegan a 200.000 euros y la pradera tarda un siglo en recuperarse. Cómo reconocer el fondo, dónde está permitido y qué aplicaciones usar.",
    fecha: "2026-05-14",
    minutos: 6,
    categoria: "Medio ambiente",
    cuerpo: `La *Posidonia oceanica* no es un alga: es una planta con flores, raíces y frutos que forma praderas submarinas. La del sur de Formentera tiene más de ocho kilómetros y unos 100.000 años, y está declarada Patrimonio de la Humanidad. Es también la razón directa de que el agua de Baleares sea tan transparente: la pradera fija el sedimento y oxigena el fondo.

Un ancla arrastrando por una pradera arranca matas que tardan más de cien años en volver a crecer. Por eso el Decreto 25/2018 de Baleares prohíbe fondear sobre posidonia y prevé sanciones que llegan a los 200.000 euros en los casos graves. En verano hay embarcaciones de vigilancia recorriendo las calas.

### Cómo distinguir el fondo desde el barco

Con el sol alto y agua clara se ve perfectamente desde cubierta:

- **Arena**: manchas claras, casi blancas, de aspecto uniforme. Aquí se puede fondear.
- **Posidonia**: manchas oscuras, verdosas o marrones, con textura de pradera. Aquí no.
- **Roca**: gris, con relieve irregular y sombras marcadas. Se puede, pero el ancla agarra mal.

Con el sol bajo o el agua movida no se distingue. En ese caso, o hay boya, o hay que buscar otro sitio.

### Las herramientas

El Govern balear publica **Posidonia Maps**, una aplicación gratuita con la cartografía oficial de praderas y las zonas donde el fondeo está permitido. Es la referencia: si la app dice que ahí hay pradera, ahí no se fondea, por muy claro que se vea el fondo.

En Formentera y en varias zonas de Ibiza el fondeo se hace en **campos de boyas ecológicas** que se reservan por adelantado a través del servicio oficial. En julio y agosto se agotan con semanas de antelación, así que hay que reservar cuando se reserva el barco, no el día antes.

### Buenas prácticas

Fondea siempre en un claro de arena aunque tengas que dar dos vueltas buscando. Larga cadena suficiente —tres o cuatro veces la sonda— para que el ancla trabaje en horizontal y no arrastre. Al levar, sube en vertical sobre el ancla antes de tirar, para no barrer el fondo. Y si el ancla se ha enganchado, no fuerces el motor: bucea y suéltala.

Nada de esto es complicado. Es exactamente lo mismo que hace cualquier patrón profesional, y es la diferencia entre que dentro de veinte años el agua siga siendo así o no.`,
    relacionados: [
      { texto: "Alquiler de barcos en Formentera", pagina: { tipo: "destino", destino: "formentera" } },
      { texto: "Alquiler de barcos en Ibiza", pagina: { tipo: "destino", destino: "ibiza" } },
      { texto: "Rutas de calas y snorkel", pagina: { tipo: "experiencia", slug: "calas-y-snorkel" } },
    ],
  },
  {
    idioma: "es",
    slug: "ruta-siete-dias-mallorca-velero",
    titulo: "Ruta de siete días por Mallorca en velero",
    entradilla:
      "Una vuelta completa saliendo de Palma: etapas cortas, fondeos protegidos con cualquier viento y los pueblos que merecen bajar a tierra.",
    fecha: "2026-04-30",
    minutos: 9,
    categoria: "Rutas",
    cuerpo: `Mallorca se puede rodear en una semana sin hacer etapas largas. Son unas 130 millas de perímetro y las distancias entre fondeos rara vez pasan de 20. Esta ruta va en sentido antihorario, que es el que aprovecha mejor el térmico de la tarde en la costa sur.

### Día 1 — Palma a Cala Portals Vells (7 millas)

Etapa corta para hacerse al barco. Portals Vells tiene tres calas seguidas con fondo de arena y las cuevas excavadas de las que salió la piedra de la Seu. Buen resguardo con viento del norte.

### Día 2 — Portals Vells a Sant Elm (14 millas)

Se dobla el Cap de Cala Figuera y aparece Sa Dragonera, el islote-parque natural que cierra el canal. Fondeo en Sant Elm con vistas a la isla. Si hay tiempo, merece la pena entrar en Cala Lladó y subir al faro.

### Día 3 — Sant Elm a Port de Sóller (26 millas)

La etapa larga, y la más espectacular. Toda la costa de Tramuntana a estribor, con la sierra cayendo a plomo al agua y sin un solo puerto en medio. Sóller es una bahía casi cerrada, uno de los fondeos más seguros de la isla. Sube al pueblo en el tranvía de madera.

### Día 4 — Sóller a Cala Sant Vicenç (24 millas)

Se pasa por delante de Sa Calobra y el Torrent de Pareis, que se puede visitar fondeando un rato si la mar está tranquila. Cala Sant Vicenç, ya doblado el Cap de Formentor, es agua turquesa sobre arena.

### Día 5 — Sant Vicenç a Alcúdia (12 millas)

Etapa de descanso. La bahía de Alcúdia es amplia, poco profunda y con fondo de arena limpia. El casco antiguo amurallado está a diez minutos del puerto.

### Día 6 — Alcúdia a Cala Ratjada (20 millas)

Se dobla el Cap des Freu, el punto donde cambia el mar. Cala Ratjada es puerto pesquero con vida propia y buen marisco.

### Día 7 — Cala Ratjada a Portocolom (22 millas)

Toda la costa de levante, con las calas de Mesquida, Torta y Millor a tiro. Portocolom es un puerto natural largo y tranquilo, con casetas de pescadores de colores. Buen sitio para acabar.

### Lo que hay que saber

La Tramuntana no tiene puertos de refugio entre Sant Elm y Sóller: son 26 millas sin salida. Con viento del noroeste anunciado, esa etapa no se hace. La alternativa es dar la vuelta en sentido horario y dejar la costa norte para el final, cuando ya se conoce el parte de toda la semana.

El térmico del sur entra sobre las 13:00 y sopla del suroeste hasta el atardecer: bueno para navegar a vela, incómodo para fondear en calas orientadas a poniente.`,
    relacionados: [
      { texto: "Alquiler de veleros en Mallorca", pagina: { tipo: "destinoTipo", destino: "mallorca", tipoBarco: "velero" } },
      { texto: "Alquiler de barcos en Mallorca", pagina: { tipo: "destino", destino: "mallorca" } },
      { texto: "Alquiler de veleros en España", pagina: { tipo: "tipoBarco", tipoBarco: "velero" } },
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
