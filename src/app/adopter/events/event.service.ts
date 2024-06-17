import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpService} from "@core/http.service";
import {Event} from "../../shared/models/event.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  static readonly GET_EVENTS = environment.REST + "/events";

  constructor(private httpService: HttpService) {
  }

  getAllEvents(): Observable<Event[]> {
    return this.httpService.get(EventService.GET_EVENTS);
  }
}
