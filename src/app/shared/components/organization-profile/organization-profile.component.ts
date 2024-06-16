import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganizationProfileService } from '../../services/organization-profile.service';
import { Organization } from '../../models/organization.model';
import { AuthService } from '@core/auth.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog.component';

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
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private organizationProfileService: OrganizationProfileService,
    private authService: AuthService
  ) {
    this.organizationForm = this.createOrganizationForm();
  }

  ngOnInit(): void {
    this.loadOrganization();
  }

  private createOrganizationForm(): FormGroup {
    return this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.email]],
      phone: ['', [Validators.pattern('^(\\+\\d{1,15})$')]],
      name: [''],
      description: [''],
      website: ['']
    });
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
      this.snackBar.open('Unauthorized access', 'Close', { duration: 3000 });
      this.router.navigate(['/']).then();
    }
  }

  updateOrganization() {
    if (!this.authService.checkIsOrganization()) {
      this.snackBar.open('Unauthorized access', 'Close', { duration: 3000 });
      this.router.navigate(['/']).then();
      return;
    }

    if (this.organizationForm.valid) {
      const updatedOrganization = this.getUpdatedOrganization();

      this.organizationProfileService.updateOrganization(this.organization.organizationUuid, updatedOrganization).subscribe({
        next: () => {
          this.snackBar.open('Organization updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/organization/profile']).then();
        },
        error: (err) => {
          this.snackBar.open(`Error updating organization: ${err.message}`, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.organizationForm.markAllAsTouched();
      this.handleFormErrors();
    }
  }

  private getUpdatedOrganization(): Partial<Organization> {
    const updatedOrganization: Partial<Organization> = {};

    Object.keys(this.organizationForm.controls).forEach(key => {
      const control = this.organizationForm.get(key);
      const currentValue = control?.value;
      const originalValue = this.organization[key];

      if (control?.enabled && currentValue !== undefined && currentValue !== '') {
        updatedOrganization[key] = currentValue;
      } else if (control?.enabled && (currentValue === '' || currentValue === undefined)) {
        updatedOrganization[key] = originalValue;
      }
    });

    return updatedOrganization;
  }

  deleteAccount() {
    if (!this.authService.checkIsOrganization()) {
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
        this.organizationProfileService.deleteOrganization(this.organization.organizationUuid).subscribe({
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
    const phoneError = this.organizationForm.get('phone')?.hasError('pattern');

    if (phoneError) {
      this.snackBar.open('Enter a valid phone number (e.g., +34722680349)', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
    }
  }
}
