import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdopterComponent} from "./adopter.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: '', component: AdopterComponent, children:  // el resto de componentes deben ser hijos de este
      [
        {path: 'login', component: LoginComponent}
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdopterRoutingModule {
}
