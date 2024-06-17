import {Injectable} from "@angular/core";
import {HttpService} from "@core/http.service";
import {Organization} from "../models/organization.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class OrganizationProfileService {
  static readonly GET_ORGANIZATION = environment.REST + "/users/profile/organization";
  static readonly UPDATE_ORGANIZATION = environment.REST + "/organizations/";
  static readonly DELETE_ORGANIZATION = environment.REST + "/organizations/";

  constructor(private httpService: HttpService) {
  }

  getOrganization(): Observable<Organization> {
    return this.httpService.get(OrganizationProfileService.GET_ORGANIZATION);
  }

  updateOrganization(uuid: string, organization: Partial<Organization>): Observable<Organization> {
    return this.httpService.put(`${OrganizationProfileService.UPDATE_ORGANIZATION}${uuid}`, organization);
  }

  deleteOrganization(uuid: string): Observable<void> {
    return this.httpService.delete(`${OrganizationProfileService.DELETE_ORGANIZATION}${uuid}`);
  }
}
