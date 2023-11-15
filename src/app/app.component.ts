import { Component, ElementRef, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      text: 'Please log in to access the Careers page.',
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: 'OK',
      iconColor: '#004D40', // Green color for the icon
      confirmButtonColor: '#004D40', // Green color for the button
      customClass: {
        popup: 'flex flex-col items-center', // Display content in a column and center horizontally
        icon: 'h-12 w-12 mb-4', // Setting height and width to 12px and adding margin-bottom
        title: 'text-center', // Center the title text horizontally
        confirmButton: 'border-none focus:outline-none focus:border-none hover:border-none' // Remove border and blue outline
      },
      width: '26rem', // Set a custom width for the alert box
    });
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
