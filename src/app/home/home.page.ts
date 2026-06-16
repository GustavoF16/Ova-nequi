import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage implements OnInit, OnDestroy {
  private networkService = inject(NetworkService);
  isOnline = true;
  private networkSubscription!: Subscription;

  bienvenida: string = '';

  constructor(private storageService: StorageService) {
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
    }
  }

}
``