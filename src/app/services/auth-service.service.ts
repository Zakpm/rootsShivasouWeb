// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


interface LoginRequest {
  login: string;  // Peut être un email ou un nickname
  password: string;
}

interface JwtResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9982/auth'; // Remplacez avec l'URL de votre API

  verificationErrorMessage: string = ''; // Propriété pour la vérification du compte

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, { login, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Une erreur inconnue est survenue !';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Erreur : ${error.error.message}`;
        } else {
          switch (error.error.message) {
            case "Compte non vérifié":
              errorMsg = 'Compte non vérifié. Veuillez vérifier votre compte pour vous connecter.';
              break;
            case "Informations de connexion invalides":
              errorMsg = 'Informations de connexion invalides';
              break;
            default:
              errorMsg = `Code d'erreur : ${error.status}\nMessage : ${error.message}`;
          }
        }
        return throwError(errorMsg);
      })
    );
  }


  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  getJwtToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getUserInfo(): any {
    const token = this.getJwtToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}
