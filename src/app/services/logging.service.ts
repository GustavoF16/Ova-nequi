import { ErrorHandler, Injectable, inject } from '@angular/core';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface AppLogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
  details?: Record<string, unknown>;
  route?: string;
}

const LOG_STORAGE_KEY = 'ova-nequi-diagnostic-logs';
const MAX_LOG_ENTRIES = 200;
const REDACTED_KEYS = /password|token|secret|apikey|authorization|salt/i;

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private readonly sessionId = this.getOrCreateSessionId();
  private listenersRegistered = false;

  constructor() {
    this.registerGlobalListeners();
  }

  debug(source: string, message: string, details?: unknown): void {
    this.write('debug', source, message, details);
  }

  info(source: string, message: string, details?: unknown): void {
    this.write('info', source, message, details);
  }

  warn(source: string, message: string, details?: unknown): void {
    this.write('warn', source, message, details);
  }

  error(source: string, message: string, details?: unknown): void {
    this.write('error', source, message, details);
  }

  getEntries(): AppLogEntry[] {
    try {
      const stored = localStorage.getItem(LOG_STORAGE_KEY);
      const entries = stored ? JSON.parse(stored) : [];
      return Array.isArray(entries) ? entries : [];
    } catch {
      return [];
    }
  }

  clear(): void {
    localStorage.removeItem(LOG_STORAGE_KEY);
  }

  export(): void {
    const blob = new Blob(
      [JSON.stringify(this.getEntries(), null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ova-nequi-logs-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  private write(level: LogLevel, source: string, message: string, details?: unknown): void {
    const entry: AppLogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      level,
      source,
      message: this.truncate(message),
      details: this.sanitize(details),
      route: typeof location !== 'undefined' ? location.pathname : undefined
    };

    try {
      const entries = [...this.getEntries(), entry].slice(-MAX_LOG_ENTRIES);
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Logging must never interrupt the application.
    }

    if (level === 'error') {
      console.error(`[${source}] ${message}`, details);
    } else if (level === 'warn') {
      console.warn(`[${source}] ${message}`, details);
    }
  }

  private sanitize(value: unknown): Record<string, unknown> | undefined {
    if (value === undefined) {
      return undefined;
    }

    if (value instanceof Error) {
      return {
        name: value.name,
        message: this.truncate(value.message),
        stack: this.truncate(value.stack ?? '')
      };
    }

    if (typeof value !== 'object' || value === null) {
      return { value: this.truncate(String(value)) };
    }

    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      result[key] = REDACTED_KEYS.test(key)
        ? '[REDACTED]'
        : typeof item === 'object' && item !== null
          ? this.sanitize(item)
          : this.truncate(String(item));
    }
    return result;
  }

  private truncate(value: string): string {
    return value.length > 1000 ? `${value.slice(0, 1000)}…` : value;
  }

  private getOrCreateSessionId(): string {
    const key = 'ova-nequi-diagnostic-session';
    const existing = localStorage.getItem(key);
    if (existing) {
      return existing;
    }

    const id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
    localStorage.setItem(key, id);
    return id;
  }

  private registerGlobalListeners(): void {
    if (this.listenersRegistered || typeof window === 'undefined') {
      return;
    }

    this.listenersRegistered = true;
    window.addEventListener('error', event => {
      this.error('window', event.message || 'Error global del navegador', event.error);
    });
    window.addEventListener('unhandledrejection', event => {
      this.error('window', 'Promesa rechazada sin manejar', event.reason);
    });
    this.info('app', 'Sistema de diagnóstico inicializado', { sessionId: this.sessionId });
  }
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly logger = inject(LoggingService);

  handleError(error: unknown): void {
    this.logger.error('angular', 'Error no controlado de Angular', error);
  }
}
