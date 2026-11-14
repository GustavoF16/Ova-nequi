\# 16 - Testing Strategy



\# Estrategia de Pruebas



\## Introducción



Este documento describe la estrategia actual de pruebas de OVA Nequi.



Incluye:



\- Frameworks utilizados.

\- Cobertura existente.

\- Casos de prueba.

\- Limitaciones actuales.

\- Plan futuro de calidad.



\---



\# Objetivos



Las pruebas buscan garantizar:



\- Estabilidad.

\- Correcto funcionamiento.

\- Integridad del progreso.

\- Integridad de usuarios.

\- Persistencia correcta.

\- Compatibilidad Android.

\- Correcto funcionamiento Offline First.



\---



\# Tecnologías de Testing



\## Jasmine



Framework principal de pruebas.



Uso:



```text

Pruebas Unitarias

```



\---



\## Karma



Test Runner.



Responsabilidades:



```text

Ejecución

Cobertura

Automatización

```



\---



\## Angular TestBed



Responsabilidades:



```text

Creación de Componentes

Mocks

Testing Angular

```



\---



\# Configuración



\## Archivo Principal



```text

karma.conf.js

```



\---



\## Frameworks



```text

Jasmine

Angular Build Angular

```



\---



\## Navegador de Pruebas



Actual:



```text

Chrome

```



\---



\## Cobertura



Se generan:



```text

HTML Reports

Text Summary

```



Salida:



```text

coverage/app

```



\---



\# Bootstrap de Testing



Archivo:



```text

src/test.ts

```



\---



\## Inicialización

\---

\# Validación de accesibilidad

La fase de accesibilidad se valida junto con las pruebas funcionales y de
compilación. Los criterios incorporados son:

- Documento HTML con idioma español (`lang="es"`), título descriptivo y
  viewport que permite ampliar el contenido.
- Enlace de salto al contenido principal y regiones semánticas en las pantallas
  principales.
- Campos de login y registro con etiquetas, `required`, `aria-required` y
  valores `autocomplete` apropiados.
- Foco visible consistente para teclado y objetivos táctiles de tamaño
  suficiente.
- Alternativa de teclado para el reto de arrastrar y soltar.
- Preferencia de tamaño de texto, modo oscuro y reducción de movimiento.

La verificación manual en navegador debe comprobar:

1. Recorrido completo con `Tab`, `Shift+Tab`, `Enter` y `Espacio`.
2. Zoom del navegador sin pérdida de contenido ni desplazamiento horizontal
   innecesario.
3. Contraste y legibilidad en modo claro, modo oscuro y tamaños de texto
   disponibles.
4. Mensajes de error y éxito comprensibles sin depender únicamente del color.

Resultado de la fase actual:

- Tests unitarios: 14/14 exitosos.
- Lint: correcto.
- Build de producción: correcto.
- Contenedor Docker: `HTTP 200`.
- Revisión de la página de login en navegador: estructura semántica y nombres
  accesibles verificados.

La auditoría automatizada WCAG/axe y la revisión visual completa en Android
quedan como actividad posterior; no se deben considerar sustitutos de las
pruebas funcionales.

## Enlace de salto al contenido

Las pantallas principales incluyen el enlace `Saltar al contenido`. Este
control es un mecanismo de navegación para teclado y lectores de pantalla:

- Apunta al elemento `#main-content`.
- Evita recorrer repetidamente encabezados y controles globales.
- Lleva el foco visual al formulario o contenido principal de la pantalla.
- No valida credenciales, no inicia sesión y no permite omitir las guardas de
  autenticación.

La validación de login continúa ejecutándose únicamente al enviar el
formulario con correo y contraseña.

## Prueba funcional manual de accesibilidad y navegación

El flujo mínimo de aceptación es:

1. Abrir la aplicación y activar `Saltar al contenido` con `Tab` y `Enter`.
2. Ir a `Crear cuenta`.
3. Registrar una cuenta de prueba con datos sintéticos.
4. Confirmar el mensaje de creación y volver al login.
5. Iniciar sesión con la cuenta recién creada.
6. Recorrer módulos, progreso, configuración y regresar al menú.
7. Confirmar que no se pierde la sesión ni se rompe la navegación.

La prueba debe ejecutarse sin datos personales reales y debe registrar la fecha,
la rama, el resultado de cada pantalla y cualquier advertencia de consola.



```typescript

BrowserDynamicTestingModule

platformBrowserDynamicTesting()

```



\---



\# Estado Actual de Cobertura



\## Cobertura Existente



La aplicación posee archivos:



```text

\*.spec.ts

```



para múltiples componentes.



\---



\## Componentes Cubiertos



\### AppComponent



```text

app.component.spec.ts

```



\---



\### Ho\*e



```text

home.page.spec.ts

```



\*--



\### Modulos



```text

modulos.p\*ge.spec.ts

```



\---



\### Encuestas\*

```text

encuestas.page.spec.ts

``\*



\---



\### Progreso



```text

progr\*so.page.spec.ts

```



\---



\### Cert\*ficados



```text

certificados.page\*spec.ts

```



\---



\# Tipo de Cobert\*ra Actual



La mayoría de pruebas a\*tuales verifican:



```typescript

e\*pect(component).toBeTruthy()

```



\*--



\## Objetivo



Validar:



```text\*Creación de Componentes

```



\---



\* Cobertura Faltante



Actualmente n\* existen pruebas específicas para:\*

\## Login



\- Hashing

\- Verificació\*

\- Migración de credenciales



\---

\*## Registro



\- Salt

\- PBKDF2

\- Per\*istencia



\---



\## StorageService



\* Persistencia

\- Sesiones

\- Progres\*



\---



\## DatabaseService



\- Creac\*ón tablas

\- SQLite



\---



\## Offlin\* Queue



\- pendingSyncQueue

\- flush\*endingSyncQueue



\---



\## Certifica\*os



\- Generación PDF

\- Descarga An\*roid



\---



\## Seguridad



\- verifyP\*ssword

\- hashPassword



\---



\# Estr\*tegia de Testing Recomendada



\## N\*vel 1



Pruebas Unitarias.



Cobertu\*a:



```text

Servicios

Persistencia\*Seguridad

```



\---



\## Nivel 2



Pr\*ebas de Integración.



Cobertura:



\*``text

Login

Registro

Progreso

Cer\*ificados

```



\---



\## Nivel 3



Pru\*bas End To End.



Cobertura:



```te\*t

Flujo completo usuario

```



\---

\*# Casos de Prueba Manuales



\## Reg\*stro



\### Objetivo



Verificar crea\*ión usuario.



\### Pasos



1\. Abrir \*egistro.

2\. Completar formulario.

\*. Crear usuario.



\### Resultado es\*erado



```text

Usuario persistido.\*```



\---



\# Login



\## Objetivo



Ve\*ificar autenticación.



\### Resulta\*o esperado



```text

Acceso Home.

`\*`



\---



\# Logout



\## Objetivo



Ver\*ficar cierre sesión.



\### Resultad\* esperado



```text

Sesión eliminad\*.

```



\---



\# Enviar Dinero



\## Ob\*etivo



Validar quiz.



\### Resultad\* esperado



```text

Puntaje calcula\*o.

```



\---



\# Recibir Pagos



\## O\*jetivo



Validar Drag \& Drop.



\### \*esultado esperado



```text

Histori\*l actualizado.

```



\---



\# Pagar S\*rvicios



\## Objetivo



Validar:



``\*text

Crucigrama

Sopa de Letras

```\*

\### Resultado esperado



```text

S\*ore actualizado.

```



\---



\# Simul\*ción



\## Objetivo



Validar persist\*ncia.



\### Resultado esperado



```\*ext

simulation actualizado.

```



\-\*-



\# Encuesta



\## Objetivo



Valida\* almacenamiento.



\### Resultado es\*erado



```text

survey actualizado.\*```



\---



\# Certificados



\## Objet\*vo



Validar PDF.



\### Resultado es\*erado



```text

Archivo generado.

`\*`



\---



\# Offline Queue



\## Objeti\*o



Validar sincronización.



\### Pa\*os



1\. Desactivar Internet.

2\. Gua\*dar encuesta.

3\. Guardar simulació\*.

4\. Guardar certificado.



\### Res\*ltado esperado



```text

pendingSyn\*Queue poblada.

```



\---



\# Reconex\*ón



\### Pasos



1\. Restaurar Intern\*t.

2\. Esperar sincronización.



\###\*Resultado esperado



```text

flushP\*ndingSyncQueue ejecutado.

```



\---\*

\# Android



\## Objetivo



Validar p\*rsistencia SQLite.



\### Resultado \*sperado



```text

Datos disponibles\*tras reinicio.

```



\---



\# Problem\*s Detectados



\## Cobertura



Actual\*ente limitada.



\---



\## E2E



No im\*lementado.



\---



\## Automatización\*CI/CD



No implementada.



\---



\# He\*ramientas Futuras



\## Playwright



\*ruebas E2E modernas.



\---



\## Cypress



Alternativa E2E.



\---



\## SonarQube



Análisis calidad.



\---



\## Jenkins



Automatización.



\---



\# Roadmap de Testing



\## Corto Plazo



Pruebas unitarias reales.



\---



\## Mediano Plazo



Cobertura servicios.



\---



\## Largo Plazo



Playwright.



SonarQube.



CI/CD.



\---



\# Conclusión



OVA Nequi posee una infraestructura de pruebas configurada correctamente mediante:



\- Jasmine.

\- Karma.

\- Angular TestBed.



Aunque actualmente la cobertura funcional es básica, la arquitectura está preparada para evolucionar hacia pruebas unitarias completas, integración continua y pruebas End To End.
