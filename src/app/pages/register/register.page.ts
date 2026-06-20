import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StorageService, AppSettings } from '../../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class RegisterPage {
  private router = inject(Router);
  private storageService = inject(StorageService);

  nombre: string = '';
  apellido: string = '';
  cedula: string = '';
  email: string = '';
  password: string = '';

  modoOscuro: boolean = false;
  tamanoTexto: 'pequeno' | 'medio' | 'grande' = 'medio';
  mensaje: string = '';

  async register() {
    console.log('ENTRO AL REGISTER');

    try {
      const nombre = this.nombre.trim();
      const apellido = this.apellido.trim();
      const cedula = this.cedula.trim();
      const email = this.email.trim().toLowerCase();
      const password = this.password.trim();

      if (!nombre || !apellido || !cedula) {
        this.mensaje = '⚠️ Ingresa nombre, apellido y cédula';
        return;
      }

      if (!email || !password) {
        this.mensaje = '⚠️ Ingresa correo y contraseña';
        return;
      }

      if (password.length < 6) {
        this.mensaje = '⚠️ La contraseña debe tener mínimo 6 caracteres';
        return;
      }

      const existingUser = await this.storageService.loadUserProfile(email);

      if (existingUser) {
        this.mensaje = '⚠️ Este usuario ya existe. Inicia sesión.';
        return;
      }

      const { salt, hash } = await this.storageService.hashPassword(password);

      await this.storageService.saveUserProfile({
        nombre,
        apellido,
        cedula,
        email,
        passwordHash: hash,
        salt
      });

      const settings: AppSettings = {
        modoOscuro: this.modoOscuro,
        tamanoTexto: this.tamanoTexto
      };

      await this.storageService.saveSettingsForUser(email, settings);

      console.log('USUARIO GUARDADO:', email);

      this.mensaje = '✅ Cuenta creada correctamente. Ahora inicia sesión.';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

    } catch (error) {
      console.error('ERROR REGISTER:', error);
      this.mensaje = '❌ Error al crear la cuenta. Revisa la consola.';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}