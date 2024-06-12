import {Component} from '@angular/core';
import {AuthService} from '@core/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
          });
          console.log("isOrg", this.authService.checkIsOrganization());
          console.log("isAdopter", this.authService.checkIsAdopter());
          if (this.authService.checkIsOrganization()) {
            this.router.navigate(['/organization/dashboard']).then();
          } else if (this.authService.checkIsAdopter()) {
            this.router.navigate(['/adopter']).then();
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please fill out the form correctly', 'Close', {
        duration: 3000,
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {
      this.snackBar.open('Logged out successfully', 'Close', {
        duration: 3000,
      });
    });
  }
}
