import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
import { OrganizationGuard } from '@core/guards/organization.guard';
import {OrganizationProfileComponent} from "../shared/components/organization-profile/organization-profile.component";
import {MyAnimalsListComponent} from "./animals/my-animals-list.component";
import {MyEventsListComponent} from "./events/my-events-list.component";

const routes: Routes = [
  { path: '', component: OrganizationComponent, children: [
      { path: 'dashboard', component: OrganizationDashboardComponent, canActivate: [OrganizationGuard] },
      { path: 'profile', component: OrganizationProfileComponent, canActivate: [OrganizationGuard] },
      { path: 'my-animals-list', component: MyAnimalsListComponent, canActivate: [OrganizationGuard] },
      { path: 'my-events-list', component: MyEventsListComponent, canActivate: [OrganizationGuard] },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
