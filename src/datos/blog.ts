/**
 * Artículos del blog.
 *
 * Viven en código y no en la base porque son contenido editorial que cambia
 * con el despliegue, no con la operativa. Cada uno enlaza a las landings
 * transaccionales que le corresponden: un blog que no reparte autoridad a las
 * páginas que venden es un blog decorativo.
 */

import type { Idioma } from "@/lib/idiomas";
import type { Programable } from "@/lib/publicacion";
import type { Pagina } from "@/lib/rutas";

export interface Articulo extends Programable {
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

const CATEGORIA_ETIQUETA: Record<Articulo["categoria"], Record<Idioma, string>> = {
  Precios: { es: "Precios", en: "Prices", de: "Preise" },
  Normativa: { es: "Normativa", en: "Regulations", de: "Vorschriften" },
  Rutas: { es: "Rutas", en: "Routes", de: "Routen" },
  "Medio ambiente": { es: "Medio ambiente", en: "Environment", de: "Umwelt" },
};

/** Etiqueta visible de la categoría, localizada. La unión guarda el valor en
 * castellano como clave estable; esto la traduce para la página. */
export function etiquetaCategoria(categoria: string, idioma: Idioma): string {
  return CATEGORIA_ETIQUETA[categoria as Articulo["categoria"]]?.[idioma] ?? categoria;
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

**El amarre y las tasas portuarias** se cobran por día y van de 20 a 300 euros. En los puertos más demandados en agosto es donde más sube.

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
  {
    idioma: "en",
    slug: "que-hacer-si-aparecen-delfines",
    titulo: `Dolphins appear: what to do and what not to do`,
    entradilla: `It happens more often than people think off this coast. There is a royal decree that regulates how you must behave; almost nobody knows it, and failing to comply carries a penalty.`,
    fecha: "2026-08-30",
    minutos: 5,
    categoria: "Medio ambiente",
    cuerpo: `It happens without warning. You are out cruising, a fin appears and then another, and within ten seconds everyone on board is shouting and pointing. It is one of the things you remember most from a day on the water.

And it is also the moment when almost everyone does exactly what they should not: turn towards them and speed up.

## First things first: you do not see them by looking for them

Off this coast there are dolphins, above all bottlenose and striped dolphins. They are not a rarity, but they are not where you want them to be either. Anyone who sells you a trip with guaranteed dolphins is selling you hot air, and if the boat then chases them to keep the promise, the problem is doubled.

The honest approach is the opposite: go out sailing, and if they show up, it has been a good day.

## There is a rule, and it is quite a specific one

What almost nobody knows is that this is regulated. **Royal Decree 1727/2007** establishes measures for the protection of cetaceans in Spanish waters and defines a protection zone around the animal, with approach distances, speeds and permitted and prohibited manoeuvres.

In broad terms, and without this being a substitute for the text in force:

- **You do not chase them or cut across their course.** No getting in front of the group or separating the calves from the adults.
- **You do not speed up, change course abruptly or manoeuvre inside the protection zone.** The practical rule is a steady course and speed, or neutral.
- **You do not enter the water with them**, you do not touch them and you do not feed them.
- **There is a maximum number of vessels** allowed around a group at the same time. If there are already boats there, you do not join in.

Check the updated text before the season: the distances and the specific cases are set out in the regulation, and it is worth having them first-hand rather than second-hand.

## What actually works

Slow down to minimum speed or stop the engine and let yourself drift. With the boat still and quiet, dolphins come far closer than they would ever come to a boat chasing them: they are curious, and the one who decides the distance has to be the animal, not you.

If they come to the bow to ride the wave, keep a steady course and speed. Changing course with dolphins at the bow is like braking hard with someone behind you.

And put the phone away for five minutes. You are going to shoot a shaky video you will never watch again, and you will miss the only thing that is truly worth remembering.

## Why we are telling you this

Because the penalties for disturbing cetaceans are not symbolic, and because the skipper in charge of the boat is the one who answers for it. If you go out with a skipper, they know all this. If you go out on your own, now you do too.`,
    relacionados: [
      { texto: "Going to Tabarca by boat", pagina: { tipo: "lugar", slug: "tabarca" } },
      { texto: "The Isla de Benidorm by boat", pagina: { tipo: "lugar", slug: "isla-de-benidorm" } },
      { texto: "Boats with skipper", pagina: { tipo: "sinLicencia" } },
    ],
  },
  {
    idioma: "en",
    slug: "cruzarse-con-un-crucero-canal-de-puerto",
    titulo: `Crossing a cruise ship: the mistake that costs you dear`,
    entradilla: `A merchant ship or a cruise ship manoeuvring in a harbour channel cannot dodge you. Not that it would want to: it cannot. What the rule says, why the penalty is steep and how to cross a channel without getting in the way.`,
    fecha: "2026-08-30",
    minutos: 6,
    categoria: "Normativa",
    cuerpo: `It is a scene repeated every summer. A hired motorboat leaves the harbour, sees a large vessel in the distance, reckons it is going slowly and decides to cross in front of it. The vessel does not deviate. It is not arrogance: it simply cannot.

## Why it cannot get out of the way

A cruise ship or ferry entering port is doing three things at once that a pleasure boat never does. It is **boxed in a buoyed channel** it cannot leave, because there is not enough water at its sides for its draught. It is moving at **minimum steerage speed**, the exact speed at which the rudder still has effect: if it slows down further, it stops steering. And it needs **hundreds of metres to change course** and far more to stop.

Add that from the bridge there is a blind zone ahead of the bow that can be several hundred metres long. It is entirely possible that **they do not see you**.

## What the rule says

The international regulations for preventing collisions at sea are explicit about narrow channels: a small craft **must not impede the passage** of a vessel that can only navigate within the channel. It is not a question of who has right of way at an ordinary crossing; in that situation you simply have no right to get in the way.

And there is a second layer: in port waters, the port's own rules also apply, regulating where pleasure craft enter and leave, at what speed and which areas are reserved for commercial traffic.

## The penalty is a hefty one

This is where many people get a surprise. This is not treated as a traffic offence: it falls under the **consolidated text of the State Ports and Merchant Marine Act** (Royal Legislative Decree 2/2011, articles 305 to 315), the regulation that the Port of Alicante itself publishes in its catalogue of offences.

There it is expressly listed: *"failing to comply with the instructions of the Capitanías Marítimas within their remit concerning the manoeuvring and navigation of vessels in ports"*. And what decides the tier is not only the damage caused:

- It becomes **serious** when the damage exceeds €1,200 or when the conduct **endangers the safety of the vessel or of navigation**.
- It becomes **very serious** when the damage exceeds €6,000 or when the danger to safety is grave.

Read that part again: **you do not need to collide or break anything**. Simply endangering the safety of navigation is enough, and forcing a vessel boxed in a channel to alter its manoeuvre is exactly that. The amounts for each tier are set by the law itself and are worth checking in their updated form, but we are talking about sums that will not be covered by the hire's security deposit.

## How to cross a channel

Four things that hold in any port:

**Cross at right angles and without hesitation.** If you have to cross a channel, do it at a right angle and decisively, not diagonally or at half speed. The less time you spend inside it, the better for everyone.

**Never in front.** The temptation to cross "while there is time" is exactly the mistake. Always behind, even if it means waiting three minutes.

**Make yourself seen early and clearly.** An early, obvious manoeuvre tells the bridge that you have seen them. Nobody interprets a small last-moment correction.

**Listen to the VHF.** Commercial traffic announces its manoeuvres. With the harbour channel on, you find out that a ferry is about to leave before you see it.

## And what you will not read here

**How to enter and leave a specific port.** Each port has its own rules, its buoyed channels and its reserved areas, and these change from one port to another and are reviewed. Asking at the yacht club before your first departure takes two minutes and they are happy to explain, because they too do not want a scare in their harbour mouth.

If you go out with a skipper, they already have this sorted. If you go out on your own and it is your first time in that port, it is the question that simply has to be asked.`,
    relacionados: [
      { texto: "Boat hire in Alicante", pagina: { tipo: "destino", destino: "alicante" } },
      { texto: "What licence do I need", pagina: { tipo: "guia", slug: "que-titulacion-necesito-para-llevar-un-barco" } },
      { texto: "Boats with skipper", pagina: { tipo: "sinLicencia" } },
    ],
  },
  {
    idioma: "en",
    slug: "posidonia-tabarca-por-que-el-agua-es-asi",
    titulo: `The Posidonia of Tabarca: why the water is the way it is`,
    entradilla: `The clarity of the water around the island is neither chance nor luck: it is a plant. What Posidonia is, what role it plays in Spain's first marine reserve and why anchoring is regulated.`,
    fecha: "2026-08-30",
    minutos: 6,
    categoria: "Medio ambiente",
    cuerpo: `Anyone who reaches Tabarca on a calm day says the same thing: the water does not look like it belongs here. You can see the bottom at depths where nothing is visible anywhere else along this coast. It is not luck, nor a quirk of the currents. It is a plant.

## It is not an alga

*Posidonia oceanica* is a plant with roots, leaves, flowers and fruits, like a tree. It is not an alga, even though it looks like one and everyone calls it that. It forms underwater meadows that grow very slowly —in the order of a centimetre a year— and can be thousands of years old.

Those meadows do three things at once. They fix the sediment on the bottom, which is why the water does not cloud over with every surge of the sea. They oxygenate the water column. And they are the nursery for a large share of the species that are later caught further out, because the juveniles grow up hidden among the leaves.

When a meadow disappears, you do not notice it the next day: you notice it ten years later, when the water is murky and there is no fish. And restoring it is not a matter of one season, but of well over a century.

## That is why Tabarca is a marine reserve

In 1986 Tabarca became **Spain's first marine reserve**. It was the first time the country decided to protect an area of sea the same way a natural park is protected on land, and the main reason was exactly this: a seagrass meadow in good condition and everything that lives within it.

Forty years later, the difference is plain to see from the deck of any boat. What along other stretches of coast is a brown, churned-up bottom is still a living meadow here.

## What that means when you arrive by boat

A marine reserve is not a cove with a good reputation: it is a legal designation with zoning, prohibited activities and enforcement. In Tabarca there are areas where fishing is not allowed, nothing may be collected and anchoring is restricted. The buoyage is marked and must be respected.

**The specific conditions —which areas, which activities and at what times of year— are set by the administration and reviewed.** We deliberately do not give them here as a closed list: an outdated list would do more harm than no list at all, because someone would read it and act on it. Check what is allowed on the day with the yacht club or the competent authority. If you go out with a skipper, they have it under control; if you go on your own, ask at the pontoon before casting off. Nobody minds that question.

What can be said without qualification: **anchoring on a seagrass meadow is prohibited** and carries a penalty. An anchor dragging through a patch tears up in ten seconds what took a century to grow.

## And the fine is not symbolic

It is worth knowing before you set out, because many people assume this is an environmental recommendation and it is not. Posidonia is a habitat protected by European and Spanish legislation, and damaging it inside a marine reserve is not sanctioned as a minor offence: it falls into the serious tiers of the natural heritage legislation, where the amounts run **into tens of thousands of euros and can go much higher** depending on the extent of the damage.

Add to that the fact that in summer the area is patrolled, and that the trail left by an anchor dragged over a meadow is perfectly visible from the air and from the water for years. It is not an offence that is hard to prove.

Put another way: the saving from anchoring anywhere instead of asking where you may is zero euros, and the risk runs to several zeros.

## What you can do

Not much, and that is why it counts. Ask before you set out. Respect the buoyage even when nobody is watching. And do not assume that because something was allowed last year, it is still the same this year.

It is a place that has been conserved for forty years because quite a few people did exactly that.`,
    relacionados: [
      { texto: "Going to Tabarca by boat", pagina: { tipo: "lugar", slug: "tabarca" } },
      { texto: "Boat hire in Santa Pola", pagina: { tipo: "destino", destino: "santa-pola" } },
      { texto: "Boats without a licence in Santa Pola", pagina: { tipo: "sinLicenciaDestino", destino: "santa-pola" } },
    ],
  },
  {
    idioma: "en",
    slug: "cuanto-cuesta-alquilar-un-barco-en-espana",
    titulo: `What hiring a boat in Spain really costs`,
    entradilla: `The rate advertised by the platforms is between 40% and 130% lower than what you end up paying. Here are all the charges that appear afterwards, with figures.`,
    fecha: "2026-06-12",
    minutos: 8,
    categoria: "Precios",
    cuerpo: `Search for any day boat on any platform and you will see a round number: €250, €300, €350. That number is almost never what you will pay. Not because anyone is lying, but because the advertised price is only the hire of the hull, and the rest is added at the last step of the booking process, when you have already spent twenty minutes choosing.

Let us go through the charges, one by one.

**Fuel is the big one.** A 250 hp motorboat uses between 35 and 45 litres per hour of cruising. A normal day of coves is four hours of engine: between 140 and 180 litres. At €1.65 per litre of marine diesel, that is between €230 and €300. Almost as much as the hire. On a sailing boat the problem does not exist —it uses four litres an hour and only for manoeuvring— and on a yacht it shoots up: 140 litres an hour is more than €900 a day.

**Final cleaning** is a one-off payment of between €60 and €250 depending on the size. It is not negotiable and does not appear in the rate.

**The mooring and port fees** are charged per day and range from €20 to €300. In the busiest harbours in August, that is where they climb the most.

**VAT** is 21%, and it applies to everything above. On €600 of charges that is €126 more.

**The security deposit** is not a cost: it is blocked on the card and released when you return the boat. It ranges from €300 on a small RIB to €12,000 on a yacht. It is not part of the price, but it is part of the money you need to have available.

### The complete example

A Quicksilver Activ 675 in Dénia, one day in August, four hours of cruising:

- Hire: €344
- Fuel (140 l): €231
- Cleaning: €68
- Mooring and fees: €38
- VAT: €143
- **Total: €824**

The advertised rate for that same boat is €255. The real price is 3.2 times higher.

### How to pay less

What lowers the bill the most is not haggling, it is choosing well.

**Change the month.** June and September cost around 25% less than August, with the water at the same temperature. May and October, up to 45% less.

**Look at consumption before the rate.** Between two similar motorboats, the 150 hp one will use half the diesel of the 250 hp one. Over a week that difference is several hundred euros.

**Extend the stay.** Cleaning is a one-off payment: spread over seven days instead of one, it stops weighing on the bill. And from a week onwards almost all boats apply discounts of 15% to 22%.

**Consider a sailing boat.** If you are not in a hurry, a 12-metre sailing boat costs less overall than an 8-metre motorboat, because fuel is negligible.`,
    relacionados: [
      { texto: "See boats with the final price calculated", pagina: { tipo: "busqueda" } },
      { texto: "Sailing boat hire in Spain", pagina: { tipo: "tipoBarco", tipoBarco: "velero" } },
      { texto: "Boat hire in Dénia", pagina: { tipo: "destino", destino: "denia" } },
    ],
  },
  {
    idioma: "de",
    slug: "que-hacer-si-aparecen-delfines",
    titulo: `Delfine tauchen auf: was tun und was nicht`,
    entradilla: `Es passiert häufiger, als man denkt, vor dieser Küste. Es gibt ein königliches Dekret, das das Verhalten in ihrer Nähe regelt; kaum jemand kennt es, und wer es nicht befolgt, muss mit einer Strafe rechnen.`,
    fecha: "2026-08-30",
    minutos: 5,
    categoria: "Medio ambiente",
    cuerpo: `Es passiert ohne Vorwarnung. Man ist unterwegs, eine Finne taucht auf, dann noch eine, und innerhalb von zehn Sekunden schreit und zeigt an Bord jeder. Es gehört zu den Dingen, die man von einem Tag auf dem Boot am meisten in Erinnerung behält.

Und es ist zugleich der Moment, in dem fast alle genau das tun, was sie nicht tun sollten: auf sie zudrehen und Gas geben.

## Das Wichtigste zuerst: Man sieht sie nicht, indem man nach ihnen sucht

Vor dieser Küste gibt es Delfine, vor allem Große Tümmler und Streifendelfine. Sie sind keine Seltenheit, aber sie sind auch nicht dort, wo man sie haben möchte. Wer Ihnen einen Ausflug mit garantierten Delfinen verkauft, verkauft Ihnen heiße Luft, und wenn das Boot sie dann verfolgt, um das Versprechen zu halten, ist das Problem doppelt.

Das Ehrliche ist das Gegenteil: Fahren Sie zum Segeln hinaus, und wenn sie auftauchen, war es ein guter Tag.

## Es gibt eine Regel, und sie ist ziemlich konkret

Was fast niemand weiß: Das ist geregelt. Das **Königliche Dekret 1727/2007** legt Schutzmaßnahmen für Wale und Delfine in spanischen Gewässern fest und definiert eine Schutzzone um das Tier, mit Annäherungsabständen, Geschwindigkeiten sowie erlaubten und verbotenen Manövern.

Im Großen und Ganzen, und ohne dass dies den geltenden Wortlaut ersetzt:

- **Man verfolgt sie nicht und kreuzt ihnen nicht den Weg.** Niemals sich vor die Gruppe setzen oder die Jungtiere von den Erwachsenen trennen.
- **Man beschleunigt nicht, ändert nicht abrupt den Kurs und manövriert nicht innerhalb der Schutzzone.** Die praktische Regel lautet: konstanter Kurs und konstante Geschwindigkeit – oder Leerlauf.
- **Man geht nicht mit ihnen ins Wasser**, fasst sie nicht an und füttert sie nicht.
- **Es gibt eine Höchstzahl gleichzeitig anwesender Boote** rund um eine Gruppe. Wenn bereits Boote da sind, reiht man sich nicht ein.

Schauen Sie sich vor der Saison den aktualisierten Wortlaut an: Die Abstände und die konkreten Fälle stehen in der Verordnung, und man sollte sie aus erster Hand kennen, nicht vom Hörensagen.

## Was tatsächlich funktioniert

Reduzieren Sie auf minimale Geschwindigkeit oder stellen Sie den Motor ab und lassen Sie sich treiben. Bei einem ruhigen, stillen Boot kommen Delfine viel näher heran, als sie je einem Boot nahe kämen, das sie verfolgt: Sie sind neugierig, und über den Abstand entscheiden muss das Tier, nicht Sie.

Wenn sie zum Bug kommen, um die Welle zu surfen, halten Sie Kurs und Geschwindigkeit konstant. Mit Delfinen am Bug den Kurs zu ändern ist, als würde man scharf bremsen, während jemand hinter einem fährt.

Und lassen Sie das Handy fünf Minuten in der Tasche. Sie werden ein verwackeltes Video drehen, das Sie nie wieder ansehen, und dabei das Einzige verpassen, woran man sich wirklich erinnert.

## Warum wir Ihnen das erzählen

Weil die Strafen für das Stören von Walen und Delfinen nicht symbolisch sind und weil der Skipper, der das Boot führt, verantwortlich ist. Wenn Sie mit Skipper ausfahren, weiß er das bereits. Wenn Sie auf eigene Faust ausfahren, wissen Sie es jetzt.`,
    relacionados: [
      { texto: "Mit dem Boot nach Tabarca", pagina: { tipo: "lugar", slug: "tabarca" } },
      { texto: "Die Isla de Benidorm mit dem Boot", pagina: { tipo: "lugar", slug: "isla-de-benidorm" } },
      { texto: "Boote mit Skipper", pagina: { tipo: "sinLicencia" } },
    ],
  },
  {
    idioma: "de",
    slug: "cruzarse-con-un-crucero-canal-de-puerto",
    titulo: `Kreuzfahrtschiff im Hafenkanal: der teure Fehler`,
    entradilla: `Ein Frachter oder ein Kreuzfahrtschiff, das im Hafenkanal manövriert, kann Ihnen nicht ausweichen. Es will es auch gar nicht: Es kann es nicht. Was die Regel sagt, warum die Strafe hoch ist und wie man einen Kanal kreuzt, ohne zu behindern.`,
    fecha: "2026-08-30",
    minutos: 6,
    categoria: "Normativa",
    cuerpo: `Eine Szene, die sich jeden Sommer wiederholt. Ein gemietetes Motorboot verlässt den Hafen, sieht in der Ferne ein großes Schiff, schätzt, dass es langsam fährt, und beschließt, vor ihm zu kreuzen. Das Schiff weicht nicht aus. Das ist keine Arroganz: Es kann nicht.

## Warum es nicht ausweichen kann

Ein Kreuzfahrtschiff oder eine Fähre, das beziehungsweise die in den Hafen einläuft, tut gleichzeitig drei Dinge, die ein Freizeitboot nie tut. Es fährt **eingezwängt in einem betonnten Kanal**, aus dem es nicht ausweichen kann, weil seitlich nicht genug Wasser für seinen Tiefgang ist. Es fährt mit **minimaler Manövriergeschwindigkeit**, also genau der Geschwindigkeit, bei der das Ruder noch wirkt: Bremst es stärker, lässt es sich nicht mehr steuern. Und es braucht **Hunderte von Metern, um den Kurs zu ändern**, und weit mehr, um zum Stehen zu kommen.

Dazu kommt, dass es von der Brücke aus eine tote Zone vor dem Bug gibt, die mehrere hundert Meter lang sein kann. Es ist durchaus möglich, dass **man Sie nicht sieht**.

## Was die Regel sagt

Die internationalen Regeln zur Verhütung von Zusammenstößen auf See sind bei engen Fahrwassern eindeutig: Ein kleines Boot **darf die Durchfahrt** eines Schiffes, das nur innerhalb des Kanals navigieren kann, **nicht behindern**. Es geht nicht darum, wer bei einer normalen Kreuzung Vorrang hat; dort hat man schlicht kein Recht, im Weg zu sein.

Und es gibt eine zweite Ebene: In Hafengewässern gelten außerdem die Regeln des jeweiligen Hafens, die festlegen, auf welchen Wegen Freizeitboote ein- und auslaufen, mit welcher Geschwindigkeit und welche Bereiche dem gewerblichen Verkehr vorbehalten sind.

## Die Strafe ist happig

Hier überkommt viele die Überraschung. Das wird nicht wie ein Verkehrsverstoß behandelt: Es fällt unter die **konsolidierte Fassung des Gesetzes über die staatlichen Häfen und die Handelsmarine** (Königliches Gesetzesdekret 2/2011, Artikel 305 bis 315), jene Vorschrift, die der Hafen von Alicante selbst in seinem Verzeichnis der Verstöße veröffentlicht.

Dort ist ausdrücklich geregelt: *„die Nichtbeachtung der Anweisungen der Capitanías Marítimas im Rahmen ihrer Zuständigkeiten bezüglich der Manöver und der Navigation der Schiffe in den Häfen"*. Und was über die Stufe entscheidet, ist nicht nur der verursachte Schaden:

- Sie wird **schwerwiegend**, wenn der Schaden 1.200 Euro übersteigt oder wenn das Verhalten **die Sicherheit des Schiffes oder der Schifffahrt gefährdet**.
- Sie wird **sehr schwerwiegend**, wenn der Schaden 6.000 Euro übersteigt oder die Gefahr für die Sicherheit schwerwiegend ist.

Lesen Sie diesen Teil noch einmal: **Man muss weder kollidieren noch etwas kaputt machen.** Es genügt, die Sicherheit der Schifffahrt zu gefährden – und ein Schiff, das in einem Kanal eingezwängt ist, zu einer Änderung seines Manövers zu zwingen, ist genau das. Die Beträge der einzelnen Stufen legt das Gesetz selbst fest, und es ist ratsam, sie in aktualisierter Fassung zu prüfen – aber wir sprechen hier über Summen, die nicht von der Kaution des Verleihs gedeckt sind.

## Wie man einen Kanal kreuzt

Vier Dinge, die in jedem Hafen gelten:

**Kreuzen Sie im rechten Winkel und ohne Zögern.** Wenn Sie einen Kanal überqueren müssen, tun Sie es rechtwinklig und entschlossen, nicht diagonal und nicht mit halber Geschwindigkeit. Je weniger Zeit Sie darin verbringen, desto besser für alle.

**Niemals davor.** Die Versuchung, noch „rechtzeitig" vorbeizukommen, ist genau der Fehler. Immer dahinter, selbst wenn das bedeutet, drei Minuten zu warten.

**Machen Sie sich früh und deutlich sichtbar.** Ein frühes, eindeutiges Manöver zeigt der Brücke, dass man sie gesehen hat. Eine kleine Korrektur in letzter Sekunde deutet niemand.

**Hören Sie auf UKW-Funk.** Der gewerbliche Verkehr kündigt seine Manöver an. Wer den Hafenkanal eingestellt hat, erfährt, dass eine Fähre ausläuft, bevor man sie sieht.

## Und was Sie hier nicht lesen werden

**Wie man in einen bestimmten Hafen ein- und ausläuft.** Jeder Hafen hat seine eigenen Vorschriften, seine betonnten Kanäle und seine reservierten Bereiche, und das ändert sich von Hafen zu Hafen und wird regelmäßig überarbeitet. Im Yachtclub vor der ersten Ausfahrt zu fragen dauert zwei Minuten, und man erklärt es Ihnen gerne – denn auch dort möchte niemand einen Schrecken an der eigenen Hafeneinfahrt.

Wenn Sie mit Skipper ausfahren, hat er das bereits geregelt. Wenn Sie auf eigene Faust ausfahren und zum ersten Mal in diesem Hafen sind, ist das die Frage, die man unbedingt stellen muss.`,
    relacionados: [
      { texto: "Bootsvermietung in Alicante", pagina: { tipo: "destino", destino: "alicante" } },
      { texto: "Welchen Führerschein brauche ich", pagina: { tipo: "guia", slug: "que-titulacion-necesito-para-llevar-un-barco" } },
      { texto: "Boote mit Skipper", pagina: { tipo: "sinLicencia" } },
    ],
  },
  {
    idioma: "de",
    slug: "posidonia-tabarca-por-que-el-agua-es-asi",
    titulo: `Die Posidonia von Tabarca: warum das Wasser so klar ist`,
    entradilla: `Die Klarheit des Wassers vor der Insel ist weder Zufall noch Glück: Es ist eine Pflanze. Was die Posidonia ist, welche Rolle sie in Spaniens erstem Meeresschutzgebiet spielt und warum das Ankern reguliert ist.`,
    fecha: "2026-08-30",
    minutos: 6,
    categoria: "Medio ambiente",
    cuerpo: `Jeder, der an einem ruhigen Tag nach Tabarca kommt, sagt dasselbe: Das Wasser wirkt nicht von hier. Man sieht den Grund in einer Tiefe, in der man an anderen Küstenabschnitten längst nichts mehr sieht. Es ist kein Zufall und keine Besonderheit der Strömungen. Es ist eine Pflanze.

## Es ist keine Alge

*Posidonia oceanica* ist eine Pflanze mit Wurzeln, Blättern, Blüten und Früchten, wie ein Baum. Sie ist keine Alge, auch wenn sie so aussieht und alle sie so nennen. Sie bildet Unterwasserwiesen, die sehr langsam wachsen – in der Größenordnung von einem Zentimeter pro Jahr – und mehrere tausend Jahre alt sein können.

Diese Wiesen leisten gleich dreierlei. Sie fixieren das Sediment am Grund, weshalb das Wasser nicht bei jedem Wellengang trüb wird. Sie oxygenieren die Wassersäule. Und sie sind die Kinderstube für einen großen Teil der Arten, die weiter draußen später gefangen werden, denn die Jungfische wachsen versteckt zwischen den Blättern auf.

Wenn eine Wiese verschwindet, merkt man es nicht am nächsten Tag: Man merkt es zehn Jahre später, wenn das Wasser trüb ist und es keinen Fisch mehr gibt. Und sie wiederherzustellen ist keine Frage einer Saison, sondern eines langen Jahrhunderts.

## Darum ist Tabarca ein Meeresschutzgebiet

1986 wurde Tabarca zum **ersten Meeresschutzgebiet Spaniens**. Zum ersten Mal beschloss dieses Land, ein Stück Meer genauso zu schützen, wie an Land ein Naturpark geschützt wird – und der Hauptgrund war genau das: eine Posidonia-Seegraswiese in gutem Zustand und alles, was in ihr lebt.

Vierzig Jahre später ist der Unterschied vom Deck jedes Bootes mit bloßem Auge zu sehen. Was an anderen Küstenabschnitten ein brauner, aufgewühlter Grund ist, ist hier immer noch eine lebendige Wiese.

## Was das bedeutet, wenn man mit dem Boot ankommt

Ein Meeresschutzgebiet ist keine Bucht mit gutem Ruf: Es ist eine Rechtsfigur mit Zonierung, verbotenen Aktivitäten und Überwachung. Auf Tabarca gibt es Bereiche, in denen nicht gefischt werden darf, nichts gesammelt werden darf und das Ankern eingeschränkt ist. Die Betonnung ist ausgewiesen und muss respektiert werden.

**Die konkreten Bedingungen – welche Bereiche, welche Aktivitäten und zu welchen Zeiten – legt die Verwaltung fest, und sie werden regelmäßig überprüft.** Wir nennen sie hier bewusst nicht als abgeschlossene Liste: Eine veraltete Liste würde mehr Schaden anrichten als gar keine, denn jemand würde sie lesen und entsprechend handeln. Erkundigen Sie sich am Tag Ihrer Fahrt beim Yachtclub oder bei der zuständigen Behörde, was erlaubt ist. Wenn Sie mit Skipper ausfahren, hat er es im Griff; wenn Sie auf eigene Faust unterwegs sind, fragen Sie am Steg, bevor Sie die Leinen loswerfen. Niemand nimmt diese Frage übel.

Was man ohne Einschränkung sagen kann: **Das Ankern über einer Posidonia-Seegraswiese ist verboten** und zieht eine Strafe nach sich. Ein Anker, der durch einen Bestand schleift, reißt in zehn Sekunden heraus, was ein Jahrhundert zum Wachsen gebraucht hat.

## Und die Geldstrafe ist nicht symbolisch

Das sollte man wissen, bevor man ausläuft, denn viele gehen davon aus, dass dies eine ökologische Empfehlung ist – und das ist es nicht. Die Posidonia ist ein Lebensraum, der durch europäische und spanische Vorschriften geschützt ist, und ihre Beschädigung innerhalb eines Meeresschutzgebiets wird nicht als geringfügiger Verstoß geahndet: Sie fällt in die schwerwiegenden Stufen der Naturschutzgesetzgebung, in denen die Beträge **in Zehntausenden von Euro liegen und je nach Ausmaß des Schadens noch weit höher steigen können**.

Dazu kommt, dass die Zone im Sommer überwacht wird und dass die Spur, die ein über eine Wiese geschleifter Anker hinterlässt, jahrelang aus der Luft und vom Wasser aus perfekt sichtbar ist. Das ist kein Verstoß, der schwer nachzuweisen wäre.

Anders gesagt: Die Ersparnis, irgendwo zu ankern, statt zu fragen, wo man darf, beträgt null Euro – und das Risiko hat mehrere Nullen.

## Was Sie tun können

Nicht viel – und genau deshalb zählt es. Fragen, bevor man ausläuft. Die Betonnung respektieren, auch wenn niemand zusieht. Und nicht davon ausgehen, dass, was im letzten Jahr erlaubt war, in diesem Jahr noch genauso gilt.

Es ist ein Ort, der seit vierzig Jahren bewahrt wird, weil ziemlich viele Menschen genau das getan haben.`,
    relacionados: [
      { texto: "Mit dem Boot nach Tabarca", pagina: { tipo: "lugar", slug: "tabarca" } },
      { texto: "Bootsvermietung in Santa Pola", pagina: { tipo: "destino", destino: "santa-pola" } },
      { texto: "Boote ohne Führerschein in Santa Pola", pagina: { tipo: "sinLicenciaDestino", destino: "santa-pola" } },
    ],
  },
  {
    idioma: "de",
    slug: "cuanto-cuesta-alquilar-un-barco-en-espana",
    titulo: `Was es wirklich kostet, ein Boot in Spanien zu mieten`,
    entradilla: `Der von den Plattformen angezeigte Tarif liegt 40 bis 130 Prozent unter dem, was am Ende bezahlt wird. Hier sind alle Posten, die danach dazukommen – mit Zahlen.`,
    fecha: "2026-06-12",
    minutos: 8,
    categoria: "Precios",
    cuerpo: `Suchen Sie auf einer beliebigen Plattform nach einem Tagesboot, sehen Sie eine glatte Zahl: 250 €, 300 €, 350 €. Diese Zahl ist fast nie das, was Sie bezahlen werden. Nicht weil jemand lügt, sondern weil der angezeigte Preis nur die Miete des Rumpfes ist und der Rest im letzten Schritt des Buchungsvorgangs dazukommt – wenn man bereits zwanzig Minuten mit der Auswahl verbracht hat.

Gehen wir die Posten durch, einen nach dem anderen.

**Der Treibstoff ist der große Posten.** Ein Motorboot mit 250 PS verbraucht zwischen 35 und 45 Litern pro Fahrstunde. Ein normaler Buchtentag bedeutet vier Stunden Motor: zwischen 140 und 180 Litern. Bei 1,65 € pro Liter Marine-Diesel sind das zwischen 230 und 300 Euro. Fast so viel wie die Miete. Bei einem Segelboot existiert das Problem nicht – es verbraucht vier Liter pro Stunde und nur zum Manövrieren –, und bei einer Yacht explodiert es: 140 Liter pro Stunde sind über 900 Euro am Tag.

**Die Endreinigung** ist eine einmalige Zahlung zwischen 60 und 250 Euro, je nach Größe. Sie ist nicht verhandelbar und taucht im Tarif nicht auf.

**Der Liegeplatz und die Hafengebühren** werden pro Tag berechnet und liegen zwischen 20 und 300 Euro. In den gefragtesten Häfen im August steigen sie am stärksten.

**Die MwSt.** beträgt 21 % und wird auf alles Vorherige aufgeschlagen. Bei 600 Euro an Posten sind das 126 Euro mehr.

**Die Kaution** ist kein Kostenpunkt: Sie wird auf der Karte blockiert und bei der Rückgabe des Bootes freigegeben. Sie reicht von 300 Euro bei einem kleinen Schlauchboot bis 12.000 Euro bei einer Yacht. Sie ist nicht Teil des Preises, aber schon Teil des Geldes, das man verfügbar haben muss.

### Das vollständige Beispiel

Eine Quicksilver Activ 675 in Dénia, ein Tag im August, vier Fahrstunden:

- Miete: 344 €
- Treibstoff (140 l): 231 €
- Reinigung: 68 €
- Liegeplatz und Gebühren: 38 €
- MwSt.: 143 €
- **Gesamt: 824 €**

Der angezeigte Tarif für genau dieses Boot beträgt 255 €. Der reale Preis ist 3,2-mal so hoch.

### Wie man weniger bezahlt

Was die Rechnung am stärksten senkt, ist nicht Feilschen, sondern gut wählen.

**Wechseln Sie den Monat.** Juni und September kosten rund 25 % weniger als August, bei Wasser derselben Temperatur. Mai und Oktober bis zu 45 % weniger.

**Achten Sie auf den Verbrauch, bevor Sie auf den Tarif schauen.** Zwischen zwei ähnlichen Motorbooten wird das mit 150 PS halb so viel Diesel verbrauchen wie das mit 250 PS. Auf eine Woche gerechnet sind das mehrere hundert Euro Unterschied.

**Verlängern Sie den Aufenthalt.** Die Reinigung ist eine einmalige Zahlung: Auf sieben Tage statt einen verteilt, drückt sie nicht mehr so stark. Und ab einer Woche gewähren fast alle Boote Rabatte von 15 bis 22 %.

**Ziehen Sie ein Segelboot in Betracht.** Wenn Sie es nicht eilig haben, kostet ein 12-Meter-Segelboot insgesamt weniger als ein 8-Meter-Motorboot, weil der Treibstoff zu vernachlässigen ist.`,
    relacionados: [
      { texto: "Boote mit berechnetem Endpreis ansehen", pagina: { tipo: "busqueda" } },
      { texto: "Segelboote mieten in Spanien", pagina: { tipo: "tipoBarco", tipoBarco: "velero" } },
      { texto: "Bootsvermietung in Dénia", pagina: { tipo: "destino", destino: "denia" } },
    ],
  },
];
