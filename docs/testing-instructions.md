# Instrucciones de Prueba - OVA Nequi

## Objetivo

Estas instrucciones permiten repetir la validación web, Android, offline,
persistencia, seguridad local y sincronización remota opcional.

## Prerrequisitos

- Node.js compatible con Angular 20.
- npm.
- JDK y Android SDK para compilar Android.
- Teléfono Android o emulador.
- No se requieren credenciales de Supabase para probar el modo local.

## Validación automatizada

Desde la raíz:

```powershell
npm install
npm test -- --watch=false --browsers=ChromeHeadless
npm run lint
npm run build
npx cap sync android
Set-Location android
.\gradlew.bat assembleDebug --no-daemon
```

La suite esperada es de 14 pruebas exitosas. El build puede mostrar
advertencias CommonJS de dependencias de generación PDF; no son fallos.

## Prueba manual Android

Instala:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Prueba en este orden:

1. Registrar un usuario y confirmar la redirección al login.
2. Iniciar sesión con sus credenciales.
3. Navegar por módulos, progreso y certificados.
4. Cerrar sesión y comprobar que las rutas internas quedan protegidas.
5. Cerrar y abrir la app; verificar la sesión y el progreso esperados.
6. Crear usuarios distintos y confirmar que no comparten progreso.
7. Generar un certificado.
8. Activar modo avión y esperar el cambio a “Sin conexión”.
9. Completar la encuesta y confirmar el mensaje de guardado local.
10. Desactivar modo avión y confirmar “En línea”.
11. Reabrir la encuesta y verificar que las respuestas siguen presentes.

## Prueba Web local

```powershell
npm start
```

En el navegador:

- Verifica registro, login, logout y rutas protegidas.
- Revisa que el progreso sea independiente por correo.
- Usa las herramientas de desarrollador para activar Offline.
- Guarda encuesta, simulación o certificado.
- Comprueba la cola `pendingSyncQueue`.
- Restablece la red y confirma el intento de sincronización.

## Prueba PWA

```powershell
npm run build
npx http-server www -p 8080
```

Sirve la aplicación mediante HTTPS para una validación completa del Service
Worker. Comprueba en DevTools > Application:

- `ngsw-worker.js`.
- `ngsw.json`.
- Manifest.
- Iconos.
- Recursos VTT.

## Prueba de almacenamiento nativo

En Android, `login` y los perfiles deben ser gestionados por
`@aparajita/capacitor-secure-storage`, no por la tabla SQLite. Los datos
funcionales permanecen en SQLite. La migración desde SQLite se produce al leer
por primera vez una clave sensible antigua.

No se debe inspeccionar ni publicar contraseñas. La verificación correcta es
funcional: cerrar, abrir, expirar sesión y confirmar que el usuario puede
autenticarse sin pérdida de progreso.

## Configuración y validación de Supabase

1. Crear un proyecto gratuito en Supabase.
2. Ejecutar [`supabase/schema.sql`](../supabase/schema.sql).
3. Configurar en ambos archivos de entorno:

```typescript
apiUrl: 'https://TU_PROYECTO.supabase.co/rest/v1',
apiKey: 'CLAVE_PUBLICA_ANON',
remoteSyncEnabled: true
```

4. Ejecutar también los permisos SQL del esquema si el proyecto ya tenía las
   tablas creadas:

```sql
grant insert on table public.surveys to anon, authenticated;
grant insert on table public.simulations to anon, authenticated;
grant insert on table public.certificates to anon, authenticated;
```

5. Nunca usar `service_role` ni una secret key en la APK.
6. Ejecutar nuevamente tests, build, sync y `assembleDebug`.
7. Probar una encuesta, simulación y certificado online. Confirmar exactamente
   un registro nuevo por cada acción en las tablas correspondientes.
8. Repetir cada acción con modo avión, recuperar la red y confirmar un solo
   registro posterior al reintento.
9. Confirmar los registros en las tablas `surveys`, `simulations` y
   `certificates`.

Si Supabase no responde, la app debe conservar el dato local y mantenerlo en
la cola. No se debe marcar como sincronizado un registro que recibió error.

## Diagnóstico de fallos

- Estado de red incorrecto: revisar `@capacitor/network` y ejecutar `npx cap sync`.
- APK antigua: recompilar y reinstalar `app-debug.apk`.
- Datos mezclados: revisar el usuario activo y las claves con sufijo de correo.
- Cola vacía inesperadamente: comprobar si el servidor respondió correctamente.
- Fallo Android por SDK: revisar `android/local.properties`, que es local e
  ignorado por Git.
- Fallo Supabase 401/403: comprobar URL, clave `anon` y políticas RLS.
- Tres registros por una acción: desinstalar la APK anterior, instalar la APK
  más reciente y verificar que el botón se deshabilita durante el envío.

## Criterio de aceptación

La fase se considera aprobada cuando:

- Todos los tests automatizados pasan.
- Lint y build pasan.
- Android compila.
- La app funciona sin Supabase.
- La app conserva datos offline.
- La sincronización remota solo elimina pendientes después de una respuesta
  exitosa.
- Un único toque produce un único registro remoto para encuesta, simulación y
  certificado.
