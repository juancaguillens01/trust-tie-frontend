import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {OrganizationProfileComponent} from './components/organization-profile/organization-profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {ConfirmDialogComponent} from './dialogs/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AnimalDetailComponent} from './components/animals/animal-detail.component';
import {MatSelectModule} from "@angular/material/select";
import {EventDetailComponent} from './components/events/event-detail.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FooterComponent} from "./components/footer/footer.component";

@NgModule({
  declarations: [HeaderComponent, FooterComponent, OrganizationProfileComponent, ConfirmDialogComponent, AnimalDetailComponent, EventDetailComponent],
  imports: [CommonModule, MatToolbarModule, RouterLink, MatButtonModule, RouterLinkActive, ReactiveFormsModule, MatInputModule, MatCardModule, MatDialogModule, MatSelectModule, MatDatepickerModule],
  exports: [HeaderComponent, FooterComponent]
})
export class SharedModule {
}
