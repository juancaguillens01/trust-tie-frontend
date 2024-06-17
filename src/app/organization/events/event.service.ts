import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {Event} from "../../shared/models/event.model";

@Injectable({
  providedIn: 'root'
})
export class OrganizationEventService {

  static readonly GET_MY_EVENTS = environment.REST + "/events/my-events";
  static readonly BASE_URL = environment.REST + "/events";

  constructor(private httpService: HttpService) {
  }

  getMyEvents(): Observable<Event[]> {
    return this.httpService.get(OrganizationEventService.GET_MY_EVENTS);
  }

  createEvent(event: Event): Observable<Event> {
    return this.httpService.post(OrganizationEventService.BASE_URL, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.httpService.put(`${OrganizationEventService.BASE_URL}/${event.eventUuid}`, event);
  }

  deleteEvent(eventUuid: string): Observable<void> {
    return this.httpService.delete(`${OrganizationEventService.BASE_URL}/${eventUuid}`);
  }
}
