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
        // Gestion des erreurs HTTP
        let verified = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          verified = `Error: ${error.error.message}`;
        } else {
          // Erreur côté serveur
          verified = `Error Code: ${error.status}\nMessage: ${error.message}`;
          if (error.status === 403) {
            // Erreur de vérification du compte
            this.verificationErrorMessage = verified; // Mettez à jour uniquement en cas d'erreur de vérification
          }
        }
        return throwError(verified);
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
