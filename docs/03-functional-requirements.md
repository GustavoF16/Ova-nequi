# 03 - Functional Requirements

# Requisitos Funcionales del Sistema

# Introducción

Este documento describe los requisitos funcionales implementados y planificados para OVA Nequi.

Los requisitos fueron definidos considerando el objetivo principal del proyecto:

> Diseñar e implementar un Objeto Virtual de Aprendizaje (OVA) accesible, interactivo y multimedia que facilite a la población adulta mayor con discapacidad auditiva el aprendizaje y uso autónomo de la aplicación bancaria Nequi.

El sistema utiliza estrategias pedagógicas, recursos visuales, actividades interactivas, simulaciones, mecanismos de accesibilidad y seguimiento académico para apoyar procesos de inclusión financiera y digital.

Aunque la solución fue concebida principalmente para personas adultas mayores con discapacidad auditiva, la plataforma también puede ser utilizada por cualquier usuario interesado en aprender el uso seguro de Nequi mediante una experiencia guiada y accesible.

---

# Alcance Funcional

# Enfoque de Accesibilidad

La definición de requisitos funcionales considera la necesidad de proporcionar una experiencia educativa accesible para usuarios con discapacidad auditiva.

Para cumplir este objetivo, el sistema incorpora:

- Subtítulos VTT para contenidos multimedia.
- Contenido visual complementario.
- Ajuste de tamaño de texto.
- Modo oscuro.
- Contraste visual mejorado.
- Navegación accesible mediante teclado.
- Etiquetas ARIA.
- Skip Link para accesibilidad.

Estos elementos permiten reducir la dependencia de contenido exclusivamente auditivo durante el proceso de aprendizaje.

---

# RF01 - Persistencia Local

## Descripción

El sistema debe almacenar información localmente para permitir continuidad de uso.

## Entradas

- Usuarios.
- Configuración.
- Progreso.
- Simulaciones.
- Encuestas.
- Certificados.

## Salidas

Información persistida.

## Implementación

- LocalStorage (Web).
- SQLite (Android).

## Estado

✅ Implementado

---

# RF02 - Sincronización Offline

## Descripción

El sistema debe permitir registrar actividades cuando no existe conectividad.

## Entradas

- Encuestas.
- Simulaciones.
- Certificados.

## Salidas

Operaciones pendientes.

## Implementación

```text
pendingSyncQueue
```

## Estado

✅ Implementado

---

# RF03 - Progreso Académico

## Descripción

El sistema debe registrar el avance individual del usuario.

## Componentes Evaluados

```text
sendMoney
receivePayments
payServices
simulation
survey
certificate
```

## Resultado

```text
overallProgress
```

## Estado

✅ Implementado

---

# RF04 - Registro de Usuarios

## Descripción

Permitir crear nuevos usuarios.

## Datos Requeridos

- Nombre.
- Apellido.
- Cédula.
- Correo.
- Contraseña.

## Resultado

Creación exitosa del perfil.

## Estado

✅ Implementado

---

# RF05 - Inicio de Sesión

## Descripción

Permitir autenticación local.

## Validaciones

- Existencia de usuario.
- Verificación de contraseña.
- Integridad del hash.

## Resultado

Acceso al sistema.

## Estado

✅ Implementado

---

# RF06 - Gestión de Sesión

## Descripción

Controlar sesiones activas.

## Funcionalidades

- Login.
- Logout.
- Expiración automática.

## Duración

```text
24 horas
```

## Estado

✅ Implementado

---

# RF07 - Hashing de Contraseñas

## Descripción

Proteger credenciales mediante algoritmos criptográficos.

## Implementación

```text
PBKDF2
SHA-256
100000 iteraciones
Salt aleatorio
```

## Estado

✅ Implementado

---

# RF08 - Configuración de Accesibilidad

## Descripción

Permitir personalizar la interfaz para personas con necesidades específicas de accesibilidad.

## Funcionalidades

### Modo Oscuro

Permitir alternar entre:

```text
Claro
Oscuro
```

### Tamaño de Texto

Permitir:

```text
Pequeño
Medio
Grande
```

## Estado

✅ Implementado

---

# RF09 - Módulo Enviar Dinero

## Descripción

Enseñar el proceso seguro de envío de dinero.

## Actividades

- Guía educativa.
- Quiz interactivo.

## Resultados

- Puntaje.
- Progreso académico.

## Estado

✅ Implementado

---

# RF10 - Módulo Recibir Pagos

## Descripción

Enseñar la recepción segura de pagos.

## Actividades

- Drag & Drop.

## Resultados

- Historial.
- Puntaje.
- Progreso.

## Estado

✅ Implementado

---

# RF11 - Módulo Pagar Servicios

## Descripción

Enseñar el proceso de pago digital de servicios.

## Actividades

- Crucigrama.
- Sopa de letras.

## Resultados

- Historial.
- Score.
- Progreso.

## Estado

✅ Implementado

---

# RF12 - Simulaciones

## Descripción

Permitir práctica controlada del uso de Nequi.

## Datos

- Número celular.
- Monto.

## Resultado

Simulación almacenada.

## Estado

✅ Implementado

---

# RF13 - Encuestas

## Descripción

Recoger retroalimentación de aprendizaje.

## Resultado

- Respuestas almacenadas.
- Actualización de progreso.

## Estado

✅ Implementado

---

# RF14 - Seguimiento Académico

## Descripción

Mostrar el avance académico del usuario.

## Funcionalidades

- Estado por módulo.
- Porcentaje de avance.
- Indicadores visuales.

## Estado

✅ Implementado

---

# RF15 - Certificados

## Descripción

Emitir certificados de finalización.

## Requisitos

Completar:

```text
sendMoney
receivePayments
payServices
simulation
survey
```

## Funcionalidades

- Vista previa.
- Persistencia.
- PDF.
- Impresión.

## Estado

✅ Implementado

---

# RF16 - Inclusión y Accesibilidad

## Descripción

El sistema debe proporcionar una experiencia educativa accesible para personas adultas mayores con discapacidad auditiva y otros usuarios con necesidades de accesibilidad similares.

## Objetivo

Reducir barreras cognitivas, sensoriales y tecnológicas durante el proceso de aprendizaje del uso de Nequi.

## Funcionalidades Implementadas

### Subtítulos VTT

Soporte para reproducción de contenidos educativos con subtítulos.

### Ajuste de Tamaño de Texto

Permite adaptar la lectura según las necesidades del usuario.

Opciones disponibles:

```text
Pequeño
Medio
Grande
```

### Modo Oscuro

Permite mejorar la comodidad visual.

### Contraste Mejorado

Uso de estilos visuales orientados a legibilidad.

### Navegación Accesible

Implementación de:

- ARIA Labels.
- Skip Link.
- Estructura semántica.

### Diseño Responsive

Compatible con:

```text
Móvil
Tablet
Desktop
```

## Beneficios

- Mayor independencia del usuario.
- Aprendizaje autónomo.
- Inclusión digital.
- Inclusión financiera.
- Mejor comprensión de procesos financieros digitales.

## Estado

✅ Implementado parcialmente.

### Pendiente

- Integración completa de Lengua de Señas Colombiana (LSC).
- Mayor cantidad de contenidos multimedia accesibles.
- Evaluación formal de cumplimiento WCAG.

# RF17 - Android

## Descripción

Ejecutar la aplicación en dispositivos móviles Android.

## Funcionalidades

- SQLite.
- Certificados PDF.
- Persistencia local.
- Acceso móvil.

## Estado

✅ Implementado

---

# RF18 - Docker

## Descripción

Permitir despliegue mediante contenedores.

## Funcionalidades

- Build Angular.
- Nginx.
- Docker Compose.

## Estado

✅ Implementado

---

# RF19 - PWA

## Descripción

Permitir instalación como aplicación web progresiva.

## Componentes Existentes

- Manifest.
- Service Worker.
- Iconos.

## Estado

⚠️ Parcialmente implementado

---

# RF20 - Backend Remoto

## Descripción

Permitir sincronización con servicios remotos.

## Endpoints Esperados

```text
/auth
/survey
/simulation
/certificate
```

## Estado

⚠️ Pendiente

---

# Matriz Resumen

| Requisito | Estado |
|------------|---------|
| RF01 Persistencia | ✅ |
| RF02 Offline Queue | ✅ |
| RF03 Progreso | ✅ |
| RF04 Registro | ✅ |
| RF05 Login | ✅ |
| RF06 Sesiones | ✅ |
| RF07 Hashing | ✅ |
| RF08 Configuración | ✅ |
| RF09 Enviar Dinero | ✅ |
| RF10 Recibir Pagos | ✅ |
| RF11 Pagar Servicios | ✅ |
| RF12 Simulación | ✅ |
| RF13 Encuestas | ✅ |
| RF14 Progreso | ✅ |
| RF15 Certificados | ✅ |
| RF16 Accesibilidad | ✅ Parcial |
| RF17 Android | ✅ |
| RF18 Docker | ✅ |
| RF19 PWA | ⚠️ Parcial |
| RF20 Backend | ⚠️ Pendiente |

---

# Relación con los Objetivos del Proyecto

Los requisitos funcionales definidos en este documento fueron construidos para apoyar directamente los objetivos académicos y sociales de OVA Nequi.

La combinación de:

- Módulos educativos.
- Simulaciones.
- Encuestas.
- Seguimiento académico.
- Certificados.
- Mecanismos de accesibilidad.

permite que el sistema contribuya al aprendizaje autónomo del uso de Nequi en personas adultas mayores con discapacidad auditiva y otros grupos interesados en educación financiera digital.



# Conclusión

OVA Nequi cumple actualmente la mayoría de los requisitos funcionales definidos para una plataforma educativa financiera accesible.

Los requisitos pendientes se concentran principalmente en:

- Backend remoto.
- PWA completa.
- Secure Storage.
- Integración continua.
- Seguridad avanzada.