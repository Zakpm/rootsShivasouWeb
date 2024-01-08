import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';


  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.firstName = userInfo.prenom;
      this.lastName = userInfo.nom;
    }
  }

  onLogout(): void {
    this.authService.logout();
    // Redirection après la déconnexion, par exemple vers la page de connexion
    this.router.navigate(['/connexion']);  }

}
