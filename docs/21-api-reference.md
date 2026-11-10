\# 21 - API Reference



\# Referencia de API



\## Introducción



Este documento describe la interfaz de comunicación remota utilizada por OVA Nequi.



Actualmente la aplicación se ejecuta utilizando almacenamiento local y sincronización Offline First.



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

https://example.com/api

```



\---



\## Estado



```text

Placeholder

No productivo

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

/survey

```



\### Método Angular



```typescript

saveSurvey()

```



\---



\## Request



```json

{

&#x20; "respuesta1": "si",

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

{

&#x20; "success": true

}

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

/simulation

```



\### Método Angular



```typescript

saveSimulation()

```



\---



\## Request



```json

{

&#x20; "numero": "3001234567",

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

{

&#x20; "success": true

}

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

/certificate

```



\### Método Angular



```typescript

saveCertificate()

```



\---



\## Request



```json

{

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



```json

{

&#x20; "success": true

}

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

