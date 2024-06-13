import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationDashboardComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    SharedModule
  ]
})
export class OrganizationModule { }
