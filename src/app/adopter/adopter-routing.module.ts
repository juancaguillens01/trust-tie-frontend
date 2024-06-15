import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdopterComponent } from './adopter.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {LoggedInGuard} from "@core/guards/logged-in-guard";
import {AdopterGuard} from "@core/guards/adopter.guard";
import {AdopterProfileComponent} from "./profile/adopter-profile.component";

const routes: Routes = [
  { path: '', component: AdopterComponent, children: [
      { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
      { path: 'profile', component: AdopterProfileComponent, canActivate: [AdopterGuard] },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdopterRoutingModule {}
