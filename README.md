# OVA Nequi

## Descripción General

OVA Nequi es un Objeto Virtual de Aprendizaje (OVA) accesible, interactivo y multimedia diseñado para facilitar el aprendizaje y uso autónomo de la aplicación financiera Nequi por parte de personas adultas mayores con discapacidad auditiva.

El proyecto fue concebido como una herramienta de inclusión digital y financiera que busca reducir barreras tecnológicas mediante actividades prácticas, recursos visuales, simulaciones, contenido accesible y mecanismos de seguimiento académico.

Aunque el público objetivo principal corresponde a personas adultas mayores con discapacidad auditiva, la plataforma puede ser utilizada por cualquier persona interesada en aprender el uso seguro de Nequi a través de una experiencia guiada y accesible.

---

# Objetivo General

Diseñar e implementar un Objeto Virtual de Aprendizaje accesible, interactivo y multimedia que facilite a la población adulta mayor con discapacidad auditiva el aprendizaje y uso autónomo de la aplicación financiera Nequi mediante recursos visuales, actividades prácticas, simulaciones y mecanismos de evaluación adaptados a sus necesidades de accesibilidad.

---

# Público Objetivo

## Público Principal

Personas adultas mayores con discapacidad auditiva interesadas en aprender el uso de Nequi de manera autónoma.

## Público Secundario

La plataforma también puede ser utilizada por:

- Usuarios generales de Nequi.
- Personas interesadas en educación financiera digital.
- Instituciones educativas.
- Centros de apoyo a población con discapacidad.
- Familiares y cuidadores.



# Funcionalidades Principales

## Gestión de Usuarios

- Registro.
- Login.
- Logout.
- Expiración automática de sesión.
- Persistencia de sesión.

## Seguridad

- Hashing PBKDF2.
- SHA-256.
- Salt Aleatorio.
- Migración de contraseñas heredadas.

## Configuración

- Modo oscuro.
- Ajuste de tamaño de texto.
- Preferencias persistentes.

## Formación

- Enviar Dinero.
- Recibir Pagos.
- Pagar Servicios.
- Simulación práctica.
- Encuesta.
- Seguimiento de progreso.
- Certificados PDF.

## Persistencia

- LocalStorage.
- SQLite.
- Secure Storage nativo para credenciales móviles.

## Sincronización remota con Supabase

La aplicación conserva los datos localmente y también puede sincronizarlos con
Supabase. El modo local/offline sigue funcionando aunque el servicio remoto no
esté disponible. En la configuración vigente del proyecto, la sincronización
remota está habilitada para el proyecto gratuito `ova-nequi`.

Para activarla:

1. Crea un proyecto gratuito en Supabase.
2. Ejecuta [`supabase/schema.sql`](./supabase/schema.sql) en el SQL Editor.
3. Usa `https://TU_PROYECTO.supabase.co/rest/v1` como `apiUrl` y copia la clave pública `anon` en los archivos de entorno.
4. Cambia `remoteSyncEnabled` a `true` en ambos entornos.
5. Ejecuta las pruebas, sincroniza Capacitor y genera nuevamente la APK.

La clave `service_role` nunca debe incluirse en la aplicación. La integración
sincroniza encuestas, simulaciones y certificados; el login continúa siendo
local hasta implementar autenticación remota.

Cada operación se guarda primero localmente. Los botones se bloquean durante el
envío y el servicio evita sincronizaciones concurrentes para impedir registros
duplicados por doble clic, reconexiones simultáneas o eventos repetidos de red.
- Arquitectura preparada para Secure Storage.

## Offline First

- Cola de sincronización.
- Persistencia local.
- Recuperación tras reconexión.

## Plataformas

- Web.
- Android.
- Docker.

---

# Tecnologías

## Frontend

- Angular 20
- Ionic 8
- TypeScript 5.9
- RxJS

## Móvil

- Capacitor 8
- Android

## Persistencia

- SQLite
- LocalStorage

## Seguridad

- PBKDF2
- SHA-256
- Web Crypto API

## Infraestructura

- Docker
- Docker Compose
- Nginx

## Testing

- Jasmine
- Karma
- Angular TestBed

---

# Inclusión y Accesibilidad

OVA Nequi incorpora mecanismos de accesibilidad orientados principalmente a personas adultas mayores con discapacidad auditiva.

Características implementadas:

- Subtítulos VTT.
- Ajuste de tamaño de texto.
- Modo oscuro.
- Alto contraste.
- Etiquetas ARIA.
- Skip Links.
- Diseño responsive.
- Navegación accesible.

Estos elementos buscan reducir la dependencia de contenido exclusivamente auditivo durante el aprendizaje.



# Arquitectura General

```text
Usuario
    │
    ▼
Angular + Ionic
    │
    ▼
StorageService
    │
    ├── LocalStorage
    ├── SQLite
    └── Secure Storage (Android/iOS)
    │
    ▼
Offline Queue
    │
    ▼
ApiService
    │
    ▼
Supabase REST (opcional)
```

---

# Documentación del Proyecto

Toda la documentación técnica se encuentra en:

```text
docs/
```

## Punto de Inicio

```text
docs/00-documentation-index.md
```

## Resumen Ejecutivo

```text
docs/01-executive-summary.md
```

## Contexto del Negocio

```text
docs/02-business-context.md
```

## Requisitos Funcionales

```text
docs/03-functional-requirements.md
```

## Arquitectura

```text
docs/04-system-architecture.md
```

## Inventario del Repositorio

```text
docs/05-repository-inventory.md
```

## Arquitectura Frontend

```text
docs/06-frontend-architecture.md
```

## Arquitectura de Servicios

```text
docs/07-services-architecture.md
```

## Persistencia

```text
docs/08-storage-and-database.md
```

## Offline First

```text
docs/09-offline-first-strategy.md
```

## Seguridad

```text
docs/10-security-architecture.md
```

## Módulos Funcionales

```text
docs/11-modules-detailed.md
```

## Flujos de Usuario

```text
docs/12-user-flows.md
```

## PWA

```text
docs/13-pwa-architecture.md
```

## Android

```text
docs/14-android-platform.md
```

## Docker

```text
docs/15-docker-deployment.md
```

## Testing

```text
docs/16-testing-strategy.md
```

## Deuda Técnica

```text
docs/17-known-issues-and-tech-debt.md
```

## Roadmap

```text
docs/18-roadmap.md
```

## Historial de Cambios

```text
docs/19-change-history.md
```

## Desarrollo

```text
docs/20-development-guide.md
```

## API

```text
docs/21-api-reference.md
```

## Referencia de Persistencia

```text
docs/22-storage-reference.md
```

## Mantenimiento

```text
docs/23-maintenance-guide.md
```

## CI/CD

```text
docs/24-ci-cd-strategy.md
```

## Auditoría

```text
docs/25-audit-report.md
```

---

# Ejecución Local

## Instalar Dependencias

```bash
npm install
```

## Desarrollo

```bash
npm run start
```

o

```bash
ng serve
```

---

# Producción

```bash
ng build --configuration production
```

---

# Docker

## Build

```bash
docker build -t ova-nequi .
```

## Ejecución

```bash
docker compose up -d
```

Acceso:

```text
http://localhost:8080
```

---

# Android

```bash
ng build --configuration production
npx cap copy android
npx cap sync
npx cap open android
```

---

# Estado Actual

## Implementado

✅ Registro

✅ Login

✅ Configuración

✅ Accesibilidad

✅ Módulos Educativos

✅ Simulación

✅ Encuesta

✅ Progreso

✅ Certificados PDF

✅ Android

✅ Docker

✅ Offline First

✅ Accesibilidad orientada a personas con discapacidad auditiva.

✅ Subtítulos VTT.

✅ Navegación accesible.

✅ Ajuste de tamaño de texto.

✅ Modo oscuro.



## Estado actual y pendientes

✅ Backend remoto Supabase Free configurado y validado

✅ Secure Storage nativo operativo

✅ PWA habilitada en build de producción

⚠️ CI/CD

⚠️ SonarQube

⚠️ Pruebas E2E

✅ Proyecto Supabase Free configurado y validado

✅ Sincronización online y offline validada

✅ Protección contra registros duplicados

---

# Autor

**Gustavo Adolfo Forero Forero**

Politécnico Grancolombiano

Proyecto Académico OVA Nequi

---

# Rama de Referencia

```text
feature/entrega-semana3-docker
```