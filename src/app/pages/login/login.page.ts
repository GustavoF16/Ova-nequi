import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class LoginPage {
  private router = inject(Router);
  private storageService = inject(StorageService);

  email: string = '';
  password: string = '';
  mensaje: string = '';

  constructor() {
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

    const profile = await this.storageService.loadUserProfile(this.email);
    if (!profile) {
      this.mensaje = '⚠️ Usuario no encontrado. Regístrate primero.';
      return;
    }

    if (profile.password !== this.password) {
      this.mensaje = '⚠️ Contraseña incorrecta. Intenta de nuevo.';
      return;
    }

    await this.storageService.saveLogin({ email: this.email });
    this.mensaje = '✅ Sesión iniciada';
    this.router.navigate(['/home']);
  }

}