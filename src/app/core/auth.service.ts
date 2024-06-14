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
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isOrganization: boolean = false;
  private isAdopter: boolean = false;
  private user: User = {uuid: '', role: null};
  private jwtHelper: JwtHelperService = new JwtHelperService();
  static readonly LOGIN = environment.REST + '/users/login';
  static readonly REGISTER_ADOPTER = environment.REST + '/users/register/adopter';
  static readonly REGISTER_ORGANIZATION = environment.REST + '/users/register/organization';
  static readonly TOKEN = "token";

  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {}

  login(email: string, password: string): Observable<void> {
    return this.httpService
      .post(AuthService.LOGIN, <Login>{email: email, password: password})
      .pipe(
        map(jsonToken => {
          this.handleAuthentication(jsonToken);
        })
      );
  }

  registerAdopter(adopterData: RegisterAdopter): Observable<void> {
    return this.httpService
      .post(AuthService.REGISTER_ADOPTER, adopterData)
      .pipe(
        map(jsonToken => {
          this.handleAuthentication(jsonToken);
        })
      );
  }

  registerOrganization(organizationData: RegisterOrganization): Observable<void> {
    return this.httpService
      .post(AuthService.REGISTER_ORGANIZATION, organizationData)
      .pipe(
        map(jsonToken => {
          this.handleAuthentication(jsonToken);
        })
      );
  }

  private handleAuthentication(jsonToken: Token): void {
    sessionStorage.setItem(AuthService.TOKEN, jsonToken.token);
    const decodedToken = this.jwtHelper.decodeToken(jsonToken.token);
    this.user.uuid = decodedToken.uuid;
    this.user.role = decodedToken.role;
    this.isOrganization = this.user.role === Role.ORGANIZATION;
    this.isAdopter = this.user.role === Role.ADOPTER;
  }

  checkIsOrganization(): boolean {
    return this.isOrganization || this.validateTokenRole(Role.ORGANIZATION);
  }

  checkIsAdopter(): boolean {
    return this.isAdopter || this.validateTokenRole(Role.ADOPTER);
  }

  checkIsLoggedIn(): boolean {
    const token = sessionStorage.getItem(AuthService.TOKEN);
    return token !== null && this.validateTokenExpirationDate();
  }

  private validateTokenRole(role: Role): boolean {
    const token = sessionStorage.getItem(AuthService.TOKEN);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role === role && this.validateTokenExpirationDate();
    }
    return false;
  }

  private validateTokenExpirationDate(): boolean {
    const token = sessionStorage.getItem(AuthService.TOKEN);
    if (token && this.jwtHelper.getTokenExpirationDate(token) > new Date()) {
      return true;
    }
    this.clearSession();
    return false;
  }

  private clearSession(): void {
    sessionStorage.removeItem(AuthService.TOKEN);
    this.user = {uuid: '', role: null};
    this.isOrganization = false;
    this.isAdopter = false;
    this.router.navigate(['/']).then();
  }

  getToken(): Token {
    return <Token>{
      token: sessionStorage.getItem(AuthService.TOKEN)
    };
  }

  logout() {
    this.clearSession();
    this.snackBar.open('Logout successful', 'Close', {
      duration: 3000,
    });
  }
}
