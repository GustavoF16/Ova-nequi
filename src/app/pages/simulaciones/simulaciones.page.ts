import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-simulaciones',
  templateUrl: 'simulaciones.page.html',
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

  enviar() {
    if (this.numero && this.monto > 0) {
      this.mensaje = '✅ Dinero enviado correctamente';
    } else {
      this.mensaje = '⚠️ Complete todos los campos';
    }
  }

}