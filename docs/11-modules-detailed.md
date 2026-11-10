\# 11 - Functional Modules Detailed Documentation



\# Módulos Funcionales de OVA Nequi



\## Introducción



Este documento describe en detalle cada módulo funcional implementado en OVA Nequi.



Se documentan:



\- Objetivos

\- Responsabilidades

\- Archivos involucrados

\- Persistencia

\- Integración con progreso académico

\- Flujo de usuario

\- Validaciones



\---



\# Flujo Académico Completo



```text

Registro

&#x20;  │

&#x20;  ▼

Login

&#x20;  │

&#x20;  ▼

Home

&#x20;  │

&#x20;  ▼

Módulos Educativos

&#x20;  │

&#x20;  ├── Enviar Dinero

&#x20;  ├── Recibir Pagos

&#x20;  └── Pagar Servicios

&#x20;  │

&#x20;  ▼

Simulación

&#x20;  │

&#x20;  ▼

Encuesta

&#x20;  │

&#x20;  ▼

Progreso

&#x20;  │

&#x20;  ▼

Generación de Certificado

```



\---



\# Login



\## Ruta



```text

/login

```



\## Archivos



```text

login.page.ts

login.page.html

login.page.scss

```



\## Objetivo



Permitir la autenticación de usuarios registrados.



\## Funcionalidades



\- Validación de usuario.

\- Verificación de hash.

\- Sesión persistente.

\- Migración de contraseñas heredadas.



\## Persistencia utilizada



```text

StorageService

```



\## Flujo



```text

Ingresar email

Ingresar contraseña

Buscar perfil

Verificar hash

Crear sesión

Redirigir a Home

```



\---



\# Registro



\## Ruta



```text

/register

```



\## Objetivo



Crear nuevos usuarios.



\## Datos Solicitados



\- Nombre

\- Apellido

\- Cédula

\- Correo

\- Contraseña



\## Configuración Inicial



\- Modo oscuro

\- Tamaño de texto



\## Seguridad



Durante el registro:



```text

Contraseña

&#x20;  │

&#x20;  ▼

PBKDF2

&#x20;  │

&#x20;  ▼

SHA256

&#x20;  │

&#x20;  ▼

Persistencia

```



\---



\# Home



\## Ruta



```text

/home

```



\## Objetivo



Actuar como dashboard principal.



\## Características



\- Bienvenida personalizada.

\- Acceso a módulos.

\- Acceso a progreso.

\- Acceso a certificados.

\- Acceso a configuración.



\## Configuración aplicada



\- Tamaño texto.

\- Modo oscuro.



\---



\# Configuración



\## Ruta



```text

/configuracion

```



\## Objetivo



Gestionar accesibilidad y personalización.



\## Funcionalidades



\### Modo Oscuro



Permite alternar:



```text

Modo Claro

Modo Oscuro

```



\### Tamaño de Texto



Permite:



```text

Pequeño

Medio

Grande

```



\## Persistencia



```text

settings:<email>

```



\---



\# Módulos Educativos



\## Ruta



```text

/modulos

```



\## Objetivo



Servir como centro educativo principal.



\## Funcionalidades



\- Presentación de módulos.

\- Video educativo.

\- Subtítulos VTT.

\- Acceso a actividades.



\## Recursos



```text

spanish-subtitles.vtt

```



\---



\# Enviar Dinero



\## Ruta



```text

/enviar-dinero

```



\## Objetivo



Enseñar el proceso seguro de envío de dinero.



\## Contenido



\### Guía



4 pasos:



1\. Verificar destinatario.

2\. Revisar número.

3\. Validar monto.

4\. Guardar comprobante.



\## Evaluación



Pregunta 1



Pregunta 2



Pregunta 3



\## Calificación



```text

0%

33%

67%

100%

```



\## Persistencia



```text

send-money-lesson

```



\## Actualización de Progreso



```text

sendMoney

```



\---



\# Recibir Pagos



\## Ruta



```text

/recibir-pagos

```



\## Objetivo



Enseñar la recepción segura de pagos.



\## Actividad



Drag \& Drop.



\## Opción Correcta



```text

Verificar nombre y referencia del remitente

```



\## Persistencia



```text

receive-payments-history:<email>

```



\## Historial



Se almacenan:



\- Intentos.

\- Fecha.

\- Resultado.



\## Actualización de Progreso



```text

receivePayments

```



\---



\# Pagar Servicios



\## Ruta



```text

/pagar-servicios

```



\## Objetivo



Enseñar el proceso de pago digital de servicios.



\## Actividad 1



\### Crucigrama



Palabras:



```text

FACTURA

CODIGO

SALDO

PAGO

```



\---



\## Actividad 2



\### Sopa de Letras



Palabras:



```text

SERVICIO

RECARGA

FACTURA

SALDO

```



\---



\## Calificación



Promedio de:



```text

Crucigrama

\+

Sopa de letras

```



\## Persistencia



```text

pay-services-history:<email>

```



\## Actualización Progreso



```text

payServices

```



\---



\# Simulaciones



\## Ruta



```text

/simulaciones

```



\## Objetivo



Permitir práctica controlada de envíos.



\## Datos



\- Número celular.

\- Monto.



\## Persistencia



```text

simulation

```



\## Actualización de Progreso



```text

simulation

```



\---



\# Encuestas



\## Ruta



```text

/encuestas

```



\## Objetivo



Recopilar percepción del usuario.



\## Preguntas



\### Pregunta 1



```text

¿Te pareció fácil usar Nequi?

```



\### Pregunta 2



```text

¿Recomendarías esta aplicación?

```



\## Persistencia



```text

survey

```



\## Actualización de Progreso



```text

survey

```



\---



\# Progreso



\## Ruta



```text

/progreso

```



\## Objetivo



Consolidar estado académico.



\## Módulos Controlados



```text

modulos

sendMoney

receivePayments

payServices

simulation

survey

certificate

```



\## Estados



\### No iniciado



```text

0%

```



\### En progreso



```text

1%-99%

```



\### Completado



```text

100%

```



\## Mensajes



\- Comienza a aprender.

\- Vas muy bien.

\- Curso completado.



\---



\# Certificados



\## Ruta



```text

/certificados

```



\## Objetivo



Emitir certificado de finalización.



\## Requisitos



Debe completarse:



```text

sendMoney

receivePayments

payServices

simulation

survey

```



\## Funcionalidades



\### Generar Certificado



\### Descargar PDF



\### Guardar Certificado



\### Imprimir Certificado



\## Persistencia



```text

certificate

```



\## Actualización Progreso



```text

certificate

```



\---



\# Integración Académica



Todos los módulos actualizan:



```text

UserProgressMap

```



\---



\# Cálculo de Progreso Global



Participan:



```text

sendMoney

receivePayments

payServices

simulation

survey

certificate

```



No participa:



```text

modulos

```



para evitar doble conteo.



\---



\# Persistencia Utilizada



Todos los módulos se apoyan en:



```text

StorageService

```



como punto central de almacenamiento.



\---



\# Conclusiones



La plataforma está compuesta por módulos educativos especializados que cubren las operaciones principales de Nequi.



Cada módulo:



\- Posee persistencia propia.

\- Actualiza progreso académico.

\- Permite operación offline.

\- Mantiene historial de actividad.



Esto permite una experiencia educativa consistente, medible y escalable.

