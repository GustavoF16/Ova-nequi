import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';

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

  constructor(private storageService: StorageService) {
    this.cargarCertificado();
  }

  async cargarCertificado() {
    const saved = await this.storageService.loadCertificate();

    if (saved) {
      this.nombre = saved.nombre;
      this.fecha = saved.fecha;
    }
  }

  async generarCertificado() {
    await this.storageService.saveCertificate({
      nombre: this.nombre,
      fecha: this.fecha
    });

    this.mensaje =
      '✅ Certificado generado correctamente';
  }

}
