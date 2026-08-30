/**
 * Catálogo transversal: tipos de embarcación, equipamiento y experiencias.
 * Los tipos y las experiencias generan landings propias, así que cada uno
 * lleva su titular y su texto.
 */

export interface TipoSemilla {
  slug: string;
  nombre: string;
  plural: string;
  descripcion: string;
  sinLicencia: boolean;
  orden: number;
}

export const TIPOS: TipoSemilla[] = [
  {
    slug: "velero",
    nombre: "Velero",
    plural: "Veleros",
    descripcion:
      "Navegación a vela para travesías de varios días. Camarotes, cocina y el menor consumo de combustible de toda la flota: el motor solo entra en puerto y en calmas.",
    sinLicencia: false,
    orden: 1,
  },
  {
    slug: "catamaran",
    nombre: "Catamarán",
    plural: "Catamaranes",
    descripcion:
      "Dos cascos, cero balanceo y una plataforma enorme entre ellos. Es la opción para grupos grandes y para quien se marea: la estabilidad no tiene comparación con un monocasco.",
    sinLicencia: false,
    orden: 2,
  },
  {
    slug: "lancha",
    nombre: "Lancha",
    plural: "Lanchas",
    descripcion:
      "Motora de día para moverse rápido entre calas. Llega a todas partes en poco tiempo, pero es donde más pesa el combustible: conviene mirar el consumo antes que la tarifa.",
    sinLicencia: false,
    orden: 3,
  },
  {
    slug: "neumatica",
    nombre: "Neumática",
    plural: "Neumáticas",
    descripcion:
      "Semirrígida ligera, fácil de gobernar y con poco calado para entrar en calas pequeñas. Los modelos más pequeños se gobiernan sin titulación: la ficha de cada barco dice si la exige.",
    sinLicencia: true,
    orden: 4,
  },
  {
    slug: "yate",
    nombre: "Yate",
    plural: "Yates",
    descripcion:
      "Motora grande con camarotes, tripulación y todos los servicios a bordo. Consumo alto y patrón obligatorio, pero es otra forma de estar en el mar.",
    sinLicencia: false,
    orden: 5,
  },
  {
    slug: "llaut",
    nombre: "Llaüt",
    plural: "Llaüts",
    descripcion:
      "La embarcación tradicional del Mediterráneo balear: casco de madera, motor lento y poco consumo. Para pasar el día fondeado sin prisa, no hay nada mejor.",
    sinLicencia: false,
    orden: 6,
  },
  {
    slug: "casa-flotante",
    nombre: "Casa flotante",
    plural: "Casas flotantes",
    descripcion:
      "Alojamiento amarrado en puerto, con la comodidad de un apartamento y las vistas de un barco. No navega: se duerme a bordo.",
    sinLicencia: true,
    orden: 7,
  },
];

export interface EquipamientoSemilla {
  slug: string;
  nombre: string;
  grupo: "navegacion" | "confort" | "ocio" | "seguridad";
}

export const EQUIPAMIENTO: EquipamientoSemilla[] = [
  { slug: "gps", nombre: "GPS y cartografía", grupo: "navegacion" },
  { slug: "piloto-automatico", nombre: "Piloto automático", grupo: "navegacion" },
  { slug: "sonda", nombre: "Sonda", grupo: "navegacion" },
  { slug: "radio-vhf", nombre: "Radio VHF", grupo: "navegacion" },
  { slug: "nevera", nombre: "Nevera", grupo: "confort" },
  { slug: "aire-acondicionado", nombre: "Aire acondicionado", grupo: "confort" },
  { slug: "ducha-popa", nombre: "Ducha de popa", grupo: "confort" },
  { slug: "cocina", nombre: "Cocina", grupo: "confort" },
  { slug: "bimini", nombre: "Toldo bimini", grupo: "confort" },
  { slug: "paddle-surf", nombre: "Paddle surf", grupo: "ocio" },
  { slug: "snorkel", nombre: "Equipo de snorkel", grupo: "ocio" },
  { slug: "altavoz", nombre: "Altavoz Bluetooth", grupo: "ocio" },
  { slug: "plataforma-bano", nombre: "Plataforma de baño", grupo: "ocio" },
  { slug: "cana-pesca", nombre: "Cañas de pesca", grupo: "ocio" },
  { slug: "chalecos", nombre: "Chalecos salvavidas", grupo: "seguridad" },
  { slug: "balsa", nombre: "Balsa salvavidas", grupo: "seguridad" },
];

export interface ExperienciaSemilla {
  slug: string;
  nombre: string;
  titular: string;
  descripcion: string;
  descripcionEn: string;
  descripcionDe: string;
  contenido: string;
  horas: number;
  orden: number;
  preguntas: { pregunta: string; respuesta: string }[];
}

export const EXPERIENCIAS: ExperienciaSemilla[] = [
  {
    slug: "atardecer",
    nombre: "Atardecer",
    titular: "Salidas al atardecer en barco",
    descripcion:
      "Tres horas de navegación con la puesta de sol desde el agua. El plan más pedido del verano y el que mejor sale de precio.",
    descripcionEn:
      "Three hours afloat with the sunset seen from the water. The most requested plan of the summer and the best value of them all.",
    descripcionDe:
      "Drei Stunden auf dem Wasser mit Sonnenuntergang. Der meistgefragte Törn des Sommers und der mit dem besten Preis.",
    contenido: `Salir a última hora de la tarde tiene una ventaja práctica además de la evidente: el viento térmico ya ha caído, el mar se queda plano y las tres horas de navegación consumen la mitad de combustible que una jornada completa.

El formato habitual son entre dos y cuatro horas con patrón incluido, salida sobre las 18:30 o 19:00 según el mes, un fondeo para bañarse mientras hay luz y la vuelta a puerto con el sol ya bajo. Muchos barcos incluyen bebida a bordo.

Es también la puerta de entrada para quien nunca ha alquilado: no hace falta título, no hay que planificar ruta y el precio de una salida de atardecer para seis personas se queda muy por debajo de lo que cuesta un día entero.`,
    horas: 3,
    orden: 1,
    preguntas: [
      {
        pregunta: "¿Cuánto dura una salida al atardecer?",
        respuesta:
          "Entre dos y cuatro horas, normalmente de 18:30 a 21:30 en verano. Suele incluir un fondeo de media hora para bañarse antes de que se ponga el sol.",
      },
      {
        pregunta: "¿Hace falta titulación para una salida al atardecer?",
        respuesta:
          "No. Prácticamente todas las salidas de atardecer llevan patrón incluido en el precio, así que no necesitas ningún título ni experiencia previa.",
      },
    ],
  },
  {
    slug: "pesca",
    nombre: "Pesca",
    titular: "Salidas de pesca en barco",
    descripcion:
      "Curricán, fondo y jigging con equipo a bordo y patrón que conoce las marcas. Licencia de pesca marítima incluida en la mayoría de las salidas.",
    descripcionEn:
      "Trolling, bottom fishing and jigging with tackle on board and a skipper who knows the marks. Sea fishing licence included on most trips.",
    descripcionDe:
      "Schleppangeln, Grundangeln und Jigging mit Ausrüstung an Bord und einem Skipper, der die Stellen kennt. Angelschein bei den meisten Törns inklusive.",
    contenido: `Una salida de pesca no es alquilar un barco y llevarse una caña. El valor está en el patrón: alguien que sabe dónde está el fondo bueno, a qué hora entra el atún y qué señuelo funciona esta semana.

Las modalidades habituales en la costa española son el curricán de superficie para lampuga, bonito y llampuga en verano; la pesca de fondo sobre roca para pargo, dentón y meros; y el jigging vertical, más deportivo, sobre veriles y bajos.

Casi todas las salidas incluyen cañas, carretes, señuelos, cebo y la licencia de pesca marítima recreativa, que es obligatoria y nominal. Conviene confirmar si la captura se puede llevar: en reservas marinas y con determinadas especies hay tallas mínimas y cupos.`,
    horas: 6,
    orden: 2,
    preguntas: [
      {
        pregunta: "¿Necesito licencia de pesca para una salida en barco?",
        respuesta:
          "Sí, la pesca marítima de recreo requiere licencia autonómica nominal. La mayoría de las salidas organizadas la incluyen o la tramitan por ti; conviene confirmarlo al reservar.",
      },
      {
        pregunta: "¿Puedo quedarme con lo que pesque?",
        respuesta:
          "En general sí, respetando tallas mínimas y cupos por especie. Dentro de reservas marinas la pesca puede estar prohibida o muy limitada. El patrón conoce la normativa de la zona.",
      },
    ],
  },
  {
    slug: "calas-y-snorkel",
    nombre: "Calas y snorkel",
    titular: "Rutas de calas y snorkel en barco",
    descripcion:
      "Jornada de fondeos encadenados en calas sin acceso por carretera, con equipo de snorkel a bordo.",
    descripcionEn:
      "A day of back-to-back anchorages in coves with no road access, with snorkelling gear on board.",
    descripcionDe:
      "Ein Tag mit mehreren Ankerstopps in Buchten ohne Straßenzugang, Schnorchelausrüstung an Bord.",
    contenido: `El plan clásico de esta costa: salir por la mañana, encadenar tres o cuatro paradas y volver a puerto al atardecer. Lo que lo hace distinto de un día de playa es que las mejores calas de la Costa Blanca no tienen acceso rodado, o lo tienen tan complicado que por mar se llega antes y con la mitad de gente.

Los tramos que mejor funcionan son tres. El de Dénia a Xàbia, con el Cabo de San Antonio y la Cova Tallada. El de Xàbia a Moraira, doblando el Cap de la Nau, donde están la Granadella, Els Arcs y la Cala Moraig. Y el Cabo de las Huertas, entre El Campello y Alicante, que es el más corto de todos y el único al que se llega sin titulación.

Casi todos los barcos llevan gafas y tubos a bordo, escalera de baño y nevera. Buena parte de esta costa tiene pradera de posidonia, que está protegida: en cada zona hay reglas sobre dónde se puede parar y dónde no, y cambian. Pregúntalo en el club antes de salir.`,
    horas: 5,
    orden: 3,
    preguntas: [
      {
        pregunta: "¿Cuántas calas se pueden visitar en un día?",
        respuesta:
          "Entre tres y cuatro sin agobios. Cada fondeo cómodo pide una hora larga, y hay que contar los desplazamientos entre calas y la vuelta a puerto con luz.",
      },
      {
        pregunta: "¿Va incluido el equipo de snorkel?",
        respuesta:
          "En la mayoría de los barcos sí: gafas, tubos y a veces aletas. Aparece detallado en el equipamiento de cada ficha.",
      },
    ],
  },
  {
    slug: "avistamiento-cetaceos",
    nombre: "Avistamiento de cetáceos",
    titular: "Avistamiento de delfines y ballenas en barco",
    descripcion:
      "Delfines mulares y listados frente a la Costa Blanca, siempre con las distancias de aproximación que marca la ley.",
    descripcionEn:
      "Bottlenose and striped dolphins off the Costa Blanca, always at the approach distances the law requires.",
    descripcionDe:
      "Große Tümmler und Streifendelfine vor der Costa Blanca, stets in den gesetzlich vorgeschriebenen Abständen.",
    contenido: `Frente a la Costa Blanca hay delfín mular y delfín listado, y en paso alguna otra especie. No es un espectáculo garantizado ni conviene que nadie te lo venda como tal: son animales salvajes en mar abierto y hay días que no aparecen.

Lo que sí se puede decir es cuándo hay más posibilidades. Mar en calma, primera hora de la mañana y salir de la costa, que es donde están. Por eso estas salidas van siempre con patrón: no es solo por la titulación, es que saber dónde mirar cambia por completo el resultado.

Y hay una parte que importa más que ver o no ver. La aproximación a cetáceos está regulada por el **Real Decreto 1727/2007**, que define un espacio de protección alrededor del animal con distancias, velocidades y maniobras permitidas y prohibidas. Sin entrar en cifras que se revisan: no se persigue, no se corta el rumbo del grupo, no se separa a las crías, no se entra en el agua y no se les da de comer. La norma vigente es la que manda, y el patrón de la salida la conoce.

Casi todo el mundo hace justo lo contrario de lo que debe cuando aparecen. Lo contamos entero en el artículo del blog.`,
    horas: 3,
    orden: 4,
    preguntas: [
      {
        pregunta: "¿Qué probabilidad hay de ver cetáceos?",
        respuesta:
          "No hay una cifra honesta que dar: son animales salvajes y hay días que no aparecen. Las mejores posibilidades son con mar en calma, a primera hora y separándose de la costa. Quien te prometa un porcentaje te está vendiendo algo que no controla.",
      },
      {
        pregunta: "¿A qué distancia se pueden acercar los barcos?",
        respuesta:
          "El Real Decreto 1727/2007 define un espacio de protección alrededor del animal, con distancias de aproximación, velocidades y maniobras permitidas y prohibidas, y con un límite de tiempo. Las cifras exactas las fija esa norma y se revisan, así que la referencia es el texto vigente. Lo que no cambia: no se persigue, no se corta el rumbo del grupo y no se entra en el agua.",
      },
    ],
  },
];
