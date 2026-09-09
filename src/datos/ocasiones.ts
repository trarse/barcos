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
  {
    idioma: "en",
    slug: "despedidas",
    nombre: "Stag & Hen Parties",
    titulo: "Stag and hen parties on a boat",
    descripcion:
      "A whole boat for the group, with skipper, music and your own timetable. It costs less per person than dinner out, and there is no queue at the door.",
    capacidadMinima: 8,
    porPresupuesto: false,
    contenido: `It is the plan that works best along the whole coast and the one that is most misunderstood when you look at the price. Nobody compares €520 with €480: what you need to look at is how much it comes to per head, and there a whole boat for eleven people works out at the price of a good dinner.

**First things first: the boat is yours.** You do not share the deck with strangers or have a timetable imposed on you. You set off when you want, anchor where you fancy and head back when the time comes. That is the real difference from an organised trip, and it is what makes the memory something else entirely.

**Always with a skipper.** Nobody in the group has to worry about anything, and if there is going to be drink on board this stops being a comfort and becomes the only sensible thing to do. The skipper does the driving; you get on with your own thing.

**How many of you there are.** From eight people up, the price per head really starts to drop. With twelve — the capacity of many boats in the fleet — the share works out best of all. Below six, a small boat for half a day is better value.

**When.** Saturdays in July and August are booked weeks in advance and are the most expensive. If the group can move the date to a Friday, or to June or September, the price difference is noticeable and the sea is better.

**What to ask before booking.** Whether you can bring drink on board and in what containers — glass is banned on many boats — whether there is a fridge and a sound system, and what happens if the weather forecast prevents you from setting off. That last one is worth getting in writing.

**Where.** Alicante and Benidorm host most stag and hen parties for logistical reasons: hotels nearby, transport and nightlife afterwards. But if the group is after coves rather than noise, setting off from Jávea or Moraira changes the day completely.`,
    preguntas: [
      {
        pregunta: "How much does a boat stag or hen party cost per person?",
        respuesta:
          "It depends on the boat and the group, but a whole boat for ten or twelve people with a skipper usually works out at less than a good dinner per head. On each listing you can see the boat's final price and divide it among however many of you there are.",
      },
      {
        pregunta: "Can we bring drink and music on board?",
        respuesta:
          "Almost always yes, but ask first: many boats do not allow glass containers and not all of them have a fridge or a sound system. It is shown in the equipment of each listing.",
      },
      {
        pregunta: "Does anyone in the group need a licence?",
        respuesta:
          "No, if you book with a skipper, which is the norm for a stag or hen party and the only sensible option if there is going to be drink on board. The licence is his job.",
      },
      {
        pregunta: "How far in advance do we need to book?",
        respuesta:
          "For a Saturday in July or August, weeks. If the group can move the date to a Friday or to June or September, there is more availability, it is cheaper and the sea is usually better.",
      },
    ],
    relacionados: [
      { texto: "Boat hire in Alicante", pagina: { tipo: "destino", destino: "alicante" } },
      { texto: "Boat hire in Benidorm", pagina: { tipo: "destino", destino: "benidorm" } },
      { texto: "Licence-free boats in Benidorm", pagina: { tipo: "sinLicenciaDestino", destino: "benidorm" } },
    ],
  },
  {
    idioma: "en",
    slug: "cumpleanos",
    nombre: "Birthdays",
    titulo: "Celebrate a birthday on a boat",
    descripcion:
      "Half a day on a boat with the people you love and nothing to organise. It can be booked at short notice and works just as well with children as without.",
    capacidadMinima: 6,
    porPresupuesto: false,
    contenido: `It is the last-minute plan par excellence and one of the few that works just as well with six people as with twelve. No table to book, nothing to decorate and nothing to clear up afterwards.

**Half a day is usually enough.** Four or five hours give you time to set off, anchor in a cove, eat on board and head back without rushing. It costs considerably less than a full day and the group is not worn out by the end.

**It works with children better than people think**, with two conditions: the bay should be calm — Altea and Moraira are the best on this coast for that — and you should set off early, before the afternoon breeze gets up. Child-sized life jackets are not always on board as standard: you have to ask for them when booking.

**What makes it go well:** bring the food ready-made and the ice already bought, do not improvise the anchorage and head back before the group gets tired. A day on the boat that drags on too long is remembered worse than one that ends too early.

**A cake on board is a bad idea**, and we say that from other people's experience: it melts, it topples over with the rolling and getting the boat dirty costs money. If candles need to be blown out, better on the pontoon before setting off or when you get back.

**At short notice.** Unlike stag and hen parties, birthdays are booked days, not weeks, in advance. Midweek and outside July and August there is almost always something free, and at a better price.`,
    preguntas: [
      {
        pregunta: "Half a day or a full day for a birthday?",
        respuesta:
          "Half a day is usually enough: four or five hours give you time to set off, anchor, eat on board and head back without rushing. It costs considerably less and the group is not worn out by the end.",
      },
      {
        pregunta: "Can we go with children?",
        respuesta:
          "Yes, and it works well if the bay is calm and you set off early, before the afternoon breeze. Ask for child-sized life jackets when booking: not all boats carry them on board as standard.",
      },
      {
        pregunta: "How far in advance do you book?",
        respuesta:
          "Days, not weeks. Midweek and outside July and August there is almost always something available, and at a better price than on a high-season weekend.",
      },
    ],
    relacionados: [
      { texto: "Boat hire in Altea", pagina: { tipo: "destino", destino: "altea" } },
      { texto: "Boat hire in Moraira", pagina: { tipo: "destino", destino: "moraira" } },
      { texto: "What licence do I need", pagina: { tipo: "guia", slug: "que-titulacion-necesito-para-llevar-un-barco" } },
    ],
  },
  {
    idioma: "en",
    slug: "eventos-de-empresa",
    nombre: "Corporate events",
    titulo: "Boats for corporate events",
    descripcion:
      "Incentive trips, meetings away from the office and team days on board. With invoice, documented insurance and a quotation within 24 hours.",
    capacidadMinima: 10,
    porPresupuesto: true,
    contenido: `A corporate event on board is not booked like a weekend getaway, and treating it the same way is the quickest way for it to go wrong. What a company needs is not a pay button: it is a formal quotation, a correct invoice and the certainty that the insurance covers the attendees.

**That is why this is handled through a quotation.** You tell us how many you are, the date, the departure port and what you need on board, and we send you a proposal with a fixed price and the documentation within twenty-four hours. No surprises at the quay and no one from your team having to front any money.

**What can be set up.** From a half-day outing for a team of ten to several coordinated boats for large groups. With on-board catering, a skipper on every boat and, if needed, a timetable fitted around an agenda that has a meeting before or a dinner after.

**What needs to be decided early.** The number of attendees, because it determines the boat and, from there, everything else. And the date: in June and September there is availability and reasonable prices; in July and August you are competing with the whole coast.

**What we always ask and almost nobody has thought about:** what happens if someone gets seasick, whether any attendees have reduced mobility and whether the plan can cope with a change of date. An event with twenty people and a bad weather forecast needs an alternative decided in advance, not improvised that morning.

**September and October are the best months** for this on the Costa Blanca, and almost nobody takes advantage of it: the sea is better than in August, the coves are empty and prices come down. If the company's calendar allows it, that is when it works out best.`,
    preguntas: [
      {
        pregunta: "Do you issue an invoice for the company?",
        respuesta:
          "Yes. The quotation is issued in the company's name with all the tax details, and the invoice is delivered after the service. It is part of the reason these bookings go through a quotation rather than the cart.",
      },
      {
        pregunta: "How many people fit?",
        respuesta:
          "It depends on the boat, which is why this page only shows boats with ten berths or more. For large groups, several boats are coordinated to leave the same port at the same time.",
      },
      {
        pregunta: "What happens if bad weather prevents us from setting off?",
        respuesta:
          "It is agreed in writing in the quotation before you confirm. With a large group, it is best to have the alternative decided in advance and not improvised that morning.",
      },
      {
        pregunta: "When is the best time to organise it?",
        respuesta:
          "September and October. The sea is better than in August, the coves are empty and prices come down. It is the best time of year on the Costa Blanca and the one least taken advantage of.",
      },
    ],
    relacionados: [
      { texto: "Boat hire in Alicante", pagina: { tipo: "destino", destino: "alicante" } },
      { texto: "Boat hire in Dénia", pagina: { tipo: "destino", destino: "denia" } },
      { texto: "How it works", pagina: { tipo: "comoFunciona" } },
    ],
  },
  {
    idioma: "en",
    slug: "pedidas-y-bodas",
    nombre: "Proposals & Weddings",
    titulo: "Proposals and weddings on a boat",
    descripcion:
      "The spot with the fewest people and the best light on the whole coast. It is planned with the skipper in advance so that the moment itself depends on no one.",
    capacidadMinima: 4,
    porPresupuesto: true,
    contenido: `It is the occasion that is searched for least and turns out best, because a boat solves the two hard things at a stroke: privacy and the light.

**Privacy does not have to be manufactured.** Half a mile off the coast there is nobody watching, no corner to reserve and nothing to ask of anyone. And at the good hour — the last of the day — the coast takes on a colour that is not repeated.

**It is prepared beforehand, not in the moment.** What works is talking it through with the skipper in advance: where the boat will stop, at what point, whether something will be hidden on board and who will make sure it appears. In the moment you cannot be dealing with logistics, and the skipper does it every month.

**For a proposal, a small boat and two hours are enough.** You do not need a yacht: you need the spot and the hour. And it comes to considerably less than people imagine.

**For a wedding, things change.** Then we are talking about several coordinated boats, guests who never sail and a schedule that allows no delays. That is handled through a quotation and with time, and the port needs to be decided early: Altea and Calpe combine access, parking and places nearby better than any others.

**What almost nobody plans for:** someone getting seasick. With guests who never go out to sea, half an hour of sailing in a choppy sea ruins the morning. It is solved by setting off early and choosing a sheltered stretch — exactly the kind of thing the skipper knows and you have no reason to know.`,
    preguntas: [
      {
        pregunta: "Do you need a big boat for a proposal?",
        respuesta:
          "No. A small boat and two hours late in the afternoon are enough, and it comes to considerably less than people imagine. What matters is the spot and the hour, not the size.",
      },
      {
        pregunta: "Can we prepare something on board without them finding out?",
        respuesta:
          "Yes, and it is what we recommend: talk it through with the skipper in advance — where the boat stops, at what moment and who handles it. They do it every month, so you do not have to be on top of the logistics.",
      },
      {
        pregunta: "And for a wedding with guests?",
        respuesta:
          "That goes through a quotation and needs time: several coordinated boats, guests who never sail and a schedule with no margin. Altea and Calpe are the ports that best combine access and parking.",
      },
    ],
    relacionados: [
      { texto: "Boat hire in Altea", pagina: { tipo: "destino", destino: "altea" } },
      { texto: "Boat hire in Calpe", pagina: { tipo: "destino", destino: "calpe" } },
      { texto: "The Peñón de Ifach from the sea", pagina: { tipo: "lugar", slug: "penon-de-ifach" } },
    ],
  },
  {
    idioma: "de",
    slug: "despedidas",
    nombre: "Junggesellenabschiede",
    titulo: "Junggesellenabschied auf dem Boot",
    descripcion:
      "Ein ganzes Boot für die Gruppe, mit Skipper, Musik und eigenem Zeitplan. Pro Person kostet es weniger als ein Abendessen – und es gibt keine Schlange vor der Tür.",
    capacidadMinima: 8,
    porPresupuesto: false,
    contenido: `Es ist der Plan, der an der ganzen Küste am besten funktioniert – und zugleich der, der beim Blick auf den Preis am meisten missverstanden wird. Niemand vergleicht 520 Euro mit 480: Worauf es ankommt, ist der Preis pro Person, und da kostet ein ganzes Boot für elf Personen nicht mehr als ein gutes Abendessen.

**Das Wichtigste zuerst: Das Boot gehört Ihnen.** Sie teilen das Deck nicht mit Fremden und haben keinen festen Zeitplan. Sie legen ab, wann Sie wollen, ankern, wo es Ihnen gefällt, und kehren zurück, wenn es an der Zeit ist. Das ist der entscheidende Unterschied zu einem organisierten Ausflug – und genau das macht aus dem Tag eine völlig andere Erinnerung.

**Immer mit Skipper.** Niemand in der Gruppe muss sich um irgendetwas kümmern, und wenn an Bord Alkohol getrunken wird, ist das kein Komfort mehr, sondern die einzig vernünftige Lösung. Der Skipper steuert, Sie machen Ihr eigenes Ding.

**Wie viele Sie sind.** Ab acht Personen sinkt der Preis pro Person wirklich spürbar. Bei zwölf – der Kapazität vieler Boote in der Flotte – ist die Aufteilung am günstigsten. Unter sechs lohnt sich eher ein kleines Boot für einen halben Tag.

**Wann.** Die Samstage im Juli und August werden Wochen im Voraus gebucht und sind am teuersten. Wenn die Gruppe den Termin auf einen Freitag oder auf Juni oder September verschieben kann, ist der Preisunterschied deutlich und das Meer besser.

**Was Sie vor der Buchung fragen sollten.** Ob Sie Getränke an Bord mitbringen dürfen und in welchen Behältnissen – Glas ist auf vielen Booten verboten –, ob es einen Kühlschrank und eine Musikanlage gibt und was passiert, wenn der Wetterbericht die Ausfahrt verhindert. Letzteres sollten Sie sich schriftlich bestätigen lassen.

**Wo.** Alicante und Benidorm vereinen die meisten Junggesellenabschiede aus logistischen Gründen: Hotels in der Nähe, gute Anbindung und anschließend das Nachtleben. Sucht die Gruppe aber Buchten statt Lärm, verändert ein Ablegen in Jávea oder Moraira den Tag von Grund auf.`,
    preguntas: [
      {
        pregunta: "Was kostet ein Junggesellenabschied auf dem Boot pro Person?",
        respuesta:
          "Das hängt vom Boot und von der Gruppe ab, aber ein ganzes Boot für zehn oder zwölf Personen mit Skipper kostet in der Regel weniger als ein gutes Abendessen pro Person. Auf jeder Bootsseite sehen Sie den Endpreis des Bootes und können ihn durch Ihre Personenzahl teilen.",
      },
      {
        pregunta: "Dürfen wir Getränke und Musik mit an Bord nehmen?",
        respuesta:
          "Fast immer ja, aber fragen Sie vorher nach: Viele Boote erlauben keine Glasbehälter, und nicht alle haben einen Kühlschrank oder eine Musikanlage. Das ist in der Ausstattung auf jeder Bootsseite angegeben.",
      },
      {
        pregunta: "Muss jemand aus der Gruppe einen Führerschein haben?",
        respuesta:
          "Nein, wenn Sie mit Skipper buchen – das ist bei einem Junggesellenabschied üblich und die einzig vernünftige Lösung, wenn an Bord Alkohol getrunken wird. Den Führerschein bringt er mit.",
      },
      {
        pregunta: "Wie weit im Voraus müssen wir buchen?",
        respuesta:
          "Für einen Samstag im Juli oder August: Wochen. Wenn die Gruppe den Termin auf einen Freitag oder auf Juni oder September verschieben kann, gibt es mehr Verfügbarkeiten, es ist günstiger und das Meer ist meist besser.",
      },
    ],
    relacionados: [
      { texto: "Boot mieten in Alicante", pagina: { tipo: "destino", destino: "alicante" } },
      { texto: "Boot mieten in Benidorm", pagina: { tipo: "destino", destino: "benidorm" } },
      { texto: "Boote ohne Führerschein in Benidorm", pagina: { tipo: "sinLicenciaDestino", destino: "benidorm" } },
    ],
  },
  {
    idioma: "de",
    slug: "cumpleanos",
    nombre: "Geburtstage",
    titulo: "Geburtstag auf dem Boot feiern",
    descripcion:
      "Ein halber Tag auf dem Boot mit den Menschen, die Ihnen wichtig sind – und nichts, was Sie organisieren müssten. Kurzfristig buchbar und mit Kindern genauso gut wie ohne.",
    capacidadMinima: 6,
    porPresupuesto: false,
    contenido: `Der perfekte Last-Minute-Plan – und einer der wenigen, die mit sechs Personen genauso gut funktionieren wie mit zwölf. Kein Tisch zu reservieren, nichts zu dekorieren, nichts hinterher aufzuräumen.

**Ein halber Tag reicht meistens.** Vier bis fünf Stunden genügen, um abzulegen, in einer Bucht zu ankern, an Bord zu essen und ohne Hektik zurückzukehren. Das kostet deutlich weniger als ein ganzer Tag, und am Ende ist die Gruppe nicht völlig geschafft.

**Mit Kindern funktioniert es besser, als die meisten glauben** – unter zwei Bedingungen: Die Bucht sollte ruhig sein – Altea und Moraira sind dafür die besten dieser Küste – und man sollte früh ablegen, bevor die Nachmittagsbrise aufkommt. Schwimmwesten in Kindergröße sind nicht immer standardmäßig an Bord: Man muss sie bei der Buchung anfordern.

**Was den Tag gelingen lässt:** das Essen vorbereitet und das Eis gekauft mitbringen, den Ankerplatz nicht improvisieren und zurückkehren, bevor die Gruppe müde ist. Ein Bootstag, der sich zu lange hinzieht, bleibt schlechter in Erinnerung als einer, der zu früh endet.

**Eine Torte an Bord ist keine gute Idee** – das sagen wir aus Erfahrung anderer: Sie schmilzt, kippt beim Schaukeln um, und ein verschmutztes Boot kostet Geld. Wenn Kerzen ausgeblasen werden sollen, dann besser auf dem Steg vor dem Ablegen oder nach der Rückkehr.

**Kurzfristig buchbar.** Anders als bei Junggesellenabschieden werden Geburtstage Tage, nicht Wochen, im Voraus gebucht. Unter der Woche und außerhalb von Juli und August ist fast immer etwas frei – und zu besseren Preisen.`,
    preguntas: [
      {
        pregunta: "Halber Tag oder ganzer Tag für einen Geburtstag?",
        respuesta:
          "Ein halber Tag reicht meistens: Vier bis fünf Stunden genügen zum Ablegen, Ankern, Essen an Bord und entspannten Zurückkehren. Das kostet deutlich weniger, und am Ende ist niemand in der Gruppe völlig geschafft.",
      },
      {
        pregunta: "Kann man mit Kindern mitfahren?",
        respuesta:
          "Ja, und es funktioniert gut, wenn die Bucht ruhig ist und Sie früh ablegen, bevor die Nachmittagsbrise aufkommt. Bestellen Sie bei der Buchung Schwimmwesten in Kindergröße: Nicht alle Boote haben sie standardmäßig an Bord.",
      },
      {
        pregunta: "Wie weit im Voraus wird gebucht?",
        respuesta:
          "Tage, nicht Wochen. Unter der Woche und außerhalb von Juli und August ist fast immer etwas frei – und zu besseren Preisen als am Wochenende in der Hauptsaison.",
      },
    ],
    relacionados: [
      { texto: "Boot mieten in Altea", pagina: { tipo: "destino", destino: "altea" } },
      { texto: "Boot mieten in Moraira", pagina: { tipo: "destino", destino: "moraira" } },
      { texto: "Welchen Führerschein brauche ich", pagina: { tipo: "guia", slug: "que-titulacion-necesito-para-llevar-un-barco" } },
    ],
  },
  {
    idioma: "de",
    slug: "eventos-de-empresa",
    nombre: "Firmenevents",
    titulo: "Boote für Firmenevents",
    descripcion:
      "Incentives, Besprechungen außerhalb des Büros und Teamtage an Bord. Mit Rechnung, dokumentiertem Versicherungsschutz und Angebot innerhalb von 24 Stunden.",
    capacidadMinima: 10,
    porPresupuesto: true,
    contenido: `Ein Firmenevent an Bord bucht man nicht wie einen Wochenendtrip – und es genauso zu behandeln ist der schnellste Weg, dass es schiefgeht. Was ein Unternehmen braucht, ist kein Bezahl-Button: Es braucht ein formelles Angebot, eine korrekte Rechnung und die Gewissheit, dass die Versicherung die Teilnehmer abdeckt.

**Deshalb läuft das hier über ein Angebot.** Sie nennen uns die Personenzahl, das Datum, den Abfahrtshafen und was Sie an Bord benötigen, und wir senden Ihnen innerhalb von vierundzwanzig Stunden ein Angebot mit festem Preis und der Dokumentation. Keine Überraschungen am Steg und niemand aus Ihrem Team muss Geld vorstrecken.

**Was sich organisieren lässt.** Vom halbtägigen Ausflug für ein Team von zehn Personen bis zu mehreren koordinierten Booten für große Gruppen. Mit Catering an Bord, mit Skipper auf jedem Boot und, falls nötig, mit einem Zeitplan, der sich an einen Terminkalender mit Besprechung davor oder Abendessen danach anpasst.

**Was früh entschieden werden muss.** Die Zahl der Teilnehmer, denn sie bestimmt das Boot und von dort aus alles Weitere. Und das Datum: Im Juni und September gibt es Verfügbarkeiten und vernünftige Preise; im Juli und August konkurrieren Sie mit der gesamten Küste.

**Was wir immer fragen und worüber fast niemand nachgedacht hat:** Was passiert, wenn jemand seekrank wird, ob Teilnehmer mit eingeschränkter Mobilität dabei sind und ob der Plan einen Terminwechsel verkraftet. Ein Event mit zwanzig Personen und einem schlechten Wetterbericht braucht eine im Voraus beschlossene Alternative – keine, die an dem Morgen improvisiert wird.

**September und Oktober sind die besten Monate** dafür an der Costa Blanca, und fast niemand nutzt das: Das Meer ist besser als im August, die Buchten sind leer und die Preise sinken. Wenn es der Firmenkalender zulässt, ist das der beste Zeitpunkt.`,
    preguntas: [
      {
        pregunta: "Stellen Sie eine Rechnung für das Unternehmen aus?",
        respuesta:
          "Ja. Das Angebot wird auf den Namen des Unternehmens mit allen steuerlichen Angaben ausgestellt, und die Rechnung wird nach der Leistung übergeben. Das ist ein Grund, warum diese Buchungen über ein Angebot laufen und nicht über den Warenkorb.",
      },
      {
        pregunta: "Wie viele Personen haben Platz?",
        respuesta:
          "Das hängt vom Boot ab – deshalb erscheinen auf dieser Seite nur Boote mit zehn Plätzen oder mehr. Für große Gruppen werden mehrere Boote koordiniert, die gleichzeitig vom selben Hafen ablegen.",
      },
      {
        pregunta: "Was passiert, wenn das schlechte Wetter die Ausfahrt verhindert?",
        respuesta:
          "Das wird vor der Bestätigung schriftlich im Angebot vereinbart. Bei einer großen Gruppe sollte die Alternative im Voraus festgelegt sein und nicht am Morgen improvisiert werden.",
      },
      {
        pregunta: "Wann lässt es sich am besten organisieren?",
        respuesta:
          "Im September und Oktober. Das Meer ist besser als im August, die Buchten sind leer und die Preise sinken. Es ist die beste Zeit an der Costa Blanca – und die am wenigsten genutzte.",
      },
    ],
    relacionados: [
      { texto: "Boot mieten in Alicante", pagina: { tipo: "destino", destino: "alicante" } },
      { texto: "Boot mieten in Dénia", pagina: { tipo: "destino", destino: "denia" } },
      { texto: "So funktioniert es", pagina: { tipo: "comoFunciona" } },
    ],
  },
  {
    idioma: "de",
    slug: "pedidas-y-bodas",
    nombre: "Heiratsanträge und Hochzeiten",
    titulo: "Heiratsanträge und Hochzeiten auf dem Boot",
    descripcion:
      "Der Ort mit den wenigsten Menschen und dem besten Licht der ganzen Küste. Alles wird vorab mit dem Skipper geplant, damit der entscheidende Moment von niemandem abhängt.",
    capacidadMinima: 4,
    porPresupuesto: true,
    contenido: `Es ist der Anlass, nach dem am wenigsten gesucht wird und der am besten gelingt, denn ein Boot löst die beiden schwierigen Dinge auf einen Schlag: die Intimität und das Licht.

**Intimität muss man nicht herstellen.** Eine halbe Seemeile vor der Küste schaut niemand zu, es gibt keine Ecke zu reservieren und nichts, worum man jemanden bitten müsste. Und zur richtigen Stunde – der letzten des Tages – nimmt die Küste eine Farbe an, die sich nicht wiederholt.

**Vorbereitet wird vorher, nicht im Moment.** Was funktioniert, ist, alles im Voraus mit dem Skipper zu besprechen: wo das Boot halten wird, zu welchem Zeitpunkt, ob etwas an Bord versteckt wird und wer dafür sorgt, dass es auftaucht. Im entscheidenden Moment können Sie sich nicht um die Logistik kümmern – und der Skipper macht das jeden Monat.

**Für einen Heiratsantrag reichen ein kleines Boot und zwei Stunden.** Es braucht keine Yacht: Es braucht den Ort und die Stunde. Und es kostet deutlich weniger, als die meisten annehmen.

**Bei einer Hochzeit ändert sich das.** Dann sprechen wir über mehrere koordinierte Boote, Gäste, die noch nie gesegelt sind, und einen Zeitplan, der keine Verzögerungen zulässt. Das läuft über ein Angebot und mit ausreichend Vorlauf, und der Hafen muss früh entschieden werden: Altea und Calpe vereinen Zugang, Parkplätze und Orte in der Nähe am besten.

**Was fast niemand einplant:** dass jemand seekrank wird. Mit Gästen, die nie aufs Meer hinausfahren, ruiniert eine halbe Stunde Fahrt bei Kabbelsee den ganzen Vormittag. Das lässt sich lösen, indem man früh ablegt und einen geschützten Abschnitt wählt – genau die Art von Dingen, die der Skipper weiß und die Sie nicht wissen müssen.`,
    preguntas: [
      {
        pregunta: "Braucht man ein großes Boot für einen Heiratsantrag?",
        respuesta:
          "Nein. Ein kleines Boot und zwei Stunden am späten Nachmittag genügen – und es kostet deutlich weniger, als die meisten annehmen. Worauf es ankommt, sind Ort und Stunde, nicht die Größe.",
      },
      {
        pregunta: "Kann man an Bord etwas vorbereiten, ohne dass die andere Person es merkt?",
        respuesta:
          "Ja, und genau das empfehlen wir: Besprechen Sie es im Voraus mit dem Skipper – wo das Boot hält, zu welchem Zeitpunkt und wer sich darum kümmert. Er macht das jeden Monat, sodass Sie sich nicht um die Logistik kümmern müssen.",
      },
      {
        pregunta: "Und für eine Hochzeit mit Gästen?",
        respuesta:
          "Das läuft über ein Angebot und braucht Vorlauf: mehrere koordinierte Boote, Gäste, die noch nie gesegelt sind, und ein Zeitplan ohne Spielraum. Altea und Calpe sind die Häfen, die Zugang und Parkplätze am besten vereinen.",
      },
    ],
    relacionados: [
      { texto: "Boot mieten in Altea", pagina: { tipo: "destino", destino: "altea" } },
      { texto: "Boot mieten in Calpe", pagina: { tipo: "destino", destino: "calpe" } },
      { texto: "Der Peñón de Ifach vom Meer aus", pagina: { tipo: "lugar", slug: "penon-de-ifach" } },
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
