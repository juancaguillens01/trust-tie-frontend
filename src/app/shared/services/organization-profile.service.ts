import { Injectable } from "@angular/core";
import { HttpService } from "@core/http.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Organization } from "../models/organization-model";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class OrganizationProfileService {
  static readonly GET_ORGANIZATION = environment.REST + "/users/profile/organization";

  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {}

  getOrganization(): Observable<Organization> {
    return this.httpService.get(OrganizationProfileService.GET_ORGANIZATION);
  }
}
