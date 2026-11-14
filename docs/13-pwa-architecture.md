\# 13 - PWA Architecture



\# Arquitectura PWA



\## Introducción



OVA Nequi fue diseñado con soporte para Progressive Web App (PWA).



Actualmente existen varios componentes implementados para soportar instalación y funcionamiento como aplicación web progresiva.



Sin embargo, durante la auditoría del proyecto se identificó que la implementación PWA se encuentra parcialmente activada.



\---



\# ¿Qué es una PWA?



PWA significa:



```text

Progressive Web Application

```



Una PWA permite que una aplicación web:



\- Se instale como aplicación.

\- Funcione parcialmente sin conexión.

\- Utilice Service Workers.

\- Utilice caché local.

\- Sea ejecutada desde dispositivos móviles.



\---



\# Componentes PWA Implementados



Actualmente existen los siguientes componentes.



\## Service Worker



Archivo:



```text

src/main.ts

```



Registro:



```typescript

provideServiceWorker(

&#x20; 'ngsw-worker.js'

)

```



Objetivo:



\- Controlar caché.

\- Mejorar disponibilidad.

\- Soportar operación offline.



\---



\## Configuración Service Worker



Archivo:



```text

ngsw-config.json

```



Responsabilidad:



Definir los recursos almacenados por Angular Service Worker.



\---



\## Manifiesto



Archivo:



```text

public/manifest.webmanifest

```



Responsabilidad:



Definir:



\- Nombre.

\- Iconos.

\- Modo de instalación.

\- Inicio de aplicación.



\---



\## Iconos



Ubicación:



```text

public/icons/

```



\---



\### Tamaños configurados



```text

72x72

96x96

128x128

144x144

152x152

192x192

384x384

512x512

```



\---



\# Arquitectura Actual



```text

Usuario

&#x20;  │

&#x20;  ▼

Navegador

&#x20;  │

&#x20;  ▼

Angular

&#x20;  │

&#x20;  ▼

Service Worker

&#x20;  │

&#x20;  ▼

Cache Storage

```



\---



\# Configuración NGSW



Archivo:



```text

ngsw-config.json

```



\---



\## Grupo App



```json

{

&#x20; "name": "app",

&#x20; "installMode": "prefetch"

}

```



Objetivo:



Descargar anticipadamente:



```text

index.html

css

js

manifest

```



\---



\## Grupo Assets



```json

{

&#x20; "name": "assets",

&#x20; "installMode": "lazy"

}

```



Objetivo:



Descargar recursos únicamente cuando sean necesarios.



\---



\## Recursos Incluidos



```text

svg

png

jpg

gif

woff

woff2

```



\---



\# Manifest Actual



Archivo:



```text

public/manifest.webmanifest

```



\---



\## Nombre



Actual:



```json

"name": "app"

```



\---



\## Nombre Corto



Actual:



```json

"short\_name": "app"

```



\---



\## Modo



```json

"display": "standalone"

```



\---



\## Inicio



```json

"start\_url": "./"

```



\---



\# Hallazgos de Auditoría



Durante la revisión completa del sistema se encontró:



\## Existe configuración PWA



✅ Manifest.



✅ Service Worker.



✅ ngsw-config.



✅ Iconos.



\---



\## Existe documentación PWA



README menciona:



```text

PWA con service worker y manifiesto web

```



\---



\## Existe código de activación



Archivo:



```text

main.ts

```



registro de:



```typescript

provideServiceWorker()

```



\---



\# Problema Identificado



Archivo:



```text

angular.json

```



Contiene:



```json

"serviceWorker": false

```



en producción.



\---



\# Consecuencia



Actualmente:



```text

La infraestructura PWA existe

pero no está completamente activa.

```



\---



\# Estado Actual



| Componente | Estado |

|------------|---------|

| Manifest | Implementado |

| Iconos | Implementados |

| ngsw-config | Implementado |

| Service Worker registro | Implementado |

| Angular Build SW | Habilitado en producción |

| Instalación PWA completa | Pendiente de validación HTTPS en navegador |



\---



\# Beneficios Esperados



Al completar la configuración:



\## Instalación



El usuario podrá:



```text

Instalar OVA Nequi

```



directamente desde navegador.



\---



\## Caché



Recursos permanecerán disponibles.



\---



\## Rendimiento



Menor transferencia de datos.



\---



\## Disponibilidad



Mayor soporte offline.



\---



\# Relación con Offline First



OVA Nequi ya implementa:



```text

SQLite

LocalStorage

PendingSyncQueue

```



por lo que una PWA funcional complementaría perfectamente la estrategia Offline First.



\---



\# Recomendaciones Futuras



\## Activar Service Worker



Modificar:



```json

"serviceWorker": true

```



en producción.



\---



\## Personalizar Manifest



Actualmente:



```json

"name": "app"

```



Recomendado:



```json

"name": "OVA Nequi"

```



\---



\## Personalizar Short Name



Actual:



```json

"short\_name": "app"

```



Recomendado:



```json

"short\_name": "OVA Nequi"

```



\---



\## Verificar Instalación



Probar:



```text

Chrome

Edge

Android

```



\---



\# Conclusión



OVA Nequi posee una arquitectura PWA parcialmente implementada.



La base técnica necesaria ya existe:



\- Manifest.

\- Service Worker.

\- NGSW.

\- Iconos.



La activación completa requiere únicamente ajustes menores de configuración para convertir la aplicación en una PWA completamente funcional.

## Estado operativo de producción

La compilación de producción activa el Service Worker mediante `ngsw-config.json`.
Los archivos estáticos públicos, iconos, subtítulos VTT y recursos compilados se
incluyen en el artefacto final. La configuración de caché se limita a recursos
estáticos y no cachea respuestas de API ni datos locales del usuario.
