import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage {

  bienvenida: string = '';

  constructor(private storageService: StorageService) {
    this.cargarBienvenida();
  }

  async cargarBienvenida() {
    const login = await this.storageService.loadLogin();
    if (login) {
      this.bienvenida = `Bienvenido de nuevo, ${login.email}`;
    }
  }

}
``