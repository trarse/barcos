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
  latitud: number;
  longitud: number;
  clase: "isla" | "cabo" | "cala" | "cueva";
  orden: number;
  accesos: AccesoSemilla[];
  preguntas: { pregunta: string; respuesta: string }[];
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
      },
      {
        pregunta: "¿Se puede ir a Tabarca sin licencia de navegación?",
        respuesta:
          "Con patrón a bordo, sí desde cualquier puerto: la titulación la pone él. Sin ningún título, solo es planteable desde Santa Pola y en día tranquilo, porque desde Alicante la travesía queda fuera del alcance de esas embarcaciones.",
      },
      {
        pregunta: "¿Qué está prohibido en la reserva marina de Tabarca?",
        respuesta:
          "Hay zonas donde no se puede pescar ni recoger ninguna especie, y el balizamiento hay que respetarlo. Las condiciones se revisan periódicamente, así que confirma qué está permitido el día que vayas antes de salir del puerto.",
      },
      {
        pregunta: "¿Cuál es la mejor época para ir a Tabarca?",
        respuesta:
          "Septiembre y octubre. El agua sigue caliente, la visibilidad es mejor que en pleno verano y hay la mitad de gente que en agosto. Si vas en temporada alta, sal temprano.",
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
      },
      {
        pregunta: "¿Cuánto se tarda al Ifach desde Calpe?",
        respuesta:
          "Quince minutos desde la bocana. Desde Altea unos treinta bordeando el Mascarat, desde Moraira treinta y cinco y desde Benidorm alrededor de cincuenta.",
      },
      {
        pregunta: "¿A qué hora se ve mejor el Peñón desde el barco?",
        respuesta:
          "A primera hora de la mañana. La cara sur, sobre la Cala del Racó, tiene el sol de frente y se aprecian las capas de roca. A media tarde queda a contraluz y pierde.",
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
      },
      {
        pregunta: "¿Se puede ir a la Isla de Benidorm sin licencia?",
        respuesta:
          "Con patrón, sí, y es lo más habitual entre quien está de vacaciones. Con una embarcación de las que se llevan sin título es alcanzable desde Benidorm y Villajoyosa en día tranquilo, pero no desde puertos más lejanos.",
      },
      {
        pregunta: "¿Merece la pena media jornada o hace falta el día entero?",
        respuesta:
          "Media jornada llega de sobra: veinte minutos de travesía, tiempo de baño y vuelta. Si quieres encadenar la isla con la Cala Tío Ximo o la Almadrava para comer, entonces sí compensa el día completo.",
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
      },
      {
        pregunta: "¿Merece la pena ir por mar en vez de por carretera?",
        respuesta:
          "En julio y agosto, mucho. La bajada es una carretera estrecha con un aparcamiento pequeño que se llena a las nueve de la mañana. Desde el agua no hay cola ni aparcamiento.",
      },
      {
        pregunta: "¿Se puede llegar a la Granadella sin titulación?",
        respuesta:
          "Con patrón, sí. Con una embarcación de las que se llevan sin título queda fuera del radio permitido, y además hay que doblar el Cabo de la Nao, que cambia el estado del mar de un lado al otro.",
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
      },
      {
        pregunta: "¿Cuánto se tarda a la Cova Tallada?",
        respuesta:
          "Desde Dénia, unas tres millas y veinticinco minutos largos bordeando Les Rotes. Desde Jávea, alrededor de treinta pasando el cabo por el otro lado.",
      },
      {
        pregunta: "¿Es más fácil llegar por mar o por tierra?",
        respuesta:
          "Por mar la logística es mucho más sencilla. El sendero de tierra es exigente y está sujeto a limitaciones de aforo y autorización en temporada, con condiciones que cambian de un año a otro.",
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
      },
      {
        pregunta: "¿A qué hora se ven mejor?",
        respuesta:
          "Por la mañana. La pared tiene el sol de frente a primera hora y el agua coge el color de las fotos; a media tarde queda a contraluz.",
      },
      {
        pregunta: "¿Qué más hay cerca?",
        respuesta:
          "La Cala Sardinera, sin acceso rodado y por eso muy tranquila, y a diez minutos hacia el sur el Portitxol y la Isla del Descubridor. Los tres encadenados son el mejor medio día desde Jávea.",
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
      },
      {
        pregunta: "¿Sale mejor desde Alicante o desde El Campello?",
        respuesta:
          "Para el barco da casi igual: quince minutos desde Campello, veinte desde Alicante. La diferencia real está en el aparcamiento, y en agosto Campello gana.",
      },
      {
        pregunta: "¿Cuáles son las calas del Cabo de las Huertas?",
        respuesta:
          "Cantalars, la Palmera y los Judíos, más una serie de entrantes pequeños. Son de roca plana, no de arena, y por eso el agua se ve de un color distinto al del resto de la bahía.",
      },
    ],
  },
];
