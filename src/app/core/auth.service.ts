import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {HttpService} from '@core/http.service';
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';
import {Token} from '@core/token.model';
import {Login} from '@core/login.model';
import {map} from "rxjs/operators";
import {User} from "@core/user.model";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isOrganization: boolean = false;
  private user: User;
  private token: Token;
  static LOGIN = environment.REST + '/user/login';

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(email: string, password: string): Observable<Token> {
    console.log("entramos");
    return this.httpService
      .post(AuthService.LOGIN, <Login>{email: email, password: password})
      .pipe(
        map(jsonToken => {
          console.log("entramos2");
          const jwtHelper = new JwtHelperService();
          this.token = jsonToken;
          this.user.uuid = jwtHelper.decodeToken(jsonToken.token).uuid;
          this.user.role = jwtHelper.decodeToken(jsonToken.token).role;
          console.log(this.user.role);
          return this.token;
        })
      );
  }

  checkIsOrganization(): boolean {
    return this.isOrganization;
  }

  getToken(): Token {
    return this.token;
  }
}
