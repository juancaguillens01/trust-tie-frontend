import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpService} from "@core/http.service";
import {Animal} from "../../shared/models/animal.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  static readonly GET_ANIMALS = environment.REST + "/animals";

  constructor(private httpService: HttpService) {
  }

  getAllAnimals(): Observable<Animal[]> {
    return this.httpService.get(AnimalService.GET_ANIMALS);
  }
}
