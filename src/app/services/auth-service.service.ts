// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, { login, password });
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
