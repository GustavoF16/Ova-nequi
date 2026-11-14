\# 22 - Storage Reference



\# Referencia Completa de Persistencia

> La línea base vigente está en
> [`26-current-state-baseline.md`](./26-current-state-baseline.md). El
> almacenamiento seguro nativo ya es operativo; las menciones históricas a
> “preparado” son anteriores a la integración.



\## Introducción



Este documento constituye el diccionario oficial de persistencia de OVA Nequi.



Describe:



\- Claves LocalStorage.

\- Objetos Persistidos.

\- Tablas SQLite.

\- Relaciones internas.

\- Historiales.

\- Cola Offline.

\- Configuraciones.



Este documento debe utilizarse como referencia principal antes de realizar cualquier modificación relacionada con almacenamiento.



\---



\# Arquitectura General



```text

StorageService

&#x20;     │

&#x20;     ▼

Persistencia

&#x20;     │

&#x20;     ├── LocalStorage

&#x20;     ├── SQLite

&#x20;     └── Secure Storage (Android/iOS)

```



\---



\# Usuario



\## Clave



```text

user:<email>

```



\---



\## Tipo



```typescript

UserProfile

```



\---



\## Estructura



```json

{

&#x20; "nombre": "",

&#x20; "apellido": "",

&#x20; "cedula": "",

&#x20; "email": "",

&#x20; "passwordHash": "",

&#x20; "salt": ""

}

```



\---



\## Descripción Campos



\### nombre



Nombre del usuario.



\---



\### apellido



Apellido del usuario.



\---



\### cedula



Documento del usuario.



\---



\### email



Identificador principal.



\---



\### passwordHash



Resultado PBKDF2.



\---



\### salt



Salt asociado al usuario.



\---



\# Login



\## Clave



```text

login

```



\---



\## Tipo



```typescript

LoginData

```



\---



\## Estructura



```json

{

&#x20; "email": "",

&#x20; "token": "",

&#x20; "expires": 0

}

```



\---



\## Campos



\### email



Usuario autenticado.



\---



\### token



Token local de sesión.



\---



\### expires



Fecha expiración.



\---



\## Vigencia



```text

24 horas

```



\---



\# Configuración Global



\## Clave



```text

settings

```



\---



\## Tipo



```typescript

AppSettings

```



\---



\## Estructura



```json

{

&#x20; "modoOscuro": false,

&#x20; "tamanoTexto": "medio"

}

```



\---



\# Configuración por Usuario



\## Clave



```text

settings:<email>

```



\---



\## Prioridad



Superior a:



```text

settings

```



\---



\# Progreso General



\## Clave



```text

progress:<email>

```



\---



\## Tipo



```typescript

UserProgressMap

```



\---



\## Estructura



```json

{

&#x20; "modulos": 0,

&#x20; "sendMoney": 0,

&#x20; "receivePayments": 0,

&#x20; "payServices": 0,

&#x20; "simulation": 0,

&#x20; "survey": 0,

&#x20; "certificate": 0,

&#x20; "overall": 0

}

```



\---



\# Campos



\## modulos



Promedio de:



```text

sendMoney

receivePayments

payServices

```



\---



\## sendMoney



Puntaje módulo enviar dinero.



\---



\## receivePayments



Resultado módulo recibir pagos.



\---



\## payServices



Resultado pagar servicios.



\---



\## simulation



Estado simulación.



\---



\## survey



Estado encuesta.



\---



\## certificate



Estado certificado.



\---



\## overall



Promedio general.



\---



\# Encuestas



\## Clave



```text

survey

```



\---



\## Tipo



```typescript

SurveyAnswers

```



\---



\## Estructura



```json

{

&#x20; "respuesta1": "",

&#x20; "respuesta2": ""

}

```



\---



\# Simulaciones



\## Clave



```text

simulation

```



\---



\## Tipo



```typescript

SimulationData

```



\---



\## Estructura



```json

{

&#x20; "numero": "",

&#x20; "monto": 0

}

```



\---



\# Certificados



\## Clave



```text

certificate

```



\---



\## Tipo



```typescript

CertificateData

```



\---



\## Estructura



```json

{

&#x20; "nombre": "",

&#x20; "fecha": ""

}

```



\---



\# Enviar Dinero



\## Clave



```text

send-money-lesson

```



\---



\## Tipo



```typescript

SendMoneyLessonRecord

```



\---



\## Estructura



```json

{

&#x20; "pregunta1": "",

&#x20; "pregunta2": "",

&#x20; "pregunta3": "",

&#x20; "score": 0,

&#x20; "completed": false,

&#x20; "savedAt": ""

}

```



\---



\# Recibir Pagos



\## Clave



```text

receive-payments-history:<email>

```



\---



\## Tipo



```typescript

ReceivePaymentsAttempt\[]

```



\---



\## Estructura



```json

\[

&#x20; {

&#x20;   "selectedOption": "",

&#x20;   "isCorrect": true,

&#x20;   "savedAt": ""

&#x20; }

]

```



\---



\## Límite



```text

10 registros

```



\---



\# Pagar Servicios



\## Clave



```text

pay-services-history:<email>

```



\---



\## Tipo



```typescript

PayServicesAttempt\[]

```



\---



\## Estructura



```json

\[

&#x20; {

&#x20;   "crosswordAnswers": {},

&#x20;   "foundWords": \[],

&#x20;   "score": 0,

&#x20;   "completed": false,

&#x20;   "savedAt": ""

&#x20; }

]

```



\---



\## Límite



```text

10 registros

```



\---



\# Offline Queue



\## Clave



```text

pendingSyncQueue

```



\---



\## Tipo



```typescript

PendingSyncItem\[]

```



\---



\## Estructura



```json

\[

&#x20; {

&#x20;   "id": "",

&#x20;   "type": "",

&#x20;   "timestamp": 0,

&#x20;   "data": {}

&#x20; }

]

```



\---



\# Tipos Permitidos



```text

survey

simulation

certificate

```



\---



\# SQLite



\## Base



```text

ova\_nequi\_db

```



\---



\## Tabla progreso



```sql

CREATE TABLE progreso (

&#x20;   id INTEGER PRIMARY KEY,

&#x20;   porcentaje INTEGER

)

```



\---



\## Tabla storage



```sql

CREATE TABLE storage (

&#x20;   key TEXT PRIMARY KEY,

&#x20;   value TEXT

)

```



\---



\# Datos Sensibles



\## Identificados



```text

login

user:<email>

token

```



\---



\## Futuro



Migrar a:



```text

Secure Storage

Android Keystore

iOS Keychain

```



\---



\# Dependencias



Todos los accesos de persistencia deben pasar exclusivamente por:



```text

StorageService

```



\---



\# Prohibiciones



No acceder directamente desde componentes a:



```text

localStorage

SQLite

```



\---



\# Conclusión



Este documento constituye la referencia oficial de almacenamiento y persistencia de OVA Nequi.



Cualquier modificación futura relacionada con:



\- Usuarios.

\- Sesiones.

\- Progreso.

\- Encuestas.

\- Certificados.

\- Simulaciones.



debe ser validada contra este inventario antes de implementarse.
