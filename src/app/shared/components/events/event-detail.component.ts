import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from 'app/shared/models/event.model';
import {EventService} from 'app/shared/services/event.service';
import {OrganizationEventService} from 'app/organization/events/event.service';
import {OrganizationProfileService} from 'app/shared/services/organization-profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from 'app/shared/dialogs/confirm-dialog.component';

interface EventDetailRouteData {
  isOrganization: boolean;
}

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  eventForm: FormGroup;
  isOrganization: boolean;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private organizationEventService: OrganizationEventService,
    private organizationProfileService: OrganizationProfileService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      eventDate: ['', [Validators.required, this.futureDateValidator]],
      eventLocation: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: EventDetailRouteData) => {
      this.isOrganization = data.isOrganization;
      this.setFormState();

      this.route.paramMap.subscribe(params => {
        const eventUuid = params.get('eventUuid');
        if (eventUuid) {
          if (this.isOrganization) {
            this.checkOrganizationAndLoadEvent(eventUuid);
          } else {
            this.loadEvent(eventUuid);
          }
        }
      });
    });
  }

  private checkOrganizationAndLoadEvent(eventUuid: string): void {
    this.organizationProfileService.getOrganization().subscribe({
      next: (organization) => {
        this.loadEvent(eventUuid, organization.organizationUuid);
      },
      error: (err) => {
        this.snackBar.open(`Failed to load organization details: ${err.message}`, 'Close', {duration: 3000});
        this.router.navigate(['/organization/dashboard']).then();
      }
    });
  }

  private loadEvent(eventUuid: string, organizationUuid?: string): void {
    this.eventService.getEvent(eventUuid).subscribe({
      next: (event) => {
        if (!organizationUuid || event.organizationUuid === organizationUuid) {
          this.event = event;
          this.eventForm.patchValue({
            ...event,
            eventDate: new Date(event.eventDate)
          });
        } else {
          this.snackBar.open('You do not have access to view this event.', 'Close', {duration: 3000});
          this.router.navigate(['/organization/dashboard']).then();
        }
      },
      error: (err) => {
        this.snackBar.open(`Failed to load event: ${err.message}`, 'Close', {duration: 3000});
        this.router.navigate(['/organization/my-events-list']).then();
      }
    });
  }

  private setFormState(): void {
    if (this.isOrganization) {
      this.eventForm.enable();
    } else {
      this.eventForm.disable();
    }
  }

  private futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today ? null : {invalidDate: true};
  }

  updateEvent() {
    if (this.eventForm.valid) {
      const updatedEvent: Event = {
        ...this.event,
        ...this.eventForm.value,
        eventDate: this.toUTCDate(new Date(this.eventForm.value.eventDate))
      };
      this.organizationEventService.updateEvent(updatedEvent).subscribe({
        next: () => {
          this.snackBar.open('Event updated successfully', 'Close', {duration: 3000});
          this.loadEvent(this.event.eventUuid, this.event.organizationUuid);
        },
        error: (err) => {
          this.snackBar.open(`Failed to update event: ${err.message}`, 'Close', {duration: 3000});
        }
      });
    }
  }

  deleteEvent() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {title: 'Confirm Delete', message: 'Are you sure you want to delete this event?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.organizationEventService.deleteEvent(this.event.eventUuid).subscribe({
          next: () => {
            this.snackBar.open('Event deleted successfully', 'Close', {duration: 3000});
            this.router.navigate(['/organization/my-events-list']).then();
          },
          error: (err) => {
            this.snackBar.open(`Failed to delete event: ${err.message}`, 'Close', {duration: 3000});
          }
        });
      }
    });
  }

  private toUTCDate(date: Date): string {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
  }
}
