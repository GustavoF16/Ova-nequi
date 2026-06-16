# Ova-nequi

Aplicación híbrida Ionic/Angular para el proyecto Ova Nequi.

## Resumen

Esta aplicación implementa:

- Registro y login local con persistencia en `localStorage` (web) o SQLite (nativo).
- Logout y sesión con expiración automática (24h).
- Hashing de contraseñas cliente mediante PBKDF2 + SHA-256.
- Progreso por usuario y por módulo.
- Cola de sincronización offline para encuestas, simulaciones y certificados.
- PWA con service worker y manifiesto web.
- Generación de certificados/PDF.

## Estado actual

### Implementado

- Persistencia local unificada: `StorageService` abstrae `localStorage` en web y SQLite en nativo.
- Login/logout: `StorageService` guarda sesión y expira automáticamente tras 24 horas.
- Hashing de contraseñas: `hashPassword()` y `verifyPassword()` usan Web Crypto PBKDF2.
- Migración de contraseñas legadas: si un usuario existente tiene contraseña en texto plano, se migra al primer login exitoso.
- Progreso por módulo: `saveModuleProgressForCurrentUser()` y `loadAllModuleProgressForCurrentUser()`.
- Botón de logout en el header global.
- PWA: `@angular/service-worker`, `ngsw-config.json`, y `manifest.webmanifest`.

### Pendiente / por mejorar

- Integración nativa de almacenamiento seguro en móvil: el plugin aún no se instaló en este entorno porque el paquete npm no estaba disponible.
- Autenticación server-side y gestión de tokens remotos.
- Pruebas E2E completas.
- Validación de contraseñas (requisitos de fuerza, confirmación, recuperación).
- Implementación de subtítulos VTT completa.

## Archivos clave

- `src/app/services/storage.service.ts`
- `src/app/pages/register/register.page.ts`
- `src/app/pages/login/login.page.ts`
- `src/app/app.component.ts`
- `docs/implementation-gap-report.md`
- `docs/testing-instructions.md`

## Cómo probar

### Web

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run start
```

3. Abrir `http://localhost:4200`.

4. Probar los flujos de registro/login, logout y progreso por módulo.

### Producción web

```bash
npx ng build --configuration production
```

### Android

1. Construir la app web en producción:

```bash
npx ng build --configuration production
```

2. Copiar assets a Capacitor:

```bash
npx cap copy android
```

3. Abrir en Android Studio:

```bash
npx cap open android
```

4. Ejecutar en emulador o dispositivo.

## Nota sobre secure storage

El código ya incluye preparación para usar un plugin de almacenamiento seguro en móvil, pero el paquete npm no se consiguió instalar en este entorno. Si deseas finalizarlo, instala un plugin compatible y ejecuta `npx cap sync`.

## Commits recientes

- `feat: add logout UI, session expiry, client PBKDF2 hashing; prepare secure-storage integration`
- `chore: commit remaining docs change to ensure branch is complete`

## Git remoto

Se subió la rama `feature/persistence-unificada` al remoto `https://github.com/GustavoF16/Ova-nequi`.
