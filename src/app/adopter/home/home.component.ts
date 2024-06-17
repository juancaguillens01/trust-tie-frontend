import {Component, OnInit} from '@angular/core';
import {Animal} from "../../shared/models/animal.model";
import {Event} from "../../shared/models/event.model";
import {AnimalService} from "../animals/animal.service";
import {EventService} from "../events/event.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  animals: Animal[] = [];
  randomAnimals: Animal[] = [];
  events: Event[] = [];
  upcomingEvents: Event[] = [];

  constructor(
    private animalService: AnimalService,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    this.getAllAnimals();
    this.getAllEvents();
  }

  getAllAnimals(): void {
    this.animalService.getAllAnimals().subscribe({
      next: (animals: Animal[]) => {
        this.animals = animals;
        this.randomAnimals = this.getRandomAnimals(animals);
      },
      error: (err) => console.error('Error fetching animals', err)
    });
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events: Event[]) => {
        this.events = events;
        this.upcomingEvents = this.getUpcomingEvents(events);
      },
      error: (err) => console.error('Error fetching events', err)
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
