import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpService} from '@core/http.service';
import {Observable} from 'rxjs';
import {Event} from 'app/shared/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  static readonly GET_EVENT = environment.REST + '/events';

  constructor(private httpService: HttpService) {
  }

  getEvent(eventUuid: string): Observable<Event> {
    return this.httpService.get(`${EventService.GET_EVENT}/${eventUuid}`);
  }
}
