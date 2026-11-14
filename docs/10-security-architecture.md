\# 10 - Security Architecture



\# Arquitectura de Seguridad



\## Introducción



Este documento describe detalladamente la estrategia de seguridad implementada en OVA Nequi.



La aplicación incorpora mecanismos de protección orientados a:



\- Protección de credenciales.

\- Persistencia segura.

\- Gestión de sesiones.

\- Mitigación de acceso no autorizado.

\- Protección básica de información sensible.



La arquitectura actual está diseñada para un entorno educativo con autenticación local y prepara el terreno para futuras integraciones con backend y autenticación centralizada.



\---



\# Objetivos de Seguridad



La arquitectura actual busca:



\- Evitar almacenamiento de contraseñas en texto plano.

\- Minimizar exposición de credenciales.

\- Gestionar sesiones temporales.

\- Mantener compatibilidad Web y Android.

\- Usar almacenamiento seguro nativo para credenciales y sesiones móviles.



\---



\# Arquitectura General



```text

Usuario

&#x20;   │

&#x20;   ▼

Login / Registro

&#x20;   │

&#x20;   ▼

StorageService

&#x20;   │

&#x20;   ▼

PBKDF2

&#x20;   │

&#x20;   ▼

SHA-256

&#x20;   │

&#x20;   ▼

Persistencia

```



\---



\# Gestión de Credenciales



\## Registro



Durante el registro:



```text

Usuario ingresa contraseña

&#x20;        │

&#x20;        ▼

Generación Salt

&#x20;        │

&#x20;        ▼

Hash PBKDF2

&#x20;        │

&#x20;        ▼

Persistencia

```



\---



\# Algoritmo Criptográfico



OVA Nequi utiliza:



```text

PBKDF2

```



sobre:



```text

SHA-256

```



Implementado mediante:



```typescript

Web Crypto API

```



\---



\# Configuración de Hashing



\## Iteraciones



```text

100000

```



\---



\## Longitud



```text

256 bits

```



\---



\## Salt



Salt único por usuario:



```text

16 bytes

```



generados aleatoriamente.



\---



\# Flujo de Hashing



```text

Contraseña

&#x20;     │

&#x20;     ▼

PBKDF2

&#x20;     │

&#x20;     ▼

SHA-256

&#x20;     │

&#x20;     ▼

Hash

```



\---



\# Salt Aleatorio



\## Propósito



Mitigar:



```text

Rainbow Tables

Hash Reuse

Ataques precomputados

```



\---



\## Generación



Implementación:



```typescript

crypto.getRandomValues()

```



\---



\# Datos Persistidos



\## Usuario



Se almacena:



```json

{

&#x20; "email": "",

&#x20; "passwordHash": "",

&#x20; "salt": ""

}

```



\---



\## Lo que NO se almacena



La contraseña en texto plano no permanece como mecanismo principal de autenticación.



\---



\# Migración de Contraseñas Legadas



\## Problema



Versiones antiguas podían contener:



```json

{

&#x20; "password": "123456"

}

```



\---



\## Solución Implementada



Al primer login exitoso:



```text

Contraseña heredada

&#x20;       │

&#x20;       ▼

PBKDF2

&#x20;       │

&#x20;       ▼

Hash

&#x20;       │

&#x20;       ▼

Actualización perfil

```



\---



\# Verificación de Credenciales



Método:



```typescript

verifyPassword()

```



\---



\## Flujo



```text

Password ingresado

&#x20;        │

&#x20;        ▼

Recalcular hash

&#x20;        │

&#x20;        ▼

Comparar hash

&#x20;        │

&#x20;        ▼

Acceso permitido

```



\---



\# Gestión de Sesiones



\## Objetivo



Evitar sesiones permanentes.



\---



\## Persistencia



Clave:



```text

login

```



\---



\## Contenido



```json

{

&#x20; "email": "",

&#x20; "token": "",

&#x20; "expires": 0

}

```



\---



\# Expiración



Duración:



```text

24 horas

```



\---



\# Flujo



```text

Inicio de sesión

&#x20;       │

&#x20;       ▼

Generar token

&#x20;       │

&#x20;       ▼

Guardar expires

&#x20;       │

&#x20;       ▼

Persistir sesión

```



\---



\# Validación de Sesión



Durante:



```typescript

loadLogin()

```



se verifica:



```text

Date.now()

```



vs



```text

expires

```



\---



\# Resultado



Si la sesión expiró:



```text

logout()

```



se ejecuta automáticamente.



\---



\# Logout



Método:



```typescript

logout()

```



\---



\## Objetivo



Eliminar sesión activa.



\---



\## Resultado



```text

Redirección a Login

```



\---



\# Protección de Datos



\## Web



Actualmente:



```text

LocalStorage

```



\---



\## Android



Actualmente:



```text

SQLite

```



\---



\# Secure Storage



\## Estado



Implementado para Android e iOS mediante
`@aparajita/capacitor-secure-storage` 8.0.1.

En Android utiliza Android Keystore con AES-GCM y en iOS utiliza
Keychain. En Web se mantiene `localStorage`, porque la aplicación web
no dispone de Keychain/Keystore nativos.



\---



\## Métodos Disponibles



```typescript

secureSet()

secureGet()

SecureStorage.setItem()

SecureStorage.getItem()

```



\---



\## Objetivo Futuro



Persistir:



```text

Token

Login

Credenciales sensibles

```



en:



```text

Android Keystore

iOS Keychain

```



\---



\# Datos Sensibles



StorageService marca como sensibles:



```text

login

user:

token

```



\---



\# Riesgos Actuales



\## LocalStorage



Riesgo:



```text

XSS podría acceder a información persistida.

```



\---



\## SQLite



Las bases locales pueden ser inspeccionadas por usuarios con acceso físico al dispositivo.



\---



\## Backend



Actualmente no existe:



```text

Autenticación centralizada

```



\---



\## Revocación



No existe:



```text

Revocación remota de sesiones

```



\---



\# Riesgos Conocidos



\## Secure Storage

El almacenamiento seguro nativo está operativo con
`@aparajita/capacitor-secure-storage` 8.0.1. El riesgo restante es que la
autenticación continúa siendo local y no existe revocación remota.



\---



\## Tokens



Persistencia local únicamente.



\---



\## Backend



API real pendiente.



\---



\# Recomendaciones Futuras



\## Backend



Implementar:



```text

/auth/login

/auth/register

/auth/refresh

```



\---



\## JWT



Migrar hacia:



```text

Access Token

Refresh Token

```



\---



\## Secure Storage



Completar integración:



```text

Android Keystore

iOS Keychain

```



\---



\## CSP



Implementar:



```text

Content Security Policy

```



\---



\## Cookies



Para entorno web:



```text

HttpOnly Cookies

```



\---



\# Nivel de Madurez Actual



\## Implementado



✅ Hashing PBKDF2



✅ SHA-256



✅ Salt Aleatorio



✅ Expiración de sesión



✅ Migración de contraseñas legadas



✅ Preparación Secure Storage



\---



\## Pendiente



⚠️ Backend real



⚠️ Secure Storage operativo



⚠️ JWT



⚠️ Revocación remota



⚠️ Recuperación de contraseñas



\---



\# Conclusión



OVA Nequi implementa una arquitectura de seguridad adecuada para un entorno educativo local.



La protección basada en PBKDF2, SHA-256 y Salt aleatorio representa un nivel de seguridad superior al habitual en proyectos académicos.



La arquitectura actual además se encuentra preparada para evolucionar hacia mecanismos más robustos basados en autenticación centralizada, Secure Storage y tokens de acceso gestionados por backend.

## Validaciones de registro y sesión

El registro valida correo electrónico, cédula numérica, contraseña robusta y
confirmación de contraseña antes de guardar el perfil. Las sesiones generan
tokens con `crypto.getRandomValues`, tienen expiración de 24 horas y se
rechazan automáticamente cuando han expirado.
