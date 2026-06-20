import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService, AppSettings } from '../services/storage.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage implements OnInit, OnDestroy {
  private router = inject(Router);
  private networkService = inject(NetworkService);
  private storageService = inject(StorageService);

  isOnline = true;
  private networkSubscription!: Subscription;

  bienvenida: string = '';

  constructor() {
    this.cargarBienvenida();
  }

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(
      status => this.isOnline = status
    );
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async cargarBienvenida() {
    const login = await this.storageService.loadLogin();

    if (login) {
      this.bienvenida = `Bienvenido de nuevo, ${login.email}`;
      const settings = await this.storageService.loadSettingsForUser(login.email);
      if (settings) {
        this.aplicarConfiguracion(settings);
      }
      return;
    }

    this.bienvenida = 'Bienvenido a OVA NEQUI';
  }

  async logout() {
    await this.storageService.logout();
    this.router.navigate(['/login']);
  }

  private aplicarConfiguracion(settings: AppSettings) {
    if (settings.modoOscuro) {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#f5f5f5';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }

    if (settings.tamanoTexto === 'pequeno') {
      document.body.style.fontSize = '14px';
    } else if (settings.tamanoTexto === 'medio') {
      document.body.style.fontSize = '16px';
    } else {
      document.body.style.fontSize = '20px';
    }
  }
}