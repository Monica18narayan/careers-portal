import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Form';
  isLoggedIn: boolean = false;

  constructor(private keycloakservice: KeycloakService, private route: Router) {
    this.checkLoginStatus();
  }

  alrMsg() {
    alert('Please login to access careers!!');
  }

  loginWithKeycloak() {
    this.keycloakservice.login();
  }

  logoutWithKeycloak() {
    this.keycloakservice.logout();
    this.isLoggedIn = false; // Update isLoggedIn flag upon logout
  }

  checkLoginStatus() {
    this.keycloakservice.isLoggedIn().then((loggedIn) => {
      this.isLoggedIn = loggedIn; // Update isLoggedIn flag based on login status
      if (this.isLoggedIn) {
        this.route.navigate(['/careers']);
      }
    });
  }
}
