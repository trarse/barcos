/**
 * Catálogo transversal: tipos de embarcación, equipamiento y experiencias.
 * Los tipos y las experiencias generan landings propias, así que cada uno
 * lleva su titular y su texto.
 *
 * Las experiencias llevan además las versiones EN/DE de titular, contenido y
 * preguntas (campos con sufijo En/De). El castellano sigue siendo la fuente
 * de verdad: esos campos son opcionales y solo se pintan en la página del
 * idioma correspondiente.
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
  contenidoEn?: string;
  contenidoDe?: string;
  titularEn?: string;
  titularDe?: string;
  horas: number;
  orden: number;
  preguntas: {
    pregunta: string;
    respuesta: string;
    preguntaEn?: string;
    respuestaEn?: string;
    preguntaDe?: string;
    respuestaDe?: string;
  }[];
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
    contenidoEn: `Leaving in the late afternoon has a practical advantage on top of the obvious one: the thermal breeze has already dropped, the sea turns flat calm, and three hours of cruising burn half the fuel of a full day out.

The usual format is two to four hours with a skipper included: departure around 18:30 or 19:00 depending on the month, an anchorage stop for a swim while there is still light, and the return to harbour with the sun already low. Many boats include drinks on board.

It is also the gateway for anyone who has never hired a boat before: no licence is needed, there is no route to plan, and the price of a sunset trip for six people comes in well below the cost of a full day.`,
    contenidoDe: `Ausfahren am späten Nachmittag hat neben dem offensichtlichen noch einen praktischen Vorteil: Der Thermikwind hat sich bereits gelegt, die See wird glatt, und die drei Stunden Fahrt verbrauchen nur halb so viel Treibstoff wie ein ganzer Tag auf dem Wasser.

Der übliche Rahmen sind zwei bis vier Stunden mit Skipper inklusive: Ablegen gegen 18:30 oder 19:00 Uhr, je nach Monat, ein Ankerstopp zum Baden, solange es noch hell ist, und die Rückkehr in den Hafen, wenn die Sonne schon tief steht. Viele Boote haben Getränke an Bord.

Für alle, die noch nie ein Boot gemietet haben, ist dieser Törn der ideale Einstieg: kein Führerschein nötig, keine Route zu planen, und der Preis für einen Sonnenuntergangs-Törn mit sechs Personen liegt deutlich unter dem eines ganzen Tages.`,
    titularEn: "Sunset boat trips",
    titularDe: "Bootstörns zum Sonnenuntergang",
    horas: 3,
    orden: 1,
    preguntas: [
      {
        pregunta: "¿Cuánto dura una salida al atardecer?",
        respuesta:
          "Entre dos y cuatro horas, normalmente de 18:30 a 21:30 en verano. Suele incluir un fondeo de media hora para bañarse antes de que se ponga el sol.",
        preguntaEn: "How long does a sunset trip last?",
        respuestaEn:
          "Between two and four hours, usually from 18:30 to 21:30 in summer. It normally includes a half-hour anchorage stop for a swim before the sun goes down.",
        preguntaDe: "Wie lange dauert ein Törn zum Sonnenuntergang?",
        respuestaDe:
          "Zwischen zwei und vier Stunden, im Sommer in der Regel von 18:30 bis 21:30 Uhr. Meist ist ein halbstündiger Ankerstopp zum Baden eingeplant, bevor die Sonne untergeht.",
      },
      {
        pregunta: "¿Hace falta titulación para una salida al atardecer?",
        respuesta:
          "No. Prácticamente todas las salidas de atardecer llevan patrón incluido en el precio, así que no necesitas ningún título ni experiencia previa.",
        preguntaEn: "Do I need a licence for a sunset trip?",
        respuestaEn:
          "No. Practically all sunset trips include a skipper in the price, so you need no licence or previous experience at all.",
        preguntaDe: "Brauche ich einen Führerschein für einen Törn zum Sonnenuntergang?",
        respuestaDe:
          "Nein. Praktisch alle Sonnenuntergangs-Törns haben den Skipper im Preis inklusive, Sie brauchen also weder einen Führerschein noch Vorkenntnisse.",
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
    contenidoEn: `A fishing trip is not simply hiring a boat and taking a rod along. The value is in the skipper: someone who knows where the good fishing ground is, what time the tuna come in and which lure is working this week.

The usual methods on the Spanish coast are surface trolling for dolphinfish, bonito and llampuga in summer; bottom fishing over rock for sea bream, dentex and grouper; and vertical jigging, the more sporting option, over drop-offs and shallows.

Almost all trips include rods, reels, lures, bait and the recreational sea fishing licence, which is compulsory and issued in the holder's name. It is worth confirming whether you can keep your catch: in marine reserves and for certain species there are minimum sizes and catch limits.`,
    contenidoDe: `Ein Angeltörn ist nicht dasselbe wie ein Boot zu mieten und eine eigene Rute mitzubringen. Der Wert liegt im Skipper: jemand, der weiß, wo der gute Grund liegt, zu welcher Zeit der Thunfisch kommt und welcher Köder diese Woche funktioniert.

Die üblichen Angelmethoden an der spanischen Küste sind das Schleppangeln an der Oberfläche auf Goldmakrele, Bonito und Llampuga im Sommer, das Grundangeln über Fels auf Seebrasse, Zahnbrasse und Zackenbarsch sowie das sportlichere vertikale Jigging über Steilkanten und Untiefen.

Fast alle Törns umfassen Ruten, Rollen, Köder und die Lizenz für die maritime Freizeitfischerei, die verpflichtend und auf den Namen des Inhabers ausgestellt ist. Es lohnt sich zu klären, ob der Fang mitgenommen werden darf: In Meeresschutzgebieten und bei bestimmten Arten gelten Mindestmaße und Fangquoten.`,
    titularEn: "Boat fishing trips",
    titularDe: "Angeltörns mit dem Boot",
    horas: 6,
    orden: 2,
    preguntas: [
      {
        pregunta: "¿Necesito licencia de pesca para una salida en barco?",
        respuesta:
          "Sí, la pesca marítima de recreo requiere licencia autonómica nominal. La mayoría de las salidas organizadas la incluyen o la tramitan por ti; conviene confirmarlo al reservar.",
        preguntaEn: "Do I need a fishing licence for a boat trip?",
        respuestaEn:
          "Yes, recreational sea fishing requires a personal licence issued by the regional government. Most organised trips include it or arrange it for you; it is worth confirming when you book.",
        preguntaDe: "Brauche ich für einen Angeltörn einen Angelschein?",
        respuestaDe:
          "Ja, die Freizeitfischerei auf See erfordert einen regionalen, auf den Namen ausgestellten Angelschein. Die meisten organisierten Törns beinhalten ihn oder stellen ihn für Sie aus; das sollten Sie bei der Buchung klären.",
      },
      {
        pregunta: "¿Puedo quedarme con lo que pesque?",
        respuesta:
          "En general sí, respetando tallas mínimas y cupos por especie. Dentro de reservas marinas la pesca puede estar prohibida o muy limitada. El patrón conoce la normativa de la zona.",
        preguntaEn: "Can I keep what I catch?",
        respuestaEn:
          "In general, yes, respecting minimum sizes and catch limits per species. Inside marine reserves fishing may be prohibited or heavily restricted. The skipper knows the regulations for the area.",
        preguntaDe: "Darf ich behalten, was ich fange?",
        respuestaDe:
          "Im Allgemeinen ja, sofern Mindestmaße und Fangquoten pro Art eingehalten werden. In Meeresschutzgebieten kann das Angeln verboten oder stark eingeschränkt sein. Der Skipper kennt die Vorschriften der Region.",
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
    contenidoEn: `The classic plan on this coast: leave in the morning, string together three or four stops and be back in harbour by sunset. What sets it apart from a beach day is that the best coves on the Costa Blanca have no road access, or access so awkward that by sea you get there sooner and with half the crowd.

Three stretches work best. The one from Dénia to Xàbia, with the Cabo de San Antonio and the Cova Tallada. The one from Xàbia to Moraira, rounding the Cap de la Nau, where the Granadella, Els Arcs and Cala Moraig are. And Cabo de las Huertas, between El Campello and Alicante: the shortest of the three and the only one you can reach without a licence.

Almost every boat carries masks and snorkels on board, a bathing ladder and a cool box. Much of this coast has seagrass meadow (Posidonia oceanica), which is protected: every area has its own rules on where you can stop and where you cannot, and they change. Ask at the club before you leave.`,
    contenidoDe: `Der Klassiker dieser Küste: morgens ablegen, drei oder vier Stopps aneinanderreihen und bei Sonnenuntergang zurück im Hafen sein. Was ihn von einem Strandtag unterscheidet: Die schönsten Buchten der Costa Blanca sind nicht mit dem Auto erreichbar — oder der Zugang ist so kompliziert, dass man auf dem Seeweg früher und mit halb so vielen Leuten ankommt.

Drei Abschnitte funktionieren am besten. Der von Dénia nach Xàbia, mit dem Cabo de San Antonio und der Cova Tallada. Der von Xàbia nach Moraira, um das Cap de la Nau herum, wo die Granadella, Els Arcs und die Cala Moraig liegen. Und das Cabo de las Huertas zwischen El Campello und Alicante — der kürzeste Abschnitt von allen und der einzige, den man ohne Führerschein erreicht.

Fast alle Boote haben Masken und Schnorchel an Bord, eine Badeleiter und eine Kühlbox. Große Teile dieser Küste haben Posidonia-Seegraswiesen, die geschützt sind: In jeder Zone gibt es Regeln, wo man halten darf und wo nicht — und die ändern sich. Fragen Sie vor dem Ablegen im Club nach.`,
    titularEn: "Coves and snorkelling routes by boat",
    titularDe: "Buchten- und Schnorchelrouten mit dem Boot",
    horas: 5,
    orden: 3,
    preguntas: [
      {
        pregunta: "¿Cuántas calas se pueden visitar en un día?",
        respuesta:
          "Entre tres y cuatro sin agobios. Cada fondeo cómodo pide una hora larga, y hay que contar los desplazamientos entre calas y la vuelta a puerto con luz.",
        preguntaEn: "How many coves can you visit in a day?",
        respuestaEn:
          "Three or four without rushing. Each comfortable anchorage needs a good hour, and you have to allow for the runs between coves and for getting back to harbour in daylight.",
        preguntaDe: "Wie viele Buchten kann man an einem Tag besuchen?",
        respuestaDe:
          "Drei bis vier ohne Stress. Für jeden bequemen Ankerstopp braucht man gut eine Stunde, und man muss die Fahrzeiten zwischen den Buchten und die Rückkehr zum Hafen bei Tageslicht einplanen.",
      },
      {
        pregunta: "¿Va incluido el equipo de snorkel?",
        respuesta:
          "En la mayoría de los barcos sí: gafas, tubos y a veces aletas. Aparece detallado en el equipamiento de cada ficha.",
        preguntaEn: "Is snorkelling gear included?",
        respuestaEn:
          "On most boats, yes: masks, snorkels and sometimes fins. It is listed in the equipment section of each boat's page.",
        preguntaDe: "Ist Schnorchelausrüstung inklusive?",
        respuestaDe:
          "Bei den meisten Booten ja: Masken, Schnorchel und manchmal Flossen. Das steht im Ausstattungsbereich der jeweiligen Bootsseite.",
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
    contenidoEn: `Off the Costa Blanca there are bottlenose and striped dolphins, and the odd other species passing through. It is not a guaranteed show, and no one should sell it to you as one: these are wild animals in open water, and some days they do not appear.

What can be said is when the odds are best. Calm sea, first thing in the morning, and heading away from the coast, because that is where they are. That is why these trips always go out with a skipper: it is not just about the licence — knowing where to look changes the outcome completely.

And there is a part that matters more than seeing or not seeing. Approaching cetaceans is regulated by **Royal Decree 1727/2007**, which defines a protection zone around the animal, with permitted and prohibited approach distances, speeds and manoeuvres. Without quoting figures that are subject to review: no chasing, no cutting across the group's course, no separating the calves, no entering the water and no feeding them. The regulation in force is the one that governs, and the skipper on the trip knows it.

Almost everyone does exactly the opposite of what they should when the animals show up. We tell the whole story in the blog article.`,
    contenidoDe: `Vor der Costa Blanca gibt es Große Tümmler und Streifendelfine, und auf der Durchreise gelegentlich andere Arten. Es ist keine garantierte Vorstellung, und niemand sollte sie Ihnen als solche verkaufen: Es sind wilde Tiere auf offenem Meer, und es gibt Tage, an denen sie nicht auftauchen.

Was sich sehr wohl sagen lässt, ist, wann die Chancen am besten stehen. Ruhige See, früher Morgen, und raus von der Küste — denn dort halten sie sich auf. Deshalb fahren diese Törns immer mit Skipper: Es geht nicht nur um den Führerschein, sondern darum, dass man weiß, wohin man schauen muss. Das verändert das Ergebnis vollkommen.

Und es gibt einen Teil, der wichtiger ist als Sehen oder Nichtsehen. Die Annäherung an Wale und Delfine regelt das **Königliche Dekret 1727/2007**, das einen Schutzbereich um das Tier herum definiert — mit erlaubten und verbotenen Abständen, Geschwindigkeiten und Manövern. Ohne auf Zahlen einzugehen, die überarbeitet werden: nicht verfolgen, nicht in den Kurs der Gruppe schneiden, keine Jungtiere trennen, nicht ins Wasser gehen und nicht füttern. Maßgeblich ist die jeweils geltende Fassung der Verordnung, und der Skipper des Törns kennt sie.

Fast alle machen genau das Gegenteil von dem, was sie tun sollten, wenn die Tiere auftauchen. Die ganze Geschichte erzählen wir im Blogartikel.`,
    titularEn: "Dolphin and whale watching trips",
    titularDe: "Delfin- und Walbeobachtung mit dem Boot",
    horas: 3,
    orden: 4,
    preguntas: [
      {
        pregunta: "¿Qué probabilidad hay de ver cetáceos?",
        respuesta:
          "No hay una cifra honesta que dar: son animales salvajes y hay días que no aparecen. Las mejores posibilidades son con mar en calma, a primera hora y separándose de la costa. Quien te prometa un porcentaje te está vendiendo algo que no controla.",
        preguntaEn: "What are the chances of seeing cetaceans?",
        respuestaEn:
          "There is no honest figure to give: they are wild animals, and some days they do not appear. The best chances are with a calm sea, first thing in the morning, and moving away from the coast. Anyone who promises you a percentage is selling you something they do not control.",
        preguntaDe: "Wie groß ist die Wahrscheinlichkeit, Wale und Delfine zu sehen?",
        respuestaDe:
          "Dafür gibt es keine ehrliche Zahl: Es sind wilde Tiere, und an manchen Tagen tauchen sie nicht auf. Die besten Chancen hat man bei ruhiger See, am frühen Morgen und abseits der Küste. Wer Ihnen einen Prozentsatz verspricht, verkauft Ihnen etwas, das er nicht kontrollieren kann.",
      },
      {
        pregunta: "¿A qué distancia se pueden acercar los barcos?",
        respuesta:
          "El Real Decreto 1727/2007 define un espacio de protección alrededor del animal, con distancias de aproximación, velocidades y maniobras permitidas y prohibidas, y con un límite de tiempo. Las cifras exactas las fija esa norma y se revisan, así que la referencia es el texto vigente. Lo que no cambia: no se persigue, no se corta el rumbo del grupo y no se entra en el agua.",
        preguntaEn: "How close can boats get?",
        respuestaEn:
          "Royal Decree 1727/2007 defines a protection zone around the animal, with permitted and prohibited approach distances, speeds and manoeuvres, and a time limit. The exact figures are set by that regulation and are revised, so the reference is the text currently in force. What never changes: no chasing, no cutting across the group's course and no entering the water.",
        preguntaDe: "In welchem Abstand dürfen sich Boote nähern?",
        respuestaDe:
          "Das Königliche Dekret 1727/2007 definiert einen Schutzbereich um das Tier, mit erlaubten und verbotenen Annäherungsabständen, Geschwindigkeiten und Manövern sowie einer Zeitbegrenzung. Die genauen Zahlen legt diese Verordnung fest, und sie werden überarbeitet — maßgeblich ist daher der jeweils geltende Wortlaut. Was sich nicht ändert: nicht verfolgen, nicht in den Kurs der Gruppe schneiden und nicht ins Wasser gehen.",
      },
    ],
  },
];
