import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modulos',
  templateUrl: 'modulos.page.html',
  styleUrls: ['modulos.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class ModulosPage {}