import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  constructor() {

    // ✅ Leer progreso guardado
    const progresoGuardado =
    localStorage.getItem('progreso');

    if (progresoGuardado) {

      this.progreso =
      Number(progresoGuardado);

    } else {

      // ✅ Valor inicial
      this.progreso = 0.6;

      // ✅ Guardar progreso inicial
      localStorage.setItem(
        'progreso',
        this.progreso.toString()
      );

    }

    // ✅ Mensajes dinámicos
    if (this.progreso >= 1) {

      this.mensaje =
      '🎉 Has completado todo el curso';

    }

    else if (this.progreso >= 0.5) {

      this.mensaje =
      '👍 Vas muy bien, sigue así';

    }

    else {

      this.mensaje =
      '🚀 Comienza a aprender con los módulos';

    }

  }

}