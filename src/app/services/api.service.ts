import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CertificateData, SimulationData, SurveyAnswers } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private remoteSyncEnabled = environment.remoteSyncEnabled;

  saveSurvey(answers: SurveyAnswers, userEmail?: string): Observable<void> {
    return this.post('surveys', {
      user_email: userEmail,
      respuesta1: answers.respuesta1,
      respuesta2: answers.respuesta2
    });
  }

  saveSimulation(data: SimulationData, userEmail?: string): Observable<void> {
    return this.post('simulations', {
      user_email: userEmail,
      numero: data.numero,
      monto: data.monto
    });
  }

  saveCertificate(data: CertificateData, userEmail?: string): Observable<void> {
    return this.post('certificates', {
      user_email: userEmail,
      nombre: data.nombre,
      fecha: data.fecha
    });
  }

  private post(resource: string, payload: Record<string, unknown>): Observable<void> {
    if (!this.remoteSyncEnabled || !this.apiUrl || !this.apiKey) {
      return throwError(() => new Error(
        'La sincronización remota no está configurada; el dato permanecerá en la cola local.'
      ));
    }

    const headers = new HttpHeaders({
      apikey: this.apiKey,
      Authorization: `Bearer ${this.apiKey}`,
      Prefer: 'return=minimal'
    });

    return this.http.post<void>(
      `${this.apiUrl.replace(/\/$/, '')}/${resource}`,
      payload,
      { headers }
    );
  }
}
