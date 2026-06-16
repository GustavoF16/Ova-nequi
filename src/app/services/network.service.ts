import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
