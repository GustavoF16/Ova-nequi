\# 17 - Known Issues and Technical Debt



\# Problemas Conocidos y Deuda Técnica

> Este inventario conserva hallazgos históricos. Los estados de los hallazgos
> deben contrastarse con [`26-current-state-baseline.md`](./26-current-state-baseline.md).
> Secure Storage, PWA, conectividad nativa, tests unitarios y build Android ya
> fueron corregidos o verificados; permanecen como deuda la autenticación
> remota, E2E, idempotencia del backend y firma release.



\## Introducción



Este documento centraliza todos los problemas identificados durante la auditoría completa de OVA Nequi.



Incluye:



\- Errores funcionales.

\- Inconsistencias.

\- Componentes incompletos.

\- Riesgos técnicos.

\- Funcionalidades pendientes.

\- Mejoras recomendadas.



\---



\# Clasificación



Las observaciones se clasifican según prioridad:



\## Crítica



Impacta funcionalidad o seguridad.



\---



\## Alta



Impacta escalabilidad o mantenibilidad.



\---



\## Media



Mejoras importantes.



\---



\## Baja



Mejoras estéticas o menores.



\---



\# Incidencia 01



\## Configuración apunta a Encuestas



\### Prioridad



Alta



\---



\### Estado



Pendiente revisión.



\---



\### Ubicación



```text

home.page.html

```



\---



\### Observación



Existe una tarjeta visual que muestra:



```text

Configuración

Personaliza la aplicación

```



pero aparentemente navega a:



```text

/encuestas

```



en lugar de:



```text

/configuracion

```



\---



\### Impacto



Confusión del usuario.



\---



\### Recomendación



Validar:



```html

routerLink="/configuracion"

```



\---



\# Incidencia 02



\## API Real No Implementada



\### Prioridad



Alta



\---



\### Estado



Pendiente.



\---



\### Archivos



```text

environment.ts

environment.prod.ts

```



\---



\### Situación Actual



Configuran:



```text

Supabase REST configurado y validado con proyecto Free; la autenticación
remota y la autorización por identidad siguen pendientes

```



\---



\### Consecuencia



Existe un backend Supabase funcional para la recepción de datos académicos,
pero todavía no existe autenticación remota ni un modelo de autorización
multiusuario completo.



\---



\### Impacto



Las llamadas:



```text

survey

simulation

certificate

```



se envían a las tablas `surveys`, `simulations` y `certificates`.



\---



\### Recomendación



Implementar backend:



```text

Node.js

NestJS

Spring Boot

Firebase

Supabase

```



\---



\# Incidencia 03



\## Secure Storage No Operativo



\### Prioridad



Alta



\---



\### Estado



Preparado.



No implementado.



\---



\### Servicio



```text

StorageService

```



\---



\### Métodos



```text

secureSet()

secureGet()

```



\---



\### Problema



No existe plugin instalado.



\---



\### Riesgo



Información sensible almacenada fuera del Keystore.



\---



\### Recomendación



Integrar:



```text

Android Keystore

iOS Keychain

```



\---



\# Incidencia 04



\## PWA Parcialmente Configurada



\### Prioridad



Alta



\---



\### Situación



Existe:



```text

manifest.webmanifest

ngsw-config.json

provideServiceWorker()

```



\---



\### Problema



angular.json contiene:



```json

serviceWorker: false

```



\---



\### Consecuencia



La PWA no se encuentra completamente habilitada.



\---



\### Recomendación



Validar estrategia final de Service Worker.



\---



\# Incidencia 05



\## Package Android Genérico



\### Prioridad



Media



\---



\### Estado



Pendiente.



\---



\### Valor Actual



```text

io.ionic.starter

```



\---



\### Ubicaciones



```text

capacitor.config.ts

strings.xml

build.gradle

MainActivity

```



\---



\### Riesgo



Problemas durante publicación.



\---



\### Recomendación



Definir App ID definitivo.



\---



\# Incidencia 06



\## Testing Funcional Insuficiente



\### Prioridad



Alta



\---



\### Estado



Pendiente.



\---



\### Situación Actual



Los tests existentes validan principalmente:



```typescript

expect(component).toBeTruthy()

```



\---



\### Cobertura Faltante



\- Login.

\- Registro.

\- Security.

\- SQLite.

\- StorageService.

\- Offline Sync Queue.

\- Certificados.



\---



\### Recomendación



Agregar pruebas reales.



\---



\# Incidencia 07



\## Falta de Pruebas End To End



\### Prioridad



Media



\---



\### Estado



Pendiente.



\---



\### Herramientas Recomendadas



```text

Playwright

Cypress

```



\---



\# Incidencia 08



\## Sin CI/CD



\### Prioridad



Media



\---



\### Estado



No implementado.



\---



\### Confirmado



No existe:



```text

Jenkinsfile

GitHub Actions

Pipeline

```



\---



\### Recomendación



Implementar:



```text

Jenkins

SonarQube

Docker Registry

```



\---



\# Incidencia 09



\## Confirmación Logout



\### Prioridad



Baja



\---



\### Estado



Pendiente.



\---



\### Situación



Logout ocurre inmediatamente.



\---



\### Recomendación



Agregar diálogo:



```text

¿Desea cerrar sesión?

```



\---



\# Incidencia 10



\## Gestión de Contraseñas



\### Prioridad



Media



\---



\### Estado



Parcial.



\---



\### Implementado



\- PBKDF2.

\- SHA-256.

\- Salt.



\---



\### Pendiente



\- Confirmación contraseña.

\- Recuperación contraseña.

\- Cambio contraseña.

\- Requisitos de complejidad.



\---



\# Incidencia 11



\## Gestión de Tokens



\### Prioridad



Alta



\---



\### Estado



No implementado.



\---



\### Situación



Autenticación completamente local.



\---



\### Ausente



```text

JWT

Refresh Tokens

Revocación

Backend Auth

```



\---



\# Incidencia 12



\## Resolución de Conflictos Offline



\### Prioridad



Media



\---



\### Estado



No implementado.



\---



\### Situación



La cola Offline sincroniza.



No existe:



```text

versionado

conflict resolution

duplicate detection

```



\---



\### Riesgo



Inconsistencias futuras.



\---



\# Riesgos Técnicos



\## Riesgo 01



Pérdida de dispositivo.



\---



\## Riesgo 02



Acceso físico al almacenamiento local.



\---



\## Riesgo 03



Dependencia de autenticación local.



\---



\## Riesgo 04



Backend inexistente.



\---



\## Riesgo 05



PWA incompleta.



\---



\# Deuda Técnica General



\## Backend



Pendiente.



\---



\## Secure Storage



Pendiente.



\---



\## CI/CD



Pendiente.



\---



\## SonarQube



Pendiente.



\---



\## E2E



Pendiente.



\---



\## PWA Completa



Pendiente.



\---



\# Prioridades Futuras



\## Prioridad 1



Backend.



Secure Storage.



\---



\## Prioridad 2



Testing.



CI/CD.



\---



\## Prioridad 3



PWA.



Play Store.



\---



\# Estado General



\## Implementado



✅ Arquitectura principal.



✅ Funcionalidades educativas.



✅ Seguridad básica.



✅ Offline First.



✅ Android.



✅ Docker.



\---



\## Pendiente



⚠️ Backend.



⚠️ Secure Storage.



⚠️ CI/CD.



⚠️ E2E.



⚠️ PWA completa.



\---



\# Conclusión



OVA Nequi posee una base técnica sólida y funcional.



La mayor parte de la deuda técnica identificada corresponde a componentes empresariales avanzados que normalmente aparecen en etapas posteriores de evolución del proyecto, como backend, seguridad avanzada, observabilidad e integración continua.



Actualmente no existen defectos críticos que impidan el funcionamiento general de la plataforma.
