import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {HttpService} from '@core/http.service';
import {Observable, tap} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isOrganization: boolean = false;
  static LOGIN =  'http://localhost:8080/user/login';

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(email: string, password: string): Observable<void> {
    return this.httpService
      .param('email', email)
      .param('password', password)
      .get(AuthService.LOGIN)
      .pipe(
        tap(response => {
          const token = response.token;
          //this.saveToken(token);
          //this.router.navigate(['/home']);
        })
      );
  }

  checkIsOrganization(): boolean {
    return this.isOrganization;
  }


}
