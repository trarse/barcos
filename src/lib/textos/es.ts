/**
 * Textos de la interfaz en castellano.
 *
 * Este fichero es la fuente de verdad: de su forma sale el tipo `Textos`, y
 * las otras traducciones tienen que satisfacerlo. Añadir una cadena aquí sin
 * traducirla en `en.ts` y `de.ts` rompe la compilación, que es exactamente lo
 * que se quiere: una interfaz medio traducida es peor que ninguna.
 *
 * Lo que lleva interpolación se declara como función, no como plantilla con
 * marcadores: así el orden de las palabras puede cambiar en cada idioma sin
 * pelearse con un `%s`.
 */
export const es = {
  comun: {
    verBarcos: "Ver barcos",
    sobreCinco: (nota: string) => `${nota} sobre 5`,
    sobreCincoConOpiniones: (nota: string, opiniones: string) =>
      `${nota} sobre 5 según ${opiniones} opiniones`,
    verFicha: "Ver ficha",
    volverPortada: "Volver a la portada",
    cargando: "Cargando",
    si: "Sí",
    no: "No",
    desde: "desde",
    alDia: "al día",
    todoIncluido: "Todo incluido",
    sinExtras: "Todo incluido, sin extras al pagar",
    sinLicencia: "Sin licencia",
    reservaInmediata: "Reserva inmediata",
    plazas: "plazas",
    camarotes: "camarotes",
    dia: "día",
    dias: "días",
    horas: "horas",
    minutosLectura: (n: number) => `${n} min de lectura`,
    unasHoras: (n: number) => `unas ${n} h`,
  },

  nav: {
    irPortada: (marca: string) => `${marca}, ir a la portada`,
    alquilar: "Alquilar",
    destinos: "Destinos",
    experiencias: "Experiencias",
    sinLicencia: "Sin licencia",
    guias: "Guías",
    publicar: "Publicar mi barco",
    buscar: "Buscar",
    principal: "Principal",
    cambiarTema: "Cambiar entre tema claro y oscuro",
    idioma: "Idioma",
    cambiarIdioma: "Cambiar de idioma",
  },

  buscador: {
    destino: "Destino",
    cualquierDestino: "Cualquier destino",
    tipoBarco: "Tipo de barco",
    cualquierTipo: "Cualquier tipo",
    personas: "Personas",
    lasQueSean: "Las que sean",
    oMas: (n: number) => `${n} o más`,
    enviar: "Ver barcos",
  },

  portada: {
    contador: (barcos: string, destinos: number) =>
      `${barcos} barcos en ${destinos} destinos de España`,
    titular: "Alquiler de barcos con el precio final por delante",
    entradilla:
      "Combustible, limpieza, amarre y tasas van dentro desde el primer resultado. Lo que ves en el buscador es exactamente lo que pagas.",
    sinTitulacion: "¿Sin titulación?",
    barcosSinLicencia: (n: string) =>
      `Hay ${n} barcos que puedes llevar sin licencia`,

    porQue: "Por qué existe Estribor",
    tesisTitular: "Ese barco de 300 € cuesta 674 €",
    tesisUno:
      "Una lancha de 250 caballos quema unos 40 litros a la hora. Cuatro horas de navegación son 132 € de gasóleo. Súmale la limpieza, el amarre, las tasas y el IVA y la cifra anunciada se queda a menos de la mitad de lo que acabas pagando.",
    tesisDos:
      "No es letra pequeña de una plataforma concreta: es cómo funciona el sector entero. Aquí ese cálculo está hecho antes de que abras la ficha, y es el número que ordena los resultados.",
    buscarPrecioReal: "Buscar con el precio real",
    ejemploCabecera: "Un día · Quicksilver Activ 675 · Dénia",
    alquilerBarco: "Alquiler del barco",
    combustibleEstimado: (litros: number) => `Combustible (${litros} l estimados)`,
    loSumanAlPagar: "lo suman al pagar",
    limpiezaFinal: "Limpieza final",
    amarreTasas: "Amarre y tasas",
    iva: "IVA",
    loQuePagas: "Lo que pagas de verdad",
    notaFianza:
      "La fianza de 1.000 € se bloquea aparte y se devuelve al entregar el barco. No forma parte del precio.",

    dondeNavegar: "Dónde navegar",
    dondeNavegarTexto:
      "Doce zonas con su flota, sus calas y sus condiciones de navegación explicadas.",
    verTodos: "Ver todos los barcos",
    mejorValorados: "Los mejor valorados",
    mejorValoradosTexto: "Con el precio completo calculado para las fechas de hoy.",
    porTipo: "Por tipo de barco",
    porTipoTexto:
      "Cada casco tiene su consumo, su capacidad y su forma de disfrutarse.",
    noSoloBarco: "No solo un barco: un plan",
    noSoloBarcoTexto:
      "Atardecer, pesca, calas o cetáceos. Cada experiencia con su precio y sus barcos.",
    todasExperiencias: "Todas las experiencias",
    nBarcos: (n: string) => `${n} barcos`,
    nBarcosHoras: (n: string, horas: number) => `${n} barcos · unas ${horas} h`,
  },

  tarjeta: {
    comparar: "Comparar",
    compararEste: "Comparar este barco con otros",
    seQuitaraPrimero: "Se quitará el primero que elegiste",
    desglose: (base: string, extras: string) =>
      `Tarifa base ${base} + ${extras} de combustible, limpieza, amarre, tasas e IVA`,
  },

  busqueda: {
    titulo: "Alquiler de barcos en España",
    tituloGenerico: "Alquiler de barcos",
    tituloConTipo: (tipos: string) => `Alquiler de ${tipos}`,
    enDestino: (destino: string) => `en ${destino}`,
    enEspana: "en España",
    resumen: (n: string, uno: boolean) =>
      `${n} ${uno ? "barco" : "barcos"} con el precio completo calculado. Sin extras al pagar.`,
    sinResultados: "Ningún barco cumple todo eso",
    sinResultadosTexto:
      "Prueba a subir el tope de precio o a quitar alguna pieza de equipamiento: suelen ser los filtros que más estrechan la búsqueda.",
    filtrarOrdenar: "Filtrar y ordenar",
  },

  filtros: {
    titulo: "Filtros",
    quitar: (n: number) => `Quitar ${n}`,
    tipoBarco: "Tipo de barco",
    cualquiera: "Cualquiera",
    personas: "Personas a bordo",
    lasQueSean: "Las que sean",
    oMas: (n: number) => `${n} o más`,
    precioMaximo: "Precio máximo al día",
    sinTope: "Sin tope",
    hasta: (importe: string) => `Hasta ${importe}`,
    notaPrecio:
      "El tope se aplica al precio con todo incluido, no a la tarifa base.",
    condiciones: "Condiciones",
    puedoSinTitulacion: "Puedo llevarlo sin titulación",
    conPatron: "Con opción de patrón",
    reservaInmediata: "Reserva inmediata",
    equipamiento: "Equipamiento",
    equipamientoLeyenda: "Equipamiento a bordo",
    notaEquipamiento: "Se muestran los barcos que llevan todo lo marcado.",
    ordenarPor: "Ordenar por",
    aplicar: "Aplicar filtros",
    llevaAlBuscador: (destino: string) =>
      `Al filtrar pasarás al buscador, con ${destino} ya puesto.`,
    ordenes: {
      recomendados: "Recomendados",
      precioAsc: "Precio: más bajo primero",
      precioDesc: "Precio: más alto primero",
      valoracion: "Mejor valorados",
    },
  },

  paginacion: {
    etiqueta: "Paginación",
    anterior: "Anterior",
    siguiente: "Siguiente",
  },

  destino: {
    disponiblesDesde: (barcos: string, precio: string) =>
      `${barcos} disponibles desde ${precio} al día con todo incluido.`,
    tiposAqui: (destino: string) => `Tipos de barco en ${destino}`,
    tipoEn: (tipo: string, destino: string) => `${tipo} en ${destino}`,
    navegarEn: (destino: string) => `Navegar en ${destino}`,
    puertos: "Puertos de entrega",
    temporadaAlta: "Temporada alta",
    notaTemporada:
      "Fuera de esos meses la tarifa base baja entre un 25 y un 45 %.",
    sinFlota: (destino: string) =>
      `Todavía no hay flota publicada en ${destino}.`,
    verTodosDe: (n: string, destino: string) =>
      `Ver los ${n} barcos de ${destino}`,
    otrosDestinos: "Otros destinos",
    adondeSeLlega: (destino: string) => `Adónde se llega desde ${destino}`,
    barcosEn: (destino: string) => `Barcos en ${destino}`,
    otrosTiposEn: (destino: string) => `Otros barcos en ${destino}`,
    todosLosDe: (destino: string) => `Todos los barcos de ${destino}`,
    verLosN: (n: string) => `Ver los ${n} barcos`,
    guiaOtroIdioma: "La guía de navegación de este puerto está escrita en castellano.",
    verGuiaEs: "Leerla en castellano",
  },

  ocasiones: {
    titulo: "Ocasiones",
    entradilla:
      "Despedidas, cumpleaños, eventos de empresa y pedidas. Un barco entero para el grupo, con el precio repartido entre los que vais.",
    desdePorPersona: (precio: string, plazas: string) =>
      `Desde ${precio} por persona repartiendo entre ${plazas}, con patrón incluido.`,
    desdePlazas: (n: string) => `Desde ${n} plazas`,
    flotaTitulo: (n: string) => `Barcos de ${n} plazas o más`,
    flotaNota:
      "Solo salen los que caben para el grupo y pueden ir con patrón. El precio de cada ficha es el final: divídelo entre los que vayáis.",
    presupuestoTitulo: "Esto va por presupuesto",
    presupuestoTexto:
      "Con factura, seguro documentado y precio cerrado en 24 horas. No pasa por el carrito porque una empresa o una boda necesitan papeles que un botón de pagar no da.",
    otras: "Otras ocasiones",
  },

  guias: {
    titulo: "Guías",
    entradilla:
      "Lo que hay que saber antes de alquilar y antes de publicar un barco. Se revisan cada temporada; no llevan fecha de publicación porque no envejecen igual que una noticia.",
    paraNavegar: "Para quien va a alquilar",
    paraArmadores: "Para quien tiene un barco",
    revisada: (fecha: string) => `Revisada el ${fecha}`,
    minutos: (n: string) => `${n} min de lectura`,
    seguirPor: "Seguir por aquí",
    otras: "Otras guías",
    vacio: "Todavía no hay guías publicadas en este idioma.",
  },

  lugar: {
    titulo: "Destinos",
    entradilla:
      "Los sitios por los que se alquila un barco en esta costa. Cada uno con los puertos desde los que se llega y cuánto se tarda.",
    comoLlegar: (lugar: string) => `Cómo llegar a ${lugar}`,
    desde: (puerto: string) => `Desde ${puerto}`,
    minutos: (n: string) => `${n} min de navegación`,
    sinTitulo: "Alcanzable sin titulación",
    conPatron: "Requiere patrón o titulación",
    verBarcos: (puerto: string) => `Ver barcos en ${puerto}`,
    otrosLugares: "Otros destinos de la costa",
  },

  sinLicenciaMunicipio: {
    titulo: (destino: string) => `Alquiler de barcos sin licencia en ${destino}`,
    descripcion: (destino: string) =>
      `Qué puedes alquilar en ${destino} sin titulación náutica y qué barcos van con patrón. Precio final, sin sorpresas.`,
    resumen: (n: string, destino: string, precio: string) =>
      `${n} en ${destino} que puedes alquilar sin tener título náutico, desde ${precio} al día con todo incluido.`,
    bloqueTu: "Los que puedes llevar tú",
    bloqueTuNota:
      "Sin ninguna titulación, después de la explicación de seguridad en el pantalán.",
    bloquePatron: "Los que van con patrón",
    bloquePatronNota:
      "La titulación la pone el patrón. Tú eliges adónde ir y él gobierna el barco.",
    sinFlota: (destino: string) =>
      `Todavía no hay barcos sin titulación publicados en ${destino}.`,
    verTodos: (destino: string) => `Ver todos los barcos de ${destino}`,
  },

  ficha: {
    fichaTecnica: "Ficha técnica",
    eslora: "Eslora",
    capacidad: "Capacidad",
    camarotes: "Camarotes",
    aseos: "Aseos",
    potencia: "Potencia",
    anio: "Año",
    consumo: "Consumo",
    titulacion: "Titulación",
    necesaria: "Necesaria",
    noHaceFalta: "No hace falta",
    equipamiento: "Equipamiento a bordo",
    grupos: {
      navegacion: "Navegación",
      confort: "Confort",
      ocio: "Ocio",
      seguridad: "Seguridad",
    },
    quienAlquila: "Quién lo alquila",
    empresa: "Empresa de chárter",
    particular: "Propietario particular",
    superAnfitrion: "Superanfitrión",
    respondeEn: (minutos: number) => `Responde en unos ${minutos} minutos`,
    opiniones: "Opiniones",
    otrosEn: (destino: string) => `Otros barcos en ${destino}`,
    metaDescripcion: (nombre: string, puerto: string, precio: string, plazas: string) =>
      `Alquila el ${nombre} en ${puerto} desde ${precio} al día con todo incluido: combustible, limpieza, amarre y tasas. ${plazas} plazas.`,
  },

  reserva: {
    temporadaAlta: "Temporada alta",
    temporadaMedia: "Temporada media",
    temporadaBaja: "Temporada baja",
    sinExtras: "Todo incluido. No hay extras al pagar.",
    diasAlquiler: "Días de alquiler",
    unDiaMenos: "Un día menos",
    unDiaMas: "Un día más",
    minimoDias: (dias: string) => `Este barco se alquila por un mínimo de ${dias}.`,
    horasNavegacion: "Horas de navegación al día",
    notaHoras:
      "Mueve esto y verás cambiar el combustible. Un día de calas suele ser de 3 a 5 horas de motor; una travesía, el doble.",
    conPatron: "Con patrón",
    patronDia: (importe: string) => `+${importe} al día`,
    exigeTitulacion:
      "Este barco exige titulación. Si no la tienes, necesitas patrón.",
    ivaLinea: "IVA 21 %",
    total: "Total",
    reservarAhora: "Reservar ahora",
    solicitarDisponibilidad: "Solicitar disponibilidad",
    notaInmediata:
      "Confirmación inmediata, sin esperar respuesta del propietario.",
    notaPeticion: "El propietario responde normalmente en menos de una hora.",
    fianza: "Fianza",
    notaFianza:
      "Se bloquea en la tarjeta al recoger el barco y se libera al devolverlo. No se cobra ni forma parte del total.",
    conceptos: {
      alquiler: "Alquiler",
      descuento: (porcentaje: number) => `Descuento ${porcentaje} %`,
      porReservar: (dias: number) => `Por reservar ${dias} días o más`,
      combustible: "Combustible estimado",
      detalleCombustible: (litros: number, horas: number) =>
        `${litros} l · ${horas} h de navegación al día`,
      limpieza: "Limpieza final",
      pagoUnico: "Pago único",
      amarre: "Amarre y tasas",
      patron: "Patrón",
      porDias: (dias: string, importe: string) => `${dias} × ${importe}`,
    },
  },

  comparar: {
    titulo: "Comparar barcos",
    descripcion:
      "Compara hasta tres barcos lado a lado: precio con todo incluido, consumo, capacidad, equipamiento y condiciones.",
    encabezado: (n: number) => `${n} barcos, lado a lado`,
    entradilla:
      "El precio de arriba es el total con combustible, limpieza, amarre, tasas e IVA. Lo mejor de cada fila va marcado.",
    soloDiferencias: "Enseñar solo las diferencias",
    loMejor: "(lo mejor de la fila)",
    hacenFaltaDos: "Hacen falta al menos dos barcos",
    soloUno:
      "Solo hay uno seleccionado. Marca «Comparar» en otra tarjeta de resultados y vuelve aquí.",
    ninguno:
      "Marca «Comparar» en las tarjetas de los barcos que quieras enfrentar. Puedes elegir hasta tres.",
    irResultados: "Ir a los resultados",
    grupos: {
      cuesta: "Lo que cuesta",
      barco: "El barco",
      condiciones: "Condiciones",
      equipamiento: "Equipamiento",
    },
    filas: {
      precioDia: "Precio al día, todo incluido",
      tarifaBase: "Tarifa base anunciada",
      combustibleDia: "Combustible estimado al día",
      limpieza: "Limpieza final",
      amarreDia: "Amarre y tasas al día",
      patronDia: "Patrón al día",
      fianza: "Fianza",
      descuentoSemana: "Descuento a partir de 7 días",
      plazas: "Plazas",
      camarotes: "Camarotes",
      aseos: "Aseos",
      eslora: "Eslora",
      potencia: "Potencia",
      consumo: "Consumo",
      anio: "Año",
      tipo: "Tipo",
      titulacion: "Titulación",
      reserva: "Reserva",
      minimoDias: "Mínimo de días",
      valoracion: "Valoración",
      puerto: "Puerto",
      destino: "Destino",
    },
    valores: {
      noDisponible: "No disponible",
      sinDescuento: "Sin descuento",
      sinCamarotes: "Sin camarotes",
      sinAseo: "Sin aseo",
      sinMotor: "Sin motor",
      noConsume: "No consume",
      inmediata: "Inmediata",
      bajoPeticion: "Bajo petición",
      loLleva: "Lo lleva",
    },
    barra: {
      deTres: (n: number, max: number) => `${n} de ${max}`,
      paraComparar: "para comparar",
      quitar: (nombre: string) => `Quitar ${nombre} de la comparativa`,
      vaciar: "Vaciar",
      comparar: "Comparar",
      eligeOtro: "Elige otro más",
    },
  },

  faq: {
    titulo: "Preguntas frecuentes",
  },

  blog: {
    entradilla:
      "Precios con las cuentas hechas, titulaciones explicadas sin jerga y rutas contadas por tramos. Sin relleno.",
    sinArticulos: "Todavía no hay guías en este idioma",
    sinArticulosTexto:
      "Estamos traduciéndolas. Mientras tanto puedes leerlas en castellano: los precios y la normativa son los mismos.",
    verEnCastellano: "Leer las guías en castellano",
    sigueAqui: "Sigue por aquí",
    otrasGuias: "Otras guías",
  },

  pie: {
    lema:
      "El precio que ves en el buscador es el que pagas. Combustible, limpieza, amarre y tasas van dentro desde el primer resultado.",
    destinos: "Destinos",
    tipos: "Tipos de barco",
    experiencias: "Experiencias",
    marca: "Estribor",
    comoFunciona: "Cómo funciona",
    publicar: "Publicar mi barco",
    sinLicencia: "Barcos sin licencia",
    guias: "Guías de navegación",
    destinosNombre: "Destinos con nombre propio",
    blog: "Blog",
    ocasiones: "Ocasiones",
    derechos: (anio: number, marca: string) =>
      `© ${anio} ${marca}. Precios con IVA incluido.`,
  },

  error: {
    titulo: "Aquí no hay fondeadero",
    texto:
      "Esta página no existe o el barco que buscabas ya no está publicado. Prueba a buscar por destino.",
  },

  /**
   * Nombres de las categorías. Viven aquí y no en la base porque son un
   * conjunto cerrado y pequeño: meterlos en la base obligaría a una tabla de
   * traducciones para siete filas que no cambian nunca.
   */
  tiposBarco: {
    velero: "Veleros",
    catamaran: "Catamaranes",
    lancha: "Lanchas",
    neumatica: "Neumáticas",
    yate: "Yates",
    llaut: "Llaüts",
    "casa-flotante": "Casas flotantes",
  },
  descripcionTipo: {
    velero:
      "Navegación a vela para travesías de varios días. Camarotes, cocina y el menor consumo de combustible de toda la flota: el motor solo entra en puerto y en calmas.",
    catamaran:
      "Dos cascos, cero balanceo y una plataforma enorme entre ellos. Es la opción para grupos grandes y para quien se marea: la estabilidad no tiene comparación con un monocasco.",
    lancha:
      "Motora de día para moverse rápido entre calas. Llega a todas partes en poco tiempo, pero es donde más pesa el combustible: conviene mirar el consumo antes que la tarifa.",
    neumatica:
      "Semirrígida ligera, fácil de gobernar y con poco calado para entrar en calas pequeñas. Los modelos más pequeños se gobiernan sin titulación: la ficha de cada barco dice si la exige.",
    yate:
      "Motora grande con camarotes, tripulación y todos los servicios a bordo. Consumo alto y patrón obligatorio, pero es otra forma de estar en el mar.",
    llaut:
      "La embarcación tradicional del Mediterráneo: casco de madera, motor lento y poco consumo. Para pasar el día fondeado sin prisa, no hay nada mejor.",
    "casa-flotante":
      "Alojamiento amarrado en puerto, con la comodidad de un apartamento y las vistas de un barco. No navega: se duerme a bordo.",
  },


  tiposBarcoSingular: {
    velero: "Velero",
    catamaran: "Catamarán",
    lancha: "Lancha",
    neumatica: "Neumática",
    yate: "Yate",
    llaut: "Llaüt",
    "casa-flotante": "Casa flotante",
  },

  actividades: {
    atardecer: "Atardecer",
    pesca: "Pesca",
    "calas-y-snorkel": "Calas y snorkel",
    "avistamiento-cetaceos": "Avistamiento de cetáceos",
    celebraciones: "Celebraciones",
  },

  migas: {
    etiqueta: "Migas de pan",
    inicio: "Inicio",
    alquiler: "Alquiler de barcos",
    comparar: "Comparar",
    guias: "Guías",
    sinLicencia: "Sin licencia",
    comoFunciona: "Cómo funciona",
    publicar: "Publicar mi barco",
    experiencias: "Experiencias",
  },
};

export type Textos = typeof es;
