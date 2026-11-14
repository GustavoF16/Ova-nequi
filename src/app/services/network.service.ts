import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private onlineSubject = new BehaviorSubject<boolean>(this.checkConnection());
  public online$ = this.onlineSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('online', () => this.updateConnection(true));
      window.addEventListener('offline', () => this.updateConnection(false));
    }

    void this.initializeNativeNetwork();
  }

  public get isOnline(): boolean {
    return this.onlineSubject.value;
  }

  private checkConnection(): boolean {
    if (typeof window === 'undefined' || !('navigator' in window)) {
      return true;
    }

    return navigator.onLine;
  }

  private updateConnection(status: boolean) {
    this.onlineSubject.next(status);
  }

  private async initializeNativeNetwork(): Promise<void> {
    try {
      const status = await Network.getStatus();
      this.updateConnection(status.connected);
      await Network.addListener('networkStatusChange', networkStatus => {
        this.updateConnection(networkStatus.connected);
      });
    } catch (error) {
      console.warn('No se pudo inicializar el estado nativo de red.', error);
    }
  }
}
