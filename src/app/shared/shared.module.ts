import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatToolbarModule, RouterLink, MatButtonModule, RouterLinkActive],
  exports: [HeaderComponent]
})
export class SharedModule {}
