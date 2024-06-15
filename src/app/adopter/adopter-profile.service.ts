import { Injectable } from "@angular/core";
import { HttpService } from "@core/http.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Adopter } from "./adopter-model";
import { Observable } from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AdopterProfileService {
  static readonly GET_ADOPTER = environment.REST + "/users/profile/adopter";
  static readonly UPDATE_ADOPTER = environment.REST + "/adopters/";
  static readonly DELETE_ADOPTER = environment.REST + "/adopters/";

  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {}

  getAdopter(): Observable<Adopter> {
    return this.httpService.get(AdopterProfileService.GET_ADOPTER);
  }

  updateAdopter(uuid: string, adopter: Partial<Adopter>): Observable<Adopter> {
    return this.httpService.put(`${AdopterProfileService.UPDATE_ADOPTER}${uuid}`, adopter);
  }

  deleteAdopter(uuid: string): Observable<void> {
    return this.httpService.delete(`${AdopterProfileService.DELETE_ADOPTER}${uuid}`);
  }
}
