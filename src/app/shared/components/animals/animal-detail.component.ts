import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Animal} from 'app/shared/models/animal.model';
import {AnimalService} from 'app/shared/services/animal.service';
import {OrganizationAnimalService} from 'app/organization/animals/animal.service';
import {OrganizationProfileService} from 'app/shared/services/organization-profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from 'app/shared/dialogs/confirm-dialog.component';
import {Size} from 'app/shared/models/size.model';

interface AnimalDetailRouteData {
  isOrganization: boolean;
}

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal;
  animalForm: FormGroup;
  isOrganization: boolean;
  sizes = Object.values(Size);

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private organizationAnimalService: OrganizationAnimalService,
    private organizationProfileService: OrganizationProfileService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      size: ['', Validators.required],
      characteristics: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: AnimalDetailRouteData) => {
      this.isOrganization = data.isOrganization;
      this.setFormState();

      this.route.paramMap.subscribe(params => {
        const animalUuid = params.get('animalUuid');
        if (animalUuid) {
          if (this.isOrganization) {
            this.checkOrganizationAndLoadAnimal(animalUuid);
          } else {
            this.loadAnimal(animalUuid);
          }
        }
      });
    });
  }

  private checkOrganizationAndLoadAnimal(animalUuid: string): void {
    this.organizationProfileService.getOrganization().subscribe({
      next: (organization) => {
        this.loadAnimal(animalUuid, organization.organizationUuid);
      },
      error: (err) => {
        this.snackBar.open(`Failed to load organization details: ${err.message}`, 'Close', {duration: 3000});
        this.router.navigate(['/organization/dashboard']).then();
      }
    });
  }

  private loadAnimal(animalUuid: string, organizationUuid?: string): void {
    this.animalService.getAnimal(animalUuid).subscribe({
      next: (animal) => {
        if (!organizationUuid || animal.organizationUuid === organizationUuid) {
          this.animal = animal;
          this.animalForm.patchValue(animal);
        } else {
          this.snackBar.open('You do not have access to view this animal.', 'Close', {duration: 3000});
          this.router.navigate(['/organization/dashboard']).then();
        }
      },
      error: (err) => {
        this.snackBar.open(`Failed to load animal: ${err.message}`, 'Close', {duration: 3000});
        this.router.navigate(['/organization/my-animals-list']).then();
      }
    });
  }

  private setFormState(): void {
    if (this.isOrganization) {
      this.animalForm.enable();
    } else {
      this.animalForm.disable();
    }
  }

  updateAnimal() {
    if (this.animalForm.valid) {
      const updatedAnimal: Animal = {...this.animal, ...this.animalForm.value};
      this.organizationAnimalService.updateAnimal(updatedAnimal).subscribe({
        next: () => {
          this.snackBar.open('Animal updated successfully', 'Close', {duration: 3000});
          this.loadAnimal(this.animal.animalUuid, this.animal.organizationUuid);
        },
        error: (err) => {
          this.snackBar.open(`Failed to update animal: ${err.message}`, 'Close', {duration: 3000});
        }
      });
    }
  }

  deleteAnimal() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {title: 'Confirm Delete', message: 'Are you sure you want to delete this animal?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.organizationAnimalService.deleteAnimal(this.animal.animalUuid).subscribe({
          next: () => {
            this.snackBar.open('Animal deleted successfully', 'Close', {duration: 3000});
            this.router.navigate(['/organization/my-animals-list']).then();
          },
          error: (err) => {
            this.snackBar.open(`Failed to delete animal: ${err.message}`, 'Close', {duration: 3000});
          }
        });
      }
    });
  }
}
