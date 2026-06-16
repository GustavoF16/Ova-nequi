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
  - Parcial: Cola de pendientes (`pendingSyncQueue`) y `flushPendingSyncQueue()` implementadas; `ApiService` scaffold existe.

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
  - Parcial/Preparado: Código agregado en `StorageService` para usar un plugin de secure storage (helpers `secureSet`/`secureGet` y `shouldUseSecureStorage()`).
  - NOTA: El plugin no se instaló en el entorno (npm devuelve 404). Por eso, la integración nativa aún no está operativa en dispositivo.

- RF08: PWA / Service Worker
  - Implementado: `@angular/service-worker` agregado y `ngsw-config.json`, `manifest.webmanifest` y cambios en `main.ts` y `angular.json` aplicados.

- RF09: PDF generación
  - Implementado: `jspdf` está presente y páginas de certificados generan PDFs según trabajo previo.

- RF10: VTT subtítulos
  - Parcial: Soporte y assets esporádico; no hay una integración E2E completa ni tests de reproducción definidos.

- RF11: Sincronización remota
  - Parcial: `ApiService` existe como scaffold; llamadas en `flushPendingSyncQueue()` usan `apiService.*` con `catchError` y fallback local; falta asegurar endpoints reales, auth token usage y manejo de colisiones/duplicados.

- RF12: Pruebas
  - Parcial: No hay suite E2E completa; hay builds unitarias y la app compila en dev/prod.


Elementos faltantes (priorizados)
---------------------------------
1. Integración nativa de almacenamiento seguro (ALTA)
   - Estado: Código preparado, pero el plugin no está instalado (npm 404). Necesita que el equipo instale y sincronice un plugin soportado (por ejemplo: `@capacitor-community/secure-storage` si está disponible, o una alternativa como `cordova-plugin-secure-storage-echo`) y ejecutar `npx cap sync`.
   - Resultado esperado: `StorageService` persiste `login` y claves sensibles en Keychain/Keystore en lugar de tabla SQLite / localStorage.

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
- Uso de `eval('import')` para import dinámico puede generar warnings y problemas con bundlers; su uso es temporal hasta que el plugin sea instalado y/o el patrón de import sea estabilizado.


Siguientes pasos recomendados (acciónable)
-----------------------------------------
1. Elegir e instalar el plugin de secure storage compatible con Capacitor en tu entorno y ejecutar `npx cap sync`.
2. Ejecutar pruebas manuales (ve sección de pruebas abajo).
3. Planear migración a autenticación server-side (mínimo: endpoints `/auth/login`, `/auth/register`, `/auth/refresh`).
4. Añadir pruebas E2E con Playwright o Cypress.
5. Remover el `eval('import')` después de integrar plugin y ajustar imports estáticos o wrappers con tipos.


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
