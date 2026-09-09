import type { Textos } from "./es";

/**
 * Interface strings in English.
 *
 * British spelling throughout ("licence" as a noun, "metre"), because the main
 * non-Spanish market for Balearic and Costa Blanca charter is the UK and
 * Ireland. The type comes from the Spanish file, so a missing key is a
 * compile error rather than a Spanish word showing up in an English page.
 */
export const en: Textos = {
  comun: {
    verBarcos: "See boats",
    sobreCinco: (nota) => `${nota} out of 5`,
    sobreCincoConOpiniones: (nota, opiniones) =>
      `${nota} out of 5 from ${opiniones} reviews`,
    verFicha: "View boat",
    volverPortada: "Back to home",
    cargando: "Loading",
    si: "Yes",
    no: "No",
    desde: "from",
    alDia: "per day",
    todoIncluido: "Everything included",
    sinExtras: "All in. Nothing added at checkout",
    sinLicencia: "No licence",
    reservaInmediata: "Instant booking",
    plazas: "guests",
    camarotes: "cabins",
    dia: "day",
    dias: "days",
    horas: "hours",
    minutosLectura: (n) => `${n} min read`,
    unasHoras: (n) => `around ${n} h`,
  },

  nav: {
    irPortada: (marca) => `${marca}, back to home`,
    alquilar: "Rent",
    destinos: "Destinations",
    experiencias: "Experiences",
    sinLicencia: "No licence",
    guias: "Guides",
    publicar: "List your boat",
    buscar: "Search",
    principal: "Main",
    cambiarTema: "Switch between light and dark theme",
    idioma: "Language",
    cambiarIdioma: "Change language",
  },

  buscador: {
    destino: "Destination",
    cualquierDestino: "Anywhere",
    tipoBarco: "Boat type",
    cualquierTipo: "Any type",
    personas: "Guests",
    lasQueSean: "Any number",
    oMas: (n) => `${n} or more`,
    enviar: "See boats",
  },

  portada: {
    contador: (barcos, destinos) =>
      `${barcos} boats across ${destinos} destinations in Spain`,
    titular: "Boat rental with the real price up front",
    entradilla:
      "Fuel, cleaning, mooring and port fees are in from the very first result. What you see in the search is exactly what you pay.",
    sinTitulacion: "No licence?",
    barcosSinLicencia: (n) => `${n} boats you can skipper with no licence`,

    porQue: "Why Estribor exists",
    tesisTitular: "That €300 boat costs €674",
    tesisUno:
      "A 250 hp motorboat burns around 40 litres an hour. Four hours out is €132 of diesel. Add cleaning, mooring, port fees and VAT and the advertised figure comes to less than half of what you actually pay.",
    tesisDos:
      "This is not the small print of one particular platform: it is how the whole sector works. Here that sum is done before you open a single listing, and it is the number that ranks the results.",
    buscarPrecioReal: "Search with the real price",
    ejemploCabecera: "One day · Quicksilver Activ 675 · Dénia",
    alquilerBarco: "Boat hire",
    combustibleEstimado: (litros) => `Fuel (${litros} l estimated)`,
    loSumanAlPagar: "added at checkout",
    limpiezaFinal: "Final cleaning",
    amarreTasas: "Mooring and port fees",
    iva: "VAT",
    loQuePagas: "What you actually pay",
    notaFianza:
      "The €1,000 deposit is held separately and released when you hand the boat back. It is not part of the price.",

    dondeNavegar: "Where to sail",
    dondeNavegarTexto:
      "Twelve areas with their fleet, their coves and their sailing conditions explained.",
    verTodos: "See every boat",
    mejorValorados: "Best rated",
    mejorValoradosTexto: "With the full price worked out for today's dates.",
    porTipo: "By boat type",
    porTipoTexto:
      "Every hull has its own fuel burn, its capacity and its own way of being enjoyed.",
    noSoloBarco: "Not just a boat: a day out",
    noSoloBarcoTexto:
      "Sunset, fishing, coves or whale watching. Each experience with its own price and its own boats.",
    todasExperiencias: "All experiences",
    nBarcos: (n) => `${n} boats`,
    nBarcosHoras: (n, horas) => `${n} boats · around ${horas} h`,
  },

  tarjeta: {
    comparar: "Compare",
    compararEste: "Compare this boat with others",
    seQuitaraPrimero: "The first one you picked will be dropped",
    desglose: (base, extras) =>
      `Base rate ${base} + ${extras} of fuel, cleaning, mooring, fees and VAT`,
  },

  busqueda: {
    titulo: "Boat rental in Spain",
    tituloGenerico: "Boat rental",
    tituloConTipo: (tipos) => `${tipos} for hire`,
    enDestino: (destino) => `in ${destino}`,
    enEspana: "in Spain",
    resumen: (n, uno) =>
      `${n} ${uno ? "boat" : "boats"} with the full price worked out. Nothing added at checkout.`,
    sinResultados: "No boat matches all of that",
    sinResultadosTexto:
      "Try raising the price cap or dropping a piece of equipment: those are usually the filters that narrow a search the most.",
    filtrarOrdenar: "Filter and sort",
  },

  filtros: {
    titulo: "Filters",
    quitar: (n) => `Clear ${n}`,
    tipoBarco: "Boat type",
    cualquiera: "Any",
    personas: "Guests on board",
    lasQueSean: "Any number",
    oMas: (n) => `${n} or more`,
    precioMaximo: "Maximum price per day",
    sinTope: "No cap",
    hasta: (importe) => `Up to ${importe}`,
    notaPrecio:
      "The cap applies to the all-in price, not to the base rate.",
    condiciones: "Conditions",
    puedoSinTitulacion: "I can skipper it with no licence",
    conPatron: "Skipper available",
    reservaInmediata: "Instant booking",
    equipamiento: "Equipment",
    equipamientoLeyenda: "Equipment on board",
    notaEquipamiento: "Only boats carrying everything you tick are shown.",
    ordenarPor: "Sort by",
    aplicar: "Apply filters",
    llevaAlBuscador: (destino) =>
      `Filtering takes you to the search, with ${destino} already set.`,
    ordenes: {
      recomendados: "Recommended",
      precioAsc: "Price: lowest first",
      precioDesc: "Price: highest first",
      valoracion: "Best rated",
    },
  },

  paginacion: {
    etiqueta: "Pagination",
    anterior: "Previous",
    siguiente: "Next",
  },

  destino: {
    disponiblesDesde: (barcos, precio) =>
      `${barcos} available from ${precio} per day, everything included.`,
    tiposAqui: (destino) => `Boat types in ${destino}`,
    tipoEn: (tipo, destino) => `${tipo} in ${destino}`,
    navegarEn: (destino) => `Sailing in ${destino}`,
    puertos: "Pick-up marinas",
    temporadaAlta: "High season",
    notaTemporada:
      "Outside those months the base rate drops by 25 to 45 %.",
    sinFlota: (destino) => `No boats listed in ${destino} yet.`,
    verTodosDe: (n, destino) => `See all ${n} boats in ${destino}`,
    otrosDestinos: "Other destinations",
    adondeSeLlega: (destino) => `Where you can get to from ${destino}`,
    barcosEn: (destino) => `Boats in ${destino}`,
    otrosTiposEn: (destino) => `Other boats in ${destino}`,
    todosLosDe: (destino) => `Every boat in ${destino}`,
    verLosN: (n) => `See all ${n} boats`,
    guiaOtroIdioma: "The local sailing guide for this marina is written in Spanish.",
    verGuiaEs: "Read it in Spanish",
  },

  ocasiones: {
    titulo: "Occasions",
    entradilla:
      "Hen and stag parties, birthdays, company events and proposals. The whole boat for your group, with the price split between you.",
    desdePorPersona: (precio, plazas) =>
      `From ${precio} per person split between ${plazas}, skipper included.`,
    desdePlazas: (n) => `From ${n} berths`,
    flotaTitulo: (n) => `Boats with ${n} berths or more`,
    flotaNota:
      "Only boats that fit your group and can sail with a skipper. The price on each listing is the final one: divide it between you.",
    presupuestoTitulo: "This one goes by quote",
    presupuestoTexto:
      "With an invoice, documented insurance and a fixed price within 24 hours. It does not go through the checkout because a company or a wedding needs paperwork a pay button cannot give.",
    otras: "Other occasions",
  },

  guias: {
    titulo: "Guides",
    entradilla:
      "What to know before hiring a boat and before listing one. Reviewed every season; no publication date, because they do not age the way news does.",
    paraNavegar: "For people hiring a boat",
    paraArmadores: "For boat owners",
    revisada: (fecha) => `Reviewed on ${fecha}`,
    minutos: (n) => `${n} min read`,
    seguirPor: "Carry on here",
    otras: "Other guides",
    vacio: "No guides published in this language yet.",
  },

  lugar: {
    titulo: "Destinations",
    entradilla:
      "The places people hire a boat for on this coast. Each one with the harbours it is reached from and how long it takes.",
    comoLlegar: (lugar) => `Getting to ${lugar}`,
    desde: (puerto) => `From ${puerto}`,
    minutos: (n) => `${n} min under way`,
    sinTitulo: "Reachable without a licence",
    conPatron: "Skipper or licence required",
    verBarcos: (puerto) => `See boats in ${puerto}`,
    otrosLugares: "Other destinations on this coast",
  },

  sinLicenciaMunicipio: {
    titulo: (destino) => `Boat hire without a licence in ${destino}`,
    descripcion: (destino) =>
      `What you can hire in ${destino} without a boating licence, and which boats come with a skipper. Final price, no surprises.`,
    resumen: (n, destino, precio) =>
      `${n} in ${destino} you can hire without holding a boating licence, from ${precio} per day, everything included.`,
    bloqueTu: "Boats you can helm yourself",
    bloqueTuNota:
      "No licence needed, after the safety briefing on the pontoon.",
    bloquePatron: "Boats that come with a skipper",
    bloquePatronNota:
      "The skipper holds the licence. You just choose where to go.",
    sinFlota: (destino) =>
      `No licence-free boats listed in ${destino} yet.`,
    verTodos: (destino) => `See all boats in ${destino}`,
  },

  ficha: {
    fichaTecnica: "Specifications",
    eslora: "Length",
    capacidad: "Capacity",
    camarotes: "Cabins",
    aseos: "Heads",
    potencia: "Engine",
    anio: "Year",
    consumo: "Fuel burn",
    titulacion: "Licence",
    necesaria: "Required",
    noHaceFalta: "Not required",
    equipamiento: "Equipment on board",
    grupos: {
      navegacion: "Navigation",
      confort: "Comfort",
      ocio: "Leisure",
      seguridad: "Safety",
    },
    quienAlquila: "Who rents it out",
    empresa: "Charter company",
    particular: "Private owner",
    superAnfitrion: "Superhost",
    respondeEn: (minutos) => `Replies in about ${minutos} minutes`,
    opiniones: "Reviews",
    otrosEn: (destino) => `Other boats in ${destino}`,
    metaDescripcion: (nombre, puerto, precio, plazas) =>
      `Hire the ${nombre} in ${puerto} from ${precio} per day, everything included: fuel, cleaning, mooring and port fees. ${plazas} guests.`,
  },

  reserva: {
    temporadaAlta: "High season",
    temporadaMedia: "Mid season",
    temporadaBaja: "Low season",
    sinExtras: "Everything included. Nothing added at checkout.",
    diasAlquiler: "Days of hire",
    unDiaMenos: "One day less",
    unDiaMas: "One day more",
    minimoDias: (dias) => `This boat is hired for a minimum of ${dias}.`,
    horasNavegacion: "Hours under way per day",
    notaHoras:
      "Move this and watch the fuel change. A day of coves is usually 3 to 5 hours of engine; a passage, twice that.",
    conPatron: "With skipper",
    patronDia: (importe) => `+${importe} per day`,
    exigeTitulacion:
      "This boat requires a licence. If you do not hold one, you need a skipper.",
    ivaLinea: "VAT 21 %",
    total: "Total",
    reservarAhora: "Book now",
    solicitarDisponibilidad: "Check availability",
    notaInmediata: "Instant confirmation, no waiting for the owner to reply.",
    notaPeticion: "The owner usually replies within the hour.",
    fianza: "Security deposit",
    notaFianza:
      "Held on your card when you collect the boat and released when you bring it back. It is never charged and is not part of the total.",
    fechas: "Dates",
    entrada: "Check-in",
    salida: "Check-out",
    nombre: "Your name",
    email: "Your email",
    telefono: "Phone (optional)",
    personas: "Guests",
    enviando: "Sending…",
    exito: (referencia) =>
      `Request sent. Your reference is ${referencia}. We'll get in touch to confirm.`,
    error: "Could not send. Check your details and try again.",
    eligeFechas: "Pick the dates to see the exact price.",
    conceptos: {
      alquiler: "Hire",
      descuento: (porcentaje) => `${porcentaje} % discount`,
      porReservar: (dias) => `For booking ${dias} days or more`,
      combustible: "Estimated fuel",
      detalleCombustible: (litros, horas) =>
        `${litros} l · ${horas} h under way per day`,
      limpieza: "Final cleaning",
      pagoUnico: "One-off charge",
      amarre: "Mooring and fees",
      patron: "Skipper",
      porDias: (dias, importe) => `${dias} × ${importe}`,
    },
  },

  comparar: {
    titulo: "Compare boats",
    descripcion:
      "Compare up to three boats side by side: all-in price, fuel burn, capacity, equipment and conditions.",
    encabezado: (n) => `${n} boats, side by side`,
    entradilla:
      "The price at the top is the total with fuel, cleaning, mooring, fees and VAT. The best of each row is marked.",
    soloDiferencias: "Show only the differences",
    loMejor: "(best in this row)",
    hacenFaltaDos: "You need at least two boats",
    soloUno:
      "Only one is selected. Tick “Compare” on another result and come back here.",
    ninguno:
      "Tick “Compare” on the boats you want to put head to head. You can pick up to three.",
    irResultados: "Go to the results",
    grupos: {
      cuesta: "What it costs",
      barco: "The boat",
      condiciones: "Conditions",
      equipamiento: "Equipment",
    },
    filas: {
      precioDia: "Price per day, all in",
      tarifaBase: "Advertised base rate",
      combustibleDia: "Estimated fuel per day",
      limpieza: "Final cleaning",
      amarreDia: "Mooring and fees per day",
      patronDia: "Skipper per day",
      fianza: "Security deposit",
      descuentoSemana: "Discount from 7 days",
      plazas: "Guests",
      camarotes: "Cabins",
      aseos: "Heads",
      eslora: "Length",
      potencia: "Engine",
      consumo: "Fuel burn",
      anio: "Year",
      tipo: "Type",
      titulacion: "Licence",
      reserva: "Booking",
      minimoDias: "Minimum days",
      valoracion: "Rating",
      puerto: "Marina",
      destino: "Destination",
    },
    valores: {
      noDisponible: "Not available",
      sinDescuento: "No discount",
      sinCamarotes: "No cabins",
      sinAseo: "No heads",
      sinMotor: "No engine",
      noConsume: "Burns nothing",
      inmediata: "Instant",
      bajoPeticion: "On request",
      loLleva: "Included",
    },
    barra: {
      deTres: (n, max) => `${n} of ${max}`,
      paraComparar: "to compare",
      quitar: (nombre) => `Remove ${nombre} from the comparison`,
      vaciar: "Clear",
      comparar: "Compare",
      eligeOtro: "Pick one more",
    },
  },

  faq: {
    titulo: "Frequently asked questions",
  },

  blog: {
    entradilla:
      "Prices with the sums done, licences explained without jargon and routes told leg by leg. No filler.",
    sinArticulos: "No guides in this language yet",
    sinArticulosTexto:
      "We are translating them. In the meantime you can read them in Spanish: the prices and the regulations are the same.",
    verEnCastellano: "Read the guides in Spanish",
    sigueAqui: "Carry on here",
    otrasGuias: "Other guides",
  },

  pie: {
    lema:
      "The price you see in the search is the price you pay. Fuel, cleaning, mooring and port fees are in from the first result.",
    destinos: "Destinations",
    tipos: "Boat types",
    experiencias: "Experiences",
    marca: "Estribor",
    comoFunciona: "How it works",
    publicar: "List your boat",
    sinLicencia: "Boats without a licence",
    guias: "Sailing guides",
    destinosNombre: "Places worth sailing to",
    blog: "Blog",
    ocasiones: "Occasions",
    derechos: (anio, marca) => `© ${anio} ${marca}. Prices include VAT.`,
  },

  error: {
    titulo: "No anchorage here",
    texto:
      "This page does not exist, or the boat you were after is no longer listed. Try searching by destination.",
  },

  tiposBarco: {
    velero: "Sailboats",
    catamaran: "Catamarans",
    lancha: "Motorboats",
    neumatica: "RIBs",
    yate: "Yachts",
    llaut: "Llaüts",
    "casa-flotante": "Houseboats",
  },
  descripcionTipo: {
    velero:
      "Sailing for passages of several days. Cabins, a galley and the lowest fuel bill in the fleet: the engine only runs in and out of harbour and in flat calms.",
    catamaran:
      "Two hulls, no roll and a huge platform between them. The choice for large groups and for anyone who gets seasick: no monohull comes close on stability.",
    lancha:
      "A day motorboat for moving quickly between coves. It gets everywhere fast, but this is where fuel weighs most: check the consumption before the headline rate.",
    neumatica:
      "A light RIB, easy to handle and shallow enough to slip into small coves. The smaller models need no licence: each boat's listing says whether one is required.",
    yate:
      "A large motor yacht with cabins, crew and every service on board. High consumption and a skipper is compulsory, but it is a different way of being at sea.",
    llaut:
      "The traditional Mediterranean boat: wooden hull, slow engine, little fuel. For a whole day at anchor with no hurry, there is nothing better.",
    "casa-flotante":
      "Accommodation moored in the marina, with the comfort of an apartment and the view from a boat. It does not sail: you sleep on board.",
  },


  tiposBarcoSingular: {
    velero: "Sailboat",
    catamaran: "Catamaran",
    lancha: "Motorboat",
    neumatica: "RIB",
    yate: "Yacht",
    llaut: "Llaüt",
    "casa-flotante": "Houseboat",
  },

  actividades: {
    atardecer: "Sunset",
    pesca: "Fishing",
    "calas-y-snorkel": "Coves and snorkelling",
    "avistamiento-cetaceos": "Whale and dolphin watching",
    celebraciones: "Celebrations",
  },

  migas: {
    etiqueta: "Breadcrumb",
    inicio: "Home",
    alquiler: "Boat rental",
    comparar: "Compare",
    guias: "Guides",
    sinLicencia: "No licence",
    comoFunciona: "How it works",
    publicar: "List your boat",
    experiencias: "Experiences",
  },
};
