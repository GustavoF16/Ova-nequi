import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonChip,
  IonIcon,
  IonLabel,
  IonToast,
  IonContent
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { NetworkService } from './services/network.service';

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
}
