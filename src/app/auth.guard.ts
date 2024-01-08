import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    const routePath = route.routeConfig?.path;

    // Vérification du JWT pour les autres routes
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/connexion']);
      return false;
    }

    const decodedToken = jwtDecode<any>(token);
    if (routePath?.startsWith('admin')) {
      return decodedToken.roles.includes('ROLE_ADMIN') || decodedToken.roles.includes('ROLE_SUPER_ADMIN');
    } else if (routePath?.startsWith('user')) {
      return decodedToken.roles.includes('ROLE_USER');
    }

    return true;
  }
}
