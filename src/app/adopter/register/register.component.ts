import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth.service';
import { RegisterAdopter } from 'app/core/register.adopter.model';
import { RegisterOrganization } from 'app/core/register.organization.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles: string[] = ['Adopter', 'Organization'];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.createRegisterForm();
    this.setupRoleChangeSubscriber();
    this.setupPasswordChangeSubscribers();
  }

  private createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$')
      ]],
      repeatPassword: ['', [Validators.required]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^(\\+\\d{1,15})$')
      ]],
      role: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      name: ['']
    }, { validators: this.passwordMatchValidator });
  }

  private setupRoleChangeSubscriber(): void {
    this.registerForm.get('role')?.valueChanges.subscribe(value => {
      if (value === 'Adopter') {
        this.registerForm.get('firstName')?.setValidators(Validators.required);
        this.registerForm.get('lastName')?.setValidators(Validators.required);
        this.registerForm.get('name')?.clearValidators();
      } else if (value === 'Organization') {
        this.registerForm.get('firstName')?.clearValidators();
        this.registerForm.get('lastName')?.clearValidators();
        this.registerForm.get('name')?.setValidators(Validators.required);
      }

      this.registerForm.get('firstName')?.updateValueAndValidity();
      this.registerForm.get('lastName')?.updateValueAndValidity();
      this.registerForm.get('name')?.updateValueAndValidity();
    });
  }

  private setupPasswordChangeSubscribers(): void {
    const passwordControl = this.registerForm.get('password');
    const repeatPasswordControl = this.registerForm.get('repeatPassword');

    passwordControl?.valueChanges.subscribe(() => {
      repeatPasswordControl?.updateValueAndValidity();
    });
  }

  private passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  };

  register() {
    if (this.registerForm.valid) {
      const role = this.registerForm.get('role')?.value;
      if (role === 'Adopter') {
        this.registerAdopter();
      } else if (role === 'Organization') {
        this.registerOrganization();
      }
    } else {
      this.handleFormErrors();
    }
  }

  private registerAdopter(): void {
    const adopterData: RegisterAdopter = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      phone: this.registerForm.get('phone')?.value,
    };
    this.authService.registerAdopter(adopterData).subscribe({
      next: () => this.handleSuccess('Adopter'),
      error: (err) => this.handleError(err)
    });
  }

  private registerOrganization(): void {
    const organizationData: RegisterOrganization = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      name: this.registerForm.get('name')?.value,
      phone: this.registerForm.get('phone')?.value,
    };
    this.authService.registerOrganization(organizationData).subscribe({
      next: () => this.handleSuccess('Organization'),
      error: (err) => this.handleError(err)
    });
  }

  private handleSuccess(role: string): void {
    this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
    if (role === 'Adopter') {
      this.router.navigate(['/adopter']).then();
    } else if (role === 'Organization') {
      this.router.navigate(['/organization/dashboard']).then();
    }
  }

  private handleError(err: any): void {
    this.snackBar.open(`Registration failed: ${err.message}`, 'Close', { duration: 3000 });
  }

  private handleFormErrors(): void {
    this.registerForm.markAllAsTouched();
    const phoneError = this.registerForm.get('phone')?.hasError('pattern');
    const passwordError = this.registerForm.get('password')?.hasError('pattern');
    const passwordMismatchError = this.registerForm.hasError('mismatch');

    if (phoneError) {
      this.snackBar.open('Enter a valid phone number (e.g., +34722680349)', 'Close', { duration: 3000 });
    }

    if (passwordError) {
      this.snackBar.open('Password must be at least 8 characters long, contain at least one number, one lowercase, one uppercase letter, and one special character.', 'Close', { duration: 3000 });
    }

    if (passwordMismatchError) {
      this.snackBar.open('Passwords must match', 'Close', { duration: 3000 });
    }

    if (!phoneError && !passwordError && !passwordMismatchError) {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
    }
  }
}
