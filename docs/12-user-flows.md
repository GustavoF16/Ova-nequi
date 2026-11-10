\# 12 - User Flows



\# Flujos de Usuario



\## Introducción



Este documento describe todos los flujos funcionales implementados en OVA Nequi.



Incluye:



\- Registro

\- Login

\- Configuración

\- Módulos

\- Simulación

\- Encuesta

\- Progreso

\- Certificados

\- Operación Offline



\---



\# Flujo Completo del Usuario



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

Certificado

```



\---



\# Flujo de Registro



\## Ruta



```text

/register

```



\---



\## Datos Solicitud



Usuario proporciona:



```text

Nombre

Apellido

Cédula

Correo

Contraseña

```



\---



\## Configuración Inicial



Usuario define:



```text

Modo oscuro

Tamaño de texto

```



\---



\## Validaciones



\### Nombre



Obligatorio.



\---



\### Apellido



Obligatorio.



\---



\### Cédula



Obligatoria.



\---



\### Email



Obligatorio.



\---



\### Contraseña



Mínimo:



```text

6 caracteres

```



\---



\## Flujo



```text

Usuario

&#x20;   │

&#x20;   ▼

Completa datos

&#x20;   │

&#x20;   ▼

Generar Salt

&#x20;   │

&#x20;   ▼

PBKDF2

&#x20;   │

&#x20;   ▼

Guardar Perfil

&#x20;   │

&#x20;   ▼

Guardar Configuración

&#x20;   │

&#x20;   ▼

Redirección Login

```



\---



\# Flujo de Login



\## Ruta



```text

/login

```



\---



\## Proceso



```text

Ingresar Email

Ingresar Contraseña

```



\---



\## Validación



Sistema:



```text

Busca usuario

Recupera Salt

Calcula Hash

Compara Hash

```



\---



\## Login Exitoso



Se genera:



```text

email

token

expires

```



\---



\## Duración Sesión



```text

24 horas

```



\---



\## Resultado



```text

Redirección Home

```



\---



\# Flujo Home



\## Ruta



```text

/home

```



\---



\## Funciones



\### Mostrar Bienvenida



```text

Bienvenido usuario@email.com

```



\---



\### Cargar Configuración



```text

Modo Oscuro

Tamaño Texto

```



\---



\### Mostrar Accesos



```text

Módulos

Simulaciones

Encuestas

Progreso

Certificados

```



\---



\# Flujo Configuración



\## Ruta



```text

/configuracion

```



\---



\## Cambiar Tema



```text

Claro

Oscuro

```



\---



\## Cambiar Fuente



```text

Pequeño

Medio

Grande

```



\---



\## Persistencia



```text

settings:<email>

```



\---



\# Flujo Módulos



\## Ruta



```text

/modulos

```



\---



\## Funciones



\### Video Educativo



\### Subtítulos



\### Guías



\### Acceso a módulos



\---



\# Flujo Enviar Dinero



\## Ruta



```text

/enviar-dinero

```



\---



\## Lectura



Usuario revisa:



```text

4 pasos

```



\---



\## Evaluación



Pregunta 1



Pregunta 2



Pregunta 3



\---



\## Resultado



Sistema calcula:



```text

puntaje

```



\---



\## Persistencia



```text

send-money-lesson

```



\---



\## Actualización



```text

sendMoney

```



\---



\# Flujo Recibir Pagos



\## Ruta



```text

/recibir-pagos

```



\---



\## Actividad



Drag \& Drop



\---



\## Selección



Usuario arrastra opción.



\---



\## Validación



Sistema determina:



```text

correcta

incorrecta

```



\---



\## Persistencia



```text

receive-payments-history:<email>

```



\---



\## Actualización



```text

receivePayments

```



\---



\# Flujo Pagar Servicios



\## Ruta



```text

/pagar-servicios

```



\---



\## Actividad 1



Crucigrama



\---



\## Actividad 2



Sopa de Letras



\---



\## Resultado



Sistema genera:



```text

score

```



\---



\## Persistencia



```text

pay-services-history:<email>

```



\---



\## Actualización



```text

payServices

```



\---



\# Flujo Simulación



\## Ruta



```text

/simulaciones

```



\---



\## Datos



```text

Número

Monto

```



\---



\## Persistencia



```text

simulation

```



\---



\## Actualización



```text

simulation

```



\---



\# Flujo Encuesta



\## Ruta



```text

/encuestas

```



\---



\## Preguntas



```text

respuesta1

respuesta2

```



\---



\## Persistencia



```text

survey

```



\---



\## Actualización



```text

survey

```



\---



\# Flujo Progreso



\## Ruta



```text

/progreso

```



\---



\## Consulta



Sistema recupera:



```text

sendMoney

receivePayments

payServices

simulation

survey

certificate

```



\---



\## Calcula



```text

overall

```



\---



\## Presenta



```text

No iniciado

En progreso

Completado

```



\---



\# Flujo Certificados



\## Ruta



```text

/certificados

```



\---



\## Prevalidación



Debe existir:



```text

sendMoney = 100%

receivePayments = 100%

payServices = 100%

simulation = 100%

survey = 100%

```



\---



\## Generación



```text

Guardar certificado

```



o



```text

Generar PDF

```



\---



\## Persistencia



```text

certificate

```



\---



\## Actualización



```text

certificate

```



\---



\# Flujo Logout



\## Ubicación



Header global.



\---



\## Proceso



```text

Usuario

&#x20;  │

&#x20;  ▼

Logout

&#x20;  │

&#x20;  ▼

Eliminar sesión

&#x20;  │

&#x20;  ▼

Login

```



\---



\# Flujo Offline



\## Usuario sin Internet



```text

Encuesta

Simulación

Certificado

```



continúan disponibles.



\---



\## Persistencia



```text

pendingSyncQueue

```



\---



\## Reconexion



```text

online$

```



\---



\## Sincronización



```text

flushPendingSyncQueue()

```



\---



\# Escenarios de Error



\## Contraseña Incorrecta



```text

Contraseña incorrecta

```



\---



\## Usuario No Existe



```text

Regístrate primero

```



\---



\## Campos Vacíos



```text

Complete todos los campos

```



\---



\## Certificado sin completar curso



```text

Debe completar todas las actividades

```



\---



\# Conclusiones



La experiencia de usuario de OVA Nequi fue diseñada para:



\- Aprender.

\- Practicar.

\- Evaluar.

\- Medir progreso.

\- Certificar conocimientos.



Todos los flujos comparten una estrategia común de persistencia local y operación Offline First.

