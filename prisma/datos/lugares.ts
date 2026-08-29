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
];
