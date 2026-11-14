\# 19 - Change History



\# Historial de Cambios

## Actualización 14 de noviembre de 2026

Se completó el sistema gratuito de diagnóstico y observabilidad local:

- Logger centralizado con captura global de errores Angular, navegador,
  promesas rechazadas y errores HTTP.
- Persistencia local limitada a 200 registros, sanitización de datos sensibles,
  exportación manual y limpieza desde Configuración.
- Logs de Nginx enviados a stdout/stderr.
- Rotación Docker `json-file` configurada en 10 MB por archivo y 3 archivos por
  contenedor.
- Tests, lint, build y Docker validados; 17/17 tests exitosos y endpoints
  principales con HTTP 200.

La documentación de estado vigente se encuentra en
[`26-current-state-baseline.md`](./26-current-state-baseline.md).

## Actualización 13 de noviembre de 2026

Se consolidó la línea base técnica en
[`26-current-state-baseline.md`](./26-current-state-baseline.md). Se
documentaron como implementados y verificados:

- Tests unitarios, lint, build web y build Android.
- Registro, login, logout y protección de rutas.
- Aislamiento de progreso entre usuarios.
- Cola offline y conectividad nativa Android.
- Secure Storage con Keychain/Keystore.
- PWA habilitada en producción.
- Integración Supabase REST con proyecto gratuito configurado y validado.

Se añadió [`supabase/schema.sql`](../supabase/schema.sql), incluyendo permisos
SQL para los roles de inserción, y se actualizaron las instrucciones
reproducibles de prueba. Se validaron encuestas, simulaciones y certificados
online/offline. También se corrigieron duplicados mediante bloqueo de botones,
guardados protegidos y sincronización serializada. La autenticación remota,
autorización basada en identidad, idempotencia persistente, E2E y firma release
permanecen como trabajo futuro.



\## Introducción



Este documento registra la evolución histórica del proyecto OVA Nequi desde su creación hasta la auditoría técnica completa realizada durante la rama:



```text

feature/entrega-semana3-docker

```



Su propósito es permitir comprender:



\- Decisiones tomadas.

\- Cambios implementados.

\- Evolución de arquitectura.

\- Incorporación de nuevas funcionalidades.

\- Deuda técnica pendiente.



\---



\# Fase 0



\## Proyecto Inicial



\### Estado



Aplicación Ionic básica generada desde plantilla estándar.



\### Tecnologías Iniciales



```text

Angular

Ionic

Capacitor

```



\### Identificadores Iniciales



```text

io.ionic.starter

```



\---



\# Fase 1



\## Construcción Académica Inicial



\### Objetivo



Crear una plataforma educativa basada en Nequi.



\---



\## Implementaciones



\### Login



Primer sistema de autenticación local.



\---



\### Registro



Primer flujo de usuarios.



\---



\### Home



Creación del dashboard principal.



\---



\### Rutas Angular



Configuración inicial mediante:



```text

app.routes.ts

```



\---



\# Fase 2



\## Módulos Educativos



\### Objetivo



Transformar la aplicación en un OVA.



\---



\## Módulo Enviar Dinero



Implementado:



\- Guía educativa.

\- Evaluación.

\- Puntaje.

\- Persistencia.



\---



\## Módulo Recibir Pagos



Implementado:



\- Actividad Drag \& Drop.

\- Historial.

\- Evaluación.



\---



\## Módulo Pagar Servicios



Implementado:



\- Crucigrama.

\- Sopa de letras.

\- Sistema de puntuación.



\---



\# Fase 3



\## Persistencia Local



\### Objetivo



Permitir continuidad de uso.



\---



\## StorageService



Creación de:



```text

StorageService

```



como núcleo de persistencia.



\---



\## LocalStorage



Soporte para entorno Web.



\---



\## SQLite



Integración mediante:



```text

@capacitor-community/sqlite

```



\---



\# Fase 4



\## Android



\### Objetivo



Convertir OVA Nequi en aplicación móvil.



\---



\## Capacitor



Integración Android.



\---



\## MainActivity



Creación de:



```text

BridgeActivity

```



\---



\## Android Build



Configuración:



```text

minSdkVersion 24

compileSdkVersion 36

targetSdkVersion 36

```



\---



\# Fase 5



\## Progreso Académico



\### Objetivo



Medir el aprendizaje.



\---



\## UserProgressMap



Implementado.



\---



\## Progreso por módulo



Implementado:



```text

sendMoney

receivePayments

payServices

simulation

survey

certificate

```



\---



\## Progreso Global



Implementado.



\---



\# Fase 6



\## Seguridad



\### Objetivo



Eliminar almacenamiento inseguro.



\---



\## PBKDF2



Implementado.



\---



\## SHA-256



Implementado.



\---



\## Salt Aleatorio



Implementado.



\---



\## Migración Legacy



Implementada.



Usuarios antiguos pueden migrarse automáticamente.



\---



\## Expiración de Sesión



Implementada.



Duración:



```text

24 horas

```



\---



\# Fase 7



\## Offline First



\### Objetivo



Permitir funcionamiento sin Internet.



\---



\## NetworkService



Creado.



\---



\## Offline Queue



Implementada.



```text

pendingSyncQueue

```



\---



\## Sincronización



Implementada mediante:



```text

flushPendingSyncQueue()

```



\---



\## Operaciones soportadas



```text

survey

simulation

certificate

```



\---



\# Fase 8



\## Certificados PDF



\### Objetivo



Generar evidencia de aprendizaje.



\---



\## jsPDF



Integrado.



\---



\## Filesystem Android



Integrado.



\---



\## Impresión



Soporte añadido.



\---



\## Vista previa



Implementada.



\---



\# Fase 9



\## Configuración de Usuario



\### Objetivo



Mejorar accesibilidad.



\---



\## Modo Oscuro



Implementado.



\---



\## Tamaño de Texto



Implementado.



\---



\## Persistencia por Usuario



Implementada.



\---



\# Fase 10



\## Dockerización



\### Objetivo



Portabilidad y despliegue.



\---



\## Dockerfile



Implementación Multi Stage.



\---



\## Docker Compose



Implementado.



\---



\## Nginx



Configurado para SPA Routing.



\---



\## Exposición



```text

8080

```



\---



\# Fase 11



\## PWA



\### Componentes Implementados



\- Manifest.

\- Iconos.

\- Service Worker.

\- NGSW Config.



\---



\### Estado



Parcialmente configurada.



\---



\# Fase 12



\## Testing



\### Jasmine



Implementado.



\---



\### Karma



Implementado.



\---



\### Angular TestBed



Implementado.



\---



\### Estado



Pruebas básicas.



No existen pruebas funcionales completas.



\---



\# Fase 13



\## Auditoría Técnica Completa



\### Rama



```text

feature/entrega-semana3-docker

```



\---



\### Alcance



Auditoría de:



\- Angular.

\- Ionic.

\- Capacitor.

\- Android.

\- Docker.

\- Servicios.

\- Persistencia.

\- Seguridad.

\- Assets.

\- Testing.

\- Documentación.



\---



\### Documentación Generada



\#### Executive Summary



```text

01-executive-summary.md

```



\---



\#### Arquitectura



```text

04-system-architecture.md

```



\---



\#### Inventario



```text

05-repository-inventory.md

```



\---



\#### Frontend



```text

06-frontend-architecture.md

```



\---



\#### Servicios



```text

07-services-architecture.md

```



\---



\#### Persistencia



```text

08-storage-and-database.md

```



\---



\#### Offline First



```text

09-offline-first-strategy.md

```



\---



\#### Seguridad



```text

10-security-architecture.md

```



\---



\#### Módulos



```text

11-modules-detailed.md

```



\---



\#### Flujos



```text

12-user-flows.md

```



\---



\#### PWA



```text

13-pwa-architecture.md

```



\---



\#### Android



```text

14-android-platform.md

```



\---



\#### Docker



```text

15-docker-deployment.md

```



\---



\#### Testing



```text

16-testing-strategy.md

```



\---



\#### Deuda Técnica



```text

17-known-issues-and-tech-debt.md

```



\---



\#### Roadmap



```text

18-roadmap.md

```



\---



\# Hallazgos Relevantes



\## Backend



Pendiente implementación.



\---



\## Secure Storage



Preparado pero no instalado.



\---



\## PWA



Parcial.



\---



\## Jenkins



No implementado.



\---



\## SonarQube



No implementado.



\---



\# Estado Actual



\## Componentes Completos



✅ Autenticación



✅ Módulos educativos



✅ Simulación



✅ Encuesta



✅ Progreso



✅ Certificados



✅ Android



✅ Docker



✅ Offline First



✅ Seguridad básica



\---



\## Componentes Pendientes



⚠️ Backend



⚠️ Secure Storage



⚠️ PWA completa



⚠️ CI/CD



⚠️ E2E



\---



\# Conclusión



OVA Nequi evolucionó desde una aplicación Ionic básica hacia una plataforma educativa financiera con soporte Android, persistencia avanzada, funcionamiento Offline First, progreso académico y generación de certificados.



La auditoría realizada permitió documentar completamente la solución, proporcionando una base sólida para futuras mejoras, mantenimiento y evolución técnica del proyecto.
