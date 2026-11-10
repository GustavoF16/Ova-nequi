# 01 - Executive Summary

# OVA Nequi

## Resumen Ejecutivo

OVA Nequi es un Objeto Virtual de Aprendizaje (OVA) accesible, interactivo y multimedia desarrollado utilizando Angular 20, Ionic 8 y Capacitor 8, cuyo propósito principal es facilitar el aprendizaje y uso autónomo de la aplicación financiera Nequi por parte de personas adultas mayores con discapacidad auditiva.

La plataforma fue concebida como una herramienta de inclusión digital y financiera que busca reducir las barreras tecnológicas mediante el uso de recursos visuales, actividades prácticas, simulaciones, contenidos accesibles y mecanismos de seguimiento académico.

Aunque el público objetivo principal corresponde a personas adultas mayores con discapacidad auditiva, la solución puede ser utilizada por cualquier persona interesada en aprender el uso seguro y adecuado de Nequi mediante una experiencia guiada, accesible e intuitiva.

La arquitectura del sistema fue diseñada bajo una estrategia Offline First, permitiendo que gran parte de sus funcionalidades continúen operando incluso cuando no existe conectividad a Internet.

Además de la experiencia web, OVA Nequi puede ejecutarse como aplicación Android mediante Capacitor y dispone de un entorno de despliegue basado en Docker y Nginx.

---

# Objetivo General

Diseñar e implementar un Objeto Virtual de Aprendizaje (OVA) accesible, interactivo y multimedia que facilite a la población adulta mayor con discapacidad auditiva el aprendizaje y uso autónomo de la aplicación financiera Nequi mediante actividades prácticas, recursos visuales accesibles, simulaciones y mecanismos de evaluación interactivos.

---

# Objetivos Específicos

- Enseñar el proceso de envío de dinero utilizando Nequi.
- Enseñar la recepción segura de pagos.
- Enseñar el proceso de pago de servicios digitales.
- Facilitar la comprensión de conceptos financieros básicos mediante contenido interactivo.
- Validar el aprendizaje mediante actividades prácticas.
- Registrar el progreso académico individual.
- Generar certificados de finalización.
- Permitir el uso offline mediante almacenamiento local.
- Implementar mecanismos básicos de protección de credenciales.
- Mantener compatibilidad web y móvil.
- Promover la inclusión financiera y digital.

---

# Problema que Aborda el Proyecto

Muchas personas adultas mayores con discapacidad auditiva enfrentan dificultades para utilizar aplicaciones financieras digitales debido a:

- Escasa alfabetización digital.
- Dependencia de terceros para realizar transacciones.
- Limitaciones de accesibilidad presentes en plataformas tecnológicas.
- Escasez de materiales educativos adaptados.
- Dificultades para comprender procedimientos financieros digitales.

Estas barreras reducen la autonomía financiera y limitan la participación de esta población en entornos digitales modernos.

OVA Nequi busca disminuir estas barreras proporcionando una experiencia de aprendizaje accesible y progresiva.

---

# Público Objetivo

## Público Principal

Personas adultas mayores con discapacidad auditiva interesadas en aprender a utilizar Nequi de forma autónoma.

Características generales:

- Conocimientos tecnológicos limitados.
- Necesidad de contenido visual accesible.
- Requerimientos de accesibilidad digital.
- Interés en gestionar operaciones financieras sin dependencia de terceros.

---

## Público Secundario

La plataforma también puede ser utilizada por:

- Usuarios generales de Nequi.
- Personas interesadas en educación financiera digital.
- Instituciones educativas.
- Centros de apoyo a población con discapacidad.
- Familiares y cuidadores.
- Estudiantes interesados en servicios financieros digitales.

---

# Alcance Actual

La aplicación actualmente incluye:

## Gestión de Usuarios

- Registro de usuarios.
- Inicio de sesión.
- Persistencia de sesión.
- Expiración automática de sesión.
- Cierre de sesión.

## Seguridad

- Hashing PBKDF2.
- SHA-256.
- Salt aleatorio por usuario.
- Migración automática desde contraseñas heredadas en texto plano.

## Configuración

- Modo oscuro.
- Ajuste de tamaño de texto.
- Preferencias persistentes por usuario.

## Formación

- Módulo Enviar Dinero.
- Módulo Recibir Pagos.
- Módulo Pagar Servicios.
- Simulación práctica.
- Encuesta de evaluación.
- Seguimiento de progreso.
- Certificados PDF.

## Persistencia

- LocalStorage para ejecución web.
- SQLite para ejecución móvil.
- Infraestructura preparada para Secure Storage.

## Offline First

- Cola local de sincronización.
- Persistencia automática.
- Recuperación de información tras reconexión.

## Plataforma

- Navegadores modernos.
- Android mediante Capacitor.
- Ejecución mediante Docker.
- Publicación mediante Nginx.

---

# Enfoque de Inclusión y Accesibilidad

OVA Nequi incorpora mecanismos orientados a mejorar la experiencia de aprendizaje de usuarios con discapacidad auditiva.

Características implementadas:

- Subtítulos VTT para contenidos multimedia.
- Ajuste dinámico del tamaño de texto.
- Modo oscuro.
- Contraste visual mejorado.
- Navegación accesible.
- Etiquetas ARIA.
- Skip Links.
- Diseño responsive.

Estos elementos reducen la dependencia de contenido exclusivamente auditivo durante el proceso de aprendizaje.

---

# Tecnologías Principales

## Frontend

- Angular 20
- Ionic 8
- TypeScript 5.9
- RxJS

## Plataforma Móvil

- Capacitor 8
- Android

## Persistencia

- SQLite
- LocalStorage

## Seguridad

- Web Crypto API
- PBKDF2
- SHA-256

## Infraestructura

- Docker
- Docker Compose
- Nginx

## Testing

- Karma
- Jasmine
- Angular TestBed

---

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
    ├── LocalStorage (Web)
    ├── SQLite (Android)
    └── Secure Storage (Preparado)
    │
    ▼
Offline Queue
    │
    ▼
ApiService
    │
    ▼
Backend (Pendiente de implementación)
```

---

# Estado Actual del Proyecto

## Implementado

✅ Registro

✅ Login

✅ Logout

✅ Seguridad PBKDF2

✅ Configuración de accesibilidad

✅ Modo oscuro

✅ Ajuste de tamaño de texto

✅ Enviar Dinero

✅ Recibir Pagos

✅ Pagar Servicios

✅ Simulación

✅ Encuesta

✅ Progreso académico

✅ Certificados PDF

✅ Persistencia Offline

✅ Android

✅ Docker

✅ SQLite

✅ Offline First

---

## Implementado Parcialmente

⚠️ Secure Storage móvil.

⚠️ PWA completa.

⚠️ Sincronización con backend real.

⚠️ CI/CD.

⚠️ Testing avanzado.

---

# Beneficios Técnicos

- Arquitectura Angular Standalone moderna.
- Compatibilidad Web y Android.
- Persistencia híbrida mediante LocalStorage y SQLite.
- Estrategia Offline First.
- Seguridad basada en PBKDF2 y SHA-256.
- Generación local de certificados PDF.
- Arquitectura preparada para backend futuro.
- Preparada para CI/CD y automatización futura.

---

# Estado de Madurez

| Componente | Estado |
|------------|---------|
| Frontend Angular | ✅ Completo |
| Módulos educativos | ✅ Completo |
| Seguridad local | ✅ Completo |
| Persistencia | ✅ Completa |
| Android | ✅ Completo |
| Docker | ✅ Completo |
| Offline First | ✅ Completo |
| Backend real | ⚠️ Pendiente |
| Secure Storage | ⚠️ Parcial |
| PWA completa | ⚠️ Parcial |
| CI/CD | ⚠️ Pendiente |

---

# Resultado Esperado

El usuario podrá:

1. Registrarse.
2. Iniciar sesión.
3. Aprender mediante módulos interactivos.
4. Realizar actividades prácticas.
5. Verificar su progreso.
6. Obtener un certificado de finalización.
7. Utilizar la aplicación incluso sin conectividad temporal.
8. Desarrollar independencia en el uso de servicios financieros digitales.

---

# Autor

**Gustavo Adolfo Forero Forero**

Politécnico Grancolombiano

Proyecto Académico OVA Nequi

---

# Documentación Relacionada

Consultar:

- `00-documentation-index.md`
- `02-business-context.md`
- `03-functional-requirements.md`
- `04-system-architecture.md`
- `05-repository-inventory.md`
- `06-frontend-architecture.md`
- `07-services-architecture.md`
- `08-storage-and-database.md`
- `09-offline-first-strategy.md`
- `10-security-architecture.md`
- `11-modules-detailed.md`
- `12-user-flows.md`
- `13-pwa-architecture.md`
- `14-android-platform.md`
- `15-docker-deployment.md`
- `16-testing-strategy.md`
- `17-known-issues-and-tech-debt.md`
- `18-roadmap.md`
- `19-change-history.md`
- `20-development-guide.md`
- `21-api-reference.md`
- `22-storage-reference.md`
- `23-maintenance-guide.md`
- `24-ci-cd-strategy.md`
- `25-audit-report.md`
