import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {Event} from "../../shared/models/event.model";
import {Animal} from "../../shared/models/animal.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  static readonly GET_MY_EVENTS = environment.REST + "/events/my-events";
  static readonly CREATE_EVENT = environment.REST + "/events";

  constructor(private httpService: HttpService) { }

  getMyEvents(): Observable<Event[]> {
    return this.httpService.get(EventService.GET_MY_EVENTS);
  }

  createEvent(event: Event): Observable<Event> {
    return this.httpService.post(EventService.CREATE_EVENT, event);
  }
}
