import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService, AppSettings } from '../../services/storage.service';
import { LoggingService } from '../../services/logging.service';

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
  private storageService = inject(StorageService);
  private loggingService = inject(LoggingService);

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

    // Fallback to global settings
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
    this.mensaje = this.modoOscuro ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado';
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

  exportarLogs(): void {
    this.loggingService.export();
    this.mensaje = '📄 Registros de diagnóstico exportados';
  }

  limpiarLogs(): void {
    this.loggingService.clear();
    this.mensaje = '🧹 Registros de diagnóstico eliminados';
  }

  private aplicarConfiguracion(settings: AppSettings) {
    document.body.classList.toggle('dark', settings.modoOscuro);
    document.body.classList.remove('text-small', 'text-medium', 'text-large');
    document.body.classList.add(`text-${settings.tamanoTexto}`);
  }

}
