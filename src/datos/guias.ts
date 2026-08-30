/**
 * Guías perennes.
 *
 * Se separan del blog a propósito. Un artículo lleva fecha y envejece; una
 * guía sobre titulaciones o sobre qué debe llevar un contrato no debería
 * parecer vieja en marzo por haberse publicado en octubre. Aquí no hay
 * fecha visible: hay fecha de revisión, que es otra cosa.
 *
 * Son las páginas que sostienen los clusters informativos y las que reparten
 * autoridad hacia las landings que venden. También son las que tienen
 * búsquedas en invierno, cuando el alquiler está muerto: por eso son las
 * primeras que hay que escribir.
 */

import type { Idioma } from "@/lib/idiomas";
import type { Programable } from "@/lib/publicacion";
import { estaPublicado, soloPublicados } from "@/lib/publicacion";
import type { Pagina } from "@/lib/rutas";

export interface Guia extends Programable {
  /** Idioma en el que está escrita. No se traduce automáticamente nada. */
  idioma: Idioma;
  slug: string;
  titulo: string;
  entradilla: string;
  /** Última revisión. Se pinta como tal, no como fecha de publicación. */
  revisada: string;
  minutos: number;
  publico: "cliente" | "armador";
  cuerpo: string;
  preguntas: { pregunta: string; respuesta: string }[];
  relacionados: { texto: string; pagina: Pagina }[];
}

export const GUIAS: Guia[] = [
  {
    idioma: "es",
    slug: "licencia-de-navegacion-que-te-ensenan",
    titulo: "La licencia de navegación: qué te enseñan de verdad",
    entradilla:
      "Es el título más corto que existe y el que más cambia el día de barco. Esto es lo que se ve en el curso, por qué cada cosa está ahí y qué se sigue sin poder hacer después.",
    revisada: "2026-08-30",
    minutos: 8,
    publico: "cliente",
    cuerpo: `La licencia de navegación —el «titulín», como la llama todo el mundo— es la puerta de entrada al sistema de titulaciones. Es corta, no tiene el peso de examen del PER y mucha gente la despacha como un trámite.

Es un error entenderla así. No es un trámite: es el mínimo que hace falta para que un día de barco no dependa de la suerte.

## Qué se ve en el curso

El temario es corto porque está pensado para una cosa muy concreta: que puedas salir con un barco pequeño, cerca de la costa, de día, y volver sin haber puesto a nadie en riesgo. Todo lo que hay dentro está por ese motivo.

**Nomenclatura y partes del barco.** Proa, popa, babor, estribor, amuras, aletas. Parece lo tonto del curso y es lo que hace que después entiendas una instrucción por radio o lo que te dice alguien desde otro barco. Cuando alguien te grita «por tu aleta de estribor», o sabes qué significa o no sirve de nada que te lo griten.

**El equipo de seguridad y su uso.** No dónde está: cómo se usa. Chalecos y cómo se ajustan de verdad, aro salvavidas, extintores, bengalas, achique. Es la parte que todo el mundo escucha con menos atención y la única que importa el día que importa.

**Balizamiento.** Qué significan las marcas laterales y las cardinales, qué te está diciendo una boya verde y qué una roja, y por dónde se pasa. Es el idioma escrito del mar, y sin él navegas leyendo solo la mitad del mensaje.

**Reglas de rumbo y gobierno.** Quién se aparta de quién, cómo se cruza, qué se hace en un canal angosto. Aquí entra algo que casi nadie tiene interiorizado y que da más sustos que ninguna otra cosa: un buque grande maniobrando no puede apartarse de ti.

**Maniobra.** Salir del amarre, atracar, y sobre todo el hombre al agua: parar, no perderlo de vista nunca y volver. Se practica porque leerlo no sirve de nada.

**Fondeo.** Cómo se echa el ancla, cuánta cadena hace falta y cómo se comprueba que ha agarrado. También dónde no se fondea y por qué, que en esta costa tiene consecuencias legales además de prácticas.

**Meteorología básica.** Leer un parte, entender qué significa una previsión de viento y saber que en el Mediterráneo la tarde no se parece a la mañana.

**Comunicaciones y emergencias.** El canal de emergencia, cómo se pide ayuda, qué datos hay que dar y en qué orden. Se dice una vez y se olvida, y por eso conviene apuntárselo y llevarlo a bordo.

## Y luego están las prácticas

La parte teórica se olvida a los quince días. Lo que se queda es el rato en el barco: notar cómo responde el timón a velocidad lenta, ver que el viento te mueve la proa mientras maniobras, y comprobar que atracar bien es cuestión de ir despacio y de mirar antes, no de habilidad.

Si el sitio donde te formas te despacha las prácticas en veinte minutos, cambia de sitio.

## Lo que la licencia NO te da

Y esto es lo que más gente confunde:

- **No te habilita para cualquier barco.** Hay límites de eslora y de potencia, y por encima de ellos hace falta otro título.
- **No te habilita para alejarte cuanto quieras.** Hay un límite de distancia a un puerto o lugar de abrigo.
- **No te habilita para navegar de noche.**
- **No te da experiencia.** Te da el permiso; lo otro se hace saliendo.

**Los límites concretos los fija la normativa y se revisan cada cierto tiempo**, así que no los damos aquí como cifra cerrada: consúltalos en la fuente oficial o pregúntalos en la escuela antes de matricularte. Lo que sí es estable es la idea: es un título para navegación cercana, diurna y en embarcaciones pequeñas.

## ¿Merece la pena?

Depende de una sola cosa: cuántas veces piensas salir.

Si vas a alquilar una vez al año, no. Alquila con patrón, disfruta del día y déjate de papeles: sale más barato y aprendes más mirando cómo lo hace él.

Si vas a salir tres o cuatro veces cada verano, sí, y con creces. La licencia se saca en poco tiempo, el coste se recupera en dos alquileres al no pagar patrón, y sobre todo cambia la relación con el día: dejas de ser pasajero.

Y hay un momento bueno para hacerlo. **En invierno.** Las escuelas tienen hueco, las prácticas se hacen sin el agobio de agosto y llegas a Semana Santa con el título en la mano en vez de en lista de espera.`,
    preguntas: [
      {
        pregunta: "¿Qué se aprende en el curso de licencia de navegación?",
        respuesta:
          "Nomenclatura del barco, uso del equipo de seguridad, balizamiento, reglas de rumbo y gobierno, maniobra —incluida la de hombre al agua—, fondeo, meteorología básica y comunicaciones de emergencia. Más las prácticas a bordo, que es lo único que de verdad se queda.",
      },
      {
        pregunta: "¿Qué no puedo hacer con la licencia de navegación?",
        respuesta:
          "Llevar barcos por encima de sus límites de eslora y potencia, alejarte más de la distancia permitida a un puerto o lugar de abrigo, y navegar de noche. Los límites concretos los fija la normativa y se revisan: consúltalos en la fuente oficial antes de matricularte.",
      },
      {
        pregunta: "¿Merece la pena sacársela?",
        respuesta:
          "Si alquilas una vez al año, no: sale mejor ir con patrón. Si sales tres o cuatro veces cada verano, sí. El coste se recupera en dos alquileres al no pagar patrón, y cambia la relación con el día: dejas de ser pasajero.",
      },
      {
        pregunta: "¿Cuándo es mejor hacer el curso?",
        respuesta:
          "En invierno. Las escuelas tienen hueco, las prácticas se hacen sin el agobio de agosto y llegas a Semana Santa con el título en la mano en vez de en lista de espera.",
      },
    ],
    relacionados: [
      { texto: "Qué titulación necesito", pagina: { tipo: "guia", slug: "que-titulacion-necesito-para-llevar-un-barco" } },
      { texto: "Barcos sin licencia en Santa Pola", pagina: { tipo: "sinLicenciaDestino", destino: "santa-pola" } },
      { texto: "Barcos sin licencia en Dénia", pagina: { tipo: "sinLicenciaDestino", destino: "denia" } },
      { texto: "Cruzarse con un crucero", pagina: { tipo: "articulo", slug: "cruzarse-con-un-crucero-canal-de-puerto" } },
    ],
  },
  {
    idioma: "es",
    slug: "que-titulacion-necesito-para-llevar-un-barco",
    titulo: "Qué titulación necesito para llevar un barco",
    entradilla:
      "La duda que más frena una reserva. Qué se puede gobernar con cada título, qué se puede llevar sin ninguno y por qué con patrón la pregunta desaparece.",
    revisada: "2026-08-30",
    minutos: 7,
    publico: "cliente",
    cuerpo: `Es la primera pregunta de casi todo el mundo y la que más reservas frena. La respuesta corta es que sí puedes alquilar sin tener nada, pero conviene entender por qué, porque hay dos caminos distintos y no sirven para lo mismo.

## Los dos caminos

**El primero es alquilar una embarcación pequeña**, de las que la normativa permite gobernar sin título. Son barcos de poca eslora y potencia limitada, con un radio de navegación corto y solo de día. Antes de salir te dan en el pantalán una explicación de seguridad: cómo se arranca y se para el motor, cómo se fondea, hasta dónde puedes llegar y qué hacer si algo falla. No es un trámite: es lo único que llevas encima cuando sueltas amarras.

**El segundo es alquilar con patrón.** Entonces la titulación la pone él y tú no necesitas absolutamente nada. Decides adónde ir y de gobernar se encarga otro. Sale más caro por día, pero si vais seis u ocho personas el reparto por cabeza cambia poco, y te quita de encima el único requisito que no puedes saltarte.

La diferencia práctica entre los dos no es el precio, es **el radio**. Con una embarcación sin titulación te mueves por la costa cercana al puerto. Con patrón, el día se estira: desde Santa Pola llegas a Tabarca, desde Calpe rodeas el Peñón de Ifach, desde Benidorm cruzas a la isla.

## Los títulos, de menor a mayor

Cuando quieres gobernar tú algo más grande, entras en el sistema de titulaciones. De menos a más alcance:

- **La licencia de navegación**, a veces llamada «titulín». Es la puerta de entrada: un curso corto, sin examen teórico, que habilita para embarcaciones pequeñas de día y cerca de la costa.
- **El PNB**, patrón de navegación básica. Ya con examen, permite más eslora y más distancia.
- **El PER**, patrón de embarcaciones de recreo. Es el que tiene casi todo el que alquila «barco solo» de forma habitual, y el que abre la mayoría del catálogo.
- Por encima quedan el **patrón de yate** y el **capitán de yate**, que ya son otra liga y rara vez hacen falta para alquilar.

**Los límites concretos de cada título —eslora, potencia, millas de la costa, navegación diurna o nocturna— los fija la normativa y se revisan cada cierto tiempo.** No los damos aquí como cifra cerrada a propósito: una cifra desactualizada en esta página sería peor que no ponerla. Consúltalos en la fuente oficial o pregúntalos en el club antes de reservar, y mira siempre la ficha del barco, donde indicamos si exige título.

## Lo que sí puedes dar por hecho

Que **con patrón no necesitas nada**. Ni título, ni experiencia, ni saber leer una carta. Es la fórmula que usa la mayoría de la gente que está de vacaciones, y no tiene ningún demérito: en muchos sitios del mundo es directamente la única forma de alquilar.

Que **la explicación de seguridad es obligatoria** y que si el sitio donde alquilas te la despacha en dos minutos, mal asunto. Diez o quince minutos es lo normal.

Y que **el seguro del barco debe cubrir el alquiler**. No es tu responsabilidad comprobarlo, pero sí puedes preguntarlo. Si la respuesta es vaga, cambia de barco.

## Si es tu primera vez

Vete con patrón. No por incapacidad: por aprovechar el día. La primera salida con un barco desconocido se va en entender los mandos, calcular distancias y no perder de vista el puerto. Con patrón a bordo miras la costa en vez de mirar el GPS, y de paso aprendes lo suficiente como para que la segunda vez sí tenga sentido ir solo.`,
    preguntas: [
      {
        pregunta: "¿Puedo alquilar un barco sin ninguna titulación?",
        respuesta:
          "Sí, por dos vías: una embarcación pequeña de las que la normativa permite gobernar sin título, tras la explicación de seguridad en el pantalán, o cualquier barco con patrón a bordo, que es quien pone la titulación.",
      },
      {
        pregunta: "¿Qué diferencia hay entre ir sin título y con patrón?",
        respuesta:
          "El radio. Sin título te mueves por la costa cercana al puerto y solo de día. Con patrón el día se estira y entran los destinos que están más lejos, como Tabarca desde Santa Pola o la Isla de Benidorm.",
      },
      {
        pregunta: "¿Qué título necesito para alquilar barcos más grandes?",
        respuesta:
          "El PER es el que abre la mayoría del catálogo y el que tiene casi todo el que alquila habitualmente sin patrón. Por debajo están el PNB y la licencia de navegación; por encima, el patrón y el capitán de yate.",
      },
      {
        pregunta: "¿Cuántas millas puedo alejarme con cada titulación?",
        respuesta:
          "Los límites de eslora, potencia y distancia los fija la normativa y se revisan periódicamente, así que conviene consultarlos en la fuente oficial y no fiarse de una cifra leída en cualquier web. En la ficha de cada barco indicamos si exige título.",
      },
    ],
    relacionados: [
      { texto: "Barcos sin licencia en Benidorm", pagina: { tipo: "sinLicenciaDestino", destino: "benidorm" } },
      { texto: "Barcos sin licencia en Santa Pola", pagina: { tipo: "sinLicenciaDestino", destino: "santa-pola" } },
      { texto: "Barcos sin licencia en Calpe", pagina: { tipo: "sinLicenciaDestino", destino: "calpe" } },
      { texto: "Qué te enseñan en el curso de licencia", pagina: { tipo: "guia", slug: "licencia-de-navegacion-que-te-ensenan" } },
      { texto: "Ir a Tabarca en barco", pagina: { tipo: "lugar", slug: "tabarca" } },
    ],
  },
  {
    idioma: "es",
    slug: "contrato-de-alquiler-de-embarcacion",
    titulo: "Contrato de alquiler de embarcación: qué debe llevar",
    entradilla:
      "Lo que se firma antes de soltar amarras protege a las dos partes. Qué cláusulas no pueden faltar, cuáles generan discusiones y qué se documenta antes de salir.",
    revisada: "2026-08-30",
    minutos: 8,
    publico: "armador",
    cuerpo: `Casi todas las discusiones entre armador y arrendatario vienen de lo mismo: algo que nadie escribió. Un rasguño que ya estaba, un depósito de combustible que se devolvió a medias, una hora de retraso que nadie sabía si se cobraba. El contrato no existe para cuando todo va bien; existe para el diez por ciento de las veces en que algo se tuerce.

Esto es lo que debería llevar, punto por punto.

## Quién, qué y cuándo

**Las partes identificadas**, con documento y domicilio. Si quien alquila no es quien va a gobernar el barco, los dos deben constar: el arrendatario y el patrón, con su titulación anotada.

**La embarcación identificada sin ambigüedad**: nombre, matrícula, eslora, motor y número de plazas autorizadas. Lo de las plazas no es un detalle burocrático — es el límite legal de personas a bordo y conviene que esté escrito.

**El periodo exacto**, con hora de entrega y de devolución, y qué pasa si se devuelve tarde. Un recargo por hora, escrito, evita la discusión entera.

## El dinero

**El precio desglosado.** Qué incluye y qué no: combustible, limpieza, amarre, tasas. La mayor fuente de conflicto del sector es que el precio anunciado y el precio final no coinciden, y el contrato es donde eso se cierra.

**El combustible, con criterio explícito.** Las dos fórmulas habituales son «se entrega lleno y se devuelve lleno» o «se cobra el consumo real al volver». Las dos funcionan; lo que no funciona es no decirlo. Si es la primera, conviene anotar la lectura del indicador a la salida.

**La fianza**: importe, forma de retención y **plazo de devolución**. Este último es el que más se olvida y el que más enfada. Un plazo escrito —cuarenta y ocho horas, una semana— resuelve el noventa por ciento de las quejas.

## Lo que pasa si algo va mal

**El seguro**: compañía, número de póliza, qué cubre y cuál es la franquicia. El arrendatario tiene derecho a saber de qué responde él.

**Daños y su procedimiento**: cómo se documentan, quién los valora y en qué plazo. Aquí es donde el inventario de entrega vale su peso en oro.

**Cancelación**, por las dos partes. Y muy importante en náutica: **qué pasa si el parte marítimo impide salir**. Que la meteorología no es culpa de nadie lo sabe todo el mundo, pero si no está escrito, alguien va a discutir el reembolso.

**Prohibiciones y límites**: zona de navegación autorizada, navegación nocturna, número máximo de personas, mascotas, subarriendo.

## El inventario de entrega, que no es papeleo

Antes de soltar amarras se recorre el barco con el arrendatario y se anota el estado: casco, motor, electrónica, equipo de seguridad, nivel de combustible. **Con fotos fechadas.**

Esto parece burocracia hasta la primera vez que aparece un golpe en el costado y nadie sabe si estaba antes. Con veinte fotos hechas delante del cliente, la conversación dura un minuto. Sin ellas, dura una semana y termina mal para alguien.

## Antes de usar una plantilla

Cualquier modelo que encuentres —incluido cualquier resumen como este— es un punto de partida, no un documento válido para tu caso. La actividad de alquiler tiene requisitos propios según cómo se explote, y las obligaciones fiscales de un particular que alquila su barco no son las de una empresa de chárter. **Que lo revise un asesor antes de firmarlo con nadie.** Es un gasto pequeño una sola vez, frente a un problema que se repite en cada temporada.`,
    preguntas: [
      {
        pregunta: "¿Qué cláusulas no pueden faltar en un contrato de alquiler de barco?",
        respuesta:
          "Identificación de las partes y del patrón, datos de la embarcación con sus plazas autorizadas, periodo con horas de entrega y devolución, precio desglosado, criterio del combustible, fianza con plazo de devolución, seguro y franquicia, procedimiento de daños, cancelación y política meteorológica.",
      },
      {
        pregunta: "¿Qué pasa si el mal tiempo impide salir?",
        respuesta:
          "Debe estar escrito en el contrato. Si no se dice nada, la devolución acaba discutiéndose. Lo razonable es ligarla a un aviso oficial y devolver el importe cuando la salida no es posible.",
      },
      {
        pregunta: "¿Es obligatorio hacer inventario de entrega?",
        respuesta:
          "Legalmente es otra cuestión, pero en la práctica es lo que evita casi todas las discusiones por daños. Recorrer el barco con el cliente y hacer veinte fotos fechadas convierte una discusión de una semana en una conversación de un minuto.",
      },
      {
        pregunta: "¿Me vale una plantilla descargada de internet?",
        respuesta:
          "Como punto de partida, sí. Como documento definitivo, no: la actividad de alquiler tiene requisitos propios según cómo se explote, y no es lo mismo un particular que una empresa de chárter. Que lo revise un asesor antes de firmarlo.",
      },
    ],
    relacionados: [
      { texto: "Publica tu barco", pagina: { tipo: "publicar" } },
      { texto: "Cuánto puede ganar tu barco", pagina: { tipo: "guia", slug: "cuanto-puede-ganar-tu-barco" } },
      { texto: "Cómo funciona", pagina: { tipo: "comoFunciona" } },
    ],
  },
  {
    idioma: "es",
    slug: "cuanto-puede-ganar-tu-barco",
    // Programada: sale sola el 15 de septiembre. El calendario editorial se
    // escribe entero de una vez y va publicándose sin que nadie se acuerde.
    publicaDesde: "2026-09-15",
    titulo: "Cuánto puede ganar tu barco alquilado",
    entradilla:
      "Qué entra, qué sale y qué queda. Las cuentas reales de alquilar una embarcación en la Costa Blanca, con los gastos que casi nadie suma.",
    revisada: "2026-08-30",
    minutos: 9,
    publico: "armador",
    cuerpo: `Un barco de recreo está amarrado alrededor de trescientos veinte días al año y pagando amarre los trescientos sesenta y cinco. Esa es toda la lógica del alquiler: no convertirlo en un negocio, sino que deje de ser solo un gasto.

Vamos con las cuentas, sin adornos.

## Lo que entra

En la Costa Blanca, una lancha de seis a ocho metros se alquila por entre 250 y 450 euros al día en temporada alta, y entre un 25 y un 45 % menos fuera de ella. Un velero de once o doce metros se mueve entre 600 y 800.

La variable que decide todo no es la tarifa: es **la ocupación**. Un barco bien gestionado en esta costa hace entre cuarenta y sesenta días al año, concentrados brutalmente entre junio y septiembre. Uno mal gestionado —fotos malas, calendario desactualizado, respuestas a los dos días— se queda en quince o veinte.

Con cuarenta y cinco días a una media de 320 euros, son unos **14.400 euros brutos al año**.

## Lo que sale

Y aquí es donde las cuentas de servilleta se rompen, porque casi nadie suma todo:

- **La comisión de la plataforma.** Es lo primero que mira todo el mundo y va del 15 al 22 % según dónde publiques.
- **El amarre**, que ya pagabas, pero que ahora conviene contar: entre 2.000 y 5.000 euros al año según puerto y eslora.
- **El seguro**, que sube al pasar de uso privado a alquiler. Cuenta un incremento notable sobre lo que pagas ahora, y no lo dejes sin declarar: una póliza de recreo que no contempla el alquiler no cubre un siniestro durante el alquiler.
- **El mantenimiento**, que se dispara. Un barco que sale cuarenta días al año necesita más servicios de motor, más limpieza y más reposición que uno que sale diez.
- **La limpieza entre salidas**, entre 40 y 80 euros cada una si la externalizas.
- **El desgaste**, que no aparece en ninguna factura pero se cobra solo el día que vendes el barco.

Sumando comisión, seguro adicional, mantenimiento extra y limpieza, es realista que entre el **45 y el 60 %** del bruto se vaya en costes directos.

## Lo que queda

De esos 14.400 euros brutos, quedan aproximadamente entre **6.000 y 8.000 euros netos** antes de impuestos.

No es un sueldo. Sí es, en la mayoría de los casos, **el amarre pagado y buena parte del mantenimiento cubierto**, que es exactamente el motivo por el que la gente empieza a alquilar. El barco pasa de costar dinero a costar poco o nada.

## Las tres cosas que más mueven la aguja

**Las fotos.** Es el factor con más impacto y el más barato de corregir. Un barco con ocho fotos buenas de una jornada de sol alquila el doble que el mismo barco con tres fotos oscuras hechas en el pantalán un martes de noviembre.

**El calendario al día.** Un barco cuyo calendario no se toca en tres semanas deja de recibir solicitudes, porque nadie quiere reservar y esperar a ver si contestan. Es el factor que separa a los que hacen cuarenta y cinco días de los que hacen veinte.

**El tiempo de respuesta.** Cuando alguien pide fecha, normalmente está pidiendo tres o cuatro barcos a la vez. El primero que contesta se lleva la reserva. No el mejor: el primero.

## Lo que hay que resolver antes de empezar

Alquilar tu barco tiene implicaciones fiscales y, según cómo se explote, requisitos administrativos propios. No es lo mismo un particular que cede su barco algunos fines de semana que una actividad continuada. **Consúltalo con un asesor antes de la primera salida**, no después de la temporada: resolverlo cuesta poco al principio y mucho más tarde.`,
    preguntas: [
      {
        pregunta: "¿Cuánto se saca alquilando un barco en la Costa Blanca?",
        respuesta:
          "Una lancha de 6 a 8 metros con una ocupación razonable de 45 días al año puede hacer unos 14.400 euros brutos. Descontando comisión, seguro adicional, mantenimiento extra y limpieza, quedan entre 6.000 y 8.000 netos antes de impuestos.",
      },
      {
        pregunta: "¿Cuántos días al año se alquila un barco?",
        respuesta:
          "Entre cuarenta y sesenta días si está bien gestionado, concentrados entre junio y septiembre. Con fotos flojas, calendario desactualizado o respuestas lentas, la cifra baja a quince o veinte.",
      },
      {
        pregunta: "¿Qué gastos se olvidan al hacer las cuentas?",
        respuesta:
          "El aumento del seguro al pasar de uso privado a alquiler, el mantenimiento extra que genera salir cuarenta días en vez de diez, la limpieza entre salidas y el desgaste, que no aparece en ninguna factura pero se cobra el día que vendes el barco.",
      },
      {
        pregunta: "¿Qué es lo que más aumenta las reservas?",
        respuesta:
          "Las fotos, el calendario al día y el tiempo de respuesta. Quien pide fecha suele preguntar a tres o cuatro barcos a la vez, y la reserva se la lleva el primero que contesta, no el mejor.",
      },
    ],
    relacionados: [
      { texto: "Publica tu barco", pagina: { tipo: "publicar" } },
      { texto: "El contrato de alquiler", pagina: { tipo: "guia", slug: "contrato-de-alquiler-de-embarcacion" } },
    ],
  },
];

export function obtenerGuia(slug: string, idioma: Idioma): Guia | undefined {
  const guia = GUIAS.find((g) => g.slug === slug && g.idioma === idioma);
  return guia && estaPublicado(guia) ? guia : undefined;
}

/** Guías de un idioma. Las de cliente primero: son las de más búsqueda. */
export function guiasDe(idioma: Idioma): Guia[] {
  return soloPublicados(GUIAS.filter((g) => g.idioma === idioma)).sort((a, b) =>
    a.publico === b.publico ? 0 : a.publico === "cliente" ? -1 : 1,
  );
}

/** En qué idiomas existe una guía. Alimenta el hreflang sin prometer de más. */
export function idiomasDeLaGuia(slug: string): Idioma[] {
  return soloPublicados(GUIAS.filter((g) => g.slug === slug)).map((g) => g.idioma);
}
