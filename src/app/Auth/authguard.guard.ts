import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { AuthguardService } from '../Auth/authguard.service'; 
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private authService: AuthguardService, private router: Router, private keycloak:KeycloakService) {}

  canActivate(): Promise<boolean> {
    return this.keycloak.isLoggedIn().then((authenticated) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
 
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree | Observable<boolean | UrlTree> {
 
  //   if (this.authService.isAuthenticate) {
  //     return true;
  //   } else {
  //     return this.router.createUrlTree(['/login']);
  //   }
  // }
}
}