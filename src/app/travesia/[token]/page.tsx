"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Pos = { lat: number; lng: number };

function cargarLeaflet(): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const w = window as unknown as { L?: unknown };
    if (w.L) return resolve(w.L);
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    js.onload = () => resolve(w.L);
    js.onerror = () => reject(new Error("leaflet"));
    document.head.appendChild(js);
  });
}

/** Seguimiento público de una travesía: posición en vivo vía GPS. */
export default function SeguimientoTravesia() {
  const params = useParams<{ token: string }>();
  const token = params?.token ?? "";

  const [barco, setBarco] = useState("");
  const [activo, setActivo] = useState(true);
  const [posiciones, setPosiciones] = useState<Pos[]>([]);
  const [error, setError] = useState("");
  const contenedor = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<unknown>(null);

  useEffect(() => {
    if (!token) return;
    let cancelado = false;

    async function refrescar() {
      try {
        const r = await fetch(`/api/travesia?token=${encodeURIComponent(token)}`);
        const datos = await r.json();
        if (cancelado) return;
        if (!datos?.ok) {
          setError("Travesía no encontrada.");
          return;
        }
        setBarco(datos.travesia.barcoNombre);
        setActivo(datos.travesia.activo);
        setPosiciones(datos.travesia.posiciones ?? []);
      } catch {
        if (!cancelado) setError("No se pudo conectar.");
      }
    }

    void refrescar();
    const intervalo = setInterval(() => void refrescar(), 10000);
    return () => {
      cancelado = true;
      clearInterval(intervalo);
    };
  }, [token]);

  useEffect(() => {
    if (posiciones.length === 0 || !contenedor.current) return;
    void (async () => {
      try {
        const L = (await cargarLeaflet()) as {
          map: (el: HTMLElement) => {
            setView: (c: [number, number], z: number) => void;
            fitBounds: (b: [number, number][]) => void;
            remove: () => void;
          };
          tileLayer: (u: string, o: object) => { addTo: (m: unknown) => void };
          polyline: (pts: [number, number][], o: object) => { addTo: (m: unknown) => void };
          circleMarker: (c: [number, number], o: object) => { addTo: (m: unknown) => void };
        };
        const el = contenedor.current;
        if (!el) return;

        if (mapaRef.current) {
          (mapaRef.current as { remove: () => void }).remove();
        }

        const mapa = L.map(el);
        mapa.setView([posiciones[0].lat, posiciones[0].lng], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(mapa);

        const pts = posiciones.map((p) => [p.lat, p.lng] as [number, number]);
        L.polyline(pts, { color: "#2563eb", weight: 4 }).addTo(mapa);
        L.circleMarker(pts[pts.length - 1], { radius: 8, color: "#dc2626", fillColor: "#dc2626", fillOpacity: 1 }).addTo(mapa);
        if (pts.length > 1) mapa.fitBounds(pts);

        mapaRef.current = mapa;
      } catch {
        // Leaflet no cargó; no rompemos la página.
      }
    })();
  }, [posiciones]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-2xl font-semibold text-texto">
        {barco ? `Travesía de ${barco}` : "Seguimiento de travesía"}
      </h1>
      <p className={`mt-1 text-sm font-medium ${activo ? "text-emerald-600" : "text-texto-suave"}`}>
        {activo ? "Navegando ahora mismo" : "Travesía finalizada"}
      </p>

      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

      <div ref={contenedor} className="mt-4 h-[420px] w-full overflow-hidden rounded-carta border border-borde" />

      <p className="mt-2 text-xs text-texto-suave">Posición compartida desde el móvil de la embarcación. Se actualiza cada pocos segundos.</p>
    </main>
  );
}
