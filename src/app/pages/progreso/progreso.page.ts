import { Component } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { DatabaseService }
from '../../services/database.service';

@Component({
  selector: 'app-progreso',
  templateUrl: 'progreso.page.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class ProgresoPage {

  progreso: number = 0;

  mensaje: string = '';

  constructor(
    private databaseService: DatabaseService
  ) {

    this.cargarProgreso();

  }

  async cargarProgreso() {

    // Inicializar BD
    await this.databaseService.initDB();

    // Obtener progreso
    this.progreso =
    await this.databaseService.obtenerProgreso();

    // Si no existe
    if (this.progreso === 0) {

      this.progreso = 60;

      await this.databaseService.guardarProgreso(
        this.progreso
      );

    }

    // Mensajes
    if (this.progreso >= 100) {

      this.mensaje =
      '🎉 Has completado todo el curso';

    }

    else if (this.progreso >= 50) {

      this.mensaje =
      '👍 Vas muy bien, sigue así';

    }

    else {

      this.mensaje =
      '🚀 Comienza a aprender con los módulos';

    }

  }

}
``