@AGENTS.md

# Estribor

Alquiler de barcos en la **Costa Blanca**. Solo esa costa: se podó a propósito
Baleares, Barcelona, Málaga y Canarias porque son los mercados más competidos
de España y ahí no se posiciona el primer año.

El diferencial del producto es el **precio final por delante**: combustible,
limpieza, amarre y tasas van dentro desde el primer resultado del buscador.

Estado: web de contenido lista, marketplace sin construir. No hay
autenticación, ni alta real de barco, ni panel de armador, ni calendario, ni
reservas, ni pagos. Los 96 barcos de la semilla son ficticios hasta que llegue
el censo.

## Las reglas que no se negocian

Estas salieron de decisiones tomadas con el promotor. Antes de saltarse
cualquiera, preguntar.

**1. Regla de indexación.** Una landing programática solo se indexa si tiene
**6 barcos o más** y **250 palabras o más de texto propio**. Si no, emite
`noindex, follow` — el `follow` para que el rastreo siga a las fichas. Está
implementada en `sin-licencia/[destino]` y en `destinos/[lugar]`. Si algún día
un texto se queda a 245 palabras, se alarga el texto; **no se baja el umbral**.

**2. Nada de castellano dentro de una página inglesa o alemana.** Todo el
contenido escrito a mano lleva un campo `idiomaProsa` (o vive en los ficheros
de `src/lib/textos/`). Si no coincide con el idioma de la página, ese bloque
**no se pinta y no entra en el JSON-LD**. Servir texto en otro idioma dentro de
una página que declara `hreflang` es peor que no tener el texto.

Corolario: el `hreflang` solo declara idiomas que existen de verdad, y el
selector de idioma no enlaza a páginas que no existen (cae al índice de la
sección). Hay un test que vigila el mapa de disponibilidad.

**3. No se publica información de dónde fondear.** Ni tenida, ni sondas, ni qué
vientos abrigan una cala. Eso es información de seguridad de la vida humana en
el mar y no se publica **hasta que haya seguro revisado**. Las páginas de
destino cuentan *qué es* un sitio y *cómo se llega*, nunca dónde echar el ancla.

**4. Las cifras legales, con fecha o sin cifra.** Límites de eslora, potencia,
millas, importes de sanción: los fija la normativa y se revisan. O se citan con
su fuente y su fecha de revisión, o se explica el sistema y se remite a la
fuente oficial. Una cifra desactualizada en la página más leída hace más daño
que no ponerla. **Nunca citar normativa de otra comunidad autónoma** — ya pasó
una vez con un decreto balear en un sitio de Alicante.

**5. Nada sobre el cambio de normativa de titulaciones hasta que haya fuente
citable.** El promotor tiene información no pública de que la categoría «sin
licencia» va a desaparecer. La ventaja no es contarlo antes: es tener las ocho
landings `sin-licencia` posicionadas y el curso montado cuando salga en el BOE.
Ese día se reconvierten en el sitio, **sin borrar ni redirigir ninguna URL**.

**6. Una consulta, una página.** Si un contenido nuevo canibaliza con otro que
ya existe, se decide cuál se queda y el otro se va. Ya se retiraron tres
artículos del blog por esto y por geografía equivocada.

## Convenciones del código

- Los importes van en **céntimos como enteros**. Nunca en coma flotante.
- El esquema evita tipos nativos de Postgres para que pasar de SQLite a
  producción sea cambiar una línea.
- Una página se identifica por **lo que es**, no por su URL (`src/lib/rutas.ts`).
  De ahí salen las URLs de los tres idiomas, el canónico y el `hreflang`. Nunca
  escribir una URL a mano en una plantilla.
- El castellano es la fuente de verdad de los textos: una cadena sin traducir
  es un error de compilación, no una palabra colada.
- Verificar siempre con `npm run verificar` (tests, tipos, lint y build).

## Trampas conocidas

- `prisma db push` **no acepta `--skip-generate`** en Prisma 7.
- Al añadir un modelo, acordarse de borrarlo también en `limpiar()` de
  `prisma/seed.ts`, o la segunda siembra falla por slug duplicado.
- Los tipos de ruta (`PageProps`) los genera Next en el build: tras crear una
  página, `npm run build` antes de que `tsc` deje de quejarse.
- `NEXT_PUBLIC_URL` es de donde salen canonical, hreflang, sitemap y JSON-LD.
  El build se niega a compilar en un despliegue si falta o apunta a localhost;
  en local solo avisa. Pasos completos en `DESPLIEGUE.md`.

## El aviso de npm audit que NO hay que "arreglar"

`npm audit` reporta 3 vulnerabilidades altas por `deepmerge-ts < 8`. Antes de
tocar nada, esto es lo que hay:

- Llega **solo** por la CLI de Prisma (`prisma` → `@prisma/config`), que es
  herramienta de build. **No aparece en el bundle de producción**, comprobado
  buscándolo en `.next/server`.
- Lo que procesa ese merge es nuestro propio `prisma.config.ts`. Nunca entra
  ahí nada que controle un visitante, así que el fallo (agotamiento de pila
  con grafos recursivos) no es alcanzable desde fuera.
- El único «arreglo» que ofrece npm es **bajar Prisma a 6.12**, que es una
  versión mayor hacia atrás y rompería el proyecto entero: driver adapters,
  API de Prisma 7 y el esquema.

Riesgo evaluado y asumido. Se revisa cuando Prisma actualice `@prisma/config`.
**No ejecutar `npm audit fix --force`.**

## Dónde está lo demás

El plan de marketing y el de proyecto están en `E:\proyecto-barcos\`. Los
mensajes de los commits explican el porqué de cada decisión, no solo el qué:
merece la pena leerlos antes de deshacer algo que parezca raro.

## Publicación programada

Guías, artículos y ocasiones admiten `publicaDesde` (AAAA-MM-DD). Hasta esa
fecha el contenido no se pinta, no aparece en los índices, no entra en el
sitemap y no genera página: para el mundo no existe. Sin el campo, publicado.

Sirve para lo que el calendario editorial necesita: escribir doce piezas en
enero y que salgan una por semana sin que nadie tenga que acordarse. Publicar
veinte páginas el mismo día es además el patrón que peor se lee desde fuera.

Dos detalles que costaron un fallo cada uno:

- `generateStaticParams` filtra por fecha, así que una pieza programada no
  tiene página hasta su día. `dynamicParams` la sirve sola ese día **sin
  necesidad de volver a desplegar**.
- Los enlaces relacionados se filtran con `enlacesVivos()`. Un texto escrito
  hoy puede enlazar a otro que aún no ha salido, y eso serían enlaces internos
  a 404. El enlace no se borra: aparece solo cuando su destino existe.

Cuando exista el panel del armador, editará este mismo campo.
