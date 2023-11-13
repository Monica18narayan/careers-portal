import { Component, ElementRef, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Form';
  isLoggedIn: boolean = false;
  username: string | undefined;
  isPopoverVisible: boolean = false;
 
  
  private hidePopoverTimeout: any;
  private readonly delayDuration: number = 500; 

  constructor(private keycloakservice: KeycloakService, private route: Router) {
    this.checkLoginStatus();
  }

  alrMsg() {
    if (!this.isLoggedIn) {
      this.alertmsg();
    }
  }

  alertmsg(): void {
    alert('You are not logged in. Please log in to access the Careers page.');
  }

  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  
  hidePopoverWithDelay() {
    this.hidePopoverTimeout = setTimeout(() => {
      this.isPopoverVisible = false;
    }, this.delayDuration);
  }

 
  cancelHide() {
    clearTimeout(this.hidePopoverTimeout);
  }


  showPopover() {
    this.isPopoverVisible = true;
  }

  loginWithKeycloak() {
    this.keycloakservice.login();
  }

  logoutWithKeycloak() {
    this.keycloakservice.logout();
    this.isLoggedIn = false;
    this.username = undefined;
   
  }

  checkLoginStatus() {
    this.keycloakservice.isLoggedIn().then((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.keycloakservice.loadUserProfile().then((profile: KeycloakProfile | null) => {
          if (profile) {
            this.username = profile.username;          
          }
        });
      }
      this.route.navigate(['/careers']);
    });
  }
}
