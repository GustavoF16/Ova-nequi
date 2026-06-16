import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { DatabaseService } from './database.service';
import { NetworkService } from './network.service';

export interface AppSettings {
  modoOscuro: boolean;
  tamanoTexto: 'pequeno' | 'medio' | 'grande';
}

export interface SurveyAnswers {
  respuesta1: string;
  respuesta2: string;
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
  email: string;
  password: string;
}

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
  private isNative = false;

  private databaseService = inject(DatabaseService);
  private networkService = inject(NetworkService);

  private pendingSyncItemsKey = 'pendingSyncQueue';
  private pendingSyncSubject = new BehaviorSubject<number>(0);
  public pendingSyncCount$ = this.pendingSyncSubject.asObservable();

  constructor() {
    this.networkService.online$.subscribe(async online => {
      if (online) {
        const count = await this.flushPendingSyncQueue();
        if (count > 0) {
          console.log(`✅ Sincronizados ${count} elementos pendientes`);
        }
      }
    });
  }

  async init() {
    if (this.initialized) {
      return;
    }

    this.isNative = Capacitor.getPlatform() !== 'web';

    if (this.isNative) {
      await this.databaseService.initDB();
    }

    await this.updatePendingSyncCount();

    if (this.networkService.isOnline) {
      await this.flushPendingSyncQueue();
    }

    this.initialized = true;
  }

  async saveProgress(progreso: number) {
    await this.saveValue('progress', progreso.toString());
  }

  async loadProgress(): Promise<number> {
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

  // Per-user settings helpers
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
    if (value) {
      return JSON.parse(value) as AppSettings;
    }

    return null;
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
    await this.saveValue('login', JSON.stringify(data));
  }

  async loadLogin(): Promise<LoginData | null> {
    const value = await this.loadValue('login');
    return value ? JSON.parse(value) as LoginData : null;
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
    if (!value) {
      return [];
    }

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

  private async enqueuePendingSync(type: PendingSyncType, data: SurveyAnswers | SimulationData | CertificateData) {
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

    for (const item of queue) {
      switch (item.type) {
        case 'survey':
          await this.saveLocalSurvey(item.data as SurveyAnswers);
          break;
        case 'simulation':
          await this.saveLocalSimulation(item.data as SimulationData);
          break;
        case 'certificate':
          await this.saveLocalCertificate(item.data as CertificateData);
          break;
      }
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
      await this.databaseService.setItem(key, value);
      return;
    }

    this.setWebItem(key, value);
  }

  private async loadValue(key: string): Promise<string | null> {
    await this.init();

    if (this.isNative) {
      return this.databaseService.getItem(key);
    }

    return this.getWebItem(key);
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
      // localStorage puede no estar disponible en algunos entornos.
    }
  }

}
