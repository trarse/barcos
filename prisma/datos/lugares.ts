/**
 * Destinos con nombre propio.
 *
 * No son municipios con puerto: son el motivo por el que alguien alquila.
 * Nadie busca «alquiler de barcos» para luego decidir adónde ir; busca
 * «Tabarca en barco» y a partir de ahí mira desde dónde se sale.
 *
 * Es el hueco más grande de la competencia: los agregadores tienen página
 * de ciudad y ninguna de destino. Cada `acceso` enlaza este contenido con
 * la landing del puerto que lo vende, que es lo que convierte una página
 * de lectura en una página que factura.
 *
 * Aviso deliberado: aquí se cuenta QUÉ es un sitio y CÓMO se llega, nunca
 * dónde fondear ni con qué tenida. Eso es información de seguridad y no
 * se publica sin seguro revisado.
 */

export interface AccesoSemilla {
  /** Slug del municipio desde el que se sale. */
  destino: string;
  minutos: number;
  /** Si se alcanza con una embarcación de las que no exigen titulación. */
  sinTitulo: boolean;
}

export interface PreguntaSemilla {
  pregunta: string;
  respuesta: string;
  preguntaEn?: string;
  respuestaEn?: string;
  preguntaDe?: string;
  respuestaDe?: string;
}

export interface LugarSemilla {
  slug: string;
  nombre: string;
  provincia: string;
  titular: string;
  titularEn: string;
  titularDe: string;
  descripcion: string;
  descripcionEn: string;
  descripcionDe: string;
  contenido: string;
  contenidoEn?: string;
  contenidoDe?: string;
  latitud: number;
  longitud: number;
  clase: "isla" | "cabo" | "cala" | "cueva";
  orden: number;
  accesos: AccesoSemilla[];
  preguntas: PreguntaSemilla[];
}

export const LUGARES: LugarSemilla[] = [
  {
    slug: "tabarca",
    nombre: "Isla de Tabarca",
    provincia: "Alicante",
    titular: "Ir a Tabarca en barco",
    titularEn: "Getting to Tabarca by boat",
    titularDe: "Mit dem Boot nach Tabarca",
    descripcion:
      "La única isla habitada de la Comunitat Valenciana y la primera reserva marina de España. A 4 millas de Santa Pola y 11 de Alicante.",
    descripcionEn:
      "The only inhabited island in the Valencia region and Spain's first marine reserve. Four miles from Santa Pola, eleven from Alicante.",
    descripcionDe:
      "Die einzige bewohnte Insel der Region Valencia und Spaniens erstes Meeresschutzgebiet. Vier Seemeilen von Santa Pola, elf von Alicante.",
    contenido: `Tabarca es el destino más buscado de la provincia y el motivo por el que mucha gente alquila un barco por primera vez. Es una isla plana y pequeña, poco más de un kilómetro y medio de largo, con un pueblo amurallado del siglo XVIII, una torre, un faro y un cementerio marinero. Se recorre entera andando en una hora.

Lo que la hace distinta es el agua. En 1986 se declaró la primera reserva marina de España, y ese estatus se nota nada más llegar: la pradera de posidonia está viva y en días de calma se ve el fondo a mucha profundidad. Es de los pocos sitios del Mediterráneo peninsular donde el agua sigue pareciéndose a lo que era.

**Desde dónde se sale.** Lo más corto es Santa Pola: unas 4 millas, media hora de navegación. Desde Alicante son unas 11 millas y ronda la hora, y desde El Campello algo más. Esa diferencia importa más de lo que parece: con una embarcación pequeña de las que no exigen titulación, Tabarca queda fuera de alcance desde Alicante pero es asumible desde Santa Pola en un día tranquilo. Con patrón a bordo, desde cualquiera de los tres.

**Cuándo ir.** De junio a septiembre la isla se llena, y a mediodía en agosto hay tanto tráfico que pierde parte de la gracia. Septiembre y octubre son claramente mejores: el agua sigue caliente, la visibilidad es mayor y hay la mitad de gente. Si vas en temporada alta, salir temprano cambia el día entero.

**Lo que hay que respetar.** Tabarca es reserva marina y no es una cala cualquiera: hay zonas donde no se puede pescar ni recoger nada, el balizamiento está señalizado y las condiciones se revisan periódicamente. Antes de salir, confirma qué está permitido ese día con el club o con la autoridad competente. Si vas con patrón, él lo sabrá; si vas solo, pregúntalo en el pantalán antes de largar amarras.

Hay servicio regular de barcos desde Santa Pola y Alicante, más barato por persona. La diferencia de alquilar es que eliges el horario, no compartes cubierta con cincuenta personas y puedes quedarte hasta que te apetezca.`,
    contenidoEn: `Tabarca is the most searched-for destination in the province and the reason many people hire a boat for the first time. It is a flat, compact island, little more than a kilometre and a half long, with an eighteenth-century walled village, a tower, a lighthouse and a seafarer's cemetery. You can walk around the whole island in an hour.

What makes it different is the water. In 1986 it was declared Spain's first marine reserve, and that status is obvious the moment you arrive: the seagrass meadow (Posidonia oceanica) is alive, and on calm days you can see the bottom at surprising depth. It is one of the few places on the peninsular Mediterranean where the water still looks the way it used to.

**Where you set off from.** The shortest run is Santa Pola: about 4 miles, half an hour of navigation. From Alicante it is about 11 miles and around an hour, and from El Campello a bit more. That difference matters more than it seems: with a small boat of the kind that needs no licence, Tabarca is out of reach from Alicante but manageable from Santa Pola on a calm day. With a skipper on board, it works from any of the three harbours.

**When to go.** From June to September the island fills up, and at midday in August there is so much traffic that it loses part of its charm. September and October are clearly better: the water is still warm, visibility is greater and there are half as many people. If you go in high season, leaving early changes the whole day.

**What to respect.** Tabarca is a marine reserve and not just any cove: there are areas where you cannot fish or collect anything, the buoyage is marked and the conditions are reviewed periodically. Before you leave, confirm what is allowed that day with the club or the competent authority. If you go with a skipper, he will know; if you go alone, ask at the pontoon before casting off.

There is a regular ferry service from Santa Pola and Alicante, cheaper per person. The difference with hiring a boat is that you choose the timetable, you do not share the deck with fifty people, and you can stay until you feel like leaving.`,
    contenidoDe: `Tabarca ist das meistgesuchte Ziel der Provinz und der Grund, warum viele Menschen zum ersten Mal ein Boot mieten. Die Insel ist flach und klein, etwas mehr als eineinhalb Kilometer lang, mit einem ummauerten Dorf aus dem 18. Jahrhundert, einem Turm, einem Leuchtturm und einem Seefahrerfriedhof. Sie lässt sich in einer Stunde komplett zu Fuß erkunden.

Was sie besonders macht, ist das Wasser. 1986 wurde hier Spaniens erstes Meeresschutzgebiet ausgerufen, und dieser Status ist sofort spürbar: Die Posidonia-Seegraswiese ist lebendig, und an ruhigen Tagen sieht man den Grund in großer Tiefe. Es ist einer der wenigen Orte im mediterranen Spanien, an denen das Wasser noch so aussieht wie früher.

**Wo Sie ablegen.** Am kürzesten ist der Weg von Santa Pola: etwa 4 Seemeilen, eine halbe Stunde Fahrt. Von Alicante sind es rund 11 Seemeilen und etwa eine Stunde, von El Campello etwas mehr. Dieser Unterschied zählt mehr, als es scheint: Mit einem kleinen Boot, für das kein Führerschein nötig ist, ist Tabarca von Alicante aus außer Reichweite, von Santa Pola an einem ruhigen Tag aber gut machbar. Mit Skipper an Bord klappt es von jedem der drei Häfen.

**Wann Sie fahren sollten.** Von Juni bis September ist die Insel voll, und mittags im August ist so viel Verkehr, dass ein Teil des Reizes verloren geht. September und Oktober sind deutlich besser: Das Wasser ist noch warm, die Sicht ist besser und es sind halb so viele Menschen unterwegs. Wenn Sie in der Hauptsaison fahren, verändert ein früher Start den ganzen Tag.

**Was Sie beachten müssen.** Tabarca ist ein Meeresschutzgebiet und keine gewöhnliche Bucht: Es gibt Zonen, in denen weder gefischt noch etwas gesammelt werden darf, die Betonnung ist markiert und die Bedingungen werden regelmäßig überprüft. Bevor Sie auslaufen, fragen Sie beim Club oder bei der zuständigen Behörde nach, was an diesem Tag erlaubt ist. Wenn Sie mit Skipper fahren, weiß er Bescheid; wenn Sie allein unterwegs sind, fragen Sie am Steg, bevor Sie die Leinen loswerfen.

Von Santa Pola und Alicante verkehrt ein regulärer Bootsdienst, pro Person günstiger. Der Unterschied beim Mieten ist, dass Sie die Uhrzeit selbst bestimmen, sich das Deck nicht mit fünfzig Personen teilen und bleiben können, solange Sie möchten.`,
    latitud: 38.1656,
    longitud: -0.4772,
    clase: "isla",
    orden: 1,
    accesos: [
      { destino: "santa-pola", minutos: 30, sinTitulo: true },
      { destino: "alicante", minutos: 60, sinTitulo: false },
      { destino: "el-campello", minutos: 75, sinTitulo: false },
    ],
    preguntas: [
      {
        pregunta: "¿Cuánto se tarda a Tabarca en barco?",
        respuesta:
          "Desde Santa Pola, unos treinta minutos: son unas 4 millas y es la salida más corta. Desde Alicante, alrededor de una hora, unas 11 millas. Desde El Campello, algo más.",
        preguntaEn: "How long does it take to reach Tabarca by boat?",
        respuestaEn:
          "From Santa Pola, about thirty minutes: it is roughly 4 miles and it is the shortest departure. From Alicante, around an hour, about 11 miles. From El Campello, a bit more.",
        preguntaDe: "Wie lange braucht man mit dem Boot nach Tabarca?",
        respuestaDe:
          "Von Santa Pola etwa dreißig Minuten: Es sind rund 4 Seemeilen, und das ist die kürzeste Abfahrt. Von Alicante etwa eine Stunde, rund 11 Seemeilen. Von El Campello etwas mehr.",
      },
      {
        pregunta: "¿Se puede ir a Tabarca sin licencia de navegación?",
        respuesta:
          "Con patrón a bordo, sí desde cualquier puerto: la titulación la pone él. Sin ningún título, solo es planteable desde Santa Pola y en día tranquilo, porque desde Alicante la travesía queda fuera del alcance de esas embarcaciones.",
        preguntaEn: "Can you go to Tabarca without a navigation licence?",
        respuestaEn:
          "With a skipper on board, yes from any harbour: he provides the qualification. With no licence at all, it is only feasible from Santa Pola and on a calm day, because from Alicante the crossing is out of reach for those boats.",
        preguntaDe: "Kann man ohne Führerschein nach Tabarca fahren?",
        respuestaDe:
          "Mit Skipper an Bord ja, von jedem Hafen: Die Befähigung bringt er mit. Ohne jeden Führerschein ist es nur von Santa Pola und an einem ruhigen Tag machbar, denn von Alicante aus liegt die Überfahrt außerhalb der Reichweite dieser Boote.",
      },
      {
        pregunta: "¿Qué está prohibido en la reserva marina de Tabarca?",
        respuesta:
          "Hay zonas donde no se puede pescar ni recoger ninguna especie, y el balizamiento hay que respetarlo. Las condiciones se revisan periódicamente, así que confirma qué está permitido el día que vayas antes de salir del puerto.",
        preguntaEn: "What is prohibited in the Tabarca marine reserve?",
        respuestaEn:
          "There are areas where you cannot fish or collect any species, and the buoyage must be respected. The conditions are reviewed periodically, so confirm what is allowed on the day you go before leaving the harbour.",
        preguntaDe: "Was ist im Meeresschutzgebiet von Tabarca verboten?",
        respuestaDe:
          "Es gibt Zonen, in denen weder gefischt noch Arten gesammelt werden dürfen, und die Betonnung muss respektiert werden. Die Bedingungen werden regelmäßig überprüft – bestätigen Sie also vor dem Auslaufen, was an Ihrem Tag erlaubt ist.",
      },
      {
        pregunta: "¿Cuál es la mejor época para ir a Tabarca?",
        respuesta:
          "Septiembre y octubre. El agua sigue caliente, la visibilidad es mejor que en pleno verano y hay la mitad de gente que en agosto. Si vas en temporada alta, sal temprano.",
        preguntaEn: "What is the best time of year to go to Tabarca?",
        respuestaEn:
          "September and October. The water is still warm, visibility is better than in high summer and there are half as many people as in August. If you go in high season, leave early.",
        preguntaDe: "Welche Jahreszeit eignet sich am besten für Tabarca?",
        respuestaDe:
          "September und Oktober. Das Wasser ist noch warm, die Sicht ist besser als im Hochsommer und es sind halb so viele Menschen wie im August. Wenn Sie in der Hauptsaison fahren, legen Sie früh ab.",
      },
    ],
  },
  {
    slug: "penon-de-ifach",
    nombre: "Peñón de Ifach",
    provincia: "Alicante",
    titular: "El Peñón de Ifach desde el mar",
    titularEn: "The Peñón de Ifach from the sea",
    titularDe: "Der Peñón de Ifach vom Meer aus",
    descripcion:
      "332 metros de roca cayendo al agua. Desde tierra lo has visto mil veces; desde el mar se ve la pared entera.",
    descripcionEn:
      "332 metres of rock dropping into the sea. You have seen it from land a hundred times; from the water you see the whole wall.",
    descripcionDe:
      "332 Meter Fels, die ins Wasser abfallen. Vom Land kennt man ihn längst; vom Wasser aus sieht man die ganze Wand.",
    contenido: `El Peñón de Ifach es el hito más reconocible de la costa alicantina y una de esas cosas que cambian por completo según desde dónde se miren. Desde el paseo de Calpe es una silueta. Desde el agua, a doscientos o trescientos metros, es una pared de 332 metros cayendo a plomo, con las capas de roca a la vista y el color cambiando cada hora del día.

Es Parque Natural desde 1987, y eso condiciona lo que se puede hacer alrededor. Tiene régimen de protección propio, con limitaciones de aproximación y de fondeo que pueden variar según la temporada. No es una roca cualquiera a la que arrimarse: antes de salir conviene confirmar en el club qué está permitido ese día. Te lo dirán sin problema, y es la diferencia entre una salida buena y una sanción.

**Desde dónde se sale.** Calpe es lo evidente: quince minutos desde la bocana y ya lo tienes encima. Desde Altea son unos treinta, bordeando el Morro de Toix y el Mascarat, que es un tramo bonito de acantilado rojizo. Desde Moraira, unos treinta y cinco por el norte. Y desde Benidorm, alrededor de cincuenta, con la Sierra Helada de por medio.

**La mejor luz.** La cara sur, la que da sobre la Cala del Racó, se aprecia mejor a primera hora de la mañana con el sol de frente. A media tarde queda a contraluz y la pared se apaga. Si el plan es la foto, madrugar compensa.

**Qué más hay alrededor.** Al norte del peñón quedan los Baños de la Reina y la Cala Manzanera, fondeos tranquilos a diez minutos. Siguiendo, el Mascarat. Hacia el sur la costa lleva a la Sierra Helada y, en poco más de media hora desde Calpe, a la Isla de Benidorm: las dos en un día es una jornada completa muy agradecida.

Una advertencia práctica: el peñón crea su propia sombra de viento y sus racheados. Con levante fuerte la cara norte se pone incómoda y conviene pasarse al sur; con poniente, al revés. Que en el puerto haya calma no significa que la haya al otro lado de la mole.`,
    contenidoEn: `The Peñón de Ifach is the most recognisable landmark on the Alicante coast and one of those things that changes completely depending on where you look at it from. From the promenade of Calpe it is a silhouette. From the water, two or three hundred metres away, it is a 332-metre wall falling sheer into the sea, with the rock layers in plain view and the colour changing with every hour of the day.

It has been a Natural Park since 1987, and that shapes what you can do around it. It has its own protection regime, with limits on approaching and anchoring that can vary by season. It is not just any rock to sidle up to: before you leave, it is worth confirming at the club what is allowed that day. They will tell you without hesitation, and it is the difference between a good trip and a fine.

**Where you set off from.** Calpe is the obvious choice: fifteen minutes from the harbour mouth and you are already beneath it. From Altea it is about thirty minutes, rounding the Morro de Toix and the Mascarat, a beautiful stretch of reddish cliff. From Moraira, about thirty-five from the north. And from Benidorm, around fifty, with the Sierra Helada in between.

**The best light.** The south face, the one above Cala del Racó, is best seen early in the morning with the sun in front of you. Mid-afternoon it is backlit and the wall goes flat. If the plan is the photo, getting up early pays off.

**What else is around.** North of the rock are the Baños de la Reina and Cala Manzanera, calm anchorages ten minutes away. Continuing, the Mascarat. Southwards the coast leads to the Sierra Helada and, in just over half an hour from Calpe, to Benidorm Island: the two in a single day is a very rewarding full day out.

One practical warning: the rock creates its own wind shadow and its gusts. With a strong levante the north face turns uncomfortable and it is worth moving round to the south; with a westerly, the opposite. Calm in the harbour does not mean calm on the other side of the mass.`,
    contenidoDe: `Der Peñón de Ifach ist das bekannteste Wahrzeichen der Küste von Alicante und eines dieser Dinge, die sich völlig verändern, je nachdem, von wo man sie betrachtet. Von der Promenade in Calpe aus ist er eine Silhouette. Vom Wasser aus, zweihundert oder dreihundert Meter entfernt, ist er eine 332 Meter hohe Wand, die senkrecht ins Meer fällt, mit sichtbaren Gesteinsschichten und einer Farbe, die sich im Laufe des Tages ständig ändert.

Seit 1987 ist er Naturpark, und das bestimmt, was man in seiner Umgebung tun darf. Er hat ein eigenes Schutzregime mit Einschränkungen beim Annähern und Ankern, die je nach Saison variieren können. Er ist kein Felsen, an den man einfach heranfährt: Vor dem Auslaufen sollten Sie im Club bestätigen, was an diesem Tag erlaubt ist. Man sagt es Ihnen ohne Probleme, und es ist der Unterschied zwischen einem guten Törn und einem Bußgeld.

**Wo Sie ablegen.** Calpe ist die naheliegende Wahl: Fünfzehn Minuten ab der Hafeneinfahrt, und schon sind Sie darunter. Von Altea sind es etwa dreißig Minuten, vorbei am Morro de Toix und am Mascarat, einem schönen Abschnitt mit rötlicher Klippe. Von Moraira etwa fünfunddreißig von Norden. Und von Benidorm rund fünfzig, mit der Sierra Helada dazwischen.

**Das beste Licht.** Die Südseite, die über der Cala del Racó liegt, sieht man am besten am frühen Morgen, wenn die Sonne von vorn kommt. Am Nachmittag liegt sie im Gegenlicht und die Wand wirkt flach. Wenn der Plan das Foto ist, lohnt sich das frühe Aufstehen.

**Was es sonst noch gibt.** Nördlich des Felsens liegen die Baños de la Reina und die Cala Manzanera, ruhige Ankerplätze zehn Minuten entfernt. Weiter geht es zum Mascarat. Nach Süden führt die Küste zur Sierra Helada und in gut einer halben Stunde von Calpe zur Insel Benidorm: Beides an einem Tag ist ein voller, sehr lohnender Tagesausflug.

Eine praktische Warnung: Der Felsen erzeugt seinen eigenen Windschatten und seine eigenen Böen. Bei starkem Levante wird die Nordseite unangenehm, und man wechselt besser auf die Südseite; bei Westwind ist es umgekehrt. Dass im Hafen Flaute herrscht, heißt nicht, dass es auf der anderen Seite des Felsmassivs auch so ist.`,
    latitud: 38.6339,
    longitud: 0.0742,
    clase: "cabo",
    orden: 2,
    accesos: [
      { destino: "calpe", minutos: 15, sinTitulo: true },
      { destino: "altea", minutos: 30, sinTitulo: false },
      { destino: "moraira", minutos: 35, sinTitulo: false },
      { destino: "benidorm", minutos: 50, sinTitulo: false },
    ],
    preguntas: [
      {
        pregunta: "¿Se puede navegar alrededor del Peñón de Ifach?",
        respuesta:
          "Es Parque Natural y tiene régimen de protección propio, con limitaciones de aproximación y fondeo que pueden variar por temporada. Confirma en el club qué está permitido el día que salgas. Lo que nadie discute es la vista de la pared desde el agua.",
        preguntaEn: "Can you sail around the Peñón de Ifach?",
        respuestaEn:
          "It is a Natural Park with its own protection regime, including limits on approaching and anchoring that can vary by season. Confirm with the club what is allowed on the day you go out. What nobody disputes is the view of the wall from the water.",
        preguntaDe: "Kann man um den Peñón de Ifach herumfahren?",
        respuestaDe:
          "Er ist Naturpark mit eigenem Schutzregime, mit Einschränkungen bei Annäherung und Ankern, die je nach Saison variieren können. Bestätigen Sie im Club, was an Ihrem Auslauftag erlaubt ist. Was niemand bestreitet, ist der Blick auf die Wand vom Wasser aus.",
      },
      {
        pregunta: "¿Cuánto se tarda al Ifach desde Calpe?",
        respuesta:
          "Quince minutos desde la bocana. Desde Altea unos treinta bordeando el Mascarat, desde Moraira treinta y cinco y desde Benidorm alrededor de cincuenta.",
        preguntaEn: "How long does it take to reach the Ifach from Calpe?",
        respuestaEn:
          "Fifteen minutes from the harbour mouth. From Altea about thirty rounding the Mascarat, from Moraira thirty-five and from Benidorm around fifty.",
        preguntaDe: "Wie lange braucht man vom Calpe zum Ifach?",
        respuestaDe:
          "Fünfzehn Minuten ab der Hafeneinfahrt. Von Altea etwa dreißig um den Mascarat herum, von Moraira fünfunddreißig und von Benidorm rund fünfzig.",
      },
      {
        pregunta: "¿A qué hora se ve mejor el Peñón desde el barco?",
        respuesta:
          "A primera hora de la mañana. La cara sur, sobre la Cala del Racó, tiene el sol de frente y se aprecian las capas de roca. A media tarde queda a contraluz y pierde.",
        preguntaEn: "What time is the Peñón best seen from the boat?",
        respuestaEn:
          "Early in the morning. The south face, above Cala del Racó, has the sun in front and the rock layers are clearly visible. Mid-afternoon it is backlit and loses.",
        preguntaDe: "Wann sieht man den Peñón vom Boot aus am besten?",
        respuestaDe:
          "Am frühen Morgen. Die Südseite über der Cala del Racó hat die Sonne von vorn, und die Gesteinsschichten sind gut zu erkennen. Am Nachmittag liegt er im Gegenlicht und verliert.",
      },
    ],
  },
  {
    slug: "isla-de-benidorm",
    nombre: "Isla de Benidorm",
    provincia: "Alicante",
    titular: "La Isla de Benidorm en barco",
    titularEn: "Benidorm Island by boat",
    titularDe: "Die Insel Benidorm mit dem Boot",
    descripcion:
      "Veinte minutos desde el puerto y el agua más clara de la bahía. La salida corta más agradecida de la provincia.",
    descripcionEn:
      "Twenty minutes from the harbour and the clearest water in the bay. The most rewarding short trip in the province.",
    descripcionDe:
      "Zwanzig Minuten vom Hafen und das klarste Wasser der Bucht. Der lohnendste Kurztörn der Provinz.",
    contenido: `La Isla de Benidorm está a unos veinte minutos de la bocana del puerto, y esa cercanía es justo lo que la hace tan rentable: con medio día de alquiler da tiempo de sobra a cruzar, bañarse y volver sin prisa. Es la salida corta con mejor relación entre esfuerzo y recompensa de toda la costa alicantina.

Es una isla deshabitada, con forma de triángulo tumbado, y su interés está debajo del agua más que encima. El entorno tiene figura de protección ambiental y eso se nota en la vida marina: es el sitio donde más gente se mete con gafas y tubo en toda la bahía, y con razón. El agua es visiblemente más clara que en la orilla de Levante.

**Desde dónde se sale.** Benidorm es lo obvio: veinte minutos. Desde Villajoyosa son unos treinta, desde Altea treinta y cinco largos bordeando la Sierra Helada, y desde Calpe alrededor de cuarenta. Desde cualquiera de los cuatro se hace en media jornada.

**Lo que no se ve desde tierra.** El otro motivo para salir aquí no es la isla, es mirar atrás. El perfil de rascacielos de Benidorm con la Sierra Helada detrás, visto desde el agua a última hora de la tarde, es una postal que desde el paseo no existe. Por eso las salidas de atardecer funcionan tan bien en este puerto: dos o tres horas, precio bastante menor que un día completo, y la mejor vista de la ciudad.

**Lo que hay que respetar.** Al tener figura de protección, hay reglas sobre qué se puede hacer alrededor de la isla y dónde. Cambian según la temporada, así que confírmalo antes de salir. Si vas con patrón, él lo tiene controlado.

**Cerca de allí.** Bordeando la Sierra Helada hacia el noreste están la Cala Tío Ximo y la Almadrava, dos fondeos pequeños de roca y grava a diez minutos del puerto, bastante más tranquilos que la isla en agosto. Combinar isla por la mañana y una de esas dos para comer es el plan que mejor funciona en temporada alta.`,
    contenidoEn: `Benidorm Island sits about twenty minutes from the harbour mouth, and that closeness is exactly what makes it such good value: with a half-day hire there is more than enough time to cross, swim and head back without rushing. It is the short trip with the best effort-to-reward ratio on the whole Alicante coast. With twenty minutes of sailing, a good long swim and the return leg, a half day is more than enough for the full plan.

The island is uninhabited, shaped like a lopsided triangle, and its interest lies below the waterline rather than above it. The area has environmental protection status, and it shows in the marine life: it is where more people get in with mask and snorkel than anywhere else in the bay, and for good reason. The water is visibly clearer than on the Levante shore.

**Where to set off from.** Benidorm is the obvious choice: twenty minutes from the harbour mouth. From Villajoyosa it is about thirty, from Altea a long thirty-five rounding the Sierra Helada, and from Calpe around forty. From any of the four you can do it in half a day. And you do not need a licence to plan it: with a skipper, which is the most common option among holidaymakers, the trip is straightforward from any of the four harbours, and with a boat you can take out without a licence it is reachable from Benidorm and Villajoyosa on a calm day; from the more distant harbours, no.

**What you cannot see from the shore.** The other reason to come out here is not the island itself but the view behind you. The skyline of Benidorm with the Sierra Helada beyond, seen from the water at the end of the afternoon, is a postcard that simply does not exist from the promenade. That is why sunset trips work so well from this harbour: two or three hours, a price well below a full day, and the best view of the city.

**What to respect.** Because of its protected status, there are rules about what you can do around the island and where. They change with the season, so check before you set off. If you go with a skipper, he has it under control.

**Nearby.** Rounding the Sierra Helada to the north-east you will find Cala Tío Ximo and La Almadrava, two small anchorages ten minutes from the harbour, noticeably calmer than the island in August. Combining the island in the morning with one of the two for lunch is the plan that works best in high season; if you want to chain both spots in the same day, then a full day's hire is worth it over the half day.`,
    contenidoDe: `Die Insel Benidorm liegt etwa zwanzig Minuten von der Hafeneinfahrt entfernt, und genau diese Nähe macht sie so lohnend: Mit einem halben Tag Mietdauer bleibt mehr als genug Zeit, um hinüberzufahren, zu baden und ohne Eile zurückzukehren. Sie ist der Kurztörn mit dem besten Verhältnis zwischen Aufwand und Belohnung an der gesamten Küste von Alicante. Mit zwanzig Minuten Überfahrt, einer ausgiebigen Badezeit und der Rückfahrt reicht der halbe Tag völlig für das komplette Programm.

Die Insel ist unbewohnt, hat die Form eines liegenden Dreiecks, und ihr Reiz liegt eher unter als über der Wasseroberfläche. Das Gebiet steht unter Umweltschutz, und das merkt man am Meeresleben: Nirgendwo in der ganzen Bucht schnorcheln mehr Menschen als hier, und das aus gutem Grund. Das Wasser ist sichtbar klarer als am Levante-Strand.

**Von wo aus man aufbricht.** Benidorm ist die naheliegende Wahl: zwanzig Minuten von der Hafeneinfahrt. Von Villajoyosa sind es etwa dreißig, von Altea gute fünfunddreißig an der Sierra Helada entlang, und von Calpe rund vierzig. Von jedem der vier Häfen schafft man es an einem halben Tag. Dafür brauchen Sie auch keinen Führerschein: Mit Skipper, was bei Urlaubern der üblichste Weg ist, ist der Ausflug von jedem der vier Häfen aus unkompliziert, und mit einem Boot, das Sie ohne Führerschein führen dürfen, ist die Insel an einem ruhigen Tag von Benidorm und Villajoyosa aus erreichbar; von weiter entfernten Häfen aus nicht.

**Was man vom Land aus nicht sieht.** Der andere Grund, hier auszulaufen, ist nicht die Insel, sondern der Blick zurück. Die Skyline von Benidorm mit der Sierra Helada dahinter, am späten Nachmittag vom Wasser aus gesehen, ist ein Postkartenmotiv, das es von der Promenade aus nicht gibt. Deshalb funktionieren die Sonnenuntergangstörns von diesem Hafen aus so gut: zwei bis drei Stunden, ein deutlich geringerer Preis als bei einem ganzen Tag, und die beste Aussicht auf die Stadt.

**Was es zu respektieren gilt.** Da das Gebiet unter Schutz steht, gibt es Regeln darüber, was rund um die Insel erlaubt ist und wo. Sie ändern sich je nach Saison, also erkundigen Sie sich vor dem Ablegen. Wenn Sie mit Skipper fahren, hat er alles im Griff.

**In der Nähe.** An der Sierra Helada entlang in Richtung Nordosten liegen die Cala Tío Ximo und die Almadrava, zwei kleine Ankerplätze zehn Minuten vom Hafen entfernt, im August deutlich ruhiger als die Insel. Die Insel am Vormittag und eine der beiden Buchten zum Essen zu kombinieren, ist der Plan, der in der Hochsaison am besten funktioniert; wenn Sie beide Orte am selben Tag verbinden möchten, lohnt sich die Ganztagsmiete statt des halben Tages.`,
    latitud: 38.5017,
    longitud: -0.1319,
    clase: "isla",
    orden: 3,
    accesos: [
      { destino: "benidorm", minutos: 20, sinTitulo: true },
      { destino: "villajoyosa", minutos: 30, sinTitulo: true },
      { destino: "altea", minutos: 35, sinTitulo: false },
      { destino: "calpe", minutos: 40, sinTitulo: false },
    ],
    preguntas: [
      {
        pregunta: "¿Cuánto se tarda a la Isla de Benidorm en barco?",
        respuesta:
          "Veinte minutos desde la bocana del puerto de Benidorm. Desde Villajoyosa unos treinta, desde Altea treinta y cinco largos y desde Calpe alrededor de cuarenta.",
        preguntaEn: "How long does it take to reach Benidorm Island by boat?",
        respuestaEn:
          "Twenty minutes from the harbour mouth of Benidorm. From Villajoyosa about thirty, from Altea a good thirty-five and from Calpe around forty.",
        preguntaDe: "Wie lange braucht man mit dem Boot zur Insel Benidorm?",
        respuestaDe:
          "Zwanzig Minuten ab der Hafeneinfahrt von Benidorm. Von Villajoyosa etwa dreißig, von Altea gute fünfunddreißig und von Calpe rund vierzig.",
      },
      {
        pregunta: "¿Se puede ir a la Isla de Benidorm sin licencia?",
        respuesta:
          "Con patrón, sí, y es lo más habitual entre quien está de vacaciones. Con una embarcación de las que se llevan sin título es alcanzable desde Benidorm y Villajoyosa en día tranquilo, pero no desde puertos más lejanos.",
        preguntaEn: "Can you go to Benidorm Island without a licence?",
        respuestaEn:
          "With a skipper, yes, and that is the most common option among holidaymakers. With a boat of the kind you can take without a licence it is reachable from Benidorm and Villajoyosa on a calm day, but not from more distant harbours.",
        preguntaDe: "Kann man ohne Führerschein zur Insel Benidorm fahren?",
        respuestaDe:
          "Mit Skipper ja, und das ist unter Urlaubern das Übliche. Mit einem Boot, das man ohne Führerschein führen darf, ist sie von Benidorm und Villajoyosa an einem ruhigen Tag erreichbar, aber nicht von weiter entfernten Häfen.",
      },
      {
        pregunta: "¿Merece la pena media jornada o hace falta el día entero?",
        respuesta:
          "Media jornada llega de sobra: veinte minutos de travesía, tiempo de baño y vuelta. Si quieres encadenar la isla con la Cala Tío Ximo o la Almadrava para comer, entonces sí compensa el día completo.",
        preguntaEn: "Is half a day worth it or do you need the whole day?",
        respuestaEn:
          "Half a day is more than enough: a twenty-minute crossing, time for a swim and the way back. If you want to combine the island with Cala Tío Ximo or the Almadrava for lunch, then the full day is worth it.",
        preguntaDe: "Lohnt sich eine halbe Tagestour oder braucht man den ganzen Tag?",
        respuestaDe:
          "Eine halbe Tagestour reicht locker: zwanzig Minuten Überfahrt, Zeit zum Baden und zurück. Wenn Sie die Insel mit der Cala Tío Ximo oder der Almadrava zum Mittagessen verbinden möchten, dann lohnt sich der ganze Tag.",
      },
    ],
  },
  {
    slug: "cala-granadella",
    nombre: "Cala Granadella",
    provincia: "Alicante",
    titular: "La Cala Granadella en barco",
    titularEn: "Cala Granadella by boat",
    titularDe: "Die Cala Granadella mit dem Boot",
    descripcion:
      "La cala más fotografiada de la Costa Blanca, y la que mejor se entiende desde el agua. A treinta y cinco minutos de Jávea, doblando el Cabo de la Nao.",
    descripcionEn:
      "The most photographed cove on the Costa Blanca, and the one that makes most sense from the water. Thirty-five minutes from Jávea, round the Cabo de la Nao.",
    descripcionDe:
      "Die meistfotografierte Bucht der Costa Blanca und die, die vom Wasser aus am meisten hergibt. Fünfunddreißig Minuten ab Jávea, um das Cabo de la Nao herum.",
    contenido: `La Granadella es una cala de grava encajada entre dos paredes de pino y roca, con el agua de un turquesa que sale en todas las fotos y que, por una vez, es real. Tiene chiringuito, tiene aparcamiento —pequeño y que se llena a las nueve de la mañana en agosto— y tiene una sola carretera de bajada, estrecha y con curvas.

Y ahí está el motivo de venir por mar. En julio y agosto llegar por tierra significa madrugar mucho o dar media vuelta. Desde el agua no hay cola, no hay aparcamiento y se llega cuando uno quiere.

**Desde dónde se sale.** Jávea es lo natural: unos treinta y cinco minutos doblando el Cabo de la Nao. Desde Moraira son unos cuarenta por el norte, y desde Calpe alrededor de cincuenta. Ese cabo importa más de lo que parece: separa dos mares, y el estado del agua puede cambiar bastante de un lado al otro en la misma mañana.

**Cuándo ir.** Desde media mañana en verano hay bastantes barcos, así que salir temprano cambia el día. Junio y septiembre son claramente mejores: el agua está igual de buena y la cala tiene la mitad de gente.

**Lo que hay alrededor.** Siguiendo hacia el sur está la Cala Ambolo y el tramo hasta el Cabo de la Nao; hacia el norte, Els Arcs y el Portitxol. Un día completo desde Jávea da para encadenar dos o tres de estas sin prisa.

**Una advertencia.** Es zona de mucho tráfico de recreo en verano y de bañistas cerca de la orilla. Hay balizamiento que separa la zona de baño y hay que respetarlo. Como en toda esta costa, conviene confirmar antes de salir qué está permitido ese día y en qué zonas.`,
    contenidoEn: `Cala Granadella is a gravel cove tucked between two walls of pine and rock, with water of a turquoise that appears in every photograph and that, for once, is real. It has a beach bar, it has parking – small, and full by nine in the morning in August – and it has a single access road, narrow and winding. It is the most photographed cove on the Costa Blanca, and the one that makes the most sense from the water.

And there is the reason for coming by sea. In July and August, arriving by land means getting up very early or turning back. From the water there is no queue, no parking and you arrive when you like.

**Where you set off from.** Jávea is the natural choice: about thirty-five minutes at cruising speed, rounding the Cabo de la Nao. From Moraira it is about forty from the north, and from Calpe around fifty. That cape matters more than it seems: it separates two seas, and the state of the water can change considerably from one side to the other in the same morning.

**When to go.** From mid-morning in summer there are quite a few boats, so leaving early changes the day. June and September are clearly better: the water is just as good and the cove has half the people.

**What is around it.** Heading south is Cala Ambolo and the stretch as far as the Cabo de la Nao; heading north, Els Arcs and El Portitxol. A full day from Jávea is enough to string together two or three of these without rushing.

**A warning.** This is an area of heavy leisure traffic in summer and of swimmers near the shore. There is buoyage separating the swimming zone and it must be respected. As along this whole coast, it is worth confirming with the club or the competent authority, before you leave, what is allowed that day and in which zones.`,
    contenidoDe: `Die Cala Granadella ist eine Kiesbucht zwischen zwei Wänden aus Pinien und Fels, mit einem Türkis, das auf allen Fotos vorkommt und das diesmal echt ist. Sie hat eine Strandbar, sie hat einen Parkplatz – klein und im August um neun Uhr morgens voll – und sie hat eine einzige Zufahrtsstraße, schmal und kurvig. Es ist die meistfotografierte Bucht der Costa Blanca und die, die vom Wasser aus am meisten hergibt.

Und genau darin liegt der Grund, auf dem Seeweg zu kommen. Im Juli und August heißt es, auf dem Landweg zu kommen, sehr früh aufzustehen oder umzukehren. Vom Wasser aus gibt es keine Schlange, keinen Parkplatz und man kommt, wann man will.

**Wo Sie ablegen.** Jávea ist die natürliche Wahl: etwa fünfunddreißig Minuten in Reisegeschwindigkeit um das Cabo de la Nao herum. Von Moraira sind es rund vierzig von Norden und von Calpe etwa fünfzig. Dieses Kap zählt mehr, als es scheint: Es trennt zwei Meere, und der Zustand des Wassers kann sich am selben Vormittag von einer Seite zur anderen stark ändern.

**Wann Sie fahren sollten.** Ab dem späten Vormittag liegen im Sommer einige Boote in der Bucht, ein früher Start verändert also den ganzen Tag. Juni und September sind deutlich besser: Das Wasser ist genauso gut und es sind halb so viele Menschen in der Bucht.

**Was es in der Nähe gibt.** Weiter nach Süden liegt die Cala Ambolo und der Abschnitt bis zum Cabo de la Nao; nach Norden die Els Arcs und El Portitxol. Ein ganzer Tag ab Jávea reicht, um zwei oder drei davon ohne Eile aneinanderzureihen.

**Eine Warnung.** Im Sommer ist hier viel Freizeitverkehr und viele Schwimmer in Ufernähe. Eine Betonnung trennt die Badezone ab, und man muss sie respektieren. Wie an der gesamten Küste sollten Sie vor dem Auslaufen beim Club oder bei der zuständigen Behörde bestätigen, was an diesem Tag und in welchen Zonen erlaubt ist.`,
    latitud: 38.7086,
    longitud: 0.1875,
    clase: "cala",
    orden: 4,
    accesos: [
      { destino: "javea", minutos: 35, sinTitulo: false },
      { destino: "moraira", minutos: 40, sinTitulo: false },
      { destino: "calpe", minutos: 50, sinTitulo: false },
    ],
    preguntas: [
      {
        pregunta: "¿Cuánto se tarda de Jávea a la Granadella?",
        respuesta:
          "Unos treinta y cinco minutos a velocidad de crucero, doblando el Cabo de la Nao. Desde Moraira unos cuarenta y desde Calpe alrededor de cincuenta.",
        preguntaEn: "How long does it take from Jávea to Granadella?",
        respuestaEn:
          "About thirty-five minutes at cruising speed, rounding the Cabo de la Nao. From Moraira about forty and from Calpe around fifty.",
        preguntaDe: "Wie lange braucht man von Jávea zur Granadella?",
        respuestaDe:
          "Etwa fünfunddreißig Minuten in Reisegeschwindigkeit, um das Cabo de la Nao herum. Von Moraira rund vierzig und von Calpe etwa fünfzig.",
      },
      {
        pregunta: "¿Merece la pena ir por mar en vez de por carretera?",
        respuesta:
          "En julio y agosto, mucho. La bajada es una carretera estrecha con un aparcamiento pequeño que se llena a las nueve de la mañana. Desde el agua no hay cola ni aparcamiento.",
        preguntaEn: "Is it worth going by sea instead of by road?",
        respuestaEn:
          "In July and August, very much. The way down is a narrow road with a small car park that fills up by nine in the morning. From the water there is no queue and no parking.",
        preguntaDe: "Lohnt es sich, statt über die Straße mit dem Boot zu kommen?",
        respuestaDe:
          "Im Juli und August sehr. Die Zufahrt ist eine schmale Straße mit einem kleinen Parkplatz, der um neun Uhr morgens voll ist. Vom Wasser aus gibt es keine Schlange und keinen Parkplatz.",
      },
      {
        pregunta: "¿Se puede llegar a la Granadella sin titulación?",
        respuesta:
          "Con patrón, sí. Con una embarcación de las que se llevan sin título queda fuera del radio permitido, y además hay que doblar el Cabo de la Nao, que cambia el estado del mar de un lado al otro.",
        preguntaEn: "Can you reach Granadella without a licence?",
        respuestaEn:
          "With a skipper, yes. With a boat of the kind you can take without a licence it is outside the permitted radius, and besides you have to round the Cabo de la Nao, which changes the state of the sea from one side to the other.",
        preguntaDe: "Kann man die Granadella ohne Führerschein erreichen?",
        respuestaDe:
          "Mit Skipper ja. Mit einem Boot, das man ohne Führerschein führen darf, liegt sie außerhalb des erlaubten Radius, und außerdem muss man das Cabo de la Nao umrunden, das den Zustand des Meeres von einer Seite zur anderen verändert.",
      },
    ],
  },
  {
    slug: "cova-tallada",
    nombre: "Cova Tallada",
    provincia: "Alicante",
    titular: "La Cova Tallada en barco",
    titularEn: "Cova Tallada by boat",
    titularDe: "Die Cova Tallada mit dem Boot",
    descripcion:
      "Una cueva excavada a mano en la roca del Cabo de San Antonio, con el mar entrando dentro. Por tierra el acceso está limitado; por mar es otra historia.",
    descripcionEn:
      "A cave hand-cut into the rock of Cabo de San Antonio, with the sea running inside it. Land access is restricted; by boat it is another matter.",
    descripcionDe:
      "Eine von Hand in den Fels des Cabo de San Antonio geschlagene Höhle, in die das Meer hineinläuft. Der Zugang über Land ist beschränkt; vom Boot aus ist es etwas anderes.",
    contenido: `La Cova Tallada no es una cueva natural del todo: es una cantera. Los canteros medievales sacaron de ahí la piedra con la que se construyó buena parte de Dénia, y lo que dejaron fue una sala de techo plano, con columnas de roca y el mar entrando por delante. De ahí el nombre: cueva tallada.

Está en la cara norte del Cabo de San Antonio, entre Dénia y Jávea, en un tramo de acantilado que cae a plomo. Desde el agua se ve la boca abierta en la pared y se entiende de golpe por qué es el sitio más visitado de la zona.

**Desde dónde se sale.** Dénia es lo más corto: unas tres millas, veinticinco minutos largos bordeando la costa de Les Rotes. Desde Jávea son unos treinta, pasando el cabo por el otro lado.

**Por qué se va por mar.** El acceso por tierra es un sendero exigente y **está sujeto a limitaciones de aforo y a autorización en temporada**, precisamente porque en verano llegaba muchísima gente. Las condiciones cambian de un año a otro. Desde el agua la restricción es otra y hay que informarse también, pero la logística es incomparablemente más sencilla.

**Lo que hay que confirmar antes.** Todo este tramo está dentro de la zona protegida del Cabo de San Antonio, con su propio régimen: hay limitaciones de navegación, de fondeo y de actividades que se revisan periódicamente. Antes de poner rumbo, pregunta en el club o a la autoridad competente qué está permitido ese día. No es una cala cualquiera y aquí la respuesta importa.

**Cuándo.** A primera hora de la mañana la luz entra por la boca y se ve el fondo desde dentro. A mediodía en agosto hay bastante afluencia. Septiembre y octubre siguen siendo los mejores meses de esta costa también para esto.`,
    contenidoEn: `La Cova Tallada is not entirely a natural cave: it is a quarry. Medieval stonemasons took the stone from here that went into building much of Dénia, and what they left behind is a chamber with a flat ceiling, rock columns and the sea running in through the mouth. That is where the name comes from: "tallada" means carved or cut.

The cave lies on the north face of Cabo de San Antonio, between Dénia and Jávea, on a stretch of cliff that drops sheer into the water. It was cut by hand into the rock, and the sea runs right inside it. From the water you see the opening gaping in the cliff and you understand at once why it is the most visited spot in the area. On land, access is restricted; by boat it is another matter entirely.

**Where you set out from.** Dénia is the shortest: about three miles, a good twenty-five minutes hugging the Les Rotes coastline. From Jávea it is around thirty minutes, rounding the cape from the other side. Both are short runs, but neither is within the range of the boats that need no licence: this is a trip for a boat with a skipper on board, from either port.

**Why go by sea.** Land access is a demanding path, and in season it is subject to capacity limits and prior authorisation, precisely because huge numbers of people used to arrive in summer. The conditions change from year to year. From the water the restriction is a different one and you still have to check, but the logistics are incomparably simpler: no long walk, no queues, just a short run from Dénia or Jávea and the mouth of the cave is in front of you.

**What to check before you go.** This whole stretch lies inside the protected zone of Cabo de San Antonio, with its own regime: there are limits on navigation, anchoring and activities that are reviewed periodically. Before setting course, ask at the club or the competent authority what is allowed that day. This is not just any cove, and here the answer matters.

**When to go.** First thing in the morning the light comes in through the mouth and you can see the bottom from inside the chamber. At midday in August there is a fair amount of traffic, so an early start pays off. September and October remain the best months on this coast, and this spot is no exception.`,
    contenidoDe: `Die Cova Tallada ist keine vollständig natürliche Höhle: Sie ist ein Steinbruch. Mittelalterliche Steinmetze holten von hier das Gestein, aus dem ein großer Teil von Dénia gebaut wurde. Zurück blieb eine Halle mit flacher Decke, Felssäulen und dem Meer, das durch die Öffnung hineinläuft. Daher stammt der Name: „tallada“ bedeutet geschnitten oder gehauen.

Die Höhle liegt an der Nordseite des Cabo de San Antonio, zwischen Dénia und Jávea, an einem Küstenabschnitt, der steil ins Wasser abfällt. Sie wurde von Hand in den Fels geschlagen, und das Meer läuft direkt hinein. Vom Wasser aus sieht man die Öffnung in der Wand und versteht sofort, warum dies der meistbesuchte Ort der Gegend ist. Über Land ist der Zugang beschränkt; vom Boot aus ist es eine ganz andere Sache.

**Von wo man aufbricht.** Dénia ist die kürzeste Strecke: etwa drei Seemeilen, gute fünfundzwanzig Minuten entlang der Küste von Les Rotes. Von Jávea sind es rund dreißig Minuten, am Kap auf der anderen Seite vorbei. Beides sind kurze Überfahrten, aber keine liegt in Reichweite der Boote ohne Führerschein: Dies ist ein Ausflug mit Skipper an Bord, von beiden Häfen aus.

**Warum man übers Meer fährt.** Der Zugang über Land ist ein anspruchsvoller Pfad und in der Saison an Kapazitätsgrenzen und Genehmigungen gebunden, gerade weil im Sommer sehr viele Menschen kamen. Die Bedingungen ändern sich von Jahr zu Jahr. Vom Wasser aus gelten andere Einschränkungen, über die man sich ebenfalls informieren muss, aber die Logistik ist ungleich einfacher: kein langer Fußmarsch, keine Warteschlangen, nur eine kurze Fahrt von Dénia oder Jávea – und schon liegt die Öffnung der Höhle vor Ihnen.

**Was man vorher klären sollte.** Die gesamte Strecke liegt innerhalb der Schutzzone des Cabo de San Antonio mit einem eigenen Regime: Es gibt Beschränkungen für Navigation, Ankern und Aktivitäten, die regelmäßig überprüft werden. Bevor Sie ablegen, fragen Sie im Club oder bei der zuständigen Behörde, was an diesem Tag erlaubt ist. Dies ist keine beliebige Bucht, und hier kommt es auf die Antwort an.

**Wann.** Am frühen Morgen fällt das Licht durch die Öffnung, und man sieht von innen den Grund. Mittags im August herrscht einiges an Andrang, der frühe Start zahlt sich also aus. September und Oktober bleiben auch hierfür die besten Monate dieser Küste.`,
    latitud: 38.8036,
    longitud: 0.1889,
    clase: "cueva",
    orden: 5,
    accesos: [
      { destino: "denia", minutos: 25, sinTitulo: false },
      { destino: "javea", minutos: 30, sinTitulo: false },
    ],
    preguntas: [
      {
        pregunta: "¿Se puede entrar a la Cova Tallada desde el barco?",
        respuesta:
          "El tramo está dentro de la zona protegida del Cabo de San Antonio, con limitaciones de navegación, fondeo y actividades que se revisan periódicamente. Confirma qué está permitido el día que vayas con el club o con la autoridad competente antes de poner rumbo.",
        preguntaEn: "Can you enter the Cova Tallada from the boat?",
        respuestaEn:
          "The stretch lies inside the protected zone of Cabo de San Antonio, with limits on navigation, anchoring and activities that are reviewed periodically. Check with the club or the competent authority what is allowed on the day you go, before setting course.",
        preguntaDe: "Kann man die Cova Tallada vom Boot aus betreten?",
        respuestaDe:
          "Der Abschnitt liegt innerhalb der Schutzzone des Cabo de San Antonio mit Beschränkungen für Navigation, Ankern und Aktivitäten, die regelmäßig überprüft werden. Klären Sie vor dem Ablegen mit dem Club oder der zuständigen Behörde, was an dem Tag erlaubt ist, an dem Sie fahren.",
      },
      {
        pregunta: "¿Cuánto se tarda a la Cova Tallada?",
        respuesta:
          "Desde Dénia, unas tres millas y veinticinco minutos largos bordeando Les Rotes. Desde Jávea, alrededor de treinta pasando el cabo por el otro lado.",
        preguntaEn: "How long does it take to get to the Cova Tallada?",
        respuestaEn:
          "From Dénia, about three miles and a good twenty-five minutes hugging the Les Rotes coastline. From Jávea, around thirty minutes, rounding the cape from the other side.",
        preguntaDe: "Wie lange dauert die Fahrt zur Cova Tallada?",
        respuestaDe:
          "Von Dénia etwa drei Seemeilen und gute fünfundzwanzig Minuten entlang der Küste von Les Rotes. Von Jávea rund dreißig Minuten, am Kap auf der anderen Seite vorbei.",
      },
      {
        pregunta: "¿Es más fácil llegar por mar o por tierra?",
        respuesta:
          "Por mar la logística es mucho más sencilla. El sendero de tierra es exigente y está sujeto a limitaciones de aforo y autorización en temporada, con condiciones que cambian de un año a otro.",
        preguntaEn: "Is it easier to get there by sea or by land?",
        respuestaEn:
          "By sea the logistics are much simpler. The land path is demanding and subject to capacity limits and seasonal authorisation, with conditions that change from year to year.",
        preguntaDe: "Ist es einfacher, übers Meer oder über Land zu kommen?",
        respuestaDe:
          "Übers Meer ist die Logistik deutlich einfacher. Der Pfad über Land ist anspruchsvoll und unterliegt Kapazitätsgrenzen und saisonalen Genehmigungen; die Bedingungen ändern sich von Jahr zu Jahr.",
      },
    ],
  },
  {
    slug: "els-arcs",
    nombre: "Els Arcs",
    provincia: "Alicante",
    titular: "Els Arcs de Jávea en barco",
    titularEn: "Els Arcs in Jávea by boat",
    titularDe: "Els Arcs bei Jávea mit dem Boot",
    descripcion:
      "Dos arcos de roca sobre el agua junto a la Cala Sardinera. Veinticinco minutos desde Jávea y el sitio más reconocible de esta costa después del Ifach.",
    descripcionEn:
      "Two rock arches standing over the water beside Cala Sardinera. Twenty-five minutes from Jávea and the most recognisable spot on this coast after the Ifach.",
    descripcionDe:
      "Zwei Felsbögen über dem Wasser neben der Cala Sardinera. Fünfundzwanzig Minuten ab Jávea und nach dem Ifach der markanteste Punkt dieser Küste.",
    contenido: `Els Arcs son dos arcos de roca que el mar ha ido vaciando en la punta del acantilado, junto a la Cala Sardinera. Están a unos veinticinco minutos de Jávea rumbo norte, antes de llegar al Cabo de San Antonio, y son de esas cosas que desde tierra no existen: el sendero pasa por arriba y no se ven.

Desde el agua, en cambio, aparecen de golpe al doblar la punta. El tamaño solo se entiende cuando hay un barco pequeño al lado para comparar.

**Desde dónde se sale.** Jávea, veinticinco minutos. Desde Moraira son unos cuarenta bordeando el Cabo de San Antonio por fuera, y desde Dénia algo más.

**Lo que hay al lado.** La Cala Sardinera, de grava y sin acceso rodado, que es de las más tranquilas del tramo justo por eso. Y siguiendo hacia el sur, el Portitxol y la Isla del Descubridor, a diez minutos: encadenar los tres es el plan de medio día que mejor funciona desde Jávea.

**Cuándo ir.** Por la mañana. La pared está orientada de forma que a primera hora tiene el sol de frente y el agua se ve del color que sale en las fotos; a media tarde queda a contraluz. Y en verano, cuanto antes se salga, menos barcos hay alrededor.

**Una advertencia de sentido común.** Es una formación de roca sobre el agua y con el mar picado la zona se pone incómoda. Con levante entrando conviene dejarlo para otro día: no hay prisa y el sitio no se mueve.`,
    contenidoEn: `Els Arcs are two rock arches that the sea has hollowed out of the tip of the headland, right beside Cala Sardinera. They lie about twenty-five minutes north of Jávea, before you reach Cabo de San Antonio, and they are one of those things that practically do not exist from the land: the path runs along the top of the cliff and they stay hidden.

From the water, by contrast, they appear suddenly as you round the point. The size only makes sense when there is a small boat alongside to compare it with. Two rock arches standing over the water beside a cove: after the Peñón de Ifach it is the most recognisable sight on this coast, and from land you would never know it was there.

**Where you set out from.** Jávea, twenty-five minutes. From Moraira it is around forty minutes, rounding Cabo de San Antonio on the outside, and from Dénia a bit more, about forty-five. From Jávea the run is short enough to be within reach of a boat that needs no licence; from the other two ports the distance is longer and the trip is made with a skipper on board.

**What is next door.** Cala Sardinera, a gravel cove with no road access, which is exactly why it is one of the quietest on the stretch. And heading south, El Portitxol and Isla del Descubridor, ten minutes away: stringing the three together is the half-day plan that works best from Jávea.

**When to go.** In the morning. The rock face is oriented so that early on it catches the sun head-on and the water takes on the colour that comes out in the photographs; by mid-afternoon it is backlit. And in summer, the earlier you leave, the fewer boats there are around.

**A common-sense warning.** It is a rock formation standing in the water, and with a choppy sea the area gets uncomfortable. With a levante (easterly) blowing in, leave it for another day: there is no hurry and the spot is not going anywhere.`,
    contenidoDe: `Els Arcs sind zwei Felsbögen, die das Meer in die Spitze der Landzunge gegraben hat, direkt neben der Cala Sardinera. Sie liegen etwa fünfundzwanzig Minuten nördlich von Jávea, bevor man das Cabo de San Antonio erreicht, und gehören zu den Dingen, die es vom Land aus praktisch nicht gibt: Der Weg führt oben über die Klippe, und die Bögen bleiben verborgen.

Vom Wasser aus tauchen sie dagegen plötzlich auf, sobald man die Landspitze rundet. Die Größe erschließt sich erst, wenn ein kleines Boot danebenliegt, um zu vergleichen. Zwei Felsbögen über dem Wasser neben einer Bucht: Nach dem Peñón de Ifach sind sie der markanteste Punkt dieser Küste, und vom Land aus würde man nie ahnen, dass es sie gibt.

**Von wo man aufbricht.** Jávea, fünfundzwanzig Minuten. Von Moraira sind es rund vierzig Minuten, außen am Cabo de San Antonio vorbei, und von Dénia etwas mehr, etwa fünfundvierzig. Von Jávea aus ist die Fahrt kurz genug, um mit einem Boot ohne Führerschein erreichbar zu sein; von den anderen beiden Häfen ist die Strecke länger und wird mit Skipper an Bord gefahren.

**Was es daneben gibt.** Die Cala Sardinera, eine Kiesbucht ohne Straßenzugang, gerade deshalb eine der ruhigsten dieses Küstenabschnitts. Und weiter südlich, zehn Minuten entfernt, liegen das Portitxol und die Isla del Descubridor: Alle drei aneinanderzureihen ist der Halbtagesplan, der sich von Jávea aus am besten bewährt.

**Wann man fahren sollte.** Am Vormittag. Die Felswand ist so ausgerichtet, dass sie am frühen Morgen die Sonne frontal bekommt und das Wasser die Farbe annimmt, die auf den Fotos zu sehen ist; am späten Nachmittag liegt sie im Gegenlicht. Und im Sommer gilt: Je früher man ablegt, desto weniger Boote sind unterwegs.

**Eine Warnung des gesunden Menschenverstands.** Es handelt sich um eine Felsformation über dem Wasser, und bei kabbeliger See wird die Zone unangenehm. Bei auffrischendem Levante (Ostwind) verschiebt man den Ausflug besser auf einen anderen Tag: Es eilt nicht, und das Ziel läuft nicht weg.`,
    latitud: 38.7517,
    longitud: 0.2286,
    clase: "cabo",
    orden: 6,
    accesos: [
      { destino: "javea", minutos: 25, sinTitulo: true },
      { destino: "moraira", minutos: 40, sinTitulo: false },
      { destino: "denia", minutos: 45, sinTitulo: false },
    ],
    preguntas: [
      {
        pregunta: "¿Se ven Els Arcs desde tierra?",
        respuesta:
          "Prácticamente no: el sendero pasa por arriba del acantilado y quedan ocultos. Aparecen de golpe al doblar la punta desde el agua, y el tamaño solo se entiende con un barco al lado para comparar.",
        preguntaEn: "Can you see Els Arcs from land?",
        respuestaEn:
          "Practically not: the path runs along the top of the cliff and they stay hidden. They appear suddenly as you round the point from the water, and the size only makes sense with a boat alongside for comparison.",
        preguntaDe: "Kann man Els Arcs vom Land aus sehen?",
        respuestaDe:
          "Praktisch nicht: Der Weg führt oben über die Klippe, und die Bögen bleiben verborgen. Sie tauchen plötzlich auf, sobald man die Landspitze vom Wasser aus rundet, und die Größe erschließt sich erst mit einem Boot daneben zum Vergleich.",
      },
      {
        pregunta: "¿A qué hora se ven mejor?",
        respuesta:
          "Por la mañana. La pared tiene el sol de frente a primera hora y el agua coge el color de las fotos; a media tarde queda a contraluz.",
        preguntaEn: "What time of day do they look best?",
        respuestaEn:
          "In the morning. The rock face catches the sun head-on early on and the water takes on the colour of the photographs; by mid-afternoon it is backlit.",
        preguntaDe: "Wann sieht man sie am besten?",
        respuestaDe:
          "Am Vormittag. Die Felswand bekommt am frühen Morgen die Sonne frontal ab, und das Wasser nimmt die Farbe der Fotos an; am späten Nachmittag liegt sie im Gegenlicht.",
      },
      {
        pregunta: "¿Qué más hay cerca?",
        respuesta:
          "La Cala Sardinera, sin acceso rodado y por eso muy tranquila, y a diez minutos hacia el sur el Portitxol y la Isla del Descubridor. Los tres encadenados son el mejor medio día desde Jávea.",
        preguntaEn: "What else is nearby?",
        respuestaEn:
          "Cala Sardinera, with no road access and therefore very quiet, and ten minutes to the south, El Portitxol and Isla del Descubridor. The three strung together make the best half-day out from Jávea.",
        preguntaDe: "Was gibt es sonst noch in der Nähe?",
        respuestaDe:
          "Die Cala Sardinera, ohne Straßenzugang und deshalb sehr ruhig, und zehn Minuten südlich das Portitxol und die Isla del Descubridor. Alle drei aneinandergereiht ergeben den besten halben Tag ab Jávea.",
      },
    ],
  },
  {
    slug: "cabo-de-las-huertas",
    nombre: "Cabo de las Huertas",
    provincia: "Alicante",
    titular: "El Cabo de las Huertas en barco",
    titularEn: "Cabo de las Huertas by boat",
    titularDe: "Das Cabo de las Huertas mit dem Boot",
    descripcion:
      "Calas de roca y agua transparente a un cuarto de hora de Alicante. El mejor fondeo del entorno de la ciudad y el más fácil de alcanzar sin titulación.",
    descripcionEn:
      "Rocky coves and clear water fifteen minutes from Alicante. The best anchorage near the city and the easiest to reach without a licence.",
    descripcionDe:
      "Felsbuchten und klares Wasser eine Viertelstunde von Alicante. Der beste Ankerplatz im Umfeld der Stadt und der am leichtesten ohne Führerschein erreichbare.",
    contenido: `El Cabo de las Huertas es la punta de roca que separa la playa de San Juan del resto de la bahía de Alicante, y es donde está el mejor tramo de calas de todo el entorno de la ciudad: Cantalars, la Palmera, los Judíos y una serie de entrantes pequeños de roca plana con agua muy clara.

Lo interesante no es solo que sean bonitas: es que están a quince o veinte minutos de dos puertos y se alcanzan sin salir de la costa. Es de los pocos destinos de esta guía al que se llega con una embarcación de las que se gobiernan sin titulación.

**Desde dónde se sale.** El Campello es lo más corto, un cuarto de hora largo rumbo sur. Desde Alicante son unos veinte minutos rumbo norte. Las dos salidas funcionan igual de bien y la diferencia real está en el aparcamiento: en agosto, Campello gana.

**Qué tiene de especial.** Es fondo de roca plana, no de arena, y eso hace que el agua se vea de un color distinto al del resto de la bahía. En días de calma la visibilidad es la mejor del entorno de Alicante, y se llena de gente con gafas y tubo.

**Cuándo.** La brisa de la tarde del este y sureste entra a partir de media tarde y levanta un picado incómodo en esta zona, que está expuesta. Aquí también funciona el mismo consejo de siempre en esta costa: salir temprano, comer fondeado antes de las dos y volver con el viento a favor.

**Lo que hay que respetar.** Hay zonas de baño balizadas cerca de las calas más concurridas y hay que mantenerse fuera. Como siempre, confirma antes de salir qué está permitido en la zona ese día.`,
    contenidoEn: `Cabo de las Huertas is the rocky headland that separates Playa de San Juan from the rest of Alicante bay, and it is home to the best stretch of coves anywhere near the city: Cantalars, la Palmera, los Judíos and a series of small inlets of flat rock with very clear water.

The interesting part is not only that they are pretty: it is that they lie fifteen or twenty minutes from two harbours and are reached without leaving the coast. It is one of the few destinations in this guide that you can get to with a boat you can handle without a licence: just leave El Campello or Alicante and follow the coastline towards the headland and the plan is sorted.

**Where to set off from.** El Campello is the shortest, a good quarter of an hour heading south. From Alicante it is about twenty minutes heading north. From Santa Pola, on the other hand, the trip stretches to about fifty minutes and is no longer licence-free, so the headland is really planned from the two northern harbours. Both departures work equally well and the real difference is the parking: in August, Campello wins.

**What makes it special.** The water shows a different colour from the rest of the bay, clearer than any other stretch nearby. On calm days the visibility is the best in the Alicante area, and it fills with people in mask and snorkel. Each cove is small, and the classic plan is to hop from one to the next through the morning.

**When to go.** The afternoon sea breeze from the east and south-east builds from mid-afternoon and kicks up an uncomfortable chop in this area. The usual advice for this coast applies here too: leave early, have lunch anchored before two and return with the wind behind you. In the morning, before the breeze gets up, is when the coves are at their best.

**What to respect.** There are marked bathing zones near the busiest coves and you have to stay out of them. As always, check before you set off what is allowed in the area that day, with the club or the competent authority.`,
    contenidoDe: `Das Cabo de las Huertas ist die Felsnase, die den Strand von San Juan vom Rest der Bucht von Alicante trennt, und hier liegt die schönste Strecke mit Buchten im gesamten Umfeld der Stadt: Cantalars, la Palmera, los Judíos und eine Reihe kleiner Einschnitte mit flachem Fels und sehr klarem Wasser.

Das Interessante ist nicht nur, dass sie schön sind: Sie liegen nur fünfzehn oder zwanzig Minuten von zwei Häfen entfernt und sind erreichbar, ohne die Küste zu verlassen. Es ist eines der wenigen Ziele dieses Führers, das man mit einem Boot erreicht, das man ohne Führerschein führen darf: Einfach von El Campello oder Alicante auslaufen und der Küste in Richtung Kap folgen, schon ist der Plan fertig.

**Von wo aus man aufbricht.** El Campello ist am nächsten, gut eine Viertelstunde in Richtung Süden. Von Alicante sind es etwa zwanzig Minuten in Richtung Norden. Von Santa Pola dauert die Überfahrt dagegen rund fünfzig Minuten und ist dann nicht mehr ohne Führerschein möglich, also plant man das Kap vor allem von den beiden nördlichen Häfen aus. Beide Starts funktionieren gleich gut, und der echte Unterschied ist das Parken: Im August gewinnt Campello.

**Was es besonders macht.** Das Wasser hat eine andere Farbe als im Rest der Bucht, klarer als an jedem anderen Abschnitt in der Nähe. An ruhigen Tagen ist die Sicht die beste im Umfeld von Alicante, und es tummeln sich viele Menschen mit Schnorchelmaske und -rohr. Jede Bucht ist klein, und der klassische Plan ist, im Laufe des Vormittags von einer zur nächsten zu fahren.

**Wann man fahren sollte.** Die nachmittägliche Seebrise aus Ost und Südost setzt ab dem späten Nachmittag ein und wirft in dieser Zone eine unangenehme Kabbelsee auf. Auch hier gilt derselbe Rat wie immer an dieser Küste: Früh losfahren, vor zwei Uhr verankert zu Mittag essen und mit dem Wind im Rücken zurückkehren. Am Vormittag, bevor die Brise aufkommt, sind die Buchten in ihrem besten Zustand.

**Was es zu respektieren gilt.** In der Nähe der belebteren Buchten gibt es markierte Badezonen, und man muss sich außerhalb von ihnen aufhalten. Wie immer gilt: Erkundigen Sie sich vor dem Ablegen, was an dem Tag in der Zone erlaubt ist, beim Club oder bei der zuständigen Behörde.`,
    latitud: 38.3494,
    longitud: -0.4103,
    clase: "cabo",
    orden: 7,
    accesos: [
      { destino: "el-campello", minutos: 15, sinTitulo: true },
      { destino: "alicante", minutos: 20, sinTitulo: true },
      { destino: "santa-pola", minutos: 50, sinTitulo: false },
    ],
    preguntas: [
      {
        pregunta: "¿Se llega al Cabo de las Huertas sin licencia?",
        respuesta:
          "Sí, es de los pocos destinos con nombre propio de esta costa que se alcanza con una embarcación de las que se gobiernan sin titulación: quince o veinte minutos desde El Campello o desde Alicante, sin alejarse de la costa.",
        preguntaEn: "Can you reach Cabo de las Huertas without a licence?",
        respuestaEn:
          "Yes, it is one of the few named destinations on this coast that can be reached with a boat handled without a licence: fifteen or twenty minutes from El Campello or from Alicante, without leaving the coast.",
        preguntaDe: "Erreicht man das Cabo de las Huertas ohne Führerschein?",
        respuestaDe:
          "Ja, es ist eines der wenigen namhaften Ziele dieser Küste, die man mit einem Boot erreicht, das ohne Führerschein gefahren wird: fünfzehn oder zwanzig Minuten von El Campello oder von Alicante aus, ohne sich von der Küste zu entfernen.",
      },
      {
        pregunta: "¿Sale mejor desde Alicante o desde El Campello?",
        respuesta:
          "Para el barco da casi igual: quince minutos desde Campello, veinte desde Alicante. La diferencia real está en el aparcamiento, y en agosto Campello gana.",
        preguntaEn: "Is it better to leave from Alicante or from El Campello?",
        respuestaEn:
          "For the boat it makes almost no difference: fifteen minutes from Campello, twenty from Alicante. The real difference is the parking, and in August Campello wins.",
        preguntaDe: "Fährt man besser von Alicante oder von El Campello aus?",
        respuestaDe:
          "Für das Boot ist es fast gleich: fünfzehn Minuten ab Campello, zwanzig ab Alicante. Der eigentliche Unterschied ist das Parken, und im August gewinnt Campello.",
      },
      {
        pregunta: "¿Cuáles son las calas del Cabo de las Huertas?",
        respuesta:
          "Cantalars, la Palmera y los Judíos, más una serie de entrantes pequeños. Son de roca plana, no de arena, y por eso el agua se ve de un color distinto al del resto de la bahía.",
        preguntaEn: "Which are the coves of Cabo de las Huertas?",
        respuestaEn:
          "Cantalars, la Palmera and los Judíos, plus a series of small inlets. They are of flat rock, not sand, which is why the water looks a different colour from the rest of the bay.",
        preguntaDe: "Welche Buchten gibt es am Cabo de las Huertas?",
        respuestaDe:
          "Cantalars, la Palmera und los Judíos, dazu eine Reihe kleiner Einbuchtungen. Sie bestehen aus flachem Fels, nicht aus Sand, und deshalb wirkt das Wasser anders gefärbt als im Rest der Bucht.",
      },
    ],
  },
];
