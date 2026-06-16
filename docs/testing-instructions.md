Testing Instructions - ova-nequi
================================

This document explains how to test the application locally on web and on Android.

Prerequisites
-------------
- Node.js 18+ / npm
- Java JDK 11+ (for Android builds)
- Android SDK + emulator or a real device
- Capacitor CLI: installed via `npm install -g @capacitor/cli` (optional if using npm scripts)
- If you plan to test secure storage: a compatible secure storage plugin must be installed and synced to native projects.

1) Web testing (development)
----------------------------
- Install dependencies:
```bash
npm install
```

- Run development build and serve (hot reload):
```bash
npm run start
# or
npx ng serve --configuration development
```

- Manual test cases (web):
  - Register a new user:
    - Go to `/register`, enter email and password.
    - Expect stored profile in `localStorage` (key `user:<email>`) with `passwordHash` and `salt`.
  - Login:
    - Go to `/login`, enter credentials.
    - Expect `login` key in `localStorage` with `email`, `token`, `expires`.
  - Logout:
    - Click the logout button in the header; expect navigation to `/login` and `login` cleared.
  - Progress per-module:
    - Visit `modulos`, `encuestas`, `simulaciones`, `certificados` pages and perform the actions that mark modules complete.
    - Go to `progreso` page and verify each module shows completion and overall progress updated.
  - Offline sync queue:
    - Disable network (Chrome devtools > Offline) and submit a survey/simulation/certificate.
    - Confirm entries are queued (open devtools, check `localStorage` `pendingSyncQueue`).
    - Re-enable network and verify queue flushes (network request stubbed or real API).

2) Web testing (production build)
---------------------------------
- Build production bundle:
```bash
npx ng build --configuration production
```
- Serve `www/` via a static server (e.g., `npx http-server www -p 8080`) to emulate PWA.
- Test service worker: open `chrome://service-worker-internals` or Application tab to confirm `ngsw-worker.js` registered.

3) Android testing (emulator / device)
--------------------------------------
Note: Secure storage is not fully functional until a compatible plugin is installed and `npx cap sync` is run.

- Build the web app for production:
```bash
npx ng build --configuration production
```

- Copy web assets to native and open Android Studio:
```bash
npx cap copy android
npx cap open android
```

- In Android Studio: build & run on emulator or device.

- Manual test cases (Android):
  - Register/Login/Logout flows as in web.
  - Inspect local storage:
    - For secure storage: if plugin installed successfully, `login` should be in Keychain/Keystore and not in plain SQLite/localStorage.
    - For fallback: check the `storage` table in the app's SQLite DB (use `adb` and sqlite3 or in-app debug pages).
  - Offline queue: same as web — disable network, perform actions, re-enable.

4) Secure storage plugin installation (example)
------------------------------------------------
If you want secure native storage, choose a plugin and install it; example with a cordova plugin:
```bash
npm install cordova-plugin-secure-storage-echo
npx cap sync
```
After installing a plugin, rebuild native project and test that the secure storage APIs are callable from `StorageService`.

5) Notes / troubleshooting
--------------------------
- The repository currently uses dynamic import at runtime for the secure storage plugin. If you install a different plugin, you may need to adapt `StorageService` to call the plugin's API shape.
- If NPM returns 404 when installing a plugin, check network/proxy settings and verify the plugin name and package availability on npmjs.com.


Contact
-------
If you want, I can:
- Add a logout confirmation modal
- Integrate a specific secure storage plugin and update code to its API
- Add E2E tests (Playwright/Cypress)

Files changed during this task:
- `src/app/services/storage.service.ts`
- `src/app/pages/register/register.page.ts`
- `src/app/pages/login/login.page.ts`
- `src/app/app.component.html`
- `src/app/app.component.ts`
- `package.json`

Report file: `docs/implementation-gap-report.md`
Testing docs: `docs/testing-instructions.md`
