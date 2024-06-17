import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {OrganizationEventService} from 'app/organization/events/event.service';
import {Event} from 'app/shared/models/event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  createEventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private eventService: OrganizationEventService,
    private router: Router
  ) {
    this.createEventForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      eventDate: ['', [Validators.required, this.futureDateValidator]],
      eventLocation: ['', Validators.required]
    });
  }

  private futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate > today ? null : {invalidDate: true};
  }

  createEvent() {
    if (this.createEventForm.valid) {
      const eventData: Event = this.createEventForm.value;
      this.eventService.createEvent(eventData).subscribe({
        next: (event) => this.handleSuccess(event),
        error: (err) => this.handleError(err)
      });
    } else {
      this.snackBar.open('Please fill out the form correctly', 'Close', {duration: 3000});
    }
  }

  private handleSuccess(event: Event): void {
    this.snackBar.open('Event added successfully', 'Close', {duration: 3000});
    this.router.navigate(['/organization/event-detail', event.eventUuid]).then();
  }

  private handleError(err: any): void {
    this.snackBar.open(`Event addition failed: ${err.message}`, 'Close', {duration: 3000});
  }
}
