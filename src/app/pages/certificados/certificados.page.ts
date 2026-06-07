import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-certificados',
  templateUrl: 'certificados.page.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class CertificadosPage {

  nombre: string = 'Gustavo Forero';

  fecha: string = new Date().toLocaleDateString();

  mensaje: string = '';

  generarCertificado() {

    this.mensaje =
    '✅ Certificado generado correctamente';

  }

}
