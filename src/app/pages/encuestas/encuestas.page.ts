import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-encuestas',
  templateUrl: 'encuestas.page.html',
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class EncuestasPage {

  respuesta1: string = '';
  respuesta2: string = '';
  mensaje: string = '';

  enviarEncuesta() {

    if (this.respuesta1 && this.respuesta2) {

      this.mensaje =
      '✅ Encuesta enviada correctamente';

    } else {

      this.mensaje =
      '⚠️ Debes responder todas las preguntas';

    }

  }

}