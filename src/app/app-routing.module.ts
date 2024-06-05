import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationGuard} from "@core/organization.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'adopter'},
  {path: 'adopter', loadChildren: () => import('./adopter/adopter.module').then(module => module.AdopterModule)},
  {
    path: 'organization',
    canActivate: [OrganizationGuard],
    loadChildren: () => import('./organization/organization.module').then(module => module.OrganizationModule)
  },
  {path: '**', redirectTo: 'adopter'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
