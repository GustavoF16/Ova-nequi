\# 20 - Development Guide



\# Guía de Desarrollo



\## Introducción



Este documento describe el proceso recomendado para desarrollar, mantener y extender OVA Nequi.



Su objetivo es permitir que cualquier desarrollador pueda comprender rápidamente el entorno de trabajo, configurar el proyecto localmente y realizar modificaciones sin afectar la arquitectura existente.



\---



\# Información General



\## Nombre del Proyecto



```text

OVA Nequi

```



\---



\## Tecnologías Principales



\### Frontend



```text

Angular 20

Ionic 8

TypeScript 5.9

RxJS

```



\---



\### Mobile



```text

Capacitor 8

Android

```



\---



\### Persistencia



```text

SQLite

LocalStorage

```



\---



\### Infraestructura



```text

Docker

Docker Compose

Nginx

```



\---



\# Requisitos Previos



\## Node.js



Versión recomendada:



```text

18.x o superior

```



\---



\## NPM



Versión compatible con Angular 20.



\---



\## Git



Última versión estable.



\---



\## Docker



Recomendado:



```text

Docker Desktop

```



\---



\## Android



Para desarrollo móvil:



```text

Android Studio

Java JDK 11+

Android SDK

```



\---



\# Instalación Inicial



\## Clonar repositorio



```bash

git clone <repositorio>

```



\---



\## Entrar al proyecto



```bash

cd Ova-nequi

```



\---



\## Instalar dependencias



```bash

npm install

```



\---



\# Ejecución Local



\## Desarrollo



```bash

npm run start

```



o



```bash

ng serve

```



\---



\## Acceso



```text

http://localhost:4200

```



\---



\# Build Producción



\## Angular



```bash

ng build --configuration production

```



\---



\## Resultado



```text

www/

```



\---



\# Docker



\## Construcción



```bash

docker build -t ova-nequi .

```



\---



\## Ejecución



```bash

docker compose up -d

```



\---



\## Acceso



```text

http://localhost:8080

```



\---



\# Android



\## Compilar Frontend



```bash

ng build --configuration production

```



\---



\## Copiar Assets



```bash

npx cap copy android

```



\---



\## Sincronizar Plugins



```bash

npx cap sync

```



\---



\## Abrir Android Studio



```bash

npx cap open android

```



\---



\# Estructura Recomendada para Desarrollo



```text

src/

│

├── app/

│   ├── home/

│   ├── pages/

│   ├── services/

│   └── app.routes.ts

│

├── assets/

├── environments/

└── theme/

```



\---



\# Modificar Páginas



Las páginas utilizan:



```text

TypeScript

HTML

SCSS

```



Ejemplo:



```text

login.page.ts

login.page.html

login.page.scss

```



\---



\# Crear Nuevas Páginas



\## Recomendado



```bash

ionic generate page pages/nueva-pagina

```



o



```bash

ng generate component

```



según la necesidad.



\---



\# Registro de Nuevas Rutas



Archivo:



```text

app.routes.ts

```



\---



\## Patrón utilizado



```typescript

loadComponent: () =>

&#x20; import('./pages/nueva-pagina/nueva-pagina.page')

```



\---



\# Trabajar con Persistencia



\## Regla Principal



Toda persistencia debe pasar por:



```text

StorageService

```



\---



\## No recomendado



Acceder directamente a:



```text

localStorage

SQLite

```



desde componentes.



\---



\## Recomendado



Crear métodos en:



```text

StorageService

```



\---



\# Trabajar con SQLite



Toda interacción debe pasar por:



```text

DatabaseService

```



\---



\# Progreso Académico



Para actualizar progreso:



```typescript

saveModuleProgressForCurrentUser()

```



\---



\## Módulos existentes



```text

sendMoney

receivePayments

payServices

simulation

survey

certificate

```



\---



\# Offline First



\## Regla



Las nuevas funcionalidades deben seguir la estrategia existente:



```text

Guardar localmente primero

Sincronizar después

```



\---



\## Si requiere sincronización



Debe integrarse con:



```text

pendingSyncQueue

```



\---



\# Seguridad



\## Contraseñas



Nunca almacenar:



```text

Texto plano

```



\---



\## Utilizar



```typescript

hashPassword()

verifyPassword()

```



\---



\# Android



\## Identificador Actual



```text

io.ionic.starter

```



\---



\## Antes de publicar



Actualizar:



```text

ApplicationId

Namespace

Package Name

```



\---



\# Estándares de Código



\## TypeScript



Proyecto configurado con:



```text

Strict Mode

```



\---



\## Angular



Utilizar:



```text

Standalone Components

```



\---



\## Servicios



Responsabilidad única.



\---



\## Componentes



Separación:



```text

HTML

TS

SCSS

```



\---



\# Testing



\## Ejecutar pruebas



```bash

npm test

```



\---



\## Ejecutar lint



```bash

npm run lint

```



\---



\# Flujo de Trabajo Git



\## Crear rama



```bash

git checkout -b feature/nueva-funcionalidad

```



\---



\## Confirmar cambios



```bash

git add .

```



```bash

git commit -m "feat: descripcion del cambio"

```



\---



\## Subir cambios



```bash

git push origin nombre-rama

```



\---



\# Buenas Prácticas



\## Recomendadas



✅ Utilizar StorageService.



✅ Mantener arquitectura Offline First.



✅ Actualizar documentación al realizar cambios.



✅ Registrar nuevas rutas en app.routes.ts.



✅ Mantener accesibilidad.



✅ Mantener diseño responsive.



\---



\## Evitar



❌ Persistencia directa en componentes.



❌ Contraseñas en texto plano.



❌ Acceso directo a SQLite desde páginas.



❌ Romper la estructura de rutas existente.



\---



\# Checklist Antes de Liberar Cambios



\- \[ ] Compila correctamente.

\- \[ ] Ejecuta pruebas.

\- \[ ] No rompe módulos existentes.

\- \[ ] Actualiza documentación.

\- \[ ] Verifica Android.

\- \[ ] Verifica Docker.

\- \[ ] Verifica persistencia.

\- \[ ] Verifica Offline First.



\---



\# Conclusión



OVA Nequi posee una arquitectura organizada que facilita mantenimiento y crecimiento.



La estrategia de desarrollo debe respetar:



\- Angular Standalone.

\- Offline First.

\- Persistencia centralizada.

\- Seguridad basada en PBKDF2.

\- Compatibilidad Android.

\- Despliegue mediante Docker.



Seguir estas reglas garantiza consistencia y escalabilidad a largo plazo.

