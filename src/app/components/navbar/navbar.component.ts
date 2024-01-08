import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isUser: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
  }

  checkUserRole(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      this.isAdmin = decodedToken.roles.includes('ROLE_ADMIN') || decodedToken.roles.includes('ROLE_SUPER_ADMIN');
      this.isUser = decodedToken.roles.includes('ROLE_USER');
    } else {
      // Gérer le cas d'un utilisateur non connecté
      this.isAdmin = false;
      this.isUser = false;
    }
  }

  onLogout(): void {
    localStorage.removeItem('jwtToken');
    // Ajoutez ici toute autre logique nécessaire pour la déconnexion
    this.router.navigate(['/connexion']);
    window.location.reload(); // Pour rafraîchir l'état de la navbar
  }
}
