import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = ['adopter', 'organization'];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.createRegisterForm();
    this.setupRoleChangeSubscriber();
  }

  private createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$')
      ]],
      repeatPassword: ['', [Validators.required, this.matchPasswordValidator('password')]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^(\\+\\d{1,15})$')
      ]],
      role: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      name: ['']
    });
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

  private matchPasswordValidator(passwordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent as FormGroup;
      if (formGroup) {
        const password = formGroup.get(passwordField)?.value;
        if (control.value !== password) {
          return { 'mismatch': true };
        }
      }
      return null;
    };
  }

  register() {
    if (this.registerForm.valid) {
      console.log('Form submitted successfully');
      // Add your registration logic here
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
