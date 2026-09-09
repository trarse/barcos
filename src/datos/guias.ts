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
  // === Español ===
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

  // === English ===
  {
    idioma: "en",
    slug: "licencia-de-navegacion-que-te-ensenan",
    titulo: "The navigation licence: what they really teach you",
    entradilla:
      "It's the shortest qualification there is and the one that changes your day on the water the most. Here's what the course covers, why each part is there, and what you still won't be able to do afterwards.",
    revisada: "2026-08-30",
    minutos: 8,
    publico: "cliente",
    cuerpo: `The navigation licence — the «titulín», as everyone calls it — is the gateway to the system of boating qualifications. It's short, it doesn't carry the exam weight of the Recreational Craft Skipper (PER), and plenty of people write it off as a formality.

It's a mistake to understand it that way. It isn't a formality: it's the minimum you need so that a day on the water doesn't come down to luck.

## What the course covers

The syllabus is short because it's designed for one very specific thing: that you can take out a small boat, close to the coast, in daylight, and come back without having put anyone at risk. Everything in it is there for that reason.

**Boat nomenclature and parts.** Bow, stern, port, starboard, bows and quarters. It seems like the silly part of the course, and it's what lets you understand an instruction over the radio or something someone shouts from another boat. When someone yells "off your starboard quarter" at you, either you know what it means or there's no point in them yelling it.

**Safety equipment and how to use it.** Not where it is: how it's used. Life jackets and how they're properly adjusted, lifebuoy, fire extinguishers, flares, bailing. It's the part everyone listens to least and the only one that matters on the day that matters.

**Buoyage.** What lateral and cardinal marks mean, what a green buoy is telling you and what a red one is, and which side you pass on. It's the written language of the sea, and without it you're navigating while reading only half of the message.

**Rules of the road and steering.** Who gives way to whom, how you cross, what you do in a narrow channel. Here comes something almost nobody has internalised and that causes more frights than anything else: a large vessel manoeuvring can't get out of your way.

**Manoeuvring.** Leaving the mooring, docking, and above all man overboard: stop, never lose sight of them, and come back. It's practised because reading about it is useless.

**Anchoring.** How to let out the anchor, how much chain you need and how to check that it has gripped. Also where you don't anchor and why, which on this coast has legal consequences as well as practical ones.

**Basic meteorology.** Reading a weather report, understanding what a wind forecast means, and knowing that in the Mediterranean the afternoon doesn't look like the morning.

**Communications and emergencies.** The emergency channel, how to call for help, what information to give and in what order. It's said once and forgotten, which is why it's worth writing it down and keeping it on board.

## Then there's the practical part

The theory is forgotten within a fortnight. What stays is the time on the boat: feeling how the helm responds at slow speed, seeing the wind move your bow while you manoeuvre, and discovering that docking well is a matter of going slowly and looking ahead first, not of skill.

If the place where you train fobs you off with the practical part in twenty minutes, change places.

## What the licence does NOT give you

And this is what most people get confused about:

- **It doesn't qualify you for just any boat.** There are length and power limits, and above them you need another qualification.
- **It doesn't let you go as far as you like.** There's a limit on distance from a port or place of refuge.
- **It doesn't allow you to sail at night.**
- **It doesn't give you experience.** It gives you the permit; the rest is done by going out.

**The specific limits are set by the regulations and are reviewed from time to time**, so we don't give them here as a fixed figure: check them with the official source or ask the school before you enrol. What is stable is the idea: it's a qualification for near-coastal, daytime navigation in small craft.

## Is it worth it?

It depends on a single thing: how often you plan to go out.

If you're going to hire once a year, no. Hire with a skipper, enjoy the day and forget about the paperwork: it works out cheaper, and you learn more watching how he does it.

If you're going to go out three or four times every summer, yes — and then some. The licence is obtained in a short time, the cost is recovered in two hires by not paying a skipper, and above all it changes your relationship with the day: you stop being a passenger.

And there's a good time to do it. **In winter.** The schools have availability, the practical sessions happen without the August crush, and you arrive at Easter with the qualification in hand instead of on a waiting list.`,
    preguntas: [
      {
        pregunta: "What do you learn on the navigation licence course?",
        respuesta:
          "Boat nomenclature, use of safety equipment, buoyage, rules of the road and steering, manoeuvring — including man overboard —, anchoring, basic meteorology and emergency communications. Plus the on-board practical sessions, which is the only thing that really sticks.",
      },
      {
        pregunta: "What can't I do with the navigation licence?",
        respuesta:
          "Take boats beyond their length and power limits, go further than the permitted distance from a port or place of refuge, and sail at night. The specific limits are set by the regulations and are reviewed: check them with the official source before you enrol.",
      },
      {
        pregunta: "Is it worth getting?",
        respuesta:
          "If you hire once a year, no: it works out better to go with a skipper. If you go out three or four times every summer, yes. The cost is recovered in two hires by not paying a skipper, and it changes your relationship with the day: you stop being a passenger.",
      },
      {
        pregunta: "When is the best time to do the course?",
        respuesta:
          "In winter. The schools have availability, the practical sessions happen without the August crush, and you arrive at Easter with the qualification in hand instead of on a waiting list.",
      },
    ],
    relacionados: [
      { texto: "What qualification do I need", pagina: { tipo: "guia", slug: "que-titulacion-necesito-para-llevar-un-barco" } },
      { texto: "Boats without a licence in Santa Pola", pagina: { tipo: "sinLicenciaDestino", destino: "santa-pola" } },
      { texto: "Boats without a licence in Dénia", pagina: { tipo: "sinLicenciaDestino", destino: "denia" } },
      { texto: "Meeting a cruise ship", pagina: { tipo: "articulo", slug: "cruzarse-con-un-crucero-canal-de-puerto" } },
    ],
  },
  {
    idioma: "en",
    slug: "que-titulacion-necesito-para-llevar-un-barco",
    titulo: "What licence do I need to take out a boat",
    entradilla:
      "The doubt that holds back a booking more than anything else. What you can drive with each qualification, what you can take out with none at all, and why the question disappears with a skipper on board.",
    revisada: "2026-08-30",
    minutos: 7,
    publico: "cliente",
    cuerpo: `It's the first question almost everyone asks and the one that holds back the most bookings. The short answer is that yes, you can hire without holding anything, but it's worth understanding why, because there are two different paths and they don't serve the same purpose.

## The two paths

**The first is hiring a small craft**, one of those the regulations allow you to drive without a qualification. They're boats with a short length and limited power, with a short cruising radius and daytime only. Before you go out, you get a safety briefing on the pontoon: how to start and stop the engine, how to anchor, how far you can go and what to do if something fails. It isn't a formality: it's the only thing you carry with you when you cast off.

**The second is hiring with a skipper.** Then the qualification is his to provide and you need absolutely nothing. You decide where to go and someone else handles the driving. It costs more per day, but if there are six or eight of you the share per head changes little, and it takes off your shoulders the one requirement you can't skip.

The practical difference between the two isn't the price, it's **the radius**. With a craft that requires no qualification you move around the coast near the port. With a skipper, the day stretches: from Santa Pola you reach Tabarca, from Calpe you round the Peñón de Ifach, from Benidorm you cross to the island.

## The qualifications, from least to most

When you want to drive something bigger yourself, you enter the system of qualifications. From least to most scope:

- **The navigation licence**, sometimes called the «titulín». It's the gateway: a short course, with no theory exam, that qualifies you for small craft, by day and near the coast.
- **The PNB**, the Basic Navigation Skipper. Already with an exam, it allows more length and more distance.
- **The PER**, the Recreational Craft Skipper. It's the one held by almost everyone who regularly hires a "bare boat", and the one that opens up most of the catalogue.
- Above those come the **Yacht Skipper** and the **Yacht Captain**, which are another league entirely and are rarely needed for hiring.

**The specific limits of each qualification — length, power, miles from the coast, daytime or night-time navigation — are set by the regulations and are reviewed from time to time.** We deliberately don't give them here as a fixed figure: an outdated figure on this page would be worse than not giving one. Check them with the official source or ask at the club before booking, and always look at the boat's listing, where we indicate whether it requires a qualification.

## What you can take for granted

That **with a skipper you need nothing**. No qualification, no experience, no ability to read a chart. It's the formula most people on holiday use, and there's no demerit in it: in many parts of the world it's simply the only way to hire.

That **the safety briefing is mandatory**, and that if the place where you hire rattles it off in two minutes, that's a bad sign. Ten or fifteen minutes is normal.

And that **the boat's insurance must cover the hire**. It isn't your responsibility to check it, but you can ask. If the answer is vague, change boats.

## If it's your first time

Go with a skipper. Not out of incapacity: to make the most of the day. The first outing on an unfamiliar boat goes into understanding the controls, judging distances and keeping the port in sight. With a skipper on board you look at the coast instead of the GPS, and along the way you learn enough that the second time, going alone does make sense.`,
    preguntas: [
      {
        pregunta: "Can I hire a boat with no qualification at all?",
        respuesta:
          "Yes, in two ways: a small craft of the kind the regulations allow you to drive without a qualification, after the safety briefing on the pontoon, or any boat with a skipper on board, who is the one providing the qualification.",
      },
      {
        pregunta: "What's the difference between going without a qualification and going with a skipper?",
        respuesta:
          "The radius. Without a qualification you move around the coast near the port and only by day. With a skipper the day stretches and the destinations further away come into play, like Tabarca from Santa Pola or the Isla de Benidorm.",
      },
      {
        pregunta: "What qualification do I need to hire bigger boats?",
        respuesta:
          "The PER is the one that opens up most of the catalogue and the one held by almost everyone who regularly hires without a skipper. Below it are the PNB and the navigation licence; above it, the Yacht Skipper and the Yacht Captain.",
      },
      {
        pregunta: "How many miles can I go offshore with each qualification?",
        respuesta:
          "The length, power and distance limits are set by the regulations and are reviewed periodically, so it's best to check them with the official source rather than trust a figure read on some website. On each boat's listing we indicate whether it requires a qualification.",
      },
    ],
    relacionados: [
      { texto: "Boats without a licence in Benidorm", pagina: { tipo: "sinLicenciaDestino", destino: "benidorm" } },
      { texto: "Boats without a licence in Santa Pola", pagina: { tipo: "sinLicenciaDestino", destino: "santa-pola" } },
      { texto: "Boats without a licence in Calpe", pagina: { tipo: "sinLicenciaDestino", destino: "calpe" } },
      { texto: "What they teach you on the licence course", pagina: { tipo: "guia", slug: "licencia-de-navegacion-que-te-ensenan" } },
      { texto: "Going to Tabarca by boat", pagina: { tipo: "lugar", slug: "tabarca" } },
    ],
  },
  {
    idioma: "en",
    slug: "contrato-de-alquiler-de-embarcacion",
    titulo: "Boat hire contract: what it must include",
    entradilla:
      "What you sign before casting off protects both parties. Which clauses can't be missing, which ones cause arguments and what should be documented before you set out.",
    revisada: "2026-08-30",
    minutos: 8,
    publico: "armador",
    cuerpo: `Almost every dispute between boat owner and hirer comes from the same thing: something nobody wrote down. A scratch that was already there, a fuel tank returned half full, an hour of delay nobody knew whether it would be charged. The contract doesn't exist for when everything goes well; it exists for the ten per cent of the time when something goes wrong.

Here is what it should include, point by point.

## Who, what and when

**The parties identified**, with ID document and address. If the person hiring is not the person who will steer the boat, both must appear: the hirer and the skipper, with their licence noted.

**The boat identified without ambiguity**: name, registration number, length, engine and the number of authorised places (persons). The capacity is not a bureaucratic detail — it is the legal limit of people on board, and it should be in writing.

**The exact period**, with handover and return times, and what happens if the boat is returned late. A written hourly surcharge avoids the whole argument.

## The money

**The price broken down.** What is included and what is not: fuel, cleaning, mooring, port fees. The biggest source of conflict in the sector is that the advertised price and the final price don't match, and the contract is where that gets settled.

**Fuel, with an explicit rule.** The two usual formulas are "delivered full and returned full" or "actual consumption is charged on return". Both work; what doesn't work is not saying it. If it's the first one, it's worth noting the gauge reading when you leave.

**The security deposit**: amount, how it is held and **how long it takes to be returned**. The last one is the most forgotten and the most annoying. A written period — forty-eight hours, a week — resolves ninety per cent of complaints.

## What happens if something goes wrong

**The insurance**: company, policy number, what it covers and what the excess is. The hirer has the right to know what he or she is liable for.

**Damage and its procedure**: how it is documented, who assesses it and within what period. This is where the handover inventory is worth its weight in gold.

**Cancellation**, by both parties. And very important in boating: **what happens if the marine weather forecast prevents going out**. Everyone knows the weather is nobody's fault, but if it isn't written down, someone is going to argue about the refund.

**Prohibitions and limits**: authorised navigation area, night navigation, maximum number of people, pets, subletting.

## The handover inventory is not paperwork

Before casting off, you go around the boat with the hirer and note the condition: hull, engine, electronics, safety equipment, fuel level. **With dated photos.**

This looks like bureaucracy until the first time a dent appears on the side and nobody knows whether it was already there. With twenty photos taken in front of the customer, the conversation lasts a minute. Without them, it lasts a week and ends badly for someone.

## Before using a template

Any model you find — including any summary like this one — is a starting point, not a valid document for your case. The hire activity has its own requirements depending on how it is run, and the tax obligations of a private individual who hires out his boat are not those of a charter company. **Have it reviewed by an adviser before signing it with anyone.** It is a small one-off expense, compared with a problem that repeats every season.`,
    preguntas: [
      {
        pregunta: "Which clauses can't be missing from a boat hire contract?",
        respuesta:
          "Identification of the parties and the skipper, the boat's details with its authorised capacity, the period with handover and return times, the price broken down, the fuel rule, the security deposit with its return period, insurance and excess, the damage procedure, cancellation and the bad-weather policy.",
      },
      {
        pregunta: "What happens if bad weather prevents going out?",
        respuesta:
          "It must be written in the contract. If nothing is said, the refund ends up being argued about. The sensible thing is to tie it to an official warning and refund the amount when the trip is not possible.",
      },
      {
        pregunta: "Is a handover inventory compulsory?",
        respuesta:
          "Legally it's another matter, but in practice it is what avoids almost all damage disputes. Going around the boat with the customer and taking twenty dated photos turns a week-long argument into a one-minute conversation.",
      },
      {
        pregunta: "Is a template downloaded from the internet good enough?",
        respuesta:
          "As a starting point, yes. As a final document, no: the hire activity has its own requirements depending on how it is run, and a private individual is not the same as a charter company. Have it reviewed by an adviser before signing it.",
      },
    ],
    relacionados: [
      { texto: "List your boat", pagina: { tipo: "publicar" } },
      { texto: "How much your boat can earn", pagina: { tipo: "guia", slug: "cuanto-puede-ganar-tu-barco" } },
      { texto: "How it works", pagina: { tipo: "comoFunciona" } },
    ],
  },
  {
    idioma: "en",
    slug: "cuanto-puede-ganar-tu-barco",
    // Programada: misma fecha de publicación que la versión ES.
    publicaDesde: "2026-09-15",
    titulo: "How much your boat can earn when hired out",
    entradilla:
      "What comes in, what goes out and what's left. The real sums for hiring out a boat on the Costa Blanca, with the costs almost nobody adds up.",
    revisada: "2026-08-30",
    minutos: 9,
    publico: "armador",
    cuerpo: `A pleasure boat lies at its mooring around three hundred and twenty days a year while paying for the mooring all three hundred and sixty-five. That is the whole logic of hiring it out: not turning it into a business, but making it stop being just an expense.

Let's go through the sums, without the frills.

## What comes in

On the Costa Blanca, a six-to-eight-metre motorboat hires out for between 250 and 450 euros a day in high season, and between 25 and 45 % less outside it. An eleven- or twelve-metre sailing boat moves between 600 and 800.

The variable that decides everything is not the rate: it's **occupancy**. A well-managed boat on this coast does between forty and sixty days a year, brutally concentrated between June and September. A badly managed one — bad photos, an out-of-date calendar, replies two days later — stays at fifteen or twenty.

At forty-five days and an average of 320 euros, that's around **14.400 euros gross a year**.

## What goes out

And this is where the back-of-the-envelope sums fall apart, because almost nobody adds everything up:

- **The platform commission.** It's the first thing everyone looks at, and it runs from 15 to 22 % depending on where you publish.
- **The mooring**, which you were already paying for but which now needs to be counted: between 2.000 and 5.000 euros a year depending on the port and the length.
- **The insurance**, which goes up when you move from private use to hiring. Count on a notable increase over what you pay now, and don't leave it undeclared: a pleasure-boat policy that doesn't cover hiring won't cover a claim during a hire.
- **The maintenance**, which shoots up. A boat that goes out forty days a year needs more engine servicing, more cleaning and more replacement parts than one that goes out ten.
- **The cleaning between trips**, between 40 and 80 euros each time if you outsource it.
- **The wear and tear**, which doesn't appear on any invoice but charges itself the day you sell the boat.

Adding up commission, additional insurance, extra maintenance and cleaning, it is realistic that between **45 and 60 %** of the gross goes on direct costs.

## What's left

Out of those 14.400 euros gross, roughly between **6.000 and 8.000 euros net** remain, before tax.

It's not a salary. What it is, in most cases, is **the mooring paid for and a good part of the maintenance covered**, which is exactly the reason people start hiring their boats out. The boat goes from costing money to costing little or nothing.

## The three things that move the needle most

**The photos.** It's the factor with the most impact and the cheapest to fix. A boat with eight good photos from a sunny day hires out twice as much as the same boat with three dark photos taken at the pontoon on a Tuesday in November.

**The calendar up to date.** A boat whose calendar isn't touched for three weeks stops receiving requests, because nobody wants to book and then wait to see whether they'll get an answer. It's the factor that separates those who do forty-five days from those who do twenty.

**The response time.** When someone asks for a date, they are usually contacting three or four boats at the same time. The first one to answer gets the booking. Not the best one: the first one.

## What needs to be sorted out before you start

Hiring out your boat has tax implications and, depending on how it is run, its own administrative requirements. A private individual who lends his boat on some weekends is not the same as a continuous activity. **Check it with an adviser before the first trip out**, not after the season: sorting it out costs little at the beginning and a lot more later.`,
    preguntas: [
      {
        pregunta: "How much can you make from hiring out a boat on the Costa Blanca?",
        respuesta:
          "A 6-to-8-metre motorboat with a reasonable occupancy of 45 days a year can make around 14.400 euros gross. After deducting commission, additional insurance, extra maintenance and cleaning, between 6.000 and 8.000 net remain before tax.",
      },
      {
        pregunta: "How many days a year does a boat get hired out?",
        respuesta:
          "Between forty and sixty if it's well managed, concentrated between June and September. With weak photos, an out-of-date calendar or slow replies, the figure drops to fifteen or twenty.",
      },
      {
        pregunta: "Which costs are forgotten when doing the sums?",
        respuesta:
          "The increase in insurance when moving from private use to hiring, the extra maintenance that comes from going out forty days instead of ten, the cleaning between trips, and the wear and tear, which doesn't appear on any invoice but charges itself the day you sell the boat.",
      },
      {
        pregunta: "What increases bookings the most?",
        respuesta:
          "The photos, an up-to-date calendar and the response time. Whoever asks for a date is usually contacting three or four boats at the same time, and the booking goes to the first one that answers, not the best one.",
      },
    ],
    relacionados: [
      { texto: "List your boat", pagina: { tipo: "publicar" } },
      { texto: "The hire contract", pagina: { tipo: "guia", slug: "contrato-de-alquiler-de-embarcacion" } },
    ],
  },

  // === Deutsch ===
  {
    idioma: "de",
    slug: "licencia-de-navegacion-que-te-ensenan",
    titulo: "Die Licencia de Navegación: was Sie wirklich lernen",
    entradilla:
      "Es ist der kürzeste Führerschein, den es gibt, und derjenige, der den Bootstag am stärksten verändert. Hier erfahren Sie, was im Kurs vermittelt wird, warum jeder Baustein dort vorkommt und was Sie danach weiterhin nicht dürfen.",
    revisada: "2026-08-30",
    minutos: 8,
    publico: "cliente",
    cuerpo: `Die Licencia de Navegación — das „Titulín", wie alle sie nennen — ist der Einstieg in das System der Führerscheine. Sie ist kurz, hat nicht das Prüfungsgewicht des PER und viele tun sie als bloße Formsache ab.

Sie so zu verstehen ist ein Fehler. Sie ist keine Formsache: Sie ist das Minimum, das nötig ist, damit ein Bootstag nicht vom Glück abhängt.

## Was im Kurs vermittelt wird

Der Lehrstoff ist kurz, weil er für eine ganz konkrete Sache gedacht ist: dass Sie mit einem kleinen Boot, nahe der Küste, bei Tageslicht auslaufen und zurückkommen können, ohne jemanden in Gefahr gebracht zu haben. Alles, was darin vorkommt, ist aus diesem Grund da.

**Schiffsbenennung und Schiffsteile.** Bug, Heck, Backbord, Steuerbord, Bug- und Hecksektionen. Es wirkt wie der albernste Teil des Kurses, und genau er sorgt dafür, dass Sie später eine Anweisung per Funk verstehen oder etwas, das Ihnen jemand von einem anderen Boot zuruft. Wenn Ihnen jemand „an Ihrer Steuerbord-Hecksektion" entgegenschreit, wissen Sie entweder, was das bedeutet, oder das Rufen ist zwecklos.

**Sicherheitsausrüstung und ihre Verwendung.** Nicht wo sie liegt: wie sie verwendet wird. Schwimmwesten und wie sie wirklich richtig angelegt werden, Rettungsring, Feuerlöscher, Signalfackeln, Lenzpumpen. Es ist der Teil, dem alle am wenigsten zuhören, und der einzige, der an dem Tag zählt, an dem es darauf ankommt.

**Betonnung.** Was die lateralen und kardinalen Zeichen bedeuten, was Ihnen eine grüne und was eine rote Boje sagt und auf welcher Seite Sie vorbeifahren. Es ist die geschriebene Sprache des Meeres, und ohne sie navigieren Sie, als ob Sie nur die halbe Nachricht lesen würden.

**Ausweich- und Fahrregeln.** Wer weicht wem aus, wie man kreuzt, was man in einem engen Fahrwasser tut. Hier kommt etwas, das fast niemand verinnerlicht hat und das mehr Schrecken verursacht als alles andere: Ein großes Schiff beim Manövrieren kann Ihnen nicht ausweichen.

**Manöver.** Vom Liegeplatz ablegen, anlegen und vor allem der Mann-über-Bord-Fall: anhalten, ihn nie aus den Augen verlieren und zurückkehren. Es wird geübt, weil das Lesen darüber nichts nützt.

**Ankern.** Wie man den Anker wirft, wie viel Kette nötig ist und wie man prüft, dass er hält. Auch, wo nicht geankert wird und warum, denn an dieser Küste hat das neben den praktischen auch rechtliche Folgen.

**Grundlagen der Meteorologie.** Einen Wetterbericht lesen, verstehen, was eine Windvorhersage bedeutet, und wissen, dass im Mittelmeer der Nachmittag nicht wie der Vormittag aussieht.

**Kommunikation und Notfälle.** Der Notrufkanal, wie man Hilfe anfordert, welche Angaben man macht und in welcher Reihenfolge. Es wird einmal gesagt und wieder vergessen — deshalb sollten Sie es sich aufschreiben und an Bord mitnehmen.

## Und dann sind da die Praxisstunden

Die Theorie ist nach zwei Wochen vergessen. Was bleibt, ist die Zeit auf dem Boot: spüren, wie das Ruder bei langsamer Fahrt anspricht, sehen, wie der Wind beim Manövrieren den Bug versetzt, und feststellen, dass gutes Anlegen eine Frage des langsamen Fahrens und des rechtzeitigen Hinsehens ist, nicht des Könnens.

Wenn die Schule, bei der Sie sich ausbilden lassen, die Praxis in zwanzig Minuten abfertigt, wechseln Sie die Schule.

## Was die Lizenz NICHT gibt

Und das ist es, was die meisten verwechseln:

- **Sie qualifiziert nicht für jedes Boot.** Es gibt Längen- und Leistungsgrenzen, und darüber hinaus braucht es einen anderen Führerschein.
- **Sie erlaubt nicht, sich so weit zu entfernen, wie man möchte.** Es gibt eine Grenze für die Entfernung zu einem Hafen oder einem Schutzort.
- **Sie erlaubt keine Nachtfahrt.**
- **Sie gibt keine Erfahrung.** Sie gibt die Erlaubnis; das andere kommt mit dem Auslaufen.

**Die konkreten Grenzen legt die Verordnung fest, und sie werden von Zeit zu Zeit überprüft**, deshalb nennen wir sie hier nicht als feste Zahl: Schlagen Sie sie in der offiziellen Quelle nach oder fragen Sie in der Schule, bevor Sie sich anmelden. Stabil ist die Idee: Es ist ein Führerschein für die küstennahe Navigation bei Tag mit kleinen Booten.

## Lohnt es sich?

Es hängt von einer einzigen Sache ab: wie oft Sie vorhaben auszulaufen.

Wenn Sie einmal im Jahr mieten, nein. Mieten Sie mit Skipper, genießen Sie den Tag und lassen Sie das Papierkram: Es kommt billiger, und Sie lernen mehr, wenn Sie zusehen, wie er es macht.

Wenn Sie jeden Sommer drei- oder viermal auslaufen, ja — und zwar deutlich. Die Lizenz ist in kurzer Zeit gemacht, die Kosten amortisieren sich nach zwei Mietvorgängen, weil Sie keinen Skipper bezahlen, und vor allem verändert sie Ihre Beziehung zum Tag: Sie sind kein Passagier mehr.

Und es gibt einen guten Zeitpunkt dafür. **Im Winter.** Die Schulen haben freie Plätze, die Praxis findet ohne den August-Stress statt, und Sie kommen mit dem Führerschein in der Hand zu Ostern — statt auf einer Warteliste.`,
    preguntas: [
      {
        pregunta: "Was lernt man im Kurs für die Licencia de Navegación?",
        respuesta:
          "Schiffsbenennung, Verwendung der Sicherheitsausrüstung, Betonnung, Ausweich- und Fahrregeln, Manöver — einschließlich Mann über Bord —, Ankern, Grundlagen der Meteorologie und Notfallkommunikation. Dazu die Praxis an Bord, das Einzige, was wirklich hängen bleibt.",
      },
      {
        pregunta: "Was darf ich mit der Licencia de Navegación nicht tun?",
        respuesta:
          "Boote über ihre Längen- und Leistungsgrenzen hinaus führen, sich weiter als die erlaubte Entfernung von einem Hafen oder Schutzort entfernen und bei Nacht fahren. Die konkreten Grenzen legt die Verordnung fest, und sie werden überprüft: Schlagen Sie sie in der offiziellen Quelle nach, bevor Sie sich anmelden.",
      },
      {
        pregunta: "Lohnt es sich, sie zu machen?",
        respuesta:
          "Wenn Sie einmal im Jahr mieten, nein: Mit Skipper ist es besser. Wenn Sie jeden Sommer drei- oder viermal auslaufen, ja. Die Kosten amortisieren sich nach zwei Mietvorgängen, weil Sie keinen Skipper bezahlen, und es verändert Ihre Beziehung zum Tag: Sie sind kein Passagier mehr.",
      },
      {
        pregunta: "Wann ist der beste Zeitpunkt für den Kurs?",
        respuesta:
          "Im Winter. Die Schulen haben freie Plätze, die Praxis findet ohne den August-Stress statt, und Sie kommen zu Ostern mit dem Führerschein in der Hand — statt auf einer Warteliste.",
      },
    ],
    relacionados: [
      { texto: "Welche Befähigung ich brauche", pagina: { tipo: "guia", slug: "que-titulacion-necesito-para-llevar-un-barco" } },
      { texto: "Boote ohne Führerschein in Santa Pola", pagina: { tipo: "sinLicenciaDestino", destino: "santa-pola" } },
      { texto: "Boote ohne Führerschein in Dénia", pagina: { tipo: "sinLicenciaDestino", destino: "denia" } },
      { texto: "Einem Kreuzfahrtschiff begegnen", pagina: { tipo: "articulo", slug: "cruzarse-con-un-crucero-canal-de-puerto" } },
    ],
  },
  {
    idioma: "de",
    slug: "que-titulacion-necesito-para-llevar-un-barco",
    titulo: "Welchen Führerschein brauche ich, um ein Boot zu führen?",
    entradilla:
      "Der Zweifel, der eine Buchung am häufigsten stoppt. Was Sie mit jedem Führerschein führen dürfen, was Sie ohne jeden führen können und warum die Frage mit Skipper an Bord verschwindet.",
    revisada: "2026-08-30",
    minutos: 7,
    publico: "cliente",
    cuerpo: `Es ist die erste Frage fast aller und diejenige, die die meisten Buchungen stoppt. Die kurze Antwort lautet: Ja, Sie können mieten, ohne irgendetwas zu besitzen — aber es lohnt sich zu verstehen, warum, denn es gibt zwei verschiedene Wege, und sie dienen nicht demselben Zweck.

## Die zwei Wege

**Der erste ist, ein kleines Boot zu mieten**, eine von denen, die die Verordnung ohne Führerschein zu führen erlaubt. Es sind Boote mit geringer Länge und begrenzter Leistung, mit kurzem Fahrbereich und nur bei Tag. Vor dem Auslaufen erhalten Sie am Steg eine Sicherheitseinweisung: wie der Motor gestartet und gestoppt wird, wie man ankert, wie weit Sie fahren dürfen und was zu tun ist, wenn etwas ausfällt. Sie ist keine Formsache: Sie ist das Einzige, was Sie an Bord haben, wenn Sie die Leinen losmachen.

**Der zweite ist, mit Skipper zu mieten.** Dann bringt er die Befähigung mit, und Sie brauchen überhaupt nichts. Sie entscheiden, wohin es geht, und das Führen übernimmt ein anderer. Es kostet pro Tag mehr, aber wenn Sie zu sechst oder zu acht sind, ändert sich der Anteil pro Person kaum, und es nimmt Ihnen die einzige Voraussetzung von den Schultern, die Sie nicht überspringen können.

Der praktische Unterschied zwischen beiden ist nicht der Preis, sondern **der Aktionsradius**. Mit einem Boot ohne Führerschein bewegen Sie sich an der Küste nahe des Hafens. Mit Skipper dehnt sich der Tag: Von Santa Pola erreichen Sie Tabarca, von Calpe umrunden Sie den Peñón de Ifach, von Benidorm fahren Sie zur Insel hinüber.

## Die Führerscheine, vom kleinsten zum größten

Wenn Sie selbst etwas Größeres führen wollen, betreten Sie das System der Befähigungen. Vom geringsten zum größten Umfang:

- **Die Licencia de Navegación**, manchmal „Titulín" genannt. Sie ist der Einstieg: ein kurzer Kurs ohne Theorieprüfung, der für kleine Boote bei Tag und nahe der Küste qualifiziert.
- **Der PNB**, Patrón de Navegación Básica. Bereits mit Prüfung, er erlaubt mehr Länge und mehr Distanz.
- **Der PER**, Patrón de Embarcaciones de Recreo. Er ist derjenige, den fast alle besitzen, die regelmäßig ein „Boot allein" mieten, und derjenige, der den größten Teil des Katalogs öffnet.
- Darüber kommen der **Patrón de Yate (Yachtskipper)** und der **Capitán de Yate (Yachtkapitän)**, die schon eine andere Liga sind und beim Mieten selten gebraucht werden.

**Die konkreten Grenzen jedes Führerscheins — Länge, Leistung, Seemeilen von der Küste, Fahrt bei Tag oder bei Nacht — legt die Verordnung fest, und sie werden von Zeit zu Zeit überprüft.** Wir nennen sie hier bewusst nicht als feste Zahl: Eine veraltete Zahl auf dieser Seite wäre schlimmer, als gar keine zu nennen. Schlagen Sie sie in der offiziellen Quelle nach oder fragen Sie im Club, bevor Sie buchen, und sehen Sie sich immer das Inserat des Bootes an, wo wir angeben, ob ein Führerschein verlangt wird.

## Worauf Sie sich verlassen können

Dass **Sie mit Skipper nichts brauchen**. Weder Führerschein, noch Erfahrung, noch die Fähigkeit, eine Seekarte zu lesen. Es ist die Formel, die die meisten Menschen im Urlaub nutzen, und sie hat nichts Ehrenrühriges: An vielen Orten der Welt ist es schlicht die einzige Möglichkeit zu mieten.

Dass **die Sicherheitseinweisung Pflicht ist** und dass es ein schlechtes Zeichen ist, wenn die Stelle, bei der Sie mieten, sie in zwei Minuten abfertigt. Zehn oder fünfzehn Minuten sind normal.

Und dass **die Versicherung des Bootes den Mietvorgang abdecken muss**. Es ist nicht Ihre Aufgabe, das zu prüfen, aber Sie dürfen fragen. Wenn die Antwort vage ist, wechseln Sie das Boot.

## Wenn es Ihr erstes Mal ist

Fahren Sie mit Skipper. Nicht aus Unfähigkeit: um den Tag zu nutzen. Die erste Fahrt mit einem unbekannten Boot geht dafür drauf, die Bedienelemente zu verstehen, Entfernungen einzuschätzen und den Hafen im Blick zu behalten. Mit Skipper an Bord schauen Sie auf die Küste statt auf das GPS, und nebenbei lernen Sie genug, damit das zweite Mal allein tatsächlich Sinn ergibt.`,
    preguntas: [
      {
        pregunta: "Kann ich ein Boot ohne jede Befähigung mieten?",
        respuesta:
          "Ja, auf zwei Wegen: ein kleines Boot, wie es die Verordnung ohne Führerschein zu führen erlaubt, nach der Sicherheitseinweisung am Steg, oder jedes Boot mit Skipper an Bord, der die Befähigung mitbringt.",
      },
      {
        pregunta: "Was ist der Unterschied zwischen ohne Führerschein und mit Skipper?",
        respuesta:
          "Der Aktionsradius. Ohne Führerschein bewegen Sie sich an der Küste nahe des Hafens und nur bei Tag. Mit Skipper dehnt sich der Tag, und die weiter entfernten Ziele kommen ins Spiel, wie Tabarca ab Santa Pola oder die Isla de Benidorm.",
      },
      {
        pregunta: "Welchen Führerschein brauche ich, um größere Boote zu mieten?",
        respuesta:
          "Der PER ist derjenige, der den größten Teil des Katalogs öffnet, und den fast alle besitzen, die regelmäßig ohne Skipper mieten. Darunter stehen der PNB und die Licencia de Navegación; darüber der Patrón de Yate und der Capitán de Yate.",
      },
      {
        pregunta: "Wie viele Seemeilen darf ich mich mit jedem Führerschein entfernen?",
        respuesta:
          "Die Grenzen für Länge, Leistung und Distanz legt die Verordnung fest, und sie werden regelmäßig überprüft. Es lohnt sich also, sie in der offiziellen Quelle nachzuschlagen, statt einer Zahl zu vertrauen, die man irgendwo im Netz gelesen hat. Im Inserat jedes Bootes geben wir an, ob ein Führerschein verlangt wird.",
      },
    ],
    relacionados: [
      { texto: "Boote ohne Führerschein in Benidorm", pagina: { tipo: "sinLicenciaDestino", destino: "benidorm" } },
      { texto: "Boote ohne Führerschein in Santa Pola", pagina: { tipo: "sinLicenciaDestino", destino: "santa-pola" } },
      { texto: "Boote ohne Führerschein in Calpe", pagina: { tipo: "sinLicenciaDestino", destino: "calpe" } },
      { texto: "Was im Kurs für die Licencia gelehrt wird", pagina: { tipo: "guia", slug: "licencia-de-navegacion-que-te-ensenan" } },
      { texto: "Mit dem Boot nach Tabarca", pagina: { tipo: "lugar", slug: "tabarca" } },
    ],
  },
  {
    idioma: "de",
    slug: "contrato-de-alquiler-de-embarcacion",
    titulo: "Bootsmietvertrag: Was er enthalten muss",
    entradilla:
      "Was vor dem Ablegen unterschrieben wird, schützt beide Seiten. Welche Klauseln nicht fehlen dürfen, welche für Diskussionen sorgen und was vor der Ausfahrt dokumentiert werden sollte.",
    revisada: "2026-08-30",
    minutos: 8,
    publico: "armador",
    cuerpo: `Fast alle Auseinandersetzungen zwischen Bootseigentümer und Mieter haben denselben Ursprung: etwas, das niemand aufgeschrieben hat. Ein Kratzer, der schon vorher da war, ein Tank, der nur halb voll zurückgegeben wurde, eine Verspätungsstunde, von der niemand wusste, ob sie berechnet wird. Der Vertrag existiert nicht für den Fall, dass alles gut läuft; er existiert für die zehn Prozent der Fälle, in denen etwas schiefgeht.

Das ist es, was er Punkt für Punkt enthalten sollte.

## Wer, was und wann

**Die Parteien werden identifiziert**, mit Ausweisdokument und Adresse. Wenn der Mieter nicht derjenige ist, der das Boot steuern wird, müssen beide aufgeführt werden: der Mieter und der Skipper, mit der eingetragenen Befähigung.

**Das Boot wird eindeutig identifiziert**: Name, Registrierungsnummer, Länge, Motor und die Anzahl der zugelassenen Plätze. Die Sache mit den Plätzen ist kein bürokratisches Detail – sie ist das gesetzliche Limit der Personen an Bord, und es sollte schriftlich festgehalten sein.

**Der genaue Zeitraum**, mit Übergabe- und Rückgabezeit, und was passiert, wenn zu spät zurückgegeben wird. Ein schriftlich festgehaltener Stundenzuschlag erspart die ganze Diskussion.

## Das Geld

**Der aufgeschlüsselte Preis.** Was enthalten ist und was nicht: Treibstoff, Reinigung, Liegeplatz, Hafengebühren. Die größte Konfliktquelle der Branche ist, dass der beworbene Preis und der Endpreis nicht übereinstimmen, und der Vertrag ist der Ort, an dem das geregelt wird.

**Der Treibstoff, mit einer ausdrücklichen Regelung.** Die beiden üblichen Formeln sind „voll übergeben und voll zurückgegeben" oder „der tatsächliche Verbrauch wird bei der Rückgabe berechnet". Beide funktionieren; was nicht funktioniert, ist, es nicht zu sagen. Bei der ersten lohnt es sich, den Stand der Anzeige bei der Ausfahrt zu notieren.

**Die Kaution**: Betrag, Form der Einbehaltung und **Frist für die Rückzahlung**. Letzteres wird am häufigsten vergessen und sorgt für den meisten Ärger. Eine schriftliche Frist – achtundvierzig Stunden, eine Woche – löst neunzig Prozent der Beschwerden.

## Was passiert, wenn etwas schiefgeht

**Die Versicherung**: Gesellschaft, Policennummer, was sie abdeckt und wie hoch die Selbstbeteiligung ist. Der Mieter hat das Recht zu wissen, wofür er haftet.

**Schäden und ihr Verfahren**: wie sie dokumentiert werden, wer sie bewertet und innerhalb welcher Frist. Hier ist das Übergabeprotokoll sein Gewicht in Gold wert.

**Stornierung**, durch beide Parteien. Und in der Schifffahrt sehr wichtig: **was passiert, wenn der Seewetterbericht die Ausfahrt verhindert**. Dass das Wetter niemandes Schuld ist, weiß jeder, aber wenn es nicht schriftlich festgehalten ist, wird jemand über die Erstattung streiten.

**Verbote und Grenzen**: erlaubtes Navigationsgebiet, Nachtfahrt, maximale Personenzahl, Haustiere, Untervermietung.

## Das Übergabeprotokoll ist kein Papierkram

Vor dem Ablegen geht man mit dem Mieter das Boot durch und hält den Zustand fest: Rumpf, Motor, Elektronik, Sicherheitsausrüstung, Treibstoffstand. **Mit datierten Fotos.**

Das wirkt wie Bürokratie, bis zum ersten Mal eine Beule an der Seite auftaucht und niemand weiß, ob sie vorher schon da war. Mit zwanzig Fotos, die vor dem Kunden gemacht wurden, dauert das Gespräch eine Minute. Ohne sie dauert es eine Woche und endet für jemanden schlecht.

## Bevor Sie eine Vorlage verwenden

Jedes Modell, das Sie finden – einschließlich jeder Zusammenfassung wie dieser – ist ein Ausgangspunkt, kein gültiges Dokument für Ihren Fall. Die Vermietungstätigkeit hat je nach Betriebsart eigene Anforderungen, und die steuerlichen Pflichten eines Privaten, der sein Boot vermietet, sind nicht die einer Chartergesellschaft. **Lassen Sie es von einem Berater prüfen, bevor Sie es mit irgendjemandem unterschreiben.** Es ist eine einmalige kleine Ausgabe, verglichen mit einem Problem, das sich jede Saison wiederholt.`,
    preguntas: [
      {
        pregunta: "Welche Klauseln dürfen in einem Bootsmietvertrag nicht fehlen?",
        respuesta:
          "Identifizierung der Parteien und des Skippers, die Daten des Bootes mit der zugelassenen Personenzahl, der Zeitraum mit Übergabe- und Rückgabezeiten, der aufgeschlüsselte Preis, die Treibstoffregelung, die Kaution mit Rückzahlungsfrist, Versicherung und Selbstbeteiligung, das Schadensverfahren, Stornierung und die Regelung bei schlechtem Wetter.",
      },
      {
        pregunta: "Was passiert, wenn schlechtes Wetter die Ausfahrt verhindert?",
        respuesta:
          "Es muss im Vertrag festgehalten sein. Wenn nichts gesagt wird, wird am Ende über die Erstattung gestritten. Sinnvoll ist es, sie an eine offizielle Warnung zu koppeln und den Betrag zu erstatten, wenn die Ausfahrt nicht möglich ist.",
      },
      {
        pregunta: "Ist ein Übergabeprotokoll Pflicht?",
        respuesta:
          "Rechtlich ist das eine andere Frage, aber in der Praxis ist es das, was fast alle Schadensdiskussionen vermeidet. Mit dem Kunden das Boot durchzugehen und zwanzig datierte Fotos zu machen, verwandelt eine einwöchige Diskussion in ein einminütiges Gespräch.",
      },
      {
        pregunta: "Reicht eine aus dem Internet heruntergeladene Vorlage?",
        respuesta:
          "Als Ausgangspunkt ja. Als endgültiges Dokument nein: Die Vermietungstätigkeit hat je nach Betriebsart eigene Anforderungen, und ein Privater ist nicht dasselbe wie eine Chartergesellschaft. Lassen Sie sie vor der Unterzeichnung von einem Berater prüfen.",
      },
    ],
    relacionados: [
      { texto: "Boot anbieten", pagina: { tipo: "publicar" } },
      { texto: "Wie viel Ihr Boot verdienen kann", pagina: { tipo: "guia", slug: "cuanto-puede-ganar-tu-barco" } },
      { texto: "So funktioniert es", pagina: { tipo: "comoFunciona" } },
    ],
  },
  {
    idioma: "de",
    slug: "cuanto-puede-ganar-tu-barco",
    // Programada: misma fecha de publicación que la versión ES.
    publicaDesde: "2026-09-15",
    titulo: "Wie viel Ihr Boot beim Vermieten verdienen kann",
    entradilla:
      "Was reinkommt, was rausgeht und was übrig bleibt. Die realen Zahlen der Bootsvermietung an der Costa Blanca, mit den Kosten, die fast niemand zusammenzählt.",
    revisada: "2026-08-30",
    minutos: 9,
    publico: "armador",
    cuerpo: `Ein Sportboot liegt rund dreihundertzwanzig Tage im Jahr am Liegeplatz und zahlt an allen dreihundertfünfundsechzig Tagen dafür. Das ist die ganze Logik der Vermietung: nicht daraus ein Geschäft zu machen, sondern dafür zu sorgen, dass es aufhört, nur eine Ausgabe zu sein.

Gehen wir die Zahlen durch, ohne Schnörkel.

## Was reinkommt

An der Costa Blanca wird ein sechs bis acht Meter langes Motorboot in der Hauptsaison für 250 bis 450 Euro pro Tag vermietet, außerhalb der Saison zwischen 25 und 45 % weniger. Ein elf oder zwölf Meter langes Segelboot bewegt sich zwischen 600 und 800.

Die Variable, die alles entscheidet, ist nicht der Preis: es ist **die Auslastung**. Ein gut geführtes Boot an dieser Küste macht zwischen vierzig und sechzig Tage im Jahr, brutal konzentriert auf Juni bis September. Ein schlecht geführtes – schlechte Fotos, ein veralteter Kalender, Antworten erst nach zwei Tagen – bleibt bei fünfzehn oder zwanzig.

Bei fünfundvierzig Tagen und einem Durchschnitt von 320 Euro sind das rund **14.400 Euro brutto im Jahr**.

## Was rausgeht

Und genau hier scheitern die Bierdeckelrechnungen, weil fast niemand alles zusammenzählt:

- **Die Provision der Plattform.** Sie ist das Erste, worauf alle schauen, und liegt je nachdem, wo Sie veröffentlichen, zwischen 15 und 22 %.
- **Der Liegeplatz**, den Sie ohnehin schon bezahlt haben, der jetzt aber mitgezählt werden sollte: zwischen 2.000 und 5.000 Euro pro Jahr, je nach Hafen und Länge.
- **Die Versicherung**, die steigt, wenn man von privater Nutzung zur Vermietung übergeht. Rechnen Sie mit einem deutlichen Aufschlag gegenüber dem, was Sie heute zahlen, und lassen Sie es nicht unangemeldet: eine Sportbootpolice, die die Vermietung nicht abdeckt, zahlt bei einem Schaden während der Vermietung nicht.
- **Die Wartung**, die in die Höhe schießt. Ein Boot, das vierzig Tage im Jahr ausläuft, braucht mehr Motorwartung, mehr Reinigung und mehr Ersatzteile als eines, das zehn Tage ausläuft.
- **Die Reinigung zwischen den Ausfahrten**, zwischen 40 und 80 Euro pro Reinigung, wenn Sie sie auslagern.
- **Der Verschleiß**, der auf keiner Rechnung erscheint, aber am Tag des Bootsverkaufs selbst abgerechnet wird.

Summiert man Provision, zusätzliche Versicherung, Extra-Wartung und Reinigung, ist es realistisch, dass zwischen **45 und 60 %** des Bruttos für direkte Kosten draufgehen.

## Was übrig bleibt

Von diesen 14.400 Euro brutto bleiben vor Steuern ungefähr zwischen **6.000 und 8.000 Euro netto** übrig.

Es ist kein Gehalt. Es ist in den meisten Fällen aber **der bezahlte Liegeplatz und ein guter Teil der gedeckten Wartung**, und genau das ist der Grund, warum man mit der Vermietung anfängt. Das Boot geht davon, Geld zu kosten, dazu über, wenig oder nichts zu kosten.

## Die drei Dinge, die die Nadel am stärksten bewegen

**Die Fotos.** Sie sind der Faktor mit der größten Wirkung und am günstigsten zu beheben. Ein Boot mit acht guten Fotos von einem sonnigen Tag wird doppelt so oft vermietet wie dasselbe Boot mit drei dunklen Fotos, die an einem Novemberdienstag am Steg gemacht wurden.

**Der Kalender auf dem neuesten Stand.** Ein Boot, dessen Kalender drei Wochen lang nicht angefasst wird, erhält keine Anfragen mehr, denn niemand will buchen und dann darauf warten, ob geantwortet wird. Es ist der Faktor, der diejenigen, die fünfundvierzig Tage machen, von denen trennt, die zwanzig machen.

**Die Antwortzeit.** Wenn jemand nach einem Termin fragt, fragt er in der Regel bei drei oder vier Booten gleichzeitig an. Das erste, das antwortet, bekommt die Buchung. Nicht das beste: das erste.

## Was vor dem Start geklärt werden muss

Die Vermietung Ihres Bootes hat steuerliche Auswirkungen und, je nach Betriebsart, eigene verwaltungstechnische Anforderungen. Ein Privater, der sein Boot an einigen Wochenenden überlässt, ist nicht dasselbe wie eine durchgehende Tätigkeit. **Klären Sie es vor der ersten Ausfahrt mit einem Berater**, nicht erst nach der Saison: Es zu lösen kostet am Anfang wenig und später viel mehr.`,
    preguntas: [
      {
        pregunta: "Wie viel lässt sich mit der Vermietung eines Bootes an der Costa Blanca verdienen?",
        respuesta:
          "Ein 6 bis 8 Meter langes Motorboot mit einer vernünftigen Auslastung von 45 Tagen im Jahr kann rund 14.400 Euro brutto einbringen. Nach Abzug von Provision, zusätzlicher Versicherung, Extra-Wartung und Reinigung bleiben vor Steuern zwischen 6.000 und 8.000 Euro netto übrig.",
      },
      {
        pregunta: "An wie vielen Tagen im Jahr wird ein Boot vermietet?",
        respuesta:
          "Zwischen vierzig und sechzig, wenn es gut geführt wird, konzentriert auf Juni bis September. Mit schwachen Fotos, veraltetem Kalender oder langsamen Antworten sinkt die Zahl auf fünfzehn oder zwanzig.",
      },
      {
        pregunta: "Welche Kosten werden bei den Rechnungen vergessen?",
        respuesta:
          "Der Anstieg der Versicherung beim Wechsel von privater Nutzung zur Vermietung, die Extra-Wartung durch vierzig statt zehn Ausfahrten im Jahr, die Reinigung zwischen den Ausfahrten und der Verschleiß, der auf keiner Rechnung erscheint, aber am Tag des Bootsverkaufs abgerechnet wird.",
      },
      {
        pregunta: "Was erhöht die Buchungen am meisten?",
        respuesta:
          "Die Fotos, der Kalender auf dem neuesten Stand und die Antwortzeit. Wer nach einem Termin fragt, fragt in der Regel bei drei oder vier Booten gleichzeitig an, und die Buchung bekommt das erste, das antwortet – nicht das beste.",
      },
    ],
    relacionados: [
      { texto: "Boot anbieten", pagina: { tipo: "publicar" } },
      { texto: "Der Mietvertrag", pagina: { tipo: "guia", slug: "contrato-de-alquiler-de-embarcacion" } },
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
