import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService, AppSettings } from '../../services/storage.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: 'configuracion.page.html',
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class ConfiguracionPage {

  modoOscuro: boolean = false;

  tamanoTexto: 'pequeno' | 'medio' | 'grande' = 'medio';

  mensaje: string = '';

  constructor(
    private storageService: StorageService
  ) {
    this.cargarConfiguracion();
  }

  async cargarConfiguracion() {
    const settings = await this.storageService.loadSettings();

    if (settings) {
      this.modoOscuro = settings.modoOscuro;
      this.tamanoTexto = settings.tamanoTexto;
      this.aplicarConfiguracion(settings);
    }
  }

  async cambiarModo() {

    const settings: AppSettings = {
      modoOscuro: this.modoOscuro,
      tamanoTexto: this.tamanoTexto
    };

    await this.storageService.saveSettings(settings);
    this.aplicarConfiguracion(settings);
    this.mensaje = this.modoOscuro ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado';
  }

  async cambiarTexto() {

    const settings: AppSettings = {
      modoOscuro: this.modoOscuro,
      tamanoTexto: this.tamanoTexto
    };

    await this.storageService.saveSettings(settings);
    this.aplicarConfiguracion(settings);
    this.mensaje = '🔤 Tamaño de texto cambiado';

  }

  private aplicarConfiguracion(settings: AppSettings) {
    if (settings.modoOscuro) {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#f5f5f5';
      this.mensaje = '🌙 Modo oscuro activado';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
      this.mensaje = '☀️ Modo claro activado';
    }

    if (settings.tamanoTexto === 'pequeno') {
      document.body.style.fontSize = '14px';
    } else if (settings.tamanoTexto === 'medio') {
      document.body.style.fontSize = '16px';
    } else {
      document.body.style.fontSize = '20px';
    }
  }

}
