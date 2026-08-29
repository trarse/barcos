# Estribor

Plataforma de alquiler de barcos en España. La tesis del producto es una sola:
**el precio que se ve en el buscador es el que se paga.**

El resto del sector anuncia la tarifa base del casco y suma combustible,
limpieza, amarre, tasas e IVA en el último paso del pago. Para una lancha de
250 caballos eso significa anunciar 255 € y cobrar 824 €. Aquí ese cálculo está
hecho antes de pintar la primera tarjeta de resultados, y es el número que
ordena la búsqueda.

## Arrancar

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npx prisma generate && npx prisma db push && npm run db:seed
```

```bash
npm run dev
```

En desarrollo la base es **SQLite en un fichero**: no hay que instalar ni
levantar nada. La semilla deja 12 destinos, 33 puertos y 76 barcos.

## Verificar

```bash
npm test && npx tsc --noEmit && npx eslint . && npm run build
```

Deben salir 107 tests en verde, 0 errores de tipos, 0 avisos de lint y 159
páginas generadas.

## Cómo está montado

### El motor de precios

`src/lib/precio.ts` es el corazón. Función pura, importes en **céntimos
enteros** —nunca coma flotante para dinero— y una sola redondeo por concepto.
Devuelve el desglose línea a línea, no solo el total, porque la transparencia
solo vale si el usuario puede ver de dónde sale cada euro.

La misma función se usa en el servidor (para ordenar y filtrar resultados) y en
el cliente (`src/components/reserva.tsx`, el panel interactivo de la ficha).
Así el precio de la tarjeta y el del desglose no pueden desviarse.

Conceptos que entran en el total: alquiler ajustado por temporada, descuento
por estancia larga, combustible estimado según el consumo real del casco,
limpieza, amarre, tasas, patrón opcional e IVA. La fianza va siempre fuera:
se bloquea, no se cobra.

### Arquitectura de rutas y SEO

| Ruta | Render | Qué es |
|---|---|---|
| `/` | SSG · ISR 1 h | Portada con buscador |
| `/alquiler-barcos` | Dinámica | Buscador con filtros |
| `/alquiler-barcos/{destino}` | SSG · ISR 1 h | Landing de destino (12) |
| `/alquiler-barcos/{destino}/{tipo}` | SSG · ISR 1 h | Cola larga (44) |
| `/alquiler-{tipo}` | SSG · ISR 1 h | Landing por tipo (7) |
| `/barco/{slug}` | SSG · ISR 1 h | Ficha del barco (76) |
| `/experiencias/{actividad}` | SSG · ISR 1 h | Experiencia como producto (5) |
| `/blog/{slug}` | SSG | Guías (4) |
| `/comparar` | Dinámica · `noindex` | Comparativa lado a lado |

**Las landings no leen `searchParams`.** Hacerlo las convertiría en páginas
dinámicas y perderían el prerenderizado, que es justo lo que necesitan las
páginas que tienen que posicionar. Filtrar lleva al buscador, que sí es
dinámico por naturaleza.

`/alquiler-{tipo}` vive en `/tipos/[tipo]` y se sirve en la URL bonita mediante
la reescritura `afterFiles` de `next.config.ts`. El canonical apunta siempre a
la forma con la palabra clave delante.

Todas las páginas llevan JSON-LD: `Organization` y `WebSite` en el layout, más
`BreadcrumbList`, `FAQPage`, `ItemList`, `Product` con `AggregateRating` y
`Article` según la página. El precio declarado en `Product` es el total con
todo incluido, no la tarifa base: declarar uno y cobrar otro es lo que acaba en
una penalización manual.

`robots.ts` no bloquea a ningún rastreador —tampoco a los de IA— pero sí cierra
las búsquedas con filtros, que son miles de combinaciones del mismo contenido.

### El comparador

Ninguna plataforma del sector deja poner dos barcos uno al lado del otro. La
selección vive en la URL (`/comparar?barcos=a,b,c`), así que una comparativa se
manda por WhatsApp y se abre igual al otro lado.

`src/lib/comparador.ts` es puro: resuelve qué barco gana cada fila y cruza el
equipamiento marcando lo que diferencia a unos de otros. Al llegar al tope de
tres, pulsar un cuarto desplaza el más antiguo en vez de ignorar la pulsación.

El estado del cliente usa `useSyncExternalStore` sobre `localStorage`, que es
la API de React para esto. Leer el almacenamiento en un efecto y copiarlo al
estado provoca render en cascada y desajuste de hidratación.

El filtro «solo diferencias» es **CSS puro**: una casilla y un selector
hermano, sin una línea de JavaScript.

### Identidad visual

Carta náutica: cian de las sondas, buff de la tierra, magenta de las balizas y
verde de estribor. Fraunces para display, Archivo para texto e interfaz.

Los colores van por **tokens semánticos** (`--fondo`, `--texto`, `--acento`…)
definidos en `globals.css` y expuestos como utilidades de Tailwind. Al ir por
variable, un color no puede quedarse sin su equivalente en tema oscuro. El tema
responde al sistema y, por encima, a `data-tema` en `<html>`.

Las ilustraciones de la flota son SVG paramétrico (`src/components/foto-barco.tsx`),
no fotografía de banco: pesan unos kilobytes, no dependen de ningún dominio
externo y se adaptan solas al tema. Cada tipo de casco tiene su silueta.

### Estructura

```
prisma/
  schema.prisma      Esquema. Sin tipos nativos de Postgres: migrar es
                     cambiar el provider y el adaptador.
  datos/             Semilla: destinos, catálogo y flota.
  seed.ts            Determinista: dos ejecuciones dan la misma base.
src/
  lib/
    precio.ts        Motor de precios (puro, con tests)
    filtros.ts       Lectura y escritura de la query (puro, con tests)
    formato.ts       Formateo es-ES (puro, con tests)
    seo.ts           Constructores de JSON-LD y rutas canónicas
    consultas.ts     Acceso a datos, con el precio ya calculado
    db.ts            Cliente de Prisma vía driver adapter
  components/        Interfaz
  datos/blog.ts      Artículos
tests/               82 tests sobre la lógica pura
```

## Convenciones

- Código y comentarios en **castellano**.
- La lógica que se puede extraer a función pura se extrae a `src/lib/` y se
  prueba en `tests/`.
- Los colores van por token semántico, nunca literales.
- El dinero se guarda y se opera en **céntimos enteros**.

## Pasar a producción

1. Cambiar el provider del datasource a `postgresql` en `prisma/schema.prisma`.
2. Sustituir `@prisma/adapter-better-sqlite3` por `@prisma/adapter-pg` en
   `src/lib/db.ts`.
3. Poner `DATABASE_URL` y `NEXT_PUBLIC_URL` en el entorno.

El esquema evita a propósito arrays y enums nativos para que la migración sea
eso y nada más.

## Lo que falta

- Autenticación y área de propietario (el formulario de alta es un `mailto`).
- Reservas reales: pasarela de pago, calendario de disponibilidad y contrato.
- Fotografía real de la flota.
- Traducciones. La arquitectura de URLs está pensada para `hreflang`, pero
  ahora mismo solo hay castellano.
