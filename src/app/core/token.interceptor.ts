import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/auth.service';
import { Token } from '@core/token.model';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: Token = this.auth.getToken();
    console.log(token);
    if (token && token.token) {
      let authToken = token.token;
      if (!authToken.startsWith('Bearer ')) {
        authToken = `Bearer ${authToken}`;
      }
      return next.handle(request.clone({
        setHeaders: { Authorization: authToken }
      }));
    } else {
      return next.handle(request);
    }
  }
}
