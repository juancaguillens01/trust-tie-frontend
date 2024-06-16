import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {Event} from "../../shared/models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  static readonly GET_MY_EVENTS = environment.REST + "/events/my-events";

  constructor(private httpService: HttpService) { }

  getMyEvents(): Observable<Event[]> {
    return this.httpService.get(EventService.GET_MY_EVENTS);
  }
}
