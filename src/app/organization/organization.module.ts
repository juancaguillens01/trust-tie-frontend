import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SharedModule} from "../shared/shared.module";
import { MyAnimalsListComponent } from './animals/my-animals-list/my-animals-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import { MyEventsListComponent } from './events/my-events-list.component';
import { CreateAnimalComponent } from './animals/create-animal/create-animal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationDashboardComponent,
    MyAnimalsListComponent,
    MyEventsListComponent,
    CreateAnimalComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    SharedModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class OrganizationModule { }
