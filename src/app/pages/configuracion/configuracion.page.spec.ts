import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService, AppSettings } from '../../services/storage.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: 'configuracion.page.html',
  styleUrls: ['configuracion.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class ConfiguracionPage {
  private storageService = inject(StorageService);

  modoOscuro: boolean = false;

  tamanoTexto: 'pequeno' | 'medio' | 'grande' = 'medio';

  mensaje: string = '';

  constructor() {
    this.cargarConfiguracion();
  }

  async cargarConfiguracion() {
    const login = await this.storageService.loadLogin();
    let settings = null;

    if (login && login.email) {
      settings = await this.storageService.loadSettingsForUser(login.email);
    }

    if (!settings) {
      settings = await this.storageService.loadSettings();
    }

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

    const login = await this.storageService.loadLogin();

    if (login && login.email) {
      await this.storageService.saveSettingsForUser(login.email, settings);
    } else {
      await this.storageService.saveSettings(settings);
    }

    this.aplicarConfiguracion(settings);

    this.mensaje =
      this.modoOscuro
        ? '🌙 Modo oscuro activado'
        : '☀️ Modo claro activado';
  }

  async cambiarTexto() {

    const settings: AppSettings = {
      modoOscuro: this.modoOscuro,
      tamanoTexto: this.tamanoTexto
    };

    const login = await this.storageService.loadLogin();

    if (login && login.email) {
      await this.storageService.saveSettingsForUser(login.email, settings);
    } else {
      await this.storageService.saveSettings(settings);
    }

    this.aplicarConfiguracion(settings);

    this.mensaje = '🔤 Tamaño de texto cambiado';
  }

  private aplicarConfiguracion(settings: AppSettings) {

    document.body.classList.toggle(
      'dark',
      settings.modoOscuro
    );

    if (settings.tamanoTexto === 'pequeno') {
      document.body.style.fontSize = '14px';
    } else if (settings.tamanoTexto === 'medio') {
      document.body.style.fontSize = '16px';
    } else {
      document.body.style.fontSize = '20px';
    }
  }

}