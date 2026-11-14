\# 21 - API Reference



\# Referencia de API

> **Estado vigente:** el placeholder `https://example.com/api` ya no se usa.
> La sincronización Supabase está configurada y validada con el proyecto Free.
> Consulte [`26-current-state-baseline.md`](./26-current-state-baseline.md) y
> [`supabase/schema.sql`](../supabase/schema.sql) antes de activar el backend.



\## Introducción



Este documento describe la interfaz de comunicación remota utilizada por OVA Nequi.



La aplicación combina almacenamiento local, cola Offline First y sincronización
remota opcional con Supabase. Si no hay conexión, los datos quedan pendientes
hasta que la red se restablece.



Sin embargo, la arquitectura ya contempla integración con servicios backend mediante ApiService.



\---



\# Estado Actual



\## Implementación



Existe:



```text

ApiService

```



\---



\## Endpoint Base



Actualmente configurado en:



```text

https://TU_PROYECTO.supabase.co/rest/v1

```



\---



\## Estado



```text

Configurado y validado

Activado mediante `remoteSyncEnabled: true`

```



\---



\# Servicio Responsable



Archivo:



```text

src/app/services/api.service.ts

```



\---



\# Arquitectura



```text

Página Angular

&#x20;      │

&#x20;      ▼

StorageService

&#x20;      │

&#x20;      ▼

ApiService

&#x20;      │

&#x20;      ▼

Backend REST

```



\---



\# Endpoint 01



\## Encuestas



\### Método



```http

POST

```



\### Ruta



```http

/surveys

```



\### Método Angular



```typescript

saveSurvey()

```



\---



\## Request



```json

{

&#x20; "user_email": "usuario@example.com",
"respuesta1": "si",

&#x20; "respuesta2": "no"

}

```



\---



\## Tipo



```typescript

SurveyAnswers

```



\---



\## Respuesta Esperada



```json

HTTP 201 o HTTP 204

```



\---



\# Endpoint 02



\## Simulaciones



\### Método



```http

POST

```



\### Ruta



```http

/simulations

```



\### Método Angular



```typescript

saveSimulation()

```



\---



\## Request



```json

{

&#x20; "user_email": "usuario@example.com",
"numero": "3001234567",

&#x20; "monto": 50000

}

```



\---



\## Tipo



```typescript

SimulationData

```



\---



\## Respuesta Esperada



```json

HTTP 201 o HTTP 204

```



\---



\# Endpoint 03



\## Certificados



\### Método



```http

POST

```



\### Ruta



```http

/certificates

```



\### Método Angular



```typescript

saveCertificate()

```



\---



\## Request



```json

{

&#x20; "user_email": "usuario@example.com",

&#x20; "nombre": "Usuario",

&#x20; "fecha": "09/11/2026"

}

```



\---



\## Tipo



```typescript

CertificateData

```



\---



\## Respuesta Esperada



```text

HTTP 201 o HTTP 204

```



\---



\# Integración Offline



\## Flujo



```text

Usuario

&#x20;     │

&#x20;     ▼

StorageService

&#x20;     │

&#x20;     ├── Offline

&#x20;     │        │

&#x20;     │        ▼

&#x20;     │   pendingSyncQueue

&#x20;     │

&#x20;     └── Online

&#x20;              │

&#x20;              ▼

&#x20;          ApiService

```



\---



\## Cola



Clave:



```text

pendingSyncQueue

```



\---



\## Tipos Soportados



```text

survey

simulation

certificate

```



\---



\# Manejo de Errores



\## Estrategia



ApiService delega la tolerancia a fallos a:



```typescript

StorageService

```



\---



\## Implementación



```typescript

catchError()

```



\---



\## Resultado



Si el backend no responde:



```text

Los datos permanecen almacenados.

```



\---



\# Contrato de Datos



\## SurveyAnswers



```typescript

{

&#x20; respuesta1: string;

&#x20; respuesta2: string;

}

```



\---



\## SimulationData



```typescript

{

&#x20; numero: string;

&#x20; monto: number;

}

```



\---



\## CertificateData



```typescript

{

&#x20; nombre: string;

&#x20; fecha: string;

}

```



\---



\# API Futura Recomendada



\## Auth



```http

POST /auth/register

POST /auth/login

POST /auth/logout

POST /auth/refresh

```



\---



\## Usuarios



```http

GET /users

GET /users/{id}

PUT /users/{id}

```



\---



\## Progreso



```http

GET /progress

POST /progress

```



\---



\## Encuestas



```http

POST /survey

GET /survey

```



\---



\## Simulaciones



```http

POST /simulation

GET /simulation

```



\---



\## Certificados



```http

POST /certificate

GET /certificate

```



\---



\# Seguridad Recomendada



\## Autenticación



Migrar a:



```text

JWT

Refresh Token

```



\---



\## Transporte



Utilizar:



```text

HTTPS obligatorio

```



\---



\## Almacenamiento



Utilizar:



```text

Secure Storage

```



para tokens.



\---



\# Integración con Backend



\## Opciones Compatibles



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



\### Cloud



```text

Firebase

Supabase

Azure App Service

AWS Lambda

```



\---



\# Estado Actual



\## Implementado



✅ ApiService.



✅ Contratos de datos.



✅ Integración Offline Queue.



✅ Manejo básico de errores.



\---



\## Pendiente



⚠️ Backend real.



⚠️ Autenticación remota.



⚠️ Gestión de tokens.



⚠️ Endpoints productivos.



\---



\# Conclusión



La arquitectura de API de OVA Nequi se encuentra correctamente desacoplada mediante ApiService.



Actualmente la aplicación opera principalmente de forma local, pero la estructura existente permite incorporar un backend productivo con cambios mínimos en la capa de presentación.
