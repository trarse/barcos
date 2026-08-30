# Subir Estribor a producción

Orden pensado para que nada quede a medias. Cada paso dice cómo comprobar
que salió bien: si no se puede comprobar, no está hecho.

---

## 0. Antes de nada

- [ ] **Comprar `estribor.es`** en Dinahosting o DonDominio (~11 €/año).
- [ ] **Auto-renovación y bloqueo de transferencia activados el mismo día.**
      A partir del despliegue ese dominio acumula antigüedad SEO: perderlo por
      una tarjeta caducada sería el error más caro posible.
- [ ] Nameservers apuntando a **Cloudflare** (DNS gratis).
- [ ] Reenvío de `hola@estribor.es` al correo personal.

---

## 1. Base de datos

Hoy corre sobre SQLite, que vale para desarrollo pero no para producción.

- [ ] Crear una base **PostgreSQL** gestionada (Neon o Supabase, capa gratuita
      suficiente para empezar).
- [ ] En `prisma/schema.prisma`, cambiar el `provider` del datasource de
      `sqlite` a `postgresql`. El esquema evita a propósito los tipos nativos
      de Postgres, así que es un cambio de una línea.
- [ ] `DATABASE_URL` en el entorno de producción con la cadena de conexión.
- [ ] `npx prisma db push` contra esa base y luego `npm run db:seed`.

**Comprobar:** el seed termina diciendo el número de destinos, puertos, barcos
y lugares.

---

## 2. Alojamiento

- [ ] **Cloudflare Pages** o **Netlify**. No usar el plan Hobby de Vercel:
      prohíbe el uso comercial.
- [ ] Conectar el repositorio y fijar el comando de build a `npm run build`.
- [ ] Dominio `estribor.es` apuntado al proyecto, con HTTPS.
- [ ] Redirección de `www.estribor.es` a `estribor.es` (o al revés, pero una
      sola de las dos debe existir: las dos vivas son contenido duplicado).

---

## 3. Variables de entorno **(el paso que no se puede saltar)**

En el panel del alojamiento, no en un fichero:

```
NEXT_PUBLIC_URL = https://estribor.es
DATABASE_URL    = postgresql://...
```

`NEXT_PUBLIC_URL` es de donde salen el `canonical`, el `hreflang`, el sitemap
y el JSON-LD. Si apunta a localhost se publica un sitio entero apuntando a un
ordenador que nadie puede alcanzar, **la web se ve perfecta** y semanas después
no hay nada indexado.

Por eso el build se niega a compilar en un despliegue si esa variable falta o
apunta a localhost. Si ves ese error, no es un fallo: es la red de seguridad
haciendo su trabajo.

**Comprobar:** en producción, ver el código fuente de cualquier página y buscar
`rel="canonical"`. Debe decir `https://estribor.es/...`.

---

## 4. Antes de dar el sitio por publicado

- [ ] `npm run verificar` en verde. Incluye tests, tipos, lint, build y la
      auditoría SEO de las 632 páginas.
- [ ] **Abrir `https://estribor.es/robots.txt` en el navegador.** Tiene que
      permitir el rastreo y apuntar al sitemap del dominio real. Desplegar con
      un `noindex` o un `Disallow: /` de pruebas es el fallo más común y más
      caro del sector, y no da ninguna señal.
- [ ] Abrir `https://estribor.es/sitemap.xml` y comprobar que las URL son del
      dominio real.
- [ ] Probar las tres versiones de una misma página:
      `/es/sin-licencia/calpe`, `/en/boat-hire-without-licence/calpe`,
      `/de/boot-mieten-ohne-fuehrerschein/calpe`.

---

## 5. Search Console y medición

- [ ] **Google Search Console**: dar de alta la propiedad de **dominio** (no la
      de prefijo de URL), que cubre los tres idiomas y ambos protocolos de una
      vez. Se verifica con un registro DNS en Cloudflare.
- [ ] Enviar `https://estribor.es/sitemap.xml`.
- [ ] **Bing Webmaster Tools**: se puede importar directamente desde Search
      Console, son cinco minutos.
- [ ] **Google Analytics 4** con los eventos propios.
- [ ] El evento `sin_resultados` con puerto y fecha: es el que dice dónde falta
      inventario y debería gobernar la agenda comercial de cada lunes.

**Comprobar:** en Search Console, «Inspección de URL» sobre la portada debe
decir que la página está disponible para Google.

---

## 6. La primera semana

- [ ] Revisar **Cobertura** en Search Console cada dos días. Es normal ver
      páginas «Descubierta, actualmente sin indexar»: la indexación tarda.
- [ ] Comprobar que las landings con `noindex` son **solo** las que deben
      serlo: las que no llegan a 6 barcos o a 250 palabras propias.
- [ ] **Perfil de Empresa en Google** de la base de Alicante, verificado, con
      fotos del pantalán.

---

## Lo que NO hay que hacer todavía

- **No publicar las landings de municipios sin barcos reales.** El sitio tiene
  96 barcos ficticios de desarrollo. La regla es 6 barcos reales por landing
  antes de que entre al índice, y el código ya la aplica solo.
- **No publicar contenido de fondeaderos** hasta tener el seguro revisado.
- **No afirmar nada sobre el cambio de normativa de titulaciones** hasta que
  exista fuente citable.

Las tres están explicadas en `CLAUDE.md`.
