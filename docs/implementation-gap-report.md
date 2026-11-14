Implementation Gap Report
=========================

Project: ova-nequi
Date: 2026-06-16
Author: Automations

Overview
--------
Este informe compara el estado actual del repositorio contra la matriz de trazabilidad (RFs principales discutidas durante el desarrollo). Incluye qué se implementó, qué falta, riesgos y pasos sugeridos.

Requisitos principales (resumen trazabilidad)
--------------------------------------------
- RF01: Persistencia local (web: localStorage, nativo: SQLite)
- RF02: Sincronización offline / cola de sincronización hacia remoto
- RF03: Progreso por usuario y por módulo (per-user/module progress)
- RF04: Registro / Login local con manejo de sesión y expiración
- RF05: Logout y gestión de sesión (token + expiración)
- RF06: Hashing de contraseñas en cliente (PBKDF2) y migración de contraseñas legadas
- RF07: Almacenamiento seguro en móvil (Keychain/Keystore)
- RF08: PWA / Service Worker
- RF09: Generación de certificados/PDF
- RF10: VTT subtítulos y assets multimedia
- RF11: Sincronización remota (API) y manejo de errores/colisiones
- RF12: Pruebas y validación E2E

Estado actual (implementado)
----------------------------
- RF01: Persistencia local
  - Implementado: `DatabaseService` (SQLite) y `saveValue/loadValue` con fallback a `localStorage`.

- RF02: Sincronización offline
  - Implementado: Cola de pendientes (`pendingSyncQueue`) y
    `flushPendingSyncQueue()`; Supabase está configurado para los tres recursos
    y se conserva el modo local cuando no hay red.

- RF03: Progreso por usuario/módulo
  - Implementado: API en `StorageService` (`saveModuleProgressForCurrentUser`, `loadAllModuleProgressForCurrentUser`, etc.) y wiring en páginas (`modulos`, `encuestas`, `simulaciones`, `certificados`, `progreso` page UI actualizado).

- RF04: Registro/Login
  - Parcial: Flujos `register` y `login` actualizados para usar PBKDF2 (registro guarda `passwordHash`+`salt`; login verifica y migra legacy plaintext). Sin embargo, no hay verificación de fuerza de contraseña o políticas UX adicionales.

- RF05: Logout y expiración
  - Implementado: `saveLogin` guarda token + `expires` (24h), `loadLogin` invalida sesión si expiró; `logout()` limpia `login`.
  - UI: Botón `Logout` añadido en `app.component` header, con navegación a `/login`.

- RF06: Hashing PBKDF2
  - Implementado: `hashPassword()` y `verifyPassword()` en `StorageService` (Web Crypto PBKDF2, 100000 iter, SHA-256, 256-bit derive). Migración de contraseñas legadas al primer login correcto implementada.

- RF07: Secure storage en móvil
  - Implementado: `StorageService` usa `@aparajita/capacitor-secure-storage` 8.0.1 para `login`, perfiles y claves sensibles.
  - Verificado: `npx cap sync android` registra el plugin en Android. Los datos antiguos de SQLite se migran una sola vez al almacenamiento seguro.

- RF08: PWA / Service Worker
  - Implementado: `@angular/service-worker` agregado y `ngsw-config.json`, `manifest.webmanifest` y cambios en `main.ts` y `angular.json` aplicados.

- RF09: PDF generación
  - Implementado: `jspdf` está presente y páginas de certificados generan PDFs según trabajo previo.

- RF10: VTT subtítulos
  - Parcial: Soporte y assets esporádico; no hay una integración E2E completa ni tests de reproducción definidos.

- RF11: Sincronización remota
  - Implementada y validada: `ApiService` usa el API REST de Supabase con
    `apiUrl`, clave pública y `remoteSyncEnabled`.
  - La aplicación conserva el comportamiento local/offline si no existe
    conectividad.
  - El esquema está en `supabase/schema.sql`; la autenticación remota todavía
    no está implementada.

- RF12: Pruebas
  - Parcial: No hay suite E2E completa; hay builds unitarias y la app compila en dev/prod.


Elementos faltantes (priorizados)
---------------------------------
1. Integración nativa de almacenamiento seguro (ALTA)
   - Estado: Completada con `@aparajita/capacitor-secure-storage` 8.0.1 y sincronizada con Android.
   - Resultado: `StorageService` persiste `login` y claves sensibles en Keychain/Keystore en lugar de la tabla SQLite.

2. Validación backend / migración centralizada (ALTA)
   - Estado: Autenticación es 100% local; no hay servidor de auth ni revocación de tokens.
   - Recomendación: Implementar API de autenticación y migrar a tokens firmados (JWT) con refresh tokens y revocación.

3. Manejo de contraseñas y políticas (MEDIO)
   - Estado: Solo hashing client-side y migración. No hay password strength UI ni recovery/reset flows.
   - Recomendación: Añadir validación de contraseña, confirmación, y flujo de recuperación (email o reset mediante backend).

4. Pruebas E2E y automatizadas (MEDIO)
   - Estado: No hay pruebas integrales.
   - Recomendación: Añadir Playwright/E2E que cubran: registro, login, migración, logout, offline que encola y flush a reconexión, generación de PDF.

5. Pruebas multimedia / VTT (BAJA-MEDIA)
   - Estado: pendiente inspección e integración completa.

6. UX de logout (BAJA)
   - Estado: botón añadido; falta confirmación opcional y posicionamiento en menú lateral.

7. Hardening y seguridad adicional (ALTA)
   - Estado: hashing en cliente es útil pero no suficiente. Riesgos: XSS puede exfiltrar `localStorage`. Recomendaciones: CSP, evitar tokens en localStorage, usar httpOnly cookies for web or secure keystore for mobile.


Riesgos críticos
----------------
- Dependencia del plugin de secure storage no instalada (imposibilita protección de tokens en móviles).
- Autenticación local únicamente: riesgo de control y pérdida de usuarios si el dispositivo se pierde.
- Corregido: el plugin de almacenamiento seguro se importa de forma estática y no se usa `eval('import')`.


Siguientes pasos recomendados (acciónable)
-----------------------------------------
1. Elegir e instalar el plugin de secure storage compatible con Capacitor en tu entorno y ejecutar `npx cap sync`.
2. Ejecutar pruebas manuales (ve sección de pruebas abajo).
3. Planear migración a autenticación server-side (mínimo: endpoints `/auth/login`, `/auth/register`, `/auth/refresh`).
4. Añadir pruebas E2E con Playwright o Cypress.
5. Diseñar autenticación remota, autorización e idempotencia antes de activar Supabase para producción.


Archivos clave modificados
-------------------------
- `src/app/services/storage.service.ts` (persistencia, hashing, secure storage helpers)
- `src/app/pages/register/register.page.ts` (registro con hashing)
- `src/app/pages/login/login.page.ts` (login + verificación + migración)
- `src/app/app.component.html` (botón logout)
- `src/app/app.component.ts` (logout logic)
- `package.json` (dependencia tentativa añadida)


Dónde encontrar este informe
---------------------------
- `docs/implementation-gap-report.md` (este archivo)


Fin del informe.
