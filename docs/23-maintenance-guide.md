\# 23 - Maintenance Guide



\# Guía de Mantenimiento



\---



\# Introducción



Este documento describe las actividades necesarias para mantener correctamente OVA Nequi.



Su objetivo es proporcionar una guía operativa para futuras versiones del sistema.



Incluye:



\- Actualización de dependencias.

\- Actualización Android.

\- Actualización Angular.

\- Actualización Ionic.

\- Actualización Capacitor.

\- Mantenimiento Docker.

\- Mantenimiento SQLite.

\- Validaciones posteriores a cambios.



\---



\# Componentes Críticos



Los componentes con mayor impacto sobre el sistema son:



\## Frontend



```text

Angular

Ionic

TypeScript

```



\---



\## Persistencia



```text

StorageService

DatabaseService

SQLite

```



\---



\## Seguridad



```text

PBKDF2

SHA-256

Sesiones

```



\---



\## Infraestructura



```text

Docker

Nginx

Capacitor

Android

```



\---



\# Frecuencia Recomendada



\## Mensual



Revisar:



\- Angular.

\- Ionic.

\- Capacitor.

\- Dependencias npm.



\---



\## Trimestral



Revisar:



\- Seguridad.

\- Vulnerabilidades npm.

\- Docker Images.



\---



\## Semestral



Revisar:



\- Arquitectura.

\- Roadmap.

\- Deuda técnica.



\---



\# Actualización Angular



\## Versión Actual



```text

Angular 20

```



\---



\## Verificar Versión



```bash

ng version

```



\---



\## Actualizar



```bash

ng update

```



\---



\## Actualización Mayor



```bash

ng update @angular/core @angular/cli

```



\---



\# Actualización Ionic



\## Verificar



```bash

ionic info

```



\---



\## Actualizar



```bash

npm update @ionic/angular

```



\---



\# Actualización Capacitor



\## Verificar



```bash

npx cap --version

```



\---



\## Actualizar



```bash

npm install @capacitor/core@latest

npm install @capacitor/android@latest

npm install @capacitor/cli@latest

```



\---



\## Sincronizar



```bash

npx cap sync

```



\---



\# Android Studio



\## Revisar



\### compileSdkVersion



\### targetSdkVersion



\### minSdkVersion



Ubicación:



```text

android/variables.gradle

```



\---



\## Build Android



```bash

npx cap open android

```



\---



\# Dependencias NPM



\## Verificar



```bash

npm outdated

```



\---



\## Actualizar Dependencias



```bash

npm update

```



\---



\## Auditoría Seguridad



```bash

npm audit

```



\---



\## Corrección Automática



```bash

npm audit fix

```



\---



\# Docker



\## Reconstrucción



```bash

docker compose down

```



```bash

docker compose build

```



```bash

docker compose up -d

```



\---



\## Eliminar Caché



```bash

docker system prune -a

```



\---



\# Nginx



\## Validar



```text

nginx.conf

```



\---



\## Revisar



```text

SPA Routing

```



línea:



```nginx

try\_files $uri $uri/ /index.html;

```



\---



\# Persistencia



\## Validar Usuarios



Revisar:



```text

user:<email>

```



\---



\## Validar Sesiones



Revisar:



```text

login

```



\---



\## Validar Configuración



Revisar:



```text

settings:<email>

```



\---



\## Validar Progreso



Revisar:



```text

progress:<email>

```



\---



\# SQLite



\## Base



```text

ova\_nequi\_db

```



\---



\## Tablas



```text

progreso

storage

```



\---



\## Verificación



Confirmar:



```text

Creación correcta

Persistencia correcta

Recuperación correcta

```



\---



\# Offline First



\## Elementos Críticos



```text

pendingSyncQueue

flushPendingSyncQueue()

NetworkService

```



\---



\## Validación



1\. Desconectar Internet.

2\. Realizar simulación.

3\. Realizar encuesta.

4\. Generar certificado.

5\. Reconectar Internet.

6\. Validar sincronización.



\---



\# Seguridad



\## Validar



\### Hashing



```text

PBKDF2

SHA-256

```



\---



\### Salt



```text

Salt aleatorio por usuario

```



\---



\### Sesiones



```text

24 horas

```



\---



\# Testing



\## Ejecutar



```bash

npm test

```



\---



\## Lint



```bash

npm run lint

```



\---



\## Build Producción



```bash

ng build --configuration production

```



\---



\# Checklist Antes de Liberar Cambios



\## Código



\- \[ ] Compila correctamente.

\- \[ ] No existen errores TypeScript.

\- \[ ] No existen errores ESLint.



\---



\## Persistencia



\- \[ ] Usuarios.

\- \[ ] Login.

\- \[ ] Configuración.

\- \[ ] Progreso.



\---



\## Funcionalidad



\- \[ ] Módulos.

\- \[ ] Simulación.

\- \[ ] Encuesta.

\- \[ ] Certificados.



\---



\## Android



\- \[ ] APK funcional.

\- \[ ] SQLite funcional.

\- \[ ] PDF funcional.



\---



\## Docker



\- \[ ] Imagen construye.

\- \[ ] Contenedor inicia.

\- \[ ] Puerto 8080 disponible.



\---



\# Problemas Conocidos



\## Backend



Pendiente.



\---



\## Secure Storage



Pendiente.



\---



\## PWA



Parcial.



\---



\## Jenkins



Pendiente.



\---



\# Procedimiento de Recuperación



\## Dependencias Dañadas



```bash

rm -rf node\_modules

npm install

```



\---



\## Android Dañado



```bash

npx cap sync

```



\---



\## Docker Dañado



```bash

docker compose build --no-cache

```



\---



\# Conclusión



OVA Nequi posee una arquitectura suficientemente modular para facilitar mantenimiento.



Las áreas que requieren mayor cuidado durante futuras actualizaciones son:



\- StorageService.

\- DatabaseService.

\- Offline Queue.

\- Seguridad.

\- Integración Android.



Mantener estos componentes estables garantiza la continuidad del proyecto.

