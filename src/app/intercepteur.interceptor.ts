import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// Déclaration de l'interface Authorization en dehors de la classe
export interface Authorization {
  type: string;
  value: string;
}

@Injectable()
export class IntercepteurInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = localStorage.getItem('token');

    if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    console.log('Request with Authorization header:', authReq); // Ajouter pour le débogage
    return next.handle(authReq);
  }

  return next.handle(req);
}
}
