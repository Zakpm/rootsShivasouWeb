import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {
  
  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

  onLogout(): void {
    this.authService.logout();
    // Redirection après la déconnexion, par exemple vers la page de connexion
    this.router.navigate(['/connexion']);  }
}
