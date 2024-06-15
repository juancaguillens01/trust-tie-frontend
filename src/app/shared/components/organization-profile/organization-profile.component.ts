import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganizationProfileService } from '../../services/organization-profile.service';
import { Organization } from '../../models/organization-model';
import { AuthService } from '@core/auth.service';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {
  organizationForm: FormGroup;
  organization: Organization;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private organizationProfileService: OrganizationProfileService,
    private authService: AuthService
  ) {
    this.organizationForm = this.createOrganizationForm();
  }

  ngOnInit(): void {
    this.loadOrganization();
    this.setupPasswordChangeSubscribers();
  }

  private createOrganizationForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.email]],
      password: [''],
      repeatPassword: [''],
      phone: ['', [
        Validators.pattern('^(\\+\\d{1,15})$')
      ]],
      name: [''],
      description: [''],
      website: ['']
    }, { validators: this.passwordMatchValidator });
  }

  private loadOrganization(): void {
    if (this.authService.checkIsOrganization()) {
      this.organizationProfileService.getOrganization().subscribe({
        next: (organization: Organization) => {
          this.organization = organization;
          this.organizationForm.patchValue(this.organization);
        },
        error: (err) => {
          this.snackBar.open(`Error loading organization: ${err.message}`, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Unauthorized access', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/']);
    }
  }

  private setupPasswordChangeSubscribers(): void {
    this.organizationForm.get('password')?.valueChanges.subscribe(() => {
      this.organizationForm.get('repeatPassword')?.updateValueAndValidity();
    });
  }

  private passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;

    if (password && repeatPassword && password !== repeatPassword) {
      return { mismatch: true };
    }
    return null;
  };

  updateOrganization() {
    if (this.organizationForm.valid) {
      const password = this.organizationForm.get('password')?.value;

      if (password && !this.organizationForm.hasError('mismatch')) {
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        if (!passwordPattern.test(password)) {
          this.snackBar.open('Password must be at least 8 characters long, contain at least one number, one lowercase, one uppercase letter, and one special character.', 'Close', { duration: 3000 });
          return;
        }
      }

      const updatedOrganization = this.organizationForm.value;
      // Lógica para actualizar la organización con el servicio correspondiente
      this.snackBar.open('Organization updated successfully', 'Close', {
        duration: 3000,
      });
    } else {
      this.organizationForm.markAllAsTouched();
      this.handleFormErrors();
    }
  }

  deleteAccount() {
    // Lógica para eliminar la cuenta
    this.snackBar.open('Account deleted successfully', 'Close', {
      duration: 3000,
    });
  }

  private handleFormErrors(): void {
    const phoneError = this.organizationForm.get('phone')?.hasError('pattern');
    const passwordMismatchError = this.organizationForm.hasError('mismatch');

    if (phoneError) {
      this.snackBar.open('Enter a valid phone number (e.g., +34722680349)', 'Close', { duration: 3000 });
    }

    if (passwordMismatchError) {
      this.snackBar.open('Passwords must match', 'Close', { duration: 3000 });
    }

    if (!phoneError && !passwordMismatchError) {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
    }
  }
}
