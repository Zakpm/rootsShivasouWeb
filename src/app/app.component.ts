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
    this.checkTokenValidity(jwtToken);
  }
}

private checkTokenValidity(token: string): void {
  const decodedToken = jwtDecode<any>(token);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decodedToken.exp < currentTimestamp) {
    // Le JWT a expiré, déconnectez l'utilisateur
    this.authService.logout();
    // Redirigez l'utilisateur vers la page de connexion ou une autre page appropriée
    this.router.navigate(['/connexion']);
    window.location.reload(); // rafraichir l'état de la navbar
  }
}

}
