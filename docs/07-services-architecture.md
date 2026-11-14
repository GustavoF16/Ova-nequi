# 07 - Services Architecture

# Arquitectura de Servicios

> **Estado vigente:** [`26-current-state-baseline.md`](./26-current-state-baseline.md)
> documenta la implementación actual de Secure Storage, conectividad nativa y
> sincronización Supabase con fallback offline.

## Introducción

Los servicios constituyen la capa principal de lógica de negocio de OVA Nequi.

Toda la aplicación se apoya en servicios reutilizables para garantizar:

- Separación de responsabilidades.
- Reutilización de código.
- Persistencia centralizada.
- Gestión de seguridad.
- Sincronización offline.
- Comunicación con infraestructura externa.

---

# Capa de Servicios

```text
Frontend Pages
      │
      ▼
StorageService
      │
      ├── DatabaseService
      ├── NetworkService
      └── ApiService
```

---

# StorageService

## Archivo

```text
src/app/services/storage.service.ts
```

## Responsabilidad

StorageService es el núcleo funcional de OVA Nequi.

Centraliza:

- Usuarios.
- Autenticación.
- Sesiones.
- Configuración.
- Progreso.
- Encuestas.
- Simulaciones.
- Certificados.
- Sincronización Offline.

---

# Interfaces Principales

## AppSettings

```typescript
modoOscuro
tamanoTexto
```

Responsable de las preferencias visuales.

---

## SurveyAnswers

```typescript
respuesta1
respuesta2
```

Representa respuestas de encuestas.

---

## SimulationData

```typescript
numero
monto
```

Representa una simulación de transferencia.

---

## CertificateData

```typescript
nombre
fecha
```

Representa un certificado generado.

---

## UserProfile

Representa un usuario.

### Campos

```text
nombre
apellido
cedula
email
passwordHash
salt
password
```

---

# Gestión de Usuarios

## Registro

### Responsabilidades

- Crear perfiles.
- Generar hash.
- Generar salt.
- Guardar configuraciones.

### Método utilizado

```typescript
saveUserProfile()
```

---

## Login

### Responsabilidades

- Recuperar perfil.
- Verificar contraseña.
- Gestionar sesión.

### Métodos

```typescript
loadUserProfile()
saveLogin()
loadLogin()
```

---

## Logout

### Responsabilidades

Eliminar sesión activa.

### Método

```typescript
logout()
```

---

# Gestión de Sesiones

## saveLogin()

Genera:

```text
email
token
expires
```

### Validez

```text
24 horas
```

---

## loadLogin()

Responsable de:

- Recuperar sesión.
- Validar expiración.
- Invalidar sesiones vencidas.

---

# Hashing de Contraseñas

## Algoritmo

```text
PBKDF2
```

---

## Hash

```text
SHA-256
```

---

## Iteraciones

```text
100000
```

---

## Longitud

```text
256 bits
```

---

# Métodos Relacionados

## hashPassword()

Genera:

```text
salt
hash
```

---

## verifyPassword()

Valida:

```text
password
salt
expectedHash
```

---

# Persistencia Académica

## Progreso por módulo

### Métodos

```typescript
saveModuleProgress()
loadModuleProgress()
loadAllModuleProgressForUser()
```

---

## Progreso global

### Métodos

```typescript
saveOverallProgressForUser()
loadOverallProgressForUser()
```

---

### Componentes considerados

```text
sendMoney
receivePayments
payServices
simulation
survey
certificate
```

---

# Gestión de Configuración

## Persistencia global

```typescript
saveSettings()
loadSettings()
```

---

## Persistencia por usuario

```typescript
saveSettingsForUser()
loadSettingsForUser()
```

---

# Gestión de Simulaciones

## Guardado

```typescript
saveSimulation()
```

---

## Recuperación

```typescript
loadSimulation()
```

---

# Gestión de Encuestas

## Guardado

```typescript
saveSurvey()
```

---

## Recuperación

```typescript
loadSurvey()
```

---

# Gestión de Certificados

## Guardado

```typescript
saveCertificate()
```

---

## Recuperación

```typescript
loadCertificate()
```

---

# Historiales Educativos

## Enviar Dinero

```typescript
saveSendMoneyLesson()
loadSendMoneyLesson()
```

---

## Recibir Pagos

```typescript
saveReceivePaymentsAttempt()
loadReceivePaymentsHistory()
```

---

## Pagar Servicios

```typescript
savePayServicesAttempt()
loadPayServicesHistory()
```

---

# Arquitectura Offline First

## Cola de Sincronización

### Estructura

```typescript
PendingSyncItem
```

---

### Tipos

```text
survey
simulation
certificate
```

---

## Pendientes

Almacenados en:

```text
pendingSyncQueue
```

---

## Procesamiento

Método:

```typescript
flushPendingSyncQueue()
```

---

# Persistencia Local

## saveValue()

Responsable de:

- LocalStorage.
- SQLite.
- Secure Storage.

---

## loadValue()

Responsable de:

- Recuperar valores.
- Determinar origen de datos.

---

# Secure Storage

## Estado Actual

Preparado pero no completamente implementado.

### Métodos

```typescript
secureSet()
secureGet()
```

---

## Objetivo

Guardar:

```text
login
token
credenciales sensibles
```

en:

```text
Keychain
Keystore
```

---

# DatabaseService

## Archivo

```text
database.service.ts
```

---

## Responsabilidades

- Crear SQLite.
- Crear tablas.
- Ejecutar sentencias.
- Recuperar información.

---

## Tablas

### progreso

```sql
id
porcentaje
```

---

### storage

```sql
key
value
```

---

# NetworkService

## Archivo

```text
network.service.ts
```

---

## Responsabilidades

- Detectar conectividad.
- Notificar cambios de red.

---

## Observable Principal

```typescript
online$
```

---

## Métodos

### isOnline

Permite consultar el estado actual.

---

# ApiService

## Archivo

```text
api.service.ts
```

---

## Responsabilidades

Comunicación HTTPS.

---

## Endpoints

### Encuestas

```text
POST /survey
```

---

### Simulaciones

```text
POST /simulation
```

---

### Certificados

```text
POST /certificate
```

---

## Estado Actual

API preparada.

Backend real pendiente.

### Entorno actual

```text
Supabase REST mediante `environment.apiUrl`, con fallback a la cola offline
```

---

# Dependencias Entre Servicios

```text
StorageService
     │
     ├── DatabaseService
     ├── NetworkService
     └── ApiService
```

---

# Riesgos Conocidos

## Secure Storage

Preparado pero no instalado.

---

## Backend

No existe entorno real.

---

## PWA

Configuración parcial.

---

# Conclusiones

StorageService constituye el núcleo funcional de OVA Nequi.

Toda la persistencia, progreso académico, seguridad, sincronización offline y configuración de usuario dependen directa o indirectamente de este servicio.

Por esta razón cualquier modificación significativa del proyecto debe analizar previamente su impacto sobre StorageService y sus servicios dependientes.