import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AdopterProfileService } from '../adopter-profile.service';
import { Adopter } from '../adopter-model';
import { AuthService } from '@core/auth.service';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-adopter-profile',
  templateUrl: './adopter-profile.component.html',
  styleUrls: ['./adopter-profile.component.scss']
})
export class AdopterProfileComponent implements OnInit {
  adopterForm: FormGroup;
  adopter: Adopter;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private adopterProfileService: AdopterProfileService,
    private authService: AuthService
  ) {
    this.adopterForm = this.createAdopterForm();
  }

  ngOnInit(): void {
    this.loadAdopter();
    this.setupPasswordChangeSubscribers();
  }

  private createAdopterForm(): FormGroup {
    return this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.email]],
      password: [''],
      repeatPassword: [''],
      phone: ['', [Validators.pattern('^(\\+\\d{1,15})$')]],
      firstName: [''],
      lastName: [''],
      biography: ['']
    }, { validators: this.passwordMatchValidator });
  }

  private loadAdopter(): void {
    if (this.authService.checkIsAdopter()) {
      this.adopterProfileService.getAdopter().subscribe({
        next: (adopter: Adopter) => {
          this.adopter = adopter;
          this.adopterForm.patchValue(this.adopter);
        },
        error: (err) => {
          this.snackBar.open(`Error loading adopter: ${err.message}`, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Unauthorized access', 'Close', { duration: 3000 });
      this.router.navigate(['/']).then();
    }
  }

  private setupPasswordChangeSubscribers(): void {
    this.adopterForm.get('password')?.valueChanges.subscribe(() => {
      const passwordControl = this.adopterForm.get('password');
      const repeatPasswordControl = this.adopterForm.get('repeatPassword');
      if (passwordControl?.value) {
        repeatPasswordControl?.setValidators([Validators.required]);
      } else {
        repeatPasswordControl?.clearValidators();
      }
      repeatPasswordControl?.updateValueAndValidity();
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

  updateAdopter() {
    if (this.adopterForm.valid) {
      const updatedAdopter = this.getUpdatedAdopter();

      if (updatedAdopter.password && !this.adopterForm.hasError('mismatch')) {
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        if (!passwordPattern.test(updatedAdopter.password)) {
          this.snackBar.open('Password must be at least 8 characters long, contain at least one number, one lowercase, one uppercase letter, and one special character.', 'Close', { duration: 3000 });
          return;
        }
      }

      this.adopterProfileService.updateAdopter(this.adopter.adopterUuid, updatedAdopter).subscribe({
        next: () => {
          this.snackBar.open('Adopter updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/adopter/dashboard']).then();
        },
        error: (err) => {
          this.snackBar.open(`Error updating adopter: ${err.message}`, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.adopterForm.markAllAsTouched();
      this.handleFormErrors();
    }
  }

  private getUpdatedAdopter(): Partial<Adopter> {
    const updatedAdopter: Partial<Adopter> = {};

    Object.keys(this.adopterForm.controls).forEach(key => {
      const control = this.adopterForm.get(key);
      const currentValue = control?.value;
      const originalValue = this.adopter[key];

      if (control?.enabled && currentValue !== undefined && currentValue !== '') {
        updatedAdopter[key] = currentValue;
      } else if (control?.enabled && (currentValue === '' || currentValue === undefined)) {
        updatedAdopter[key] = originalValue;
      }
    });

    return updatedAdopter;
  }

  deleteAccount() {
    if (!this.authService.checkIsAdopter()) {
      this.snackBar.open('Unauthorized access', 'Close', { duration: 3000 });
      this.router.navigate(['/']).then();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this account? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adopterProfileService.deleteAdopter(this.adopter.adopterUuid).subscribe({
          next: () => {
            this.snackBar.open('Account deleted successfully', 'Close', { duration: 3000 });
            this.authService.clearSession();
          },
          error: (err) => {
            this.snackBar.open(`Error deleting account: ${err.message}`, 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  private handleFormErrors(): void {
    const phoneError = this.adopterForm.get('phone')?.hasError('pattern');
    const passwordMismatchError = this.adopterForm.hasError('mismatch');
    const repeatPasswordRequiredError = this.adopterForm.get('repeatPassword')?.hasError('required');

    if (phoneError) {
      this.snackBar.open('Enter a valid phone number (e.g., +34722680349)', 'Close', { duration: 3000 });
    }

    if (passwordMismatchError) {
      this.snackBar.open('Passwords must match', 'Close', { duration: 3000 });
    }

    if (repeatPasswordRequiredError) {
      this.snackBar.open('Repeat password is required', 'Close', { duration: 3000 });
    }

    if (!phoneError && !passwordMismatchError && !repeatPasswordRequiredError) {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
    }
  }
}
