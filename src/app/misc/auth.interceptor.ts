import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = sessionStorage.getItem('token');
    if (authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Wenn ein 401-Fehler auftritt, leiten Sie den Benutzer zur Anmeldeseite um
          this.router.navigate(['/auth']);
        }

        // Andernfalls lassen Sie den Fehler weiterhin durch
        return throwError(error);
      })
    );
  }
}
