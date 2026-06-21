import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
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
    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();

    if (!email || !password) {
      this.mensaje = '⚠️ Ingresa correo y contraseña';
      return;
    }

    const profile = await this.storageService.loadUserProfile(email);

    if (!profile) {
      this.mensaje = '⚠️ Usuario no encontrado. Regístrate primero.';
      return;
    }

    let ok = false;

    if (profile.passwordHash && profile.salt) {
      ok = await this.storageService.verifyPassword(
        password,
        profile.salt,
        profile.passwordHash
      );
    } else if (profile.password) {
      if (profile.password === password) {
        const { salt, hash } =
          await this.storageService.hashPassword(password);

        await this.storageService.saveUserProfile({
          ...profile,
          email,
          passwordHash: hash,
          salt,
          password: undefined
        });

        ok = true;
      }
    }

    if (!ok) {
      this.mensaje = '⚠️ Contraseña incorrecta. Intenta de nuevo.';
      return;
    }

    await this.storageService.saveLogin({ email });

    this.mensaje = '✅ Sesión iniciada';

    this.router.navigate(['/home']);
  }
}