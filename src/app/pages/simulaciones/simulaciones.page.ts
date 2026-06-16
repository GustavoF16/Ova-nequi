import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';

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
export class SimulacionesPage {

  numero: string = '';
  monto: number = 0;
  mensaje: string = '';

  constructor(private storageService: StorageService) {
    this.cargarSimulacion();
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
      this.mensaje = '✅ Dinero enviado correctamente';
    } else {
      this.mensaje = '⚠️ Complete todos los campos';
    }
  }

}