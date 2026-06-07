import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  standalone: true,
  imports: [IonicModule]
})
export class LoginPage {

  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/home']);
  }

}