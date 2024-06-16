import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpService} from '@core/http.service';
import {Observable} from 'rxjs';
import {Animal} from 'app/shared/models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  static readonly GET_ANIMAL = environment.REST + '/animals';

  constructor(private httpService: HttpService) {
  }

  getAnimal(animalUuid: string): Observable<Animal> {
    return this.httpService.get(`${AnimalService.GET_ANIMAL}/${animalUuid}`);
  }
}
