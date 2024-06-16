import {Component, OnInit} from '@angular/core';
import {Animal} from "../../../shared/models/animal.model";
import {AnimalService} from "../animal.service";

@Component({
  selector: 'app-my-animals-list',
  templateUrl: './my-animals-list.component.html',
  styleUrls: ['./my-animals-list.component.scss']
})
export class MyAnimalsListComponent implements OnInit {

  animals: Animal[] = [];

  constructor(private animalService: AnimalService) {
  }

  ngOnInit(): void {
    this.getMyAnimals();
  }

  getMyAnimals(): void {
    this.animalService.getMyAnimals().subscribe({
      next: (animals: Animal[]) => this.animals = animals,
      error: (err) => console.error('Error fetching my animals', err)
    });
  }

}
