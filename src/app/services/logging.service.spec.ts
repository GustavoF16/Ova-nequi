import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(() => {
    localStorage.clear();
    service = new LoggingService();
    service.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('stores diagnostic entries and redacts sensitive keys', () => {
    service.error('test', 'Request failed', {
      password: 'hidden',
      nested: { accessToken: 'also-hidden', status: 500 }
    });

    const entry = service.getEntries()[0];

    expect(entry.level).toBe('error');
    expect(entry.details).toEqual({
      password: '[REDACTED]',
      nested: {
        accessToken: '[REDACTED]',
        status: '500'
      }
    });
  });

  it('keeps only the most recent 200 entries', () => {
    for (let index = 0; index < 205; index += 1) {
      service.info('test', `Entry ${index}`);
    }

    const entries = service.getEntries();

    expect(entries.length).toBe(200);
    expect(entries[0].message).toBe('Entry 5');
    expect(entries[199].message).toBe('Entry 204');
  });

  it('clears stored entries', () => {
    service.info('test', 'Temporary entry');

    service.clear();

    expect(service.getEntries()).toEqual([]);
  });
});
