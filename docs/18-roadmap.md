\# 18 - Roadmap



\# Roadmap de Evolución



\## Introducción



Este documento describe la evolución planificada de OVA Nequi.



El roadmap fue construido a partir de:



\- Auditoría completa del proyecto.

\- Estado actual del repositorio.

\- Deuda técnica identificada.

\- Funcionalidades pendientes.

\- Recomendaciones de arquitectura.



Su propósito es proporcionar una guía clara para la evolución futura de la aplicación.



\---



\# Estado Actual



\## Nivel de Madurez



Actualmente OVA Nequi dispone de:



✅ Frontend completo.



✅ Módulos educativos completos.



✅ Seguridad básica implementada.



✅ Persistencia híbrida.



✅ Android funcional.



✅ Docker funcional.



✅ Certificados PDF.



✅ Arquitectura Offline First.



✅ Gestión de progreso académico.



\---



\# Visión Futura



La visión de largo plazo contempla una plataforma educativa financiera capaz de:



\- Operar en web.

\- Operar en Android.

\- Operar como PWA completa.

\- Sincronizar información con backend central.

\- Gestionar usuarios remotos.

\- Utilizar almacenamiento seguro.

\- Integrarse con CI/CD.



\---



\# Fase 1



\## Estabilización



\### Estado



Pendiente.



\### Prioridad



Muy Alta.



\---



\# Objetivos



Corregir inconsistencias detectadas durante la auditoría.



\---



\## Actividad 1



\### Corregir navegación Home



Validar:



```text

Configuración

```



Actualmente aparenta apuntar a:



```text

/encuestas

```



Debe validar:



```text

/configuracion

```



\---



\## Actividad 2



\### Revisar PWA



Actualmente existe:



```text

manifest.webmanifest

Service Worker

ngsw-config

```



pero:



```text

serviceWorker=false

```



en producción.



\---



\## Actividad 3



\### Validar UI Android



Confirmar:



\- Inputs.

\- Certificados.

\- Simulaciones.

\- Configuración.



\---



\# Resultado Esperado



Arquitectura consistente.



\---



\# Fase 2



\## Seguridad



\### Estado



Pendiente.



\### Prioridad



Muy Alta.



\---



\# Objetivos



Fortalecer protección de credenciales.



\---



\## Actividad 1



\### Secure Storage



Implementar:



```text

Android Keystore

iOS Keychain

```



\---



\### Opciones



\- Capacitor Secure Storage.

\- Cordova Secure Storage Echo.

\- Plugin equivalente compatible con Capacitor.



\---



\## Actividad 2



\### Confirmación Contraseña



Añadir:



```text

Confirm Password

```



durante registro.



\---



\## Actividad 3



\### Cambio Contraseña



Agregar módulo.



\---



\## Actividad 4



\### Recuperación Contraseña



Diseñar flujo.



\---



\# Resultado Esperado



Protección avanzada de usuarios.



\---



\# Fase 3



\## Backend



\### Estado



Pendiente.



\### Prioridad



Muy Alta.



\---



\# Objetivos



Migrar de autenticación local hacia autenticación centralizada.



\---



\## Opciones Tecnológicas



\### Node.js



```text

Express

NestJS

```



\---



\### Java



```text

Spring Boot

```



\---



\### Backend Serverless



```text

Firebase

Supabase

```



\---



\# Endpoints Propuestos



\## Autenticación



```text

/auth/register

/auth/login

/auth/logout

/auth/refresh

```



\---



\## Encuestas



```text

/survey

```



\---



\## Simulaciones



```text

/simulation

```



\---



\## Certificados



```text

/certificate

```



\---



\## Progreso



```text

/progress

```



\---



\# Resultado Esperado



Datos centralizados.



\---



\# Fase 4



\## Offline First Avanzado



\### Estado



Parcial.



\### Prioridad



Alta.



\---



\# Objetivos



Robustecer sincronización.



\---



\## Actividad 1



\### Reintentos Automáticos



Implementar:



```text

Retry

Backoff

Reintentos programados

```



\---



\## Actividad 2



\### Resolución de Conflictos



Implementar:



```text

Versionado

Timestamps

Detección duplicados

```



\---



\## Actividad 3



\### Métricas



Monitorear:



```text

Pending Queue

```



\---



\# Resultado Esperado



Sincronización robusta.



\---



\# Fase 5



\## Testing



\### Estado



Parcial.



\### Prioridad



Alta.



\---



\# Objetivos



Aumentar confiabilidad.



\---



\## Unit Testing



Cubrir:



```text

StorageService

DatabaseService

NetworkService

ApiService

```



\---



\## Functional Testing



Cubrir:



```text

Login

Registro

Progreso

Certificados

```



\---



\## End To End



Herramientas sugeridas:



```text

Playwright

Cypress

```



\---



\# Resultado Esperado



Cobertura superior al 80%.



\---



\# Fase 6



\## CI/CD



\### Estado



No implementado.



\### Prioridad



Media.



\---



\# Objetivos



Automatizar calidad y despliegue.



\---



\## Jenkins



Implementar:



```text

Jenkinsfile

```



\---



\## Pipeline Propuesto



```text

Git

&#x20;│

&#x20;▼

Jenkins

&#x20;│

&#x20;├── npm install

&#x20;├── lint

&#x20;├── test

&#x20;├── build

&#x20;├── docker build

&#x20;└── deploy

```



\---



\## SonarQube



Integrar análisis:



```text

Bugs

Code Smells

Coverage

Security

```



\---



\# Resultado Esperado



Integración Continua completa.



\---



\# Fase 7



\## Android Productivo



\### Estado



Pendiente.



\### Prioridad



Media.



\---



\## Actividad 1



Cambiar:



```text

io.ionic.starter

```



por identificador definitivo.



\---



\## Actividad 2



Preparar firma APK.



\---



\## Actividad 3



Optimizar recursos Android.



\---



\## Actividad 4



Publicación Play Store.



\---



\# Resultado Esperado



Aplicación lista para distribución.



\---



\# Fase 8



\## PWA Completa



\### Estado



Parcial.



\### Prioridad



Media.



\---



\# Objetivos



Convertir OVA Nequi en PWA funcional.



\---



\## Actividades



\### Activar Service Worker



\### Personalizar Manifest



\### Verificar instalación



\### Optimizar caches



\---



\# Resultado Esperado



Instalable desde navegador.



\---



\# Prioridades Globales



\## Prioridad 1



Backend.



Secure Storage.



\---



\## Prioridad 2



Testing.



Offline avanzado.



\---



\## Prioridad 3



CI/CD.



SonarQube.



\---



\## Prioridad 4



PWA.



Play Store.



\---



\# Visión Final



La evolución esperada de OVA Nequi es pasar de una plataforma educativa local y offline a una solución educativa financiera completa con:



\- Backend.

\- Sincronización centralizada.

\- Seguridad avanzada.

\- CI/CD.

\- PWA.

\- Android productivo.

\- Observabilidad.

\- Alta mantenibilidad.



\---



\# Conclusión



OVA Nequi posee una base técnica sólida.



La arquitectura actual fue diseñada correctamente para permitir crecimiento progresivo sin necesidad de rediseños radicales, facilitando la incorporación futura de backend, seguridad avanzada y despliegues empresariales.

