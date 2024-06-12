import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '@core/http.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Token} from '@core/token.model';
import {Login} from '@core/login.model';
import {map} from 'rxjs/operators';
import {User} from '@core/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Role} from "@core/role.model";
import {RegisterAdopter} from "@core/register.adopter.model";
import {RegisterOrganization} from "@core/register.organization.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isOrganization: boolean = false;
  private isAdopter: boolean = false;
  private isLoggedIn: boolean = false;
  private user: User = {uuid: '', role: null};
  private token: Token;
  static LOGIN = environment.REST + '/users/login';
  static REGISTER_ADOPTER = environment.REST + '/users/register/adopter';
  static REGISTER_ORGANIZATION = environment.REST + '/users/register/organization';

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(email: string, password: string): Observable<Token> {
    return this.httpService
      .post(AuthService.LOGIN, <Login>{email: email, password: password})
      .pipe(
        map(jsonToken => {
          this.handleAuthentication(jsonToken);
          return this.token;
        })
      );
  }

  registerAdopter(adopterData: RegisterAdopter): Observable<Token> {
    return this.httpService
      .post(AuthService.REGISTER_ADOPTER, adopterData)
      .pipe(
        map(jsonToken => {
          this.handleAuthentication(jsonToken);
          return this.token;
        })
      );
  }

  registerOrganization(organizationData: RegisterOrganization): Observable<Token> {
    return this.httpService
      .post(AuthService.REGISTER_ORGANIZATION, organizationData)
      .pipe(
        map(jsonToken => {
          this.handleAuthentication(jsonToken);
          return this.token;
        })
      );
  }

  private handleAuthentication(jsonToken: Token): void {
    const jwtHelper = new JwtHelperService();
    this.token = jsonToken;
    const decodedToken = jwtHelper.decodeToken(jsonToken.token);
    this.user.uuid = decodedToken.uuid;
    this.user.role = decodedToken.role;
    this.isOrganization = this.user.role === Role.ORGANIZATION;
    this.isAdopter = this.user.role === Role.ADOPTER;
    this.isLoggedIn = true;
  }

  checkIsOrganization(): boolean {
    return this.isOrganization;
  }

  checkIsAdopter(): boolean {
    return this.isAdopter;
  }

  checkIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getToken(): Token {
    return this.token;
  }

  logout() {
    this.token = null;
    this.user = {uuid: '', role: null};
    this.isOrganization = false;
    this.isAdopter = false;
    this.isLoggedIn = false;
    this.router.navigate(['/']).then();
  }
}
