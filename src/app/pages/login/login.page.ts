import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class LoginPage {

  email: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    this.cargarLogin();
  }

  async cargarLogin() {
    const login = await this.storageService.loadLogin();
    if (login) {
      this.email = login.email;
    }
  }

  async login() {
    if (!this.email || !this.password) {
      this.mensaje = '⚠️ Ingresa correo y contraseña';
      return;
    }

    await this.storageService.saveLogin({
      email: this.email
    });

    this.router.navigate(['/home']);
  }

}