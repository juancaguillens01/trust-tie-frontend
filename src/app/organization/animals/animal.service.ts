import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '@core/http.service';
import { Observable } from 'rxjs';
import { Animal } from '../../shared/models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationAnimalService {

  static readonly GET_MY_ANIMALS = environment.REST + '/animals/my-animals';
  static readonly BASE_URL = environment.REST + '/animals';

  constructor(private httpService: HttpService) { }

  getMyAnimals(): Observable<Animal[]> {
    return this.httpService.get(OrganizationAnimalService.GET_MY_ANIMALS);
  }

  createAnimal(animal: Animal): Observable<Animal> {
    return this.httpService.post(OrganizationAnimalService.BASE_URL, animal);
  }

  updateAnimal(animal: Animal): Observable<Animal> {
    return this.httpService.put(`${OrganizationAnimalService.BASE_URL}/${animal.animalUuid}`, animal);
  }

  deleteAnimal(animalUuid: string): Observable<void> {
    return this.httpService.delete(`${OrganizationAnimalService.BASE_URL}/${animalUuid}`);
  }
}
