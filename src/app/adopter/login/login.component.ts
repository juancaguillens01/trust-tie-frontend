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
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err)
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please fill out the form correctly', 'Close', {
        duration: 3000,
      });
    }
  }

  private handleSuccess(): void {
    this.snackBar.open('Login successful', 'Close', {
      duration: 3000,
    });
    if (this.authService.checkIsOrganization()) {
      this.router.navigate(['/organization/dashboard']).then();
    } else if (this.authService.checkIsAdopter()) {
      this.router.navigate(['/adopter/home']).then();
    }
  }

  private handleError(err: any): void {
    this.snackBar.open(`Login failed: ${err.message}`, 'Close', { duration: 3000 });
  }
}
