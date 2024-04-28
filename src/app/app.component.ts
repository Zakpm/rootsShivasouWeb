import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'interfaceweb';

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

      // Vérifier si l'utilisateur est déjà connecté au chargement de la page
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      this.authService.checkTokenValidity();
    }
  }

}
