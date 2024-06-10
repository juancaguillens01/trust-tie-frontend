import { Component } from '@angular/core';
import { AuthService } from "@core/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (token) => {
          console.log('Login successful', token);
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Login error', err);
          this.snackBar.open(`Login error: ${err.message}`, 'Close', {
            duration: 3000,
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please fill out the form correctly', 'Close', {
        duration: 3000,
      });
    }
  }
}
