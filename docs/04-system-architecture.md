# 04 - System Architecture

# Arquitectura del Sistema OVA Nequi

## Introducción

Este documento describe la arquitectura técnica completa del proyecto OVA Nequi, incluyendo los componentes de frontend, persistencia, seguridad, sincronización offline, infraestructura móvil y despliegue.

---

# Arquitectura General

OVA Nequi fue construido siguiendo una arquitectura cliente local con persistencia híbrida y estrategia Offline First.

La aplicación puede ejecutarse en:

- Navegadores web modernos.
- Android mediante Capacitor.
- Entornos Docker.

---

# Arquitectura Lógica

```text
Usuario
    │
    ▼
Angular 20 + Ionic 8
    │
    ▼
Pages / Components
    │
    ▼
Services Layer
    │
    ├── StorageService
    ├── NetworkService
    ├── DatabaseService
    └── ApiService
    │
    ▼
Persistencia
    │
    ├── LocalStorage
    ├── SQLite
    └── Secure Storage (Preparado)
    │
    ▼
Offline Sync Queue
    │
    ▼
Backend API (Pendiente)
```

---

# Arquitectura por Capas

## Capa de Presentación

Implementada mediante:

- Angular 20.
- Ionic 8.
- Standalone Components.

### Responsabilidades

- Interfaz gráfica.
- Navegación.
- Captura de información.
- Presentación de progreso.
- Generación de experiencia educativa.

### Archivos principales

```text
app.component
home.page

login.page
register.page

modulos.page
enviar-dinero.page
recibir-pagos.page
pagar-servicios.page

simulaciones.page
encuestas.page

progreso.page
certificados.page

configuracion.page
```

---

## Capa de Servicios

La lógica de negocio se encuentra centralizada en servicios reutilizables.

### StorageService

Responsabilidades:

- Gestión de usuarios.
- Login.
- Logout.
- Persistencia.
- Progreso académico.
- Historiales.
- Cola de sincronización.
- Configuración.
- Certificados.

Es el componente más importante del sistema.

---

### DatabaseService

Responsabilidades:

- Crear SQLite.
- Crear tablas.
- Ejecutar consultas.
- Guardar información local.

### Tablas

```text
progreso
storage
```

---

### NetworkService

Responsabilidades:

- Detectar conectividad.
- Notificar cambios Online/Offline.
- Informar al resto de componentes.

### Flujo

```text
navigator.onLine
      │
      ▼
BehaviorSubject
      │
      ▼
Componentes Angular
```

---

### ApiService

Responsabilidades:

- Encuestas.
- Simulaciones.
- Certificados.

Actualmente utiliza:

```text
https://example.com/api
```

como endpoint placeholder.

---

# Arquitectura de Persistencia

## Entorno Web

Persistencia mediante:

```text
LocalStorage
```

### Responsabilidades

- Usuarios.
- Login.
- Progreso.
- Configuración.
- Encuestas.
- Simulaciones.
- Certificados.

---

## Entorno Android

Persistencia mediante:

```text
SQLite
```

utilizando:

```text
@capacitor-community/sqlite
```

---

## Secure Storage

Actualmente existe soporte preparado para:

```text
secureSet()
secureGet()
```

pero todavía no existe un plugin instalado.

### Estado

```text
Preparado
No operativo
```

---

# Arquitectura Offline First

OVA Nequi fue diseñado para mantener operación incluso cuando no existe Internet.

## Concepto

Cuando el usuario pierde conectividad:

- Encuestas.
- Simulaciones.
- Certificados.

continúan funcionando.

---

## Cola de Sincronización

### Componente

```text
pendingSyncQueue
```

### Responsabilidad

- Almacenar operaciones pendientes.
- Reejecutarlas al recuperar conectividad.

---

## Flujo Offline

```text
Usuario
   │
   ▼
Guardar actividad
   │
   ▼
StorageService
   │
   ▼
pendingSyncQueue
```

---

## Flujo Online

```text
Conexión Recuperada
         │
         ▼
NetworkService
         │
         ▼
flushPendingSyncQueue()
         │
         ▼
ApiService
```

---

# Arquitectura de Seguridad

## Registro

Proceso:

```text
Contraseña
      │
      ▼
PBKDF2
      │
      ▼
SHA-256
      │
      ▼
Hash
```

---

## Hashing

Configuración:

```text
PBKDF2
SHA-256
100000 iteraciones
256 bits
```

---

## Salt

Cada usuario posee:

```text
Salt independiente
```

almacenado junto al hash.

---

## Validación

Proceso:

```text
Usuario
    │
    ▼
Password
    │
    ▼
verifyPassword()
    │
    ▼
Comparación Hash
```

---

# Arquitectura Académica

## Ruta de Aprendizaje

```text
Registro
   │
   ▼
Login
   │
   ▼
Módulos
   │
   ├── Enviar Dinero
   ├── Recibir Pagos
   └── Pagar Servicios
   │
   ▼
Simulación
   │
   ▼
Encuesta
   │
   ▼
Progreso
   │
   ▼
Certificado
```

---

## Seguimiento

Componentes evaluados:

```text
sendMoney
receivePayments
payServices
simulation
survey
certificate
```

---

# Arquitectura Android

## Capacitor

Versión:

```text
Capacitor 8
```

---

## Main Activity

```java
MainActivity extends BridgeActivity
```

No existen extensiones Android personalizadas.

---

## SDK

```text
minSdkVersion = 24
targetSdkVersion = 36
compileSdkVersion = 36
```

---

# Arquitectura Docker

## Build

```text
Angular Build
      │
      ▼
www/
      │
      ▼
Docker Image
      │
      ▼
Nginx
```

---

## Contenedor

Puerto interno:

```text
80
```

Puerto externo:

```text
8080
```

---

# PWA

Elementos existentes:

```text
manifest.webmanifest
ngsw-config.json
Service Worker
```

Estado actual:

```text
Parcialmente configurada
```

porque Angular tiene:

```json
"serviceWorker": false
```

en producción.

---

# Conclusiones

La arquitectura de OVA Nequi se basa en:

- Angular Standalone.
- Ionic.
- Capacitor.
- Persistencia híbrida.
- Offline First.
- Seguridad local mediante PBKDF2.
- Despliegue Docker.
- Compatibilidad Android.

La solución se encuentra preparada para futuras integraciones con:

- Backend.
- Secure Storage real.
- Jenkins.
- SonarQube.
- Pruebas E2E.
- CI/CD.