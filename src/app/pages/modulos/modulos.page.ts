import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-modulos',
  templateUrl: 'modulos.page.html',
  styleUrls: ['modulos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ModulosPage implements OnInit, OnDestroy {
  private networkService = inject(NetworkService);
  isOnline = true;
  private networkSubscription!: Subscription;

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(
      (status: boolean) => this.isOnline = status
    );
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }
}
