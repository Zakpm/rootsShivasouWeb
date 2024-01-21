// connexion-fom.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-connexion-fom',
  templateUrl: './connexion-fom.component.html',
  styleUrls: ['./connexion-fom.component.css']
})
export class ConnexionFomComponent {
  loginForm! : FormGroup;
  errorMessage: string = '';
  verificationErrorMessage: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required], // Validators.email si le login est un email
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      this.authService.login(login, password).subscribe(
        response => {
          localStorage.setItem('jwtToken', response.jwt);
          this.checkRolesAndRedirect(response.jwt);
        },
        error => {
          if (error === 'Compte non vérifié') {
            // Erreur de compte non vérifié
            this.errorMessage = 'Informations de connexion invalides';
            this.verificationErrorMessage = ''; // Réinitialiser verificationErrorMessage
          } else {
            // Erreur d'authentification
            this.verificationErrorMessage = 'Compte non vérifié. Veuillez vérifier votre compte pour vous connecter';
            this.errorMessage = ''; // Réinitialiser errorMessage
          }
          console.error('Erreur de connexion:', error);
        }
      );
    }
  }

  private checkRolesAndRedirect(token: string): void {
    const decodedToken = jwtDecode<any>(token);
    if (decodedToken.roles.includes('ROLE_ADMIN') || decodedToken.roles.includes('ROLE_SUPER_ADMIN')) {
      this.router.navigate(['/admin/index']); // Remplacez avec le chemin correct
    } else if (decodedToken.roles.includes('ROLE_USER')) {
      this.router.navigate(['/user/index']);    }
  }
}
