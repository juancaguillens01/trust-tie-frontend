import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Animal } from 'app/shared/models/animal.model';
import { AnimalService } from 'app/shared/services/animal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
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
    });

    this.route.paramMap.subscribe(params => {
      const animalUuid = params.get('animalUuid');
      if (animalUuid) {
        this.animalService.getAnimal(animalUuid).subscribe({
          next: (animal) => {
            this.animal = animal;
            this.animalForm.patchValue(animal);
          },
          error: (err) => {
            this.snackBar.open(`Failed to load animal: ${err.message}`, 'Close', { duration: 3000 });
          }
        });
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
}
