\# 24 - CI/CD Strategy



\# Estrategia de Integración Continua y Despliegue Continuo



\## Introducción



Este documento describe la estrategia propuesta de CI/CD para OVA Nequi.



Actualmente el proyecto no posee pipelines implementados, sin embargo la arquitectura existente fue diseñada para soportar integración continua y automatización futura.



La estrategia propuesta contempla:



\- Integración Continua.

\- Automatización de pruebas.

\- Validación de calidad.

\- Construcción Docker.

\- Publicación de artefactos.

\- Despliegue futuro.



\---



\# Estado Actual



\## Implementado



\### Angular Build



```text

ng build

```



\---



\### Docker



```text

Dockerfile

docker-compose.yml

```



\---



\### Testing



```text

Jasmine

Karma

Angular TestBed

```



\---



\### Lint



```text

ESLint

```



\---



\## No Implementado



\### Jenkins



No existe:



```text

Jenkinsfile

```



\---



\### GitHub Actions



No existe:



```text

.github/workflows

```



\---



\### SonarQube



No existe integración.



\---



\### Docker Registry



No existe publicación automática.



\---



\# Objetivos de CI/CD



La estrategia busca:



\- Detectar errores tempranamente.

\- Automatizar validaciones.

\- Reducir errores manuales.

\- Mejorar calidad.

\- Facilitar despliegue.



\---



\# Flujo Propuesto



```text

Git Commit

&#x20;    │

&#x20;    ▼

Repositorio

&#x20;    │

&#x20;    ▼

Pipeline Jenkins

&#x20;    │

&#x20;    ├── npm install

&#x20;    ├── npm run lint

&#x20;    ├── npm test

&#x20;    ├── ng build

&#x20;    ├── docker build

&#x20;    ├── sonarqube

&#x20;    └── deploy

```



\---



\# Etapa 1



\## Recuperación Código Fuente



\### Objetivo



Obtener la última versión del repositorio.



\### Jenkins



```groovy

checkout scm

```



\---



\# Etapa 2



\## Instalación Dependencias



\### Comando



```bash

npm install

```



\---



\## Objetivo



Restaurar:



\- Angular

\- Ionic

\- Capacitor

\- Dependencias



\---



\# Etapa 3



\## Análisis Estático



\### Comando



```bash

npm run lint

```



\---



\## Herramienta



```text

ESLint

```



\---



\## Objetivo



Detectar:



\- Errores de código.

\- Inconsistencias.

\- Problemas de calidad.



\---



\# Etapa 4



\## Testing



\### Comando



```bash

npm test

```



\---



\## Frameworks



```text

Karma

Jasmine

```



\---



\## Objetivo



Validar funcionamiento.



\---



\# Etapa 5



\## Build Angular



\### Comando



```bash

ng build --configuration production

```



\---



\## Resultado



```text

www/

```



\---



\# Etapa 6



\## Build Docker



\### Comando



```bash

docker build -t ova-nequi .

```



\---



\## Resultado



Imagen Docker generada.



\---



\# Etapa 7



\## SonarQube



\### Estado



Pendiente implementación.



\---



\## Objetivo



Analizar:



\- Bugs.

\- Vulnerabilidades.

\- Coverage.

\- Code Smells.



\---



\## Indicadores



\### Coverage



Objetivo:



```text

> 80%

```



\---



\### Bugs



Objetivo:



```text

0 críticos

```



\---



\### Vulnerabilidades



Objetivo:



```text

0 altas

```



\---



\# Etapa 8



\## Docker Registry



\### Estado



Pendiente.



\---



\## Opciones



\### Docker Hub



```text

docker.io

```



\---



\### GitHub Container Registry



```text

ghcr.io

```



\---



\### Azure Container Registry



```text

ACR

```



\---



\# Etapa 9



\## Despliegue



\### Estado



Pendiente.



\---



\## Objetivo



Publicar:



```text

Docker

PWA

Android

```



\---



\# SonarQube Propuesto



\## Análisis



```text

TypeScript

HTML

SCSS

```



\---



\## Métricas



\### Bugs



\### Vulnerabilidades



\### Code Smells



\### Cobertura



\### Duplicación



\---



\# Jenkins Propuesto



\## Jenkins Server



Opciones:



\### Docker



```bash

docker run jenkins/jenkins:lts

```



\---



\### Linux



```text

Ubuntu

Debian

Rocky Linux

```



\---



\# Jenkinsfile Propuesto



```groovy

pipeline {

&#x20;   agent any



&#x20;   stages {



&#x20;       stage('Install') {

&#x20;           steps {

&#x20;               sh 'npm install'

&#x20;           }

&#x20;       }



&#x20;       stage('Lint') {

&#x20;           steps {

&#x20;               sh 'npm run lint'

&#x20;           }

&#x20;       }



&#x20;       stage('Test') {

&#x20;           steps {

&#x20;               sh 'npm test'

&#x20;           }

&#x20;       }



&#x20;       stage('Build') {

&#x20;           steps {

&#x20;               sh 'ng build --configuration production'

&#x20;           }

&#x20;       }



&#x20;       stage('Docker Build') {

&#x20;           steps {

&#x20;               sh 'docker build -t ova-nequi .'

&#x20;           }

&#x20;       }

&#x20;   }

}

```



\---



\# GitHub Actions Alternativo



\## Workflow



```yaml

Install



Lint



Test



Build



Docker

```



\---



\# Cobertura Actual



\## Situación



Existen:



```text

Spec Files

Karma

Jasmine

```



\---



\## Limitación



La mayoría de los tests actuales verifican únicamente:



```typescript

expect(component).toBeTruthy()

```



\---



\# Roadmap CI/CD



\## Corto Plazo



Implementar Jenkins.



\---



\## Mediano Plazo



Integrar SonarQube.



\---



\## Largo Plazo



Despliegue automatizado.



\---



\# Beneficios Esperados



\## Calidad



Mayor estabilidad.



\---



\## Productividad



Menos errores manuales.



\---



\## Mantenibilidad



Procesos reproducibles.



\---



\## Auditoría



Trazabilidad de cambios.



\---



\# Conclusión



OVA Nequi posee una base técnica adecuada para incorporar CI/CD.



La infraestructura actual ya dispone de:



\- Angular Build.

\- Docker.

\- Testing.

\- ESLint.



La incorporación de Jenkins y SonarQube representa el siguiente paso natural en la evolución del proyecto hacia una plataforma con procesos de integración continua y control de calidad automatizado.

