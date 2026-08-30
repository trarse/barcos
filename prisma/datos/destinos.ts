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
    sinLicencia: `La pregunta que trae aquí a casi todo el mundo es si se puede alquilar un barco en Dénia sin tener ninguna titulación. La respuesta corta es que sí, pero por dos caminos distintos, y conviene saber cuál es el tuyo antes de reservar.

El primero es alquilar una embarcación pequeña, de las que la normativa permite gobernar sin título. Son barcos de poca eslora y potencia limitada, con un radio de navegación corto y solo de día. En el pantalán te dan una explicación de seguridad antes de salir: cómo arrancar, cómo fondear, hasta dónde puedes llegar y qué hacer si el motor se para. Con eso te vas solo, sin patrón a bordo.

El segundo, y el que elige la mayoría, es alquilar con patrón. Entonces la titulación la pone él y tú no necesitas nada: decides adónde ir, y de gobernar el barco se encarga otro. Sale más caro por día, pero si vais seis o más el reparto por persona cambia poco, y te quita el problema entero.

Desde Dénia, sin título y con un barco pequeño, se llega de sobra a Les Rotes y a la costa del Montgó. La Cova Tallada queda a unas tres millas por la cara norte del Cap de Sant Antoni: es zona de reserva marina, con sus reglas propias, y conviene preguntar en el pantalán qué está permitido ese día antes de poner rumbo. Con patrón el radio se abre y ya entran la Granadella y el tramo de Xàbia.

Los requisitos de titulación los fija la normativa y se revisan cada cierto tiempo. En la ficha de cada barco viene si exige título o no, y esa ficha es la que manda: la actualizamos cuando cambia la norma.`,
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
      },
      {
        pregunta: "¿Necesito licencia para alquilar en Dénia?",
        respuesta:
          "Depende del barco. Hay embarcaciones pequeñas, de eslora y potencia limitadas, que se gobiernan sin ningún título tras una explicación de seguridad en el pantalán; para las demás hace falta al menos licencia de navegación o PER. Los límites los fija la normativa y se revisan, así que la que manda es la ficha de cada barco: ahí dice si exige titulación.",
      },
      {
        pregunta: "¿Cuánto cuesta alquilar una lancha en Dénia?",
        respuesta:
          "Una lancha de día para seis personas sale por unos 510 € con todo incluido en temporada media: combustible estimado, limpieza, amarre, tasas e IVA. La tarifa base que anuncia la competencia para el mismo barco ronda los 260 €.",
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
    sinLicencia: `En Alicante casi todo el que pregunta por alquilar sin licencia acaba preguntando lo mismo: si se puede ir a Tabarca. La respuesta depende de cómo alquiles.

Sin ninguna titulación puedes llevar una embarcación pequeña, de potencia limitada y solo de día, tras la explicación de seguridad en el pantalán. Con eso te mueves por la costa cercana a la Marina Deportiva: el Postiguet, la playa de San Juan desde el agua y, sobre todo, el Cabo de las Huertas, que a un cuarto de hora largo tiene el mejor tramo de fondeo del entorno. La Cala Cantalars, la Palmera y los Judíos son calas pequeñas de roca con agua transparente y fondo claro, y en agosto siguen teniendo bastante menos gente que cualquier playa.

Tabarca es otra cosa. Son unas 11 millas desde el puerto de Alicante, travesía abierta, y para eso hace falta patrón: él pone la titulación y el barco puede ser mayor. Si el plan es solo Tabarca, merece la pena saber que desde Santa Pola son unas 4 millas, bastante menos travesía por el mismo destino.

Y una advertencia que conviene leer antes de ir: Tabarca es reserva marina, la primera que se declaró en España. Hay zonas donde no se puede fondear ni pescar, y el balizamiento hay que respetarlo. No es una cala cualquiera. Antes de salir, confirma qué está permitido ese día: las condiciones se revisan y cambian.

En la ficha de cada barco indicamos si exige titulación. Los requisitos los fija la normativa y se revisan periódicamente.`,
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
      },
      {
        pregunta: "¿Cuál es la mejor época para navegar en Alicante?",
        respuesta:
          "De mayo a octubre, con el agua entre 20 y 27 grados. Pero la costa alicantina permite salir todo el año: en invierno hay rachas largas de días en calma con sol y 18 grados, y los precios caen a la mitad.",
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
    sinLicencia: `Sí se puede alquilar en Jávea sin titulación, y como en el resto de la costa hay dos caminos: llevar tú una embarcación pequeña de las que la normativa permite sin título, o alquilar cualquier barco con patrón, que es quien pone la titulación.

Si te vas solo, el radio es corto y de día. Desde el puerto del Aduanas del Mar eso da para el Portitxol y la Isla del Descubridor, a unos veinte minutos rumbo sur, con fondo de arena y agua muy clara. La Cala Barraca queda al lado. Es más que suficiente para un día de baño, y son de las mejores calas del tramo.

Con patrón se abre lo demás: Els Arcs junto a la Cala Sardinera, y sobre todo la Granadella, a unos treinta y cinco minutos doblando el Cap de la Nau. Ese cabo es la razón principal para ir con alguien que sepa: separa dos mares distintos y el estado del agua puede cambiar de un lado al otro en la misma mañana.

Hay un detalle de Jávea que conviene tener en cuenta salgas como salgas. El llebeig entra casi todas las tardes a partir de las dos o las tres y levanta un picado incómodo. Sin patrón a bordo eso se nota mucho más, así que sal temprano, come fondeado antes de las dos y vuelve con el viento de popa. No es peligroso, pero es la diferencia entre un buen día y volver antes de tiempo.

En la ficha de cada barco indicamos si exige título. Los requisitos los fija la normativa y se revisan cada cierto tiempo: la ficha es la que manda y la actualizamos cuando cambian.`,
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
      },
      {
        pregunta: "¿Necesito titulación para alquilar en Jávea?",
        respuesta:
          "Depende del barco. Hay embarcaciones pequeñas que se gobiernan sin título tras una explicación de seguridad en el pantalán, y para el resto hace falta licencia de navegación o PER. Si no tienes ninguna, la opción es alquilar con patrón: él pone la titulación y tú decides la cala.",
      },
      {
        pregunta: "¿Dónde se aparca en el puerto de Jávea en agosto?",
        respuesta:
          "El aparcamiento del puerto se llena a media mañana. Yendo antes de las nueve casi siempre hay sitio, y si no, la explanada del Aduanas del Mar y las calles de detrás suelen tener hueco a cinco minutos andando.",
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
    sinLicencia: `De toda la Marina Alta, Moraira es probablemente el mejor sitio para alquilar por primera vez sin tener titulación. La bocana del Club Náutico Moraira es sencilla, el puerto es pequeño y no hay que hacer ninguna travesía larga para que el día valga la pena.

Sin ningún título puedes llevar una embarcación pequeña, de potencia limitada y solo de día, después de la explicación de seguridad en el pantalán. Con eso llegas a El Portet en menos de diez minutos: es una ensenada de arena protegida por el Cap d'Or, y con casi cualquier viento del norte o del este ahí se está bien. Es el fondeo de referencia para bañarse con niños y para un primer día sin agobios.

Con patrón el día se estira hacia el norte: la Cala Andragó, y sobre todo el tramo de Benitatxell con la Cala Moraig y els Testos, que es la pared de acantilado más impresionante de la provincia. La Cova dels Arcs queda pegada a la Moraig y se entra nadando desde el barco. Hacia el sur, la Cala Llebeig y la costa de Benissa dan fondeos de roca con mucha menos gente, porque el acceso por tierra es incómodo.

Una advertencia que vale para todos estos fondeos: buena parte del fondo es de roca y grava, y hay tramos de pradera de posidonia. Sobre posidonia no se fondea. Además de estar sancionado, el ancla no agarra bien y el susto te lo llevas tú. Busca las manchas claras de arena, que con esta agua se distinguen a simple vista desde el barco.

En la ficha de cada barco indicamos si exige titulación o no.`,
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
      },
      {
        pregunta: "¿Se puede llegar a la Cala Moraig desde Moraira?",
        respuesta:
          "Sí, en unos veinte minutos rumbo norte pasado el Cap d'Or. Es acantilado, con fondo de roca y grava, y al lado está la Cova dels Arcs, a la que se entra nadando desde el barco. Fondea sobre arena, nunca sobre pradera de posidonia.",
      },
      {
        pregunta: "¿Qué barcos se pueden alquilar sin licencia en Moraira?",
        respuesta:
          "Las embarcaciones de menor eslora y potencia, que se pueden gobernar tras una explicación de seguridad en el pantalán. Para todo lo demás hace falta titulación, o alquilar con patrón. En la ficha de cada barco viene indicado si requiere título.",
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
    sinLicencia: `En Calpe la mayoría de quien pregunta por alquilar sin licencia quiere lo mismo: ver el Peñón de Ifach desde el agua. Se puede, y hay dos maneras según lo que tengas.

Sin ninguna titulación puedes llevar una embarcación pequeña, de potencia limitada, de día y sin alejarte de la costa. Antes de salir te explican en el pantalán lo básico: gobierno, fondeo, límites de la zona y qué hacer si algo falla. Con eso te basta para moverte por la bahía, acercarte a la Cala del Racó y a los Baños de la Reina, y tener el peñón de frente casi todo el rato.

La otra opción es ir con patrón. La titulación la pone él, el barco puede ser más grande y el día se estira: el Mascarat hacia el norte, la Sierra Helada hacia el sur, y con tiempo bueno la Isla de Benidorm a poco más de media hora.

Un aviso que conviene leer antes de reservar: el Peñón de Ifach es Parque Natural y tiene su propio régimen de protección, con limitaciones de aproximación y de fondeo que pueden cambiar según la temporada. No es una roca cualquiera a la que arrimarse. Antes de salir, confirma en el club qué está permitido ese día; te lo dirán sin problema y te ahorras un disgusto.

Si es tu primera vez, sale mejor salir de Les Bassetes o de Puerto Blanco que del puerto grande: son marinas pequeñas, la maniobra de salida es más sencilla y en agosto no se hace cola. Desde las tres tienes el peñón a la vista en cuanto cruzas la bocana, así que no pierdes nada por elegir la más cómoda.

Los requisitos de titulación están regulados y se revisan cada cierto tiempo. Lo que manda es la ficha de cada barco, donde indicamos si exige título.`,
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
      },
      {
        pregunta: "¿Cuánto se tarda de Calpe a la Isla de Benidorm?",
        respuesta:
          "Poco más de media hora en lancha a velocidad de crucero, bordeando la Sierra Helada. Es una de las salidas de día completo más agradecidas de la zona, y se puede combinar con un fondeo de vuelta en el Mascarat.",
      },
      {
        pregunta: "¿Qué incluye el precio de un alquiler en Calpe?",
        respuesta:
          "En nuestras fichas, el precio que ves incluye combustible estimado, limpieza, amarre y tasas. No hay cargos nuevos en el pantalán. Si el barco lleva patrón, también viene indicado en el precio antes de reservar.",
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
    sinLicencia: `La bahía de Altea es de las más tranquilas de la costa alicantina, y eso la convierte en un sitio cómodo para alquilar sin tener titulación. Está protegida por la Sierra Helada al sur y por el Morro de Toix al norte, así que casi siempre hay una orilla u otra con el agua plana.

Se sale por dos sitios y no dan lo mismo. El Club Náutico Altea está junto al pueblo y es el más bonito, pero en verano aparcar es un problema. Marina Greenwich, en Campomanes, queda tres kilómetros al norte, tiene aparcamiento amplio y se sale a la misma bahía: si vais con grupo y varios coches, es la opción sensata.

Sin ningún título puedes llevar una embarcación pequeña, de día y sin alejarte. Con eso te mueves por la bahía entera, te acercas al Cap Negret, que está pegado al puerto, y llegas a la Cala de la Solsida en el Albir, de arena y grava, buena para fondear a comer. Hacia el norte, la Cala del Mascarat y la Cala del Soio están a diez o quince minutos, con acantilados rojos y agua muy limpia.

Con patrón la salida clásica es la Isla de Benidorm, a media hora larga bordeando la Sierra Helada, y volver por el Albir. Es el día completo típico desde aquí.

El viento dominante en verano es el llebeig de la tarde, del suroeste. Con él el abrigo está en la parte norte de la bahía, hacia el Mascarat; con levante pasa lo contrario y conviene arrimarse al Albir. En la ficha de cada barco indicamos si exige título.`,
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
      },
      {
        pregunta: "¿Es Altea buena para ir con niños en barco?",
        respuesta:
          "Es de las mejores de la costa. La bahía está protegida por la Sierra Helada y el Morro de Toix, así que casi siempre hay una orilla con el agua plana, y las calas de fondeo están a diez o quince minutos del puerto.",
      },
      {
        pregunta: "¿Se puede ir a la Isla de Benidorm desde Altea?",
        respuesta:
          "Sí, está a media hora larga bordeando la Sierra Helada, y es la salida de día completo más habitual desde aquí. Se puede fondear en la cara norte y volver por el Albir para comer en la Solsida.",
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
    sinLicencia: `Benidorm es probablemente el sitio de la costa donde más se busca alquilar un barco sin licencia, y tiene sentido: casi todo el que lo pregunta está de vacaciones, no tiene ningún título náutico y quiere llegar a la isla.

Sin titulación puedes gobernar una embarcación pequeña, de potencia limitada y solo de día, después de que te expliquen en el pantalán lo esencial. Con eso te mueves por la bahía, entre la playa de Levante y la de Poniente, y te acercas a la Cala Tío Ximo y a la Almadrava, que están a diez minutos bordeando la Sierra Helada.

Para la isla, lo normal es ir con patrón. Está a unos veinte minutos de la bocana, la travesía es corta pero abierta, y con patrón a bordo no necesitas ningún título: él pone la titulación y tú decides el plan. Es también la fórmula que usan casi todas las despedidas y grupos grandes, porque el precio por persona baja mucho a partir de ocho.

La isla tiene figura de protección ambiental, así que hay reglas sobre dónde fondear y qué se puede hacer allí. Confírmalo antes de salir: cambia según la temporada y no es lo mismo que fondear en una cala cualquiera.

La explicación de seguridad del pantalán no es un trámite que despachar: te enseñan a arrancar y parar el motor, a fondear, hasta dónde puedes llegar y qué hacer si el mar se levanta. Dura diez o quince minutos y conviene escucharla entera, porque es lo único que llevas encima cuando sales sin patrón a bordo.

Y una cosa que conviene saber si estás mirando precios: la salida de atardecer, de dos o tres horas, sale bastante más barata que un día completo y es cuando mejor se ve el perfil de Benidorm desde el agua.`,
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
      },
      {
        pregunta: "¿Puedo alquilar un barco en Benidorm sin licencia?",
        respuesta:
          "Sin ninguna titulación solo se pueden gobernar embarcaciones pequeñas y de poca potencia, tras una explicación de seguridad en el pantalán. La alternativa, y la más habitual entre quienes están de vacaciones, es alquilar con patrón: él pone el título y tú solo decides adónde ir.",
      },
      {
        pregunta: "¿Merece la pena una salida al atardecer en Benidorm?",
        respuesta:
          "Es lo que mejor funciona aquí. El skyline con la Sierra Helada detrás, visto desde el agua a última hora, no se ve así desde ningún punto de tierra. Suelen ser salidas de dos o tres horas y salen mucho más baratas que un día completo.",
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
    sinLicencia: `Villajoyosa es la alternativa tranquila a Benidorm para alquilar sin titulación: está a quince minutos de navegación y en agosto tiene bastante menos tráfico, dentro y fuera del agua. Se sale del Club Náutico La Vila Joiosa, pegado al casco antiguo.

Sin ningún título puedes llevar una embarcación pequeña, de día y sin alejarte de la costa, después de la explicación de seguridad en el pantalán. Y aquí eso basta para lo que la mayoría viene a ver: la fachada del pueblo desde el agua. Las casas de colores de la Vila se pintaron así para que los pescadores las distinguieran desde el mar, y ese es el punto de vista para el que fueron hechas. A doscientos metros de la orilla tienes el pueblo entero como un tablero de color contra la montaña. No hace falta ni alejarse.

Hacia el noreste, a pocos minutos, están la Cala Bol Nou, de arena y roca al pie de un acantilado ocre, y el Racó del Conill. En temporada alta siguen razonablemente tranquilas porque el acceso por tierra es incómodo, y se llega de sobra con un barco sin titulación.

Con patrón el día se estira: la Isla de Benidorm queda a un cuarto de hora largo, y hacia el suroeste la costa lleva a la Torre de Xarco y a El Campello.

Si coincides en julio con los Moros y Cristianos, hay un desembarco en la playa que se ve desde el agua. Reserva con antelación y cuenta con que habrá restricciones de paso en esa zona esos días.`,
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
      },
      {
        pregunta: "¿Es mejor salir de Villajoyosa o de Benidorm?",
        respuesta:
          "Están a quince minutos de navegación, así que desde cualquiera de los dos llegas a lo mismo. Villajoyosa tiene menos tráfico y aparca mejor en agosto; Benidorm está más cerca de la isla y de los hoteles.",
      },
      {
        pregunta: "¿Qué calas hay cerca de Villajoyosa?",
        respuesta:
          "La Cala Bol Nou y el Racó del Conill hacia el noreste, ambas a pocos minutos, de arena y roca bajo acantilado ocre. Al tener acceso incómodo por tierra, en verano siguen bastante más tranquilas que las playas del pueblo.",
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
    sinLicencia: `El Campello es la salida práctica para quien vive en Alicante o veranea en la playa de San Juan y no tiene titulación. El Club Náutico El Campello está a veinte minutos en coche del centro y a diez de San Juan, y en agosto se entra y se sale con la mitad de agobio que en la Marina Deportiva.

Sin ningún título puedes llevar una embarcación pequeña, de día y sin alejarte, después de la explicación de seguridad en el pantalán. Y aquí eso da mucho de sí, porque lo bueno está cerca. A cinco minutos de la bocana tienes la Illeta dels Banyets, una lengua de roca con yacimiento arqueológico donde se ven los viveros de peces excavados en la piedra: desde el agua se entiende mucho mejor que desde el paseo. Hacia el norte, la Cala Lanuza y la Cala Baeza dan un baño rápido sin apenas navegar.

A un cuarto de hora largo rumbo sur está el Cabo de las Huertas, con la Cala Cantalars, la Palmera y los Judíos. Es el mejor tramo de fondeo de todo el entorno de Alicante y desde aquí queda más cerca que desde la propia ciudad.

Con patrón se abre Tabarca, a algo más de una hora rumbo sur. Se hace bien en jornada completa, aunque si el plan es solo la isla sale mejor salir de Santa Pola, que está a unas 4 millas.

El viento dominante en verano es la brisa de la tarde del este y sureste, que levanta picado a partir de media tarde. Aquí también funciona salir temprano. En la ficha de cada barco indicamos si exige título.`,
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
      },
      {
        pregunta: "¿Qué es la Illeta dels Banyets y se ve desde el barco?",
        respuesta:
          "Es una lengua de roca junto al puerto con un yacimiento arqueológico y unos viveros de peces excavados en la piedra. Desde el agua se entienden mucho mejor que desde el paseo, y está a cinco minutos de la bocana.",
      },
      {
        pregunta: "¿Se puede ir a Tabarca desde El Campello?",
        respuesta:
          "Sí, está a algo más de una hora rumbo sur y se hace bien en una jornada completa. Si el plan es solo Tabarca, sale mejor salir de Santa Pola, que está a unas 4 millas de la isla.",
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
    sinLicencia: `Si no tienes titulación y quieres alquilar por primera vez, esta es la costa más fácil de la provincia. No hay cabos grandes ni acantilados que compliquen la navegación: la orilla es de roca baja y calas cortas, el mar suele estar más plano que en la Marina Alta y las distancias entre fondeos son pequeñas.

Se sale de la Marina Internacional, del Real Club Náutico de Torrevieja o de Marina Salinas, las tres dentro del mismo puerto y a un paso del centro. Es el puerto con más plazas de la provincia y el que menos problemas de aparcamiento da en verano, que no es poco en agosto.

Sin ningún título puedes llevar una embarcación pequeña, de día y sin alejarte, tras la explicación de seguridad en el pantalán. Con eso llegas en diez minutos al Cabo Cervera y a la Cala Ferrís, y algo más allá a la playa de La Mata, larga y de arena, buena para fondear a comer. Es un radio corto, pero aquí el radio corto ya da un día entero.

Con patrón se abre la Orihuela Costa hacia el sur: Playa Flamenca, la Cala Capitán, Cabo Roig y Campoamor, todas a menos de media hora, con fondeos de arena entre roca y agua clara.

Una cosa útil si no hablas español: esta es la zona con más residentes británicos, nórdicos y neerlandeses de la costa, así que alquilar en inglés aquí es lo normal y hay patrones que lo hablan. La reserva, el contrato y el contacto con el patrón los tienes en tu idioma.`,
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
      },
      {
        pregunta: "¿Qué calas hay hacia Orihuela Costa?",
        respuesta:
          "Playa Flamenca, la Cala Capitán, Cabo Roig y Campoamor, todas a menos de media hora rumbo sur, con fondeos de arena entre roca. Hacia el norte quedan el Cabo Cervera, la Cala Ferrís y La Mata.",
      },
      {
        pregunta: "¿Puedo reservar y navegar en inglés en Torrevieja?",
        respuesta:
          "Sí. Es la zona con más residentes británicos y nórdicos de la costa, así que alquilar en inglés es lo habitual y hay patrones que lo hablan. La reserva, el contrato y el contacto con el patrón los tienes en tu idioma.",
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
      },
      {
        pregunta: "¿Se ve Tabarca desde el puerto de Santa Pola?",
        respuesta:
          "Sí, se ve desde la bocana. Se pone proa a la isla y en media hora estás, lo que hace de esta la salida más sencilla de orientar de toda la provincia.",
      },
      {
        pregunta: "¿Cuándo conviene no salir hacia Tabarca?",
        respuesta:
          "Con levante fuerte. Levanta mar de fondo en el canal entre la costa y la isla y la travesía se pone incómoda aunque sea corta. Conviene mirar el parte antes de reservar, no el mismo día.",
      },
    ],
    sinLicencia: `Santa Pola es, con diferencia, el mejor sitio de la provincia para alquilar sin titulación si lo que quieres es llegar a Tabarca. El motivo es la distancia: unas 4 millas, media hora de navegación, con la isla a la vista desde la bocana. Es la única salida de la costa donde ese destino entra dentro de lo razonable con una embarcación pequeña.

Sin ningún título puedes gobernar una embarcación de poca eslora y potencia limitada, de día y sin alejarte, después de la explicación de seguridad en el pantalán. Te cuentan cómo arrancar y parar, cómo fondear, hasta dónde puedes llegar y qué hacer si el motor falla. Desde aquí eso da para la bahía, la Cala del Palmeral bajo el Cabo de Santa Pola, y en día tranquilo la propia Tabarca.

Con patrón la cosa se abre y desaparece la duda: la titulación la pone él, el barco puede ser mayor y la travesía deja de depender de que el día acompañe. Es lo que elige la mayoría de los grupos, y repartido entre seis u ocho personas la diferencia por cabeza es pequeña.

Sobre Tabarca hay que decir dos cosas. La primera es que es reserva marina, la primera declarada en España, y hay zonas donde no se puede pescar ni recoger nada; el balizamiento está señalizado y hay que respetarlo. La segunda es que el levante levanta mar de fondo en el canal, y con una embarcación pequeña eso se nota mucho más que con una grande. Mira el parte antes de reservar y, si hay duda, pregunta en el pantalán: te van a decir la verdad, porque a ellos tampoco les interesa que salgas con mal día.

En la ficha de cada barco indicamos si exige titulación. Los requisitos los fija la normativa y se revisan cada cierto tiempo.`,
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
