import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, throwError } from 'rxjs';
import {
  StorageService,
  SurveyAnswers
} from './storage.service';
import { ApiService } from './api.service';
import { DatabaseService } from './database.service';
import { NetworkService } from './network.service';

class FakeNetworkService {
  private readonly onlineSubject = new BehaviorSubject<boolean>(true);
  readonly online$ = this.onlineSubject.asObservable();

  get isOnline(): boolean {
    return this.onlineSubject.value;
  }

  setOnline(online: boolean): void {
    this.onlineSubject.next(online);
  }
}

describe('StorageService', () => {
  let service: StorageService;
  let network: FakeNetworkService;
  let api: jasmine.SpyObj<ApiService>;

  const survey: SurveyAnswers = {
    respuesta1: 'si',
    respuesta2: 'si'
  };

  beforeEach(() => {
    localStorage.clear();
    network = new FakeNetworkService();
    api = jasmine.createSpyObj<ApiService>('ApiService', [
      'saveSurvey',
      'saveSimulation',
      'saveCertificate'
    ]);
    api.saveSurvey.and.returnValue(of(void 0));
    api.saveSimulation.and.returnValue(of(void 0));
    api.saveCertificate.and.returnValue(of(void 0));

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: ApiService, useValue: api },
        { provide: DatabaseService, useValue: {} },
        { provide: NetworkService, useValue: network }
      ]
    });

    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('separa la encuesta entre usuarios', async () => {
    await service.saveLogin({ email: 'ana@example.com' });
    await service.saveSurvey(survey);

    await service.logout();
    await service.saveLogin({ email: 'carlos@example.com' });

    expect(await service.loadSurvey()).toBeNull();
  });

  it('encola datos sin conexión y los sincroniza al recuperar la red', async () => {
    network.setOnline(false);
    await service.saveLogin({ email: 'ana@example.com' });

    await service.saveSurvey(survey);

    const pending = await service.loadPendingSyncQueue();
    expect(pending.length).toBe(1);
    expect(pending[0].userEmail).toBe('ana@example.com');
    expect(api.saveSurvey).not.toHaveBeenCalled();

    network.setOnline(true);
    expect(await service.flushPendingSyncQueue()).toBe(1);
    expect(api.saveSurvey).toHaveBeenCalledWith(survey, 'ana@example.com');
    expect(await service.loadPendingSyncQueue()).toEqual([]);
  });

  it('conserva los pendientes cuando la API falla', async () => {
    api.saveSurvey.and.returnValue(
      throwError(() => new Error('API no disponible'))
    );
    await service.saveLogin({ email: 'ana@example.com' });

    await service.saveSurvey(survey);

    expect((await service.loadPendingSyncQueue()).length).toBe(1);
    expect(await service.flushPendingSyncQueue()).toBe(0);
    expect((await service.loadPendingSyncQueue()).length).toBe(1);
  });

  it('procesa únicamente la cola del usuario activo', async () => {
    network.setOnline(false);
    await service.saveLogin({ email: 'ana@example.com' });
    await service.saveSurvey(survey);

    await service.logout();
    await service.saveLogin({ email: 'carlos@example.com' });
    const carlosSurvey: SurveyAnswers = {
      respuesta1: 'no',
      respuesta2: 'si'
    };
    await service.saveSurvey(carlosSurvey);

    network.setOnline(true);
    api.saveSurvey.calls.reset();
    expect(await service.flushPendingSyncQueue()).toBe(1);
    expect(api.saveSurvey).toHaveBeenCalledWith(carlosSurvey, 'carlos@example.com');

    const pending = await service.loadPendingSyncQueue();
    expect(pending.length).toBe(1);
    expect(pending[0].userEmail).toBe('ana@example.com');
  });

  it('genera una sesión con token criptográficamente aleatorio y expiración', async () => {
    await service.saveLogin({ email: 'ana@example.com' });

    const stored = JSON.parse(localStorage.getItem('login') ?? '{}') as {
      token?: string;
      expires?: number;
    };

    expect(stored.token?.length).toBeGreaterThan(30);
    expect(stored.expires).toBeGreaterThan(Date.now());
  });

  it('rechaza una sesión expirada', async () => {
    localStorage.setItem('login', JSON.stringify({
      email: 'ana@example.com',
      token: 'expired',
      expires: Date.now() - 1
    }));

    expect(await service.loadLogin()).toBeNull();
    expect(localStorage.getItem('login')).toBe('');
  });
});
