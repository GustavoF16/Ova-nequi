import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  tamanoTexto: string = 'medio';

  mensaje: string = '';

  cambiarModo() {

    if (this.modoOscuro) {

      document.body.style.backgroundColor = '#121212';

      document.body.style.color = 'white';

      this.mensaje =
      '🌙 Modo oscuro activado';

    } else {

      document.body.style.backgroundColor = 'white';

      document.body.style.color = 'black';

      this.mensaje =
      '☀️ Modo claro activado';

    }

  }

  cambiarTexto() {

    if (this.tamanoTexto === 'pequeno') {

      document.body.style.fontSize = '14px';

    } else if (this.tamanoTexto === 'medio') {

      document.body.style.fontSize = '16px';

    } else {

      document.body.style.fontSize = '20px';

    }

    this.mensaje =
    '🔤 Tamaño de texto cambiado';

  }

}