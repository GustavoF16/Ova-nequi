import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService, UserProgressMap } from '../../services/storage.service';
import { NetworkService } from '../../services/network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progreso',
  templateUrl: 'progreso.page.html',
  styleUrls: ['progreso.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class ProgresoPage implements OnInit, OnDestroy {

  private networkService = inject(NetworkService);
  private storageService = inject(StorageService);

  isOnline = true;
  private networkSubscription!: Subscription;

  progreso: number = 0;

  moduleProgress: UserProgressMap = {
    modulos: 0,
    sendMoney: 0,
    receivePayments: 0,
    payServices: 0,
    simulation: 0,
    survey: 0,
    certificate: 0
  };

  moduleKeys: Array<keyof UserProgressMap> = [
    'modulos',
    'sendMoney',
    'receivePayments',
    'payServices',
    'simulation',
    'survey',
    'certificate'
  ];

  moduleLabels: Record<string, string> = {
    modulos: 'Módulos educativos',
    sendMoney: 'Enviar dinero',
    receivePayments: 'Recibir pagos',
    payServices: 'Pagar servicios',
    simulation: 'Simulación',
    survey: 'Encuesta',
    certificate: 'Certificado'
  };

  mensaje: string = '';

  constructor() {
    this.cargarProgreso();
  }

  ngOnInit() {
    this.networkSubscription =
      this.networkService.online$.subscribe(
        status => this.isOnline = status
      );
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async cargarProgreso() {

    this.moduleProgress =
      await this.storageService.loadAllModuleProgressForCurrentUser();

    this.progreso =
      await this.storageService.loadOverallProgressForCurrentUser();

    if (this.progreso > 1) {
      this.progreso = 1;
    }

    if (this.progreso >= 1) {

      this.mensaje =
        '🎉 Has completado todo el curso.';

    } else if (this.progreso >= 0.5) {

      this.mensaje =
        '👍 Vas muy bien, sigue así.';

    } else {

      this.mensaje =
        '🚀 Comienza a aprender con los módulos.';
    }
  }

  getModuleProgress(key: keyof UserProgressMap): number {
    return this.moduleProgress[key] ?? 0;
  }

}