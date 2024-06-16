import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AdopterRoutingModule } from './adopter-routing.module';
import { AdopterComponent } from './adopter.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "../shared/shared.module";
import { AdopterProfileComponent } from './profile/adopter-profile.component';
import { AnimalsListComponent } from './animals/animals-list.component';
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    AdopterComponent,
    LoginComponent,
    RegisterComponent,
    AdopterProfileComponent,
    AnimalsListComponent
  ],
    imports: [
        CommonModule,
        AdopterRoutingModule,
        MatButtonModule,
        MatToolbarModule,
        NgOptimizedImage,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        SharedModule,
        MatListModule
    ]
})
export class AdopterModule { }
