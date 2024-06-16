import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrganizationAnimalService } from 'app/organization/animals/animal.service';
import { Animal } from 'app/shared/models/animal.model';
import {Size} from "../../../shared/models/size.model";

@Component({
  selector: 'app-create-animal',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.scss']
})
export class CreateAnimalComponent {
  createAnimalForm: FormGroup;
  sizes = Object.values(Size);

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private animalService: OrganizationAnimalService,
    private router: Router
  ) {
    this.createAnimalForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      size: ['', Validators.required],
      characteristics: ['', Validators.required]
    });
  }

  createAnimal() {
    if (this.createAnimalForm.valid) {
      const animalData: Animal = this.createAnimalForm.value;
      this.animalService.createAnimal(animalData).subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err)
      });
    } else {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
    }
  }

  private handleSuccess(): void {
    this.snackBar.open('Animal added successfully', 'Close', { duration: 3000 });
    this.router.navigate(['/organization/my-animals-list']).then();
  }

  private handleError(err: any): void {
    this.snackBar.open(`Animal addition failed: ${err.message}`, 'Close', { duration: 3000 });
  }
}
