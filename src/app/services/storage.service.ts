import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { DatabaseService } from './database.service';

export interface AppSettings {
  modoOscuro: boolean;
  tamanoTexto: 'pequeno' | 'medio' | 'grande';
}

export interface SurveyAnswers {
  respuesta1: string;
  respuesta2: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private initialized = false;
  private isNative = false;

  constructor(
    private databaseService: DatabaseService
  ) {}

  async init() {
    if (this.initialized) {
      return;
    }

    this.isNative = Capacitor.getPlatform() !== 'web';

    if (this.isNative) {
      await this.databaseService.initDB();
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

  async saveSurvey(answers: SurveyAnswers) {
    await this.saveValue('survey', JSON.stringify(answers));
  }

  async loadSurvey(): Promise<SurveyAnswers | null> {
    const value = await this.loadValue('survey');
    return value ? JSON.parse(value) as SurveyAnswers : null;
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
