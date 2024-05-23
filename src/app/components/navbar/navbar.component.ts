import { Component, HostListener, OnInit } from '@angular/core';
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
  isSticky: boolean = false;
  lastScrollPosition: number = 0;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkUserRole();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
    if (screenWidth <= 768) {
    // Détecter le défilement de la page
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // Déterminer si la barre de navigation doit être collante en remontant la page
    this.isSticky = scrollPosition < this.lastScrollPosition && scrollPosition > 5;
    this.lastScrollPosition = scrollPosition;
    }
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
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isUser = false;
    this.router.navigate(['/connexion']);
  }
}
