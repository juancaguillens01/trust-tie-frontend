import {Component, OnInit} from '@angular/core';
import {EventService} from "./event.service";
import {Event} from '../../shared/models/event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events: Event[]) => this.events = events,
      error: (err) => console.error('Error fetching events', err)
    });
  }

}
