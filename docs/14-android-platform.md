\# 14 - Android Platform



\# Plataforma Android



\## Introducción



OVA Nequi puede ejecutarse como aplicación Android mediante Capacitor.



La plataforma Android reutiliza la aplicación Angular/Ionic y la empaqueta dentro de un WebView nativo administrado por Capacitor.



\---



\# Arquitectura Android



\## Arquitectura General



```text

Usuario

&#x20;   │

&#x20;   ▼

Android

&#x20;   │

&#x20;   ▼

Capacitor

&#x20;   │

&#x20;   ▼

WebView

&#x20;   │

&#x20;   ▼

Angular + Ionic

```



\---



\# Tecnologías Android



\## Plataforma



```text

Android

```



\---



\## Framework Móvil



```text

Capacitor 8

```



\---



\## Lenguaje Nativo



```text

Java

```



\---



\## MainActivity



Archivo:



```text

android/app/src/main/java/io/ionic/starter/MainActivity.java

```



Código:



```java

public class MainActivity extends BridgeActivity {}

```



\---



\# Capacitor



\## Archivo



```text

capacitor.config.ts

```



\---



\## Configuración Actual



```typescript

appId: 'io.ionic.starter'

appName: 'ova-nequi'

webDir: 'www'

```



\---



\# Observación Técnica



Actualmente el proyecto mantiene:



```text

io.ionic.starter

```



como identificador heredado del template inicial.



\---



\## Recomendación Futura



Cambiar a:



```text

co.edu.poligran.ovanequi

```



o



```text

com.gustavoforero.ovanequi

```



según la estrategia de publicación.



\---



\# AndroidManifest



Archivo:



```text

AndroidManifest.xml

```



\---



\## Permisos



Actualmente:



```xml

android.permission.INTERNET

```



\---



\## Función



Permitir:



\- APIs remotas.

\- Sincronización.

\- Descarga de recursos.



\---



\# File Provider



Configurado:



```xml

androidx.core.content.FileProvider

```



\---



\## Función



Permitir:



```text

Exportación PDF

Almacenamiento de archivos

```



\---



\# Certificados PDF



OVA Nequi utiliza:



```text

jsPDF

```



y:



```text

Capacitor Filesystem

```



\---



\## Flujo



```text

Certificado

&#x20;     │

&#x20;     ▼

jsPDF

&#x20;     │

&#x20;     ▼

Filesystem.writeFile()

&#x20;     │

&#x20;     ▼

Android Documents

```



\---



\# Configuración SDK



Archivo:



```text

android/variables.gradle

```



\---



\## Versiones



\### minSdkVersion



```text

24

```



Android 7.0



\---



\### targetSdkVersion



```text

36

```



\---



\### compileSdkVersion



```text

36

```



\---



\# Compatibilidad Android



La aplicación soporta:



```text

Android 7+

```



\---



\# Dependencias Android



\## AndroidX



Configurado:



```properties

android.useAndroidX=true

```



\---



\## Librerías



\### AppCompat



```text

1.7.1

```



\---



\### Activity



```text

1.11.0

```



\---



\### Fragment



```text

1.8.9

```



\---



\### Core



```text

1.17.0

```



\---



\# SQLite



\## Plugin



```text

@capacitor-community/sqlite

```



\---



\## Función



Persistencia local Android.



\---



\# Packaging Options



Archivo:



```text

build.gradle

```



Incluye exclusiones para:



```text

META-INF/LICENSE

META-INF/NOTICE

```



\---



\## Objetivo



Evitar conflictos de:



```text

Duplicate Classes

```



relacionados con SQLite.



\---



\# Splash Screen



Ubicación:



```text

android/app/src/main/res/drawable\*

```



\---



\## Recursos



```text

splash.png

```



\---



\## Resoluciones



```text

Portrait

Landscape

Múltiples tamaños Android

```



\---



\# Recursos Android



\## Strings



Archivo:



```text

strings.xml

```



\---



\## Nombre Aplicación



```text

ova-nequi

```



\---



\## Actividad Principal



```text

ova-nequi

```



\---



\## Package Name



Actual:



```text

io.ionic.starter

```



\---



\# Build Android



\## Compilar Angular



```bash

npx ng build --configuration production

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



\# Testing Android



Infraestructura disponible:



\## JUnit



```text

4.13.2

```



\---



\## Espresso



```text

3.7.0

```



\---



\## Android JUnit



```text

1.3.0

```



\---



\# Pruebas Existentes



Generadas automáticamente:



```text

ExampleInstrumentedTest.java

ExampleUnitTest.java

```



\---



\# Secure Storage



\## Estado



Preparado.



No operativo.



\---



\## Razón



Plugin no instalado correctamente.



\---



\# Offline First en Android



La aplicación puede continuar operando debido a:



```text

SQLite

LocalStorage fallback

Pending Sync Queue

```



\---



\# Integraciones Capacitor



Actualmente instaladas:



```text

@capacitor/app

@capacitor/filesystem

@capacitor/status-bar

@capacitor/haptics

@capacitor/keyboard

@capacitor/android

```



\---



\# Estado Actual



\## Implementado



✅ Android nativo.



✅ SQLite.



✅ Certificados PDF.



✅ Persistencia local.



✅ Offline First.



✅ Capacitor.



\---



\## Pendiente



⚠️ Secure Storage.



⚠️ Publicación Play Store.



⚠️ Package Name definitivo.



⚠️ Backend real.



\---



\# Conclusión



La plataforma Android de OVA Nequi se encuentra correctamente configurada y preparada para ejecución en dispositivos Android modernos.



La solución aprovecha Capacitor para reutilizar el frontend Angular/Ionic y complementarlo con capacidades nativas como almacenamiento SQLite y generación de archivos PDF.



La arquitectura actual proporciona una base sólida para futuras mejoras orientadas a seguridad móvil, sincronización remota y publicación oficial.

