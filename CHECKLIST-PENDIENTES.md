# Check de pendientes · Estribor

Estado actual: las **8 funcionalidades del backlog ya están implementadas**
(test interactivo, sello verificado, checklist de entrega, firma digital + fianza,
modo simple/operador, mapa de fondeaderos, comparativa provincial y modo travesía).
Este check recoge **lo que falta** para cerrar el proyecto.

## 1. Contenido (lo haces tú — multimedia)

- [ ] Fotos reales en los pantalanes (sustituir las ilustraciones de ejemplo).
- [ ] Vídeos verticales «Cala en 30 segundos» (mar + precio + "con patrón" en el primer segundo).
- [ ] Sonido ambiente natural (sin música de stock) para los vídeos.
- [ ] Vídeos «Mito contra realidad» (patrón local hablando a cámara).
- [ ] Traducción al neerlandés (textos: hoy solo es/en/de).
- [ ] Ampliar las calas del mapa de 20 a 60–80 (te paso la plantilla de datos).

## 2. Código (lo hago yo)

- [ ] Neerlandés: rutas + diccionario + hreflang (cuando tengas los textos).
- [ ] Contador visual «confirmación en menos de 1 hora» en la reserva.
- [ ] Mostrar el **19 %** (12 % armador + 7 % cliente) en el buscador público, no solo en el panel.
- [ ] Auditoría visual: paleta azul marino/blanco **sin gradientes ni sombras** (quitar `shadow-*`, unificar tokens).
- [ ] Mover las fotos del checklist y la firma a **Supabase Storage** (hoy van como data URL).
- [ ] «Capa de a bordo»: derrotero digital con restricciones actualizadas (evolución del mapa).
- [ ] Regla anti-landings-vacías: no publicar un destino sin un mínimo de barcos (25).
- [ ] Modo travesía: opcionalmente **tiempo real (WebSocket)** en vez de polling.

## 3. Operación / negocio (no es código)

- [ ] Liquidar al armador en **48 h** tras el alquiler (proceso, no código).
- [ ] Umbral comercial: no lanzar publicidad hasta **25 barcos reales por puerto**.
- [ ] Material offline rastreable (trípticos con código de comisión para escuelas y hoteles).

## 4. Despliegue / infraestructura

- [ ] **Netlify**: esperar el reset de créditos del plan gratuito o pasar a plan de pago para volver a publicar.
- [ ] **Stripe**: claves en vivo + webhook apuntando a producción (necesario para fianza/firma reales).
- [ ] **Supabase Storage** para fotos (checklist, firma, fichas).
- [ ] Medir y cumplir **LCP < 2,0 s en 4G** (uso a una mano en móvil).
- [ ] Dominio y SSL de producción.

## Prioridad sugerida

1. Fotos propias (mayor impacto en conversión).
2. Mover fotos a Storage + Stripe en vivo (para operar de verdad).
3. Netlify (volver a publicar).
4. Neerlandés + 19 % en buscador + contador <1 h.
5. El resto.
