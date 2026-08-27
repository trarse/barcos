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
  contenido: string;
  latitud: number;
  longitud: number;
  mesesAlta: string;
  destacado: boolean;
  orden: number;
  puertos: PuertoSemilla[];
  preguntas: PreguntaSemilla[];
}

export const DESTINOS: DestinoSemilla[] = [
  {
    slug: "mallorca",
    nombre: "Mallorca",
    provincia: "Illes Balears",
    comunidad: "Illes Balears",
    clase: "isla",
    titular: "Alquiler de barcos en Mallorca",
    descripcion:
      "Cala Deià, Es Trenc y la Serra de Tramuntana desde el agua. Salidas desde Palma, Andratx, Alcúdia y Portocolom con el precio final calculado.",
    contenido: `Mallorca concentra la mayor flota de alquiler de España y es el destino donde más se nota la diferencia entre el precio anunciado y el que se acaba pagando. Una lancha de 250 caballos quema unos 40 litros a la hora: cuatro horas de navegación son 264 € de gasóleo que casi ninguna plataforma enseña hasta el último paso.

La costa se divide en dos mundos. Al noroeste, la Serra de Tramuntana cae a plomo sobre el mar y regala fondeos como Cala Deià, Sa Calobra o Port de Sóller, con aguas profundas y viento térmico que entra a mediodía. Al sur y al este, el terreno se suaviza: Es Trenc, Cala Pi, Es Caló des Moro y las calas de Santanyí tienen arena blanca y fondos de posidonia donde hay que fondear con cuidado y respetar las boyas ecológicas.

La temporada alta va de julio a septiembre y encarece la tarifa base alrededor de un 35 %. En mayo, junio y octubre el agua sigue por encima de los 20 grados, hay la mitad de barcos fondeados en las calas y el mismo velero cuesta un tercio menos. Si la fecha es flexible, ahí está el mejor viaje.

Para el embarque, Palma es la opción con más oferta y mejores conexiones con el aeropuerto. Port d'Andratx da acceso directo a Sa Dragonera y a la costa de Tramuntana. Alcúdia es la puerta natural del norte y del Parc Natural de s'Albufera. Portocolom, más tranquilo, deja a tiro las calas del levante.`,
    latitud: 39.6953,
    longitud: 3.0176,
    mesesAlta: "7,8",
    destacado: true,
    orden: 1,
    puertos: [
      { slug: "palma", nombre: "Puerto de Palma", latitud: 39.5622, longitud: 2.6289 },
      { slug: "port-andratx", nombre: "Port d'Andratx", latitud: 39.5432, longitud: 2.3866 },
      { slug: "alcudia", nombre: "Puerto de Alcúdia", latitud: 39.8339, longitud: 3.1361 },
      { slug: "portocolom", nombre: "Portocolom", latitud: 39.4181, longitud: 3.2665 },
    ],
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta alquilar un barco en Mallorca?",
        respuesta:
          "Una neumática sin licencia sale por unos 220 € al día con todo incluido en temporada media. Una lancha de día para seis personas ronda los 640 €, y un velero de 40 pies con cuatro camarotes está entre 780 y 1.100 € según el mes. Esas cifras ya llevan combustible estimado, limpieza, amarre, tasas e IVA: no hay extras al pagar.",
      },
      {
        pregunta: "¿Hace falta titulación para alquilar un barco en Mallorca?",
        respuesta:
          "No para embarcaciones de hasta 5 metros de eslora y menos de 15 caballos, que se pueden gobernar sin ningún título. Por encima de eso hace falta la licencia de navegación, el PER o superior según la eslora y la potencia. Si no tienes título, puedes filtrar por barcos sin licencia o contratar patrón.",
      },
      {
        pregunta: "¿Cuál es la mejor época para navegar en Mallorca?",
        respuesta:
          "Junio y septiembre. El agua está entre 22 y 25 grados, el viento es más previsible que en pleno agosto y las calas del sureste no están llenas. La tarifa base baja alrededor de un 25 % respecto a la temporada alta.",
      },
      {
        pregunta: "¿Se puede fondear en cualquier cala de Mallorca?",
        respuesta:
          "No. Las praderas de posidonia están protegidas y fondear sobre ellas conlleva sanción. En muchas calas hay boyas ecológicas de amarre y zonas balizadas de arena donde sí se puede echar el ancla. La aplicación Posidonia Maps del Govern marca los fondos permitidos.",
      },
    ],
  },
  {
    slug: "ibiza",
    nombre: "Ibiza",
    provincia: "Illes Balears",
    comunidad: "Illes Balears",
    clase: "isla",
    titular: "Alquiler de barcos en Ibiza",
    descripcion:
      "Es Vedrà, Cala Comte y el cruce a Formentera. Barcos desde Marina Botafoc, Sant Antoni y Santa Eulària con el total calculado de antemano.",
    contenido: `Ibiza es el destino donde el barco deja de ser un capricho y pasa a ser la forma lógica de moverse. Las mejores calas de la isla no tienen carretera, o la tienen tan mala que se tarda menos por mar. Y el cruce a Formentera, media hora escasa desde Ses Salines, es la excursión que justifica el alquiler por sí sola.

La costa oeste es la de las postales: Cala Comte, Cala Bassa, Cala d'Hort con Es Vedrà enfrente y las puestas de sol que han hecho famosa a la isla. Es también la más expuesta al poniente, así que conviene mirar el parte antes de salir. La costa este, de Santa Eulària hacia el norte, está más resguardada y tiene calas pequeñas y tranquilas como Cala Mastella o S'Aigua Blanca.

El tramo entre Ses Salines y Formentera atraviesa el Parc Natural de ses Salines, con fondos de posidonia protegidos donde el fondeo está regulado y hay que reservar boya por adelantado en temporada alta. Es Trucadors y S'Espalmador son el premio: agua turquesa de un metro de profundidad sobre arena blanca.

Julio y agosto disparan los precios y llenan los fondeos. En mayo, junio y octubre la isla es otra cosa: se puede fondear en Cala Salada sin pelear por el sitio y el mismo barco cuesta entre un 25 y un 40 % menos.`,
    latitud: 38.9067,
    longitud: 1.4206,
    mesesAlta: "7,8",
    destacado: true,
    orden: 2,
    puertos: [
      { slug: "marina-botafoc", nombre: "Marina Botafoc", latitud: 38.9169, longitud: 1.4494 },
      { slug: "sant-antoni", nombre: "Sant Antoni de Portmany", latitud: 38.9805, longitud: 1.3033 },
      { slug: "santa-eularia", nombre: "Santa Eulària des Riu", latitud: 38.9847, longitud: 1.5364 },
    ],
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta alquilar un barco en Ibiza para un día?",
        respuesta:
          "Una neumática sin licencia para cuatro personas ronda los 250 € al día con todo incluido. Una lancha de día para ocho personas está sobre los 780 €. Un catamarán con patrón para doce pasa de los 2.200 € en temporada alta. Todos esos importes llevan ya combustible, limpieza, amarre y tasas.",
      },
      {
        pregunta: "¿Se puede ir a Formentera en un barco de alquiler?",
        respuesta:
          "Sí, y es lo que hace casi todo el mundo. La travesía desde Marina Botafoc hasta S'Espalmador son unas 12 millas, entre 40 minutos y una hora según el barco. Comprueba que el contrato no limite la zona de navegación y ten en cuenta que fondear en el parque natural exige reserva previa de boya en verano.",
      },
      {
        pregunta: "¿Puedo alquilar un barco en Ibiza sin licencia?",
        respuesta:
          "Sí. Hay neumáticas y lanchas de hasta 5 metros y 15 caballos que no requieren titulación. Son perfectas para moverse entre calas de la misma costa, aunque no se recomiendan para cruzar a Formentera con mar formada. La otra opción es alquilar cualquier barco con patrón incluido.",
      },
    ],
  },
  {
    slug: "menorca",
    nombre: "Menorca",
    provincia: "Illes Balears",
    comunidad: "Illes Balears",
    clase: "isla",
    titular: "Alquiler de barcos en Menorca",
    descripcion:
      "Cala Macarella, Cala Turqueta y el puerto natural de Maó. Reserva de la Biosfera con las calas más limpias del Mediterráneo.",
    contenido: `Menorca es Reserva de la Biosfera desde 1993 y se nota: sin el desarrollo urbanístico de sus vecinas, la isla conserva calas a las que solo se llega andando media hora por un camino de tierra o, mucho mejor, por mar.

La costa sur es la de las calas de arena blanca y agua turquesa: Macarella, Macarelleta, Cala Turqueta, Cala Mitjana y Son Saura. Son fondeos poco profundos, resguardados de la tramontana y con fondo de arena donde el ancla agarra bien. La costa norte es completamente distinta: más agreste, rojiza, con Cala Pregonda y Cavalleria, y expuesta a la tramontana que puede levantarse en cuestión de horas.

Maó tiene el segundo puerto natural más grande del mundo, cinco kilómetros de canal navegable con el Illa del Rei y La Mola a los lados. Es un fondeo seguro con cualquier viento y una entrada espectacular. Ciutadella, al otro extremo, es una cala estrecha y larga metida en el casco antiguo.

La tramontana marca la agenda náutica de la isla. En verano suele haber una ventana de calma por la mañana y viento del norte por la tarde; conviene planificar la ruta con el parte en la mano y tener siempre un plan B en la costa contraria.`,
    latitud: 39.9496,
    longitud: 4.1102,
    mesesAlta: "7,8",
    destacado: true,
    orden: 3,
    puertos: [
      { slug: "mao", nombre: "Puerto de Maó", latitud: 39.8885, longitud: 4.2686 },
      { slug: "ciutadella", nombre: "Puerto de Ciutadella", latitud: 39.9985, longitud: 3.8288 },
      { slug: "fornells", nombre: "Fornells", latitud: 40.0553, longitud: 4.1319 },
    ],
    preguntas: [
      {
        pregunta: "¿Cuál es la mejor ruta en barco por Menorca?",
        respuesta:
          "Salir de Ciutadella hacia el sur y encadenar Son Saura, Cala Turqueta, Macarelleta y Cala Mitjana en una jornada. Son apenas 10 millas de recorrido, todas con fondo de arena y buen resguardo. Si sopla tramontana, la costa sur es la opción segura.",
      },
      {
        pregunta: "¿Cuánto cuesta un barco en Menorca?",
        respuesta:
          "Un llaüt tradicional para seis personas sale por unos 420 € al día con todo incluido. Una lancha de día ronda los 590 € y un velero de 38 pies está sobre los 700 €. En junio y septiembre esas cifras bajan alrededor de un 25 %.",
      },
      {
        pregunta: "¿Qué es la tramontana y cómo afecta a la navegación?",
        respuesta:
          "Es el viento fuerte y seco del norte que domina Menorca. Puede pasar de calma a fuerza 6 en pocas horas y levanta mar corta e incómoda en la costa norte. Con tramontana anunciada, lo prudente es navegar por la costa sur, que queda a resguardo.",
      },
    ],
  },
  {
    slug: "formentera",
    nombre: "Formentera",
    provincia: "Illes Balears",
    comunidad: "Illes Balears",
    clase: "isla",
    titular: "Alquiler de barcos en Formentera",
    descripcion:
      "Ses Illetes, S'Espalmador y Es Trucadors. La isla pequeña con el agua más clara del Mediterráneo, desde el puerto de La Savina.",
    contenido: `Formentera es pequeña, plana y está rodeada por el mayor manto de posidonia del Mediterráneo, un organismo vivo de más de 8 kilómetros declarado Patrimonio de la Humanidad. Esa pradera es exactamente la razón de que el agua sea tan transparente, y también el motivo de que fondear aquí esté estrictamente regulado.

Ses Illetes y Llevant son las playas del norte, en la lengua de arena de Es Trucadors: agua de un metro de profundidad, arena blanca y fondeo sobre boyas reservadas de antemano. S'Espalmador, el islote de enfrente, es un espacio natural protegido con una laguna de barro y una cala interior donde el desembarco está limitado.

La costa sur, de Es Caló a Migjorn y el faro de La Mola, es más abierta y menos frecuentada. Cala Saona, al oeste, es el mejor fondeo para ver la puesta de sol con Es Vedrà de Ibiza recortado al fondo.

Casi todo el mundo llega en barco desde Ibiza: son 12 millas desde Marina Botafoc. Alquilar directamente en La Savina ahorra la travesía y permite dedicar el día entero a la isla, que es lo que de verdad merece la pena.`,
    latitud: 38.6871,
    longitud: 1.4321,
    mesesAlta: "7,8",
    destacado: false,
    orden: 4,
    puertos: [
      { slug: "la-savina", nombre: "Puerto de La Savina", latitud: 38.7314, longitud: 1.4108 },
    ],
    preguntas: [
      {
        pregunta: "¿Hay que reservar boya para fondear en Formentera?",
        respuesta:
          "Sí, en Ses Illetes y en buena parte del parque natural el fondeo se hace en campos de boyas que se reservan por adelantado a través del servicio oficial del Govern balear. En temporada alta se agotan con semanas de antelación. Echar el ancla sobre posidonia conlleva multas de varios miles de euros.",
      },
      {
        pregunta: "¿Cuánto se tarda de Ibiza a Formentera en barco?",
        respuesta:
          "Entre 30 y 60 minutos según la embarcación. Son unas 12 millas náuticas desde Marina Botafoc hasta Ses Illetes. Una lancha rápida lo hace en media hora; un velero, en algo más de dos.",
      },
    ],
  },
  {
    slug: "denia",
    nombre: "Dénia",
    provincia: "Alicante",
    comunidad: "Comunitat Valenciana",
    clase: "costa",
    titular: "Alquiler de barcos en Dénia",
    descripcion:
      "El Parc Natural del Montgó, las cuevas de Xàbia y la Cova Tallada. La costa más accesible de Alicante, a hora y media de Valencia.",
    contenido: `Dénia es la puerta de entrada al tramo de costa más espectacular de la Comunitat Valenciana. El macizo del Montgó cae al mar formando el Cap de Sant Antoni, y de ahí hasta el Cap de la Nau se suceden cuevas, arcos de roca y calas de grava a las que solo se llega por agua.

La Cova Tallada es el fondeo obligatorio: una cueva excavada por los canteros musulmanes en la roca del cabo, con un lago interior donde se entra nadando. Al sur, la Cala Granadella y el Arco de Los Arcos de Xàbia forman el conjunto más fotografiado de la zona. Al norte, las playas de Les Marines y Els Molins ofrecen fondeos de arena tranquilos para un día en familia.

La navegación es fácil casi todo el año. El levante puede levantar mar de fondo por la tarde, y en invierno hay días de mistral que se dejan sentir, pero el tramo Dénia-Xàbia está protegido por el propio Montgó de los vientos del segundo y tercer cuadrante.

Es también el destino con mejor relación entre precio y calidad de la costa mediterránea peninsular: la misma lancha que en Ibiza cuesta 780 € aquí sale por poco más de 500 € con todo incluido.`,
    latitud: 38.8409,
    longitud: 0.1057,
    mesesAlta: "7,8",
    destacado: true,
    orden: 5,
    puertos: [
      { slug: "marina-denia", nombre: "Marina de Dénia", latitud: 38.8442, longitud: 0.1132 },
      { slug: "xabia", nombre: "Puerto de Xàbia", latitud: 38.7929, longitud: 0.1836 },
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
          "Depende del barco. Hay neumáticas de hasta 15 caballos que se gobiernan sin ningún título tras una explicación de seguridad en el pantalán. Para lanchas más potentes o veleros hace falta al menos licencia de navegación o PER.",
      },
      {
        pregunta: "¿Cuánto cuesta alquilar una lancha en Dénia?",
        respuesta:
          "Una lancha de día para seis personas sale por unos 510 € con todo incluido en temporada media: combustible estimado, limpieza, amarre, tasas e IVA. La tarifa base que anuncia la competencia para el mismo barco ronda los 260 €.",
      },
    ],
  },
  {
    slug: "valencia",
    nombre: "Valencia",
    provincia: "Valencia",
    comunidad: "Comunitat Valenciana",
    clase: "ciudad",
    titular: "Alquiler de barcos en Valencia",
    descripcion:
      "La Marina de València, el Puig y la Albufera desde el agua. Salidas desde el puerto olímpico a diez minutos del centro.",
    contenido: `Valencia tiene una ventaja rara: el puerto deportivo está dentro de la ciudad. La Marina de València, heredera de la Copa América y de los años del circuito urbano, deja el barco a diez minutos en metro del centro histórico, algo que no ofrece ningún otro gran puerto español.

La costa es de arena y poca profundidad, muy distinta de las calas de roca del sur. Al norte, las playas del Puig, Puçol y Sagunt permiten fondear a poca distancia de la orilla sobre fondo limpio. Al sur, la Devesa del Saler y el Perellonet bordean el Parc Natural de l'Albufera, con la restinga que separa la laguna del mar y los arrozales al fondo.

El viento típico del verano es la marinada, una brisa térmica del este que entra a mediodía y se calma al atardecer. Es agradable para navegar a vela y hace de las tardes de julio el mejor momento para salir.

Para quien no busca travesía sino un día de baño, salida al atardecer o una celebración a bordo, Valencia es el destino más cómodo del Mediterráneo español: aeropuerto, AVE y puerto están a menos de media hora unos de otros.`,
    latitud: 39.4699,
    longitud: -0.3763,
    mesesAlta: "7,8",
    destacado: true,
    orden: 6,
    puertos: [
      { slug: "marina-valencia", nombre: "Marina de València", latitud: 39.4586, longitud: -0.3268 },
      { slug: "port-saplaya", nombre: "Port Saplaya", latitud: 39.5231, longitud: -0.3172 },
    ],
    preguntas: [
      {
        pregunta: "¿Qué se puede ver navegando desde Valencia?",
        respuesta:
          "El frente marítimo de la ciudad con la Ciutat de les Arts al fondo, las playas de la Malva-rosa y el Cabanyal, y hacia el sur la Devesa del Saler y el cordón dunar de l'Albufera. Es una costa de arena, ideal para fondear y bañarse, sin las calas de roca del sur de Alicante.",
      },
      {
        pregunta: "¿Cuánto cuesta alquilar un barco en Valencia?",
        respuesta:
          "Una lancha de día para ocho personas ronda los 560 € con todo incluido. Un velero de 36 pies sale por unos 620 €. Las salidas de atardecer de tres horas con patrón empiezan sobre los 390 €.",
      },
      {
        pregunta: "¿Se puede navegar por la Albufera?",
        respuesta:
          "La laguna de l'Albufera no está conectada al mar de forma navegable para embarcaciones de recreo: se visita en barca tradicional desde El Palmar. Desde el mar sí se puede fondear frente a la Devesa del Saler y ver el cordón dunar que la separa.",
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
    contenido: `Alicante ofrece la combinación que buscan casi todos los que alquilan por primera vez: mar tranquila, distancias cortas y un destino claro al que poner rumbo. Ese destino es Tabarca, la única isla habitada de la Comunitat Valenciana y la primera reserva marina que se declaró en España, en 1986.

Son unas 11 millas desde el puerto de Alicante, o apenas 4 desde Santa Pola. El fondeo se hace en la cara norte, sobre arena, y el agua es tan clara que se ve el ancla a ocho metros. Dentro de la reserva integral no se puede pescar ni fondear: hay que respetar el balizamiento, que está bien señalizado.

Más cerca, la costa entre el Cap de l'Horta y la Serra Gelada esconde calas de grava como Cantalars, La Palmera o Cala Llosa, accesibles solo por mar y con muy poca gente incluso en agosto. Al norte, el Peñón de Ifach de Calp marca el final del tramo.

El clima permite navegar prácticamente todo el año. En invierno hay muchos días de calma total con 18 grados, y la temporada baja deja precios de la mitad que en agosto.`,
    latitud: 38.3452,
    longitud: -0.481,
    mesesAlta: "7,8",
    destacado: false,
    orden: 7,
    puertos: [
      { slug: "marina-alicante", nombre: "Marina Deportiva de Alicante", latitud: 38.3376, longitud: -0.4838 },
      { slug: "santa-pola", nombre: "Puerto de Santa Pola", latitud: 38.1899, longitud: -0.5842 },
      { slug: "el-campello", nombre: "Puerto de El Campello", latitud: 38.4283, longitud: -0.3921 },
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
    slug: "barcelona",
    nombre: "Barcelona",
    provincia: "Barcelona",
    comunidad: "Cataluña",
    clase: "ciudad",
    titular: "Alquiler de barcos en Barcelona",
    descripcion:
      "El skyline desde el agua, el Maresme y las calas del Garraf. Salidas desde Port Olímpic, Port Vell y Port Fòrum.",
    contenido: `Ver Barcelona desde el mar cambia la ciudad. La Sagrada Família, la torre Glòries y Montjuïc se ordenan de una forma que desde tierra no se aprecia, y las salidas de dos o tres horas al atardecer se han convertido en el producto estrella del puerto.

Para pasar el día hay dos direcciones. Al sur, el macizo del Garraf ofrece calas de roca y grava como Cala Morisca, Ginesta o Home Mort, a menos de 10 millas del Port Olímpic, con montaña cayendo al agua y muy poca edificación. Al norte, el Maresme es costa de arena larga y playas abiertas hasta llegar a Blanes, donde ya empieza la Costa Brava.

El garbí, la brisa del suroeste, entra por la tarde en verano y hace de Barcelona un buen sitio para navegar a vela sin complicaciones. En invierno el temido temporal de levante es lo único que conviene vigilar.

Es el destino con más salidas cortas de España: catamaranes con patrón para grupos, veleros para regatas de empresa y lanchas para bañarse en el Garraf. Casi nadie sale de Barcelona a hacer travesía; se sale a estar en el agua.`,
    latitud: 41.3874,
    longitud: 2.1686,
    mesesAlta: "7,8",
    destacado: true,
    orden: 8,
    puertos: [
      { slug: "port-olimpic", nombre: "Port Olímpic", latitud: 41.3868, longitud: 2.1979 },
      { slug: "port-vell", nombre: "Port Vell", latitud: 41.3757, longitud: 2.1839 },
      { slug: "port-forum", nombre: "Port Fòrum", latitud: 41.4113, longitud: 2.2242 },
    ],
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta alquilar un barco en Barcelona?",
        respuesta:
          "Una salida de tres horas al atardecer en velero con patrón empieza en unos 420 € para seis personas. Un día completo de lancha ronda los 690 € con todo incluido y un catamarán para doce con patrón está sobre los 1.900 €.",
      },
      {
        pregunta: "¿Dónde se puede fondear cerca de Barcelona?",
        respuesta:
          "Las mejores calas están en el Garraf, al sur: Morisca, Ginesta y Home Mort, todas a menos de 10 millas del Port Olímpic. Hacia el norte, el Maresme ofrece playas de arena abiertas donde se fondea a poca distancia de la orilla.",
      },
      {
        pregunta: "¿Hace falta patrón para alquilar en Barcelona?",
        respuesta:
          "No si tienes PER y el barco lo permite. Pero en Barcelona la mayoría de las salidas cortas se contratan con patrón incluido, porque el tráfico del puerto comercial y las maniobras de entrada y salida son exigentes para quien no conoce la zona.",
      },
    ],
  },
  {
    slug: "costa-brava",
    nombre: "Costa Brava",
    provincia: "Girona",
    comunidad: "Cataluña",
    clase: "costa",
    titular: "Alquiler de barcos en la Costa Brava",
    descripcion:
      "Las islas Medes, Cap de Creus y las calas de pino y roca de Begur. La costa más agreste del Mediterráneo español.",
    contenido: `La Costa Brava se llama así por algo. Entre Blanes y Portbou hay 200 kilómetros de acantilado, pino y roca granítica donde las calas son estrechas, profundas y a menudo inaccesibles por tierra. Es la costa española que mejor se disfruta desde un barco porque es la que peor se disfruta desde la carretera.

Las illes Medes, frente a l'Estartit, son la reserva marina más visitada del Mediterráneo occidental: siete islotes con paredes verticales, cuevas y una biodiversidad que atrae buceadores de toda Europa. El fondeo está regulado y hay boyas de amarre que se reservan por adelantado.

Al norte, el Cap de Creus es un parque natural de roca esquistosa esculpida por la tramontana, con Cala Culip, Cala Jugadora y la punta más oriental de la península. Al sur, las calas de Begur (Aiguablava, Sa Tuna, Sa Riera) y el litoral de Palamós concentran los fondeos más protegidos.

La tramontana es la variable a vigilar: puede soplar días seguidos con fuerza 7 u 8 en el golfo de Roses. Cuando entra, lo sensato es quedarse en la costa sur de Palamós hacia abajo, o directamente no salir.`,
    latitud: 41.9,
    longitud: 3.1667,
    mesesAlta: "7,8",
    destacado: false,
    orden: 9,
    puertos: [
      { slug: "roses", nombre: "Puerto de Roses", latitud: 42.2529, longitud: 3.1761 },
      { slug: "lestartit", nombre: "Port de l'Estartit", latitud: 42.0553, longitud: 3.2033 },
      { slug: "palamos", nombre: "Puerto de Palamós", latitud: 41.8478, longitud: 3.1289 },
    ],
    preguntas: [
      {
        pregunta: "¿Se puede fondear en las islas Medes?",
        respuesta:
          "Solo en las boyas habilitadas y con reserva previa: es reserva marina integral y el fondeo con ancla está prohibido. El número de amarres es limitado y en julio y agosto se agotan pronto. Bucear requiere autorización aparte.",
      },
      {
        pregunta: "¿Cuáles son las mejores calas de la Costa Brava en barco?",
        respuesta:
          "Aiguablava y Sa Tuna en Begur, Cala Estreta y Cala Futadera cerca de Tossa, y Cala Culip y Cala Jugadora en el Cap de Creus. Casi todas tienen fondo de arena o grava y son de acceso complicado por tierra, así que por mar se disfrutan mucho más vacías.",
      },
    ],
  },
  {
    slug: "malaga",
    nombre: "Málaga",
    provincia: "Málaga",
    comunidad: "Andalucía",
    clase: "ciudad",
    titular: "Alquiler de barcos en Málaga",
    descripcion:
      "Costa del Sol, avistamiento de delfines y 320 días de sol al año. Salidas desde Málaga, Benalmádena y Fuengirola.",
    contenido: `La Costa del Sol tiene el mejor clima náutico de la península: más de 320 días de sol al año y una temporada real que va de marzo a noviembre, cuando en el resto del Mediterráneo español se acaba en octubre. Eso convierte a Málaga en el destino con los precios de temporada baja más aprovechables del país.

El mar de Alborán es la puerta entre el Atlántico y el Mediterráneo, y por ahí pasan delfines listados, mulares y calderones durante todo el año. Las salidas de avistamiento desde Benalmádena tienen una tasa de éxito altísima y no hace falta alejarse: a tres o cuatro millas de la costa ya se encuentran grupos.

La costa es de playa larga y poca cala, así que el plan típico no es el fondeo en agua turquesa sino la navegación con destino: bajar hacia Marbella y Puerto Banús, subir hacia Nerja y los acantilados de Maro, o simplemente parar frente a Fuengirola a bañarse.

El viento de poniente puede levantar mar de fondo por la tarde en el tramo hacia Estepona. El levante, más raro en verano, trae calima y visibilidad reducida.`,
    latitud: 36.7213,
    longitud: -4.4214,
    mesesAlta: "7,8",
    destacado: false,
    orden: 10,
    puertos: [
      { slug: "puerto-malaga", nombre: "Puerto de Málaga", latitud: 36.7136, longitud: -4.4172 },
      { slug: "benalmadena", nombre: "Puerto Marina Benalmádena", latitud: 36.5975, longitud: -4.5158 },
      { slug: "fuengirola", nombre: "Puerto de Fuengirola", latitud: 36.5375, longitud: -4.6236 },
    ],
    preguntas: [
      {
        pregunta: "¿Se ven delfines desde un barco en Málaga?",
        respuesta:
          "Con mucha frecuencia. El mar de Alborán es zona de paso de delfines listados, mulares y calderones durante todo el año. A tres o cuatro millas de Benalmádena ya se encuentran grupos. La normativa obliga a mantener 60 metros de distancia y no cortar su rumbo.",
      },
      {
        pregunta: "¿Cuándo es temporada baja en la Costa del Sol?",
        respuesta:
          "De noviembre a marzo, aunque el clima permite navegar cómodamente casi todos esos meses. Es donde más se nota el ahorro: el mismo barco puede costar un 45 % menos que en agosto con 18 grados y sol.",
      },
    ],
  },
  {
    slug: "tenerife",
    nombre: "Tenerife",
    provincia: "Santa Cruz de Tenerife",
    comunidad: "Canarias",
    clase: "isla",
    titular: "Alquiler de barcos en Tenerife",
    descripcion:
      "Los acantilados de Los Gigantes, ballenas piloto todo el año y 23 grados en enero. La temporada náutica que no se acaba.",
    contenido: `Tenerife rompe la estacionalidad del alquiler náutico español. Mientras el Mediterráneo cierra en octubre, aquí el agua no baja de los 19 grados en todo el año y la temporada alta es, precisamente, el invierno: diciembre y enero, cuando media Europa busca sol.

El sur de la isla, entre Los Cristianos y Los Gigantes, concentra casi toda la flota. Es una franja de mar protegida por la sombra del Teide, con aguas planas y una población residente de calderones tropicales y delfines mulares que está entre las mejor estudiadas del mundo: la zona es Patrimonio Ballenero Europeo.

Los acantilados de Los Gigantes caen 600 metros a plomo sobre el agua y son el fondeo más impresionante de Canarias. Más al sur, la Playa de la Tejita y el Médano quedan expuestos al alisio, que sopla constante del nordeste y hace de la zona un referente mundial del windsurf, pero también un mar incómodo para fondear.

Hay que tener presente que aquí no hay plataforma continental: a media milla de la costa ya se sondan 500 metros. El fondeo solo es posible en puntos concretos y muy pegados a tierra.`,
    latitud: 28.2916,
    longitud: -16.6291,
    mesesAlta: "12,1",
    destacado: false,
    orden: 11,
    puertos: [
      { slug: "puerto-colon", nombre: "Puerto Colón", latitud: 28.0797, longitud: -16.7361 },
      { slug: "los-gigantes", nombre: "Puerto de Los Gigantes", latitud: 28.2464, longitud: -16.8419 },
      { slug: "radazul", nombre: "Marina Radazul", latitud: 28.4014, longitud: -16.3253 },
    ],
    preguntas: [
      {
        pregunta: "¿Cuándo es temporada alta en Tenerife?",
        respuesta:
          "Al revés que en el Mediterráneo: diciembre y enero son los meses de más demanda, porque el agua sigue a 20 grados y el sol está garantizado. Los meses de tarifa más baja son mayo, junio y septiembre.",
      },
      {
        pregunta: "¿Se pueden ver ballenas en Tenerife todo el año?",
        respuesta:
          "Sí. La franja entre Los Cristianos y Los Gigantes tiene una población residente de calderones tropicales y delfines mulares que no migra. La probabilidad de avistamiento en una salida de tres horas supera el 90 %. La zona es Patrimonio Ballenero Europeo y hay distancias mínimas de aproximación obligatorias.",
      },
      {
        pregunta: "¿Dónde se puede fondear en Tenerife?",
        respuesta:
          "En pocos sitios y muy pegado a tierra: no hay plataforma continental y a media milla ya hay 500 metros de sondas. Los fondeos habituales son la playa de Masca bajo Los Gigantes, la playa Paraíso y algunos puntos de la costa de Adeje.",
      },
    ],
  },
  {
    slug: "mar-menor",
    nombre: "Mar Menor",
    provincia: "Murcia",
    comunidad: "Región de Murcia",
    clase: "costa",
    titular: "Alquiler de barcos en el Mar Menor",
    descripcion:
      "La mayor laguna salada de Europa: 170 km² de agua a 2 metros de profundidad, sin olas y a 28 grados en verano.",
    contenido: `El Mar Menor es una anomalía geográfica y el mejor sitio de España para aprender a llevar un barco. Es una laguna salada de 170 kilómetros cuadrados separada del Mediterráneo por La Manga, una lengua de arena de 22 kilómetros. Dentro no hay olas, la profundidad media son 3,5 metros y el agua alcanza los 28 grados en agosto.

Eso lo convierte en un destino distinto: aquí no se hace travesía ni se buscan calas, se navega tranquilo entre las cinco islas volcánicas de la laguna. La Isla Perdiguera y la Isla del Barón tienen fondeos de arena con dos metros de agua donde se puede bajar caminando desde el barco.

Para salir al Mediterráneo hay que pasar por el canal del Estacio, junto al puerto Tomás Maestre. Fuera cambia todo: Cabo de Palos y la reserva marina de las islas Hormigas son uno de los mejores puntos de buceo de Europa, con paredes que caen a 50 metros y un tráfico constante de barracudas y meros.

La laguna atraviesa desde 2016 episodios graves de eutrofización. Hay proyectos de recuperación en marcha y la navegación es perfectamente normal, pero conviene informarse del estado del agua antes de reservar en pleno verano.`,
    latitud: 37.7,
    longitud: -0.7833,
    mesesAlta: "7,8",
    destacado: false,
    orden: 12,
    puertos: [
      { slug: "tomas-maestre", nombre: "Puerto Tomás Maestre", latitud: 37.7317, longitud: -0.7369 },
      { slug: "cartagena", nombre: "Puerto de Cartagena", latitud: 37.5833, longitud: -0.9833 },
      { slug: "cabo-palos", nombre: "Puerto de Cabo de Palos", latitud: 37.6339, longitud: -0.7053 },
    ],
    preguntas: [
      {
        pregunta: "¿Es buen sitio el Mar Menor para alquilar sin experiencia?",
        respuesta:
          "Es el mejor de España. No hay olas, la profundidad media son 3,5 metros y no hay tráfico comercial. Muchas embarcaciones sin licencia operan solo dentro de la laguna, precisamente porque las condiciones son muy benignas.",
      },
      {
        pregunta: "¿Se puede salir del Mar Menor al Mediterráneo?",
        respuesta:
          "Sí, por el canal del Estacio, junto al puerto Tomás Maestre. Hay un puente móvil con horarios de apertura. Comprueba que tu contrato de alquiler permita salir de la laguna: muchas embarcaciones sin licencia tienen la navegación limitada al interior.",
      },
    ],
  },
];
