import { Component, OnInit } from '@angular/core';
import { Animal } from '../../shared/models/animal.model';
import { Event } from '../../shared/models/event.model';
import { OrganizationAnimalService } from 'app/organization/animals/animal.service';
import { OrganizationEventService } from 'app/organization/events/event.service';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit {

  animals: Animal[] = [];
  randomAnimals: Animal[] = [];
  events: Event[] = [];
  upcomingEvents: Event[] = [];

  constructor(
    private animalService: OrganizationAnimalService,
    private eventService: OrganizationEventService
  ) {}

  ngOnInit(): void {
    this.getMyAnimals();
    this.getMyEvents();
  }

  getMyAnimals(): void {
    this.animalService.getMyAnimals().subscribe({
      next: (animals: Animal[]) => {
        this.animals = animals;
        this.randomAnimals = this.getRandomAnimals(animals);
      },
      error: (err) => console.error('Error fetching my animals', err)
    });
  }

  getMyEvents(): void {
    this.eventService.getMyEvents().subscribe({
      next: (events: Event[]) => {
        this.events = events;
        this.upcomingEvents = this.getUpcomingEvents(events);
      },
      error: (err) => console.error('Error fetching my events', err)
    });
  }

  getRandomAnimals(animals: Animal[]): Animal[] {
    if (animals.length <= 2) {
      return animals;
    }
    const shuffled = animals.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

  getUpcomingEvents(events: Event[]): Event[] {
    const sortedEvents = events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    return sortedEvents.slice(0, 2);
  }
}
