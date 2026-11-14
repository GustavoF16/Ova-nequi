# 09 - Offline First Strategy

# Estrategia Offline First

## Introducción

OVA Nequi fue diseñado bajo una arquitectura **Offline First**.

Esto significa que la aplicación puede continuar operando incluso cuando el usuario pierde conectividad a Internet.

El objetivo principal es garantizar:

- Disponibilidad.
- Continuidad académica.
- Persistencia local.
- Sincronización posterior.

---

# Concepto General

La filosofía Offline First consiste en:

```text
Guardar primero localmente
Sincronizar después
```

No depende de una conexión inmediata para funcionar.

---

# Arquitectura General

```text
Usuario
    │
    ▼
Página Angular
    │
    ▼
StorageService
    │
    ▼
Persistencia Local
    │
    ├── LocalStorage
    └── SQLite
    │
    ▼
Pending Sync Queue
    │
    ▼
Sincronización futura
```

---

# Componentes Involucrados

## StorageService

### Responsabilidades

- Guardar datos localmente.
- Detectar conectividad.
- Crear elementos pendientes.
- Ejecutar sincronización.

---

## NetworkService

### Responsabilidades

- Detectar estado Online.
- Detectar estado Offline.
- Notificar cambios.

---

## ApiService

### Responsabilidades

- Comunicación con API remota.
- Encuestas.
- Simulaciones.
- Certificados.

---

# Flujo Normal (Con Internet)

```text
Usuario
    │
    ▼
StorageService
    │
    ▼
Persistencia Local
    │
    ▼
ApiService
    │
    ▼
Servidor
```

---

# Flujo Offline

Cuando el usuario pierde conectividad:

```text
Usuario
    │
    ▼
StorageService
    │
    ▼
Persistencia Local
    │
    ▼
Pending Sync Queue
```

No se pierde información.

---

# Detección de Conectividad

## Archivo

```text
network.service.ts
```

---

## Implementación

```typescript
navigator.onLine
```

---

## Eventos Escuchados

```text
online
offline
```

---

## Observable Principal

```typescript
online$
```

Este observable es consumido por:

- AppComponent
- Home
- Modulos
- Simulaciones
- Encuestas
- Progreso
- Certificados

---

# Persistencia Offline

## Encuestas

### Método

```typescript
saveSurvey()
```

---

## Simulaciones

### Método

```typescript
saveSimulation()
```

---

## Certificados

### Método

```typescript
saveCertificate()
```

---

# Cola de Sincronización

## Objeto

```typescript
PendingSyncItem
```

---

## Estructura

```typescript
{
  id,
  userEmail,
  type,
  data,
  timestamp
}
```

---

# Tipos Soportados

Actualmente:

```text
survey
simulation
certificate
```

---

# Almacenamiento

### Clave utilizada

```text
pendingSyncQueue
```

---

## Ejemplo

```json
[
  {
    "id": "123",
    "type": "survey",
    "timestamp": 1700000000,
    "data": {
      "respuesta1": "si",
      "respuesta2": "si"
    }
  }
]
```

---

# Detección de Reconexión

Cuando Internet regresa:

```typescript
online$
```

emite:

```text
true
```

---

# Proceso de Sincronización

### Método

```typescript
flushPendingSyncQueue()
```

---

## Flujo

```text
Conectividad Recuperada
         │
         ▼
NetworkService
         │
         ▼
StorageService
         │
         ▼
flushPendingSyncQueue()
         │
         ▼
ApiService
         │
         ▼
Servidor
```

---

# Procesamiento por Tipo

## Encuestas

```typescript
apiService.saveSurvey()
```

---

## Simulaciones

```typescript
apiService.saveSimulation()
```

---

## Certificados

```typescript
apiService.saveCertificate()
```

---

# Manejo de Errores

Durante sincronización:

```typescript
catchError()
```

---

## Estrategia

Si ocurre una falla:

```text
Elemento permanece en cola
```

---

## Resultado

```text
No se pierde información.
```

---

# Limpieza de Cola

Cuando la sincronización finaliza correctamente:

```typescript
savePendingSyncQueue()
```

---

# Contador de Pendientes

## Observable

```typescript
pendingSyncCount$
```

---

## Propósito

Permitir mostrar:

```text
Pendientes de sincronizar
```

en futuras versiones.

---

# Beneficios de la Estrategia

## Disponibilidad

La aplicación sigue funcionando sin Internet.

---

## Persistencia

Los datos no se pierden.

---

## Experiencia de Usuario

No es necesario repetir actividades.

---

## Escalabilidad

El backend puede incorporarse posteriormente.

---

## Protección contra duplicados

Los botones de encuesta, simulación y certificado se deshabilitan mientras
guardan. Además, `StorageService` mantiene una operación activa por tipo y
evita que dos llamadas concurrentes a `flushPendingSyncQueue()` procesen el
mismo lote. Esta protección fue validada en Android y produjo un solo registro
remoto por acción.

# Limitaciones Actuales

## API Real

Actualmente:

```text
Supabase REST configurado para `surveys`, `simulations` y `certificates`; la
cola local continúa funcionando sin backend
```

es un placeholder.

---

## Secure Storage

Las credenciales y la sesión móvil usan Secure Storage; los datos funcionales
continúan en SQLite.

---

## Resolución de Conflictos

No existe manejo avanzado de:

```text
duplicados
versionado
colisiones
```

---

# Casos de Uso

## Encuesta sin Conexión

```text
Usuario responde encuesta
      │
      ▼
Se guarda localmente
      │
      ▼
Se encola
      │
      ▼
Sincroniza posteriormente
```

---

## Simulación sin Conexión

```text
Usuario realiza simulación
      │
      ▼
Persistencia local
      │
      ▼
Cola pendiente
```

---

## Certificado sin Conexión

```text
Generación local
      │
      ▼
Persistencia local
      │
      ▼
Sincronización futura
```

---

# Recomendaciones Futuras

## Backend Real

Implementar:

```text
/auth
/survey
/simulation
/certificate
```

---

## Reintentos Programados

Automatizar:

```text
retry policies
backoff strategies
```

---

## Conflictos

Agregar:

```text
versionado
timestamps
resolución de conflictos
```

---

# Conclusión

La estrategia Offline First constituye una de las características técnicas más importantes de OVA Nequi.

Permite mantener continuidad operativa en escenarios sin conectividad y proporciona una base sólida para futuras integraciones con servicios backend y sincronización distribuida.
## Garantías de la cola de sincronización

Cada elemento de `pendingSyncQueue` conserva el correo del usuario que lo creó.
Al recuperar la conexión solo se procesan los elementos de la sesión activa; los
pendientes de otras cuentas permanecen intactos. Si la API responde con error,
el elemento no se elimina y se reintenta en una reconexión posterior.
