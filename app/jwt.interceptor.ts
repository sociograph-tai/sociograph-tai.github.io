import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  // A partir de la peticion http añade a cada petición
  // el jwt si lo hay (la autorizacion si la tiene)
  // en la cabecera
  // Si hay un error se navega login
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('jwt_token');
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError(err);

      })
    );

  }
}
