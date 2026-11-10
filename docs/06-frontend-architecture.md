# 06 - Frontend Architecture

# Arquitectura Frontend de OVA Nequi

## Introducción

Este documento describe detalladamente la arquitectura frontend del proyecto OVA Nequi.

El frontend fue desarrollado utilizando Angular 20 e Ionic 8 bajo el modelo Standalone Components, eliminando la necesidad de módulos Angular tradicionales y facilitando la escalabilidad de la aplicación.

---

# Tecnologías Utilizadas

## Framework Principal

```text
Angular 20
```

### Responsabilidades

- Componentes.
- Routing.
- Inyección de dependencias.
- Renderizado.
- Gestión del ciclo de vida.

---

## Framework UI

```text
Ionic 8
```

### Responsabilidades

- Componentes visuales.
- Diseño responsive.
- Compatibilidad móvil.
- Integración con Capacitor.

---

## Lenguaje

```text
TypeScript 5.9
```

### Configuración

```text
Strict Mode activado
```

### Características Activas

- strict
- strictTemplates
- strictInjectionParameters
- noImplicitReturns
- noImplicitOverride

---

# Arquitectura Angular

OVA Nequi utiliza:

```text
Standalone Components
```

No existe:

```text
AppModule
```

La aplicación inicia mediante:

```typescript
bootstrapApplication(AppComponent)
```

en:

```text
src/main.ts
```

---

# Estructura Angular

```text
src/app
│
├── app.component
├── app.routes.ts
│
├── home
├── pages
└── services
```

---

# AppComponent

## Archivos

```text
app.component.ts
app.component.html
app.component.scss
```

### Responsabilidades

- Shell principal del sistema.
- Header global.
- Estado de conectividad.
- Logout.
- Toasts globales.
- Router principal.

---

# Sistema de Rutas

## Archivo

```text
app.routes.ts
```

---

## Estrategia

Angular utiliza:

```text
Lazy Loading
```

mediante:

```typescript
loadComponent()
```

Ejemplo:

```typescript
loadComponent: () =>
import('./pages/login/login.page')
```

### Beneficios

- Menor tiempo de carga inicial.
- Mejor rendimiento.
- Escalabilidad.

---

# Rutas Principales

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

# Dashboard Principal

## Componente

```text
HomePage
```

### Responsabilidades

- Bienvenida.
- Acceso a funcionalidades.
- Aplicación de configuración.
- Navegación principal.

---

# Arquitectura por Páginas

Cada funcionalidad de negocio se encuentra dentro de:

```text
src/app/pages
```

Las páginas utilizan:

```text
TypeScript
HTML
SCSS
```

como separación de responsabilidades.

---

# Módulo Login

### Responsabilidades

- Verificación de credenciales.
- Validación de usuario.
- Inicio de sesión.

### Archivos

```text
login.page.ts
login.page.html
login.page.scss
```

---

# Módulo Registro

### Responsabilidades

- Registro de usuarios.
- Configuración inicial.
- Hashing inicial.

### Archivos

```text
register.page.ts
register.page.html
register.page.scss
```

---

# Módulo Configuración

### Responsabilidades

- Modo oscuro.
- Tamaño de texto.
- Persistencia de preferencias.

### Archivos

```text
configuracion.page.*
```

---

# Módulo Enviar Dinero

### Responsabilidades

- Guía educativa.
- Evaluación mediante quiz.
- Cálculo de puntaje.
- Actualización de progreso.

---

# Módulo Recibir Pagos

### Responsabilidades

- Actividad Drag & Drop.
- Historial de resultados.
- Evaluación de conocimientos.

---

# Módulo Pagar Servicios

### Responsabilidades

- Crucigrama.
- Sopa de letras.
- Sistema de puntuación.
- Historial académico.

---

# Simulaciones

### Responsabilidades

- Simulación de transferencias.
- Persistencia de resultados.
- Actualización de progreso.

---

# Encuestas

### Responsabilidades

- Retroalimentación.
- Persistencia local.
- Actualización académica.

---

# Progreso

### Responsabilidades

- Consolidación de progreso.
- Métricas académicas.
- Estado por módulo.

---

# Certificados

### Responsabilidades

- Validación de finalización.
- Generación PDF.
- Descarga Android.
- Impresión.

---

# Arquitectura Visual

La aplicación utiliza un sistema visual reutilizable.

### Componentes Visuales Compartidos

```text
hero-card
page-card
status-note
section-heading
section-chip
feedback-card
back-button
```

---

# Sistema de Diseño

Cada módulo educativo posee identidad visual propia.

## Enviar Dinero

```text
Paleta Azul
```

---

## Recibir Pagos

```text
Paleta Verde / Turquesa
```

---

## Pagar Servicios

```text
Paleta Morado / Azul
```

---

# Estilos Globales

## Archivo

```text
src/global.scss
```

### Responsabilidades

- Variables globales.
- Tipografía.
- Componentes compartidos.
- Accesibilidad.

---

# Responsividad

La aplicación soporta:

```text
Móvil
Tablet
Desktop
```

### Breakpoints principales

```text
480px
768px
```

---

# Accesibilidad

Características implementadas:

- Skip Link.
- ARIA Labels.
- Alto contraste.
- Ajuste de texto.
- Modo oscuro.
- Subtítulos VTT.

---

# Assets Frontend

```text
shapes.svg
spanish-subtitles.vtt
favicon.png
```

---

# Integración con Servicios

La capa visual utiliza principalmente:

```text
StorageService
```

como punto central de persistencia.

Además:

```text
NetworkService
```

para conectividad.

Y:

```text
ApiService
```

para sincronización remota.

---

# Testing Frontend

### Frameworks

```text
Jasmine
Karma
Angular TestBed
```

### Estado Actual

```text
Pruebas básicas de inicialización.
```

### Pendiente

```text
Pruebas funcionales completas.
```

---

# Conclusiones

La arquitectura frontend de OVA Nequi se basa en:

- Angular Standalone.
- Componentes desacoplados.
- Lazy Loading.
- Diseño responsive.
- Accesibilidad.
- Persistencia local.
- Experiencia Offline First.

La estructura actual permite escalar nuevas funcionalidades sin modificar significativamente la arquitectura base existente.