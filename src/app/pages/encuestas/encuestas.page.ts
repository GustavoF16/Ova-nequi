import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService, SurveyAnswers } from '../../services/storage.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: 'encuestas.page.html',
  styleUrls: ['encuestas.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class EncuestasPage implements OnInit, OnDestroy {
  private networkService = inject(NetworkService);
  private storageService = inject(StorageService);
  isOnline = true;
  private networkSubscription!: Subscription;

  respuesta1: string = '';
  respuesta2: string = '';
  mensaje: string = '';

  constructor() {
    this.cargarEncuesta();
  }

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(
      status => this.isOnline = status
    );
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async cargarEncuesta() {
    const survey = await this.storageService.loadSurvey();

    if (survey) {
      this.respuesta1 = survey.respuesta1;
      this.respuesta2 = survey.respuesta2;
    }
  }

  async enviarEncuesta() {

    if (this.respuesta1 && this.respuesta2) {
      await this.storageService.saveSurvey({
        respuesta1: this.respuesta1,
        respuesta2: this.respuesta2
      });

      this.mensaje =
      '✅ Encuesta enviada correctamente';

    } else {

      this.mensaje =
      '⚠️ Debes responder todas las preguntas';

    }

  }

}