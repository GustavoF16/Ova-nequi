import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, of } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { DatabaseService } from './database.service';
import { NetworkService } from './network.service';
import { ApiService } from './api.service';

export interface AppSettings {
  modoOscuro: boolean;
  tamanoTexto: 'pequeno' | 'medio' | 'grande';
}

export interface SurveyAnswers {
  respuesta1: string;
  respuesta2: string;
}

export interface SendMoneyLessonAnswers {
  pregunta1: string;
  pregunta2: string;
  pregunta3: string;
}

export interface SendMoneyLessonRecord extends SendMoneyLessonAnswers {
  score: number;
  completed: boolean;
  savedAt: string;
}

export interface ReceivePaymentsAttempt {
  selectedOption: string;
  isCorrect: boolean;
  savedAt: string;
}

export interface PayServicesAttempt {
  crosswordAnswers: Record<string, string>;
  foundWords: string[];
  score: number;
  completed: boolean;
  savedAt: string;
}

export interface LoginData {
  email: string;
}

export interface SimulationData {
  numero: string;
  monto: number;
}

export interface CertificateData {
  nombre: string;
  fecha: string;
}

export interface UserProfile {
  nombre?: string;
  apellido?: string;
  cedula?: string;
  email: string;
  passwordHash?: string;
  salt?: string;
  password?: string;
}
export type UserProgressMap = Record<string, number | undefined> & {
  overall?: number;
};

export type PendingSyncType = 'survey' | 'simulation' | 'certificate';

export interface PendingSyncItem {
  id: string;
  type: PendingSyncType;
  data: SurveyAnswers | SimulationData | CertificateData;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private initialized = false;
  private initializing = false;
  private isNative = false;

  private databaseService = inject(DatabaseService);
  private networkService = inject(NetworkService);
  private apiService = inject(ApiService);

  private pendingSyncItemsKey = 'pendingSyncQueue';
  private pendingSyncSubject = new BehaviorSubject<number>(0);
  public pendingSyncCount$ = this.pendingSyncSubject.asObservable();

  constructor() {
    this.networkService.online$.subscribe(async online => {
      if (online && this.initialized) {
        const count = await this.flushPendingSyncQueue();
        if (count > 0) {
          console.log(`✅ Sincronizados ${count} elementos pendientes`);
        }
      }
    });
  }

  async init() {
    if (this.initialized || this.initializing) {
      return;
    }

    this.initializing = true;
    this.isNative = Capacitor.getPlatform() !== 'web';

    if (this.isNative) {
      await this.databaseService.initDB();
    }

    this.initialized = true;
    this.initializing = false;

    await this.updatePendingSyncCount();

    if (this.networkService.isOnline) {
      await this.flushPendingSyncQueue();
    }
  }

  async saveProgress(progreso: number) {
    const email = await this.getCurrentUserEmail();
    if (email) {
      await this.saveOverallProgressForUser(email, progreso);
      return;
    }

    await this.saveValue('progress', progreso.toString());
  }

  async loadProgress(): Promise<number> {
    const email = await this.getCurrentUserEmail();
    if (email) {
      return await this.loadOverallProgressForUser(email);
    }

    const value = await this.loadValue('progress');
    return value !== null ? parseFloat(value) || 0 : 0;
  }

  async saveSettings(settings: AppSettings) {
    await this.saveValue('settings', JSON.stringify(settings));
  }

  async loadSettings(): Promise<AppSettings | null> {
    const value = await this.loadValue('settings');
    return value ? JSON.parse(value) as AppSettings : null;
  }

  async saveSettingsForUser(email: string, settings: AppSettings) {
    if (!email) {
      await this.saveSettings(settings);
      return;
    }

    await this.saveValue(`settings:${email}`, JSON.stringify(settings));
  }

  async loadSettingsForUser(email: string): Promise<AppSettings | null> {
    if (!email) {
      return this.loadSettings();
    }

    const value = await this.loadValue(`settings:${email}`);
    return value ? JSON.parse(value) as AppSettings : null;
  }

  async getCurrentUserEmail(): Promise<string | null> {
    const login = await this.loadLogin();
    return login?.email ?? null;
  }

  private getProgressKey(email: string): string {
    return `progress:${email}`;
  }

  async saveModuleProgressForCurrentUser(moduleId: string, progreso: number) {
    const email = await this.getCurrentUserEmail();
    if (!email) return;

    await this.saveModuleProgress(email, moduleId, progreso);
  }

  async loadModuleProgressForCurrentUser(moduleId: string): Promise<number> {
    const email = await this.getCurrentUserEmail();
    if (!email) return 0;

    return await this.loadModuleProgress(email, moduleId);
  }

  async loadAllModuleProgressForCurrentUser(): Promise<UserProgressMap> {
    const email = await this.getCurrentUserEmail();
    if (!email) return {};

    return await this.loadAllModuleProgressForUser(email);
  }

  async loadOverallProgressForCurrentUser(): Promise<number> {
    const email = await this.getCurrentUserEmail();
    if (!email) {
      const value = await this.loadValue('progress');
      return value !== null ? parseFloat(value) || 0 : 0;
    }

    return await this.loadOverallProgressForUser(email);
  }

  async saveModuleProgress(email: string, moduleId: string, progreso: number) {
    const progressMap = await this.loadUserProgressMap(email) ?? {};
    progressMap[moduleId] = Math.max(0, Math.min(1, progreso));
    await this.saveUserProgressMap(email, progressMap);
  }

  async loadModuleProgress(email: string, moduleId: string): Promise<number> {
    const progressMap = await this.loadUserProgressMap(email);
    return progressMap?.[moduleId] ?? 0;
  }

  async loadAllModuleProgressForUser(email: string): Promise<UserProgressMap> {
    const progressMap = await this.loadUserProgressMap(email) ?? {};
    const moduleIds = ['modulos', 'sendMoney', 'receivePayments', 'payServices', 'simulation', 'survey', 'certificate'];
    const result: UserProgressMap = {};

    for (const key of moduleIds) {
      result[key] = progressMap[key] ?? 0;
    }

    return result;
  }

  async saveUserProgressMap(email: string, progressMap: UserProgressMap) {
    await this.saveValue(this.getProgressKey(email), JSON.stringify(progressMap));
  }

  async loadUserProgressMap(email: string): Promise<UserProgressMap | null> {
    const value = await this.loadValue(this.getProgressKey(email));
    return value ? JSON.parse(value) as UserProgressMap : null;
  }

  async saveOverallProgressForUser(email: string, progreso: number) {
    const progressMap = await this.loadUserProgressMap(email) ?? {};
    progressMap.overall = Math.max(0, Math.min(1, progreso));
    await this.saveUserProgressMap(email, progressMap);
  }

  async loadOverallProgressForUser(email: string): Promise<number> {
    const progressMap = await this.loadUserProgressMap(email) ?? {};
    const moduleIds = ['modulos', 'sendMoney', 'receivePayments', 'payServices', 'simulation', 'survey', 'certificate'];
    let sum = 0;
    let foundAny = false;

    for (const key of moduleIds) {
      if (typeof progressMap[key] === 'number') {
        foundAny = true;
      }
      sum += progressMap[key] ?? 0;
    }

    if (foundAny) {
      return moduleIds.length > 0 ? sum / moduleIds.length : 0;
    }

    return typeof progressMap.overall === 'number' ? progressMap.overall : 0;
  }

  async saveSurvey(answers: SurveyAnswers) {
    await this.saveLocalSurvey(answers);

    if (!this.networkService.isOnline) {
      await this.enqueuePendingSync('survey', answers);
      return;
    }

    await this.flushPendingSyncQueue();
  }

  async loadSurvey(): Promise<SurveyAnswers | null> {
    const value = await this.loadValue('survey');
    return value ? JSON.parse(value) as SurveyAnswers : null;
  }

  async saveSendMoneyLesson(record: SendMoneyLessonRecord) {
    await this.saveValue('send-money-lesson', JSON.stringify(record));
  }

  async loadSendMoneyLesson(): Promise<SendMoneyLessonRecord | null> {
    const value = await this.loadValue('send-money-lesson');
    return value ? JSON.parse(value) as SendMoneyLessonRecord : null;
  }

  async saveReceivePaymentsAttempt(attempt: ReceivePaymentsAttempt) {
    const email = await this.getCurrentUserEmail();
    const key = email ? `receive-payments-history:${email}` : 'receive-payments-history';
    const history = await this.loadReceivePaymentsHistory();
    history.unshift(attempt);
    await this.saveValue(key, JSON.stringify(history.slice(0, 10)));
  }

  async loadReceivePaymentsHistory(): Promise<ReceivePaymentsAttempt[]> {
    const email = await this.getCurrentUserEmail();
    const key = email ? `receive-payments-history:${email}` : 'receive-payments-history';
    const value = await this.loadValue(key);

    if (!value) {
      return [];
    }

    try {
      return JSON.parse(value) as ReceivePaymentsAttempt[];
    } catch {
      return [];
    }
  }

  async savePayServicesAttempt(attempt: PayServicesAttempt) {
    const email = await this.getCurrentUserEmail();
    const key = email ? `pay-services-history:${email}` : 'pay-services-history';
    const history = await this.loadPayServicesHistory();
    history.unshift(attempt);
    await this.saveValue(key, JSON.stringify(history.slice(0, 10)));
  }

  async loadPayServicesHistory(): Promise<PayServicesAttempt[]> {
    const email = await this.getCurrentUserEmail();
    const key = email ? `pay-services-history:${email}` : 'pay-services-history';
    const value = await this.loadValue(key);

    if (!value) {
      return [];
    }

    try {
      return JSON.parse(value) as PayServicesAttempt[];
    } catch {
      return [];
    }
  }

  async saveSimulation(data: SimulationData) {
    await this.saveLocalSimulation(data);

    if (!this.networkService.isOnline) {
      await this.enqueuePendingSync('simulation', data);
      return;
    }

    await this.flushPendingSyncQueue();
  }

  async loadSimulation(): Promise<SimulationData | null> {
    const value = await this.loadValue('simulation');
    return value ? JSON.parse(value) as SimulationData : null;
  }

  async saveCertificate(data: CertificateData) {
    await this.saveLocalCertificate(data);

    if (!this.networkService.isOnline) {
      await this.enqueuePendingSync('certificate', data);
      return;
    }

    await this.flushPendingSyncQueue();
  }

  async loadCertificate(): Promise<CertificateData | null> {
    const value = await this.loadValue('certificate');
    return value ? JSON.parse(value) as CertificateData : null;
  }

  async saveLogin(data: LoginData) {
    const token = Math.random().toString(36).slice(2);
    const expires = Date.now() + 24 * 60 * 60 * 1000;
    const payload = { email: data.email, token, expires };

    await this.saveValue('login', JSON.stringify(payload));
  }

  async loadLogin(): Promise<LoginData | null> {
    const value = await this.loadValue('login');
    if (!value) return null;

    try {
      const parsed = JSON.parse(value) as { email: string; token?: string; expires?: number };

      if (parsed.expires && Date.now() > parsed.expires) {
        await this.logout();
        return null;
      }

      return { email: parsed.email };
    } catch {
      return null;
    }
  }

  async logout() {
    await this.saveValue('login', '');
  }

  private async generateSalt(): Promise<string> {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return this.base64Encode(array.buffer);
  }

  private base64Encode(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';

    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }

  private base64Decode(str: string): ArrayBuffer {
    const binary = atob(str);
    const len = binary.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
  }

  async hashPassword(password: string, saltIn?: string): Promise<{ salt: string; hash: string }> {
    const salt = saltIn ?? await this.generateSalt();
    const enc = new TextEncoder();
    const passKey = enc.encode(password);
    const saltBuf = this.base64Decode(salt);

    const key = await crypto.subtle.importKey(
      'raw',
      passKey,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    const derived = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: saltBuf, iterations: 100000, hash: 'SHA-256' },
      key,
      256
    );

    const hash = this.base64Encode(derived);
    return { salt, hash };
  }

  async verifyPassword(
    plain: string,
    salt: string | undefined,
    expectedHash: string | undefined
  ): Promise<boolean> {
    if (!expectedHash || !salt) return false;

    const { hash } = await this.hashPassword(plain, salt);
    return hash === expectedHash;
  }

  async saveUserProfile(profile: UserProfile) {
    await this.saveValue(`user:${profile.email}`, JSON.stringify(profile));
  }

  async loadUserProfile(email: string): Promise<UserProfile | null> {
    const value = await this.loadValue(`user:${email}`);
    return value ? JSON.parse(value) as UserProfile : null;
  }

  async loadPendingSyncQueue(): Promise<PendingSyncItem[]> {
    const value = await this.loadValue(this.pendingSyncItemsKey);
    if (!value) return [];

    try {
      return JSON.parse(value) as PendingSyncItem[];
    } catch {
      return [];
    }
  }

  private async savePendingSyncQueue(items: PendingSyncItem[]) {
    await this.saveValue(this.pendingSyncItemsKey, JSON.stringify(items));
    this.pendingSyncSubject.next(items.length);
  }

  private async enqueuePendingSync(
    type: PendingSyncType,
    data: SurveyAnswers | SimulationData | CertificateData
  ) {
    const queue = await this.loadPendingSyncQueue();

    const item: PendingSyncItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type,
      data,
      timestamp: Date.now()
    };

    queue.push(item);
    await this.savePendingSyncQueue(queue);
  }

  async flushPendingSyncQueue(): Promise<number> {
    if (!this.networkService.isOnline) {
      return 0;
    }

    const queue = await this.loadPendingSyncQueue();
    if (!queue.length) {
      return 0;
    }

    const failedItems: PendingSyncItem[] = [];

    for (const item of queue) {
      try {
        switch (item.type) {
          case 'survey':
            await firstValueFrom(
              this.apiService.saveSurvey(item.data as SurveyAnswers).pipe(
                catchError(() => of(null))
              )
            );
            await this.saveLocalSurvey(item.data as SurveyAnswers);
            break;

          case 'simulation':
            await firstValueFrom(
              this.apiService.saveSimulation(item.data as SimulationData).pipe(
                catchError(() => of(null))
              )
            );
            await this.saveLocalSimulation(item.data as SimulationData);
            break;

          case 'certificate':
            await firstValueFrom(
              this.apiService.saveCertificate(item.data as CertificateData).pipe(
                catchError(() => of(null))
              )
            );
            await this.saveLocalCertificate(item.data as CertificateData);
            break;
        }
      } catch {
        failedItems.push(item);
      }
    }

    if (failedItems.length > 0) {
      await this.savePendingSyncQueue(failedItems);
      return queue.length - failedItems.length;
    }

    await this.clearPendingSyncQueue();
    return queue.length;
  }

  private async clearPendingSyncQueue() {
    await this.savePendingSyncQueue([]);
  }

  private async updatePendingSyncCount() {
    const queue = await this.loadPendingSyncQueue();
    this.pendingSyncSubject.next(queue.length);
  }

  private async saveLocalSurvey(answers: SurveyAnswers) {
    await this.saveValue('survey', JSON.stringify(answers));
  }

  private async saveLocalSimulation(data: SimulationData) {
    await this.saveValue('simulation', JSON.stringify(data));
  }

  private async saveLocalCertificate(data: CertificateData) {
    await this.saveValue('certificate', JSON.stringify(data));
  }

  private async saveValue(key: string, value: string) {
    await this.init();

    if (this.isNative) {
      if (this.shouldUseSecureStorage(key)) {
        const ok = await this.secureSet(key, value);
        if (ok) return;
      }

      await this.databaseService.setItem(key, value);
      return;
    }

    this.setWebItem(key, value);
  }

  private async loadValue(key: string): Promise<string | null> {
    await this.init();

    if (this.isNative) {
      if (this.shouldUseSecureStorage(key)) {
        const value = await this.secureGet(key);
        if (value !== null) return value;
      }

      return this.databaseService.getItem(key);
    }

    return this.getWebItem(key);
  }

  private shouldUseSecureStorage(key: string): boolean {
    if (!key) return false;
    return key === 'login' || key.startsWith('user:') || key.includes('token');
  }

  private async secureSet(key: string, value: string): Promise<boolean> {
    try {
      const dynamicImport: any = (eval('import') as any);
      const mod: any = await dynamicImport('@capacitor-community/secure-storage');
      const plugin = mod?.SecureStoragePlugin ?? mod?.SecureStorage ?? mod;

      if (!plugin || typeof plugin.set !== 'function') {
        return false;
      }

      await plugin.set({ key, value });
      return true;
    } catch {
      return false;
    }
  }

  private async secureGet(key: string): Promise<string | null> {
    try {
      const dynamicImport: any = (eval('import') as any);
      const mod: any = await dynamicImport('@capacitor-community/secure-storage');
      const plugin = mod?.SecureStoragePlugin ?? mod?.SecureStorage ?? mod;

      if (!plugin || typeof plugin.get !== 'function') {
        return null;
      }

      const res = await plugin.get({ key });

      if (res == null) return null;
      if (typeof res === 'object' && 'value' in res) return res.value as string;
      if (typeof res === 'string') return res;

      return null;
    } catch {
      return null;
    }
  }

  private getWebItem(key: string): string | null {
    try {
      if (typeof window === 'undefined') {
        return null;
      }

      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private setWebItem(key: string, value: string) {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.setItem(key, value);
    } catch {
      // localStorage puede no estar disponible.
    }
  }
}