/**
 * Ocasiones.
 *
 * No son actividades —eso son las experiencias, lo que se hace en el agua—
 * sino el motivo por el que se celebra algo a bordo. Se separan porque son
 * consultas distintas con intención distinta: quien busca «despedida de
 * soltera en barco» y quien busca «barco para evento de empresa» no quieren
 * lo mismo ni pagan lo mismo, y una sola página no puede rankear para las dos.
 *
 * La clave de conversión aquí es el **precio por persona**: nadie compara
 * 520 € contra 480 €, pero todo el mundo entiende 47 € por cabeza.
 *
 * `capacidadMinima` filtra la flota que se enseña. Si un barco no tiene
 * plazas para el grupo, no pinta nada en esta página.
 */

import type { Idioma } from "@/lib/idiomas";
import type { Programable } from "@/lib/publicacion";
import { estaPublicado, soloPublicados } from "@/lib/publicacion";
import type { Pagina } from "@/lib/rutas";

export interface Ocasion extends Programable {
  idioma: Idioma;
  slug: string;
  nombre: string;
  titulo: string;
  descripcion: string;
  /** Plazas mínimas del barco para aparecer en esta página. */
  capacidadMinima: number;
  /**
   * Si la reserva debe pasar por presupuesto en lugar de por el carrito.
   * Las de empresa necesitan factura, seguro nominal y a veces contrato:
   * mandarlas al checkout es perder la venta.
   */
  porPresupuesto: boolean;
  contenido: string;
  preguntas: { pregunta: string; respuesta: string }[];
  relacionados: { texto: string; pagina: Pagina }[];
}

export const OCASIONES: Ocasion[] = [
  {
    idioma: "es",
    slug: "despedidas",
    nombre: "Despedidas",
    titulo: "Despedidas de soltera y soltero en barco",
    descripcion:
      "Un barco entero para el grupo, con patrón, música y horario propio. Sale por persona menos de lo que cuesta una cena, y no hay cola en la puerta.",
    capacidadMinima: 8,
    porPresupuesto: false,
    contenido: `Es el plan que mejor funciona de toda la costa y el que más se malinterpreta cuando se mira el precio. Nadie compara 520 euros contra 480: lo que hay que mirar es cuánto sale por cabeza, y ahí un barco entero para once personas se pone en el precio de una cena buena.

**Lo primero: el barco es vuestro.** No compartís cubierta con desconocidos ni tenéis horario impuesto. Salís cuando queréis, fondeáis donde os apetece y volvéis cuando toque. Esa es la diferencia real con una excursión organizada, y es lo que hace que el recuerdo sea otro.

**Con patrón, siempre.** Nadie del grupo tiene que preocuparse de nada, y si va a haber bebida a bordo esto deja de ser una comodidad y pasa a ser lo único sensato. El patrón conduce, vosotros a lo vuestro.

**Cuántos sois.** A partir de ocho personas el precio por cabeza empieza a caer de verdad. Con doce, que es la capacidad de muchos barcos de la flota, el reparto es el mejor de todos. Por debajo de seis sale más a cuenta un barco pequeño y medio día.

**Cuándo.** Los sábados de julio y agosto se reservan con semanas de antelación y son los más caros. Si el grupo puede mover la fecha a un viernes, o a junio o septiembre, la diferencia de precio es notable y el mar está mejor.

**Lo que hay que preguntar antes de reservar.** Si se puede llevar bebida a bordo y en qué envase —el cristal está prohibido en muchos barcos—, si hay nevera y equipo de música, y qué pasa si el parte marítimo impide salir. Esto último conviene tenerlo por escrito.

**Dónde.** Alicante y Benidorm concentran la mayoría de las despedidas por logística: hoteles cerca, transporte y ambiente después. Pero si el grupo busca calas y no ruido, salir de Jávea o de Moraira cambia el día por completo.`,
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta una despedida en barco por persona?",
        respuesta:
          "Depende del barco y del grupo, pero un barco entero para diez o doce personas con patrón sale habitualmente por menos de lo que cuesta una cena buena por cabeza. En cada ficha ves el precio final del barco y puedes dividirlo entre los que vayáis.",
      },
      {
        pregunta: "¿Se puede llevar bebida y música al barco?",
        respuesta:
          "Casi siempre sí, pero pregúntalo antes: muchos barcos no admiten envases de cristal y no todos llevan nevera o equipo de sonido. Viene indicado en el equipamiento de cada ficha.",
      },
      {
        pregunta: "¿Hace falta que alguien del grupo tenga titulación?",
        respuesta:
          "No, si reserváis con patrón, que es lo habitual en una despedida y lo único sensato si va a haber bebida a bordo. La titulación la pone él.",
      },
      {
        pregunta: "¿Con cuánta antelación hay que reservar?",
        respuesta:
          "Para un sábado de julio o agosto, semanas. Si el grupo puede mover la fecha a un viernes o a junio o septiembre, hay más disponibilidad, sale más barato y el mar suele estar mejor.",
      },
    ],
    relacionados: [
      { texto: "Alquiler de barcos en Alicante", pagina: { tipo: "destino", destino: "alicante" } },
      { texto: "Alquiler de barcos en Benidorm", pagina: { tipo: "destino", destino: "benidorm" } },
      { texto: "Barcos sin licencia en Benidorm", pagina: { tipo: "sinLicenciaDestino", destino: "benidorm" } },
    ],
  },
  {
    idioma: "es",
    slug: "cumpleanos",
    nombre: "Cumpleaños",
    titulo: "Celebrar un cumpleaños en barco",
    descripcion:
      "Medio día de barco con la gente que quieres y sin montar nada. Se reserva con poca antelación y funciona igual de bien con niños que sin ellos.",
    capacidadMinima: 6,
    porPresupuesto: false,
    contenido: `Es el plan de última hora por excelencia y uno de los pocos que funciona igual de bien con seis personas que con doce. No hay que reservar mesa, ni decorar nada, ni recoger después.

**Medio día suele bastar.** Cuatro o cinco horas dan para salir, fondear en una cala, comer a bordo y volver sin prisa. Cuesta bastante menos que un día completo y el grupo no llega saturado al final.

**Con niños funciona mejor de lo que la gente cree**, con dos condiciones: que la bahía sea tranquila —Altea y Moraira son las mejores de esta costa para eso— y que se salga temprano, antes de que entre la brisa de la tarde. Los chalecos de talla infantil no siempre están a bordo por defecto: hay que pedirlos al reservar.

**Lo que hace que salga bien:** llevar la comida hecha y el hielo comprado, no improvisar el fondeo y volver antes de que el grupo esté cansado. Un día de barco que se alarga de más se recuerda peor que uno que se queda corto.

**La tarta a bordo es mala idea**, y lo decimos por experiencia ajena: se derrite, se cae con el balanceo y ensuciar el barco tiene coste. Si hay que soplar velas, mejor en el pantalán antes de salir o al volver.

**Con poca antelación.** A diferencia de las despedidas, los cumpleaños se reservan con días, no con semanas. Entre semana y fuera de julio y agosto casi siempre hay algo libre, y a mejor precio.`,
    preguntas: [
      {
        pregunta: "¿Medio día o día completo para un cumpleaños?",
        respuesta:
          "Medio día suele bastar: cuatro o cinco horas dan para salir, fondear, comer a bordo y volver sin prisa. Cuesta bastante menos y el grupo no llega saturado al final.",
      },
      {
        pregunta: "¿Se puede ir con niños?",
        respuesta:
          "Sí, y funciona bien si la bahía es tranquila y se sale temprano, antes de la brisa de la tarde. Pide chalecos de talla infantil al reservar: no todos los barcos los llevan a bordo por defecto.",
      },
      {
        pregunta: "¿Con cuánta antelación se reserva?",
        respuesta:
          "Con días, no con semanas. Entre semana y fuera de julio y agosto casi siempre queda algo libre y a mejor precio que en fin de semana de temporada alta.",
      },
    ],
    relacionados: [
      { texto: "Alquiler de barcos en Altea", pagina: { tipo: "destino", destino: "altea" } },
      { texto: "Alquiler de barcos en Moraira", pagina: { tipo: "destino", destino: "moraira" } },
      { texto: "Qué titulación necesito", pagina: { tipo: "guia", slug: "que-titulacion-necesito-para-llevar-un-barco" } },
    ],
  },
  {
    idioma: "es",
    slug: "eventos-de-empresa",
    nombre: "Empresa",
    titulo: "Barcos para eventos de empresa",
    descripcion:
      "Incentivos, reuniones fuera de la oficina y jornadas de equipo a bordo. Con factura, seguro documentado y presupuesto en 24 horas.",
    capacidadMinima: 10,
    porPresupuesto: true,
    contenido: `Un evento de empresa a bordo no se reserva como una escapada de fin de semana, y tratarlo igual es la forma más rápida de que no salga. Lo que necesita una empresa no es un botón de pagar: es un presupuesto formal, una factura correcta y saber que el seguro cubre a los asistentes.

**Por eso aquí se trabaja con presupuesto.** Nos dices cuántos sois, la fecha, el puerto de salida y qué necesitas a bordo, y te mandamos una propuesta con el precio cerrado y la documentación en veinticuatro horas. Sin sorpresas en el muelle y sin que nadie de tu equipo tenga que adelantar dinero.

**Qué se puede montar.** Desde una salida de medio día para un equipo de diez hasta varias embarcaciones coordinadas para grupos grandes. Con catering a bordo, con patrón para cada barco y, si hace falta, con horario ajustado a una agenda que tiene reunión antes o cena después.

**Lo que hay que decidir pronto.** El número de asistentes, porque condiciona el barco y a partir de ahí todo lo demás. Y la fecha: en junio y septiembre hay disponibilidad y precios razonables; en julio y agosto compites con toda la costa.

**Lo que siempre preguntamos y casi nadie tiene pensado:** qué pasa si alguien se marea, si hay asistentes con movilidad reducida y si el plan aguanta un cambio de fecha. Un evento con veinte personas y un parte marítimo malo necesita una alternativa decidida de antemano, no improvisada esa mañana.

**Septiembre y octubre son los mejores meses** para esto en la Costa Blanca, y casi nadie lo aprovecha: el mar está mejor que en agosto, las calas están vacías y los precios bajan. Si la agenda de la empresa lo permite, es cuando mejor sale.`,
    preguntas: [
      {
        pregunta: "¿Emitís factura para la empresa?",
        respuesta:
          "Sí. El presupuesto se emite a nombre de la empresa con todos los datos fiscales y la factura se entrega tras el servicio. Es parte del motivo por el que estas reservas van por presupuesto y no por el carrito.",
      },
      {
        pregunta: "¿Cuánta gente cabe?",
        respuesta:
          "Depende del barco, y por eso en esta página solo salen los de diez plazas o más. Para grupos grandes se coordinan varias embarcaciones saliendo del mismo puerto a la vez.",
      },
      {
        pregunta: "¿Qué pasa si el mal tiempo impide salir?",
        respuesta:
          "Se acuerda por escrito en el presupuesto antes de confirmar. Con un grupo grande conviene tener decidida la alternativa de antemano y no improvisarla esa mañana.",
      },
      {
        pregunta: "¿Cuándo es mejor organizarlo?",
        respuesta:
          "Septiembre y octubre. El mar está mejor que en agosto, las calas están vacías y los precios bajan. Es la mejor época de la Costa Blanca y la que menos se aprovecha.",
      },
    ],
    relacionados: [
      { texto: "Alquiler de barcos en Alicante", pagina: { tipo: "destino", destino: "alicante" } },
      { texto: "Alquiler de barcos en Dénia", pagina: { tipo: "destino", destino: "denia" } },
      { texto: "Cómo funciona", pagina: { tipo: "comoFunciona" } },
    ],
  },
  {
    idioma: "es",
    slug: "pedidas-y-bodas",
    nombre: "Pedidas y bodas",
    titulo: "Pedidas de mano y bodas en barco",
    descripcion:
      "El sitio con menos gente y mejor luz de toda la costa. Se organiza con el patrón de antemano para que en el momento no dependa de nadie.",
    capacidadMinima: 4,
    porPresupuesto: true,
    contenido: `Es la ocasión que menos se busca y la que mejor sale, porque un barco resuelve de golpe las dos cosas difíciles: la intimidad y la luz.

**La intimidad no hay que fabricarla.** A media milla de la costa no hay nadie mirando, no hay que reservar un rincón ni pedirle nada a nadie. Y a la hora buena —la última del día— la costa se pone de un color que no se repite.

**Se prepara antes, no en el momento.** Lo que funciona es hablarlo con el patrón con antelación: dónde va a parar el barco, en qué momento, si va a haber algo escondido a bordo y quién se encarga de que aparezca. En el momento no puedes estar pendiente de la logística, y el patrón lo hace todos los meses.

**Para una pedida, un barco pequeño y dos horas bastan.** No hace falta un yate: hace falta el sitio y la hora. Y sale por bastante menos de lo que la gente imagina.

**Para una boda, la cosa cambia.** Ahí hablamos de varios barcos coordinados, invitados que no navegan nunca y una agenda que no admite retrasos. Eso se trabaja con presupuesto y con tiempo, y hay que decidir pronto el puerto: Altea y Calpe son los que mejor combinan acceso, aparcamiento y sitios cerca.

**Lo que casi nadie prevé:** que alguien se maree. Con invitados que no salen nunca al mar, media hora de navegación con picado arruina la mañana. Se resuelve saliendo temprano y eligiendo un tramo abrigado, y es exactamente el tipo de cosa que el patrón sabe y tú no tienes por qué saber.`,
    preguntas: [
      {
        pregunta: "¿Hace falta un barco grande para una pedida?",
        respuesta:
          "No. Un barco pequeño y dos horas a última hora de la tarde bastan, y sale por bastante menos de lo que la gente imagina. Lo que importa es el sitio y la hora, no el tamaño.",
      },
      {
        pregunta: "¿Se puede preparar algo a bordo sin que se entere?",
        respuesta:
          "Sí, y es lo que recomendamos: hablarlo con el patrón de antemano, dónde para el barco, en qué momento y quién se encarga. Lo hacen todos los meses y así tú no tienes que estar pendiente de la logística.",
      },
      {
        pregunta: "¿Y para una boda con invitados?",
        respuesta:
          "Eso va por presupuesto y con tiempo: son varios barcos coordinados, invitados que no navegan nunca y una agenda sin margen. Altea y Calpe son los puertos que mejor combinan acceso y aparcamiento.",
      },
    ],
    relacionados: [
      { texto: "Alquiler de barcos en Altea", pagina: { tipo: "destino", destino: "altea" } },
      { texto: "Alquiler de barcos en Calpe", pagina: { tipo: "destino", destino: "calpe" } },
      { texto: "El Peñón de Ifach desde el mar", pagina: { tipo: "lugar", slug: "penon-de-ifach" } },
    ],
  },
];

export function obtenerOcasion(slug: string, idioma: Idioma): Ocasion | undefined {
  const ocasion = OCASIONES.find((o) => o.slug === slug && o.idioma === idioma);
  return ocasion && estaPublicado(ocasion) ? ocasion : undefined;
}

export function ocasionesDe(idioma: Idioma): Ocasion[] {
  return soloPublicados(OCASIONES.filter((o) => o.idioma === idioma));
}

export function idiomasDeLaOcasion(slug: string): Idioma[] {
  return soloPublicados(OCASIONES.filter((o) => o.slug === slug)).map((o) => o.idioma);
}
