import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import { OrganizationProfileComponent } from './components/organization-profile/organization-profile.component';

@NgModule({
  declarations: [HeaderComponent, OrganizationProfileComponent],
  imports: [CommonModule, MatToolbarModule, RouterLink, MatButtonModule, RouterLinkActive],
  exports: [HeaderComponent]
})
export class SharedModule {}
