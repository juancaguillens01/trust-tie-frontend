import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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
      repeatPassword: ['', [Validators.required]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^(\\+\\d{1,15})$')
      ]],
      role: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      name: ['']
    }, { validator: this.passwordMatchValidator });
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

  private passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password');
    const repeatPassword = group.get('repeatPassword');
    return password && repeatPassword && password.value !== repeatPassword.value ? { 'mismatch': true } : null;
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
