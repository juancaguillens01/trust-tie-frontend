import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import { OrganizationProfileComponent } from './components/organization-profile/organization-profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [HeaderComponent, OrganizationProfileComponent],
  imports: [CommonModule, MatToolbarModule, RouterLink, MatButtonModule, RouterLinkActive, ReactiveFormsModule, MatInputModule, MatCardModule],
  exports: [HeaderComponent]
})
export class SharedModule {}
