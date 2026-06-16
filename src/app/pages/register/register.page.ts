import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService, AppSettings } from '../../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class RegisterPage {
  private router = inject(Router);
  private storageService = inject(StorageService);

  email: string = '';
  password: string = '';
  modoOscuro: boolean = false;
  tamanoTexto: 'pequeno' | 'medio' | 'grande' = 'medio';

  mensaje: string = '';

  constructor() {}

  async register() {
    if (!this.email || !this.password) {
      this.mensaje = '⚠️ Ingresa correo y contraseña';
      return;
    }

    // Hash password client-side before saving
    const { salt, hash } = await this.storageService.hashPassword(this.password);

    await this.storageService.saveUserProfile({
      email: this.email,
      passwordHash: hash,
      salt
    });
    await this.storageService.saveLogin({ email: this.email });

    const settings: AppSettings = {
      modoOscuro: this.modoOscuro,
      tamanoTexto: this.tamanoTexto
    };

    await this.storageService.saveSettingsForUser(this.email, settings);

    this.mensaje = '✅ Cuenta creada. Bienvenido';
    this.router.navigate(['/home']);
  }
}
