import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      console.log('AuthGuard: User is authenticated, access granted.');
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url { queryParams: { returnUrl: state.url } }
    console.log('AuthGuard: User not authenticated, redirecting to login.');
    this.router.navigate(['/login']);
    return false;
  }
}
