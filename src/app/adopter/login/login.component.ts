import { Component } from '@angular/core';
import { AuthService } from "@core/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.authService.checkIsOrganization());
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password);
      console.log(this.authService.checkIsOrganization());
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
