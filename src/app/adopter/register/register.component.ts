import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = ['adopter', 'organization'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
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
      if (value === 'adopter') {
        this.registerForm.get('firstName')?.setValidators(Validators.required);
        this.registerForm.get('lastName')?.setValidators(Validators.required);
        this.registerForm.get('name')?.clearValidators();
      } else if (value === 'organization') {
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
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('repeatPassword')?.updateValueAndValidity();
    });
    this.registerForm.get('repeatPassword')?.valueChanges.subscribe(() => {
      this.registerForm.get('repeatPassword')?.updateValueAndValidity();
    });
  }

  private passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  };

  register() {
    if (this.registerForm.valid) {

      this.snackBar.open('Registration successful', 'Close', {
        duration: 3000,
      });
    } else {
      this.registerForm.markAllAsTouched();

      const phoneError = this.registerForm.get('phone')?.hasError('pattern');
      const passwordError = this.registerForm.get('password')?.hasError('pattern');
      const passwordMismatchError = this.registerForm.hasError('mismatch');

      if (phoneError) {
        this.snackBar.open('Enter a valid phone number (e.g., +34722680349)', 'Close', {
          duration: 3000,
        });
      }

      if (passwordError) {
        this.snackBar.open('Password must be at least 8 characters long, contain at least one number, one lowercase, one uppercase letter, and one special character.', 'Close', {
          duration: 3000,
        });
      }

      if (passwordMismatchError) {
        this.snackBar.open('Passwords must match', 'Close', {
          duration: 3000,
        });
      }

      if (!phoneError && !passwordError && !passwordMismatchError) {
        this.snackBar.open('Please fill out the form correctly', 'Close', {
          duration: 3000,
        });
      }
    }
  }
}
