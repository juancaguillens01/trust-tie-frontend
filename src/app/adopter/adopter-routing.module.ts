import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdopterComponent } from './adopter.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {LoggedInGuard} from "@core/guards/logged-in-guard";
import {AdopterGuard} from "@core/guards/adopter.guard";
import {AdopterProfileComponent} from "./profile/adopter-profile.component";
import {AnimalsListComponent} from "./animals/animals-list.component";
import {GuestGuard} from "@core/guards/guest.guard";
import {EventsListComponent} from "./events/events-list.component";

const routes: Routes = [
  { path: '', component: AdopterComponent, children: [
      { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
      { path: 'profile', component: AdopterProfileComponent, canActivate: [AdopterGuard] },
      { path: 'animals-list', component: AnimalsListComponent, canActivate: [GuestGuard] },
      { path: 'events-list', component: EventsListComponent, canActivate: [GuestGuard] },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdopterRoutingModule {}
