import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';


@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationDashboardComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
