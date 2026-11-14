# 08 - Storage and Database

# Persistencia y Base de Datos

## Introducción

OVA Nequi utiliza una arquitectura de persistencia híbrida diseñada para soportar:

- Navegadores web.
- Aplicaciones Android.
- Funcionamiento Offline First.
- Sincronización posterior.

La aplicación utiliza múltiples mecanismos de almacenamiento dependiendo del entorno de ejecución.

---

# Arquitectura General de Persistencia

```text
StorageService
      │
      ▼
Persistencia
      │
      ├── LocalStorage (Web)
      ├── SQLite (Android)
      └── Secure Storage (Android/iOS)
```

---

# Flujo General

```text
Usuario
   │
   ▼
Página Angular
   │
   ▼
StorageService
   │
   ├── LocalStorage
   ├── SQLite
   └── Secure Storage
```

---

# StorageService

## Archivo

```text
src/app/services/storage.service.ts
```

## Responsabilidad

- Centralizar toda la persistencia.
- Seleccionar automáticamente el mecanismo de almacenamiento.
- Abstraer diferencias entre Web y Android.

---

# Modos de Persistencia

## Modo Web

Utiliza:

```text
window.localStorage
```

### Implementación

```typescript
getWebItem()
setWebItem()
```

---

## Modo Android

Utiliza:

```text
SQLite
```

### Implementación

```text
DatabaseService
```

---

## Secure Storage

### Estado actual

```text
Operativo en Android/iOS para claves sensibles
mediante `@aparajita/capacitor-secure-storage`.

La Web continúa usando `localStorage`; los datos funcionales nativos
continúan usando SQLite.
```

### Métodos

```typescript
secureSet()
secureGet()
```

### Objetivo

Proteger:

- Login.
- Tokens.
- Credenciales sensibles.

---

# DatabaseService

## Archivo

```text
database.service.ts
```

---

# Base de Datos

## Nombre

```text
ova_nequi_db
```

---

# Tablas

## Tabla progreso

```sql
CREATE TABLE IF NOT EXISTS progreso (
    id INTEGER PRIMARY KEY,
    porcentaje INTEGER
);
```

### Responsabilidad

Guardar avance académico general.

---

## Tabla storage

```sql
CREATE TABLE IF NOT EXISTS storage (
    key TEXT PRIMARY KEY,
    value TEXT
);
```

### Responsabilidad

- Persistir objetos serializados.
- Actuar como almacén genérico clave-valor.

---

# Estrategia Key-Value

Gran parte de la persistencia utiliza:

```text
key
value
```

como modelo.

### Ejemplos

```text
user:usuario@email.com
settings:usuario@email.com
progress:usuario@email.com
```

---

# Usuarios

## Clave

```text
user:<email>
```

### Estructura

```json
{
  "nombre": "",
  "apellido": "",
  "cedula": "",
  "email": "",
  "passwordHash": "",
  "salt": ""
}
```

---

# Login

## Clave

```text
login
```

### Estructura

```json
{
  "email": "",
  "token": "",
  "expires": 0
}
```

### Expiración

```text
24 horas
```

Implementada mediante:

```typescript
Date.now() + 24 * 60 * 60 * 1000
```

---

# Configuración

## Configuración Global

### Clave

```text
settings
```

---

## Configuración por Usuario

### Clave

```text
settings:<email>
```

### Estructura

```json
{
  "modoOscuro": true,
  "tamanoTexto": "medio"
}
```

---

# Progreso Académico

## Clave

```text
progress:<email>
```

### Estructura

```json
{
  "sendMoney": 1,
  "receivePayments": 1,
  "payServices": 1,
  "simulation": 1,
  "survey": 1,
  "certificate": 1,
  "overall": 1
}
```

---

## Módulos Controlados

```text
modulos
sendMoney
receivePayments
payServices
simulation
survey
certificate
```

---

# Simulaciones

## Clave

```text
simulation
```

### Estructura

```json
{
  "numero": "",
  "monto": 0
}
```

---

# Encuestas

## Clave

```text
survey
```

### Estructura

```json
{
  "respuesta1": "",
  "respuesta2": ""
}
```

---

# Certificados

## Clave

```text
certificate
```

### Estructura

```json
{
  "nombre": "",
  "fecha": ""
}
```

---

# Enviar Dinero

## Clave

```text
send-money-lesson
```

### Estructura

```json
{
  "pregunta1": "",
  "pregunta2": "",
  "pregunta3": "",
  "score": 0,
  "completed": false,
  "savedAt": ""
}
```

---

# Recibir Pagos

## Historial

### Clave

```text
receive-payments-history:<email>
```

### Estructura

```json
[
  {
    "selectedOption": "",
    "isCorrect": true,
    "savedAt": ""
  }
]
```

---

# Pagar Servicios

## Historial

### Clave

```text
pay-services-history:<email>
```

### Estructura

```json
[
  {
    "crosswordAnswers": {},
    "foundWords": [],
    "score": 0,
    "completed": false,
    "savedAt": ""
  }
]
```

---

# Offline Queue

## Clave

```text
pendingSyncQueue
```

### Estructura

```json
[
  {
    "id": "",
    "type": "",
    "timestamp": 0,
    "data": {}
  }
]
```

---

## Tipos Soportados

```text
survey
simulation
certificate
```

---

# Flujo Offline

```text
Usuario
   │
   ▼
Guardar actividad
   │
   ▼
saveValue()
   │
   ▼
pendingSyncQueue
```

---

# Flujo Online

```text
Conectividad Recuperada
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

# Seguridad de Persistencia

## Credenciales

Actualmente:

```text
Hash PBKDF2
Salt Aleatorio
```

---

## Objetivo Futuro

Mover:

```text
login
token
credenciales
```

hacia:

```text
Android Keystore
iOS Keychain
```

mediante Secure Storage.

---

# Riesgos Conocidos

## Secure Storage

No instalado.

---

## Backend

API real pendiente.

---

## LocalStorage

Datos sensibles todavía pueden existir en almacenamiento web.

---

# Conclusiones

OVA Nequi utiliza una estrategia de persistencia híbrida diseñada para garantizar:

- Portabilidad.
- Compatibilidad Web.
- Compatibilidad Android.
- Persistencia Offline.
- Continuidad operativa.

StorageService constituye el punto central de acceso a todos los mecanismos de almacenamiento utilizados por la aplicación.