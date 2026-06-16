import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
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
  isOnline = true;
  private networkSubscription!: Subscription;

  progreso: number = 0;

  mensaje: string = '';

  constructor(
    private storageService: StorageService
  ) {
    this.cargarProgreso();
  }

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(
      status => this.isOnline = status
    );
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async cargarProgreso() {
    this.progreso = await this.storageService.loadProgress();

    if (this.progreso > 1) {
      this.progreso = 1;
    }

    if (this.progreso === 0) {
      this.progreso = 0.6;
      await this.storageService.saveProgress(this.progreso);
    }

    if (this.progreso >= 1) {
      this.mensaje = '🎉 Has completado todo el curso.';
    } else if (this.progreso >= 0.5) {
      this.mensaje = '👍 Vas muy bien, sigue así.';
    } else {
      this.mensaje = '🚀 Comienza a aprender con los módulos.';
    }
  }

}
``