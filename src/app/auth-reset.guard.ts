import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthResetGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const token = localStorage.getItem('jwtToken');

      // Si aucun token n'est trouvé, permettez l'accès à la route de réinitialisation
      if (!token) {
        return true;
      }

      // Si un token est trouvé, vérifiez s'il contient le rôle RESET_PASSWORD
      const decodedToken = jwtDecode<any>(token);
      const hasResetPasswordRole = decodedToken.roles.includes('RESET_PASSWORD');
      return hasResetPasswordRole;
  }
}

