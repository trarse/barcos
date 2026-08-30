/**
 * Auditoría SEO sobre el HTML ya construido.
 *
 * No comprueba intenciones: abre las páginas generadas y mira lo que vería un
 * rastreador. Se ejecuta después de `npm run build`.
 *
 * Para saber qué URL existen no se intenta deshacer el mapeo de reescrituras
 * —eso sería adivinar— sino que se usa el `canonical` que cada página declara
 * de sí misma. Si una página existe, ahí está su URL pública.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const RAIZ = ".next/server/app";

function ficherosHtml(dir, acc = []) {
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    if (statSync(ruta).isDirectory()) ficherosHtml(ruta, acc);
    // `_not-found` y `_global-error` son plantillas internas de Next, no
    // páginas del sitio: no tienen canonical ni deben tenerlo.
    else if (entrada.endsWith(".html") && !entrada.startsWith("_")) acc.push(ruta);
  }
  return acc;
}

/** El idioma de una URL pública: /es/... -> "es". */
const idiomaDe = (url) => (url ?? "").split("/")[1] ?? "?";

const uno = (html, re) => (html.match(re) || [])[1]?.trim();
const todos = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const sinBarra = (u) => (u.length > 1 ? u.replace(/\/+$/, "") : u);

const ficheros = ficherosHtml(RAIZ);
const paginas = ficheros.map((f) => {
  const html = readFileSync(f, "utf8");
  const canonical = uno(html, /<link rel="canonical" href="([^"]*)"/);
  return {
    fichero: "/" + relative(RAIZ, f).replace(/\\/g, "/").replace(/\.html$/, ""),
    url: canonical ? sinBarra(new URL(canonical).pathname) : null,
    html,
    noindex: /content="noindex/.test(html),
    canonical,
  };
});

const publicas = new Set(paginas.filter((p) => p.url).map((p) => p.url));

/**
 * Rutas que el servidor sirve bajo demanda y que por tanto no dejan HTML en
 * el build: el buscador y el comparador leen parámetros de consulta. Existen,
 * simplemente no están prerenderizadas, así que enlazarlas no es un fallo.
 * Se leen de `idiomas.ts` para que sigan los tres idiomas sin tocar esto.
 */
const idiomasTs = readFileSync("src/lib/idiomas.ts", "utf8");
for (const clave of ["alquiler", "comparar"]) {
  const m = idiomasTs.match(new RegExp(clave + ': \{ es: "([^"]+)", en: "([^"]+)", de: "([^"]+)" \}'));
  if (!m) continue;
  for (const [i, idioma] of ["es", "en", "de"].entries()) {
    publicas.add(`/${idioma}/${m[i + 1]}`);
  }
}

const fallos = [];
const avisos = [];
const titulos = new Map();
const descripciones = new Map();

for (const p of paginas) {
  const ref = p.url ?? p.fichero;
  const titulo = uno(p.html, /<title>([^<]*)<\/title>/);
  const desc = uno(p.html, /<meta name="description" content="([^"]*)"/);
  const h1s = todos(p.html, /<h1[^>]*>([\s\S]*?)<\/h1>/g);
  const hreflangs = todos(p.html, /<link rel="alternate" hrefLang="([^"]*)"/g);

  if (!p.canonical) fallos.push(`${ref}: sin canonical`);
  else if (p.canonical.includes("localhost"))
    avisos.push(`canonical a localhost: falta NEXT_PUBLIC_URL en producción`);

  if (!titulo) fallos.push(`${ref}: sin <title>`);
  else {
    if (titulo.length > 68) avisos.push(`${ref}: title de ${titulo.length} caracteres`);
    if (!p.noindex) {
      const clave = `${idiomaDe(p.url)}|${titulo}`;
      if (!titulos.has(clave)) titulos.set(clave, []);
      titulos.get(clave).push(ref);
    }
  }

  if (!desc) fallos.push(`${ref}: sin meta description`);
  else if (!p.noindex) {
    const claveD = `${idiomaDe(p.url)}|${desc}`;
    if (!descripciones.has(claveD)) descripciones.set(claveD, []);
    descripciones.get(claveD).push(ref);
  }

  if (h1s.length === 0) fallos.push(`${ref}: sin H1`);
  if (h1s.length > 1) fallos.push(`${ref}: ${h1s.length} etiquetas H1`);

  if (!p.noindex && hreflangs.length === 0)
    avisos.push(`${ref}: indexable y sin hreflang`);

  const imgsSinAlt = todos(p.html, /<img\s([^>]*)>/g).filter((a) => !/\balt=/.test(a));
  if (imgsSinAlt.length) fallos.push(`${ref}: ${imgsSinAlt.length} <img> sin alt`);

  for (const enlace of new Set(todos(p.html, /href="(\/(?:es|en|de)(?:\/[^"#?]*)?)"/g))) {
    if (!publicas.has(sinBarra(enlace))) {
      fallos.push(`enlace roto: ${sinBarra(enlace)} — enlazado desde ${ref}`);
    }
  }
}

for (const [clave, refs] of titulos) {
  if (refs.length > 1)
    fallos.push(
      `title repetido en ${refs.length} páginas del mismo idioma: "${clave.slice(0, 60)}" -> ${refs.slice(0, 2).join(", ")}`,
    );
}
for (const refs of descripciones.values()) {
  if (refs.length > 1)
    fallos.push(
      `description repetida en ${refs.length} páginas del mismo idioma: ${refs.slice(0, 2).join(", ")}`,
    );
}

const unicos = (xs) => [...new Set(xs)];
const f = unicos(fallos);
const a = unicos(avisos);

console.log(
  `Páginas: ${paginas.length}  ·  indexables: ${paginas.filter((p) => !p.noindex).length}` +
    `  ·  URL públicas distintas: ${publicas.size}\n`,
);

if (f.length) {
  console.log(`FALLOS (${f.length}):`);
  for (const x of f.slice(0, 20)) console.log("  x " + x);
  if (f.length > 20) console.log(`  ... y ${f.length - 20} mas`);
  console.log();
} else {
  console.log("Sin fallos.\n");
}

if (a.length) {
  console.log(`AVISOS (${a.length}):`);
  for (const x of a.slice(0, 10)) console.log("  . " + x);
  if (a.length > 10) console.log(`  ... y ${a.length - 10} mas`);
}

process.exitCode = f.length ? 1 : 0;
