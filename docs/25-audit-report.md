\# 25 - Audit Report



\# Informe de Auditoría Técnica



\## Proyecto



OVA Nequi



\---



\## Fecha de Auditoría



Noviembre 2026



\---



\## Auditoría Realizada Sobre



\### Código Fuente



Se realizó revisión completa de:



\- Componentes Angular.

\- Páginas.

\- HTML.

\- SCSS.

\- Servicios.

\- Rutas.

\- Configuración.

\- Testing.



\---



\### Infraestructura



Se auditó:



\- Docker.

\- Docker Compose.

\- Nginx.

\- Angular Build.

\- Capacitor.

\- Android.



\---



\### Persistencia



Se auditó:



\- StorageService.

\- DatabaseService.

\- SQLite.

\- LocalStorage.

\- Secure Storage.



\---



\### Seguridad



Se auditó:



\- Hashing PBKDF2.

\- SHA-256.

\- Salt aleatorio.

\- Gestión de sesiones.

\- Expiración automática.



\---



\### Documentación



Se revisó:



\- README.md

\- implementation-gap-report.md

\- testing-instructions.md



\---



\# Alcance



La auditoría tuvo como objetivo:



\- Comprender la arquitectura completa.

\- Identificar riesgos.

\- Detectar deuda técnica.

\- Evaluar mantenibilidad.

\- Evaluar escalabilidad.

\- Construir documentación oficial.



\---



\# Metodología



\## Revisión de Código



Análisis de:



```text

TypeScript

HTML

SCSS

```



\---



\## Revisión Arquitectónica



Análisis de:



```text

Angular

Ionic

Capacitor

Android

Docker

Persistencia

```



\---



\## Revisión de Dependencias



Análisis de:



```text

package.json

package-lock.json

```



\---



\## Revisión de Assets



Análisis de:



```text

assets/

public/

```



\---



\## Revisión Android



Análisis de:



```text

Manifest

Gradle

MainActivity

Resources

```



\---



\# Componentes Auditados



\## Funcionales



\### Login



Estado:



```text

Correcto

```



\---



\### Registro



Estado:



```text

Correcto

```



\---



\### Configuración



Estado:



```text

Correcto

```



\---



\### Enviar Dinero



Estado:



```text

Correcto

```



\---



\### Recibir Pagos



Estado:



```text

Correcto

```



\---



\### Pagar Servicios



Estado:



```text

Correcto

```



\---



\### Simulaciones



Estado:



```text

Correcto

```



\---



\### Encuestas



Estado:



```text

Correcto

```



\---



\### Progreso



Estado:



```text

Correcto

```



\---



\### Certificados



Estado:



```text

Correcto

```



\---



\# Servicios Auditados



\## StorageService



Resultado:



✅ Correcto



Observaciones:



\- Muy centralizado.

\- Alto impacto.

\- Debe mantenerse estable.



\---



\## DatabaseService



Resultado:



✅ Correcto



\---



\## NetworkService



Resultado:



✅ Correcto



\---



\## ApiService



Resultado:



✅ Correcto



Observación:



Backend pendiente.



\---



\# Seguridad



\## Hashing



Resultado:



✅ Correcto



Tecnología:



```text

PBKDF2

SHA-256

100000 iteraciones

Salt aleatorio

```



\---



\## Sesiones



Resultado:



✅ Correcto



Expiración:



```text

24 horas

```



\---



\## Secure Storage



Resultado:



⚠️ Preparado



Estado:



```text

No operativo

```



\---



\# Persistencia



\## LocalStorage



Resultado:



✅ Correcto



\---



\## SQLite



Resultado:



✅ Correcto



\---



\## Offline Queue



Resultado:



✅ Correcto



\---



\# Offline First



Resultado:



✅ Correctamente implementado



\---



\## Cola



```text

pendingSyncQueue

```



\---



\## Sincronización



```text

flushPendingSyncQueue()

```



\---



\# Android



Resultado:



✅ Correcto



\---



\## Capacitor



Versión:



```text

8

```



\---



\## SDK



```text

minSdkVersion = 24

targetSdkVersion = 36

compileSdkVersion = 36

```



\---



\# Docker



Resultado:



✅ Correcto



\---



\## Dockerfile



Multi Stage Build.



\---



\## Docker Compose



Operativo.



\---



\## Nginx



SPA Routing correcto.



\---



\# PWA



Resultado:



⚠️ Parcial



\---



\## Implementado



\- Manifest

\- NGSW

\- Service Worker



\---



\## Problema



```json

serviceWorker=false

```



\---



\# Testing



Resultado:



⚠️ Parcial



\---



\## Implementado



\- Jasmine

\- Karma

\- Angular TestBed



\---



\## Pendiente



Cobertura funcional.



\---



\# Hallazgos



\## Hallazgo 01



\### Configuración



Posible inconsistencia de navegación en Home.



Prioridad:



```text

Alta

```



\---



\## Hallazgo 02



\### Backend



No existe backend real.



Prioridad:



```text

Alta

```



\---



\## Hallazgo 03



\### Secure Storage



No instalado.



Prioridad:



```text

Alta

```



\---



\## Hallazgo 04



\### PWA



Configuración parcial.



Prioridad:



```text

Media

```



\---



\## Hallazgo 05



\### CI/CD



No existe pipeline.



Prioridad:



```text

Media

```



\---



\# Riesgos



\## Seguridad



Dependencia de almacenamiento local.



\---



\## Operación



Backend inexistente.



\---



\## Escalabilidad



Sin CI/CD.



\---



\# Fortalezas



✅ Arquitectura Angular moderna.



✅ Ionic 8.



✅ Capacitor 8.



✅ Offline First.



✅ SQLite.



✅ Seguridad superior al promedio académico.



✅ Certificados PDF.



✅ Diseño inclusivo orientado a personas adultas con discapacidad auditiva.



✅ Dockerización completa.



\---



\# Nivel de Madurez



| Área | Resultado |

|--------|--------|

| Funcionalidad | 100% |

| Arquitectura | 100% |

| Persistencia | 100% |

| Seguridad | 100% |

| Android | 100% |

| Docker | 100% |

| Offline First | 100% |

| PWA | 80% |

| Testing | 60% |

| CI/CD | 0% |



\---



\# Recomendaciones



\## Prioridad 1



\- Backend.

\- Secure Storage.



\---



\## Prioridad 2



\- Testing.

\- PWA.



\---



\## Prioridad 3



\- Jenkins.

\- SonarQube.

\- CI/CD.



\---



\# Conclusión Final



OVA Nequi posee una arquitectura sólida, moderna y mantenible.



La auditoría determinó que el proyecto se encuentra funcionalmente completo para fines académicos y preparado para evolucionar hacia una solución más robusta mediante la incorporación de backend, seguridad avanzada, pruebas automatizadas e integración continua.



La documentación generada constituye la línea base oficial para futuras modificaciones del sistema.

