import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggingService } from '../services/logging.service';

export const loggingInterceptor: HttpInterceptorFn = (request, next) => {
  const logger = inject(LoggingService);
  const startedAt = performance.now();

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      logger.error('http', 'Solicitud HTTP fallida', {
        method: request.method,
        url: request.url,
        status: error.status,
        statusText: error.statusText,
        durationMs: Math.round(performance.now() - startedAt)
      });
      return throwError(() => error);
    })
  );
};
