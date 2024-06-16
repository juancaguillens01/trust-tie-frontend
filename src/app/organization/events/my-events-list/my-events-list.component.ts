import {Component, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import {EventService} from "../event.service";

@Component({
  selector: 'app-my-events-list',
  templateUrl: './my-events-list.component.html',
  styleUrls: ['./my-events-list.component.scss']
})
export class MyEventsListComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getMyEvents();
  }

  getMyEvents(): void {
    this.eventService.getMyEvents().subscribe({
      next: (events: Event[]) => this.events = events,
      error: (err) => console.error('Error fetching my events', err)
    });
  }

}
