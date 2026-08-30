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
      "Semirrígida ligera, fácil de gobernar y con poco calado para entrar en calas pequeñas. Los modelos de hasta 15 caballos no requieren titulación.",
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
    contenido: `El plan clásico del Mediterráneo: salir por la mañana, encadenar tres o cuatro fondeos y volver a puerto al atardecer. Lo que lo hace distinto de un día de playa es que las mejores calas de la costa española no tienen acceso rodado, o lo tienen tan complicado que por mar se llega antes y con la mitad de gente.

Las rutas mejor valoradas son las calas de Santanyí en Mallorca, el tramo Dénia-Xàbia con la Cova Tallada, las calas del sur de Menorca y el litoral de Begur en la Costa Brava.

Casi todos los barcos llevan gafas y tubos a bordo, escalera de baño y nevera. Fondear sobre posidonia está prohibido en Baleares y sancionado con multas altas: busca las zonas de arena o las boyas ecológicas.`,
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
      "Delfines mulares, listados y calderones en el mar de Alborán y el sur de Tenerife, con las distancias de aproximación que marca la ley.",
    descripcionEn:
      "Bottlenose and striped dolphins off the Costa Blanca, always at the approach distances the law requires.",
    descripcionDe:
      "Große Tümmler und Streifendelfine vor der Costa Blanca, stets in den gesetzlich vorgeschriebenen Abständen.",
    contenido: `España tiene dos de los mejores puntos de Europa para ver cetáceos desde una embarcación de recreo: el mar de Alborán, entre Málaga y Gibraltar, y la franja sur de Tenerife entre Los Cristianos y Los Gigantes.

En Tenerife hay poblaciones residentes de calderón tropical y delfín mular que no migran, así que el avistamiento es posible los 365 días del año con una probabilidad de éxito superior al 90 % en una salida de tres horas. En Alborán la variedad es mayor —listados, mulares, calderones y algún rorcual en paso— pero más estacional.

La normativa española fija distancias mínimas de aproximación, prohíbe cortar el rumbo del grupo y limita el tiempo de permanencia. Las embarcaciones autorizadas llevan un distintivo azul; navegar con patrón conocedor de la zona es la diferencia entre ver animales de lejos y tener un buen avistamiento sin molestarlos.`,
    horas: 3,
    orden: 4,
    preguntas: [
      {
        pregunta: "¿Qué probabilidad hay de ver cetáceos?",
        respuesta:
          "En el sur de Tenerife supera el 90 % en una salida de tres horas, porque hay poblaciones residentes de calderón y delfín mular. En el mar de Alborán es algo menor y más estacional.",
      },
      {
        pregunta: "¿A qué distancia se pueden acercar los barcos?",
        respuesta:
          "La normativa fija una zona de exclusión de 60 metros y otra de permanencia restringida de 300, con prohibición de cortar el rumbo del grupo y límite de tiempo. Las embarcaciones autorizadas llevan un distintivo azul.",
      },
    ],
  },
];
