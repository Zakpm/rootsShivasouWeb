import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IntercepteurInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepteur appelé');
    const authToken = localStorage.getItem('jwtToken');
    console.log('Token:', authToken);

    if (authToken) {
      // Cloner la requête pour ajouter l'en-tête Authorization
      // sans toucher à l'en-tête Content-Type existant
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` }
      });
      console.log('Requête modifiée:', authReq);
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
