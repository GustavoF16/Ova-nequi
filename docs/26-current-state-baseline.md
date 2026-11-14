# 26 - Línea Base Técnica Actual

## Propósito

Este documento es el punto de partida oficial para las siguientes fases de
desarrollo. Describe el estado verificado del proyecto al 14 de noviembre de
2026 y debe actualizarse cuando cambien el código, la configuración, la
arquitectura o los resultados de validación.

## Identidad del proyecto

- Nombre: OVA Nequi.
- Rama de trabajo utilizada: `feature/entrega-semana3-docker`.
- Tipo: aplicación educativa web, PWA y Android.
- Público principal: personas adultas mayores con discapacidad auditiva.
- Frontend: Angular 20 e Ionic 8.
- Runtime móvil: Capacitor 8.
- Lenguaje: TypeScript 5.9.
- Persistencia local: `localStorage` en Web y SQLite en Android.
- Persistencia sensible nativa: `@aparajita/capacitor-secure-storage` 8.0.1.
- Pruebas: Jasmine, Karma y Angular TestBed.
- Backend remoto: Supabase Free mediante API REST.

## Estado funcional verificado

Las siguientes funciones fueron probadas en un teléfono Android con la APK
debug más reciente:

| Funcionalidad | Estado |
|---|---|
| Registro y redirección al login | Verificado |
| Login con contraseña hasheada | Verificado |
| Cierre de sesión | Verificado |
| Protección de rutas internas | Verificado |
| Progreso por usuario | Verificado |
| Persistencia después de reiniciar | Verificado |
| Certificado PDF | Verificado |
| Modo avión y estado “Sin conexión” | Verificado |
| Guardado local de encuesta offline | Verificado |
| Restauración del estado “En línea” | Verificado |
| Separación entre tres usuarios | Verificado: 100%, 17% y 0% |
| Sincronización online de encuesta | Verificado |
| Sincronización online de simulación | Verificado |
| Sincronización online de certificado | Verificado |
| Sincronización offline y reintento | Verificado |
| Prevención de registros duplicados | Verificado: un registro por envío |

El mensaje offline de la encuesta informa que los datos se guardaron
localmente y se enviarán al recuperar la conexión.

## Estado de accesibilidad e interfaz

La rama `feat/accessibility-ui-improvements` contiene una fase aislada de
mejoras que no modifica la rama estable remota. Se verificaron los siguientes
cambios:

- `lang="es"`, título descriptivo, `theme-color` y zoom permitido.
- Enlace “Saltar al contenido” y estructura semántica para el login.
- Etiquetas y estados requeridos para login, registro y configuración.
- Foco visible, contraste base, modo oscuro y escalas de texto globales.
- Soporte de `prefers-reduced-motion`.
- Alternativa de teclado para el reto de arrastrar y soltar de recibir pagos.

La página de login fue cargada desde el contenedor Docker actualizado y
respondió `HTTP 200`. El árbol de accesibilidad mostró un formulario nombrado,
campos de correo y contraseña etiquetados, botón “Iniciar sesión” y enlace de
registro.

Estas mejoras aún no se han fusionado en
`feature/entrega-semana3-docker`; primero deben revisarse visualmente en
Android y completar una auditoría automatizada WCAG/axe.

## Persistencia y aislamiento

`StorageService` es la fachada única de persistencia:

1. En Web usa `window.localStorage`.
2. En Android usa SQLite para datos funcionales.
3. En Android/iOS usa Keychain/Keystore mediante
   `@aparajita/capacitor-secure-storage` para `login`, perfiles y claves
   sensibles.
4. Migra una clave sensible antigua desde SQLite al almacenamiento seguro
   cuando se lee por primera vez.
5. Mantiene claves de progreso, encuesta, simulación, certificado y lecciones
   separadas por correo electrónico.

La contraseña no se almacena como mecanismo principal. El perfil guarda
`passwordHash` y `salt`, calculados con PBKDF2 y SHA-256 mediante Web Crypto.
La sesión local contiene un token aleatorio y expiración de 24 horas.

## Offline First y cola

Las encuestas, simulaciones y certificados se guardan primero localmente.
Cuando no existe conectividad se agregan a `pendingSyncQueue`. Cada elemento
incluye:

```typescript
{
  id: string;
  userEmail: string;
  type: 'survey' | 'simulation' | 'certificate';
  data: object;
  timestamp: number;
}
```

Al recuperar la red solo se procesa la cola del usuario activo. Los elementos
de otras cuentas se conservan. Si el servidor falla, el elemento permanece
pendiente y se reintenta posteriormente.

`NetworkService` combina eventos Web y el plugin nativo
`@capacitor/network` 8.0.1. Esto permite reflejar correctamente el modo avión
en Android.

## Sincronización remota vigente

El proyecto Supabase gratuito está creado, las tablas están desplegadas y la
sincronización está activa en ambos entornos:

```typescript
apiUrl: 'https://TU_PROYECTO.supabase.co/rest/v1';
apiKey: 'CLAVE_PUBLICA_ANON';
remoteSyncEnabled: true;
```

La URL real configurada en el proyecto es:

```text
https://izbihbzxspyepwqaemyq.supabase.co/rest/v1
```

La aplicación conserva el comportamiento local cuando no hay red y reintenta
la sincronización mediante `pendingSyncQueue` al recuperar conectividad.

El API REST utiliza:

```text
POST {apiUrl}/surveys
POST {apiUrl}/simulations
POST {apiUrl}/certificates
```

La URL debe terminar en `/rest/v1`. La clave permitida en la app es únicamente
la clave pública `anon`; nunca se debe incluir `service_role`.

El esquema está en [`supabase/schema.sql`](../supabase/schema.sql). Incluye los
permisos `INSERT` para los roles `anon` y `authenticated`, además de RLS para
los tres recursos. Esta configuración permite la demostración actual, pero
`user_email` todavía proviene del cliente y no es una identidad autorizada.
La autenticación remota, políticas por usuario, recuperación de contraseña,
idempotencia persistente y tokens de servidor son fases posteriores.

### Protección contra duplicados

La duplicación se corrigió en dos niveles:

1. Las páginas de simulaciones, encuestas y certificados deshabilitan el botón
   mientras la operación está en curso.
2. `StorageService` impide guardados concurrentes por tipo y serializa
   `flushPendingSyncQueue()`, evitando que dos eventos de conectividad envíen el
   mismo elemento simultáneamente.

La corrección evita nuevos duplicados por interacción repetida. Los registros
duplicados creados antes de esta corrección deben limpiarse manualmente en
Supabase si se desea conservar una sola fila histórica.

## Configuración y artefactos

- Entorno de desarrollo: [`src/environments/environment.ts`](../src/environments/environment.ts).
- Entorno de producción: [`src/environments/environment.prod.ts`](../src/environments/environment.prod.ts).
- Configuración PWA: [`ngsw-config.json`](../ngsw-config.json).
- Configuración Android local: `android/local.properties` (ignorada por Git).
- APK debug verificada:
  `android/app/build/outputs/apk/debug/app-debug.apk`.

No se deben comprometer claves de Supabase ni `android/local.properties`.

## Validación reproducible

Desde la raíz del proyecto:

```powershell
npm install
npm test -- --watch=false --browsers=ChromeHeadless
npm run lint
npm run build
npx cap sync android
Set-Location android
.\gradlew.bat assembleDebug --no-daemon
```

Resultado de la última validación:

- Tests: 14/14 exitosos.
- Lint: correcto.
- Build web: correcto.
- Sync Android: correcto.
- Build Android debug: `BUILD SUCCESSFUL`.
- Imagen Docker: construida correctamente.
- Contenedor Docker Compose: operativo.
- Smoke test HTTP: `http://localhost:8080` respondió `HTTP 200`.

El build web todavía muestra advertencias de dependencias CommonJS de
`canvg`, `core-js`, `raf`, `rgbcolor` y `html2canvas`; no impiden compilar,
pero deben tratarse como deuda técnica separada.

## Límites actuales

1. No existe autenticación remota.
2. La autenticación remota y la autorización por identidad aún no están
   implementadas.
3. La APK es debug y no está firmada para distribución.
4. El API actual acepta `user_email` como dato enviado por el cliente; esto no
   debe considerarse control de autorización para producción.
5. La PWA tiene artefactos generados y debe validarse en un servidor HTTPS real.
6. El backend debe diseñar idempotencia persistente y autorización antes de
   un uso multiusuario real.

## Orden recomendado para continuar

1. Mantener el proyecto Supabase Free y revisar su uso mensual.
2. Añadir autenticación remota y autorización basada en identidad.
3. Diseñar idempotencia persistente para reintentos y recuperación de fallos.
4. Validar la PWA en HTTPS real y añadir pruebas E2E.
5. Preparar firma release y distribución únicamente si el proyecto lo requiere.
