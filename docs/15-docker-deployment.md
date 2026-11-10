\# 15 - Docker Deployment



\# Arquitectura de Despliegue Docker



\## Introducción



OVA Nequi utiliza contenedores Docker para facilitar:



\- Portabilidad.

\- Replicabilidad.

\- Despliegue consistente.

\- Entornos homogéneos.

\- Integración futura con CI/CD.



La solución utiliza una arquitectura basada en Angular, Docker y Nginx.



\---



\# Arquitectura General



```text

Angular 20

&#x20;   │

&#x20;   ▼

Build Producción

&#x20;   │

&#x20;   ▼

www/

&#x20;   │

&#x20;   ▼

Docker

&#x20;   │

&#x20;   ▼

Nginx

&#x20;   │

&#x20;   ▼

Usuario Final

```



\---



\# Componentes de Despliegue



\## Angular



Responsabilidad:



\- Generación de archivos estáticos.

\- Compilación frontend.



Resultado:



```text

www/

```



\---



\## Docker



Responsabilidad:



\- Empaquetar la aplicación.

\- Garantizar portabilidad.

\- Homogeneizar entornos.



\---



\## Nginx



Responsabilidad:



\- Servir archivos Angular.

\- Manejar rutas SPA.

\- Publicar la aplicación.



\---



\# Dockerfile



Archivo:



```text

Dockerfile

```



\---



\# Arquitectura Multi Stage Build



OVA Nequi implementa una estrategia:



```text

Multi Stage Build

```



\---



\## Etapa 1



\### Imagen



```dockerfile

node:20

```



\---



\### Responsabilidades



\- Instalar dependencias.

\- Compilar Angular.

\- Generar build producción.



\---



\### Flujo



```dockerfile

COPY package\*.json

```



```dockerfile

RUN npm i\*stall

```



```dockerfile

RUN npm r\*n build\*\*``



\---



\# Etapa 2



\### Imagen



``\*dockerfile

nginx:alpine

```



\---



\*## Responsabilidades



\- Publicar a\*chivos estáticos.

\- Servir Angular\*



\---



\### Flujo



```dockerfile

CO\*Y --from=build /app/www

```



\---



\* Resultado Final



```text

Imagen l\*gera

Sin Node.js

Sólo Nginx y Buil\*

```



\---



\# Estructura de Build



\*# Director\*o



Configurado en:



```text

angula\*.json

```



\---



\## Salida



```text\*www/

```



\---



\## Contenido



```te\*t

index.html

css

js

assets

```



\--\*



\# Docker Compose



Archivo:



```t\*xt

docker-compose.yml

```



\---



\# \*ervicio Principal



Nombre:



```tex\*

ova-nequi

```



\---



\## Construcci\*n



```yaml

build: .

```



\---



\## C\*ntenedor



```yaml

container\_name:

\*va-nequi-app

```



\---



\## Puertos

\*```text

8080 → 80

```



\---



\## Acc\*so



```text

http://localhost:8080

\*``



\---



\## Reinicio Automático



`\*`yaml

restart: unless-stopped

```

\*---



\# Servicio Secundario



Nombre\*



```text

nginx-helper

```



\---



\#\* Imagen



```yaml\*nginx:alpine

```



\---



\## Puerto



\*``text\*8081

```



\---



\## Función



Contene\*or auxiliar utilizado para pruebas\*



\---



\# Nginx



Archivo:



```text

\*ginx.conf

```



\---



\# Configuració\*



```nginx

server {

&#x20;   listen 80;\*}

```



\---



\# Directorio Publicado\*

```text

/usr/share/nginx/html

```\*

\---



\# SPA Routing



Configuración\*



```nginx

try\_files $uri $uri/ /i\*dex.html;

```



\---



\## Importancia\*

Permite que Angular gestione ruta\* como:



```text

/home

/modulos

/en\*iar-dinero

/progreso

/certificados\*```



\---



\## Sin esta configuració\*



Se producirían:



```text

404 Not\*Found

```



al refrescar rutas inte\*nas.



\---



\# Build Angular



\## Des\*rrollo



```bash

npm run start

```

\*o



```bash

ng serve

```



\---



\# Pr\*ducción



```bash

ng build

```



\---\*

\## Configuración



```text

Product\*on

```



por defecto.



\---



\# Creac\*ón de Imagen



\## Build



```bash

do\*ker build -t ova-nequi .

```



\---

\*# Ejecución Manual



```bash

docker\*run -p 8080:80 ova-nequi

```



\---

\*# Ejecución Compose



```bash

docke\* compose up -d

```



\---



\# Verific\*ción



\## Contenedores



```bash

doc\*er compose ps

```



\---



\## Logs



```bash

docker compose logs

```



\---



\# Actualización



\## Rebuild



```bash

docker compose down

```



```bash

docker compose build

```



```bash

docker compose up -d

```



\---



\# Compatibilidad



\## Sistemas Operativos



\- Windows

\- Linux

\- macOS



\---



\## Plataformas



\- Docker Desktop

\- Docker Engine



\---



\# Integración CI/CD



Actualmente:



```text

No existe Jenkinsfile

```



\---



\## Estado



La aplicación está:



```text

Preparada para CI/CD

```



pero aún no existe pipeline implementado.



\---



\# Pipeline Recomendado



```text

Git

&#x20;│

&#x20;▼

Jenkins

&#x20;│

&#x20;├── npm install

&#x20;├── npm run lint

&#x20;├── npm test

&#x20;├── ng build

&#x20;├── docker build

&#x20;└── docker push

```



\---



\# Ventajas de la Arquitectura



\## Portabilidad



Misma ejecución en cualquier entorno.



\---



\## Reproducibilidad



Misma versión siempre.



\---



\## Escalabilidad



Permite migrar fácilmente a:



\- Kubernetes

\- Azure Container Apps

\- AWS ECS

\- Google Cloud Run



\---



\## Simplicidad



No requiere instalar Angular en producción.



\---



\# Riesgos Actuales



\## Docker Compose



Actualmente no existen:



```text

volúmenes

networks personalizadas

secrets

```



\---



\## Nginx



Configuración mínima.



No existen:



```text

headers CSP

gzip

cache-control

rate limiting

```



\---



\## Backend



No existe integración con backend productivo.



\---



\# Mejoras Futuras



\## Jenkins



Implementar:



```text

Jenkinsfile

```



\---



\## SonarQube



Agregar análisis de calidad.



\---



\## Docker Registry



Publicar imágenes.



\---



\## HTTPS



Integrar certificados TLS.



\---



\## Reverse Proxy



Implementar:



```text

Nginx avanzado

Traefik

```



\---



\# Estado Actual



\## Implementado



✅ Dockerfile.



✅ Docker Compose.



✅ Nginx.



✅ Multi Stage Build.



✅ Angular Production Build.



✅ Publicación en contenedor.



\---



\## Pendiente



⚠️ Jenkins.



⚠️ SonarQube.



⚠️ Registry.



⚠️ Observabilidad.



⚠️ Backend real.



\---



\# Conclusión



La estrategia de despliegue de OVA Nequi está basada en una arquitectura moderna Angular + Docker + Nginx.



La solución puede ejecutarse de forma consistente en diferentes entornos y constituye una base sólida para futuras implementaciones de integración continua y despliegue automatizado.

