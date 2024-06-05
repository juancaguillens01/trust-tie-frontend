import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
//import {JwtHelperService} from '@auth0/angular-jwt';

import {HttpService} from '@core/http.service';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isOrganization: boolean = false;

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(email: string, password: string): void {
    of([]).subscribe({
      next: list => {
        this.isOrganization = true;
        this.router.navigate(["/organization"])
          .then();
      }
    });
  }

  checkIsOrganization(): boolean {
    return this.isOrganization;
  }


}
