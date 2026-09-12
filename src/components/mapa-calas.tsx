"use client";

import { useRef, useState } from "react";

import { CALAS } from "@/datos/calas";

/** Carga Leaflet desde CDN solo la primera vez que el usuario pide el mapa. */
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

const COLOR = { libre: "#16a34a", boyas: "#f59e0b", prohibido: "#dc2626" } as const;
const ETIQUETA = { libre: "Fondeo libre", boyas: "Boyas", prohibido: "Fondeo prohibido" } as const;

/** Mapa interactivo de fondeaderos de la Costa Blanca (carga diferida). */
export function MapaCalas() {
  const contenedor = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function abrir() {
    if (visible) return;
    setCargando(true);
    setError("");
    try {
      const L = (await cargarLeaflet()) as {
        map: (el: HTMLElement) => {
          setView: (c: [number, number], z: number) => void;
          remove: () => void;
        };
        tileLayer: (url: string, o: object) => { addTo: (m: unknown) => void };
        circleMarker: (c: [number, number], o: object) => {
          addTo: (m: unknown) => { bindPopup: (h: string) => void };
        };
      };
      const el = contenedor.current;
      if (!el) return;

      const mapa = L.map(el).setView([38.5, -0.05], 9);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(mapa);

      for (const c of CALAS) {
        const marca = L.circleMarker([c.lat, c.lng], {
          radius: 7,
          color: COLOR[c.fondeo],
          fillColor: COLOR[c.fondeo],
          fillOpacity: 0.9,
        }).addTo(mapa);
        marca.bindPopup(`<strong>${c.nombre}</strong> · ${c.municipio}<br/>${c.nota}`);
      }

      setVisible(true);
    } catch {
      setError("No se pudo cargar el mapa.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-3 text-xs text-texto-suave">
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOR.libre }} /> {ETIQUETA.libre}</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOR.boyas }} /> {ETIQUETA.boyas}</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOR.prohibido }} /> {ETIQUETA.prohibido}</span>
      </div>

      {!visible && (
        <button
          type="button"
          onClick={() => void abrir()}
          disabled={cargando}
          className="flex w-full items-center justify-center rounded-carta border border-dashed border-borde bg-superficie px-4 py-10 text-sm font-medium text-texto-suave transition-colors hover:border-acento hover:text-acento disabled:opacity-60"
        >
          {cargando ? "Cargando mapa…" : "Cargar mapa de fondeaderos"}
        </button>
      )}

      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}

      <div
        ref={contenedor}
        className={`${visible ? "block" : "hidden"} z-0 h-[420px] w-full overflow-hidden rounded-carta border border-borde`}
      />
    </div>
  );
}
