import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {Animal} from "../../shared/models/animal.model";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  static readonly GET_MY_ANIMALS = environment.REST + "/animals/my-animals";

  constructor(private httpService: HttpService) { }

  getMyAnimals(): Observable<Animal[]> {
    return this.httpService.get(AnimalService.GET_MY_ANIMALS);
  }
}
