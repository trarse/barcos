/**
 * Catálogo de destinos.
 *
 * Cada entrada genera una landing indexable. El campo `contenido` no es
 * relleno: es el texto largo con condiciones de navegación, calas y precios
 * que hace que la página compita por su palabra clave. Las `preguntas`
 * alimentan el bloque de FAQ y su JSON-LD.
 */

export interface PuertoSemilla {
  slug: string;
  nombre: string;
  latitud: number;
  longitud: number;
}

export interface PreguntaSemilla {
  pregunta: string;
  respuesta: string;
  preguntaEn?: string;
  respuestaEn?: string;
  preguntaDe?: string;
  respuestaDe?: string;
}

export interface DestinoSemilla {
  slug: string;
  nombre: string;
  provincia: string;
  comunidad: string;
  clase: "isla" | "costa" | "ciudad";
  titular: string;
  descripcion: string;
  descripcionEn: string;
  descripcionDe: string;
  contenido: string;
  contenidoEn?: string;
  contenidoDe?: string;
  latitud: number;
  longitud: number;
  mesesAlta: string;
  destacado: boolean;
  orden: number;
  puertos: PuertoSemilla[];
  preguntas: PreguntaSemilla[];
  /**
   * Texto propio de la landing "sin licencia" de este municipio. Es el
   * cluster de mayor intencion de compra del sector y el que la competencia
   * deja sin cubrir en la mayoria de municipios de la Costa Blanca.
   * Sin texto propio la pagina existe pero no se indexa.
   */
  sinLicencia?: string;
  sinLicenciaEn?: string;
  sinLicenciaDe?: string;
  preguntasSinLicencia?: PreguntaSemilla[];
}

export const DESTINOS: DestinoSemilla[] = [
  {
    slug: "denia",
    nombre: "Dénia",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "costa",
    titular: "Alquiler de barcos en Dénia",
    descripcion:
      "El Parc Natural del Montgó, las cuevas de Xàbia y la Cova Tallada. La costa más accesible de Alicante, a hora y media de Valencia.",
    descripcionEn:
      "The Montgó nature park, the Xàbia caves and the Cova Tallada. The most accessible stretch of the Alicante coast, ninety minutes from Valencia.",
    descripcionDe:
      "Der Naturpark Montgó, die Höhlen von Xàbia und die Cova Tallada. Der am leichtesten erreichbare Küstenabschnitt Alicantes, anderthalb Stunden von Valencia.",
    contenido: `Dénia es la puerta de entrada al tramo de costa más espectacular de la Comunitat Valenciana. El macizo del Montgó cae al mar formando el Cap de Sant Antoni, y de ahí hasta el Cap de la Nau se suceden cuevas, arcos de roca y calas de grava a las que solo se llega por agua.

La Cova Tallada es el fondeo obligatorio: una cueva excavada por los canteros musulmanes en la roca del cabo, con un lago interior donde se entra nadando. Al sur, la Cala Granadella y el Arco de Los Arcos de Xàbia forman el conjunto más fotografiado de la zona. Al norte, las playas de Les Marines y Els Molins ofrecen fondeos de arena tranquilos para un día en familia.

La navegación es fácil casi todo el año. El levante puede levantar mar de fondo por la tarde, y en invierno hay días de mistral que se dejan sentir, pero el tramo Dénia-Xàbia está protegido por el propio Montgó de los vientos del segundo y tercer cuadrante.

Es también el destino con mejor relación entre precio y calidad de la costa mediterránea peninsular: la misma lancha que en Ibiza cuesta 780 € aquí sale por poco más de 500 € con todo incluido.`,
    contenidoEn: `In Dénia you sail from the Marina de Dénia, the marina next to the fishing harbour and a short walk from the town centre. It is one of the easiest departure points in the Marina Alta: the boat is handed over on the pontoon itself, where you collect the key and get the safety briefing before you leave. If this is your first hire, this is an easy place to start.

In August, as all along this coast, the harbour car park fills up by mid-morning. Arrive before nine and you will almost always find a space; if not, there is parking a few minutes' walk away, which is no hardship in Dénia because the marina sits right next to the old town.

Twenty minutes from the harbour mouth is the main reason to hire a boat here: the Cova Tallada, about three miles out, at the foot of the Cap de Sant Antoni. It is a cave cut by Muslim stonemasons into the rock of the headland, with an inner lake you swim into from the water. It lies inside a marine reserve with its own rules, so check with the club what is allowed before setting course.

Forty minutes or so on, already in Xàbia's waters, you reach Cala Granadella and Els Arcs, the most photographed spot on this coast: clear water, pines tumbling to the sea and a light that changes with the hour. It is a stretch you can only guess at from land and see whole from the water.

With an hour to spare you round the Cap de la Nau, the headland that closes the stretch to the south. There the coast changes character: cliffs, rock arches and coves reachable only from the sea, the part no road shows you. It is the best way to understand why this shoreline stands apart from the rest of the province.

In summer the afternoon breeze arrives from mid-afternoon, around three or four o'clock, and on some days the levante (easterly) builds a swell as the day goes on. The routine that works on this coast is to leave early, do the long leg in the morning and come back mid-afternoon with the wind behind you: you sail more comfortably and reach the harbour just as the water starts to move.

Do you need a licence? It depends on the boat: the smaller craft can be skippered with no licence at all after the safety briefing, and for the rest you can hire with a skipper, who holds the licence. The requirements are set by the regulations and reviewed from time to time; each boat's listing shows at any moment whether one is required.

It is also one of the best value-for-money destinations on the mainland Mediterranean coast: the same boat that costs €780 on the most expensive Mediterranean islands goes for just over €500 here, everything included.`,
    contenidoDe: `In Dénia starten Sie von der Marina de Dénia, dem Yachthafen neben dem Fischereihafen und nur wenige Schritte vom Zentrum entfernt. Es ist einer der bequemsten Startpunkte der Marina Alta: Das Boot wird direkt am Steg übergeben, wo Sie den Schlüssel erhalten und vor dem Auslaufen die Sicherheitseinweisung bekommen. Wenn Sie zum ersten Mal ein Boot mieten, ist dies ein einfacher Einstieg.

Im August füllt sich der Parkplatz am Hafen, wie überall an der Küste, bis zum Vormittag. Kommen Sie vor neun Uhr, finden Sie fast immer einen Platz; wenn nicht, gibt es Parkmöglichkeiten ein paar Gehminuten entfernt – in Dénia kein Problem, denn die Marina liegt direkt am Ortskern.

Zwanzig Minuten von der Hafeneinfahrt entfernt liegt der Hauptgrund, hier ein Boot zu mieten: die Cova Tallada, rund drei Seemeilen entfernt, am Fuß des Cap de Sant Antoni. Es ist eine Höhle, die maurische Steinmetze in den Fels des Kaps gehauen haben, mit einem Binnensee, den man vom Wasser aus schwimmend erreicht. Sie liegt in einem Meeresschutzgebiet mit eigenen Regeln – klären Sie also vor dem Ablegen im Club, was erlaubt ist.

Nach etwa vierzig Minuten erreichen Sie, schon in den Gewässern von Xàbia, die Cala Granadella und Els Arcs, das meistfotografierte Ziel dieser Küste: klares Wasser, Pinien, die ins Meer fallen, und ein Licht, das sich mit der Stunde verändert. Vom Land aus ist dieser Abschnitt nur zu erahnen, vom Wasser aus sieht man ihn ganz.

Mit einer Stunde Zeit umrunden Sie das Cap de la Nau, das Kap, das den Abschnitt nach Süden abschließt. Dort ändert die Küste ihren Charakter: Klippen, Felsbögen und Buchten, die nur vom Wasser aus erreichbar sind – der Teil, den keine Straße zeigt. So versteht man am besten, warum sich dieser Küstenstreifen vom Rest der Provinz abhebt.

Im Sommer setzt die Nachmittagsbrise ab dem frühen Nachmittag ein, gegen drei oder vier Uhr, und an manchen Tagen baut der Levante (Ostwind) im Lauf des Tages Dünung auf. Die Taktik, die an dieser Küste funktioniert: früh ablegen, die lange Etappe am Vormittag fahren und am Nachmittag mit dem Wind im Rücken zurückkehren. Man fährt bequemer und erreicht den Hafen, wenn das Wasser anfängt, sich zu bewegen.

Brauchen Sie einen Führerschein? Das hängt vom Boot ab: Die kleineren Boote dürfen Sie nach der Sicherheitseinweisung ganz ohne Führerschein fahren, für alle anderen gibt es die Option, mit Skipper zu mieten, der den Schein mitbringt. Die Anforderungen legt die Verordnung fest und werden regelmäßig überprüft; im Eintrag jedes Boots steht jederzeit, ob einer nötig ist.

Preislich ist Dénia außerdem eines der besten Preis-Leistungs-Ziele an der mediterranen Festlandküste: Dasselbe Boot, das auf den teuersten Inseln des Mittelmeers 780 € kostet, gibt es hier für gut 500 € – alles inklusive.`,
    sinLicencia: `La pregunta que trae aquí a casi todo el mundo es si se puede alquilar un barco en Dénia sin tener ninguna titulación. La respuesta corta es que sí, pero por dos caminos distintos, y conviene saber cuál es el tuyo antes de reservar.

El primero es alquilar una embarcación pequeña, de las que la normativa permite gobernar sin título. Son barcos de poca eslora y potencia limitada, con un radio de navegación corto y solo de día. En el pantalán te dan una explicación de seguridad antes de salir: cómo arrancar, cómo fondear, hasta dónde puedes llegar y qué hacer si el motor se para. Con eso te vas solo, sin patrón a bordo.

El segundo, y el que elige la mayoría, es alquilar con patrón. Entonces la titulación la pone él y tú no necesitas nada: decides adónde ir, y de gobernar el barco se encarga otro. Sale más caro por día, pero si vais seis o más el reparto por persona cambia poco, y te quita el problema entero.

Desde Dénia, sin título y con un barco pequeño, se llega de sobra a Les Rotes y a la costa del Montgó. La Cova Tallada queda a unas tres millas por la cara norte del Cap de Sant Antoni: es zona de reserva marina, con sus reglas propias, y conviene preguntar en el pantalán qué está permitido ese día antes de poner rumbo. Con patrón el radio se abre y ya entran la Granadella y el tramo de Xàbia.

Los requisitos de titulación los fija la normativa y se revisan cada cierto tiempo. En la ficha de cada barco viene si exige título o no, y esa ficha es la que manda: la actualizamos cuando cambia la norma.`,
    sinLicenciaEn: `The question that brings almost everyone here is whether you can hire a boat in Dénia without holding any boating qualification at all. The short answer is yes, but by two different routes, and it is worth knowing which one is yours before you book.

The first is to hire a small boat of the kind the regulations allow you to handle without a licence. These are boats of limited length and horsepower, with a short cruising radius and daylight hours only. At the pontoon you are given a safety briefing before you leave: how to start the engine, how to anchor, how far you may go and what to do if the engine stops. With that you set off on your own, with no skipper on board. From the Marina de Dénia this is enough to reach Les Rotes and the coast of the Montgó in comfort, and further north the beaches of Les Marines and Els Molins offer calm sandy anchorages that are ideal for a family day afloat.

The second route, and the one most people choose, is to hire with a skipper. He provides the licence, so you need nothing: you decide where to go and someone else handles the boat. It costs more per day, but if there are six or more of you the difference per person is small, and it removes the whole problem.

From Dénia without a licence, the Cova Tallada lies about three miles away on the north face of the Cap de Sant Antoni. The cave was carved out of the rock by Muslim stonemasons and has an interior lake that you swim into. It sits inside a marine reserve with rules of its own, so it is worth asking at the pontoon what is permitted that day before setting course. With a skipper the radius opens up and the Granadella and the whole Xàbia stretch come within reach. Navigation is easy for most of the year: the Montgó massif shelters the Dénia–Xàbia run from winds out of the second and third quadrants, the levante (easterly) can build a swell in the afternoon, and in winter there are mistral days to be felt.

Licensing requirements are set by the regulations and reviewed from time to time. On each boat's listing you will see whether a licence is required or not, and that listing is what counts: we update it whenever the rules change. As a guide, rigid-hull inflatables of up to 15 hp can be handled without any qualification after the safety briefing, while more powerful motorboats and sailing boats need at least the navigation licence («titulín») or the PER (Recreational Craft Skipper). And the price is worth knowing about too: a day boat for six people comes to about €510 everything included in mid season — estimated fuel, cleaning, mooring, port fees and VAT — and the same boat that costs €780 in Ibiza comes out at just over €500 here.`,
    sinLicenciaDe: `Die Frage, die fast alle hierher führt, ist, ob man in Dénia ein Boot mieten kann, ohne irgendeine Qualifikation zu besitzen. Die kurze Antwort lautet: ja, aber auf zwei verschiedenen Wegen – und es lohnt sich zu wissen, welcher davon Ihr Weg ist, bevor Sie buchen.

Der erste Weg ist, ein kleines Boot zu mieten, wie es die Vorschriften erlauben, ohne Führerschein zu führen. Es sind Boote mit geringer Länge und begrenzter Motorleistung, mit kurzem Fahrradius und nur bei Tageslicht. Am Steg erhalten Sie vor der Ausfahrt eine Sicherheitseinweisung: wie man startet, wie man ankert, wie weit Sie fahren dürfen und was zu tun ist, wenn der Motor ausgeht. Damit fahren Sie allein hinaus, ohne Skipper an Bord. Von der Marina de Dénia aus reicht das locker, um Les Rotes und die Küste des Montgó zu erreichen; weiter nördlich bieten die Strände von Les Marines und Els Molins ruhige Sandankerplätze, ideal für einen Familientag auf dem Wasser.

Der zweite Weg, und der, den die meisten wählen, ist das Mieten mit Skipper. Er bringt den Führerschein mit, Sie brauchen also gar nichts: Sie entscheiden, wohin es geht, und das Boot führt jemand anderes. Das kostet pro Tag mehr, aber wenn Sie zu sechst oder mehr sind, fällt der Unterschied pro Person kaum ins Gewicht – und das ganze Problem ist vom Tisch.

Von Dénia aus erreicht man ohne Führerschein die Cova Tallada in etwa drei Seemeilen auf der Nordseite des Cap de Sant Antoni. Die Höhle wurde von muslimischen Steinmetzen in den Fels gehauen und besitzt einen inneren See, in den man hineinschwimmt. Sie liegt in einem Meeresschutzgebiet mit eigenen Regeln; fragen Sie also am Steg, was an diesem Tag erlaubt ist, bevor Sie Kurs setzen. Mit Skipper öffnet sich der Radius, und die Granadella sowie der gesamte Abschnitt von Xàbia rücken in Reichweite. Die Navigation ist fast das ganze Jahr über einfach: Der Montgó schützt die Strecke Dénia–Xàbia vor Winden aus dem zweiten und dritten Quadranten, der Levante (Ostwind) kann nachmittags Dünung aufbauen, und im Winter gibt es Mistral-Tage, die man zu spüren bekommt.

Die Führerscheinanforderungen legt die Norm fest, und sie werden von Zeit zu Zeit überprüft. In der Karte jedes Boots steht, ob ein Führerschein nötig ist oder nicht, und diese Karte ist maßgeblich: Wir aktualisieren sie, sobald sich die Regelung ändert. Als Orientierung: Schlauchboote mit bis zu 15 PS darf man nach der Sicherheitseinweisung ohne jede Qualifikation führen, während stärkere Motorboote und Segelboote mindestens die Licencia de Navegación („Titulín“) oder den PER (Patrón de Embarcaciones de Recreo) verlangen. Und auch der Preis ist wissenswert: Ein Tagesboot für sechs Personen kostet in der Zwischensaison etwa 510 € alles inklusive – geschätzter Treibstoff, Reinigung, Liegeplatz, Hafengebühren und MwSt. –, und dasselbe Boot, das in Ibiza 780 € kostet, gibt es hier für knapp über 500 €.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Puedo alquilar un barco en Dénia sin ninguna titulación?",
        respuesta:
          "Sí, por dos vías: una embarcación pequeña de las que se pueden gobernar sin título, tras la explicación de seguridad en el pantalán, o cualquier barco con patrón a bordo, que es quien pone la titulación. En la ficha de cada barco indicamos cuál es su caso.",
      },
      {
        pregunta: "¿Hasta dónde puedo llegar sin licencia desde Dénia?",
        respuesta:
          "Con un barco sin titulación, a Les Rotes y la costa del Montgó, siempre de día y sin alejarte. La Cova Tallada está a unas tres millas por el Cap de Sant Antoni, en reserva marina y con reglas propias: pregunta en el pantalán antes de ir. Con patrón el radio se abre hasta Xàbia y la Granadella.",
      },
      {
        pregunta: "¿Cuánto cuesta alquilar con patrón en Dénia?",
        respuesta:
          "El patrón se suma al precio del día y viene desglosado antes de pagar, nunca como sorpresa en el muelle. Repartido entre seis u ocho personas la diferencia por cabeza es pequeña, y te ahorra el único requisito que no puedes saltarte.",
      },
    ],
    latitud: 38.8409,
    longitud: 0.1057,
    mesesAlta: "7,8",
    destacado: true,
    orden: 5,
    puertos: [
      { slug: "marina-denia", nombre: "Marina de Dénia", latitud: 38.8442, longitud: 0.1132 },
    ],
    preguntas: [
      {
        pregunta: "¿Se puede llegar a la Cova Tallada en barco de alquiler?",
        respuesta:
          "Sí. Está a unas 3 millas del puerto de Dénia, en la cara norte del Cap de Sant Antoni. Se fondea fuera de la cueva, sobre fondo de roca y arena, y se entra nadando o en kayak. Es zona de reserva marina: no se puede pescar ni recoger nada.",
        preguntaEn: "Can you get to the Cova Tallada on a hire boat?",
        respuestaEn:
          "Yes. It is about 3 miles from Dénia harbour, on the north side of Cap de Sant Antoni. You reach it by sea and go in swimming or by kayak. It is a marine reserve: fishing and collecting anything are not allowed.",
        preguntaDe: "Kann man mit einem Mietboot zur Cova Tallada gelangen?",
        respuestaDe:
          "Ja. Sie liegt rund 3 Seemeilen vom Hafen von Dénia entfernt, an der Nordseite des Cap de Sant Antoni. Sie erreichen sie über das Meer und gelangen schwimmend oder mit dem Kajak hinein. Es ist ein Meeresschutzgebiet: Es darf weder geangelt noch etwas entnommen werden.",
      },
      {
        pregunta: "¿Necesito licencia para alquilar en Dénia?",
        respuesta:
          "Depende del barco. Hay embarcaciones pequeñas, de eslora y potencia limitadas, que se gobiernan sin ningún título tras una explicación de seguridad en el pantalán; para las demás hace falta al menos licencia de navegación o PER. Los límites los fija la normativa y se revisan, así que la que manda es la ficha de cada barco: ahí dice si exige titulación.",
        preguntaEn: "Do I need a licence to hire a boat in Dénia?",
        respuestaEn:
          "It depends on the boat. There are small craft, of limited length (LOA) and horsepower, that you can handle without any qualification after a safety briefing at the pontoon; for the rest you need at least the navigation licence («titulín») or the Recreational Craft Skipper (PER). The limits are set by the regulations and are revised, so the final word belongs to each boat's page: it states there whether a qualification is required.",
        preguntaDe: "Brauche ich einen Führerschein, um in Dénia ein Boot zu mieten?",
        respuestaDe:
          "Das hängt vom Boot ab. Es gibt kleine Boote mit begrenzter Länge und begrenzter PS-Zahl, die man nach einer Sicherheitseinweisung am Steg ohne jeden Führerschein führen darf; für alle anderen braucht man mindestens die Licencia de Navegación („Titulín“) oder den PER (Patrón de Embarcaciones de Recreo). Die Grenzen legt die Norm fest, und sie werden überarbeitet — maßgeblich ist daher die Seite des jeweiligen Bootes: Dort steht, ob ein Führerschein erforderlich ist.",
      },
      {
        pregunta: "¿Cuánto cuesta alquilar una lancha en Dénia?",
        respuesta:
          "Una lancha de día para seis personas sale por unos 510 € con todo incluido en temporada media: combustible estimado, limpieza, amarre, tasas e IVA. La tarifa base que anuncia la competencia para el mismo barco ronda los 260 €.",
        preguntaEn: "How much does it cost to hire a motorboat in Dénia?",
        respuestaEn:
          "A day boat for six people comes to around €510, everything included, in mid season: estimated fuel, cleaning, mooring, port fees and VAT. The base rate the competition advertises for the same boat is around €260.",
        preguntaDe: "Was kostet es, in Dénia ein Motorboot zu mieten?",
        respuestaDe:
          "Ein Tagesboot für sechs Personen kostet in der Zwischensaison rund 510 €, alles inklusive: geschätzter Treibstoff, Reinigung, Liegeplatz, Hafengebühren und MwSt. Der Grundpreis, den die Konkurrenz für dasselbe Boot ausweist, liegt bei etwa 260 €.",
      },
    ],
  },
  {
    slug: "alicante",
    nombre: "Alicante",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "ciudad",
    titular: "Alquiler de barcos en Alicante",
    descripcion:
      "La isla de Tabarca, la Cala Cantalars y el Postiguet. Reserva marina y aguas tranquilas a un paso del centro.",
    descripcionEn:
      "The island of Tabarca, Cala Cantalars and the Postiguet. A marine reserve and calm water a step from the city centre.",
    descripcionDe:
      "Die Insel Tabarca, die Cala Cantalars und der Postiguet. Meeresschutzgebiet und ruhiges Wasser direkt neben dem Zentrum.",
    contenido: `Alicante ofrece la combinación que buscan casi todos los que alquilan por primera vez: mar tranquila, distancias cortas y un destino claro al que poner rumbo. Ese destino es Tabarca, la única isla habitada de la Comunitat Valenciana y la primera reserva marina que se declaró en España, en 1986.

Son unas 11 millas desde el puerto de Alicante, o apenas 4 desde Santa Pola. El fondeo se hace en la cara norte, sobre arena, y el agua es tan clara que se ve el ancla a ocho metros. Dentro de la reserva integral no se puede pescar ni fondear: hay que respetar el balizamiento, que está bien señalizado.

Más cerca, la costa entre el Cap de l'Horta y la Serra Gelada esconde calas de grava como Cantalars, La Palmera o Cala Llosa, accesibles solo por mar y con muy poca gente incluso en agosto. Al norte, el Peñón de Ifach de Calp marca el final del tramo.

El clima permite navegar prácticamente todo el año. En invierno hay muchos días de calma total con 18 grados, y la temporada baja deja precios de la mitad que en agosto.`,
    contenidoEn: `In Alicante you set out from the Marina Deportiva de Alicante, right next to the city centre and the Postiguet beach. The boat is handed over on its pontoon, where you collect the key and get the safety briefing before you leave. It is the city departure par excellence, with the advantage that the marina is a step from the old town and the beach.

In August the harbour car park fills up by mid-morning. Arrive early or leave the car a few minutes' walk away: the marina is right in the centre, so walking down to the pontoon is part of the plan, not a chore.

Twenty minutes from the harbour mouth, rounding the Cabo de las Huertas, the coast breaks into small coves such as Cala Cantalars, La Palmera and los Judíos, which can only be reached by sea. They are the nearest swim that feels like an island, and in August they draw far fewer people than any beach in the city.

Around forty minutes on, following the coast between the Cap de l'Horta and the Serra Gelada, wider coves appear such as Cala Llosa, with the same clear water and even less traffic. It is the stretch the city never sees: cliffs and pines falling to the sea.

The long trip is Tabarca, the only inhabited island in the Valencia region and the first marine reserve declared in Spain, in 1986. It is about 11 miles from the marina, around an hour at cruising speed. Its water is among the clearest on the coast; inside the no-take zone fishing and anchoring are forbidden, the marker buoys are clearly signposted, and it is worth checking with the club what is allowed before you leave, because conditions change.

In summer the afternoon breeze arrives from mid-afternoon, around three or four o'clock. The routine that works in Alicante is to leave early, do the crossing or the long leg in the morning and come back mid-afternoon with the wind behind you. In winter, by contrast, there are long spells of flat calm with sunshine and around 18 degrees: that is when this coast sails in total calm.

As for licences: a small boat can be skippered with no licence at all after the safety briefing, which takes you to the Postiguet, San Juan beach from the water and the Cabo de las Huertas. For Tabarca, an open crossing, the usual answer is to hire with a skipper, who holds the licence. The requirements are set by the regulations and reviewed from time to time; each boat's listing shows at any moment whether one is required.`,
    contenidoDe: `In Alicante starten Sie von der Marina Deportiva de Alicante, direkt neben dem Zentrum und dem Postiguet-Strand. Das Boot wird am Steg übergeben, wo Sie den Schlüssel erhalten und vor dem Auslaufen die Sicherheitseinweisung bekommen. Es ist der Stadtstart schlechthin, mit dem Vorteil, dass die Marina nur einen Schritt von der Altstadt und vom Strand entfernt liegt.

Im August füllt sich der Parkplatz am Hafen bis zum Vormittag. Kommen Sie früh oder parken Sie ein paar Gehminuten entfernt: Die Marina liegt mitten im Zentrum, der Fußweg zum Steg gehört also zum Plan und ist keine Umständlichkeit.

Zwanzig Minuten von der Hafeneinfahrt entfernt, am Cabo de las Huertas vorbei, bricht sich die Küste in kleine Buchten wie Cala Cantalars, La Palmera und los Judíos, die nur vom Wasser aus erreichbar sind. Sie sind das nächste Bad mit Inselgefühl und haben im August noch immer deutlich weniger Menschen als jeder Strand der Stadt.

Nach etwa vierzig Minuten, entlang der Küste zwischen dem Cap de l'Horta und der Serra Gelada, öffnen sich größere Buchten wie die Cala Llosa, mit demselben klaren Wasser und noch weniger Betrieb. Das ist der Abschnitt, den die Stadt nicht sieht: Klippen und Pinien, die ins Meer fallen.

Die lange Fahrt führt nach Tabarca, der einzigen bewohnten Insel der Region Valencia und dem ersten Meeresschutzgebiet Spaniens, ausgewiesen 1986. Von der Marina sind es rund 11 Seemeilen, etwa eine Stunde bei Reisegeschwindigkeit. Das Wasser gehört zu den klarsten der Küste; in der Kernzone ist Fischen und Ankern verboten, die Betonnung ist gut markiert, und vor dem Ablegen sollten Sie im Club klären, was erlaubt ist, denn die Bedingungen ändern sich.

Im Sommer setzt die Nachmittagsbrise ab dem frühen Nachmittag ein, gegen drei oder vier Uhr. Die Taktik, die in Alicante funktioniert: früh ablegen, die Überfahrt oder die lange Etappe am Vormittag fahren und am Nachmittag mit dem Wind im Rücken zurückkehren. Im Winter dagegen gibt es lange Phasen völliger Windstille mit Sonne und rund 18 Grad – dann fährt man diese Küste in vollkommener Ruhe.

Zum Führerschein: Ein kleines Boot dürfen Sie nach der Sicherheitseinweisung ganz ohne Führerschein fahren, damit erreichen Sie den Postiguet, den Strand San Juan vom Wasser aus und das Cabo de las Huertas. Für Tabarca, eine offene Überfahrt, ist die übliche Lösung, mit Skipper zu mieten, der den Schein mitbringt. Die Anforderungen legt die Verordnung fest und werden überprüft; im Eintrag jedes Boots steht jederzeit, ob einer nötig ist.`,
    sinLicencia: `En Alicante casi todo el que pregunta por alquilar sin licencia acaba preguntando lo mismo: si se puede ir a Tabarca. La respuesta depende de cómo alquiles.

Sin ninguna titulación puedes llevar una embarcación pequeña, de potencia limitada y solo de día, tras la explicación de seguridad en el pantalán. Con eso te mueves por la costa cercana a la Marina Deportiva: el Postiguet, la playa de San Juan desde el agua y, sobre todo, el Cabo de las Huertas, que a un cuarto de hora largo tiene el mejor tramo de fondeo del entorno. La Cala Cantalars, la Palmera y los Judíos son calas pequeñas de roca con agua transparente y fondo claro, y en agosto siguen teniendo bastante menos gente que cualquier playa.

Tabarca es otra cosa. Son unas 11 millas desde el puerto de Alicante, travesía abierta, y para eso hace falta patrón: él pone la titulación y el barco puede ser mayor. Si el plan es solo Tabarca, merece la pena saber que desde Santa Pola son unas 4 millas, bastante menos travesía por el mismo destino.

Y una advertencia que conviene leer antes de ir: Tabarca es reserva marina, la primera que se declaró en España. Hay zonas donde no se puede fondear ni pescar, y el balizamiento hay que respetarlo. No es una cala cualquiera. Antes de salir, confirma qué está permitido ese día: las condiciones se revisan y cambian.

En la ficha de cada barco indicamos si exige titulación. Los requisitos los fija la normativa y se revisan periódicamente.`,
    sinLicenciaEn: `In Alicante, almost everyone who asks about hiring a boat without a licence ends up asking the same thing: whether you can get to Tabarca. The answer depends on how you hire, and it is worth understanding both options properly before you book, because they give you very different days out.

With no boating qualification at all, you can take out a small boat, with limited horsepower and daytime use only, after the safety briefing at the pontoon. With that you can move around the coast close to the Marina Deportiva de Alicante, which sits a step from the city centre and the Postiguet beach: the Postiguet, San Juan beach seen from the water and, above all, Cabo de las Huertas, which a good quarter of an hour out has the best stretch of anchorage in the area. The coves of Cala Cantalars, La Palmera and Los Judíos are small rocky coves with crystal-clear water, reachable only by sea, and even in August they are far less crowded than any beach.

Tabarca is a different matter. It is the only inhabited island in the Valencia region and the first marine reserve ever declared in Spain, in 1986. It lies about 11 miles from Alicante harbour, an open crossing, and for that you need a skipper: he provides the licence and the boat can be larger, which changes the whole feel of the day. If your plan is Tabarca alone, it is worth knowing that from Santa Pola it is only about 4 miles, far less open water for the same destination.

And one warning worth reading before you go: Tabarca is a marine reserve, and inside the no-take zone you may not fish or anchor. The marker buoys are clearly laid out and must be respected. It is not just any cove. Before you set off, confirm at the pontoon what is permitted that day: the conditions are reviewed and change.

As for when to go, the Alicante coast can be sailed practically all year round. From May to October the water sits between 20 and 27 degrees; in winter there are long spells of calm days, with sunshine and 18 degrees, and prices fall to half of what they are in August. It is the combination almost everyone hiring for the first time is looking for: calm sea, short distances and a clear destination to set course for.

On each boat's listing we state whether a licence is required. The requirements are set by the regulations and reviewed periodically, so the listing is what counts and we update it whenever the rules change.`,
    sinLicenciaDe: `In Alicante stellt fast jeder, der nach einem Boot ohne Führerschein fragt, am Ende dieselbe Frage: ob man nach Tabarca fahren kann. Die Antwort hängt davon ab, wie Sie mieten, und es lohnt sich, beide Möglichkeiten zu verstehen, bevor Sie buchen, denn sie führen zu sehr unterschiedlichen Tagen auf dem Wasser.

Ohne jede Befähigung können Sie ein kleines Boot führen, mit begrenzter PS-Zahl und nur bei Tag, nach der Sicherheitseinweisung am Steg. Damit bewegen Sie sich entlang der Küste nahe der Marina Deportiva de Alicante, die nur einen Schritt vom Zentrum und vom Postiguet-Strand entfernt liegt: der Postiguet, der Strand von San Juan vom Wasser aus und vor allem das Cabo de las Huertas, das nach gut einer Viertelstunde den besten Ankerplatzabschnitt der Umgebung bietet. Die Buchten Cala Cantalars, La Palmera und Los Judíos sind kleine Felsbuchten mit klarem Wasser, nur vom Meer aus erreichbar, und selbst im August ist dort deutlich weniger los als an jedem Strand.

Tabarca ist etwas anderes. Es ist die einzige bewohnte Insel der Region Valencia und das erste Meeresschutzgebiet, das in Spanien ausgewiesen wurde, 1986. Vom Hafen von Alicante sind es rund 11 Seemeilen, eine offene Überfahrt, und dafür brauchen Sie einen Skipper: Er bringt die Befähigung mit, und das Boot darf größer sein, was dem Tag ein ganz anderes Gefühl gibt. Wenn Ihr Plan nur Tabarca ist, lohnt es sich zu wissen, dass es von Santa Pola aus nur rund 4 Seemeilen sind, deutlich weniger offene Strecke für dasselbe Ziel.

Und eine Warnung, die Sie vor der Abfahrt lesen sollten: Tabarca ist ein Meeresschutzgebiet, und in der Kernzone darf weder gefischt noch geankert werden. Die Betonnung ist gut markiert und muss respektiert werden. Es ist keine gewöhnliche Bucht. Bestätigen Sie vor dem Auslaufen, was an diesem Tag erlaubt ist, zum Beispiel am Steg: Die Bedingungen werden überprüft und ändern sich.

Was die beste Zeit betrifft: Die Küste von Alicante lässt sich praktisch das ganze Jahr über befahren. Von Mai bis Oktober hat das Wasser zwischen 20 und 27 Grad; im Winter gibt es lange Phasen mit völliger Windstille, Sonne und 18 Grad, und die Preise fallen auf die Hälfte der Augustpreise. Es ist die Kombination, die fast alle suchen, die zum ersten Mal mieten: ruhige See, kurze Distanzen und ein klares Ziel, auf das man Kurs nimmt.

Auf der Karte jedes Bootes steht, ob ein Führerschein erforderlich ist. Die Anforderungen legt die Verordnung fest und werden regelmäßig überprüft, sodass die Karte maßgeblich ist und wir sie aktualisieren, sobald sich die Regeln ändern.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Puedo ir a Tabarca sin licencia desde Alicante?",
        respuesta:
          "Con patrón sí: son unas 11 millas y la titulación la pone él. Sin ningún título no, porque es travesía abierta y queda fuera del radio de esas embarcaciones. Si el plan es solo Tabarca, desde Santa Pola son unas 4 millas.",
      },
      {
        pregunta: "¿Adónde llego en Alicante sin ningún título?",
        respuesta:
          "Al Postiguet, la playa de San Juan desde el agua y el Cabo de las Huertas, a un cuarto de hora largo. Ahí están la Cala Cantalars, la Palmera y los Judíos, que son el mejor fondeo del entorno y en agosto tienen menos gente que las playas.",
      },
      {
        pregunta: "¿Se puede fondear en Tabarca?",
        respuesta:
          "Es reserva marina, la primera declarada en España, y hay zonas donde no se puede fondear ni pescar. El balizamiento está señalizado y hay que respetarlo. Confirma antes de salir qué está permitido ese día, porque las condiciones se revisan.",
      },
    ],
    latitud: 38.3452,
    longitud: -0.481,
    mesesAlta: "7,8",
    destacado: false,
    orden: 7,
    puertos: [
      { slug: "marina-alicante", nombre: "Marina Deportiva de Alicante", latitud: 38.3376, longitud: -0.4838 },
    ],
    preguntas: [
      {
        pregunta: "¿Se puede ir a Tabarca en barco de alquiler?",
        respuesta:
          "Sí. Son 11 millas desde Alicante y 4 desde Santa Pola. El fondeo se hace en la cara norte sobre fondo de arena, fuera de la reserva integral. Dentro de la reserva marina está prohibido pescar, fondear y recoger cualquier especie.",
        preguntaEn: "Can you go to Tabarca on a hire boat?",
        respuestaEn:
          "Yes. It is 11 miles from Alicante and 4 from Santa Pola. Inside the marine reserve, fishing, anchoring and collecting any species are prohibited.",
        preguntaDe: "Kann man mit einem Mietboot nach Tabarca fahren?",
        respuestaDe:
          "Ja. Von Alicante sind es 11 Seemeilen, von Santa Pola 4. Im Meeresschutzgebiet sind Angeln, Ankern und das Entnehmen jeglicher Arten verboten.",
      },
      {
        pregunta: "¿Cuál es la mejor época para navegar en Alicante?",
        respuesta:
          "De mayo a octubre, con el agua entre 20 y 27 grados. Pero la costa alicantina permite salir todo el año: en invierno hay rachas largas de días en calma con sol y 18 grados, y los precios caen a la mitad.",
        preguntaEn: "What is the best time of year to go sailing in Alicante?",
        respuestaEn:
          "From May to October, with water between 20 and 27 degrees. But the Alicante coast lets you go out all year round: in winter there are long stretches of calm, sunny days at 18 degrees, and prices drop by half.",
        preguntaDe: "Wann ist die beste Zeit zum Segeln in Alicante?",
        respuestaDe:
          "Von Mai bis Oktober, bei Wassertemperaturen zwischen 20 und 27 Grad. Die Küste von Alicante erlaubt es aber, das ganze Jahr über auszulaufen: Im Winter gibt es lange Phasen mit windstillen, sonnigen Tagen bei 18 Grad, und die Preise fallen um die Hälfte.",
      },
    ],
  },
  {
    slug: "javea",
    nombre: "Jávea",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "costa",
    titular: "Alquiler de barcos en Jávea",
    descripcion:
      "La Granadella, el Portitxol y Els Arcs. El tramo de costa con más calas por milla de toda la Comunitat Valenciana, entre dos cabos.",
    descripcionEn:
      "La Granadella, the Portitxol and Els Arcs. More coves per mile than anywhere else in the Valencia region, wedged between two capes.",
    descripcionDe:
      "La Granadella, der Portitxol und Els Arcs. Mehr Buchten pro Seemeile als sonst irgendwo in der Region Valencia, eingebettet zwischen zwei Kaps.",
    contenido: `Jávea se navega desde el puerto del Aduanas del Mar, donde está el Club Náutico de Jávea. Es una salida cómoda: el aparcamiento del puerto se llena a media mañana en agosto, pero la zona azul de la explanada suele tener sitio a primera hora, y a las nueve todavía se aparca sin dar vueltas.

Lo que hace especial a Jávea es que está encajada entre dos cabos, el Cap de Sant Antoni al norte y el Cap de la Nau al sur, y eso te da dos mares distintos el mismo día. Cuando entra levante y el sur pica, el abrigo está pasado el Cap de Sant Antoni; cuando aprieta el llebeig de la tarde, la cara norte del Cap de la Nau aguanta mejor. Saber esto es la diferencia entre volver pronto y aprovechar el día entero.

Las salidas cortas son el Portitxol y la Isla del Descubridor, a unos veinte minutos rumbo sur, con fondo de arena y agua muy clara. La Cala Barraca queda justo al lado. Un poco más allá aparecen Els Arcs, los arcos de roca junto a la Cala Sardinera, que es el sitio más fotografiado de la costa y donde conviene llegar antes de las once si quieres la foto sin nadie delante. La Granadella está a unos treinta y cinco minutos doblando el Cap de la Nau: es la cala grande de grava, con chiringuito, y en julio y agosto se llena de barcos fondeados desde media mañana.

El llebeig entra casi todas las tardes a partir de las dos o las tres. No es peligroso, pero levanta un picado incómodo para comer fondeado, así que el orden que funciona es salir pronto, comer fondeado antes de las dos y volver por la costa con el viento de popa.`,
    contenidoEn: `In Jávea you set out from the port of Aduanas del Mar, where the Club Náutico de Jávea is based. It is an easy departure: the harbour car park fills up by mid-morning in August, but the pay-and-display bays on the esplanade usually still have space early on, and at nine o'clock you can park without circling.

What makes Jávea special is that it sits wedged between two capes, the Cap de Sant Antoni to the north and the Cap de la Nau to the south, which gives you two different seas on the same day. The Cap de la Nau separates those two worlds: the state of the water can change from one side to the other within the same morning, which is precisely the main reason to go with a skipper if you want to stretch the trip as far as La Granadella. Because the coast changes character on each side of the cape, it is worth checking the day's forecast before deciding your route.

The short trips are the Portitxol and the Isla del Descubridor, about twenty minutes south, in very clear water. Cala Barraca is right next door. A little further on come Els Arcs, the rock arches beside Cala Sardinera, the most photographed spot on this stretch of coast, where it is worth arriving before eleven if you want the photo with nobody in front. La Granadella is about thirty-five minutes away around the Cap de la Nau: it is the big gravel cove with a beach bar, and in July and August it fills with anchored boats from mid-morning.

The llebeig comes in almost every afternoon from two or three o'clock. It is not dangerous, but it stirs up an uncomfortable chop for eating at anchor, so the routine that works is to leave early, eat at anchor before two and come back along the coast with the wind astern.`,
    contenidoDe: `Von Jávea aus legen Sie im Hafen Aduanas del Mar ab, wo sich der Club Náutico de Jávea befindet. Es ist ein bequemer Start: Der Parkplatz am Hafen füllt sich im August bis zum späten Vormittag, aber auf der Esplanade haben die Parkplätze der Blauen Zone früh am Morgen meist noch Platz, und um neun Uhr parken Sie noch, ohne herumfahren zu müssen.

Was Jávea besonders macht, ist die Lage zwischen zwei Kaps, dem Cap de Sant Antoni im Norden und dem Cap de la Nau im Süden, sodass Sie am selben Tag zwei verschiedene Meere erleben. Das Cap de la Nau trennt diese beiden Welten: Der Zustand des Wassers kann sich innerhalb desselben Vormittags von einer Seite zur anderen ändern, und genau das ist der Hauptgrund, mit Skipper zu fahren, wenn Sie den Ausflug bis zur Granadella ausdehnen möchten. Da die Küste auf jeder Seite des Kaps ihren Charakter ändert, lohnt es sich, vor der Entscheidung über die Route den Wetterbericht des Tages zu prüfen.

Die kurzen Ausfahrten führen zum Portitxol und zur Isla del Descubridor, etwa zwanzig Minuten südlich, in sehr klarem Wasser. Die Cala Barraca liegt direkt daneben. Etwas weiter erscheinen Els Arcs, die Felsbögen neben der Cala Sardinera, der meistfotografierte Ort dieses Küstenabschnitts, an dem es sich lohnt, vor elf Uhr anzukommen, wenn Sie das Foto ohne jemanden davor haben möchten. Die Granadella liegt etwa fünfunddreißig Minuten entfernt, um das Cap de la Nau herum: die große Kiesbucht mit Strandbar, die sich im Juli und August ab dem späten Vormittag mit vor Anker liegenden Booten füllt.

Der Llebeig setzt fast jeden Nachmittag ab zwei oder drei Uhr ein. Er ist nicht gefährlich, aber er macht das Essen vor Anker durch eine unangenehme Kabbelsee ungemütlich. Deshalb funktioniert die Reihenfolge: früh auslaufen, vor zwei Uhr vor Anker essen und mit dem Wind von achtern entlang der Küste zurückkehren.`,
    sinLicencia: `Sí se puede alquilar en Jávea sin titulación, y como en el resto de la costa hay dos caminos: llevar tú una embarcación pequeña de las que la normativa permite sin título, o alquilar cualquier barco con patrón, que es quien pone la titulación.

Si te vas solo, el radio es corto y de día. Desde el puerto del Aduanas del Mar eso da para el Portitxol y la Isla del Descubridor, a unos veinte minutos rumbo sur, con fondo de arena y agua muy clara. La Cala Barraca queda al lado. Es más que suficiente para un día de baño, y son de las mejores calas del tramo.

Con patrón se abre lo demás: Els Arcs junto a la Cala Sardinera, y sobre todo la Granadella, a unos treinta y cinco minutos doblando el Cap de la Nau. Ese cabo es la razón principal para ir con alguien que sepa: separa dos mares distintos y el estado del agua puede cambiar de un lado al otro en la misma mañana.

Hay un detalle de Jávea que conviene tener en cuenta salgas como salgas. El llebeig entra casi todas las tardes a partir de las dos o las tres y levanta un picado incómodo. Sin patrón a bordo eso se nota mucho más, así que sal temprano, come fondeado antes de las dos y vuelve con el viento de popa. No es peligroso, pero es la diferencia entre un buen día y volver antes de tiempo.

En la ficha de cada barco indicamos si exige título. Los requisitos los fija la normativa y se revisan cada cierto tiempo: la ficha es la que manda y la actualizamos cuando cambian.`,
    sinLicenciaEn: `Yes, you can hire in Jávea without a licence, and as on the rest of the coast there are two routes: you handle a small boat of the kind the regulations allow without a licence, or you hire any boat with a skipper, who provides the licence.

If you go on your own, the radius is short and daylight hours only. From the port of Aduanas del Mar, where the Club Náutico de Jávea is based, that gets you to the Portitxol and the Isla del Descubridor in about twenty minutes heading south, with a sandy bottom and very clear water. Cala Barraca is right next door. That is more than enough for a day of swimming, and they are among the best coves on this stretch of coast.

With a skipper the rest opens up: Els Arcs, the rock arches next to Cala Sardinera and the most photographed spot on this coast — worth arriving before eleven if you want the photo without anyone in front of you — and above all the Granadella, about thirty-five minutes away rounding the Cap de la Nau. It is the big gravel cove with a beach bar, and in July and August it fills with anchored boats from mid-morning. That cape is the main reason to go with someone who knows what they are doing: it separates two different seas, and the state of the water can change from one side to the other in the same morning.

There is a Jávea detail worth keeping in mind whatever you do. The llebeig (south-westerly) comes in almost every afternoon from two or three o'clock and kicks up an uncomfortable chop. Without a skipper on board you notice that a lot more, so leave early, have lunch at anchor before two and come back with the wind astern. It is not dangerous, but it is the difference between a good day and getting back ahead of time. The same logic applies on land: the harbour car park fills by mid-morning in August, so come before nine, when you still park without circling round; otherwise the blue zone of the esplanade at Aduanas del Mar usually has a space, a five-minute walk away.

On each boat's listing we indicate whether it requires a licence. The requirements are set by the regulations and reviewed from time to time: the listing is what counts, and we update it when they change.`,
    sinLicenciaDe: `Ja, in Jávea kann man ohne Führerschein mieten, und wie an der übrigen Küste gibt es zwei Wege: Sie führen selbst ein kleines Boot, wie es die Vorschriften ohne Führerschein erlauben, oder Sie mieten ein beliebiges Boot mit Skipper, der den Führerschein mitbringt.

Wenn Sie allein fahren, ist der Radius kurz und nur Tageslicht. Vom Hafen Aduanas del Mar, wo der Club Náutico de Jávea liegt, erreichen Sie damit in etwa zwanzig Minuten den Portitxol und die Isla del Descubridor, Kurs Süd, mit sandigem Grund und sehr klarem Wasser. Die Cala Barraca liegt direkt daneben. Das reicht allemal für einen Badetag, und es sind einige der besten Buchten dieses Küstenabschnitts.

Mit Skipper öffnet sich der Rest: Els Arcs, die Felsbögen neben der Cala Sardinera und der meistfotografierte Ort dieser Küste – es lohnt sich, vor elf Uhr zu kommen, wenn man das Foto ohne Menschen davor möchte – und vor allem die Granadella, etwa fünfunddreißig Minuten entfernt, wenn man das Cap de la Nau umrundet. Sie ist die große Kiesbucht mit Strandbar und füllt sich im Juli und August ab dem späten Vormittag mit geankerten Booten. Dieses Kap ist der Hauptgrund, mit jemandem zu fahren, der sich auskennt: Es trennt zwei verschiedene Meere, und der Zustand des Wassers kann von einer Seite zur anderen wechseln – noch am selben Vormittag.

Ein Detail von Jávea sollten Sie bedenken, egal wie Sie fahren. Der Llebeig (Südwestwind) kommt fast jeden Nachmittag ab zwei oder drei Uhr auf und macht eine unangenehme Kabbelsee. Ohne Skipper an Bord merkt man das deutlich stärker. Fahren Sie also früh los, essen Sie vor zwei Uhr vor Anker zu Mittag und kehren Sie mit dem Wind von achtern zurück. Es ist nicht gefährlich, aber es ist der Unterschied zwischen einem guten Tag und vorzeitiger Rückkehr. Dasselbe gilt an Land: Der Parkplatz des Hafens füllt sich im August bis zum späten Vormittag; kommen Sie also vor neun Uhr, wenn man noch ohne Runden zu drehen parkt. Sonst findet sich auf der Esplanade von Aduanas del Mar oder in den Straßen dahinter meist ein Platz in fünf Gehminuten.

In der Karte jedes Boots geben wir an, ob ein Führerschein erforderlich ist. Die Anforderungen legt die Norm fest und werden von Zeit zu Zeit überprüft: Maßgeblich ist die Karte, und wir aktualisieren sie, sobald sich etwas ändert.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Llego a la Granadella sin licencia desde Jávea?",
        respuesta:
          "Con patrón sí, en unos treinta y cinco minutos doblando el Cap de la Nau. Con una embarcación de las que se llevan sin título, no: queda fuera del radio permitido, y además el cabo cambia el estado del mar de un lado al otro.",
      },
      {
        pregunta: "¿Adónde puedo ir en Jávea sin ningún título?",
        respuesta:
          "Al Portitxol, la Isla del Descubridor y la Cala Barraca, a unos veinte minutos rumbo sur, siempre de día. Son fondeos de arena con agua muy clara y dan de sobra para una jornada de baño.",
      },
      {
        pregunta: "¿A qué hora conviene salir en Jávea?",
        respuesta:
          "Temprano. El llebeig entra casi todas las tardes sobre las dos o las tres y levanta picado, que sin patrón a bordo se nota bastante más. Lo que funciona es salir pronto, comer fondeado antes de las dos y volver con el viento de popa.",
      },
    ],
    latitud: 38.7891,
    longitud: 0.1663,
    mesesAlta: "7,8",
    destacado: true,
    orden: 6,
    puertos: [
      { slug: "xabia", nombre: "Club Náutico de Jávea", latitud: 38.7929, longitud: 0.1836 },
    ],
    preguntas: [
      {
        pregunta: "¿Cuánto se tarda de Jávea a la Cala Granadella en barco?",
        respuesta:
          "Unos treinta y cinco minutos a velocidad de crucero en una lancha normal, doblando el Cap de la Nau. En verano conviene salir antes de las diez: a partir de media mañana hay muchos barcos fondeados y cuesta encontrar sitio con fondo de arena.",
        preguntaEn: "How long does it take from Jávea to Cala Granadella by boat?",
        respuestaEn:
          "About thirty-five minutes at cruising speed in a standard motorboat, rounding the Cap de la Nau. In summer it is worth leaving before ten: from mid-morning there are many boats at anchor.",
        preguntaDe: "Wie lange dauert es mit dem Boot von Jávea zur Cala Granadella?",
        respuestaDe:
          "Etwa fünfunddreißig Minuten bei Reisegeschwindigkeit mit einem normalen Motorboot, um das Cap de la Nau herum. Im Sommer lohnt es sich, vor zehn Uhr auszulaufen: Ab spätem Vormittag liegen viele Boote vor Anker.",
      },
      {
        pregunta: "¿Necesito titulación para alquilar en Jávea?",
        respuesta:
          "Depende del barco. Hay embarcaciones pequeñas que se gobiernan sin título tras una explicación de seguridad en el pantalán, y para el resto hace falta licencia de navegación o PER. Si no tienes ninguna, la opción es alquilar con patrón: él pone la titulación y tú decides la cala.",
        preguntaEn: "Do I need a boating qualification to hire a boat in Jávea?",
        respuestaEn:
          "It depends on the boat. There are small boats that can be handled without a licence after a safety briefing on the pontoon; for the rest you need the navigation licence or the PER. If you have neither, the option is to hire with a skipper: he provides the licence and you choose the cove.",
        preguntaDe: "Brauche ich einen Führerschein, um in Jávea ein Boot zu mieten?",
        respuestaDe:
          "Das hängt vom Boot ab. Es gibt kleine Boote, die man nach einer Sicherheitseinweisung am Steg ohne Führerschein führen darf; für den Rest benötigt man die Licencia de Navegación oder den PER. Wenn Sie keinen besitzen, ist die Option, mit Skipper zu mieten: Er bringt den Führerschein mit, und Sie entscheiden, welche Bucht Sie ansteuern.",
      },
      {
        pregunta: "¿Dónde se aparca en el puerto de Jávea en agosto?",
        respuesta:
          "El aparcamiento del puerto se llena a media mañana. Yendo antes de las nueve casi siempre hay sitio, y si no, la explanada del Aduanas del Mar y las calles de detrás suelen tener hueco a cinco minutos andando.",
        preguntaEn: "Where do you park at Jávea harbour in August?",
        respuestaEn:
          "The harbour car park fills up by mid-morning. Going before nine almost always gets you a space; if not, the esplanade at Aduanas del Mar and the streets behind it usually have a spot within a five-minute walk.",
        preguntaDe: "Wo parkt man im August am Hafen von Jávea?",
        respuestaDe:
          "Der Parkplatz des Hafens füllt sich bis zum späten Vormittag. Wenn man vor neun Uhr hinfährt, findet man fast immer einen Platz; wenn nicht, gibt es auf der Esplanade von Aduanas del Mar und in den Straßen dahinter meist einen freien Parkplatz in fünf Gehminuten Entfernung.",
      },
    ],
  },
  {
    slug: "moraira",
    nombre: "Moraira",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "costa",
    titular: "Alquiler de barcos en Moraira",
    descripcion:
      "El Portet a diez minutos y la Cala Moraig a veinte. El puerto más abrigado de la Marina Alta y el mejor para salir por primera vez.",
    descripcionEn:
      "El Portet ten minutes out and Cala Moraig at twenty. The most sheltered harbour in the Marina Alta and the best place for a first day afloat.",
    descripcionDe:
      "El Portet nach zehn Minuten, die Cala Moraig nach zwanzig. Der geschützteste Hafen der Marina Alta und der beste Ort für den ersten Tag auf dem Wasser.",
    contenido: `Moraira es el puerto que recomendamos a quien sale por primera vez. El Club Náutico Moraira es pequeño, la bocana es fácil y la costa de alrededor tiene calas a muy poca distancia, así que no hay que hacer una travesía larga para que el día merezca la pena.

La salida más corta es El Portet, una ensenada de arena a menos de diez minutos de la bocana, protegida por el Cap d'Or. Con casi cualquier viento del norte o del este ahí se está bien, y es el fondeo de referencia para bañarse con niños. Doblando el Cap d'Or aparecen la Cala Andragó y, algo más al norte, el tramo de Benitatxell con la Cala Moraig y els Testos, que es probablemente la pared de acantilado más espectacular de la provincia. La Cova dels Arcs queda justo al lado de la Moraig y se entra nadando desde el barco.

Hacia el sur, la Cala Llebeig y la costa de Benissa dan fondeos de roca y agua muy transparente, con menos gente que el tramo de Jávea porque no hay acceso cómodo por tierra.

La mayoría de estos fondeos son de roca y grava, y en algunos tramos hay pradera de posidonia. Sobre posidonia no se fondea: además de estar sancionado, el ancla no agarra bien y luego te llevas el susto. Busca las manchas claras de arena, que se distinguen a simple vista con esta agua.`,
    contenidoEn: `Moraira is sailed from the Club Náutico Moraira, a small harbour with an easy entrance, next to the promenade and the centre of the village. The boat is handed over on its pontoon, where you collect the key and get the safety briefing before you leave. It is the departure we recommend for a first time: everything is close by and the day fills itself without straying far from the harbour.

In August the car park by the harbour fills up by mid-morning, and Moraira is small: arrive early or leave the car a few minutes' walk away, because the stroll down to the club is easily done on foot.

Less than ten minutes from the harbour mouth lies El Portet, the inlet at the foot of the Cap d'Or and the nearest swim to the harbour. Twenty minutes on, heading north past the headland, you reach the Benitatxell stretch with Cala Moraig, els Testos and, right next to Moraig, the Cova dels Arcs, which you enter swimming from the boat: it is the cliff wall you remember longest from the whole province.

Around forty minutes on, continuing north, you reach Cala Granadella, already in Xàbia's waters: the big cove ringed by pines, the most famous on that stretch and one of the most repeated images of this coastline. From Moraira it sits at a perfect distance for a morning run.

In the other direction, the Benissa coast is a quarter of an hour away: Cala Llebeig and the stretch towards Calpe draw far fewer people because the land access is awkward. And with an hour to spare you reach the bay of Altea, with the Mascarat and the coves at the foot of the Serra Gelada: the white village with its blue dome closing the bay.

In summer the afternoon breeze arrives from mid-afternoon, around three or four o'clock, as all along the Marina Alta. The routine that works is to leave early, do the long leg in the morning and come back mid-afternoon with the wind behind you. That way you sail comfortably and make the most of the whole day.

Do you need a licence? The smaller craft can be skippered with no licence at all after the safety briefing on the pontoon, and that is plenty for El Portet and the nearby coast. To stretch the day north or south, the usual answer is to hire with a skipper, who holds the licence. Each boat's listing shows whether one is required; the requirements are set by the regulations and reviewed.`,
    contenidoDe: `In Moraira starten Sie vom Club Náutico Moraira, einem kleinen Hafen mit einfacher Einfahrt, direkt an der Promenade und am Ortszentrum. Das Boot wird am Steg übergeben, wo Sie den Schlüssel erhalten und vor dem Auslaufen die Sicherheitseinweisung bekommen. Es ist der Start, den wir für das erste Mal empfehlen: Alles liegt nahe beieinander, und der Tag füllt sich, ohne sich weit vom Hafen zu entfernen.

Im August füllt sich der Parkplatz am Hafen bis zum Vormittag, und Moraira ist klein: Kommen Sie früh oder parken Sie ein paar Gehminuten entfernt, denn der Weg zum Club lässt sich gut zu Fuß gehen.

Weniger als zehn Minuten von der Hafeneinfahrt entfernt liegt El Portet, die Bucht am Fuß des Cap d'Or, das nächste Bad am Hafen. Nach zwanzig Minuten, Richtung Norden am Kap vorbei, erreichen Sie den Abschnitt von Benitatxell mit der Cala Moraig, els Testos und, direkt neben der Moraig, der Cova dels Arcs, die man vom Boot aus schwimmend erreicht: Es ist die Klippenwand, die man aus der ganzen Provinz am längsten in Erinnerung behält.

Nach etwa vierzig Minuten, weiter nach Norden, erreichen Sie die Cala Granadella, schon in den Gewässern von Xàbia: die große, von Pinien umgebene Bucht, die berühmteste dieses Abschnitts und eines der meistfotografierten Bilder dieser Küste. Von Moraira aus liegt sie in perfekter Distanz für einen Vormittagstörn.

In die andere Richtung ist die Küste von Benissa eine Viertelstunde entfernt: Die Cala Llebeig und der Abschnitt Richtung Calpe haben deutlich weniger Besucher, weil der Zugang vom Land beschwerlich ist. Und mit einer Stunde Zeit erreichen Sie die Bucht von Altea mit dem Mascarat und den Buchten am Fuß der Serra Gelada – das weiße Dorf mit der blauen Kuppel, das die Bucht abschließt.

Im Sommer setzt die Nachmittagsbrise ab dem frühen Nachmittag ein, gegen drei oder vier Uhr, wie überall in der Marina Alta. Die Taktik, die funktioniert: früh ablegen, die lange Etappe am Vormittag fahren und am Nachmittag mit dem Wind im Rücken zurückkehren. So fährt man bequem und nutzt den ganzen Tag.

Brauchen Sie einen Führerschein? Die kleineren Boote dürfen Sie nach der Sicherheitseinweisung am Steg ganz ohne Führerschein fahren, und damit kommen Sie für El Portet und die nahe Küste locker aus. Um den Tag nach Norden oder Süden auszudehnen, ist die übliche Lösung, mit Skipper zu mieten, der den Schein mitbringt. Im Eintrag jedes Boots steht, ob einer nötig ist; die Anforderungen legt die Verordnung fest und werden überprüft.`,
    sinLicencia: `De toda la Marina Alta, Moraira es probablemente el mejor sitio para alquilar por primera vez sin tener titulación. La bocana del Club Náutico Moraira es sencilla, el puerto es pequeño y no hay que hacer ninguna travesía larga para que el día valga la pena.

Sin ningún título puedes llevar una embarcación pequeña, de potencia limitada y solo de día, después de la explicación de seguridad en el pantalán. Con eso llegas a El Portet en menos de diez minutos: es una ensenada de arena protegida por el Cap d'Or, y con casi cualquier viento del norte o del este ahí se está bien. Es el fondeo de referencia para bañarse con niños y para un primer día sin agobios.

Con patrón el día se estira hacia el norte: la Cala Andragó, y sobre todo el tramo de Benitatxell con la Cala Moraig y els Testos, que es la pared de acantilado más impresionante de la provincia. La Cova dels Arcs queda pegada a la Moraig y se entra nadando desde el barco. Hacia el sur, la Cala Llebeig y la costa de Benissa dan fondeos de roca con mucha menos gente, porque el acceso por tierra es incómodo.

Una advertencia que vale para todos estos fondeos: buena parte del fondo es de roca y grava, y hay tramos de pradera de posidonia. Sobre posidonia no se fondea. Además de estar sancionado, el ancla no agarra bien y el susto te lo llevas tú. Busca las manchas claras de arena, que con esta agua se distinguen a simple vista desde el barco.

En la ficha de cada barco indicamos si exige titulación o no.`,
    sinLicenciaEn: `Of the whole Marina Alta, Moraira is probably the best place to hire a boat for the first time without a licence, and one of the best on the coast. The harbour entrance at the Club Náutico Moraira is straightforward, the port is small and you never have to make a long crossing for the day to be worth it: the coast around it has coves at very short distance, so you head out, enjoy yourself and come back without stress. It is the harbour we recommend to anyone heading out for the first time.

With no qualification at all you can take a small boat, with limited horsepower and daytime use only, after the safety briefing at the pontoon. With that you reach El Portet in under ten minutes: a sandy cove at the foot of Cap d'Or, and the reference anchorage for swimming with children and for a first day without worries. It is the shortest trip from the harbour and the one we recommend to start with, because the day is worth it without having to go far.

With a skipper the day stretches northwards: Cala Andragó and, above all, the Benitatxell stretch with Cala Moraig and els Testos, which is probably the most spectacular cliff wall in the province, about twenty minutes past Cap d'Or. The Cova dels Arcs sits right next to Moraig and you swim in from the boat. To the south, Cala Llebeig and the Benissa coast are far less crowded, quieter than the Jávea stretch, because there is no convenient access by land: if you are looking for peace and quiet, that is the heading that gives you most of it.

For larger boats you need a boating qualification or a skipper, and each listing states which case applies, so there is no doubt about what you need before you book.

One thing worth knowing about this coast: much of it is covered with seagrass meadows of Posidonia oceanica, the protected marine plant that keeps the water so clear. Before you set off, ask at the pontoon what you should bear in mind that day; they will explain without any problem.

In August, the high season, the coves of the Benissa coast and Cala Llebeig remain a quiet option, precisely because the land access is awkward. On each boat's listing we state whether a licence is required or not.`,
    sinLicenciaDe: `Von der gesamten Marina Alta ist Moraira wahrscheinlich der beste Ort, um zum ersten Mal ohne Führerschein ein Boot zu mieten, und einer der besten an der Küste. Die Hafeneinfahrt des Club Náutico Moraira ist einfach, der Hafen ist klein, und Sie müssen keine lange Überfahrt machen, damit sich der Tag lohnt: Die Küste rundherum hat Buchten in sehr kurzer Entfernung, sodass Sie auslaufen, genießen und ohne Stress zurückkehren. Es ist der Hafen, den wir jedem empfehlen, der zum ersten Mal ausläuft.

Ohne jede Befähigung können Sie ein kleines Boot führen, mit begrenzter PS-Zahl und nur bei Tag, nach der Sicherheitseinweisung am Steg. Damit erreichen Sie El Portet in weniger als zehn Minuten: eine Sandbucht am Fuß des Cap d'Or und der Ankerplatz der Wahl zum Baden mit Kindern und für einen ersten Tag ohne Sorgen. Es ist der kürzeste Törn vom Hafen und der, mit dem wir zum Einstieg empfehlen, denn der Tag lohnt sich, ohne dass Sie weit fahren müssen.

Mit Skipper dehnt sich der Tag nach Norden aus: die Cala Andragó und vor allem der Abschnitt von Benitatxell mit der Cala Moraig und els Testos, die wohl beeindruckendste Felswand der Provinz, etwa zwanzig Minuten nach dem Cap d'Or. Die Cova dels Arcs liegt direkt neben der Moraig, und man schwimmt vom Boot aus hinein. Nach Süden sind die Cala Llebeig und die Küste von Benissa deutlich weniger besucht, ruhiger als der Abschnitt von Jávea, weil es keinen bequemen Zugang vom Land gibt: Wenn Sie Ruhe suchen, ist das der Kurs, der Ihnen am meisten davon gibt.

Für größere Boote brauchen Sie eine Befähigung oder einen Skipper, und auf jeder Karte steht, welcher Fall gilt, sodass vor der Buchung klar ist, was Sie benötigen.

Eine Sache, die man über diese Küste wissen sollte: Ein großer Teil ist mit Posidonia-Seegraswiesen bedeckt, der geschützten Meerespflanze, die das Wasser so klar hält. Fragen Sie vor dem Auslaufen am Steg, worauf Sie an diesem Tag achten sollten; man erklärt es Ihnen ohne Weiteres.

Im August, der Hauptsaison, bleiben die Buchten der Küste von Benissa und die Cala Llebeig eine ruhige Option, gerade weil der Zugang vom Land unbequem ist. Auf der Karte jedes Bootes steht, ob ein Führerschein erforderlich ist oder nicht.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Es Moraira buen sitio para alquilar sin licencia por primera vez?",
        respuesta:
          "De los mejores. La bocana es fácil, el puerto es pequeño y El Portet está a menos de diez minutos, así que no hay que hacer travesía para que el día valga la pena. Es justo lo que quita el agobio de la primera vez.",
      },
      {
        pregunta: "¿Puedo llegar a la Cala Moraig sin título?",
        respuesta:
          "Con patrón sí, en unos veinte minutos pasado el Cap d'Or. Sin titulación conviene quedarse en El Portet y la costa cercana: el radio de esas embarcaciones es corto y el tramo de Benitatxell es acantilado abierto.",
      },
      {
        pregunta: "¿Dónde puedo fondear y dónde no en Moraira?",
        respuesta:
          "Sobre arena, buscando las manchas claras que se ven desde el barco. Nunca sobre pradera de posidonia: está sancionado y además el ancla no agarra bien. Buena parte del fondo aquí es roca y grava, así que merece la pena mirar antes de largar.",
      },
    ],
    latitud: 38.6874,
    longitud: 0.1428,
    mesesAlta: "7,8",
    destacado: false,
    orden: 8,
    puertos: [
      { slug: "moraira", nombre: "Club Náutico Moraira", latitud: 38.6853, longitud: 0.1447 },
    ],
    preguntas: [
      {
        pregunta: "¿Es Moraira un buen sitio para alquilar barco por primera vez?",
        respuesta:
          "Es de los mejores de la costa. La bocana es sencilla, el puerto es pequeño y a diez minutos ya tienes El Portet para fondear. No hace falta hacer una travesía larga para que el día valga la pena, que es justo lo que agobia la primera vez.",
        preguntaEn: "Is Moraira a good place to hire a boat for the first time?",
        respuestaEn:
          "It is one of the best on the coast. The harbour mouth is easy, the harbour is small and ten minutes out you already have El Portet to anchor in. You do not need a long crossing for the day to be worthwhile, which is exactly what makes the first time daunting.",
        preguntaDe: "Ist Moraira ein guter Ort, um zum ersten Mal ein Boot zu mieten?",
        respuestaDe:
          "Es ist einer der besten an der Küste. Die Hafeneinfahrt ist einfach, der Hafen ist klein, und nach zehn Minuten haben Sie mit El Portet bereits einen Ankerplatz. Man braucht keine lange Überfahrt, damit sich der Tag lohnt – genau das, was beim ersten Mal abschreckt.",
      },
      {
        pregunta: "¿Se puede llegar a la Cala Moraig desde Moraira?",
        respuesta:
          "Sí, en unos veinte minutos rumbo norte pasado el Cap d'Or. Es acantilado, con fondo de roca y grava, y al lado está la Cova dels Arcs, a la que se entra nadando desde el barco. Fondea sobre arena, nunca sobre pradera de posidonia.",
        preguntaEn: "Can you get to Cala Moraig from Moraira?",
        respuestaEn:
          "Yes, in about twenty minutes heading north past the Cap d'Or. It is a cliff, and right next to it is the Cova dels Arcs, which you enter by swimming from the boat.",
        preguntaDe: "Kann man von Moraira zur Cala Moraig gelangen?",
        respuestaDe:
          "Ja, in etwa zwanzig Minuten Richtung Norden am Cap d'Or vorbei. Es ist eine Steilküste, und direkt daneben liegt die Cova dels Arcs, die man schwimmend vom Boot aus betritt.",
      },
      {
        pregunta: "¿Qué barcos se pueden alquilar sin licencia en Moraira?",
        respuesta:
          "Las embarcaciones de menor eslora y potencia, que se pueden gobernar tras una explicación de seguridad en el pantalán. Para todo lo demás hace falta titulación, o alquilar con patrón. En la ficha de cada barco viene indicado si requiere título.",
        preguntaEn: "Which boats can you hire without a licence in Moraira?",
        respuestaEn:
          "The boats with the shortest length and lowest power, which can be handled after a safety briefing on the pontoon. For everything else you need a boating qualification, or you hire with a skipper. Each boat's listing states whether it requires a licence.",
        preguntaDe: "Welche Boote kann man in Moraira ohne Führerschein mieten?",
        respuestaDe:
          "Die Boote mit der geringsten Länge und Leistung, die man nach einer Sicherheitseinweisung am Steg führen darf. Für alles andere braucht man einen Führerschein oder mietet mit Skipper. In der Beschreibung jedes Bootes ist angegeben, ob ein Führerschein erforderlich ist.",
      },
    ],
  },
  {
    slug: "calpe",
    nombre: "Calpe",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "costa",
    titular: "Alquiler de barcos en Calpe",
    descripcion:
      "El Peñón de Ifach visto desde el agua, que es como hay que verlo. Salidas desde el puerto, Puerto Blanco y Les Bassetes.",
    descripcionEn:
      "The Peñón de Ifach seen from the water, which is how it should be seen. Departures from the harbour, Puerto Blanco and Les Bassetes.",
    descripcionDe:
      "Der Peñón de Ifach vom Wasser aus gesehen, so wie er gesehen werden sollte. Start ab Hafen, Puerto Blanco oder Les Bassetes.",
    contenido: `De Calpe se sale por tres sitios: el puerto pesquero y deportivo donde está el Real Club Náutico de Calpe, y algo más al sur Puerto Blanco y Les Bassetes, que son marinas pequeñas y con menos cola en agosto.

El motivo para alquilar aquí es el Peñón de Ifach. Desde tierra lo has visto mil veces; desde el mar es otra cosa, porque se ve la pared entera cayendo al agua y el color cambia según la hora. La cara sur, sobre la Cala del Racó, es la que mejor se aprecia a primera hora de la mañana con el sol de frente. El Ifach es Parque Natural y tiene su propio régimen de protección: antes de acercarte o de fondear, comprueba qué está permitido en ese momento, porque cambia.

Al norte del peñón quedan los Baños de la Reina y la Cala Manzanera, fondeos tranquilos de arena y roca a diez minutos. Siguiendo hacia el norte se llega al Mascarat, con esos acantilados rojizos entre Calpe y Altea, y a la Cala del Racó de Corbeta. Hacia el sur, la costa lleva a la Sierra Helada y a la Isla de Benidorm, que está a poco más de media hora si el día acompaña.

El viento aquí lo marca el propio peñón: crea su propia sombra y sus racheados. Con levante fuerte la zona norte del peñón se hace incómoda y conviene pasarse al sur, y al revés con poniente. Es una costa fácil, pero conviene mirar el parte antes de salir y no fiarse de que en el puerto haya calma.`,
    contenidoEn: `From Calpe you can set out from three places: the fishing and sports harbour where the Real Club Náutico de Calpe is based, and a little further south Puerto Blanco and Les Bassetes, small marinas with shorter queues in August.

The reason to hire a boat here is the Peñón de Ifach. You have seen it a thousand times from land; from the sea it is another thing, because you see the whole wall falling into the water and the colour changes with the hour. The south face, above the Cala del Racó, is best appreciated early in the morning with the sun in front. The Ifach is a natural park with its own protection regime: before approaching or anchoring, check what is allowed at that moment, because it changes.

North of the rock are the Baños de la Reina and the Cala Manzanera, peaceful anchorages ten minutes away. Heading further north you reach the Mascarat, with its reddish cliffs between Calpe and Altea, and the Cala del Racó de Corbeta. To the south, the coast leads to the Sierra Helada and the island of Benidorm, just over half an hour away if the day plays along.

The wind here is set by the rock itself, which creates its own shadow and its own gusts. It is an easy coast, but it is worth checking the forecast before leaving and not trusting that the harbour will be calm. For a first trip, Les Bassetes and Puerto Blanco take the worry out of it: they are small marinas, the departure manoeuvre is simpler and there is no queue in August. And the price you see on the listing includes estimated fuel, cleaning, mooring and port fees: no extra charges at the pontoon.`,
    contenidoDe: `In Calpe legen Sie von drei Stellen aus ab: dem Fischerei- und Sporthafen, in dem sich der Real Club Náutico de Calpe befindet, und etwas weiter südlich Puerto Blanco und Les Bassetes, zwei kleine Marinas mit weniger Wartezeit im August.

Der Grund, hier ein Boot zu mieten, ist der Peñón de Ifach. Vom Land aus haben Sie ihn tausendmal gesehen; vom Meer aus ist er etwas anderes, denn Sie sehen die ganze Wand ins Wasser fallen, und die Farbe wechselt mit der Tageszeit. Die Südseite über der Cala del Racó kommt am frühen Morgen mit der Sonne von vorn am besten zur Geltung. Der Ifach ist Naturpark und hat sein eigenes Schutzregime: Bevor Sie sich nähern oder ankern, prüfen Sie, was in diesem Moment erlaubt ist, denn das ändert sich.

Nördlich des Felsens liegen die Baños de la Reina und die Cala Manzanera, ruhige Ankerplätze in zehn Minuten Entfernung. Weiter nach Norden erreichen Sie den Mascarat mit seinen rötlichen Klippen zwischen Calpe und Altea sowie die Cala del Racó de Corbeta. Nach Süden führt die Küste zur Sierra Helada und zur Insel Benidorm, die etwas mehr als eine halbe Stunde entfernt liegt, wenn der Tag mitspielt.

Den Wind hier bestimmt der Felsen selbst, der seinen eigenen Schatten und seine eigenen Böen erzeugt. Es ist eine einfache Küste, aber es lohnt sich, vor dem Auslaufen den Wetterbericht zu prüfen und sich nicht darauf zu verlassen, dass im Hafen Flaute herrscht. Wer zum ersten Mal ausfährt, nimmt mit Les Bassetes oder Puerto Blanco den Druck raus: Es sind kleine Marinas, die Ausfahrt ist einfacher, und im August gibt es keine Schlange. Und der Preis, den Sie in der Bootsanzeige sehen, umfasst geschätzten Treibstoff, Reinigung, Liegeplatz und Hafengebühren: Am Steg kommen keine zusätzlichen Kosten dazu.`,
    sinLicencia: `En Calpe la mayoría de quien pregunta por alquilar sin licencia quiere lo mismo: ver el Peñón de Ifach desde el agua. Se puede, y hay dos maneras según lo que tengas.

Sin ninguna titulación puedes llevar una embarcación pequeña, de potencia limitada, de día y sin alejarte de la costa. Antes de salir te explican en el pantalán lo básico: gobierno, fondeo, límites de la zona y qué hacer si algo falla. Con eso te basta para moverte por la bahía, acercarte a la Cala del Racó y a los Baños de la Reina, y tener el peñón de frente casi todo el rato.

La otra opción es ir con patrón. La titulación la pone él, el barco puede ser más grande y el día se estira: el Mascarat hacia el norte, la Sierra Helada hacia el sur, y con tiempo bueno la Isla de Benidorm a poco más de media hora.

Un aviso que conviene leer antes de reservar: el Peñón de Ifach es Parque Natural y tiene su propio régimen de protección, con limitaciones de aproximación y de fondeo que pueden cambiar según la temporada. No es una roca cualquiera a la que arrimarse. Antes de salir, confirma en el club qué está permitido ese día; te lo dirán sin problema y te ahorras un disgusto.

Si es tu primera vez, sale mejor salir de Les Bassetes o de Puerto Blanco que del puerto grande: son marinas pequeñas, la maniobra de salida es más sencilla y en agosto no se hace cola. Desde las tres tienes el peñón a la vista en cuanto cruzas la bocana, así que no pierdes nada por elegir la más cómoda.

Los requisitos de titulación están regulados y se revisan cada cierto tiempo. Lo que manda es la ficha de cada barco, donde indicamos si exige título.`,
    sinLicenciaEn: `In Calpe, most people who ask about hiring without a licence want the same thing: to see the Peñón de Ifach from the water. You can, and there are two ways depending on what you have.

With no qualification at all you can handle a small boat, of limited horsepower, in daylight and without straying far from the coast. Before you leave they explain the basics at the pontoon: steering, anchoring, the limits of the area and what to do if something goes wrong. That is enough to move around the bay, get close to the Cala del Racó and the Baños de la Reina, and have the rock ahead of you for most of the outing. From the water it is another thing altogether: you see the whole wall falling into the sea, and the colour changes with the hour — the south face, over the Cala del Racó, is best appreciated early in the morning with the sun ahead of you.

The other option is to go with a skipper. He provides the licence, the boat can be bigger and the day stretches out: the Mascarat with its reddish cliffs between Calpe and Altea to the north, the Sierra Helada to the south and, with good weather, the island of Benidorm a little over half an hour away.

A note worth reading before you book: the Peñón de Ifach is a natural park with its own protection regime, including restrictions on approach and anchoring that can change with the season. It is not just any rock to sidle up to. Before you leave, confirm at the club what is permitted that day; they will tell you without a fuss and you save yourself a nasty surprise. The rock itself creates its own wind shadow and gusts, so check the forecast before setting out and do not trust the calm in the harbour.

If it is your first time, it works better to leave from Les Bassetes or Puerto Blanco than from the big harbour: they are small marinas, the departure manoeuvre is simpler and in August there is no queue. You have the Peñón in sight as soon as you cross the harbour mouth, so you lose nothing by choosing the most comfortable option. And on price, what you see on the listing includes estimated fuel, cleaning, mooring and port fees — there are no new charges at the pontoon, and if the boat carries a skipper that is shown in the price before you book.

Licensing requirements are regulated and reviewed from time to time. What counts is each boat's listing, where we indicate whether a licence is required.`,
    sinLicenciaDe: `In Calpe wollen die meisten, die nach einem Boot ohne Führerschein fragen, dasselbe: den Peñón de Ifach vom Wasser aus sehen. Das geht, und es gibt zwei Wege, je nachdem, was Sie mitbringen.

Ohne jede Qualifikation dürfen Sie ein kleines Boot mit begrenzter Motorleistung führen, nur bei Tageslicht und ohne sich weit von der Küste zu entfernen. Vor der Ausfahrt erklärt man Ihnen am Steg das Nötigste: Steuerung, Ankern, die Grenzen des Gebiets und was zu tun ist, wenn etwas schiefgeht. Damit können Sie sich in der Bucht bewegen, zur Cala del Racó und zu den Baños de la Reina fahren und haben den Felsen fast die ganze Zeit vor Augen. Vom Wasser aus ist er eine andere Sache: Man sieht die gesamte Wand ins Meer fallen, und die Farbe wechselt mit der Tageszeit – die Südseite über der Cala del Racó wirkt am frühen Morgen am besten, wenn die Sonne von vorn scheint.

Die andere Möglichkeit ist, mit Skipper zu fahren. Er bringt den Führerschein mit, das Boot darf größer sein, und der Tag dehnt sich aus: der Mascarat mit seinen rötlichen Klippen zwischen Calpe und Altea im Norden, die Sierra Helada im Süden und bei gutem Wetter die Insel Benidorm etwas mehr als eine halbe Stunde entfernt.

Ein Hinweis, den man vor der Buchung lesen sollte: Der Peñón de Ifach ist ein Naturpark mit eigenem Schutzregime, einschließlich Einschränkungen bei Annäherung und Ankern, die sich mit der Saison ändern können. Es ist kein gewöhnlicher Felsen, an den man sich heranmacht. Bestätigen Sie vor der Ausfahrt im Club, was an diesem Tag erlaubt ist; man sagt es Ihnen ohne Umschweife, und Sie ersparen sich eine böse Überraschung. Der Felsen selbst erzeugt seinen eigenen Windschatten und Böen: Schauen Sie sich also vor der Ausfahrt den Wetterbericht an und verlassen Sie sich nicht auf die Ruhe im Hafen.

Wenn es Ihr erstes Mal ist, fahren Sie besser von Les Bassetes oder Puerto Blanco aus als vom großen Hafen: Es sind kleine Marinas, das Auslaufmanöver ist einfacher, und im August gibt es keine Warteschlange. Sobald Sie die Hafeneinfahrt passieren, haben Sie den Peñón vor Augen – Sie verlieren also nichts, wenn Sie die bequemste Variante wählen. Und zum Preis: Was Sie in der Karte sehen, enthält geschätzten Treibstoff, Reinigung, Liegeplatz und Hafengebühren – am Steg kommen keine neuen Kosten hinzu, und wenn das Boot einen Skipper mitführt, ist das vor der Buchung im Preis ausgewiesen.

Die Führerscheinanforderungen sind geregelt und werden von Zeit zu Zeit überprüft. Maßgeblich ist die Karte jedes Boots, in der wir angeben, ob ein Führerschein erforderlich ist.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Puedo ver el Peñón de Ifach desde el mar sin licencia?",
        respuesta:
          "Sí. Con una embarcación pequeña de las que se gobiernan sin titulación tienes el peñón de frente prácticamente toda la salida. Eso sí: es Parque Natural, con limitaciones de aproximación y fondeo que cambian por temporada, así que confirma en el club qué está permitido ese día.",
      },
      {
        pregunta: "¿Qué puedo llevar en Calpe sin ningún título?",
        respuesta:
          "Embarcaciones de poca eslora y potencia limitada, de día y sin alejarte de la costa, tras una explicación de seguridad en el pantalán. Para barcos mayores hace falta titulación o alquilar con patrón, que es lo que hace la mayoría.",
      },
      {
        pregunta: "¿Se llega a la Isla de Benidorm desde Calpe sin licencia?",
        respuesta:
          "Con un barco sin titulación, no: queda fuera del radio que permiten esas embarcaciones. Con patrón sí, está a poco más de media hora bordeando la Sierra Helada y es la salida de día completo más habitual desde aquí.",
      },
    ],
    latitud: 38.6437,
    longitud: 0.0453,
    mesesAlta: "7,8",
    destacado: true,
    orden: 9,
    puertos: [
      { slug: "calpe", nombre: "Real Club Náutico de Calpe", latitud: 38.6383, longitud: 0.0714 },
      { slug: "les-bassetes", nombre: "Puerto Les Bassetes", latitud: 38.6539, longitud: 0.0806 },
    ],
    preguntas: [
      {
        pregunta: "¿Se puede rodear el Peñón de Ifach en barco?",
        respuesta:
          "El Ifach es Parque Natural y tiene régimen de protección propio, con limitaciones de aproximación y fondeo que pueden variar por temporada. Antes de salir conviene confirmar qué está permitido en ese momento con el club o con la autoridad competente. Lo que nadie te discute es la vista de la pared desde el agua.",
        preguntaEn: "Can you sail around the Peñón de Ifach?",
        respuestaEn:
          "The Ifach is a Natural Park with its own protection regime, with restrictions on approach and anchoring that can vary by season. Before you set out, it is worth confirming with the club or the competent authority what is allowed at that moment. What nobody will argue with you about is the view of the wall from the water.",
        preguntaDe: "Kann man den Peñón de Ifach mit dem Boot umrunden?",
        respuestaDe:
          "Der Ifach ist ein Naturpark mit eigenem Schutzregime und Einschränkungen bei Annäherung und Ankern, die je nach Saison variieren können. Vor dem Auslaufen sollten Sie beim Club oder bei der zuständigen Behörde bestätigen lassen, was in dem Moment erlaubt ist. Was Ihnen niemand streitig macht, ist der Blick auf die Wand vom Wasser aus.",
      },
      {
        pregunta: "¿Cuánto se tarda de Calpe a la Isla de Benidorm?",
        respuesta:
          "Poco más de media hora en lancha a velocidad de crucero, bordeando la Sierra Helada. Es una de las salidas de día completo más agradecidas de la zona, y se puede combinar con un fondeo de vuelta en el Mascarat.",
        preguntaEn: "How long does it take from Calpe to the island of Benidorm?",
        respuestaEn:
          "Just over half an hour in a motorboat at cruising speed, rounding the Sierra Helada. It is one of the most rewarding full-day trips in the area, and you can combine it with a return anchorage at the Mascarat.",
        preguntaDe: "Wie lange dauert die Fahrt von Calpe zur Insel Benidorm?",
        respuestaDe:
          "Etwas mehr als eine halbe Stunde mit dem Motorboot bei Reisegeschwindigkeit, entlang der Sierra Helada. Es ist einer der dankbarsten Ganztagesausflüge der Gegend und lässt sich mit einem Ankerplatz auf dem Rückweg am Mascarat verbinden.",
      },
      {
        pregunta: "¿Qué incluye el precio de un alquiler en Calpe?",
        respuesta:
          "En nuestras fichas, el precio que ves incluye combustible estimado, limpieza, amarre y tasas. No hay cargos nuevos en el pantalán. Si el barco lleva patrón, también viene indicado en el precio antes de reservar.",
        preguntaEn: "What does the price of a hire include in Calpe?",
        respuestaEn:
          "In our listings, the price you see includes estimated fuel, cleaning, mooring and fees. There are no extra charges at the pontoon. If the boat comes with a skipper, that is also shown in the price before you book.",
        preguntaDe: "Was ist im Mietpreis in Calpe enthalten?",
        respuestaDe:
          "In unseren Angeboten umfasst der angezeigte Preis geschätzten Treibstoff, Reinigung, Liegeplatz und Gebühren. Am Steg fallen keine weiteren Kosten an. Wenn das Boot mit Skipper gebucht wird, ist das ebenfalls vor der Reservierung im Preis ausgewiesen.",
      },
    ],
  },
  {
    slug: "altea",
    nombre: "Altea",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "costa",
    titular: "Alquiler de barcos en Altea",
    descripcion:
      "Dos puertos, el del pueblo y Campomanes. La bahía más tranquila de la costa y la Isla de Benidorm a media hora.",
    descripcionEn:
      "Two harbours, the one in town and Campomanes. The calmest bay on the coast, with the island of Benidorm half an hour away.",
    descripcionDe:
      "Zwei Häfen, der im Ort und Campomanes. Die ruhigste Bucht der Küste, die Insel Benidorm eine halbe Stunde entfernt.",
    contenido: `Altea tiene dos salidas y no dan lo mismo. El Club Náutico Altea está junto al pueblo, con la cúpula azul de la iglesia a la vista, y es el más bonito pero el que peor aparca en verano. Marina Greenwich, en Campomanes, queda tres kilómetros al norte, tiene aparcamiento amplio y se sale igual de bien: si vas con grupo y varios coches, es la opción sensata.

La bahía de Altea es de las más tranquilas de la costa alicantina, protegida por la Sierra Helada al sur y por el Morro de Toix al norte. Eso la hace un sitio cómodo para un primer día de barco o para salir con niños, porque casi siempre hay una orilla u otra donde el agua está plana.

Hacia el norte, a diez o quince minutos, están la Cala del Mascarat y la Cala del Soio, con esos acantilados rojos y agua muy limpia. Justo al lado del puerto queda el Cap Negret, de canto rodado, y hacia el sur la Cala de la Solsida, en el Albir, con fondo de arena y grava, buena para fondear a comer. La Isla de Benidorm está a media hora larga bordeando la Sierra Helada, y es la salida de día completo clásica desde aquí.

El viento dominante en verano es el llebeig de la tarde, que entra del suroeste. Con él, el abrigo está en la parte norte de la bahía, hacia el Mascarat. Con levante pasa lo contrario y conviene arrimarse al Albir.`,
    contenidoEn: `Altea has two departure points and they are not the same. The Club Náutico Altea is right next to the town, with the blue dome of the church in sight, and it is the prettiest but the worst for parking in summer. Marina Greenwich, in Campomanes, is three kilometres to the north, has plenty of parking and you set out just as well: if you are going as a group with several cars, it is the sensible option.

The bay of Altea is one of the calmest on the Alicante coast, set between the Sierra Helada to the south and the Morro de Toix to the north, two landmarks you can see from the water that frame the whole trip. That makes it a comfortable place for a first day afloat or for going out with children: the coves are ten or fifteen minutes from the harbour and the day comes together without any long crossings.

To the north, ten or fifteen minutes away, are the Cala del Mascarat and the Cala del Soio, with those red cliffs and very clean water. Right next to the harbour is the Cap Negret, with its shingle beach, and to the south the Cala de la Solsida, in the Albir, a good spot to stop for lunch at anchor. The island of Benidorm is a good half hour away following the Sierra Helada, and it is the classic full-day trip from here.

The dominant wind in summer is the afternoon llebeig, which comes in from the south-west. It is a classic of the Alicante coast: it arrives in mid-afternoon, and as elsewhere in the area it is worth checking the forecast before leaving and keeping it in mind when planning your route.`,
    contenidoDe: `Altea hat zwei Ausgangspunkte, und sie sind nicht gleichwertig. Der Club Náutico Altea liegt direkt am Ort, mit der blauen Kuppel der Kirche in Sichtweite; er ist der schönste, aber im Sommer hat er das schlechteste Parken. Marina Greenwich in Campomanes liegt drei Kilometer weiter nördlich, bietet reichlich Parkplätze, und Sie laufen genauso gut aus: Wenn Sie mit einer Gruppe und mehreren Autos kommen, ist das die vernünftige Wahl.

Die Bucht von Altea gehört zu den ruhigsten der Küste von Alicante, eingebettet zwischen der Sierra Helada im Süden und dem Morro de Toix im Norden, zwei Wahrzeichen, die Sie vom Wasser aus sehen und die den ganzen Törn einrahmen. Das macht sie zu einem bequemen Ort für den ersten Tag auf dem Boot oder für einen Ausflug mit Kindern: Die Buchten liegen zehn oder fünfzehn Minuten vom Hafen entfernt, und der Tag ergibt sich ohne lange Überfahrten.

Nach Norden, zehn oder fünfzehn Minuten entfernt, liegen die Cala del Mascarat und die Cala del Soio mit ihren roten Klippen und sehr klarem Wasser. Direkt neben dem Hafen liegt das Cap Negret mit seinem Kiesstrand, und nach Süden die Cala de la Solsida im Albir, ein guter Ort, um vor Anker zu Mittag zu essen. Die Insel Benidorm ist gute eine halbe Stunde entfernt, entlang der Sierra Helada, und ist der klassische Ganztagesausflug von hier.

Der vorherrschende Wind im Sommer ist der Llebeig am Nachmittag, der aus Südwesten kommt. Er ist ein Klassiker der Küste von Alicante: Er setzt am frühen Nachmittag ein, und wie im Rest der Gegend lohnt es sich, vor dem Auslaufen den Wetterbericht zu prüfen und ihn bei der Routenplanung zu berücksichtigen.`,
    sinLicencia: `La bahía de Altea es de las más tranquilas de la costa alicantina, y eso la convierte en un sitio cómodo para alquilar sin tener titulación. Está protegida por la Sierra Helada al sur y por el Morro de Toix al norte, así que casi siempre hay una orilla u otra con el agua plana.

Se sale por dos sitios y no dan lo mismo. El Club Náutico Altea está junto al pueblo y es el más bonito, pero en verano aparcar es un problema. Marina Greenwich, en Campomanes, queda tres kilómetros al norte, tiene aparcamiento amplio y se sale a la misma bahía: si vais con grupo y varios coches, es la opción sensata.

Sin ningún título puedes llevar una embarcación pequeña, de día y sin alejarte. Con eso te mueves por la bahía entera, te acercas al Cap Negret, que está pegado al puerto, y llegas a la Cala de la Solsida en el Albir, de arena y grava, buena para fondear a comer. Hacia el norte, la Cala del Mascarat y la Cala del Soio están a diez o quince minutos, con acantilados rojos y agua muy limpia.

Con patrón la salida clásica es la Isla de Benidorm, a media hora larga bordeando la Sierra Helada, y volver por el Albir. Es el día completo típico desde aquí.

El viento dominante en verano es el llebeig de la tarde, del suroeste. Con él el abrigo está en la parte norte de la bahía, hacia el Mascarat; con levante pasa lo contrario y conviene arrimarse al Albir. En la ficha de cada barco indicamos si exige título.`,
    sinLicenciaEn: `The bay of Altea is one of the calmest on the Alicante coast, which makes it a comfortable place to hire a boat without a licence. It stretches between the Sierra Helada to the south and the Morro de Toix to the north, a position that makes it easy to find your bearings from the water.

You can set out from two places and they are not the same. The Club Náutico Altea sits right by the old town, with the blue dome of the church in sight, and is the prettier of the two, but parking in summer is a problem. Marina Greenwich, at Campomanes, lies three kilometres to the north, has plenty of parking and sets out onto the same bay: if you are coming as a group with several cars, it is the sensible option. With a single car and a plan to stroll through the old town before or after, choose the harbour at Altea. For the boat it makes no difference, because both exits lead to the same water.

With no qualification at all you can take a small boat, for daytime use only and without going far. With that you can cover the whole bay, get close to Cap Negret, which sits right next to the harbour and is made of rounded shingle, and reach Cala de la Solsida in the Albir, a good spot to anchor for lunch. To the north, Cala del Mascarat and Cala del Soio are ten or fifteen minutes out, with red cliffs and very clean water. It is a comfortable place for a first day afloat or for heading out with children; it is one of the best on the coast for that.

With a skipper the classic trip is the island of Benidorm, a good half hour along the Sierra Helada, returning past the Albir. It is the most common full-day trip from here.

The dominant wind in summer is the afternoon llebeig (south-westerly), which comes in from the south-west; as on the whole of this coast, it is worth checking the forecast before you set off. On each boat's listing we state whether a licence is required.`,
    sinLicenciaDe: `Die Bucht von Altea ist eine der ruhigsten an der Küste von Alicante, und genau das macht sie zu einem bequemen Ort, um ohne Führerschein ein Boot zu mieten. Sie erstreckt sich zwischen der Sierra Helada im Süden und dem Morro de Toix im Norden, eine Lage, die die Orientierung vom Wasser aus leicht macht.

Man kann an zwei Stellen auslaufen, und sie sind nicht gleich. Der Club Náutico Altea liegt direkt am Ort, mit der blauen Kuppel der Kirche in Sichtweite, und ist der schönere der beiden, aber im Sommer ist das Parken ein Problem. Die Marina Greenwich in Campomanes liegt drei Kilometer weiter nördlich, hat reichlich Parkplätze und läuft auf dieselbe Bucht hinaus: Wenn Sie als Gruppe mit mehreren Autos kommen, ist das die vernünftige Option. Mit einem einzigen Auto und dem Plan, vorher oder nachher durch den Ort zu schlendern, wählen Sie den Hafen von Altea. Für das Boot macht es keinen Unterschied, denn beide Ausfahrten führen auf dasselbe Wasser.

Ohne jede Befähigung können Sie ein kleines Boot führen, nur bei Tag und ohne sich weit zu entfernen. Damit können Sie die ganze Bucht abdecken, sich dem Cap Negret nähern, das direkt am Hafen liegt und aus rundem Kies besteht, und die Cala de la Solsida im Albir erreichen, einen guten Ort zum Ankern und Mittagessen. Nach Norden liegen die Cala del Mascarat und die Cala del Soio zehn oder fünfzehn Minuten entfernt, mit roten Klippen und sehr klarem Wasser. Es ist ein bequemer Ort für den ersten Tag auf dem Wasser oder für einen Ausflug mit Kindern; dafür gehört es zu den besten der Küste.

Mit Skipper ist der klassische Törn die Insel Benidorm, gut eine halbe Stunde entlang der Sierra Helada, mit der Rückkehr am Albir vorbei. Es ist der häufigste Ganztagstörn von hier aus.

Der dominierende Wind im Sommer ist der nachmittägliche Llebeig (Südwestwind), der aus Südwesten kommt; wie an der gesamten Küste lohnt es sich, vor dem Auslaufen den Wetterbericht zu prüfen. Auf der Karte jedes Bootes steht, ob ein Führerschein erforderlich ist.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Salgo de Altea pueblo o de Campomanes sin licencia?",
        respuesta:
          "Para el barco da igual: se sale a la misma bahía. Si vais con varios coches, Campomanes aparca mucho mejor en verano. Si vais con uno solo y queréis pasear por el pueblo, el puerto de Altea.",
      },
      {
        pregunta: "¿Es Altea buena para ir con niños sin titulación?",
        respuesta:
          "Es de las mejores de la costa. La bahía está protegida por la Sierra Helada y el Morro de Toix, casi siempre hay una orilla con el agua plana, y las calas de fondeo están a diez o quince minutos del puerto.",
      },
      {
        pregunta: "¿Se llega a la Isla de Benidorm desde Altea sin licencia?",
        respuesta:
          "Con patrón sí, a media hora larga bordeando la Sierra Helada. Sin titulación no: queda fuera del radio de esas embarcaciones. Con ellas te mueves por la bahía, el Cap Negret y la Solsida.",
      },
    ],
    latitud: 38.5985,
    longitud: -0.0518,
    mesesAlta: "7,8",
    destacado: false,
    orden: 10,
    puertos: [
      { slug: "altea", nombre: "Club Náutico Altea", latitud: 38.5946, longitud: -0.0479 },
      { slug: "campomanes", nombre: "Marina Greenwich (Campomanes)", latitud: 38.5642, longitud: -0.0625 },
    ],
    preguntas: [
      {
        pregunta: "¿Salgo desde el puerto de Altea o desde Campomanes?",
        respuesta:
          "Si vais con un solo coche y queréis pasear por el pueblo antes o después, el puerto de Altea. Si vais con grupo y varios coches, Campomanes: aparca mucho mejor en verano y se sale a la misma bahía.",
        preguntaEn: "Do I leave from Altea harbour or from Campomanes?",
        respuestaEn:
          "If you are going with a single car and want to stroll around the town before or after, Altea harbour. If you are going as a group with several cars, Campomanes: parking is much easier in summer, and you leave into the same bay.",
        preguntaDe: "Fahre ich vom Hafen von Altea oder von Campomanes aus?",
        respuestaDe:
          "Wenn Sie mit einem einzigen Auto unterwegs sind und vorher oder nachher durch den Ort bummeln möchten, vom Hafen von Altea. Wenn Sie mit einer Gruppe und mehreren Autos kommen, von Campomanes: Dort gibt es im Sommer viel bessere Parkmöglichkeiten, und man läuft in dieselbe Bucht aus.",
      },
      {
        pregunta: "¿Es Altea buena para ir con niños en barco?",
        respuesta:
          "Es de las mejores de la costa. La bahía está protegida por la Sierra Helada y el Morro de Toix, así que casi siempre hay una orilla con el agua plana, y las calas de fondeo están a diez o quince minutos del puerto.",
        preguntaEn: "Is Altea good for a boat trip with children?",
        respuestaEn:
          "It is one of the best on the coast. The bay is framed by the Sierra Helada and the Morro de Toix, and the anchorages are ten or fifteen minutes from the harbour.",
        preguntaDe: "Ist Altea gut für einen Bootsausflug mit Kindern?",
        respuestaDe:
          "Sie gehört zu den besten der Küste. Die Bucht wird von der Sierra Helada und dem Morro de Toix eingerahmt, und die Ankerplätze sind zehn bis fünfzehn Minuten vom Hafen entfernt.",
      },
      {
        pregunta: "¿Se puede ir a la Isla de Benidorm desde Altea?",
        respuesta:
          "Sí, está a media hora larga bordeando la Sierra Helada, y es la salida de día completo más habitual desde aquí. Se puede fondear en la cara norte y volver por el Albir para comer en la Solsida.",
        preguntaEn: "Can you go to the Isla de Benidorm from Altea?",
        respuestaEn:
          "Yes, it is a good half hour away, skirting the Sierra Helada, and it is the most common full-day trip from here.",
        preguntaDe: "Kann man von Altea zur Isla de Benidorm fahren?",
        respuestaDe:
          "Ja, sie liegt gut eine halbe Stunde entfernt, entlang der Sierra Helada, und ist der häufigste Ganztagesausflug von hier.",
      },
    ],
  },
  {
    slug: "benidorm",
    nombre: "Benidorm",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "ciudad",
    titular: "Alquiler de barcos en Benidorm",
    descripcion:
      "La Isla de Benidorm a veinte minutos y el skyline desde el agua. La salida más corta y más agradecida de toda la provincia.",
    descripcionEn:
      "The island of Benidorm twenty minutes out and the skyline from the water. The shortest and most rewarding trip in the province.",
    descripcionDe:
      "Die Insel Benidorm nach zwanzig Minuten und die Skyline vom Wasser aus. Der kürzeste und dankbarste Törn der Provinz.",
    contenido: `Se sale del Club Náutico Benidorm, en el puerto que separa la playa de Levante de la de Poniente. Es de los puertos mejor comunicados de la costa: desde casi cualquier hotel de Benidorm estás en el pantalán en diez o quince minutos.

La Isla de Benidorm está a unos veinte minutos de la bocana. Eso la convierte en la salida corta más rentable de la provincia: con medio día de alquiler ya haces la travesía, fondeas, te bañas y vuelves sin agobios. El fondeo habitual es la cara protegida de la isla, con agua muy clara y buena visibilidad para bucear con gafas. La isla tiene figura de protección ambiental, así que conviene confirmar antes de salir qué está permitido en cuanto a fondeo y actividad, porque no es una cala cualquiera.

La otra cara de Benidorm, la que casi nadie ve, es el skyline desde el mar. Los rascacielos con la Sierra Helada detrás, sobre todo a última hora de la tarde, son una postal que desde tierra no existe. Las salidas de atardecer funcionan muy bien aquí por eso.

Hacia el noreste, bordeando la Sierra Helada, están la Cala Tío Ximo y la Almadrava, dos fondeos pequeños de roca y grava a diez minutos, mucho más tranquilos que la isla en agosto. Hacia el suroeste queda la Cala de Finestrat. Y si el día da para más, Villajoyosa está a un cuarto de hora y Altea a media hora larga.`,
    contenidoEn: `In Benidorm you set out from the Club Náutico Benidorm, in the harbour that separates Levante beach from Poniente beach. The boat is handed over on the pontoon, where you collect the key and get the safety briefing before you leave. It is one of the best-connected harbours on the coast: from almost any hotel in Benidorm you reach the pontoon in ten or fifteen minutes.

The same goes for the car: in August the harbour car park fills up by mid-morning. Arrive early or walk down from your hotel, which is what most holidaymakers do.

Twenty minutes from the harbour mouth lies the island of Benidorm, the most rewarding short trip in the province: with half a day's hire there is plenty of time to cross over, swim and come back. It is a protected natural site with its own rules, so check with the club what is allowed before you leave, because the rules change with the season.

Closer still, ten minutes out along the Serra Gelada, Cala Tío Ximo and la Almadrava are two coves far calmer than the island in August; to the south, Cala de Finestrat is only minutes away and Villajoyosa a quarter of an hour.

Around forty minutes on, heading north, you reach Altea, half an hour or so on a good day: the white village with its blue dome seen from the water is one of the images people take home from hiring here. And if the day allows an hour of boat time, past Altea and Calpe you reach Moraira, already in the Marina Alta, with the most tucked-away coves of the province.

In summer the afternoon breeze arrives from mid-afternoon, around three or four o'clock. The routine that works here is to head for the island early, come back mid-afternoon with the wind behind you and keep the last hour for the skyline: the towers with the Serra Gelada behind them, seen from the water at the end of the day, are a postcard that does not exist from land. That is why sunset trips work so well here.

As for licences: a small boat can be skippered with no licence at all after the safety briefing, which lets you move around the bay, between Levante and Poniente, and along the nearby coves. For the island, a short but open crossing, the usual answer is to hire with a skipper: he holds the licence and you decide the plan. Each boat's listing shows whether one is required; the requirements are set by the regulations and reviewed.`,
    contenidoDe: `In Benidorm starten Sie vom Club Náutico Benidorm, im Hafen, der den Strand Levante vom Strand Poniente trennt. Das Boot wird am Steg übergeben, wo Sie den Schlüssel erhalten und vor dem Auslaufen die Sicherheitseinweisung bekommen. Es ist einer der am besten angebundenen Häfen der Küste: Von fast jedem Hotel in Benidorm sind Sie in zehn oder fünfzehn Minuten am Steg.

Das gilt auch fürs Auto: Im August füllt sich der Parkplatz am Hafen bis zum Vormittag. Kommen Sie früh oder gehen Sie vom Hotel zu Fuß, so machen es die meisten Urlauber.

Zwanzig Minuten von der Hafeneinfahrt entfernt liegt die Insel Benidorm, der dankbarste Kurztörn der Provinz: Mit einem halben Tag Mietzeit bleibt reichlich Zeit, hinüberzufahren, zu baden und zurückzukehren. Die Insel steht unter Naturschutz und hat eigene Regeln – klären Sie also vor dem Ablegen im Club, was erlaubt ist, denn die Regeln ändern sich mit der Saison.

Näher dran, zehn Minuten entlang der Serra Gelada, liegen die Cala Tío Ximo und la Almadrava, zwei Buchten, die im August deutlich ruhiger sind als die Insel; im Süden ist die Cala de Finestrat nur wenige Minuten entfernt und Villajoyosa eine Viertelstunde.

Nach etwa vierzig Minuten, Richtung Norden, erreichen Sie Altea, je nach Tag eine gute halbe Stunde: Das weiße Dorf mit der blauen Kuppel, vom Wasser aus gesehen, gehört zu den Bildern, die man von hier mit nach Hause nimmt. Und wenn der Tag eine Stunde Bootszeit hergibt, erreichen Sie hinter Altea und Calpe Moraira, schon in der Marina Alta, mit der verstecktesten Buchtküste der Provinz.

Im Sommer setzt die Nachmittagsbrise ab dem frühen Nachmittag ein, gegen drei oder vier Uhr. Die Taktik, die hier funktioniert: früh zur Insel fahren, am Nachmittag mit dem Wind im Rücken zurückkehren und die letzte Stunde für die Skyline aufheben: Die Hochhäuser mit der Serra Gelada dahinter, vom Wasser aus am Abend gesehen, sind eine Postkarte, die es vom Land aus nicht gibt. Deshalb funktionieren Sonnenuntergangstörns hier so gut.

Zum Führerschein: Ein kleines Boot dürfen Sie nach der Sicherheitseinweisung ganz ohne Führerschein fahren, damit bewegen Sie sich durch die Bucht zwischen Levante und Poniente und zu den nahen Buchten. Für die Insel, eine kurze, aber offene Überfahrt, ist die übliche Lösung, mit Skipper zu mieten: Er bringt den Schein mit, Sie bestimmen den Plan. Im Eintrag jedes Boots steht, ob einer nötig ist; die Anforderungen legt die Verordnung fest und werden überprüft.`,
    sinLicencia: `Benidorm es probablemente el sitio de la costa donde más se busca alquilar un barco sin licencia, y tiene sentido: casi todo el que lo pregunta está de vacaciones, no tiene ningún título náutico y quiere llegar a la isla.

Sin titulación puedes gobernar una embarcación pequeña, de potencia limitada y solo de día, después de que te expliquen en el pantalán lo esencial. Con eso te mueves por la bahía, entre la playa de Levante y la de Poniente, y te acercas a la Cala Tío Ximo y a la Almadrava, que están a diez minutos bordeando la Sierra Helada.

Para la isla, lo normal es ir con patrón. Está a unos veinte minutos de la bocana, la travesía es corta pero abierta, y con patrón a bordo no necesitas ningún título: él pone la titulación y tú decides el plan. Es también la fórmula que usan casi todas las despedidas y grupos grandes, porque el precio por persona baja mucho a partir de ocho.

La isla tiene figura de protección ambiental, así que hay reglas sobre dónde fondear y qué se puede hacer allí. Confírmalo antes de salir: cambia según la temporada y no es lo mismo que fondear en una cala cualquiera.

La explicación de seguridad del pantalán no es un trámite que despachar: te enseñan a arrancar y parar el motor, a fondear, hasta dónde puedes llegar y qué hacer si el mar se levanta. Dura diez o quince minutos y conviene escucharla entera, porque es lo único que llevas encima cuando sales sin patrón a bordo.

Y una cosa que conviene saber si estás mirando precios: la salida de atardecer, de dos o tres horas, sale bastante más barata que un día completo y es cuando mejor se ve el perfil de Benidorm desde el agua.`,
    sinLicenciaEn: `Benidorm is probably the place on this coast where the most people look for a boat to hire without a licence, and it makes sense: almost everyone who asks is on holiday, holds no boating qualification at all and simply wants to reach the island.

Without any qualification you can handle a small boat, of limited power and only by day, after the essential safety briefing at the pontoon. That puts the whole bay within reach, between Playa de Levante and Playa de Poniente, and lets you get close to Cala Tío Ximo and la Almadrava, both ten minutes away as you round the Sierra Helada. To the south-west you also have the Cala de Finestrat. For most first-timers that is already a good day, and because the bay is sheltered you do not need to plan around open water.

For the island, the usual way is to go with a skipper. It lies about twenty minutes from the harbour mouth: the crossing is short but open, and with a skipper on board you need nothing at all, because he supplies the qualification and you decide the plan. It is also the formula almost all stag and hen parties and large groups use, because the price per person drops sharply from eight people upwards. The Club Náutico Benidorm is one of the best-connected harbours on the coast: from almost any hotel in town you can be on the pontoon in ten or fifteen minutes, which matters when you only have a half-day slot. And half a day is genuinely enough for the island: you cross, anchor, swim and are back without rushing.

The island has environmental protection status, so there are rules about where to anchor and what you can do there. Confirm them before you leave, because they change with the season and it is not the same as anchoring in an ordinary cove. The usual anchorage is the sheltered side of the island, with very clear water and good visibility for snorkelling with a mask.

The safety briefing at the pontoon is not a box to tick: they show you how to start and stop the engine, how to anchor, how far you may go and what to do if the sea gets up. It lasts ten or fifteen minutes and it is worth hearing the whole thing, because it is the only thing you carry with you when you go out without a skipper on board.

And one thing worth knowing if you are comparing prices: the sunset trip, of two or three hours, costs considerably less than a full day, and it is when Benidorm looks its best from the water. The skyline with the Sierra Helada behind it, seen late in the afternoon, is a postcard that does not exist from land, which is why these trips work so well here.`,
    sinLicenciaDe: `Benidorm ist wahrscheinlich der Ort an dieser Küste, an dem am häufigsten nach einem Boot ohne Führerschein gefragt wird, und das hat seinen Grund: Fast alle, die danach fragen, sind im Urlaub, besitzen keinerlei nautische Befähigung und möchten einfach zur Insel.

Ohne Führerschein dürfen Sie ein kleines Boot führen, mit begrenzter Leistung und nur bei Tag, nach der kurzen Sicherheitseinweisung am Steg. Damit haben Sie die ganze Bucht zur Verfügung, zwischen der Playa de Levante und der Playa de Poniente, und kommen der Cala Tío Ximo und der Almadrava nahe, die beide zehn Minuten entfernt liegen, wenn Sie die Sierra Helada umrunden. Nach Südwesten erreichen Sie außerdem die Cala de Finestrat. Für die meisten, die zum ersten Mal fahren, ist das bereits ein ganzer Tag, und weil die Bucht geschützt liegt, müssen Sie keine offene Überfahrt einplanen.

Für die Insel ist der übliche Weg, mit einem Skipper zu fahren. Sie liegt etwa zwanzig Minuten von der Hafeneinfahrt entfernt: Die Überfahrt ist kurz, aber offen, und mit einem Skipper an Bord brauchen Sie überhaupt nichts, denn er bringt den Führerschein mit und Sie bestimmen den Plan. Es ist auch die Formel, die fast alle Junggesellenabschiede und größeren Gruppen wählen, denn ab acht Personen sinkt der Preis pro Kopf deutlich. Der Club Náutico Benidorm ist einer der am besten angebundenen Häfen der Küste: Von fast jedem Hotel in der Stadt stehen Sie in zehn bis fünfzehn Minuten am Steg, was zählt, wenn Sie nur ein halbes Tagesfenster haben. Und ein halber Tag reicht für die Insel wirklich: Sie fahren hinüber, ankern, schwimmen und sind ohne Hektik zurück.

Die Insel steht unter Naturschutz, daher gibt es Regeln, wo geankert und was dort unternommen werden darf. Klären Sie das vor der Abfahrt, denn die Regeln ändern sich mit der Saison, und es ist nicht dasselbe wie das Ankern in einer beliebigen Bucht. Der übliche Ankerplatz ist die geschützte Seite der Insel, mit sehr klarem Wasser und guter Sicht zum Schnorcheln mit Taucherbrille.

Die Sicherheitseinweisung am Steg ist keine lästige Formalität: Man zeigt Ihnen, wie man den Motor startet und stoppt, wie man ankert, wie weit Sie fahren dürfen und was zu tun ist, wenn die See aufbaut. Sie dauert zehn bis fünfzehn Minuten, und es lohnt sich, ihr ganz zuzuhören, denn sie ist das Einzige, was Sie mitnehmen, wenn Sie ohne Skipper an Bord auslaufen.

Und etwas, das Sie wissen sollten, wenn Sie Preise vergleichen: Der Sonnenuntergangstrip von zwei oder drei Stunden kostet deutlich weniger als ein ganzer Tag und ist der Moment, in dem Benidorm vom Wasser aus am besten aussieht. Die Skyline mit der Sierra Helada dahinter, am späten Nachmittag gesehen, ist eine Postkarte, die es vom Land aus nicht gibt – genau deshalb funktionieren diese Trips hier so gut.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Puedo ir a la Isla de Benidorm sin licencia?",
        respuesta:
          "Con patrón, sí: son unos veinte minutos desde la bocana y la titulación la pone él. Con una embarcación de las que se llevan sin título, la isla queda fuera del radio permitido; con esas te mueves por la bahía y las calas cercanas.",
      },
      {
        pregunta: "¿Qué barcos se alquilan en Benidorm sin ningún título?",
        respuesta:
          "Embarcaciones pequeñas, de potencia limitada y solo de día, tras una explicación de seguridad en el pantalán. En la ficha de cada barco indicamos si exige titulación, y puedes filtrar directamente por los que no.",
      },
      {
        pregunta: "¿Cuál es la salida más barata en Benidorm sin licencia?",
        respuesta:
          "La de atardecer con patrón, de dos o tres horas. Cuesta bastante menos que un día completo, no necesitas ningún título y es cuando mejor se ve el perfil de la ciudad desde el agua.",
      },
    ],
    latitud: 38.5342,
    longitud: -0.1314,
    mesesAlta: "6,7,8,9",
    destacado: true,
    orden: 11,
    puertos: [
      { slug: "benidorm", nombre: "Club Náutico Benidorm", latitud: 38.5372, longitud: -0.1281 },
    ],
    preguntas: [
      {
        pregunta: "¿Cuánto se tarda a la Isla de Benidorm en barco?",
        respuesta:
          "Unos veinte minutos desde la bocana del puerto. Es la salida corta más agradecida de la provincia: con medio día de alquiler da tiempo de sobra a cruzar, fondear, bañarse y volver.",
        preguntaEn: "How long does it take to reach the island of Benidorm by boat?",
        respuestaEn:
          "About twenty minutes from the harbour mouth. It is the most rewarding short trip in the province: with half a day's hire there is plenty of time to cross, anchor, swim and get back.",
        preguntaDe: "Wie lange dauert die Fahrt zur Insel Benidorm?",
        respuestaDe:
          "Etwa zwanzig Minuten von der Hafeneinfahrt. Es ist der lohnendste kurze Törn der Provinz: Mit einem halben Tag Miete bleibt reichlich Zeit, um hinüberzufahren, zu ankern, zu baden und zurückzukehren.",
      },
      {
        pregunta: "¿Puedo alquilar un barco en Benidorm sin licencia?",
        respuesta:
          "Sin ninguna titulación solo se pueden gobernar embarcaciones pequeñas y de poca potencia, tras una explicación de seguridad en el pantalán. La alternativa, y la más habitual entre quienes están de vacaciones, es alquilar con patrón: él pone el título y tú solo decides adónde ir.",
        preguntaEn: "Can I hire a boat in Benidorm without a licence?",
        respuestaEn:
          "Without any boating qualification you can only helm small, low-horsepower boats, after a safety briefing at the pontoon. The alternative, and the most common choice among holidaymakers, is to hire with a skipper: they provide the licence and you simply decide where to go.",
        preguntaDe: "Kann ich in Benidorm ein Boot ohne Führerschein mieten?",
        respuestaDe:
          "Ohne Führerschein dürfen Sie nur kleine Boote mit begrenzter Leistung führen, nach einer Sicherheitseinweisung am Steg. Die Alternative – und bei Urlaubern die häufigste – ist das Mieten mit Skipper: Er bringt die Befähigung mit, und Sie entscheiden nur, wohin es geht.",
      },
      {
        pregunta: "¿Merece la pena una salida al atardecer en Benidorm?",
        respuesta:
          "Es lo que mejor funciona aquí. El skyline con la Sierra Helada detrás, visto desde el agua a última hora, no se ve así desde ningún punto de tierra. Suelen ser salidas de dos o tres horas y salen mucho más baratas que un día completo.",
        preguntaEn: "Is a sunset trip in Benidorm worth it?",
        respuestaEn:
          "It is what works best here. The skyline with the Sierra Helada behind it, seen from the water late in the day, cannot be seen like that from any point on land. These trips usually last two or three hours and cost far less than a full day.",
        preguntaDe: "Lohnt sich ein Törn bei Sonnenuntergang in Benidorm?",
        respuestaDe:
          "Das ist das, was hier am besten funktioniert. Die Skyline mit der Sierra Helada im Hintergrund, am späten Nachmittag vom Wasser aus gesehen, sieht man von keinem Punkt an Land so. Meist dauern diese Törns zwei bis drei Stunden und sind deutlich günstiger als ein ganzer Tag.",
      },
    ],
  },
  {
    slug: "villajoyosa",
    nombre: "Villajoyosa",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "costa",
    titular: "Alquiler de barcos en Villajoyosa",
    descripcion:
      "Las casas de colores vistas desde el agua, que es como se pintaron para ser vistas. A quince minutos de Benidorm y con la mitad de gente.",
    descripcionEn:
      "The coloured houses seen from the water, which is what they were painted for. Fifteen minutes from Benidorm with half the crowd.",
    descripcionDe:
      "Die bunten Häuser vom Wasser aus, wofür sie gestrichen wurden. Fünfzehn Minuten von Benidorm und halb so voll.",
    contenido: `Se sale del Club Náutico La Vila Joiosa, un puerto de tamaño medio pegado al casco antiguo. Es la alternativa tranquila a Benidorm: está a quince minutos de navegación y en agosto tiene bastante menos tráfico dentro y fuera del agua.

El motivo para salir de aquí es la fachada del pueblo. Las casas de colores de la Vila se pintaron así para que los pescadores las distinguieran desde el mar, y ese es el punto de vista para el que fueron hechas. Desde tierra ves una calle; desde el agua, a doscientos metros de la orilla, ves el pueblo entero como un tablero de color contra la montaña. Es el mejor plano de la costa y casi nadie lo aprovecha.

Hacia el noreste están la Cala Bol Nou, de arena y roca al pie de un acantilado ocre, y el Racó del Conill, dos fondeos que en temporada alta siguen siendo razonablemente tranquilos porque el acceso por tierra es incómodo. Hacia el suroeste, la costa lleva hasta la Torre de Xarco y, en poco más de veinte minutos, a El Campello.

En julio, durante los Moros y Cristianos, hay un desembarco en la playa que se puede ver desde el agua. Si coincides esos días, reserva con antelación y cuenta con que habrá mucho barco fondeado y restricciones de paso en la zona del desembarco.`,
    contenidoEn: `You leave from the Club Náutico La Vila Joiosa, a medium-sized port attached to the old town. It is the quiet alternative to Benidorm: fifteen minutes' sailing away, and in August it has far less traffic, on land and on the water alike. The key is collected at the club office, on the pontoon, at the agreed time after the safety briefing; the boat is handed over there too, a few steps from the old town. Parking is easier than at most ports on this coast: there is room in the streets and lots around the harbour, especially first thing in the morning, and in August you park considerably better than in Benidorm.

The reason to sail from here is the town's facade. The Vila's coloured houses were painted so that fishermen could pick them out from the sea, and that is the viewpoint they were built for: from land you see a street; from the water, two hundred metres offshore, you see the whole town laid out like a board of colour against the mountain. It is the best view on this coast and almost nobody uses it.

The distances are short. A few minutes north-east lie Cala Bol Nou, at the foot of an ochre cliff, and Racó del Conill: two stops that stay reasonably quiet in high season because the land access is awkward. South-west, the coast runs to Torre de Xarco and, in a little over twenty minutes, to El Campello. The island of Benidorm lies a good quarter of an hour south, and at around forty minutes, past El Campello, you reach Cabo de las Huertas. With an hour, the whole arc fits into the day: the ochre coves to the north-east, the island to the south and the San Juan coast as the far limit to the south-west.

As on the rest of this coast, in summer the afternoon breeze comes in from the east mid-afternoon, between three and five, and freshens the day. The routine that works is to leave early, take in the facade head-on from the water, eat on board before mid-afternoon and head back without rushing as the breeze builds.

In July, during the Moors and Christians festival, there is a landing re-enactment on the beach that you can watch from the water. If you coincide with those days, book ahead and expect plenty of boats at anchor and passage restrictions around the landing area.

Most boats need a licence to be handled. If you hold none, the alternatives are a small boat or hiring with a skipper. Each boat's card states which applies, and that card is what counts.`,
    contenidoDe: `Abgelegt wird am Club Náutico La Vila Joiosa, einem mittelgroßen Hafen direkt an der Altstadt. Er ist die ruhige Alternative zu Benidorm: fünfzehn Minuten Fahrt entfernt, und im August herrscht hier deutlich weniger Verkehr — an Land wie auf dem Wasser. Den Bootsschlüssel holen Sie im Büro des Clubs am Steg ab, zur vereinbarten Zeit und nach der Sicherheitseinweisung; das Boot wird dort übergeben, nur wenige Schritte von der Altstadt entfernt. Das Parken ist einfacher als an den meisten Häfen dieser Küste: In den Straßen und auf den Flächen rund um den Hafen gibt es Platz, vor allem am frühen Morgen, und im August parken Sie deutlich besser als in Benidorm.

Der Grund, von hier auszufahren, ist die Fassade des Ortes. Die bunten Häuser der Vila wurden so gestrichen, damit die Fischer sie vom Meer aus erkennen konnten, und genau für diesen Blickwinkel wurden sie gemacht: Vom Land aus sehen Sie eine Straße; vom Wasser aus, zweihundert Meter vor der Küste, sehen Sie den ganzen Ort wie ein Farbmuster vor dem Berg. Es ist die schönste Ansicht dieser Küste, und fast niemand nutzt sie.

Die Entfernungen sind kurz. Wenige Minuten nordöstlich liegen die Cala Bol Nou am Fuß einer ockerfarbenen Klippe und der Racó del Conill: zwei Haltepunkte, die in der Hauptsaison erstaunlich ruhig bleiben, weil der Zugang vom Land beschwerlich ist. Nach Südwesten führt die Küste zur Torre de Xarco und nach etwas mehr als zwanzig Minuten nach El Campello. Die Insel von Benidorm liegt eine gute Viertelstunde südlich, und nach etwa vierzig Minuten, hinter El Campello, erreichen Sie das Cabo de las Huertas. Mit einer Stunde passt der ganze Bogen in den Tag: die ockerfarbenen Buchten im Nordosten, die Insel im Süden und die Küste von San Juan als äußerste Grenze im Südwesten.

Wie an der gesamten Küste kommt auch hier im Sommer die nachmittägliche Brise aus Osten auf, zwischen drei und fünf Uhr, und frischt den Tag auf. Die funktionierende Routine: früh ablegen, die Fassade vom Wasser aus vor sich haben, vor dem Nachmittag an Bord essen und ohne Hektik zurückkehren, wenn die Brise auffrischt.

Im Juli, während der Mauren und Christen, gibt es eine Landung am Strand, die sich vom Wasser aus sehen lässt. Wenn Sie diese Tage treffen, buchen Sie frühzeitig und rechnen Sie mit vielen Booten vor Anker und Durchfahrtseinschränkungen rund um das Landungsgebiet.

Die meisten Boote erfordern einen Führerschein. Wenn Sie keinen besitzen, sind die Alternativen ein kleines Boot oder die Anmietung mit Skipper. Auf der Karte jedes Bootes steht, was gilt — und diese Karte ist maßgeblich.`,
    sinLicencia: `Villajoyosa es la alternativa tranquila a Benidorm para alquilar sin titulación: está a quince minutos de navegación y en agosto tiene bastante menos tráfico, dentro y fuera del agua. Se sale del Club Náutico La Vila Joiosa, pegado al casco antiguo.

Sin ningún título puedes llevar una embarcación pequeña, de día y sin alejarte de la costa, después de la explicación de seguridad en el pantalán. Y aquí eso basta para lo que la mayoría viene a ver: la fachada del pueblo desde el agua. Las casas de colores de la Vila se pintaron así para que los pescadores las distinguieran desde el mar, y ese es el punto de vista para el que fueron hechas. A doscientos metros de la orilla tienes el pueblo entero como un tablero de color contra la montaña. No hace falta ni alejarse.

Hacia el noreste, a pocos minutos, están la Cala Bol Nou, de arena y roca al pie de un acantilado ocre, y el Racó del Conill. En temporada alta siguen razonablemente tranquilas porque el acceso por tierra es incómodo, y se llega de sobra con un barco sin titulación.

Con patrón el día se estira: la Isla de Benidorm queda a un cuarto de hora largo, y hacia el suroeste la costa lleva a la Torre de Xarco y a El Campello.

Si coincides en julio con los Moros y Cristianos, hay un desembarco en la playa que se ve desde el agua. Reserva con antelación y cuenta con que habrá restricciones de paso en esa zona esos días.`,
    sinLicenciaEn: `Villajoyosa is the quiet alternative to Benidorm for hiring a boat without a qualification: it is fifteen minutes' sailing away and in August there is considerably less traffic, both on the water and on the roads. You leave from the Club Náutico La Vila Joiosa, a medium-sized harbour right next to the old town.

Without any qualification you can take a small boat, by day and without going far from the coast, after the safety briefing at the pontoon. And here that is enough for what most people come to see: the town's facade from the water. The coloured houses of La Vila were painted like that so that the fishermen could tell them apart from the sea, and that is the viewpoint they were made for. From the shore you see a street; from the water, two hundred metres off the beach, you see the whole town laid out like a board of colour against the mountain. It is the best view of this coast and almost nobody makes use of it, and you do not even need to go far to get it.

To the north-east, a few minutes away, are Cala Bol Nou, of sand and rock at the foot of an ochre cliff, and Racó del Conill. Both remain reasonably quiet in high season because the access on foot is awkward, and both are easily reached with a boat that needs no licence.

With a skipper the day stretches out: the island of Benidorm is a good quarter of an hour away, and to the south-west the coast leads past the Torre de Xarco and on to El Campello in a little over twenty minutes. That turns a morning trip into a full-day programme without any long crossing.

And if you happen to be there in July during the Moors and Christians festival, there is a landing on the beach that can be seen from the water. Book ahead if your dates coincide, and expect plenty of boats anchored and passage restrictions in the area of the landing on those days.`,
    sinLicenciaDe: `Villajoyosa ist die ruhige Alternative zu Benidorm, wenn Sie ohne Führerschein ein Boot mieten möchten: Es liegt fünfzehn Minuten Fahrt entfernt und hat im August deutlich weniger Verkehr, auf dem Wasser wie an Land. Gestartet wird vom Club Náutico La Vila Joiosa, einem mittelgroßen Hafen direkt an der Altstadt.

Ohne Führerschein dürfen Sie ein kleines Boot führen, bei Tag und ohne sich weit von der Küste zu entfernen, nach der Sicherheitseinweisung am Steg. Und hier reicht das für das, was die meisten sehen möchten: die Fassade der Stadt vom Wasser aus. Die bunten Häuser von La Vila wurden genau deshalb gestrichen, damit die Fischer sie vom Meer aus unterscheiden konnten, und genau für diesen Blickwinkel wurden sie gemacht. Vom Land aus sehen Sie eine Straße; vom Wasser aus, zweihundert Meter vor dem Strand, haben Sie die ganze Stadt wie ein Farbbrett vor dem Berg. Es ist der beste Blick dieser Küste, und fast niemand nutzt ihn – und Sie müssen nicht einmal weit hinausfahren, um ihn zu bekommen.

Nach Nordosten, nur wenige Minuten entfernt, liegen die Cala Bol Nou, Sand und Fels am Fuß einer ockerfarbenen Klippe, und das Racó del Conill. Beide bleiben in der Hochsaison erstaunlich ruhig, weil der Zugang zu Land unbequem ist, und beide erreichen Sie mühelos mit einem Boot ohne Führerschein.

Mit Skipper dehnt sich der Tag: Die Insel Benidorm liegt eine gute Viertelstunde entfernt, und nach Südwesten führt die Küste an der Torre de Xarco vorbei und in etwas über zwanzig Minuten weiter nach El Campello. So wird aus einem Vormittagstrip ein ganzer Tagesplan, ohne lange Überfahrt.

Und wenn Sie im Juli zufällig während des Festes der Mauren und Christen dort sind, gibt es eine Landung am Strand, die man vom Wasser aus sehen kann. Reservieren Sie früh, wenn Ihre Termine zusammenfallen, und rechnen Sie damit, dass in diesen Tagen viele Boote ankern und es Durchfahrtsbeschränkungen im Bereich der Landung gibt.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Se ven las casas de colores sin necesidad de licencia?",
        respuesta:
          "Sí, y es el mejor motivo para alquilar aquí. Con una embarcación de las que se llevan sin título, a doscientos metros de la orilla ya tienes el pueblo entero de frente contra la montaña. No hace falta alejarse nada.",
      },
      {
        pregunta: "¿Qué calas alcanzo sin título desde Villajoyosa?",
        respuesta:
          "La Cala Bol Nou y el Racó del Conill, a pocos minutos rumbo noreste, de arena y roca bajo acantilado ocre. Al tener acceso incómodo por tierra, en verano siguen bastante más tranquilas que las playas del pueblo.",
      },
      {
        pregunta: "¿Es mejor Villajoyosa o Benidorm si no tengo licencia?",
        respuesta:
          "Están a quince minutos de navegación, así que se llega a lo mismo. Villajoyosa tiene menos tráfico y aparca mejor en agosto; Benidorm está más cerca de la isla y de los hoteles.",
      },
    ],
    latitud: 38.5058,
    longitud: -0.2331,
    mesesAlta: "7,8",
    destacado: false,
    orden: 12,
    puertos: [
      { slug: "villajoyosa", nombre: "Club Náutico La Vila Joiosa", latitud: 38.5047, longitud: -0.2311 },
    ],
    preguntas: [
      {
        pregunta: "¿Se ven bien las casas de colores desde el barco?",
        respuesta:
          "Se ven mucho mejor que desde tierra: se pintaron precisamente para distinguirse desde el mar. A doscientos metros de la orilla tienes el pueblo entero de frente contra la montaña. Es el mejor plano de esta costa.",
        preguntaEn: "Do you get a good view of the coloured houses from the boat?",
        respuestaEn:
          "Much better than from the shore: they were painted precisely so that they could be distinguished from the sea. Two hundred metres off the beach you have the whole town in front of you against the mountain. It is the best view on this stretch of coast.",
        preguntaDe: "Sieht man die bunten Häuser vom Boot aus gut?",
        respuestaDe:
          "Viel besser als vom Land: Sie wurden genau dafür gestrichen, dass man sie vom Meer aus erkennt. Zweihundert Meter vor der Küste haben Sie den ganzen Ort vor sich, mit dem Berg im Hintergrund. Es ist der beste Blick dieser Küste.",
      },
      {
        pregunta: "¿Es mejor salir de Villajoyosa o de Benidorm?",
        respuesta:
          "Están a quince minutos de navegación, así que desde cualquiera de los dos llegas a lo mismo. Villajoyosa tiene menos tráfico y aparca mejor en agosto; Benidorm está más cerca de la isla y de los hoteles.",
        preguntaEn: "Is it better to set off from Villajoyosa or from Benidorm?",
        respuestaEn:
          "They are fifteen minutes' sailing apart, so from either one you can reach the same places. Villajoyosa has less traffic and better parking in August; Benidorm is closer to the island and to the hotels.",
        preguntaDe: "Ist es besser, von Villajoyosa oder von Benidorm auszulaufen?",
        respuestaDe:
          "Die beiden liegen fünfzehn Minuten Fahrzeit auseinander, von beiden aus erreicht man also dieselben Ziele. Villajoyosa hat weniger Verkehr und im August bessere Parkmöglichkeiten; Benidorm liegt näher an der Insel und an den Hotels.",
      },
      {
        pregunta: "¿Qué calas hay cerca de Villajoyosa?",
        respuesta:
          "La Cala Bol Nou y el Racó del Conill hacia el noreste, ambas a pocos minutos, de arena y roca bajo acantilado ocre. Al tener acceso incómodo por tierra, en verano siguen bastante más tranquilas que las playas del pueblo.",
        preguntaEn: "Which coves are near Villajoyosa?",
        respuestaEn:
          "Cala Bol Nou and Racó del Conill to the north-east, both a few minutes away, with sand and rock beneath an ochre cliff. Because access by land is awkward, they stay considerably quieter in summer than the town's beaches.",
        preguntaDe: "Welche Buchten gibt es in der Nähe von Villajoyosa?",
        respuestaDe:
          "Die Cala Bol Nou und das Racó del Conill im Nordosten, beide nur wenige Minuten entfernt, mit Sand und Fels unter einer ockerfarbenen Klippe. Da der Zugang über Land beschwerlich ist, sind sie im Sommer deutlich ruhiger als die Strände des Ortes.",
      },
    ],
  },
  {
    slug: "el-campello",
    nombre: "El Campello",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "costa",
    titular: "Alquiler de barcos en El Campello",
    descripcion:
      "La Illeta dels Banyets y el Cabo de las Huertas a un paso. La salida de Alicante sin la saturación de Alicante.",
    descripcionEn:
      "The Illeta dels Banyets and Cabo de las Huertas within reach. Alicante's sailing, without Alicante's crowds.",
    descripcionDe:
      "Die Illeta dels Banyets und das Cabo de las Huertas gleich nebenan. Alicante auf dem Wasser, ohne das Gedränge von Alicante.",
    contenido: `El Club Náutico El Campello está a veinte minutos en coche del centro de Alicante y a diez de la playa de San Juan, y en agosto se entra y se sale con la mitad de agobio que en la Marina Deportiva. Para quien vive en Alicante o veranea en San Juan, es la salida práctica.

Justo al lado del puerto está la Illeta dels Banyets, una lengua de roca con yacimiento arqueológico que desde el agua se entiende mucho mejor que desde el paseo: se ven los viveros de peces excavados en la roca, que es lo que le da nombre. A cinco minutos.

Hacia el sur, en un cuarto de hora largo, se llega al Cabo de las Huertas, que es el mejor tramo de fondeo de todo el entorno de Alicante: la Cala Cantalars, la Palmera y los Judíos, calas pequeñas de roca con agua transparente y fondo claro. Hacia el norte, la Cala Lanuza y la Cala Baeza dan fondeos rápidos para un baño sin alejarse.

Con día bueno, Tabarca está a algo más de una hora rumbo sur. No es la salida corta de aquí —para eso está Santa Pola, mucho más cerca de la isla—, pero se hace de sobra en una jornada completa. El viento dominante en verano es la brisa de la tarde del este y sureste, que levanta un picado incómodo a partir de media tarde: aquí también funciona salir temprano.`,
    contenidoEn: `You leave from the Club Náutico El Campello, twenty minutes by car from Alicante's centre and ten from San Juan beach. In August you get in and out with half the hassle of the Marina Deportiva, which makes it the practical departure for anyone living in Alicante or spending the summer at San Juan. The boat key is collected at the club office, on the pontoon, at the agreed time after the safety briefing. Parking is among the best in the province in high season: there are parking areas by the port and along the promenade, and if you arrive first thing you find a space without circling.

Just outside the harbour mouth is the Illeta dels Banyets, five minutes away: a tongue of rock with an archaeological site that makes much more sense from the water than from the promenade, because you can see the fish nurseries carved into the stone that give it its name.

A good quarter of an hour south lies Cabo de las Huertas, the best stretch of coves around Alicante: Cala Cantalars, La Palmera and Los Judíos, small, with clear water and far fewer people than at any beach. To the north, Cala Lanuza and Cala Baeza offer a quick swim without going far. Heading north along the coast, you round La Vila Joiosa in a little over twenty minutes, and at around forty minutes the Benidorm skyline appears with the Sierra Helada behind it.

On a good day, Tabarca is a little over an hour south. It is not the short trip from here — for that, Santa Pola, much closer to the island — but it is comfortably done in a full day.

The dominant summer wind is the afternoon breeze from the east and south-east, which comes in mid-afternoon, between three and five, and kicks up uncomfortable chop from that hour on. Here too the rule is to leave early: the coves in the morning, lunch on board before mid-afternoon, and back as the breeze builds.

Most boats need a licence to be handled. If you hold none, the alternatives are a small boat or hiring with a skipper. Each boat's card states whether it requires one, and that card is what counts.`,
    contenidoDe: `Abgelegt wird am Club Náutico El Campello, zwanzig Autominuten vom Zentrum Alicantes und zehn von der Playa de San Juan entfernt. Im August kommt man mit halb so viel Hektik hinein und hinaus wie an der Marina Deportiva, was diesen Hafen zur praktischen Wahl macht für alle, die in Alicante leben oder den Sommer in San Juan verbringen. Den Bootsschlüssel holen Sie im Büro des Clubs am Steg ab, zur vereinbarten Zeit und nach der Sicherheitseinweisung. Das Parken gehört in der Hauptsaison zum Besten der Provinz: Es gibt Parkflächen direkt am Hafen und entlang der Promenade, und wer am frühen Morgen kommt, findet ohne Herumfahren einen Platz.

Gleich vor der Hafeneinfahrt liegt die Illeta dels Banyets, fünf Minuten entfernt: eine Felszunge mit einer archäologischen Stätte, die sich vom Wasser aus viel besser erschließt als von der Promenade, weil man die in den Stein gehauenen Fischgehege sieht, die ihr den Namen geben.

Eine gute Viertelstunde südlich liegt das Cabo de las Huertas, der beste Buchtabschnitt rund um Alicante: die Cala Cantalars, La Palmera und Los Judíos — klein, mit klarem Wasser und deutlich weniger Menschen als an jedem Strand. Nördlich bieten die Cala Lanuza und die Cala Baeza ein schnelles Bad, ohne weit zu fahren. Richtung Norden umrunden Sie die Küste von La Vila Joiosa in etwas mehr als zwanzig Minuten, und nach etwa vierzig Minuten taucht die Skyline von Benidorm mit der Sierra Helada dahinter auf.

An guten Tagen liegt Tabarca etwas mehr als eine Stunde südlich. Es ist nicht die kurze Tour von hier — dafür ist Santa Pola da, viel näher an der Insel —, aber an einem ganzen Tag ist sie bequem zu schaffen.

Der vorherrschende Sommerwind ist die nachmittägliche Brise aus Ost und Südost, die am Nachmittag aufkommt, zwischen drei und fünf Uhr, und von dieser Stunde an eine unangenehme Kabbelsee aufwirft. Auch hier gilt: früh ablegen — die Buchten am Vormittag, das Mittagessen an Bord vor dem Nachmittag, und zurück, wenn die Brise auffrischt.

Die meisten Boote erfordern einen Führerschein. Wenn Sie keinen besitzen, sind die Alternativen ein kleines Boot oder die Anmietung mit Skipper. Auf der Karte jedes Bootes steht, ob ein Führerschein erforderlich ist, und diese Karte ist maßgeblich.`,
    sinLicencia: `El Campello es la salida práctica para quien vive en Alicante o veranea en la playa de San Juan y no tiene titulación. El Club Náutico El Campello está a veinte minutos en coche del centro y a diez de San Juan, y en agosto se entra y se sale con la mitad de agobio que en la Marina Deportiva.

Sin ningún título puedes llevar una embarcación pequeña, de día y sin alejarte, después de la explicación de seguridad en el pantalán. Y aquí eso da mucho de sí, porque lo bueno está cerca. A cinco minutos de la bocana tienes la Illeta dels Banyets, una lengua de roca con yacimiento arqueológico donde se ven los viveros de peces excavados en la piedra: desde el agua se entiende mucho mejor que desde el paseo. Hacia el norte, la Cala Lanuza y la Cala Baeza dan un baño rápido sin apenas navegar.

A un cuarto de hora largo rumbo sur está el Cabo de las Huertas, con la Cala Cantalars, la Palmera y los Judíos. Es el mejor tramo de fondeo de todo el entorno de Alicante y desde aquí queda más cerca que desde la propia ciudad.

Con patrón se abre Tabarca, a algo más de una hora rumbo sur. Se hace bien en jornada completa, aunque si el plan es solo la isla sale mejor salir de Santa Pola, que está a unas 4 millas.

El viento dominante en verano es la brisa de la tarde del este y sureste, que levanta picado a partir de media tarde. Aquí también funciona salir temprano. En la ficha de cada barco indicamos si exige título.`,
    sinLicenciaEn: `El Campello is the practical departure point for anyone who lives in Alicante or spends the summer on the beach of San Juan and does not hold a qualification. The Club Náutico El Campello is twenty minutes by car from the city centre and ten from San Juan, and in August you get in and out with half the hassle of the Marina Deportiva in Alicante, which means more time on the water and less time queueing.

Without any qualification you can take a small boat, by day and without going far, after the safety briefing at the pontoon. And here that gives you a lot, because the good things are close. Five minutes from the harbour mouth is the Illeta dels Banyets, a tongue of rock with an archaeological site where you can see the fish hatcheries carved into the stone, which is what gives the place its name; from the water they make much more sense than from the promenade. To the north, Cala Lanuza and Cala Baeza give you a quick swim with barely any sailing at all.

A good quarter of an hour to the south is the Cabo de las Huertas, with Cala Cantalars, La Palmera and Los Judíos, small coves of rock with transparent water and a light, clear bottom. It is the best anchoring stretch of the whole Alicante area, and from here it is closer than from the city itself, with parking far easier in August than at the Marina Deportiva, which makes El Campello the smarter choice if those coves are your plan.

With a skipper Tabarca opens up, a little over an hour to the south. It fits comfortably into a full day, although if the island is the whole plan you are better off leaving from Santa Pola, which is about 4 miles away; from here it is a full-day trip, not a morning one.

The dominant summer wind is the afternoon breeze from the east and south-east, which whips up a choppy sea from mid-afternoon: here too, leaving early is what works, so plan the sailing for the morning and the anchoring for the afternoon. On each boat's page we state whether it requires a qualification.`,
    sinLicenciaDe: `El Campello ist der praktische Ausgangspunkt für alle, die in Alicante wohnen oder den Sommer am Strand von San Juan verbringen und keinen Führerschein besitzen. Der Club Náutico El Campello liegt zwanzig Autominuten vom Stadtzentrum und zehn von San Juan entfernt, und im August kommt man mit halb so viel Stress hinein und hinaus wie an der Marina Deportiva in Alicante – mehr Zeit auf dem Wasser, weniger Zeit im Stau.

Ohne Führerschein dürfen Sie ein kleines Boot führen, bei Tag und ohne sich weit zu entfernen, nach der Sicherheitseinweisung am Steg. Und hier bringt das eine Menge, denn das Beste liegt nahe. Fünf Minuten von der Hafeneinfahrt entfernt liegt die Illeta dels Banyets, eine Felszunge mit einer archäologischen Stätte, an der man die in den Stein gehauenen Fischbecken sieht, die dem Ort seinen Namen geben; vom Wasser aus versteht man sie viel besser als von der Uferpromenade. Nach Norden bieten die Cala Lanuza und die Cala Baeza ein schnelles Bad, fast ohne zu fahren.

Eine gute Viertelstunde nach Süden liegt das Cabo de las Huertas mit der Cala Cantalars, der Palmera und den Judíos – kleine Felsbuchten mit klarem Wasser und hellem Grund. Es ist das beste Ankergebiet der ganzen Umgebung von Alicante, und von hier aus ist es näher als von der Stadt selbst, und das Parken ist im August viel einfacher als an der Marina Deportiva – El Campello ist also die klügere Wahl, wenn diese Buchten Ihr Plan sind.

Mit Skipper öffnet sich Tabarca, etwas mehr als eine Stunde nach Süden. Das passt bequem in einen ganzen Tag, auch wenn Sie für die Insel allein besser von Santa Pola aus starten, das etwa 4 Seemeilen entfernt liegt; von hier aus ist es ein Ganztagstrip, kein Vormittagsausflug.

Der vorherrschende Sommerwind ist die Nachmittagsbrise aus Ost und Südost, die ab dem Nachmittag eine unruhige See aufbaut: Auch hier gilt, früh aufzubrechen – planen Sie die Fahrt also für den Vormittag und das Ankern für den Nachmittag. Auf der Seite jedes Boots steht, ob ein Führerschein erforderlich ist.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Merece la pena salir de El Campello en vez de Alicante?",
        respuesta:
          "Si vas a las calas del Cabo de las Huertas, sí: quedan más cerca y se aparca mucho mejor en agosto. Para ir a Tabarca, Alicante y sobre todo Santa Pola están más cerca de la isla.",
      },
      {
        pregunta: "¿Qué puedo ver sin licencia desde El Campello?",
        respuesta:
          "La Illeta dels Banyets a cinco minutos, con sus viveros de peces excavados en la roca, y las calas Lanuza y Baeza hacia el norte. A un cuarto de hora largo, el Cabo de las Huertas y sus calas de roca.",
      },
      {
        pregunta: "¿Se llega a Tabarca desde El Campello?",
        respuesta:
          "Con patrón sí, en algo más de una hora rumbo sur, y da para una jornada completa. Sin titulación queda fuera de alcance. Si el plan es solo la isla, desde Santa Pola son unas 4 millas.",
      },
    ],
    latitud: 38.4285,
    longitud: -0.4,
    mesesAlta: "7,8",
    destacado: false,
    orden: 13,
    puertos: [
      { slug: "el-campello", nombre: "Club Náutico El Campello", latitud: 38.4283, longitud: -0.3921 },
    ],
    preguntas: [
      {
        pregunta: "¿Es mejor salir de El Campello o de Alicante?",
        respuesta:
          "Para llegar al Cabo de las Huertas y sus calas, El Campello está más cerca y se aparca mucho mejor en agosto. Para ir a Tabarca, Alicante y sobre todo Santa Pola quedan bastante más cerca de la isla.",
        preguntaEn: "Is it better to set off from El Campello or from Alicante?",
        respuestaEn:
          "For reaching Cabo de las Huertas and its coves, El Campello is closer and parking is much easier in August. For Tabarca, Alicante and above all Santa Pola are considerably nearer the island.",
        preguntaDe: "Ist es besser, von El Campello oder von Alicante auszulaufen?",
        respuestaDe:
          "Für das Cabo de las Huertas und seine Buchten liegt El Campello näher, und im August gibt es dort viel bessere Parkmöglichkeiten. Für Tabarca liegen Alicante und vor allem Santa Pola deutlich näher an der Insel.",
      },
      {
        pregunta: "¿Qué es la Illeta dels Banyets y se ve desde el barco?",
        respuesta:
          "Es una lengua de roca junto al puerto con un yacimiento arqueológico y unos viveros de peces excavados en la piedra. Desde el agua se entienden mucho mejor que desde el paseo, y está a cinco minutos de la bocana.",
        preguntaEn: "What is the Illeta dels Banyets and can it be seen from the boat?",
        respuestaEn:
          "It is a tongue of rock next to the harbour with an archaeological site and fish tanks carved into the stone. They make much more sense from the water than from the promenade, and it is five minutes from the harbour mouth.",
        preguntaDe: "Was ist die Illeta dels Banyets, und sieht man sie vom Boot aus?",
        respuestaDe:
          "Sie ist eine Felszunge direkt am Hafen mit einer archäologischen Fundstätte und in den Stein gehauenen Fischbecken. Vom Wasser aus erschließen sie sich viel besser als von der Promenade, und sie liegt fünf Minuten von der Hafeneinfahrt entfernt.",
      },
      {
        pregunta: "¿Se puede ir a Tabarca desde El Campello?",
        respuesta:
          "Sí, está a algo más de una hora rumbo sur y se hace bien en una jornada completa. Si el plan es solo Tabarca, sale mejor salir de Santa Pola, que está a unas 4 millas de la isla.",
        preguntaEn: "Can you get to Tabarca from El Campello?",
        respuestaEn:
          "Yes, it is just over an hour away to the south and fits well into a full day. If the plan is only Tabarca, it is better to set off from Santa Pola, which is about 4 miles from the island.",
        preguntaDe: "Kann man von El Campello nach Tabarca fahren?",
        respuestaDe:
          "Ja, es liegt etwas über eine Stunde in südlicher Richtung und passt gut in einen ganzen Tag. Wenn der Plan nur Tabarca ist, lohnt es sich, von Santa Pola auszulaufen, das etwa 4 Seemeilen von der Insel entfernt liegt.",
      },
    ],
  },
  {
    slug: "torrevieja",
    nombre: "Torrevieja",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "ciudad",
    titular: "Alquiler de barcos en Torrevieja",
    descripcion:
      "Tres marinas, mar tranquilo y calas de roca baja hasta Cabo Roig. La costa más fácil de la provincia para empezar.",
    descripcionEn:
      "Three marinas, calm water and low rocky coves all the way to Cabo Roig. The easiest coast in the province to start on.",
    descripcionDe:
      "Drei Marinas, ruhiges Wasser und flache Felsbuchten bis Cabo Roig. Die einfachste Küste der Provinz für den Anfang.",
    contenido: `Torrevieja tiene tres salidas: la Marina Internacional, el Real Club Náutico de Torrevieja y Marina Salinas, todas dentro del mismo puerto y a un paso del centro. Es el puerto con más plazas de la provincia y el que menos problemas de aparcamiento da en verano.

Esta es la costa más amable de Alicante para quien empieza. No hay cabos grandes ni acantilados que compliquen la navegación: la orilla es de roca baja y calas cortas, el mar suele estar más plano que en la Marina Alta y las distancias entre fondeos son pequeñas. Con levante entra algo de mar de fondo, pero la mayoría de días de verano se navega cómodo.

Hacia el norte, en diez minutos, están el Cabo Cervera y la Cala Ferrís, y algo más allá la playa de La Mata, larga y de arena, buena para fondear a comer. Hacia el sur empieza la Orihuela Costa: Playa Flamenca, la Cala Capitán, Cabo Roig y Campoamor, todas a menos de media hora, con fondeos de arena entre roca y agua clara.

Es también la zona con más residentes británicos, nórdicos y neerlandeses de la costa, así que aquí es normal alquilar en inglés y encontrar patrones que lo hablan. Si necesitas la reserva y el contacto en tu idioma, en Torrevieja no es una excepción sino lo habitual.`,
    contenidoEn: `Torrevieja is sailed from a single harbour complex that holds three marinas: Marina Internacional Torrevieja, the Real Club Náutico de Torrevieja and Marina Salinas. They sit side by side, a step from the town centre, and it hardly matters which one you leave from: this is the port with the most berths in the province and the fewest parking headaches in summer. You collect the boat key at the office of the marina you booked with, on the pontoon itself, at the agreed time, right after the safety briefing. As for the car, the parking areas around the harbour usually have space even in August; first thing in the morning you park without circling.

This is the gentlest stretch of the Alicante coast for anyone starting out: no big headlands, no cliffs to complicate the navigation, a low rocky shore, short coves and small distances between stops. A levante brings in some swell, but most summer days you sail comfortably, and almost everything worth seeing lies less than an hour from the port.

Heading north, Cabo Cervera and Cala Ferrís come up in ten minutes, and at around twenty you reach Playa de La Mata, long and sandy, the classic stop for lunch at anchor. Heading south begins the Orihuela Costa: Cala Capitán is about twenty minutes away, Cabo Roig and Campoamor under half an hour, and at around forty minutes the low shore runs on to Punta Prima, the last corner of the province before Murcia. With an hour to play with, the day is complete: enough to run down there and back without rushing, or north past La Mata towards the Guardamar dunes.

The afternoon wind sets the rhythm of the day. In summer the easterly breeze comes in mid-afternoon, between three and five, and kicks up a little swell, so the routine that works is to leave early, work the coves while the water is calm, eat on board before mid-afternoon and head back as the breeze freshens.

Most boats need a licence to be handled. If you hold none, the alternatives are a small boat or hiring with a skipper, and each boat's card states which applies. One practical note to close: this is the area with the most British, Nordic and Dutch residents on the whole coast, so hiring in English is the norm and there are skippers who speak it.`,
    contenidoDe: `Torrevieja wird von einem einzigen Hafenareal aus befahren, das drei Marinas umfasst: die Marina Internacional Torrevieja, den Real Club Náutico de Torrevieja und die Marina Salinas. Sie liegen direkt nebeneinander, einen Katzensprung vom Zentrum entfernt, und es spielt kaum eine Rolle, von welcher Sie ablegen: Der Hafen hat die meisten Liegeplätze der Provinz und bereitet im Sommer am wenigsten Parkprobleme. Den Bootsschlüssel holen Sie im Büro der Marina ab, bei der Sie gebucht haben, direkt am Steg, zur vereinbarten Zeit und gleich nach der Sicherheitseinweisung. Was das Auto betrifft: Die Parkflächen rund um das Hafenareal haben meist auch im August Platz; am frühen Morgen parken Sie, ohne herumzufahren.

Dies ist der sanfteste Küstenabschnitt Alicantes für alle, die anfangen: keine großen Kaps, keine Klippen, die die Navigation erschweren, ein flaches Felsufer, kurze Buchten und kleine Abstände zwischen den Haltepunkten. Bei Levante (Ostwind) kommt etwas Dünung herein, aber an den meisten Sommertagen fahren Sie bequem, und fast alles Sehenswerte liegt weniger als eine Stunde vom Hafen entfernt.

Richtung Norden erreichen Sie nach zehn Minuten Cabo Cervera und Cala Ferrís, nach etwa zwanzig Minuten den langen Sandstrand Playa de La Mata, die klassische Station für ein Mittagessen vor Anker. Richtung Süden beginnt die Orihuela Costa: Cala Capitán liegt etwa zwanzig Minuten entfernt, Cabo Roig und Campoamor weniger als eine halbe Stunde, und nach etwa vierzig Minuten zieht sich das flache Ufer bis Punta Prima, dem letzten Winkel der Provinz vor Murcia. Mit einer Stunde Zeit ist der Tag komplett: Es reicht, bis dorthin zu fahren und ohne Eile zurückzukehren, oder nördlich an La Mata vorbei zu den Dünen von Guardamar.

Der Nachmittagswind gibt den Takt des Tages vor. Im Sommer kommt die östliche Brise am Nachmittag auf, zwischen drei und fünf Uhr, und macht etwas Dünung; die funktionierende Routine ist daher: früh ablegen, die Buchten bei ruhigem Wasser anfahren, vor dem Nachmittag an Bord essen und zurückkehren, wenn die Brise auffrischt.

Die meisten Boote erfordern einen Führerschein. Wenn Sie keinen besitzen, sind die Alternativen ein kleines Boot oder die Anmietung mit Skipper; auf der Karte jedes Bootes steht, was gilt. Ein letzter praktischer Hinweis: Dies ist die Gegend mit den meisten britischen, skandinavischen und niederländischen Bewohnern der gesamten Küste — auf Englisch zu mieten ist hier die Norm, und es gibt Skipper, die Englisch sprechen.`,
    sinLicencia: `Si no tienes titulación y quieres alquilar por primera vez, esta es la costa más fácil de la provincia. No hay cabos grandes ni acantilados que compliquen la navegación: la orilla es de roca baja y calas cortas, el mar suele estar más plano que en la Marina Alta y las distancias entre fondeos son pequeñas.

Se sale de la Marina Internacional, del Real Club Náutico de Torrevieja o de Marina Salinas, las tres dentro del mismo puerto y a un paso del centro. Es el puerto con más plazas de la provincia y el que menos problemas de aparcamiento da en verano, que no es poco en agosto.

Sin ningún título puedes llevar una embarcación pequeña, de día y sin alejarte, tras la explicación de seguridad en el pantalán. Con eso llegas en diez minutos al Cabo Cervera y a la Cala Ferrís, y algo más allá a la playa de La Mata, larga y de arena, buena para fondear a comer. Es un radio corto, pero aquí el radio corto ya da un día entero.

Con patrón se abre la Orihuela Costa hacia el sur: Playa Flamenca, la Cala Capitán, Cabo Roig y Campoamor, todas a menos de media hora, con fondeos de arena entre roca y agua clara.

Una cosa útil si no hablas español: esta es la zona con más residentes británicos, nórdicos y neerlandeses de la costa, así que alquilar en inglés aquí es lo normal y hay patrones que lo hablan. La reserva, el contrato y el contacto con el patrón los tienes en tu idioma.`,
    sinLicenciaEn: `If you have no boating qualification and want to hire for the first time, this is the easiest coast in the province. There are no big capes or cliffs to complicate navigation: the shoreline is low rock with short coves, the sea is usually flatter than in the Marina Alta and the distances between anchorages are small, so you can head out and come back without long crossings. With a levante (easterly) some swell comes in, but on most summer days the sailing is comfortable.

Torrevieja lies at the southern end of the Costa Blanca, in the province of Alicante. You set out from Marina Internacional, the Real Club Náutico de Torrevieja or Marina Salinas, all three inside the same port and a step from the centre. It is the port with the most berths in the province and the one that gives the fewest parking problems in summer, which is saying something in August.

With no qualification at all you can take a small boat, for daytime use only and without going far, after the safety briefing at the pontoon. With that you reach Cabo Cervera and Cala Ferrís in ten minutes, and a little further on the long sandy beach of La Mata, a good spot to anchor for lunch. It is a short radius, but here a short radius already gives you a whole day.

With a skipper the Orihuela Costa opens up to the south: Playa Flamenca, Cala Capitán, Cabo Roig and Campoamor, all under half an hour away, with clear water. The coves sit so close to one another that you can link several in a single outing.

One useful thing if you do not speak Spanish: this is the area with the most British, Nordic and Dutch residents on the coast, so hiring in English here is the norm and there are skippers who speak it. The booking, the contract and your contact with the skipper are all handled in your language, which makes this one of the easiest coasts in the province for English speakers.`,
    sinLicenciaDe: `Wenn Sie keine Befähigung haben und zum ersten Mal mieten möchten, ist dies die einfachste Küste der Provinz. Es gibt keine großen Kaps oder Klippen, die die Navigation erschweren: Das Ufer besteht aus niedrigem Fels und kurzen Buchten, das Meer ist meist ruhiger als in der Marina Alta, und die Abstände zwischen den Ankerplätzen sind klein, sodass Sie auslaufen und ohne lange Überfahrten zurückkehren können. Bei Levante (Ostwind) kommt etwas Dünung herein, aber an den meisten Sommertagen lässt es sich bequem fahren.

Torrevieja liegt am südlichen Ende der Costa Blanca, in der Provinz Alicante. Sie laufen von der Marina Internacional, dem Real Club Náutico de Torrevieja oder der Marina Salinas aus, alle drei im selben Hafen und nur einen Schritt vom Zentrum entfernt. Es ist der Hafen mit den meisten Liegeplätzen der Provinz und derjenige, der im Sommer am wenigsten Parkprobleme bereitet, was im August schon etwas heißt.

Ohne jede Befähigung können Sie ein kleines Boot führen, nur bei Tag und ohne sich weit zu entfernen, nach der Sicherheitseinweisung am Steg. Damit erreichen Sie das Cabo Cervera und die Cala Ferrís in zehn Minuten und etwas weiter die lange Sandbucht von La Mata, einen guten Ort zum Ankern und Mittagessen. Es ist ein kurzer Aktionsradius, aber hier reicht ein kurzer Aktionsradius bereits für einen ganzen Tag.

Mit Skipper öffnet sich die Orihuela Costa nach Süden: Playa Flamenca, die Cala Capitán, Cabo Roig und Campoamor, alle in weniger als einer halben Stunde, mit klarem Wasser. Die Buchten liegen so nah beieinander, dass Sie mehrere an einem einzigen Ausflug miteinander verbinden können.

Eine nützliche Sache, wenn Sie kein Spanisch sprechen: Dies ist die Gegend mit den meisten britischen, nordischen und niederländischen Einwohnern an der Küste, sodass das Mieten auf Englisch hier normal ist und es Skipper gibt, die es sprechen. Die Buchung, der Vertrag und der Kontakt mit dem Skipper laufen in Ihrer Sprache, was diese Küste für englischsprachige Gäste zu einer der einfachsten der Provinz macht.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Es Torrevieja fácil para alquilar sin experiencia ni licencia?",
        respuesta:
          "Es la costa más fácil de la provincia. No hay cabos grandes que compliquen la navegación, la orilla es de roca baja y las calas están muy cerca unas de otras, así que se sale y se vuelve sin travesías largas.",
      },
      {
        pregunta: "¿Adónde llego sin título desde Torrevieja?",
        respuesta:
          "Al Cabo Cervera y la Cala Ferrís en unos diez minutos, y algo más allá a la playa de La Mata, de arena y buena para fondear a comer. Con patrón se abre toda la Orihuela Costa hacia el sur.",
      },
      {
        pregunta: "¿Puedo alquilar y navegar en inglés en Torrevieja?",
        respuesta:
          "Sí. Es la zona con más residentes británicos y nórdicos de la costa, así que es lo habitual y hay patrones que hablan inglés. La reserva, el contrato y el contacto con el patrón los tienes en tu idioma.",
      },
    ],
    latitud: 37.9787,
    longitud: -0.6822,
    mesesAlta: "7,8",
    destacado: false,
    orden: 14,
    puertos: [
      { slug: "marina-internacional", nombre: "Marina Internacional Torrevieja", latitud: 37.9744, longitud: -0.6856 },
      { slug: "rcn-torrevieja", nombre: "Real Club Náutico de Torrevieja", latitud: 37.9769, longitud: -0.6822 },
    ],
    preguntas: [
      {
        pregunta: "¿Es Torrevieja buena costa para alquilar sin experiencia?",
        respuesta:
          "Es la más fácil de la provincia. No hay cabos grandes que compliquen la navegación, la orilla es de roca baja y las calas están muy cerca unas de otras, así que se sale y se vuelve sin travesías largas.",
        preguntaEn: "Is Torrevieja a good coast for hiring without experience?",
        respuestaEn:
          "It is the easiest in the province. There are no big capes to complicate navigation, the shoreline is low rock and the coves are very close together, so you can go out and come back without long crossings.",
        preguntaDe: "Ist Torrevieja eine gute Küste, um ohne Erfahrung zu mieten?",
        respuestaDe:
          "Es ist die einfachste der Provinz. Es gibt keine großen Kaps, die die Navigation erschweren, das Ufer besteht aus flachem Fels, und die Buchten liegen sehr dicht beieinander – man fährt also ohne lange Überfahrten raus und wieder zurück.",
      },
      {
        pregunta: "¿Qué calas hay hacia Orihuela Costa?",
        respuesta:
          "Playa Flamenca, la Cala Capitán, Cabo Roig y Campoamor, todas a menos de media hora rumbo sur, con fondeos de arena entre roca. Hacia el norte quedan el Cabo Cervera, la Cala Ferrís y La Mata.",
        preguntaEn: "Which coves are there towards Orihuela Costa?",
        respuestaEn:
          "Playa Flamenca, Cala Capitán, Cabo Roig and Campoamor, all less than half an hour heading south. To the north there are Cabo Cervera, Cala Ferrís and La Mata.",
        preguntaDe: "Welche Buchten gibt es Richtung Orihuela Costa?",
        respuestaDe:
          "Playa Flamenca, die Cala Capitán, Cabo Roig und Campoamor, alle weniger als eine halbe Stunde Richtung Süden. Im Norden liegen der Cabo Cervera, die Cala Ferrís und La Mata.",
      },
      {
        pregunta: "¿Puedo reservar y navegar en inglés en Torrevieja?",
        respuesta:
          "Sí. Es la zona con más residentes británicos y nórdicos de la costa, así que alquilar en inglés es lo habitual y hay patrones que lo hablan. La reserva, el contrato y el contacto con el patrón los tienes en tu idioma.",
        preguntaEn: "Can I book and sail in English in Torrevieja?",
        respuestaEn:
          "Yes. It is the area with the most British and Nordic residents on the coast, so hiring in English is the norm and there are skippers who speak it. The booking, the contract and the contact with the skipper are all in your language.",
        preguntaDe: "Kann ich in Torrevieja auf Englisch buchen und fahren?",
        respuestaDe:
          "Ja. Es ist die Gegend mit den meisten britischen und nordischen Bewohnern an der Küste, daher ist das Mieten auf Englisch der Normalfall, und es gibt Skipper, die es sprechen. Buchung, Vertrag und der Kontakt zum Skipper laufen in Ihrer Sprache.",
      },
    ],
  },
  {
    slug: "santa-pola",
    nombre: "Santa Pola",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "costa",
    titular: "Alquiler de barcos en Santa Pola",
    descripcion:
      "Tabarca a media hora, que es la salida más corta de toda la costa. Puerto grande, de pescadores, y el trampolín natural a la isla.",
    descripcionEn:
      "Tabarca half an hour away, the shortest crossing on the whole coast. A big working fishing port and the natural springboard to the island.",
    descripcionDe:
      "Tabarca in einer halben Stunde, die kürzeste Überfahrt der ganzen Küste. Großer Fischereihafen und das natürliche Sprungbrett zur Insel.",
    contenido: `Santa Pola existe en el mapa náutico por una razón muy concreta: es el puerto más cercano a Tabarca. Son unas 4 millas, media hora de navegación, y eso lo cambia todo. Desde Alicante la isla son 11 millas y una hora larga; desde aquí es una salida de media mañana.

El puerto es grande y sigue siendo pesquero de verdad, con la lonja funcionando y las barcas de siempre amarradas al lado de las de alquiler. No tiene el postureo de otros puertos de la costa y se agradece: se aparca bien, se sale rápido y el ambiente es el de un sitio que trabaja.

La salida obligada es Tabarca. Se ve desde la bocana, así que ni siquiera hace falta saber navegar para orientarse: se pone proa a la isla y en media hora estás. Es la única isla habitada de la Comunitat Valenciana y la primera reserva marina que se declaró en España, con lo que eso implica: hay zonas donde no se puede pescar ni recoger nada, y conviene confirmar antes de salir qué está permitido ese día.

Además de la isla, la costa de aquí da más de lo que parece. El Cabo de Santa Pola cierra la bahía por el norte, con la sierra cayendo al mar y la Cala del Palmeral al pie. Hacia el sur se abre la playa del Pinet y las salinas, un tramo llano y poco visitado desde el agua.

El viento manda bastante en esta zona. El levante levanta mar de fondo en el canal entre la costa y Tabarca, y cuando entra fuerte la travesía se pone incómoda aunque sea corta. Con el parte en la mano no hay problema, pero es de los sitios donde conviene mirarlo antes de reservar y no el mismo día.`,
    contenidoEn: `Santa Pola exists on the nautical map for one very specific reason: it is the harbour closest to Tabarca. It is about 4 miles, half an hour of sailing, and that changes everything. From Alicante the island is 11 miles and a good hour away; from here it is a mid-morning trip.

The harbour is large and genuinely still a working fishing port, with the fish market in operation and the old boats moored alongside the hire boats. It does not have the flashiness of other harbours on the coast, and that is welcome: parking is easy, you get out quickly and the atmosphere is that of a place that works.

The unmissable trip is Tabarca. You can see it from the harbour mouth, so you do not even need to know how to navigate to find your bearings: point the bow at the island and you are there in half an hour. It is the only inhabited island in the Valencia region and the first marine reserve declared in Spain, with all that entails: there are areas where you cannot fish or collect anything, and it is worth checking before you set off what is allowed that day.

Besides the island, this stretch of coast offers more than it seems. Cabo de Santa Pola closes the bay to the north, with the sierra dropping into the sea and Cala del Palmeral at its foot. To the south lie the beach of El Pinet and the salt flats, a flat stretch rarely visited from the water.

The wind has quite a say in this area. The levante builds up swell in the channel between the coast and Tabarca, and when it blows hard the crossing becomes uncomfortable even though it is short. With the forecast in hand there is no problem, but it is one of those places where you should check it before booking, not on the day itself.`,
    contenidoDe: `Santa Pola steht aus einem ganz konkreten Grund auf der Seekarte: Es ist der Hafen, der Tabarca am nächsten liegt. Es sind etwa 4 Seemeilen, eine halbe Stunde Fahrt, und das ändert alles. Von Alicante sind es zur Insel 11 Seemeilen und eine gute Stunde; von hier aus ist es ein Törn für den Vormittag.

Der Hafen ist groß und nach wie vor ein echter Fischereihafen, mit funktionierender Fischauktionshalle und den alten Fischerbooten, die neben den Mietbooten festgemacht sind. Er hat nichts von dem Gepose anderer Häfen an der Küste, und das merkt man positiv: Man parkt gut, kommt schnell raus, und die Atmosphäre ist die eines Ortes, der arbeitet.

Der Pflicht-Törn ist Tabarca. Man sieht die Insel schon von der Hafeneinfahrt aus, man muss also nicht einmal navigieren können, um sich zu orientieren: Bug auf die Insel, und in einer halben Stunde ist man da. Sie ist die einzige bewohnte Insel der Region Valencia und das erste Meeresschutzgebiet, das in Spanien ausgewiesen wurde – mit allen Konsequenzen: Es gibt Zonen, in denen weder gefischt noch etwas entnommen werden darf, und man sollte vor dem Auslaufen klären, was an dem Tag erlaubt ist.

Neben der Insel hat diese Küste mehr zu bieten, als es den Anschein hat. Das Cabo de Santa Pola schließt die Bucht im Norden ab, mit der Sierra, die ins Meer fällt, und der Cala del Palmeral zu ihren Füßen. Nach Süden öffnen sich der Strand El Pinet und die Salinen, ein flacher Abschnitt, der vom Wasser aus selten besucht wird.

Der Wind hat in dieser Gegend einiges zu sagen. Der Levante wirft im Kanal zwischen Küste und Tabarca Dünung auf, und wenn er kräftig weht, wird die Überfahrt unangenehm, obwohl sie kurz ist. Mit dem Wetterbericht in der Hand gibt es kein Problem, aber es gehört zu den Orten, an denen man ihn besser vor der Buchung prüft als am selben Tag.`,
    latitud: 38.1908,
    longitud: -0.5658,
    mesesAlta: "7,8",
    destacado: true,
    orden: 8,
    puertos: [
      { slug: "santa-pola", nombre: "Puerto de Santa Pola", latitud: 38.1899, longitud: -0.5842 },
    ],
    preguntas: [
      {
        pregunta: "¿Por qué salir de Santa Pola y no de Alicante?",
        respuesta:
          "Por Tabarca. Desde aquí son unas 4 millas y media hora; desde Alicante, 11 millas y una hora larga. Si el plan es la isla, la diferencia es una mañana entera de aprovechamiento.",
        preguntaEn: "Why set off from Santa Pola and not from Alicante?",
        respuestaEn:
          "Because of Tabarca. From here it is about 4 miles and half an hour; from Alicante, 11 miles and a good hour. If the plan is the island, the difference is a whole morning gained.",
        preguntaDe: "Warum von Santa Pola auslaufen und nicht von Alicante?",
        respuestaDe:
          "Wegen Tabarca. Von hier sind es etwa 4 Seemeilen und eine halbe Stunde; von Alicante 11 Seemeilen und eine gute Stunde. Wenn der Plan die Insel ist, macht das einen ganzen Vormittag aus.",
      },
      {
        pregunta: "¿Se ve Tabarca desde el puerto de Santa Pola?",
        respuesta:
          "Sí, se ve desde la bocana. Se pone proa a la isla y en media hora estás, lo que hace de esta la salida más sencilla de orientar de toda la provincia.",
        preguntaEn: "Can you see Tabarca from the harbour of Santa Pola?",
        respuestaEn:
          "Yes, you can see it from the harbour mouth. You point the bow at the island and you are there in half an hour, which makes this the easiest trip to get your bearings on in the whole province.",
        preguntaDe: "Sieht man Tabarca vom Hafen von Santa Pola?",
        respuestaDe:
          "Ja, man sieht sie von der Hafeneinfahrt aus. Bug auf die Insel, und in einer halben Stunde ist man da – das macht diesen Törn zum am einfachsten zu orientierenden der ganzen Provinz.",
      },
      {
        pregunta: "¿Cuándo conviene no salir hacia Tabarca?",
        respuesta:
          "Con levante fuerte. Levanta mar de fondo en el canal entre la costa y la isla y la travesía se pone incómoda aunque sea corta. Conviene mirar el parte antes de reservar, no el mismo día.",
        preguntaEn: "When is it better not to set off for Tabarca?",
        respuestaEn:
          "With a strong levante. It builds up swell in the channel between the coast and the island, and the crossing becomes uncomfortable even though it is short. It is worth checking the forecast before booking, not on the day itself.",
        preguntaDe: "Wann sollte man nicht nach Tabarca aufbrechen?",
        respuestaDe:
          "Bei starkem Levante. Er wirft im Kanal zwischen Küste und Insel Dünung auf, und die Überfahrt wird unangenehm, obwohl sie kurz ist. Den Wetterbericht sollte man besser vor der Buchung prüfen, nicht am selben Tag.",
      },
    ],
    sinLicencia: `Santa Pola es, con diferencia, el mejor sitio de la provincia para alquilar sin titulación si lo que quieres es llegar a Tabarca. El motivo es la distancia: unas 4 millas, media hora de navegación, con la isla a la vista desde la bocana. Es la única salida de la costa donde ese destino entra dentro de lo razonable con una embarcación pequeña.

Sin ningún título puedes gobernar una embarcación de poca eslora y potencia limitada, de día y sin alejarte, después de la explicación de seguridad en el pantalán. Te cuentan cómo arrancar y parar, cómo fondear, hasta dónde puedes llegar y qué hacer si el motor falla. Desde aquí eso da para la bahía, la Cala del Palmeral bajo el Cabo de Santa Pola, y en día tranquilo la propia Tabarca.

Con patrón la cosa se abre y desaparece la duda: la titulación la pone él, el barco puede ser mayor y la travesía deja de depender de que el día acompañe. Es lo que elige la mayoría de los grupos, y repartido entre seis u ocho personas la diferencia por cabeza es pequeña.

Sobre Tabarca hay que decir dos cosas. La primera es que es reserva marina, la primera declarada en España, y hay zonas donde no se puede pescar ni recoger nada; el balizamiento está señalizado y hay que respetarlo. La segunda es que el levante levanta mar de fondo en el canal, y con una embarcación pequeña eso se nota mucho más que con una grande. Mira el parte antes de reservar y, si hay duda, pregunta en el pantalán: te van a decir la verdad, porque a ellos tampoco les interesa que salgas con mal día.

En la ficha de cada barco indicamos si exige titulación. Los requisitos los fija la normativa y se revisan cada cierto tiempo.`,
    sinLicenciaEn: `Santa Pola is, by a long way, the best place in the province to hire a boat without a qualification if what you want is to reach Tabarca. The reason is the distance: about 4 miles, half an hour of sailing, with the island in sight from the harbour mouth. It is the only departure point on the coast where that destination falls within what is reasonable in a small boat.

Without any qualification you can handle a boat of short length and limited power, by day and without going far, after the safety briefing at the pontoon. They tell you how to start and stop, how to anchor, how far you may go and what to do if the engine fails. From here that gives you the bay, the Cala del Palmeral beneath the Cabo de Santa Pola, and on a calm day Tabarca itself, because you keep the island in view for the whole crossing and can orient yourself without any navigation experience.

With a skipper the picture opens up and the doubt disappears: he provides the qualification, the boat can be bigger and the crossing no longer depends on the day behaving. It is what most groups choose, and split between six or eight people the difference per head is small. The port itself is large and still genuinely a fishing port, with the fish market working and the traditional boats moored next to the hire boats; there is none of the showiness of other harbours on the coast, parking is easy and you get out fast, which is appreciated when you are carrying a group.

Two things need to be said about Tabarca. The first is that it is a marine reserve, the first declared in Spain, and there are areas where you may not fish or take anything; the buoyage is marked and must be respected. The second is that the levante (easterly) raises swell in the channel, and with a small boat that is felt far more than with a large one. Check the forecast before booking, not on the day itself, and if you have any doubt ask at the pontoon: they will tell you the truth, because they have no interest in you leaving into a bad day either.

On each boat's page we state whether it requires a qualification. The requirements are set by the regulations and are reviewed from time to time.`,
    sinLicenciaDe: `Santa Pola ist mit Abstand der beste Ort der Provinz, um ohne Führerschein ein Boot zu mieten, wenn Sie nach Tabarca wollen. Der Grund ist die Entfernung: etwa 4 Seemeilen, eine halbe Stunde Fahrt, mit der Insel in Sichtweite von der Hafeneinfahrt. Es ist der einzige Startpunkt der Küste, an dem dieses Ziel mit einem kleinen Boot in einem vernünftigen Rahmen bleibt.

Ohne Führerschein dürfen Sie ein Boot mit geringer Länge und begrenzter Leistung führen, bei Tag und ohne sich weit zu entfernen, nach der Sicherheitseinweisung am Steg. Man erklärt Ihnen, wie man startet und stoppt, wie man ankert, wie weit Sie fahren dürfen und was zu tun ist, wenn der Motor ausfällt. Von hier aus reicht das für die Bucht, die Cala del Palmeral unterhalb des Cabo de Santa Pola und an ruhigen Tagen für Tabarca selbst, denn Sie behalten die Insel während der gesamten Überfahrt im Blick und orientieren sich ganz ohne Navigationserfahrung.

Mit Skipper öffnet sich das Bild und der Zweifel verschwindet: Er bringt den Führerschein mit, das Boot darf größer sein, und die Überfahrt hängt nicht mehr vom Wetter ab. Die meisten Gruppen wählen diese Lösung, und auf sechs bis acht Personen verteilt ist der Unterschied pro Kopf gering. Der Hafen selbst ist groß und nach wie vor ein echter Fischereihafen, mit funktionierender Fischauktionshalle und den traditionellen Booten direkt neben den Mietbooten; er hat nichts vom Getue anderer Häfen der Küste, das Parken ist einfach und man kommt schnell hinaus, was man zu schätzen weiß, wenn man eine Gruppe dabeihat.

Über Tabarca sind zwei Dinge zu sagen. Erstens: Es ist ein Meeresschutzgebiet, das erste, das in Spanien ausgewiesen wurde, und es gibt Bereiche, in denen weder gefischt noch etwas entnommen werden darf; die Betonnung ist markiert und muss respektiert werden. Zweitens: Der Levante (Ostwind) baut Dünung im Kanal auf, und mit einem kleinen Boot spürt man das deutlich stärker als mit einem großen. Schauen Sie sich den Wetterbericht an, bevor Sie buchen, nicht erst am Tag selbst, und fragen Sie bei Zweifeln am Steg nach: Man wird Ihnen die Wahrheit sagen, denn auch den Anbietern liegt nichts daran, dass Sie bei schlechtem Wetter auslaufen.

Auf der Seite jedes Boots steht, ob ein Führerschein erforderlich ist. Die Anforderungen legt die Regelung fest, und sie wird regelmäßig überprüft.`,
    preguntasSinLicencia: [
      {
        pregunta: "¿Puedo ir a Tabarca sin licencia desde Santa Pola?",
        respuesta:
          "En día tranquilo y con una embarcación de las que no exigen título, es la única salida de la costa donde resulta razonable: son 4 millas y se ve la isla desde la bocana. Con patrón, sin ninguna duda y con cualquier tiempo que permita salir.",
      },
      {
        pregunta: "¿Qué puedo alquilar en Santa Pola sin titulación?",
        respuesta:
          "Embarcaciones de poca eslora y potencia limitada, de día, tras la explicación de seguridad en el pantalán. Para barcos mayores hace falta título o alquilar con patrón. En cada ficha viene indicado.",
      },
      {
        pregunta: "¿Qué pasa si hay levante?",
        respuesta:
          "Que el canal entre la costa y Tabarca levanta mar de fondo, y con una embarcación pequeña se nota mucho. Con levante fuerte lo sensato es quedarse en la bahía o cambiar de día. Pregunta en el pantalán antes de salir.",
      },
    ],
  },
];
