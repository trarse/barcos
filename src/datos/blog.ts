/**
 * Artículos del blog.
 *
 * Viven en código y no en la base porque son contenido editorial que cambia
 * con el despliegue, no con la operativa. Cada uno enlaza a las landings
 * transaccionales que le corresponden: un blog que no reparte autoridad a las
 * páginas que venden es un blog decorativo.
 */

import type { Idioma } from "@/lib/idiomas";
import type { Pagina } from "@/lib/rutas";

export interface Articulo {
  /** Idioma en el que está escrito. No se traduce automáticamente nada. */
  idioma: Idioma;
  slug: string;
  titulo: string;
  entradilla: string;
  fecha: string;
  minutos: number;
  categoria: "Precios" | "Normativa" | "Rutas" | "Medio ambiente";
  cuerpo: string;
  /**
   * Enlaces internos que se pintan al final. Se guardan como identidad de
   * página, no como URL: así apuntan al idioma correcto sin reescribirlos.
   */
  relacionados: { texto: string; pagina: Pagina }[];
}

export const ARTICULOS: Articulo[] = [
  {
    idioma: "es",
    slug: "que-hacer-si-aparecen-delfines",
    titulo: "Aparecen delfines: qué hacer y qué no",
    entradilla:
      "Pasa más de lo que la gente cree frente a esta costa. Hay un real decreto que regula cómo hay que comportarse, casi nadie lo conoce y no cumplirlo tiene sanción.",
    fecha: "2026-08-30",
    minutos: 5,
    categoria: "Medio ambiente",
    cuerpo: `Ocurre sin avisar. Vas navegando, aparece una aleta y luego otra, y en diez segundos tienes a bordo a todo el mundo gritando y señalando. Es de las cosas que más se recuerdan de un día de barco.

Y es también el momento en el que casi todo el mundo hace exactamente lo que no debe: virar hacia ellos y acelerar.

## Lo primero: no vas a verlos porque los busques

Frente a esta costa hay delfines, sobre todo mulares y listados. No son una rareza, pero tampoco están donde uno quiere. Cualquiera que te venda una salida con delfines garantizados te está vendiendo humo, y si además el barco los persigue para cumplir la promesa, el problema es doble.

Lo honesto es lo contrario: sal a navegar, y si aparecen, ha sido un buen día.

## Hay una norma, y es bastante concreta

Lo que casi nadie sabe es que esto está regulado. El **Real Decreto 1727/2007** establece medidas de protección de los cetáceos en aguas españolas y define un espacio de protección alrededor del animal, con distancias de aproximación, velocidades y maniobras permitidas y prohibidas.

En líneas generales, y sin que esto sustituya al texto vigente:

- **No se persigue ni se corta el rumbo.** Nada de interponerse por delante del grupo ni de separar a las crías de los adultos.
- **No se acelera, ni se cambia de rumbo bruscamente, ni se maniobra dentro de la zona de protección.** La regla práctica es rumbo y velocidad constantes, o punto muerto.
- **No se entra en el agua con ellos**, no se les toca y no se les da de comer.
- **Hay un número máximo de embarcaciones** simultáneas alrededor de un grupo. Si ya hay barcos, no te sumas.

Consulta el texto actualizado antes de la temporada: las distancias y los supuestos concretos están en la norma y conviene tenerlos de primera mano, no de oídas.

## Lo que sí funciona

Reduce a velocidad mínima o para el motor y déjate estar. Con el barco quieto y en silencio, los delfines se acercan mucho más de lo que se acercarían nunca a un barco persiguiéndolos: son curiosos y el que decide la distancia tiene que ser el animal, no tú.

Si vienen a la proa a surfear la ola, mantén rumbo y velocidad constantes. Cambiar de rumbo con delfines en la proa es como frenar en seco con alguien detrás.

Y guarda el móvil cinco minutos. Vas a hacer un vídeo movido que no vas a volver a ver, y te vas a perder lo único que de verdad se recuerda.

## Por qué te lo contamos

Porque las sanciones por molestar a cetáceos no son simbólicas y porque el patrón que lleve el barco es quien responde. Si sales con patrón, esto lo tiene sabido. Si sales por tu cuenta, ya lo sabes tú.`,
    relacionados: [
      { texto: "Ir a Tabarca en barco", pagina: { tipo: "lugar", slug: "tabarca" } },
      { texto: "La Isla de Benidorm en barco", pagina: { tipo: "lugar", slug: "isla-de-benidorm" } },
      { texto: "Barcos con patrón", pagina: { tipo: "sinLicencia" } },
    ],
  },
  {
    idioma: "es",
    slug: "cruzarse-con-un-crucero-canal-de-puerto",
    titulo: "Cruzarse con un crucero: el error que sale muy caro",
    entradilla:
      "Un mercante o un crucero maniobrando en el canal de un puerto no puede esquivarte. Ni quiere: no puede. Qué dice la regla, por qué la sanción es alta y cómo se cruza un canal sin estorbar.",
    fecha: "2026-08-30",
    minutos: 6,
    categoria: "Normativa",
    cuerpo: `Es una escena de todos los veranos. Una lancha de alquiler sale del puerto, ve un buque grande a lo lejos, calcula que va despacio y decide cruzar por delante. El buque no se desvía. No es prepotencia: es que no puede.

## Por qué no puede apartarse

Un crucero o un ferry entrando a puerto está haciendo tres cosas a la vez que un barco de recreo no hace nunca. Va **encajonado en un canal** balizado del que no puede salirse, porque a los lados no hay agua suficiente para su calado. Va **a velocidad mínima de gobierno**, que es la velocidad justa para que el timón siga teniendo efecto: si frena más, deja de gobernar. Y necesita **cientos de metros para cambiar de rumbo** y mucho más para detenerse.

Añade que desde su puente hay una zona ciega por delante de la proa que puede ser de varios centenares de metros. Es perfectamente posible que **no te vean**.

## Lo que dice la regla

El reglamento internacional para prevenir abordajes es explícito con los canales angostos: una embarcación pequeña **no debe estorbar el paso** de un buque que solo puede navegar dentro del canal. No es una cuestión de quién tiene preferencia en un cruce normal; es que ahí directamente no tienes derecho a estorbar.

Y hay una segunda capa: en aguas portuarias mandan además las normas del propio puerto, que regulan por dónde entran y salen las embarcaciones de recreo, a qué velocidad y qué zonas están reservadas al tráfico comercial.

## La sanción es de las gordas

Aquí es donde mucha gente se lleva la sorpresa. Esto no se trata como una infracción de tráfico: entra en el **texto refundido de la Ley de Puertos del Estado y de la Marina Mercante** (Real Decreto Legislativo 2/2011, artículos 305 a 315), que es la norma que el propio Puerto de Alicante publica en su catálogo de infracciones.

Ahí está tipificado expresamente *«incumplir las instrucciones de las Capitanías Marítimas en el ámbito de sus competencias sobre maniobras y navegación de los buques en los puertos»*. Y lo que decide el tramo no es solo el daño causado:

- Pasa a **grave** cuando los daños superan los 1.200 euros o cuando la conducta **pone en peligro la seguridad del buque o de la navegación**.
- Pasa a **muy grave** cuando los daños superan los 6.000 euros o el peligro para la seguridad es grave.

Lee otra vez esa parte: **no hace falta que choques ni que rompas nada**. Basta con poner en peligro la seguridad de la navegación, y obligar a un buque encajonado en un canal a alterar su maniobra es exactamente eso. Las cuantías de cada tramo las fija la propia ley y conviene consultarlas actualizadas, pero hablamos de importes que no se pagan con el depósito de la fianza del alquiler.

## Cómo se cruza un canal

Cuatro cosas que valen en cualquier puerto:

**Cruza perpendicular y sin dudar.** Si tienes que atravesar un canal, hazlo en ángulo recto y decidido, no en diagonal ni a media velocidad. Cuanto menos tiempo estés dentro, mejor para todos.

**Nunca por delante.** La tentación de pasar «que da tiempo» es exactamente el error. Por detrás siempre, aunque suponga esperar tres minutos.

**Hazte ver pronto y claro.** Una maniobra temprana y evidente le dice al puente que le has visto. Una corrección pequeña en el último momento no la interpreta nadie.

**Escucha la VHF.** El tráfico comercial anuncia sus maniobras. Con el canal del puerto puesto te enteras de que va a salir un ferry antes de verlo.

## Y lo que no vas a leer aquí

**Cómo se entra y se sale de un puerto concreto.** Cada puerto tiene su propia normativa, sus canales balizados y sus zonas reservadas, y eso cambia de uno a otro y se revisa. Preguntarlo en el club náutico antes de la primera salida lleva dos minutos y te lo explican encantados, porque a ellos tampoco les interesa que haya un susto en su bocana.

Si sales con patrón, esto ya lo lleva resuelto él. Si sales por tu cuenta y es tu primera vez en ese puerto, es la pregunta que sí o sí hay que hacer.`,
    relacionados: [
      { texto: "Alquiler de barcos en Alicante", pagina: { tipo: "destino", destino: "alicante" } },
      { texto: "Qué titulación necesito", pagina: { tipo: "guia", slug: "que-titulacion-necesito-para-llevar-un-barco" } },
      { texto: "Barcos con patrón", pagina: { tipo: "sinLicencia" } },
    ],
  },
  {
    idioma: "es",
    slug: "posidonia-tabarca-por-que-el-agua-es-asi",
    titulo: "La posidonia de Tabarca: por qué el agua es como es",
    entradilla:
      "La transparencia del agua de la isla no es casualidad ni suerte: es una planta. Qué es la posidonia, qué papel juega en la primera reserva marina de España y por qué el fondeo está regulado.",
    fecha: "2026-08-30",
    minutos: 6,
    categoria: "Medio ambiente",
    cuerpo: `Cualquiera que llegue a Tabarca en un día de calma dice lo mismo: que el agua no parece de aquí. Se ve el fondo a una profundidad a la que en otras partes de la costa ya no se ve nada. No es suerte, ni una peculiaridad de las corrientes. Es una planta.

## No es un alga

La *Posidonia oceanica* es una planta con raíces, hojas, flores y frutos, como un árbol. No es un alga, aunque lo parezca y aunque todo el mundo la llame así. Forma praderas submarinas que crecen muy despacio —del orden de un centímetro al año— y que pueden tener miles de años de antigüedad.

Esas praderas hacen tres cosas a la vez. Fijan el sedimento del fondo, y por eso el agua no se enturbia con cada golpe de mar. Oxigenan la columna de agua. Y son la guardería de buena parte de las especies que luego se pescan más allá, porque los alevines crecen escondidos entre las hojas.

Cuando desaparece una pradera no se nota al día siguiente: se nota diez años después, cuando el agua está turbia y no hay pesca. Y recuperarla no es cuestión de una temporada, sino de un siglo largo.

## Por eso Tabarca es reserva marina

En 1986 Tabarca se convirtió en la **primera reserva marina de España**. Fue la primera vez que este país decidió proteger un trozo de mar del mismo modo que se protege un parque natural en tierra, y el motivo principal era exactamente esto: una pradera de posidonia en buen estado y lo que vive dentro de ella.

Cuarenta años después, la diferencia se ve a simple vista desde la cubierta de cualquier barco. Lo que en otros tramos de costa es un fondo pardo y revuelto, aquí sigue siendo pradera viva.

## Lo que eso implica cuando llegas en barco

Una reserva marina no es una cala con buena fama: es una figura legal con zonificación, con actividades prohibidas y con vigilancia. En Tabarca hay áreas donde no se puede pescar, no se puede recoger nada y el fondeo está restringido. El balizamiento está señalizado y hay que respetarlo.

**Las condiciones concretas —qué zonas, qué actividades y en qué épocas— las fija la administración y se revisan.** No las damos aquí como lista cerrada a propósito: una lista desactualizada haría más daño que no ponerla, porque alguien la leería y actuaría en consecuencia. Confirma qué está permitido el día que vayas con el club náutico o con la autoridad competente. Si sales con patrón, él lo tiene controlado; si vas por tu cuenta, pregúntalo en el pantalán antes de largar amarras. Nadie se molesta por esa pregunta.

Lo que sí se puede decir sin matices: **fondear sobre pradera de posidonia está prohibido** y conlleva sanción. Un ancla arrastrando por una mata arranca en diez segundos lo que ha tardado un siglo en crecer.

## Y la multa no es simbólica

Conviene saberlo antes de salir, porque mucha gente asume que esto es una recomendación ecológica y no lo es. La posidonia es un hábitat protegido por la normativa europea y española, y dañarla dentro de una reserva marina no se sanciona como una infracción menor: entra en los tramos graves de la legislación de patrimonio natural, donde las cuantías se cuentan **en decenas de miles de euros y pueden llegar mucho más arriba** según la extensión del daño.

A eso se suma que en verano hay vigilancia en la zona, y que el rastro que deja un ancla arrastrada sobre una pradera es perfectamente visible desde el aire y desde el agua durante años. No es una infracción difícil de probar.

Dicho de otro modo: el ahorro de fondear donde sea en vez de preguntar dónde se puede es de cero euros, y el riesgo es de varios ceros.

## Lo que puedes hacer tú

Poca cosa, y por eso cuenta. Preguntar antes de salir. Respetar el balizamiento aunque no haya nadie mirando. Y no dar por hecho que porque el año pasado se pudiera hacer algo, este año siga igual.

Es un sitio que lleva cuarenta años conservándose porque bastante gente hizo justo eso.`,
    relacionados: [
      { texto: "Ir a Tabarca en barco", pagina: { tipo: "lugar", slug: "tabarca" } },
      { texto: "Alquiler de barcos en Santa Pola", pagina: { tipo: "destino", destino: "santa-pola" } },
      { texto: "Barcos sin licencia en Santa Pola", pagina: { tipo: "sinLicenciaDestino", destino: "santa-pola" } },
    ],
  },
  {
    idioma: "es",
    slug: "cuanto-cuesta-alquilar-un-barco-en-espana",
    titulo: "Cuánto cuesta de verdad alquilar un barco en España",
    entradilla:
      "La tarifa que anuncian las plataformas es entre un 40 y un 130 % inferior a lo que se acaba pagando. Estos son todos los conceptos que aparecen después, con cifras.",
    fecha: "2026-06-12",
    minutos: 8,
    categoria: "Precios",
    cuerpo: `Busca cualquier lancha de día en cualquier plataforma y verás un número redondo: 250 €, 300 €, 350 €. Ese número casi nunca es lo que pagarás. No porque nadie mienta, sino porque el precio anunciado es solo el alquiler del casco y el resto se suma en el último paso del proceso de reserva, cuando ya has invertido veinte minutos eligiendo.

Vamos con los conceptos, uno a uno.

**El combustible es el grande.** Una lancha de 250 caballos consume entre 35 y 45 litros por hora de navegación. Un día normal de calas son cuatro horas de motor: entre 140 y 180 litros. A 1,65 € el litro de gasóleo náutico, eso son entre 230 y 300 euros. Casi tanto como el alquiler. En un velero el problema no existe —consume cuatro litros a la hora y solo para maniobrar— y en un yate se dispara: 140 litros a la hora son más de 900 euros al día.

**La limpieza final** es un pago único de entre 60 y 250 euros según el tamaño. No es negociable y no aparece en la tarifa.

**El amarre y las tasas portuarias** se cobran por día y van de 20 a 300 euros. En puertos con lista de espera, como Ibiza en agosto, es donde más sube.

**El IVA** es el 21 %, y se aplica sobre todo lo anterior. Sobre 600 euros de conceptos son 126 euros más.

**La fianza** no es un coste: se bloquea en la tarjeta y se libera al devolver el barco. Va de 300 euros en una neumática pequeña a 12.000 en un yate. No forma parte del precio, pero sí del dinero que necesitas tener disponible.

### El ejemplo completo

Una Quicksilver Activ 675 en Dénia, un día de agosto, cuatro horas de navegación:

- Alquiler: 344 €
- Combustible (140 l): 231 €
- Limpieza: 68 €
- Amarre y tasas: 38 €
- IVA: 143 €
- **Total: 824 €**

La tarifa anunciada para ese mismo barco es 255 €. El precio real es 3,2 veces mayor.

### Cómo pagar menos

Lo que más baja la factura no es regatear, es elegir bien.

**Cambia el mes.** Junio y septiembre cuestan alrededor de un 25 % menos que agosto con el agua a la misma temperatura. Mayo y octubre, hasta un 45 % menos.

**Mira el consumo antes que la tarifa.** Entre dos lanchas parecidas, la de 150 caballos gastará la mitad de gasóleo que la de 250. En una semana esa diferencia son varios cientos de euros.

**Alarga la estancia.** La limpieza es un pago único: repartida entre siete días en vez de uno, deja de pesar. Y a partir de una semana casi todos los barcos aplican descuentos del 15 al 22 %.

**Plantéate el velero.** Si no tienes prisa, un velero de 12 metros cuesta menos que una lancha de 8 en total, porque el combustible es anecdótico.`,
    relacionados: [
      { texto: "Ver barcos con el precio final calculado", pagina: { tipo: "busqueda" } },
      { texto: "Alquiler de veleros en España", pagina: { tipo: "tipoBarco", tipoBarco: "velero" } },
      { texto: "Alquiler de barcos en Dénia", pagina: { tipo: "destino", destino: "denia" } },
    ],
  },
];

export function obtenerArticulo(slug: string, idioma: Idioma): Articulo | undefined {
  return ARTICULOS.find((a) => a.slug === slug && a.idioma === idioma);
}

/**
 * Artículos de un idioma, del más reciente al más antiguo.
 *
 * No hay respaldo al castellano a propósito: servir un texto en español
 * dentro de una página marcada como inglesa es peor que no tener el artículo,
 * tanto para quien lo lee como para quien lo indexa.
 */
export function articulosPorFecha(idioma: Idioma): Articulo[] {
  return ARTICULOS.filter((a) => a.idioma === idioma).sort((a, b) =>
    b.fecha.localeCompare(a.fecha),
  );
}

/** En qué idiomas existe un artículo. Alimenta el `hreflang`. */
export function idiomasDelArticulo(slug: string): Idioma[] {
  return ARTICULOS.filter((a) => a.slug === slug).map((a) => a.idioma);
}
