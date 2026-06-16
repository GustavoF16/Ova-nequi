import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CertificateData, SimulationData, SurveyAnswers } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  saveSurvey(answers: SurveyAnswers): Observable<any> {
    return this.http.post(`${this.apiUrl}/survey`, answers);
  }

  saveSimulation(data: SimulationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/simulation`, data);
  }

  saveCertificate(data: CertificateData): Observable<any> {
    return this.http.post(`${this.apiUrl}/certificate`, data);
  }
}
