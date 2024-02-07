import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IntercepteurInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepteur appelé');
    // Essayer de récupérer le jwtToken
    let authToken = localStorage.getItem('jwtToken');
    // Si jwtToken n'est pas trouvé, essayer de récupérer le resetToken
    if (!authToken) {
      authToken = localStorage.getItem('resetToken');
      console.log('Utilisation de resetToken:', authToken);
    } else {
      console.log('Utilisation de jwtToken:', authToken);
    }

    if (authToken) {
      // Cloner la requête pour ajouter l'en-tête Authorization
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` }
      });
      console.log('Requête modifiée:', authReq);
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

