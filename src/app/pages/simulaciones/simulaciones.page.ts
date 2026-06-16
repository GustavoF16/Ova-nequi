import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-simulaciones',
  templateUrl: 'simulaciones.page.html',
  styleUrls: ['simulaciones.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class SimulacionesPage implements OnInit, OnDestroy {
  private networkService = inject(NetworkService);
  private storageService = inject(StorageService);
  isOnline = true;
  private networkSubscription!: Subscription;

  numero: string = '';
  monto: number = 0;
  mensaje: string = '';

  constructor() {
    this.cargarSimulacion();
  }

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(
      status => this.isOnline = status
    );
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async cargarSimulacion() {
    const saved = await this.storageService.loadSimulation();

    if (saved) {
      this.numero = saved.numero;
      this.monto = saved.monto;
    }
  }

  async enviar() {
    if (this.numero && this.monto > 0) {
      await this.storageService.saveSimulation({
        numero: this.numero,
        monto: this.monto
      });
      await this.storageService.saveModuleProgressForCurrentUser('simulation', 1);
      this.mensaje = '✅ Dinero enviado correctamente';
    } else {
      this.mensaje = '⚠️ Complete todos los campos';
    }
  }

}