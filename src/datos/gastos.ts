/**
 * Categorías y conceptos de gasto de una embarcación de alquiler.
 * Son los costes reales de explotación de un barco náutico, agrupados para
 * que el armador sepa dónde gana y dónde pierde.
 */

export const CATEGORIAS_GASTO = [
  "Amarre y puerto",
  "Tasas y administración",
  "Seguros y asistencia",
  "Inspecciones y certificados",
  "Varadero e izadas",
  "Casco y obra viva",
  "Motor y propulsión",
  "Electricidad y electrónica",
  "Seguridad y salvamento",
  "Combustible",
  "Limpieza y consumibles",
  "Equipamiento interior y confort",
  "Navegación y comunicaciones",
  "Velero (aparejo y velas)",
  "Transporte y remolque",
  "Gobierno y fontanería",
  "Formación y otros",
] as const;

export const CONCEPTOS_GASTO: Record<string, string[]> = {
  "Amarre y puerto": [
    "Alquiler o concesión de plaza de amarre en puerto base",
    "Tarifas de amarre como transeúnte en puertos de destino",
    "Suministros en el pantalán (agua y electricidad)",
    "Alquiler de espacio en varadero o marina seca",
    "Tasa por uso de rampas de botadura (slipways)",
  ],
  "Tasas y administración": [
    "Tasa portuaria T5 (embarcaciones deportivas y de recreo)",
    "Tasa de señalización marítima (T0)",
    "Tasas de Capitanía Marítima (expedición, renovación de certificados, cambios de registro)",
    "Honorarios de gestoría naval (cambios de bandera, liquidación de impuestos, matriculación inicial)",
    "Tasas y trámites de la Licencia de Estación de Barco (LEB) y asignación del MMSI",
  ],
  "Seguros y asistencia": [
    "Póliza de seguro (responsabilidad civil y/o daños propios)",
    "Cuota de asistencia en la mar o remolque (Sea Tow) para averías no cubiertas",
  ],
  "Inspecciones y certificados": [
    "Inspección Técnica de Buques (ITB) periódica obligatoria",
    "Revisión en estación homologada de balsa salvavidas y radiobaliza (EPIRB)",
    "Reposición de material de seguridad por caducidad (bengalas, señales, botiquín, extintores)",
  ],
  "Varadero e izadas": [
    "Maniobra con grúa o travelift para izada y botadura",
    "Limpieza con agua a presión y aplicación de pintura patente (antifouling)",
    "Sustitución periódica de ánodos de sacrificio",
    "Contratación de buzo (obra viva, limpieza de hélice, recuperación de objetos)",
  ],
  "Casco y obra viva": [
    "Tratamiento y reparación de ósmosis en cascos de fibra de vidrio",
    "Reparaciones de chapa, pintura o gelcoat por impactos y roces",
    "Tratamiento preventivo y embellecimiento de maderas exteriores (aceite de teca, barniz)",
    "Sustitución de metacrilatos, mosquiteras y juntas de estanqueidad",
  ],
  "Motor y propulsión": [
    "Mantenimiento preventivo anual del motor (aceite, filtros, correas, rodetes)",
    "Reparación de averías mecánicas del grupo propulsor o transmisión",
    "Alineación del eje y sustitución de bocina o prensaestopas",
    "Mantenimiento de hélice de proa (bow thruster), ánodos y escobillas",
    "Mantenimiento del generador eléctrico auxiliar",
  ],
  "Electricidad y electrónica": [
    "Reparación de la instalación eléctrica (cuadros, cableado, relés, inversores)",
    "Actualización o reparación de electrónica de navegación (plotter, sonda, radar, VHF)",
    "Sustitución de los bancos de baterías de servicio y arranque",
  ],
  "Seguridad y salvamento": [
    "Renovación de cabuyería desgastada (escotas, drizas, cabos de amarre)",
    "Mantenimiento o reparación del molinete eléctrico de ancla y línea de fondeo",
    "Balizas de seguimiento satelital personal (inReach o Spot)",
  ],
  Combustible: [
    "Consumo de combustible (diésel o gasolina) durante la navegación",
    "Limpieza profesional de tanques de combustible (sedimentos, moco del diésel)",
    "Aditivos estabilizadores y biocidas para el combustible en inactividad",
  ],
  "Limpieza y consumibles": [
    "Servicios externalizados de marinería (limpieza, baldeo, ventilación)",
    "Consumibles de limpieza náuticos (jabones biodegradables, ceras, pulimentos)",
    "Renovación de vajilla, cristalería irrompible y menaje de cocina",
  ],
  "Equipamiento interior y confort": [
    "Recarga del gas de cocina (Campingaz o similar)",
    "Mantenimiento de aire acondicionado o calefacción",
    "Tratamiento de choque y pastillas potabilizadoras de depósitos de agua",
    "Mantenimiento de la máquina potabilizadora (membranas, filtros, aceites)",
    "Frío marino (recarga de gas, reparación del compresor del frigorífico)",
    "Tapicería náutica, toldos bimini, capotas o lonas de fondeo",
    "Ténder y su motor fueraborda",
    "Equipos de entretenimiento (sonido marinizado, altavoces, TV 12V)",
    "Pescantes, grúas auxiliares, pasarelas o plataformas de baño",
  ],
  "Navegación y comunicaciones": [
    "Cartografía electrónica y apps meteorológicas (Navionics, PredictWind)",
    "Internet satelital o planes de datos marítimos (Starlink, Iridium)",
  ],
  "Velero (aparejo y velas)": [
    "Inspección y mantenimiento del aparejo y jarcia firme (tensores, obenques, estays)",
    "Reparación de velas por desgarros, repaso de costuras o sustitución de paños",
  ],
  "Transporte y remolque": [
    "Mantenimiento del remolque (rodamientos, cabrestante, frenos, luces)",
    "Permisos especiales o escoltas para transporte por carretera",
  ],
  "Gobierno y fontanería": [
    "Componentes del sistema de gobierno (cables de dirección, retenes hidráulicos, casquillos del timón)",
    "Fontanería a bordo (bombas de achique, inodoros marinos, grifos de fondo)",
    "Sistema de aguas negras (filtros antiolor, productos, válvulas de tres vías)",
    "Defensas de atraque y sus fundas de protección",
  ],
  "Formación y otros": [
    "Título náutico del patrón (tasas de examen, psicotécnico, prácticas homologadas)",
    "Otros gastos no clasificados",
  ],
};

/** Tipos de vencimiento de plazos del armador, con su etiqueta visible. */
export const TIPOS_VENCIMIENTO: { clave: string; etiqueta: string }[] = [
  { clave: "seguro", etiqueta: "Seguro" },
  { clave: "motor", etiqueta: "Mantenimiento de motor" },
  { clave: "itb", etiqueta: "Inspección (ITB)" },
  { clave: "bengalas", etiqueta: "Bengalas" },
  { clave: "salvamento", etiqueta: "Material de salvamento" },
  { clave: "despacho", etiqueta: "Despacho" },
  { clave: "otro", etiqueta: "Otro" },
];

export const ETIQUETA_VENCIMIENTO: Record<string, string> = Object.fromEntries(
  TIPOS_VENCIMIENTO.map((t) => [t.clave, t.etiqueta]),
);
