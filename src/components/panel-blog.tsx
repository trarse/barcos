"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Gestión del blog desde el panel. Recibe la clave de administración ya
 * validada por el componente padre.
 *
 * Los enlaces relacionados se editan en un formato de una línea por enlace:
 *   texto | tipo:valor
 * Ejemplos:
 *   Ir a Tabarca en barco | lugar:tabarca
 *   Barcos con patrón | sinLicencia
 *   Alquiler en Dénia | destino:denia
 */

type Articulo = {
  id: string;
  idioma: string;
  slug: string;
  titulo: string;
  entradilla: string;
  fecha: string;
  minutos: number;
  categoria: string;
  cuerpo: string;
  relacionados: { texto: string; pagina: unknown }[];
  publicado: boolean;
  publicaDesde: string | null;
};

const CATEGORIAS = ["Precios", "Normativa", "Rutas", "Medio ambiente"];
const IDIOMAS = ["es", "en", "de"];

function hoy(): string {
  return new Date().toISOString().slice(0, 10);
}

function paginaAString(pagina: Record<string, unknown>): string {
  const valor = (pagina as { [k: string]: unknown });
  switch (valor.tipo) {
    case "lugar": return `lugar:${valor.slug}`;
    case "destino": return `destino:${valor.destino}`;
    case "tipoBarco": return `tipoBarco:${valor.tipoBarco}`;
    case "sinLicencia": return "sinLicencia";
    case "sinLicenciaDestino": return `sinLicenciaDestino:${valor.destino}`;
    case "busqueda": return "busqueda";
    case "guia": return `guia:${valor.slug}`;
    case "articulo": return `articulo:${valor.slug}`;
    case "ocasion": return `ocasion:${valor.slug}`;
    case "experiencia": return `experiencia:${valor.slug}`;
    default: return JSON.stringify(valor);
  }
}

function stringAPagina(s: string): Record<string, unknown> | null {
  const idx = s.indexOf(":");
  const tipo = (idx >= 0 ? s.slice(0, idx) : s).trim();
  const valor = (idx >= 0 ? s.slice(idx + 1) : "").trim();
  switch (tipo) {
    case "lugar": return { tipo: "lugar", slug: valor };
    case "destino": return { tipo: "destino", destino: valor };
    case "tipoBarco": return { tipo: "tipoBarco", tipoBarco: valor };
    case "sinLicencia": return { tipo: "sinLicencia" };
    case "sinLicenciaDestino": return { tipo: "sinLicenciaDestino", destino: valor };
    case "busqueda": return { tipo: "busqueda" };
    case "guia": return { tipo: "guia", slug: valor };
    case "articulo": return { tipo: "articulo", slug: valor };
    case "ocasion": return { tipo: "ocasion", slug: valor };
    case "experiencia": return { tipo: "experiencia", slug: valor };
    default: return null;
  }
}

function relacionadosATexto(rels: { texto: string; pagina: unknown }[]): string {
  return rels
    .map((r) => `${r.texto} | ${paginaAString(r.pagina as Record<string, unknown>)}`)
    .join("\n");
}

function textoARelacionados(texto: string): { texto: string; pagina: unknown }[] {
  const resultado: { texto: string; pagina: unknown }[] = [];
  for (const linea of texto.split("\n")) {
    const limpia = linea.trim();
    if (!limpia) continue;
    const barra = limpia.indexOf("|");
    const enlace = (barra >= 0 ? limpia.slice(0, barra) : limpia).trim();
    const pagina = stringAPagina(barra >= 0 ? limpia.slice(barra + 1) : "");
    if (pagina) resultado.push({ texto: enlace, pagina });
  }
  return resultado;
}

type Formulario = {
  idioma: string;
  slug: string;
  titulo: string;
  entradilla: string;
  fecha: string;
  minutos: number;
  categoria: string;
  cuerpo: string;
  relacionados: string;
  publicado: boolean;
  publicaDesde: string;
};

function formularioVacio(): Formulario {
  return {
    idioma: "es",
    slug: "",
    titulo: "",
    entradilla: "",
    fecha: hoy(),
    minutos: 5,
    categoria: "Precios",
    cuerpo: "",
    relacionados: "",
    publicado: true,
    publicaDesde: "",
  };
}

export function PanelBlog() {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nuevo, setNuevo] = useState(false);
  const [formulario, setFormulario] = useState<Formulario>(formularioVacio());
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/articulos");
      if (!res.ok) throw new Error("auth");
      const data = await res.json();
      setArticulos(data.articulos ?? []);
    } catch {
      setMensaje("No se pudo cargar el blog.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // Carga inicial en el montaje (fetch asíncrono).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  function abrirEdicion(a: Articulo) {
    setEditandoId(a.id);
    setNuevo(false);
    setFormulario({
      idioma: a.idioma,
      slug: a.slug,
      titulo: a.titulo,
      entradilla: a.entradilla,
      fecha: a.fecha,
      minutos: a.minutos,
      categoria: a.categoria,
      cuerpo: a.cuerpo,
      relacionados: relacionadosATexto(a.relacionados),
      publicado: a.publicado,
      publicaDesde: a.publicaDesde ?? "",
    });
    setMensaje("");
  }

  function abrirNuevo() {
    setEditandoId(null);
    setNuevo(true);
    setFormulario(formularioVacio());
    setMensaje("");
  }

  function cerrarFormulario() {
    setEditandoId(null);
    setNuevo(false);
  }

  async function guardar() {
    const cuerpo = {
      idioma: formulario.idioma,
      slug: formulario.slug,
      titulo: formulario.titulo,
      entradilla: formulario.entradilla,
      fecha: formulario.fecha,
      minutos: Number(formulario.minutos),
      categoria: formulario.categoria,
      cuerpo: formulario.cuerpo,
      relacionados: textoARelacionados(formulario.relacionados),
      publicado: formulario.publicado,
      publicaDesde: formulario.publicaDesde || null,
    };
    const metodo = editandoId ? "PATCH" : "POST";
    const res = await fetch("/api/articulos", {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editandoId ? { id: editandoId, ...cuerpo } : cuerpo),
    });
    if (res.ok) {
      setMensaje("Guardado.");
      cerrarFormulario();
      void cargar();
    } else {
      setMensaje("No se pudo guardar (¿slug duplicado en ese idioma?).");
    }
  }

  async function alternarPublicado(a: Articulo) {
    const res = await fetch("/api/articulos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: a.id,
        idioma: a.idioma,
        slug: a.slug,
        titulo: a.titulo,
        entradilla: a.entradilla,
        fecha: a.fecha,
        minutos: a.minutos,
        categoria: a.categoria,
        cuerpo: a.cuerpo,
        relacionados: a.relacionados,
        publicado: !a.publicado,
        publicaDesde: a.publicaDesde,
      }),
    });
    if (res.ok) void cargar();
  }

  async function borrar(a: Articulo) {
    if (!confirm(`¿Borrar "${a.titulo}" (${a.idioma})?`)) return;
    const res = await fetch("/api/articulos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: a.id }),
    });
    if (res.ok) {
      setMensaje("Borrado.");
      void cargar();
    }
  }

  if (nuevo || editandoId) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-texto">
            {editandoId ? "Editar artículo" : "Nuevo artículo"}
          </h2>
          <button onClick={cerrarFormulario} className="text-sm text-texto-suave underline">
            Volver
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Idioma</span>
            <select
              value={formulario.idioma}
              onChange={(e) => setFormulario({ ...formulario, idioma: e.target.value })}
              className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
            >
              {IDIOMAS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Categoría</span>
            <select
              value={formulario.categoria}
              onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })}
              className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
            >
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Slug (URL)</span>
            <input
              value={formulario.slug}
              onChange={(e) => setFormulario({ ...formulario, slug: e.target.value })}
              placeholder="ej: que-hacer-si-aparecen-delfines"
              className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Título (title)</span>
            <input
              value={formulario.titulo}
              onChange={(e) => setFormulario({ ...formulario, titulo: e.target.value })}
              className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
            />
          </label>

          <div className="grid grid-cols-3 gap-3 sm:col-span-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Fecha</span>
              <input
                type="date"
                value={formulario.fecha}
                onChange={(e) => setFormulario({ ...formulario, fecha: e.target.value })}
                className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Minutos</span>
              <input
                type="number"
                min={1}
                max={60}
                value={formulario.minutos}
                onChange={(e) => setFormulario({ ...formulario, minutos: Number(e.target.value) })}
                className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Publicar desde (opcional)</span>
              <input
                type="date"
                value={formulario.publicaDesde}
                onChange={(e) => setFormulario({ ...formulario, publicaDesde: e.target.value })}
                className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
              />
            </label>
          </div>

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Entradilla (meta description)</span>
            <textarea
              value={formulario.entradilla}
              onChange={(e) => setFormulario({ ...formulario, entradilla: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Cuerpo (Markdown)</span>
            <textarea
              value={formulario.cuerpo}
              onChange={(e) => setFormulario({ ...formulario, cuerpo: e.target.value })}
              rows={16}
              className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto font-mono"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
              Enlaces relacionados (uno por línea: texto | tipo:valor)
            </span>
            <textarea
              value={formulario.relacionados}
              onChange={(e) => setFormulario({ ...formulario, relacionados: e.target.value })}
              rows={4}
              placeholder={"Ir a Tabarca en barco | lugar:tabarca\nBarcos con patrón | sinLicencia"}
              className="mt-1 w-full rounded-md border border-borde bg-superficie px-3 py-2 text-sm text-texto font-mono"
            />
            <span className="mt-1 block text-xs text-texto-tenue">
              tipos: lugar, destino, tipoBarco, sinLicencia, sinLicenciaDestino, busqueda, guia, articulo, ocasion, experiencia
            </span>
          </label>

          <label className="flex items-center gap-2 sm:col-span-2">
            <input
              type="checkbox"
              checked={formulario.publicado}
              onChange={(e) => setFormulario({ ...formulario, publicado: e.target.checked })}
              className="h-4 w-4 accent-[var(--acento)]"
            />
            <span className="text-sm font-medium text-texto">Publicado</span>
          </label>
        </div>

        {mensaje && <p className="text-sm text-rose-600">{mensaje}</p>}

        <div className="flex gap-2">
          <button
            onClick={() => void guardar()}
            className="rounded-md bg-marca px-5 py-2.5 font-semibold text-fondo"
          >
            Guardar
          </button>
          <button
            onClick={cerrarFormulario}
            className="rounded-md border border-borde px-5 py-2.5 text-texto-suave"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-texto">Artículos</h2>
        <button
          onClick={abrirNuevo}
          className="rounded-md bg-marca px-4 py-2 font-semibold text-fondo"
        >
          Nuevo artículo
        </button>
      </div>

      {mensaje && <p className="mt-3 text-sm text-texto-suave">{mensaje}</p>}

      {cargando ? (
        <p className="mt-6 text-sm text-texto-suave">Cargando…</p>
      ) : (
        <ul className="mt-5 space-y-2">
          {articulos.map((a) => (
            <li
              key={a.id}
              className="rounded-carta border border-borde bg-superficie p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-superficie-alt px-2 py-0.5 text-xs font-semibold uppercase text-texto-suave">
                    {a.idioma}
                  </span>
                  <span className="font-display text-lg font-semibold text-texto">{a.titulo}</span>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${a.publicado ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
                  {a.publicado ? "Publicado" : "Oculto"}
                </span>
              </div>

              <p className="mt-1 text-sm text-texto-suave">
                /{a.slug} · {a.categoria} · {a.fecha}
                {a.publicaDesde ? ` · programado ${a.publicaDesde}` : ""}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => abrirEdicion(a)}
                  className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto"
                >
                  Editar
                </button>
                <button
                  onClick={() => void alternarPublicado(a)}
                  className="rounded-md border border-borde px-3 py-1.5 text-sm text-texto-suave"
                >
                  {a.publicado ? "Ocultar" : "Publicar"}
                </button>
                <button
                  onClick={() => void borrar(a)}
                  className="rounded-md border border-borde px-3 py-1.5 text-sm text-rose-600"
                >
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
