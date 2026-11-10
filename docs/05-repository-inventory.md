# 05 - Repository Inventory

# Inventario Completo del Repositorio

## Introducción

Este documento describe la estructura completa del repositorio OVA Nequi y la responsabilidad de cada carpeta y archivo principal.

Su objetivo es servir como guía de mantenimiento, referencia técnica y punto de partida para futuras mejoras.

---

# Estructura General

```text
OVA-NEQUI
│
├── android/
├── docs/
├── public/
├── src/
│
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── angular.json
├── package.json
├── package-lock.json
├── capacitor.config.ts
├── ionic.config.json
├── tsconfig.json
├── karma.conf.js
│
└── README.md
```

---

# Carpeta src

Contiene todo el código fuente principal de la aplicación.

```text
src/
│
├── app/
├── assets/
├── environments/
├── theme/
│
├── global.scss
├── main.ts
├── polyfills.ts
├── test.ts
└── zone-flags.ts
```

---

# src/app

Contiene toda la lógica Angular de la aplicación.

```text
app/
│
├── home/
├── pages/
├── services/
│
├── app.component.*
└── app.routes.ts
```

---

# AppComponent

## Archivos

```text
app.component.ts
app.component.html
app.component.scss
app.component.spec.ts
```

## Responsabilidades

- Componente raíz.
- Header global.
- Logout.
- Estado de conectividad.
- Toasts.
- Router principal.

---

# app.routes.ts

## Responsabilidades

- Configuración de rutas.
- Lazy Loading de componentes.
- Navegación principal.

## Rutas Principales

```text
/login
/register
/home

/modulos
/enviar-dinero
/recibir-pagos
/pagar-servicios

/simulaciones
/encuestas
/progreso
/certificados
/configuracion
```

---

# Carpeta home

```text
home/
│
├── home.page.ts
├── home.page.html
├── home.page.scss
└── home.page.spec.ts
```

## Responsabilidades

- Dashboard principal.
- Acceso a funcionalidades.
- Bienvenida personalizada.
- Aplicación de configuración.

---

# Carpeta pages

Contiene todos los módulos funcionales del sistema.

---

# Login

## Carpeta

```text
pages/login/
```

## Responsabilidades

- Autenticación.
- Verificación de credenciales.
- Carga de sesión activa.

---

# Register

## Carpeta

```text
pages/register/
```

## Responsabilidades

- Registro de usuarios.
- Hashing inicial.
- Configuración de usuario.

---

# Configuración

## Carpeta

```text
pages/configuracion/
```

## Responsabilidades

- Modo oscuro.
- Tamaño de texto.
- Persistencia de preferencias.

---

# Módulos

## Carpeta

```text
pages/modulos/
```

## Responsabilidades

- Centro educativo principal.
- Video educativo.
- Subtítulos VTT.
- Acceso a módulos.

---

# Enviar Dinero

## Carpeta

```text
pages/enviar-dinero/
```

## Responsabilidades

- Guía educativa.
- Quiz interactivo.
- Calificación automática.
- Actualización de progreso.

---

# Recibir Pagos

## Carpeta

```text
pages/recibir-pagos/
```

## Responsabilidades

- Actividad Drag & Drop.
- Historial de intentos.
- Evaluación de conocimientos.

---

# Pagar Servicios

## Carpeta

```text
pages/pagar-servicios/
```

## Responsabilidades

- Crucigrama.
- Sopa de letras.
- Sistema de puntuación.
- Historial académico.

---

# Simulaciones

## Carpeta

```text
pages/simulaciones/
```

## Responsabilidades

- Simulación de transferencia.
- Persistencia local.
- Actualización de progreso.

---

# Encuestas

## Carpeta

```text
pages/encuestas/
```

## Responsabilidades

- Encuesta de retroalimentación.
- Persistencia local.
- Actualización de progreso.

---

# Progreso

## Carpeta

```text
pages/progreso/
```

## Responsabilidades

- Consolidar avance académico.
- Mostrar métricas por módulo.
- Calcular progreso global.

---

# Certificados

## Carpeta

```text
pages/certificados/
```

## Responsabilidades

- Validación de finalización.
- Generación PDF.
- Descarga Android.
- Impresión.

---

# Carpeta services

Contiene la capa principal de negocio.

```text
services/
│
├── api.service.ts
├── database.service.ts
├── network.service.ts
└── storage.service.ts
```

---

# StorageService

## Responsabilidades

- Usuarios.
- Sesiones.
- Hashing.
- Certificados.
- Encuestas.
- Simulaciones.
- Configuración.
- Offline Queue.
- Progreso académico.

---

# DatabaseService

## Responsabilidades

- SQLite.
- Creación de tablas.
- Operaciones CRUD.

## Tablas

```text
progreso
storage
```

---

# NetworkService

## Responsabilidades

- Detección Online/Offline.
- Observable global de conectividad.

---

# ApiService

## Responsabilidades

- Comunicación con API remota.
- Encuestas.
- Simulaciones.
- Certificados.

## Estado

```text
Preparado
Backend real pendiente
```

---

# Carpeta assets

```text
assets/
│
├── shapes.svg
├── spanish-subtitles.vtt
│
└── icon/
    └── favicon.png
```

## Responsabilidades

- Recursos gráficos.
- Subtítulos VTT.

---

# Carpeta environments

```text
environment.ts
environment.prod.ts
```

## Responsabilidades

- Configuración de entornos.

## Estado Actual

```text
https://example.com/api
```

---

# Carpeta theme

```text
variables.scss
```

## Responsabilidad

Configuración visual de Ionic.

## Estado

Configuración mínima.

---

# Carpeta public

```text
public/
│
├── manifest.webmanifest
│
└── icons/
```

## Responsabilidades

- Configuración PWA.
- Iconos de instalación.

---

# Carpeta docs

Documentación oficial del proyecto.

```text
docs/
```

Contiene:

- Executive Summary.
- Arquitectura.
- Inventario.
- Seguridad.
- Persistencia.
- Offline First.
- Android.
- Docker.
- Testing.
- Roadmap.

---

# Docker

## Dockerfile

### Responsabilidades

- Build Angular.
- Publicación Nginx.

---

## docker-compose.yml

### Responsabilidades

- Levantamiento de contenedores.

### Puertos

```text
8080
8081
```

---

# Android

## Carpeta android

Proyecto Android generado por Capacitor.

Incluye:

- AndroidManifest.
- MainActivity.
- Gradle.
- Resources.
- Splash Screen.

---

# Inventario Auditado

La estructura completa del proyecto fue auditada durante el proceso de documentación.

## Estado

✅ Arquitectura revisada.

✅ Funcionalidad revisada.

✅ Android revisado.

✅ Docker revisado.

✅ Documentación revisada.

✅ Persistencia revisada.

✅ Seguridad revisada.