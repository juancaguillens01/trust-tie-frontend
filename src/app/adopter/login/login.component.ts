import { Component } from '@angular/core';
import {AuthService} from "@core/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) {
  }

  login() {
    console.log(this.authService.checkIsOrganization());
    this.authService.login("", "");
    console.log(this.authService.checkIsOrganization());
  }
}
