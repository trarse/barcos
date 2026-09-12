export type Cala = {
  nombre: string;
  municipio: string;
  lat: number;
  lng: number;
  /** Restricción de fondeo o aviso náutico resumido. */
  nota: string;
  /** "libre" | "boyas" | "prohibido" según el tipo de fondeo. */
  fondeo: "libre" | "boyas" | "prohibido";
};

/**
 * Fondeaderos de la Costa Blanca (Alicante → Dénia). Conjunto de arranque para
 * el mapa: coordenadas aproximadas y nota orientativa. La normativa de Posidonia
 * y las zonas de baño se revisan cada temporada; el dato fino lo confirma el
 * patrón o la autoridad portuaria antes de largar el ancla.
 */
export const CALAS: Cala[] = [
  { nombre: "Isla de Tabarca", municipio: "Alicante", lat: 38.166, lng: -0.478, nota: "Reserva marina: fondeo restringido, mejor en boyas autorizadas.", fondeo: "boyas" },
  { nombre: "Cala Granadella", municipio: "Xàbia", lat: 38.733, lng: 0.201, nota: "Arenal con Posidonia en el contorno; fondeo libre solo en zona de arena.", fondeo: "libre" },
  { nombre: "Cala Moraig", municipio: "Benitatxell", lat: 38.739, lng: 0.152, nota: "Cova dels Arcs accesible a nado. Fondeo en arena, ojo al viento de levante.", fondeo: "libre" },
  { nombre: "Cova Tallada", municipio: "Dénia", lat: 38.802, lng: 0.165, nota: "Reserva del Montgó: solo a nado desde Les Rotes; no fondear dentro.", fondeo: "prohibido" },
  { nombre: "Cala del Portitxol", municipio: "Xàbia", lat: 38.755, lng: 0.237, nota: "Cala de cantos; tenedero irregular, precaución con el viento.", fondeo: "libre" },
  { nombre: "Cala Ambolo", municipio: "Xàbia", lat: 38.751, lng: 0.215, nota: "Zona naturista y acantilados; fondeo en arena.", fondeo: "libre" },
  { nombre: "Cala Tangó", municipio: "Xàbia", lat: 38.761, lng: 0.182, nota: "Pequeña y muy concurrida en agosto; entrar temprano.", fondeo: "libre" },
  { nombre: "Cala de la Fustera", municipio: "Benissa", lat: 38.688, lng: 0.105, nota: "Fondeo sobre arena; Posidonia en los laterales.", fondeo: "libre" },
  { nombre: "Cala Pinets", municipio: "Benissa", lat: 38.685, lng: 0.098, nota: "Aguas tranquilas; tenedero de arena.", fondeo: "libre" },
  { nombre: "Cala Llebeig", municipio: "Benissa", lat: 38.684, lng: 0.07, nota: "Solo accesible por mar o senda; fondeo libre y solitario.", fondeo: "libre" },
  { nombre: "Playa del Portet", municipio: "Moraira", lat: 38.677, lng: 0.08, nota: "Ensenada resguardada del levante; fondeo en arena.", fondeo: "libre" },
  { nombre: "Peñón de Ifach", municipio: "Calp", lat: 38.634, lng: 0.076, nota: "Parque natural: no fondear sobre la pradera de Posidonia.", fondeo: "prohibido" },
  { nombre: "Cala de la Manzanera", municipio: "Calp", lat: 38.64, lng: 0.069, nota: "Cala pequeña; fondeo libre con precaución por las rocas.", fondeo: "libre" },
  { nombre: "Cala del Racó", municipio: "Calp", lat: 38.645, lng: 0.06, nota: "Resguardada; arena y algunas boyas.", fondeo: "boyas" },
  { nombre: "Cala Les Urques", municipio: "Calp", lat: 38.664, lng: 0.052, nota: "Fondeo libre; viento de poniente puede incomodar.", fondeo: "libre" },
  { nombre: "Isla de Benidorm", municipio: "Benidorm", lat: 38.503, lng: -0.14, nota: "Fondeo alrededor de la isla; respetar la reserva de aves.", fondeo: "libre" },
  { nombre: "Cala de Finestrat", municipio: "Finestrat", lat: 38.53, lng: -0.162, nota: "Arenal abierto; fondeo en arena.", fondeo: "libre" },
  { nombre: "Cala Almadrava", municipio: "Villajoyosa", lat: 38.511, lng: -0.229, nota: "Cala de cantos; tenedero regular.", fondeo: "libre" },
  { nombre: "Racó del Conill", municipio: "Villajoyosa", lat: 38.53, lng: -0.21, nota: "Fondeo libre; acceso por urbanización.", fondeo: "libre" },
  { nombre: "Cabo de las Huertas", municipio: "Alicante", lat: 38.353, lng: -0.404, nota: "Calas de roca; fondeo con precaución y solo con mar en calma.", fondeo: "libre" },
];
