import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import { AdopterRoutingModule } from './adopter-routing.module';
import { AdopterComponent } from './adopter.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdopterComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AdopterRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class AdopterModule { }
