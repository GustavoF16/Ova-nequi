import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonChip,
  IonIcon,
  IonLabel,
  IonToast,
  IonContent
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { NetworkService } from './services/network.service';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [
    CommonModule,
    IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonChip,
    IonIcon,
    IonLabel,
    IonToast,
    IonContent,
    IonRouterOutlet
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private networkService = inject(NetworkService);
  private storageService = inject(StorageService);
  private router = inject(Router);
  isOnline = true;
  showToast = false;
  toastMessage = '';
  private networkSubscription!: Subscription;
  private initialStatusSet = false;

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(
      status => {
        if (this.initialStatusSet && status !== this.isOnline) {
          this.toastMessage = status
            ? 'Conexión restaurada'
            : 'No hay conexión. Algunas funciones pueden estar limitadas.';
          this.showToast = true;
        }

        this.isOnline = status;
        this.initialStatusSet = true;
      }
    );
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async logout() {
    await this.storageService.logout();
    this.toastMessage = 'Sesión cerrada';
    this.showToast = true;
    this.router.navigate(['/login']);
  }
}
