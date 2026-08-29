import type { Textos } from "./es";

/**
 * Oberflächentexte auf Deutsch.
 *
 * Der deutschsprachige Raum ist auf Mallorca der größte ausländische Markt,
 * also bekommt diese Fassung dieselbe Sorgfalt wie die spanische. Geduzt wird
 * nicht: im Charterbereich ist die Anrede per „Sie“ üblich.
 */
export const de: Textos = {
  comun: {
    verBarcos: "Boote ansehen",
    sobreCinco: (nota) => `${nota} von 5`,
    sobreCincoConOpiniones: (nota, opiniones) =>
      `${nota} von 5 bei ${opiniones} Bewertungen`,
    verFicha: "Boot ansehen",
    volverPortada: "Zurück zur Startseite",
    cargando: "Wird geladen",
    si: "Ja",
    no: "Nein",
    desde: "ab",
    alDia: "pro Tag",
    todoIncluido: "Alles inklusive",
    sinExtras: "Alles inklusive, keine Zuschläge beim Bezahlen",
    sinLicencia: "Ohne Führerschein",
    reservaInmediata: "Sofort buchbar",
    plazas: "Plätze",
    camarotes: "Kabinen",
    dia: "Tag",
    dias: "Tage",
    horas: "Stunden",
    minutosLectura: (n) => `${n} Min. Lesezeit`,
    unasHoras: (n) => `etwa ${n} Std.`,
  },

  nav: {
    irPortada: (marca) => `${marca}, zur Startseite`,
    alquilar: "Mieten",
    experiencias: "Erlebnisse",
    sinLicencia: "Ohne Führerschein",
    guias: "Ratgeber",
    publicar: "Boot vermieten",
    buscar: "Suchen",
    principal: "Hauptnavigation",
    cambiarTema: "Zwischen hellem und dunklem Design wechseln",
    idioma: "Sprache",
    cambiarIdioma: "Sprache wechseln",
  },

  buscador: {
    destino: "Reiseziel",
    cualquierDestino: "Überall",
    tipoBarco: "Bootstyp",
    cualquierTipo: "Alle Typen",
    personas: "Personen",
    lasQueSean: "Beliebig viele",
    oMas: (n) => `${n} oder mehr`,
    enviar: "Boote ansehen",
  },

  portada: {
    contador: (barcos, destinos) =>
      `${barcos} Boote an ${destinos} Zielen in Spanien`,
    titular: "Boot mieten – mit dem echten Preis von Anfang an",
    entradilla:
      "Treibstoff, Endreinigung, Liegeplatz und Hafengebühren stecken schon im ersten Suchergebnis. Was Sie in der Suche sehen, zahlen Sie auch.",
    sinTitulacion: "Kein Führerschein?",
    barcosSinLicencia: (n) => `${n} Boote fahren Sie ohne Führerschein`,

    porQue: "Warum es Estribor gibt",
    tesisTitular: "Dieses 300-Euro-Boot kostet 674 Euro",
    tesisUno:
      "Ein Motorboot mit 250 PS verbraucht rund 40 Liter pro Stunde. Vier Stunden auf dem Wasser sind 132 Euro Diesel. Dazu Endreinigung, Liegeplatz, Hafengebühren und Mehrwertsteuer – und der beworbene Preis liegt bei weniger als der Hälfte dessen, was Sie am Ende zahlen.",
    tesisDos:
      "Das ist kein Kleingedrucktes einer einzelnen Plattform, sondern die Praxis der ganzen Branche. Hier ist diese Rechnung gemacht, bevor Sie ein einziges Inserat öffnen – und sie bestimmt die Reihenfolge der Ergebnisse.",
    buscarPrecioReal: "Mit dem echten Preis suchen",
    ejemploCabecera: "Ein Tag · Quicksilver Activ 675 · Dénia",
    alquilerBarco: "Bootsmiete",
    combustibleEstimado: (litros) => `Treibstoff (${litros} l geschätzt)`,
    loSumanAlPagar: "kommt beim Bezahlen dazu",
    limpiezaFinal: "Endreinigung",
    amarreTasas: "Liegeplatz und Hafengebühren",
    iva: "MwSt.",
    loQuePagas: "Was Sie wirklich zahlen",
    notaFianza:
      "Die Kaution von 1.000 Euro wird separat geblockt und bei Rückgabe des Bootes wieder freigegeben. Sie gehört nicht zum Preis.",

    dondeNavegar: "Wohin es geht",
    dondeNavegarTexto:
      "Zwölf Reviere mit ihrer Flotte, ihren Buchten und erklärten Revierbedingungen.",
    verTodos: "Alle Boote ansehen",
    mejorValorados: "Am besten bewertet",
    mejorValoradosTexto: "Mit dem vollen Preis, berechnet für die heutigen Daten.",
    porTipo: "Nach Bootstyp",
    porTipoTexto:
      "Jeder Rumpf hat seinen Verbrauch, seine Kapazität und seine eigene Art, genossen zu werden.",
    noSoloBarco: "Nicht nur ein Boot, sondern ein Tag",
    noSoloBarcoTexto:
      "Sonnenuntergang, Angeln, Buchten oder Wale. Jedes Erlebnis mit eigenem Preis und eigenen Booten.",
    todasExperiencias: "Alle Erlebnisse",
    nBarcos: (n) => `${n} Boote`,
    nBarcosHoras: (n, horas) => `${n} Boote · etwa ${horas} Std.`,
  },

  tarjeta: {
    comparar: "Vergleichen",
    compararEste: "Dieses Boot mit anderen vergleichen",
    seQuitaraPrimero: "Das zuerst gewählte Boot fällt heraus",
    desglose: (base, extras) =>
      `Grundpreis ${base} + ${extras} für Treibstoff, Reinigung, Liegeplatz, Gebühren und MwSt.`,
  },

  busqueda: {
    titulo: "Boot mieten in Spanien",
    tituloGenerico: "Boot mieten",
    tituloConTipo: (tipos) => `${tipos} mieten`,
    enDestino: (destino) => `in ${destino}`,
    enEspana: "in Spanien",
    resumen: (n, uno) =>
      `${n} ${uno ? "Boot" : "Boote"} mit vollständig berechnetem Preis. Keine Zuschläge beim Bezahlen.`,
    sinResultados: "Kein Boot erfüllt all das",
    sinResultadosTexto:
      "Setzen Sie die Preisgrenze höher oder nehmen Sie ein Ausstattungsmerkmal heraus – das sind meist die Filter, die eine Suche am stärksten einengen.",
    filtrarOrdenar: "Filtern und sortieren",
  },

  filtros: {
    titulo: "Filter",
    quitar: (n) => `${n} zurücksetzen`,
    tipoBarco: "Bootstyp",
    cualquiera: "Beliebig",
    personas: "Personen an Bord",
    lasQueSean: "Beliebig viele",
    oMas: (n) => `${n} oder mehr`,
    precioMaximo: "Höchstpreis pro Tag",
    sinTope: "Keine Grenze",
    hasta: (importe) => `Bis ${importe}`,
    notaPrecio:
      "Die Grenze gilt für den Gesamtpreis, nicht für den Grundpreis.",
    condiciones: "Bedingungen",
    puedoSinTitulacion: "Ich darf es ohne Führerschein fahren",
    conPatron: "Mit Skipper buchbar",
    reservaInmediata: "Sofort buchbar",
    equipamiento: "Ausstattung",
    equipamientoLeyenda: "Ausstattung an Bord",
    notaEquipamiento:
      "Es werden nur Boote angezeigt, die alles Angekreuzte an Bord haben.",
    ordenarPor: "Sortieren nach",
    aplicar: "Filter anwenden",
    llevaAlBuscador: (destino) =>
      `Beim Filtern geht es zur Suche, ${destino} ist dort schon gesetzt.`,
    ordenes: {
      recomendados: "Empfohlen",
      precioAsc: "Preis: niedrigster zuerst",
      precioDesc: "Preis: höchster zuerst",
      valoracion: "Beste Bewertung",
    },
  },

  paginacion: {
    etiqueta: "Seitennummerierung",
    anterior: "Zurück",
    siguiente: "Weiter",
  },

  destino: {
    disponiblesDesde: (barcos, precio) =>
      `${barcos} verfügbar ab ${precio} pro Tag, alles inklusive.`,
    tiposAqui: (destino) => `Bootstypen in ${destino}`,
    tipoEn: (tipo, destino) => `${tipo} in ${destino}`,
    navegarEn: (destino) => `Unterwegs in ${destino}`,
    puertos: "Übernahmehäfen",
    temporadaAlta: "Hauptsaison",
    notaTemporada:
      "Außerhalb dieser Monate sinkt der Grundpreis um 25 bis 45 %.",
    sinFlota: (destino) => `In ${destino} ist noch keine Flotte eingestellt.`,
    verTodosDe: (n, destino) => `Alle ${n} Boote in ${destino} ansehen`,
    otrosDestinos: "Weitere Reiseziele",
    adondeSeLlega: (destino) => `Wohin es von ${destino} aus geht`,
    barcosEn: (destino) => `Boote in ${destino}`,
    otrosTiposEn: (destino) => `Weitere Boote in ${destino}`,
    todosLosDe: (destino) => `Alle Boote in ${destino}`,
    verLosN: (n) => `Alle ${n} Boote ansehen`,
    guiaOtroIdioma: "Der Revierführer für diesen Hafen ist auf Spanisch verfasst.",
    verGuiaEs: "Auf Spanisch lesen",
  },

  lugar: {
    titulo: "Reiseziele",
    entradilla:
      "Die Orte, für die man an dieser Küste ein Boot mietet. Jeweils mit den Häfen, von denen aus man hinkommt, und der Fahrzeit.",
    comoLlegar: (lugar) => `Anfahrt nach ${lugar}`,
    desde: (puerto) => `Ab ${puerto}`,
    minutos: (n) => `${n} Min. Fahrt`,
    sinTitulo: "Ohne Führerschein erreichbar",
    conPatron: "Skipper oder Führerschein nötig",
    verBarcos: (puerto) => `Boote in ${puerto} ansehen`,
    otrosLugares: "Weitere Ziele an dieser Küste",
  },

  sinLicenciaMunicipio: {
    titulo: (destino) => `Boot mieten ohne Führerschein in ${destino}`,
    descripcion: (destino) =>
      `Was Sie in ${destino} ohne Bootsführerschein mieten können und welche Boote mit Skipper fahren. Endpreis ohne Überraschungen.`,
    resumen: (n, destino, precio) =>
      `${n} in ${destino}, die Sie ohne Bootsführerschein mieten können, ab ${precio} pro Tag inklusive aller Kosten.`,
    bloqueTu: "Boote, die Sie selbst fahren dürfen",
    bloqueTuNota:
      "Ohne Führerschein, nach der Sicherheitseinweisung am Steg.",
    bloquePatron: "Boote mit Skipper",
    bloquePatronNota:
      "Den Führerschein bringt der Skipper mit. Sie bestimmen nur das Ziel.",
    sinFlota: (destino) =>
      `In ${destino} sind noch keine führerscheinfreien Boote gelistet.`,
    verTodos: (destino) => `Alle Boote in ${destino} ansehen`,
  },

  ficha: {
    fichaTecnica: "Technische Daten",
    eslora: "Länge",
    capacidad: "Kapazität",
    camarotes: "Kabinen",
    aseos: "Nasszellen",
    potencia: "Motorleistung",
    anio: "Baujahr",
    consumo: "Verbrauch",
    titulacion: "Führerschein",
    necesaria: "Erforderlich",
    noHaceFalta: "Nicht erforderlich",
    equipamiento: "Ausstattung an Bord",
    grupos: {
      navegacion: "Navigation",
      confort: "Komfort",
      ocio: "Freizeit",
      seguridad: "Sicherheit",
    },
    quienAlquila: "Wer vermietet",
    empresa: "Charterunternehmen",
    particular: "Privater Eigner",
    superAnfitrion: "Superhost",
    respondeEn: (minutos) => `Antwortet in etwa ${minutos} Minuten`,
    opiniones: "Bewertungen",
    otrosEn: (destino) => `Weitere Boote in ${destino}`,
    metaDescripcion: (nombre, puerto, precio, plazas) =>
      `${nombre} in ${puerto} mieten ab ${precio} pro Tag, alles inklusive: Treibstoff, Endreinigung, Liegeplatz und Hafengebühren. ${plazas} Plätze.`,
  },

  reserva: {
    temporadaAlta: "Hauptsaison",
    temporadaMedia: "Zwischensaison",
    temporadaBaja: "Nebensaison",
    sinExtras: "Alles inklusive. Beim Bezahlen kommt nichts dazu.",
    diasAlquiler: "Miettage",
    unDiaMenos: "Ein Tag weniger",
    unDiaMas: "Ein Tag mehr",
    minimoDias: (dias) => `Dieses Boot wird ab ${dias} vermietet.`,
    horasNavegacion: "Fahrstunden pro Tag",
    notaHoras:
      "Verschieben Sie das und der Treibstoff ändert sich mit. Ein Buchtentag sind meist 3 bis 5 Motorstunden, ein Törn das Doppelte.",
    conPatron: "Mit Skipper",
    patronDia: (importe) => `+${importe} pro Tag`,
    exigeTitulacion:
      "Dieses Boot verlangt einen Führerschein. Ohne Schein brauchen Sie einen Skipper.",
    ivaLinea: "MwSt. 21 %",
    total: "Gesamt",
    reservarAhora: "Jetzt buchen",
    solicitarDisponibilidad: "Verfügbarkeit anfragen",
    notaInmediata:
      "Sofortige Bestätigung, ohne auf den Eigner zu warten.",
    notaPeticion: "Der Eigner antwortet in der Regel innerhalb einer Stunde.",
    fianza: "Kaution",
    notaFianza:
      "Wird bei Übernahme auf der Karte geblockt und bei Rückgabe freigegeben. Sie wird nicht abgebucht und gehört nicht zum Gesamtpreis.",
    conceptos: {
      alquiler: "Miete",
      descuento: (porcentaje) => `${porcentaje} % Rabatt`,
      porReservar: (dias) => `Ab ${dias} Tagen Buchung`,
      combustible: "Geschätzter Treibstoff",
      detalleCombustible: (litros, horas) =>
        `${litros} l · ${horas} Std. Fahrt pro Tag`,
      limpieza: "Endreinigung",
      pagoUnico: "Einmalig",
      amarre: "Liegeplatz und Gebühren",
      patron: "Skipper",
      porDias: (dias, importe) => `${dias} × ${importe}`,
    },
  },

  comparar: {
    titulo: "Boote vergleichen",
    descripcion:
      "Vergleichen Sie bis zu drei Boote nebeneinander: Gesamtpreis, Verbrauch, Kapazität, Ausstattung und Bedingungen.",
    encabezado: (n) => `${n} Boote nebeneinander`,
    entradilla:
      "Der Preis oben ist der Gesamtpreis mit Treibstoff, Reinigung, Liegeplatz, Gebühren und MwSt. Der beste Wert jeder Zeile ist markiert.",
    soloDiferencias: "Nur die Unterschiede zeigen",
    loMejor: "(bester Wert der Zeile)",
    hacenFaltaDos: "Es braucht mindestens zwei Boote",
    soloUno:
      "Es ist nur eines ausgewählt. Setzen Sie bei einem weiteren Ergebnis das Häkchen „Vergleichen“ und kommen Sie zurück.",
    ninguno:
      "Setzen Sie bei den Booten, die Sie gegenüberstellen möchten, das Häkchen „Vergleichen“. Bis zu drei sind möglich.",
    irResultados: "Zu den Ergebnissen",
    grupos: {
      cuesta: "Was es kostet",
      barco: "Das Boot",
      condiciones: "Bedingungen",
      equipamiento: "Ausstattung",
    },
    filas: {
      precioDia: "Preis pro Tag, alles inklusive",
      tarifaBase: "Beworbener Grundpreis",
      combustibleDia: "Geschätzter Treibstoff pro Tag",
      limpieza: "Endreinigung",
      amarreDia: "Liegeplatz und Gebühren pro Tag",
      patronDia: "Skipper pro Tag",
      fianza: "Kaution",
      descuentoSemana: "Rabatt ab 7 Tagen",
      plazas: "Plätze",
      camarotes: "Kabinen",
      aseos: "Nasszellen",
      eslora: "Länge",
      potencia: "Motorleistung",
      consumo: "Verbrauch",
      anio: "Baujahr",
      tipo: "Typ",
      titulacion: "Führerschein",
      reserva: "Buchung",
      minimoDias: "Mindestmiettage",
      valoracion: "Bewertung",
      puerto: "Hafen",
      destino: "Reiseziel",
    },
    valores: {
      noDisponible: "Nicht verfügbar",
      sinDescuento: "Kein Rabatt",
      sinCamarotes: "Keine Kabinen",
      sinAseo: "Keine Nasszelle",
      sinMotor: "Kein Motor",
      noConsume: "Kein Verbrauch",
      inmediata: "Sofort",
      bajoPeticion: "Auf Anfrage",
      loLleva: "Vorhanden",
    },
    barra: {
      deTres: (n, max) => `${n} von ${max}`,
      paraComparar: "zum Vergleich",
      quitar: (nombre) => `${nombre} aus dem Vergleich entfernen`,
      vaciar: "Leeren",
      comparar: "Vergleichen",
      eligeOtro: "Noch eines auswählen",
    },
  },

  faq: {
    titulo: "Häufige Fragen",
  },

  blog: {
    entradilla:
      "Preise mit fertiger Rechnung, Führerscheine ohne Fachjargon erklärt und Törns Etappe für Etappe. Ohne Füllmaterial.",
    sinArticulos: "In dieser Sprache gibt es noch keine Ratgeber",
    sinArticulosTexto:
      "Wir übersetzen sie gerade. Bis dahin können Sie sie auf Spanisch lesen – Preise und Vorschriften sind dieselben.",
    verEnCastellano: "Ratgeber auf Spanisch lesen",
    sigueAqui: "Hier weiterlesen",
    otrasGuias: "Weitere Ratgeber",
  },

  pie: {
    lema:
      "Der Preis in der Suche ist der Preis, den Sie zahlen. Treibstoff, Reinigung, Liegeplatz und Hafengebühren sind ab dem ersten Ergebnis enthalten.",
    destinos: "Reiseziele",
    tipos: "Bootstypen",
    experiencias: "Erlebnisse",
    marca: "Estribor",
    comoFunciona: "So funktioniert es",
    publicar: "Boot vermieten",
    sinLicencia: "Boote ohne Führerschein",
    guias: "Törn-Ratgeber",
    derechos: (anio, marca) => `© ${anio} ${marca}. Preise inklusive MwSt.`,
  },

  error: {
    titulo: "Hier ist kein Ankerplatz",
    texto:
      "Diese Seite gibt es nicht, oder das gesuchte Boot ist nicht mehr eingestellt. Suchen Sie es über das Reiseziel.",
  },

  tiposBarco: {
    velero: "Segelboote",
    catamaran: "Katamarane",
    lancha: "Motorboote",
    neumatica: "Schlauchboote",
    yate: "Yachten",
    llaut: "Llaüts",
    "casa-flotante": "Hausboote",
  },
  descripcionTipo: {
    velero:
      "Segeln für Törns über mehrere Tage. Kajüten, Pantry und der geringste Kraftstoffverbrauch der ganzen Flotte: Der Motor läuft nur im Hafen und bei Flaute.",
    catamaran:
      "Zwei Rümpfe, keine Rollbewegung und eine riesige Plattform dazwischen. Die Wahl für große Gruppen und für alle, die seekrank werden: An Stabilität kommt kein Einrumpfboot heran.",
    lancha:
      "Motorboot für den Tag, um schnell zwischen den Buchten zu wechseln. Kommt überall zügig hin, doch hier fällt der Kraftstoff am stärksten ins Gewicht: Schauen Sie eher auf den Verbrauch als auf den Grundpreis.",
    neumatica:
      "Leichtes Schlauchboot, einfach zu fahren und mit wenig Tiefgang für kleine Buchten. Modelle bis 15 PS erfordern keinen Führerschein.",
    yate:
      "Große Motoryacht mit Kajüten, Crew und allem Service an Bord. Hoher Verbrauch und Skipper vorgeschrieben, dafür eine ganz andere Art, auf See zu sein.",
    llaut:
      "Das traditionelle Boot des Mittelmeers: Holzrumpf, langsamer Motor, wenig Verbrauch. Für einen ganzen Tag vor Anker ohne Eile gibt es nichts Besseres.",
    "casa-flotante":
      "Unterkunft im Hafen festgemacht, mit dem Komfort einer Wohnung und dem Blick von einem Boot. Es fährt nicht: Man übernachtet an Bord.",
  },


  tiposBarcoSingular: {
    velero: "Segelboot",
    catamaran: "Katamaran",
    lancha: "Motorboot",
    neumatica: "Schlauchboot",
    yate: "Yacht",
    llaut: "Llaüt",
    "casa-flotante": "Hausboot",
  },

  actividades: {
    atardecer: "Sonnenuntergang",
    pesca: "Angeln",
    "calas-y-snorkel": "Buchten und Schnorcheln",
    "avistamiento-cetaceos": "Wal- und Delfinbeobachtung",
    celebraciones: "Feiern",
  },

  migas: {
    etiqueta: "Brotkrumen-Navigation",
    inicio: "Start",
    alquiler: "Boot mieten",
    comparar: "Vergleichen",
    guias: "Ratgeber",
    sinLicencia: "Ohne Führerschein",
    comoFunciona: "So funktioniert es",
    publicar: "Boot vermieten",
    experiencias: "Erlebnisse",
  },
};
