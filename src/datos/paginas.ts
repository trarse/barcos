import type { Idioma } from "@/lib/idiomas";

/**
 * Contenido editorial de las páginas fijas.
 *
 * Va aparte del catálogo de interfaz (`src/lib/textos/`) porque es otra cosa:
 * allí hay etiquetas de botón, aquí hay prosa que alguien escribe y revisa.
 * Mezclarlos convierte el catálogo en un documento imposible de mantener.
 */

export interface ContenidoPagina {
  titulo: string;
  descripcion: string;
  entradilla: string;
}

export interface Paso {
  titulo: string;
  texto: string;
}

export interface Par {
  pregunta: string;
  respuesta: string;
}

export interface Ventaja {
  titulo: string;
  texto: string;
}

export interface PaginasFijas {
  sinLicencia: ContenidoPagina & {
    eyebrow: string;
    dondeHay: string;
    leyTitulo: string;
    parrafos: string[];
    faq: Par[];
  };
  comoFunciona: ContenidoPagina & {
    pasos: Paso[];
    faq: Par[];
    cta: string;
  };
  publicar: ContenidoPagina & {
    eyebrow: string;
    ventajas: Ventaja[];
    faq: Par[];
    ejemploTitulo: string;
    ejemploTexto: (dias: string, tarifa: string) => string;
    ingresoBruto: string;
    comision: string;
    paraTi: string;
    notaComision: string;
    empezar: string;
    respuesta: string;
    asunto: string;
  };
}

const ES: PaginasFijas = {
  sinLicencia: {
    titulo: "Alquiler de barcos sin licencia",
    descripcion:
      "Embarcaciones que puedes gobernar sin titulación náutica: hasta 5 metros y 15 caballos. Qué dice la ley, dónde puedes navegar y el precio final de cada barco.",
    eyebrow: "Sin titulación náutica",
    entradilla:
      "Hasta 5 metros y 15 caballos se pueden gobernar sin ningún título. Es el segmento que más crece en España y el que peor explica el resto del sector.",
    dondeHay: "Dónde hay barcos sin licencia",
    leyTitulo: "Qué dice exactamente la ley",
    parrafos: [
      "El Real Decreto 875/2014 permite gobernar sin titulación embarcaciones de motor de hasta 5 metros de eslora y potencia máxima de 15 caballos, y motos náuticas dentro de un circuito cerrado y vigilado. La condición es recibir una instrucción previa de la empresa de alquiler y no alejarse más de 2 millas de un puerto o lugar de abrigo, siempre de día.",
      "Con esas restricciones se llega perfectamente a las calas de la misma bahía, que es para lo que la mayoría de la gente alquila. Lo que no se puede hacer es cruzar entre islas, salir de noche ni navegar con mar formada: para eso hacen falta título y un barco más grande, o contratar patrón.",
      "La alternativa que casi nadie menciona: cualquier barco de esta web se puede alquilar con patrón profesional incluido. Sale más caro que una neumática pequeña, pero abre toda la flota sin necesidad de ningún papel.",
    ],
    faq: [
      {
        pregunta: "¿Qué barcos se pueden alquilar sin licencia en España?",
        respuesta:
          "Embarcaciones de hasta 5 metros de eslora con motor de potencia máxima 15 caballos (11,03 kW). Es lo que permite el Real Decreto 875/2014 sin ninguna titulación náutica, siempre que se reciba una instrucción previa de la empresa de alquiler y se navegue de día.",
      },
      {
        pregunta: "¿Hasta dónde puedo alejarme de la costa sin título?",
        respuesta:
          "Hasta 2 millas náuticas de un puerto, marina o lugar de abrigo, y solo durante el día. Fuera de ese límite hace falta al menos la licencia de navegación o el PER. Muchos contratos de alquiler restringen además la zona a una bahía concreta.",
      },
      {
        pregunta: "¿Necesito hacer algún curso antes?",
        respuesta:
          "No hay curso oficial, pero la empresa de alquiler está obligada a darte una instrucción básica antes de soltar amarras: manejo del motor, normas de seguridad, uso de la radio y qué hacer ante una emergencia. Suele durar entre quince y treinta minutos en el pantalán.",
      },
      {
        pregunta: "¿Puedo llevar un barco sin licencia de noche?",
        respuesta:
          "No. La exención de titulación solo cubre la navegación diurna. Si quieres salir al atardecer y volver con luces, necesitas título o contratar un patrón.",
      },
      {
        pregunta: "¿Qué pasa con la fianza si no tengo título?",
        respuesta:
          "Es igual que en cualquier alquiler: se bloquea un importe en la tarjeta al recoger el barco y se libera al devolverlo sin daños. En las embarcaciones sin licencia suele ser más baja, entre 300 y 600 euros, porque el valor del barco también lo es.",
      },
    ],
  },

  comoFunciona: {
    titulo: "Cómo funciona",
    descripcion:
      "Cómo reservar un barco en Estribor: qué incluye el precio, qué pasa con la fianza, qué llevar el día de la salida y cómo se resuelve un problema.",
    entradilla:
      "De la búsqueda a la devolución del barco, sin letra pequeña en ningún paso.",
    cta: "Buscar barco",
    pasos: [
      {
        titulo: "Busca con el precio real",
        texto:
          "Cada resultado enseña el total por día con combustible estimado, limpieza, amarre, tasas e IVA dentro. Ese es el número que ordena la lista, así que comparar barcos es comparar lo que vas a pagar, no tarifas que se quedan a medias.",
      },
      {
        titulo: "Ajusta la reserva y mira el desglose",
        texto:
          "En la ficha puedes mover los días, las horas de navegación previstas y si quieres patrón. Cada concepto se recalcula delante de ti. Si vas a hacer travesía en vez de un día de calas, súbelo: el combustible cambia mucho y es mejor saberlo antes.",
      },
      {
        titulo: "Reserva",
        texto:
          "Los barcos con reserva inmediata se confirman al momento. En el resto, el propietario responde normalmente en menos de una hora. En ambos casos el importe que ves es el que se cobra: no hay un paso final con sorpresas.",
      },
      {
        titulo: "El día de la salida",
        texto:
          "Lleva el DNI, la titulación si el barco la exige y una tarjeta con saldo para la fianza. En el pantalán te explican el barco, se hace el inventario y se firma el parte de salida con fotos. Si es tu primera vez, pide que te enseñen a fondear.",
      },
      {
        titulo: "A la vuelta",
        texto:
          "Se revisa el barco, se libera la fianza y ya está. El combustible que hayas gastado de menos respecto a lo estimado se te devuelve; el de más, se cobra al precio del surtidor del puerto, sin recargo.",
      },
    ],
    faq: [
      {
        pregunta: "¿Qué incluye exactamente el precio que veo?",
        respuesta:
          "El alquiler del barco ajustado a la temporada, el combustible estimado para las horas de navegación previstas, la limpieza final, el amarre en el puerto de salida, las tasas portuarias y el IVA. La fianza va aparte porque se bloquea, no se cobra.",
      },
      {
        pregunta: "¿Y si gasto más o menos combustible del estimado?",
        respuesta:
          "Se ajusta a la vuelta. El estimado se calcula con el consumo real del barco y las horas que hayas indicado; si navegas menos, se te devuelve la diferencia, y si navegas más se cobra al precio del surtidor, sin margen añadido.",
      },
      {
        pregunta: "¿Cómo funciona la fianza?",
        respuesta:
          "Se bloquea en la tarjeta el día de la recogida y se libera al devolver el barco sin daños. Va de 300 euros en una neumática a 12.000 en un yate, y el importe exacto aparece en cada ficha antes de reservar.",
      },
      {
        pregunta: "¿Puedo cancelar?",
        respuesta:
          "Sí. Hasta 7 días antes se devuelve el importe íntegro. Entre 7 y 2 días, el 50 %. En las 48 horas previas no hay devolución, salvo que el parte meteorológico impida navegar: en ese caso se devuelve todo o se cambia la fecha, sin coste.",
      },
      {
        pregunta: "¿Qué pasa si hay una avería?",
        respuesta:
          "Llama al teléfono que figura en el parte de salida. Si la avería impide navegar y no es atribuible a un mal uso, se devuelve la parte proporcional del alquiler y del combustible no consumido. No te remitimos al propietario para que lo discutas: lo resolvemos nosotros.",
      },
      {
        pregunta: "¿Necesito titulación?",
        respuesta:
          "Depende del barco. Hasta 5 metros y 15 caballos no hace falta ninguna. Por encima, licencia de navegación o PER según eslora y potencia. Puedes filtrar por barcos sin licencia o contratar patrón en cualquiera de la flota.",
      },
    ],
  },

  publicar: {
    titulo: "Publica tu barco",
    descripcion:
      "Alquila tu embarcación con una comisión del 12 %, la más baja del sector. Sin exclusividad, tú pones el calendario y el precio.",
    eyebrow: "Para propietarios",
    entradilla:
      "Comisión del 12 %, sin exclusividad y con el precio desglosado para el cliente, que es lo que evita la mitad de los conflictos al devolver el barco.",
    ejemploTitulo: "Un ejemplo con números",
    ejemploTexto: (dias, tarifa) =>
      `Lancha de 7 metros, ${dias} días alquilados al año a ${tarifa} de tarifa base.`,
    ingresoBruto: "Ingreso bruto",
    comision: "Comisión 12 %",
    paraTi: "Para ti",
    notaComision:
      "El combustible, la limpieza y el amarre los cobra el cliente aparte y llegan íntegros a quien los presta. La comisión se aplica solo sobre el alquiler.",
    empezar: "Empezar",
    respuesta: "Te contestamos el mismo día laborable.",
    asunto: "Quiero publicar mi barco",
    ventajas: [
      {
        titulo: "Comisión del 12 %",
        texto:
          "Las plataformas grandes se quedan entre el 15 y el 20 %. Aquí son 12 puntos, sin cuota de alta ni permanencia.",
      },
      {
        titulo: "Sin exclusividad",
        texto:
          "Puedes seguir publicando en otras plataformas y alquilando por tu cuenta. El calendario se sincroniza por iCal con lo que ya uses.",
      },
      {
        titulo: "El precio lo pones tú",
        texto:
          "Tú fijas la tarifa base, el consumo, la limpieza y la fianza. Nosotros calculamos el total que ve el cliente y lo enseñamos desglosado, para que no te lleguen reclamaciones por el combustible.",
      },
      {
        titulo: "Cobro garantizado",
        texto:
          "El importe se transfiere 24 horas después de la salida. Si el cliente no aparece, cobras igual según la política de cancelación.",
      },
    ],
    faq: [
      {
        pregunta: "¿Qué necesito para publicar mi barco?",
        respuesta:
          "El despacho en vigor, el seguro de responsabilidad civil obligatorio, la última inspección técnica si le corresponde y el certificado de navegabilidad. Si vas a alquilar con patrón, además la titulación de quien vaya a patronear.",
      },
      {
        pregunta: "¿Cuánto puedo ganar?",
        respuesta:
          "Depende del barco y del puerto. Una lancha de 7 metros en la costa de Alicante que se alquile 60 días al año a 300 euros de tarifa base deja unos 15.800 euros netos después de comisión. Un velero de 12 metros en Baleares con 90 días de ocupación supera los 30.000.",
      },
      {
        pregunta: "¿Quién responde si hay un daño?",
        respuesta:
          "La fianza cubre los daños menores y se libera solo cuando confirmas que el barco ha vuelto bien. Por encima de la fianza entra el seguro. En los casos en que el cliente incumpla las condiciones del contrato, nos ocupamos nosotros de la reclamación.",
      },
      {
        pregunta: "¿Puedo bloquear fechas para mí?",
        respuesta:
          "Sí, el calendario es tuyo. Puedes bloquear días sueltos, temporadas enteras o sincronizarlo por iCal con Google Calendar o con la otra plataforma que uses.",
      },
    ],
  },
};

const EN: PaginasFijas = {
  sinLicencia: {
    titulo: "Boat hire without a licence",
    descripcion:
      "Boats you can skipper with no qualification: up to 5 metres and 15 hp. What Spanish law says, where you may sail, and the real price of every boat.",
    eyebrow: "No qualification needed",
    entradilla:
      "Up to 5 metres and 15 hp can be skippered with no licence at all. It is the fastest-growing segment in Spain and the one the rest of the sector explains worst.",
    dondeHay: "Where the no-licence boats are",
    leyTitulo: "What the law actually says",
    parrafos: [
      "Royal Decree 875/2014 allows anyone to skipper a motorboat of up to 5 metres in length with a maximum output of 15 hp (11.03 kW), plus jet skis inside a closed, supervised circuit. The conditions are a briefing from the hire company beforehand, staying within 2 nautical miles of a harbour or place of shelter, and sailing in daylight only.",
      "Within those limits you reach the coves of your own bay comfortably, which is what most people hire a boat for. What you cannot do is cross between islands, go out after dark or sail in a swell: for that you need a licence and a bigger boat, or a skipper.",
      "The option almost nobody mentions: every boat on this site can be hired with a professional skipper. It costs more than a small RIB, but it opens the whole fleet without a single piece of paperwork.",
    ],
    faq: [
      {
        pregunta: "Which boats can be hired without a licence in Spain?",
        respuesta:
          "Boats of up to 5 metres in length with an engine of no more than 15 hp (11.03 kW). That is what Royal Decree 875/2014 allows with no nautical qualification, provided the hire company gives you a briefing first and you sail in daylight.",
      },
      {
        pregunta: "How far from shore can I go without a licence?",
        respuesta:
          "Up to 2 nautical miles from a harbour, marina or place of shelter, and in daylight only. Beyond that you need at least the licencia de navegación or the PER. Many hire contracts also restrict you to one specific bay.",
      },
      {
        pregunta: "Do I need to take a course first?",
        respuesta:
          "There is no official course, but the hire company must give you a basic briefing before you cast off: engine handling, safety rules, radio use and what to do in an emergency. It usually takes fifteen to thirty minutes on the pontoon.",
      },
      {
        pregunta: "Can I take a no-licence boat out at night?",
        respuesta:
          "No. The exemption covers daytime sailing only. If you want to go out at sunset and come back under navigation lights, you need a licence or a skipper.",
      },
      {
        pregunta: "What about the deposit if I have no licence?",
        respuesta:
          "It works as with any hire: an amount is held on your card when you collect the boat and released when you return it undamaged. On no-licence boats it tends to be lower, between 300 and 600 euros, because the boat is worth less too.",
      },
    ],
  },

  comoFunciona: {
    titulo: "How it works",
    descripcion:
      "How to book a boat on Estribor: what the price includes, what happens with the deposit, what to bring on the day and how a problem gets resolved.",
    entradilla:
      "From the search to handing the boat back, with no small print at any step.",
    cta: "Find a boat",
    pasos: [
      {
        titulo: "Search with the real price",
        texto:
          "Every result shows the daily total with estimated fuel, cleaning, mooring, port fees and VAT already inside. That is the figure the list is ranked by, so comparing boats means comparing what you will actually pay, not half-finished rates.",
      },
      {
        titulo: "Adjust the booking and read the breakdown",
        texto:
          "On the listing you can change the days, the hours you expect to be under way and whether you want a skipper. Every line recalculates in front of you. If you are making a passage rather than spending a day in coves, raise the hours: fuel changes a great deal and it is better to know beforehand.",
      },
      {
        titulo: "Book",
        texto:
          "Boats marked instant are confirmed straight away. For the rest, the owner usually replies within the hour. Either way, the amount you see is the amount charged: there is no final step with surprises.",
      },
      {
        titulo: "On the day",
        texto:
          "Bring your ID, your licence if the boat requires one, and a card with room for the deposit. On the pontoon they walk you through the boat, take the inventory and sign the handover sheet with photographs. If it is your first time, ask them to show you how to anchor.",
      },
      {
        titulo: "When you get back",
        texto:
          "The boat is checked, the deposit is released and that is it. Any fuel you did not use against the estimate is refunded; anything above it is charged at the pump price in the marina, with no mark-up.",
      },
    ],
    faq: [
      {
        pregunta: "What exactly does the price I see include?",
        respuesta:
          "The hire of the boat adjusted for the season, the estimated fuel for the hours you expect to be under way, the final cleaning, the mooring at the departure marina, port fees and VAT. The deposit is separate because it is held, not charged.",
      },
      {
        pregunta: "What if I use more or less fuel than estimated?",
        respuesta:
          "It is settled on return. The estimate uses the boat's real consumption and the hours you entered; sail less and the difference comes back to you, sail more and it is charged at the pump price with no added margin.",
      },
      {
        pregunta: "How does the deposit work?",
        respuesta:
          "It is held on your card on the day of collection and released when you return the boat undamaged. It ranges from 300 euros on a RIB to 12,000 on a yacht, and the exact figure appears on each listing before you book.",
      },
      {
        pregunta: "Can I cancel?",
        respuesta:
          "Yes. Up to 7 days before, you get the full amount back. Between 7 and 2 days, 50 %. In the final 48 hours there is no refund, unless the forecast makes sailing impossible: in that case you get everything back or move the date at no cost.",
      },
      {
        pregunta: "What happens if something breaks?",
        respuesta:
          "Call the number on the handover sheet. If the fault stops you sailing and is not down to misuse, the proportional part of the hire and the unused fuel are refunded. We do not send you to the owner to argue it out: we settle it.",
      },
      {
        pregunta: "Do I need a licence?",
        respuesta:
          "It depends on the boat. Up to 5 metres and 15 hp you need none. Above that, a licencia de navegación or a PER depending on length and power. You can filter for no-licence boats or add a skipper to any boat in the fleet.",
      },
    ],
  },

  publicar: {
    titulo: "List your boat",
    descripcion:
      "Rent out your boat on a 12 % commission, the lowest in the sector. No exclusivity: you set the calendar and the price.",
    eyebrow: "For owners",
    entradilla:
      "A 12 % commission, no exclusivity, and the price broken down for the customer — which is what prevents half the arguments when the boat comes back.",
    ejemploTitulo: "An example with numbers",
    ejemploTexto: (dias, tarifa) =>
      `A 7-metre motorboat, hired ${dias} days a year at a ${tarifa} base rate.`,
    ingresoBruto: "Gross income",
    comision: "Commission 12 %",
    paraTi: "You keep",
    notaComision:
      "Fuel, cleaning and mooring are charged to the customer separately and reach whoever provides them in full. Commission applies only to the hire itself.",
    empezar: "Get started",
    respuesta: "We reply the same working day.",
    asunto: "I want to list my boat",
    ventajas: [
      {
        titulo: "12 % commission",
        texto:
          "The big platforms take between 15 and 20 %. Here it is 12 points, with no listing fee and no lock-in.",
      },
      {
        titulo: "No exclusivity",
        texto:
          "You can keep listing elsewhere and renting on your own. The calendar syncs by iCal with whatever you already use.",
      },
      {
        titulo: "You set the price",
        texto:
          "You set the base rate, the consumption, the cleaning and the deposit. We work out the total the customer sees and show it broken down, so no one comes back to you arguing about fuel.",
      },
      {
        titulo: "Guaranteed payment",
        texto:
          "The money is transferred 24 hours after departure. If the customer does not turn up, you are paid anyway under the cancellation policy.",
      },
    ],
    faq: [
      {
        pregunta: "What do I need to list my boat?",
        respuesta:
          "A valid registration, compulsory third-party insurance, the latest technical inspection where applicable and the seaworthiness certificate. If you rent with a skipper, their qualification as well.",
      },
      {
        pregunta: "How much can I earn?",
        respuesta:
          "It depends on the boat and the marina. A 7-metre motorboat on the Alicante coast hired 60 days a year at a 300-euro base rate leaves around 15,800 euros net after commission. A 12-metre sailboat in the Balearics with 90 days of occupancy passes 30,000.",
      },
      {
        pregunta: "Who is liable if there is damage?",
        respuesta:
          "The deposit covers minor damage and is only released once you confirm the boat came back sound. Above the deposit, the insurance takes over. Where the customer has broken the terms of the contract, we handle the claim.",
      },
      {
        pregunta: "Can I block dates for myself?",
        respuesta:
          "Yes, the calendar is yours. You can block single days, whole seasons, or sync it by iCal with Google Calendar or with the other platform you use.",
      },
    ],
  },
};

const DE: PaginasFijas = {
  sinLicencia: {
    titulo: "Boot mieten ohne Führerschein",
    descripcion:
      "Boote, die Sie ohne Führerschein fahren dürfen: bis 5 Meter und 15 PS. Was das spanische Recht sagt, wo Sie fahren dürfen und der echte Preis jedes Bootes.",
    eyebrow: "Ohne Führerschein",
    entradilla:
      "Bis 5 Meter und 15 PS dürfen Sie ganz ohne Schein fahren. Es ist das am stärksten wachsende Segment in Spanien – und das, was der Rest der Branche am schlechtesten erklärt.",
    dondeHay: "Wo es Boote ohne Führerschein gibt",
    leyTitulo: "Was das Gesetz genau sagt",
    parrafos: [
      "Das Königliche Dekret 875/2014 erlaubt das Führen von Motorbooten bis 5 Meter Länge und höchstens 15 PS (11,03 kW) ohne jede Befähigung, dazu Jetskis innerhalb eines abgesperrten, beaufsichtigten Bereichs. Bedingung sind eine Einweisung durch den Vermieter, ein Abstand von höchstens 2 Seemeilen zu einem Hafen oder Schutzort und Fahrt nur bei Tageslicht.",
      "Innerhalb dieser Grenzen erreichen Sie die Buchten der eigenen Bucht bequem – und genau dafür mieten die meisten ein Boot. Nicht möglich sind Überfahrten zwischen den Inseln, Fahrten nach Einbruch der Dunkelheit und Seegang: dafür braucht es einen Schein und ein größeres Boot, oder einen Skipper.",
      "Die Möglichkeit, die kaum jemand erwähnt: Jedes Boot auf dieser Seite lässt sich mit Berufsskipper mieten. Das kostet mehr als ein kleines Schlauchboot, öffnet aber die gesamte Flotte ohne ein einziges Dokument.",
    ],
    faq: [
      {
        pregunta: "Welche Boote darf man in Spanien ohne Führerschein mieten?",
        respuesta:
          "Boote bis 5 Meter Länge mit einem Motor von höchstens 15 PS (11,03 kW). Das erlaubt das Königliche Dekret 875/2014 ohne jede Befähigung, sofern der Vermieter vorher einweist und bei Tageslicht gefahren wird.",
      },
      {
        pregunta: "Wie weit darf ich ohne Schein von der Küste weg?",
        respuesta:
          "Bis 2 Seemeilen von einem Hafen, einer Marina oder einem Schutzort, und nur tagsüber. Darüber hinaus braucht es mindestens die licencia de navegación oder den PER. Viele Mietverträge beschränken das Fahrtgebiet zusätzlich auf eine bestimmte Bucht.",
      },
      {
        pregunta: "Muss ich vorher einen Kurs machen?",
        respuesta:
          "Einen offiziellen Kurs gibt es nicht, aber der Vermieter muss Sie vor dem Ablegen einweisen: Motorbedienung, Sicherheitsregeln, Funk und Verhalten im Notfall. Das dauert am Steg meist fünfzehn bis dreißig Minuten.",
      },
      {
        pregunta: "Darf ich ohne Führerschein nachts fahren?",
        respuesta:
          "Nein. Die Befreiung gilt nur für Fahrten bei Tageslicht. Wer zum Sonnenuntergang hinaus und mit Lichtern zurück will, braucht einen Schein oder einen Skipper.",
      },
      {
        pregunta: "Wie ist das mit der Kaution ohne Führerschein?",
        respuesta:
          "Wie bei jeder Miete: Bei Übernahme wird ein Betrag auf der Karte geblockt und bei unbeschädigter Rückgabe freigegeben. Bei Booten ohne Führerschein liegt sie meist niedriger, zwischen 300 und 600 Euro, weil auch das Boot weniger wert ist.",
      },
    ],
  },

  comoFunciona: {
    titulo: "So funktioniert es",
    descripcion:
      "So buchen Sie ein Boot bei Estribor: was der Preis enthält, was mit der Kaution passiert, was Sie am Tag der Abfahrt mitbringen und wie ein Problem gelöst wird.",
    entradilla:
      "Von der Suche bis zur Rückgabe des Bootes – ohne Kleingedrucktes an irgendeiner Stelle.",
    cta: "Boot suchen",
    pasos: [
      {
        titulo: "Mit dem echten Preis suchen",
        texto:
          "Jedes Ergebnis zeigt den Tagesgesamtpreis mit geschätztem Treibstoff, Endreinigung, Liegeplatz, Hafengebühren und MwSt. bereits darin. Nach dieser Zahl ist die Liste sortiert – Boote zu vergleichen heißt also, das zu vergleichen, was Sie wirklich zahlen.",
      },
      {
        titulo: "Buchung anpassen und Aufstellung lesen",
        texto:
          "Im Inserat ändern Sie Tage, geplante Fahrstunden und ob Sie einen Skipper wollen. Jede Position rechnet sich vor Ihren Augen neu. Wenn Sie einen Törn statt eines Buchtentages planen, erhöhen Sie die Stunden: der Treibstoff ändert sich deutlich, und das weiß man besser vorher.",
      },
      {
        titulo: "Buchen",
        texto:
          "Sofort buchbare Boote werden umgehend bestätigt. Bei den übrigen antwortet der Eigner meist innerhalb einer Stunde. In beiden Fällen wird genau der angezeigte Betrag abgerechnet: es gibt keinen letzten Schritt mit Überraschungen.",
      },
      {
        titulo: "Am Tag der Abfahrt",
        texto:
          "Bringen Sie Ausweis, gegebenenfalls den Führerschein und eine Karte mit Verfügungsrahmen für die Kaution mit. Am Steg wird Ihnen das Boot erklärt, das Inventar aufgenommen und das Übergabeprotokoll mit Fotos unterschrieben. Beim ersten Mal: lassen Sie sich das Ankern zeigen.",
      },
      {
        titulo: "Bei der Rückgabe",
        texto:
          "Das Boot wird geprüft, die Kaution freigegeben, fertig. Nicht verbrauchter Treibstoff gegenüber der Schätzung wird erstattet; Mehrverbrauch wird zum Zapfsäulenpreis im Hafen berechnet, ohne Aufschlag.",
      },
    ],
    faq: [
      {
        pregunta: "Was genau enthält der angezeigte Preis?",
        respuesta:
          "Die Bootsmiete nach Saison, den geschätzten Treibstoff für die geplanten Fahrstunden, die Endreinigung, den Liegeplatz im Abfahrtshafen, die Hafengebühren und die MwSt. Die Kaution kommt separat, weil sie geblockt und nicht abgebucht wird.",
      },
      {
        pregunta: "Und wenn ich mehr oder weniger Treibstoff verbrauche?",
        respuesta:
          "Das wird bei der Rückgabe ausgeglichen. Die Schätzung nutzt den realen Verbrauch des Bootes und Ihre angegebenen Stunden; fahren Sie weniger, bekommen Sie die Differenz zurück, fahren Sie mehr, wird zum Zapfsäulenpreis ohne Aufschlag berechnet.",
      },
      {
        pregunta: "Wie funktioniert die Kaution?",
        respuesta:
          "Sie wird am Tag der Übernahme auf der Karte geblockt und bei unbeschädigter Rückgabe freigegeben. Sie reicht von 300 Euro beim Schlauchboot bis 12.000 bei der Yacht, und der genaue Betrag steht vor der Buchung in jedem Inserat.",
      },
      {
        pregunta: "Kann ich stornieren?",
        respuesta:
          "Ja. Bis 7 Tage vorher gibt es den vollen Betrag zurück. Zwischen 7 und 2 Tagen 50 %. In den letzten 48 Stunden gibt es keine Erstattung – außer der Wetterbericht macht das Auslaufen unmöglich: dann gibt es alles zurück oder einen kostenlosen Terminwechsel.",
      },
      {
        pregunta: "Was passiert bei einem Schaden am Boot?",
        respuesta:
          "Rufen Sie die Nummer auf dem Übergabeprotokoll an. Verhindert der Defekt das Fahren und liegt kein Fehlgebrauch vor, werden der anteilige Mietpreis und der nicht verbrauchte Treibstoff erstattet. Wir verweisen Sie nicht an den Eigner: wir regeln das.",
      },
      {
        pregunta: "Brauche ich einen Führerschein?",
        respuesta:
          "Das hängt vom Boot ab. Bis 5 Meter und 15 PS brauchen Sie keinen. Darüber die licencia de navegación oder den PER, je nach Länge und Leistung. Sie können nach Booten ohne Führerschein filtern oder zu jedem Boot einen Skipper dazubuchen.",
      },
    ],
  },

  publicar: {
    titulo: "Vermieten Sie Ihr Boot",
    descripcion:
      "Vermieten Sie Ihr Boot mit 12 % Provision, der niedrigsten der Branche. Ohne Exklusivität: Kalender und Preis bestimmen Sie.",
    eyebrow: "Für Eigner",
    entradilla:
      "12 % Provision, keine Exklusivität und ein für den Kunden aufgeschlüsselter Preis – genau das verhindert die Hälfte der Streitfälle bei der Rückgabe.",
    ejemploTitulo: "Ein Rechenbeispiel",
    ejemploTexto: (dias, tarifa) =>
      `Motorboot mit 7 Metern, ${dias} Miettage im Jahr zu ${tarifa} Grundpreis.`,
    ingresoBruto: "Bruttoeinnahmen",
    comision: "Provision 12 %",
    paraTi: "Für Sie",
    notaComision:
      "Treibstoff, Reinigung und Liegeplatz zahlt der Kunde separat und sie erreichen ungekürzt den, der sie stellt. Die Provision gilt nur für die Miete selbst.",
    empezar: "Loslegen",
    respuesta: "Wir antworten am selben Werktag.",
    asunto: "Ich möchte mein Boot vermieten",
    ventajas: [
      {
        titulo: "12 % Provision",
        texto:
          "Die großen Plattformen nehmen zwischen 15 und 20 %. Hier sind es 12 Punkte, ohne Einstellgebühr und ohne Bindung.",
      },
      {
        titulo: "Keine Exklusivität",
        texto:
          "Sie können weiter anderswo inserieren und selbst vermieten. Der Kalender synchronisiert sich per iCal mit dem, was Sie schon nutzen.",
      },
      {
        titulo: "Den Preis bestimmen Sie",
        texto:
          "Sie legen Grundpreis, Verbrauch, Reinigung und Kaution fest. Wir berechnen den Gesamtpreis, den der Kunde sieht, und zeigen ihn aufgeschlüsselt – damit niemand wegen des Treibstoffs bei Ihnen reklamiert.",
      },
      {
        titulo: "Garantierte Auszahlung",
        texto:
          "Der Betrag wird 24 Stunden nach der Abfahrt überwiesen. Erscheint der Kunde nicht, werden Sie nach den Stornobedingungen trotzdem bezahlt.",
      },
    ],
    faq: [
      {
        pregunta: "Was brauche ich, um mein Boot einzustellen?",
        respuesta:
          "Gültige Zulassung, die Pflicht-Haftpflichtversicherung, die letzte technische Prüfung sofern erforderlich und das Seetüchtigkeitszeugnis. Wenn Sie mit Skipper vermieten, zusätzlich dessen Befähigungsnachweis.",
      },
      {
        pregunta: "Wie viel kann ich verdienen?",
        respuesta:
          "Das hängt von Boot und Hafen ab. Ein 7-Meter-Motorboot an der Küste von Alicante, 60 Tage im Jahr zu 300 Euro Grundpreis vermietet, bringt nach Provision rund 15.800 Euro netto. Ein 12-Meter-Segelboot auf den Balearen mit 90 Belegungstagen liegt über 30.000.",
      },
      {
        pregunta: "Wer haftet bei einem Schaden?",
        respuesta:
          "Die Kaution deckt kleinere Schäden und wird erst freigegeben, wenn Sie die einwandfreie Rückgabe bestätigen. Darüber hinaus greift die Versicherung. Hat der Kunde gegen den Vertrag verstoßen, übernehmen wir die Forderung.",
      },
      {
        pregunta: "Kann ich Termine für mich blockieren?",
        respuesta:
          "Ja, der Kalender gehört Ihnen. Sie können einzelne Tage oder ganze Saisons blockieren oder ihn per iCal mit Google Calendar oder Ihrer anderen Plattform synchronisieren.",
      },
    ],
  },
};

export const PAGINAS: Record<Idioma, PaginasFijas> = { es: ES, en: EN, de: DE };

export function paginasFijas(idioma: Idioma): PaginasFijas {
  return PAGINAS[idioma];
}
