import { Component, OnInit } from '@angular/core';
import { AnimalService } from './animal.service';
import { Animal } from '../../shared/models/animal.model';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit {

  animals: Animal[] = [];

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.getAllAnimals();
  }

  getAllAnimals(): void {
    this.animalService.getAllAnimals().subscribe({
      next: (animals: Animal[]) => this.animals = animals,
      error: (err) => console.error('Error fetching animals', err)
    });
  }
}
