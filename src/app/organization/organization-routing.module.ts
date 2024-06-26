import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationComponent} from './organization.component';
import {OrganizationDashboardComponent} from './organization-dashboard/organization-dashboard.component';
import {OrganizationGuard} from '@core/guards/organization.guard';
import {OrganizationProfileComponent} from '../shared/components/organization-profile/organization-profile.component';
import {MyAnimalsListComponent} from './animals/my-animals-list/my-animals-list.component';
import {MyEventsListComponent} from './events/my-events-list/my-events-list.component';
import {CreateAnimalComponent} from './animals/create-animal/create-animal.component';
import {CreateEventComponent} from './events/create-event/create-event.component';
import {AnimalDetailComponent} from '../shared/components/animals/animal-detail.component';
import {EventDetailComponent} from "../shared/components/events/event-detail.component";

const routes: Routes = [
  {
    path: '', component: OrganizationComponent, children: [
      {path: 'dashboard', component: OrganizationDashboardComponent, canActivate: [OrganizationGuard]},
      {path: 'profile', component: OrganizationProfileComponent, canActivate: [OrganizationGuard]},
      {path: 'my-animals-list', component: MyAnimalsListComponent, canActivate: [OrganizationGuard]},
      {path: 'create-animal', component: CreateAnimalComponent, canActivate: [OrganizationGuard]},
      {path: 'my-events-list', component: MyEventsListComponent, canActivate: [OrganizationGuard]},
      {path: 'create-event', component: CreateEventComponent, canActivate: [OrganizationGuard]},
      {
        path: 'animal-detail/:animalUuid',
        component: AnimalDetailComponent,
        canActivate: [OrganizationGuard],
        data: {isOrganization: true}
      },
      {
        path: 'event-detail/:eventUuid',
        component: EventDetailComponent,
        canActivate: [OrganizationGuard],
        data: {isOrganization: true}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
