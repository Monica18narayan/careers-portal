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

  constructor(private keycloakservice: KeycloakService, private route: Router) {
   // this.initializeKeycloak();
  }

  alrMsg() {
    alert('Please login to access careers!!');
  }
  loginWithKeycloak(){
   this.keycloakservice.login();
  }
  logoutWithKeycloak(){
    this.keycloakservice.logout();
  }
  ngOnInit() {
    this.keycloakservice.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        this.route.navigate(['/careers']);
      }
    });
  }
}
