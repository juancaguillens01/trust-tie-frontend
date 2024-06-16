import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private adopterProfileService: AdopterProfileService,
    private authService: AuthService
  ) {
    this.adopterForm = this.createAdopterForm();
  }

  ngOnInit(): void {
    this.loadAdopter();
  }

  private createAdopterForm(): FormGroup {
    return this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.email]],
      phone: ['', [Validators.pattern('^(\\+\\d{1,15})$')]],
      firstName: [''],
      lastName: [''],
      biography: ['']
    });
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

  updateAdopter() {
    if (this.adopterForm.valid) {
      const updatedAdopter = this.getUpdatedAdopter();

      this.adopterProfileService.updateAdopter(this.adopter.adopterUuid, updatedAdopter).subscribe({
        next: () => {
          this.snackBar.open('Adopter updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/adopter/profile']).then();
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

    if (phoneError) {
      this.snackBar.open('Enter a valid phone number (e.g., +34722680349)', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
    }
  }
}
