\# 00 - Documentation Index



\# OVA Nequi Documentation Index

> **Línea base vigente:** consultar primero
> [`26-current-state-baseline.md`](./26-current-state-baseline.md). Este
> documento consolida el estado verificado al 13 de noviembre de 2026 y
> prevalece sobre descripciones históricas que aún puedan aparecer en
> documentos de auditoría o cambios anteriores.



\## Introducción



Este documento constituye el índice maestro de la documentación del proyecto OVA Nequi.



Su propósito es servir como punto único de entrada para cualquier persona que necesite:



\- Comprender el proyecto.

\- Mantener el sistema.

\- Implementar nuevas funcionalidades.

\- Corregir errores.

\- Desplegar la aplicación.

\- Actualizar dependencias.

\- Planificar futuras versiones.



Toda la documentación oficial debe mantenerse actualizada y alineada con este índice.



\---

\# Documento de Estado Vigente

\## 26 - Línea Base Técnica Actual

```text

docs/26-current-state-baseline.md

```

Incluye:

- Estado funcional verificado en Android.
- Persistencia, seguridad y aislamiento por usuario.
- Cola offline y conectividad nativa.
- Integración Supabase Free configurada, validada y con operación offline.
- Comandos reproducibles.
- Límites actuales y orden recomendado de trabajo.

\---



\# Visión General



\## Documentación de Negocio



\### 01 - Executive Summary



```text

docs/01-executive-summary.md

```



Resumen ejecutivo del proyecto.



Incluye:



\- Objetivos.

\- Alcance.

\- Estado actual.

\- Tecnologías.



\---



\### 02 - Business Context



```text

docs/02-business-context.md

```



Contexto del proyecto.



Incluye:



\- Problema identificado.

\- Público objetivo.

\- Inclusión digital.

\- Personas adultas mayores con discapacidad auditiva.

\- Beneficios esperados.



\---



\### 03 - Functional Requirements



```text

docs/03-functional-requirements.md

```



Catálogo de requisitos funcionales.



Incluye:



\- RF01 a RF20.

\- Estado de implementación.

\- Accesibilidad.

\- Persistencia.

\- Seguridad.



\---



\# Arquitectura



\### 04 - System Architecture



```text

docs/04-system-architecture.md

```



Arquitectura global del sistema.



Incluye:



\- Capas.

\- Componentes.

\- Android.

\- Docker.

\- Persistencia.

\- Seguridad.



\---



\### 05 - Repository Inventory



```text

docs/05-repository-inventory.md

```



Inventario completo de carpetas y archivos.



\---



\### 06 - Frontend Architecture



```text

docs/06-frontend-architecture.md

```



Arquitectura Angular + Ionic.



Incluye:



\- Routing.

\- Componentes.

\- Diseño visual.

\- Responsive.



\---



\### 07 - Services Architecture



```text

docs/07-services-architecture.md

```



Arquitectura de servicios.



Incluye:



\- StorageService.

\- DatabaseService.

\- NetworkService.

\- ApiService.



\---



\# Persistencia



\### 08 - Storage and Database



```text

docs/08-storage-and-database.md

```



Persistencia global del sistema.



Incluye:



\- SQLite.

\- LocalStorage.

\- Configuración.

\- Usuarios.

\- Offline Queue.



\---



\### 09 - Offline First Strategy



```text

docs/09-offline-first-strategy.md

```



Arquitectura Offline First.



Incluye:



\- pendingSyncQueue.

\- Reconexión.

\- Sincronización.

\- Riesgos.



\---



\# Seguridad



\### 10 - Security Architecture



```text

docs/10-security-architecture.md

```



Arquitectura de seguridad.



Incluye:



\- PBKDF2.

\- SHA-256.

\- Salt.

\- Login.

\- Sesiones.



\---



\# Funcionalidad



\### 11 - Modules Detailed



```text

docs/11-modules-detailed.md

```



Documentación funcional de:



\- Login.

\- Registro.

\- Configuración.

\- Enviar Dinero.

\- Recibir Pagos.

\- Pagar Servicios.

\- Simulación.

\- Encuesta.

\- Progreso.

\- Certificados.



\---



\### 12 - User Flows



```text

docs/12-user-flows.md

```



Flujos completos de usuario.



Incluye:



\- Registro.

\- Login.

\- Progreso.

\- Certificados.

\- Offline.



\---



\# Plataforma



\### 13 - PWA Architecture



```text

docs/13-pwa-architecture.md

```



Arquitectura PWA.



Incluye:



\- Service Worker.

\- Manifest.

\- NGSW.

\- Estado actual.



\---



\### 14 - Android Platform



```text

docs/14-android-platform.md

```



Arquitectura Android.



Incluye:



\- Capacitor.

\- Gradle.

\- Android SDK.

\- Persistencia móvil.



\---



\### 15 - Docker Deployment



```text

docs/15-docker-deployment.md

```



Infraestructura Docker.



Incluye:



\- Dockerfile.

\- Docker Compose.

\- Nginx.

\- Publicación.



\---



\# Calidad



\### 16 - Testing Strategy



```text

docs/16-testing-strategy.md

```



Estrategia de pruebas.



Incluye:



\- Karma.

\- Jasmine.

\- Cobertura.

\- Roadmap Testing.



\---



\### 17 - Known Issues and Technical Debt



```text

docs/17-known-issues-and-tech-debt.md

```



Inventario oficial de:



\- Bugs.

\- Riesgos.

\- Pendientes.

\- Deuda técnica.



\---



\# Planeación



\### 18 - Roadmap



```text

docs/18-roadmap.md

```



Plan de evolución futura.



\---



\### 19 - Change History



```text

docs/19-change-history.md

```



Historial de cambios del proyecto.



\---



\# Desarrollo



\### 20 - Development Guide



```text

docs/20-development-guide.md

```



Guía para desarrolladores.



\---



\### 21 - API Reference



```text

docs/21-api-reference.md

```



Referencia de integración API.



\---



\### 22 - Storage Reference



```text

docs/22-storage-reference.md

```



Diccionario oficial de persistencia.



\---



\### 23 - Maintenance Guide



```text

docs/23-maintenance-guide.md

```



Guía de mantenimiento.



\---



\### 24 - CI/CD Strategy



```text

docs/24-ci-cd-strategy.md

```



Estrategia futura de integración continua.



\---



\# Auditoría



\### 25 - Audit Report



```text

docs/25-audit-report.md

```



Resultado de la auditoría completa del proyecto.



\---



\# Documentación Histórica



\## Implementation Gap Report



```text

docs/implementation-gap-report.md

```



Evaluación histórica de brechas de implementación.



\---



\## Testing Instructions



```text

docs/testing-instructions.md

```



Instrucciones históricas de pruebas.



\---



\# Orden Recomendado de Lectura



\## Para entender el proyecto



1\. Executive Summary

2\. Business Context

3\. Functional Requirements

4\. System Architecture



\---



\## Para desarrollar



1\. Repository Inventory

2\. Frontend Architecture

3\. Services Architecture

4\. Storage Reference

5\. Development Guide



\---



\## Para despliegue



1\. Android Platform

2\. Docker Deployment

3\. PWA Architecture



\---



\## Para mantenimiento



1\. Known Issues and Technical Debt

2\. Roadmap

3\. Audit Report



\---



\# Estado de la Documentación



\## Cobertura Actual



✅ Negocio



✅ Requisitos



✅ Arquitectura



✅ Frontend



✅ Persistencia



✅ Seguridad



✅ Android



✅ Docker



✅ Testing



✅ Roadmap



✅ Auditoría



\---



\# Conclusión



Este índice constituye el punto central de navegación documental del proyecto OVA Nequi.



Antes de realizar cualquier modificación significativa se recomienda consultar los documentos asociados a la funcionalidad que será afectada.
