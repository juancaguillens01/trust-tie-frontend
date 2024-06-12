import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdopterGuard} from "@core/guards/adopter.guard";
import {OrganizationGuard} from "@core/guards/organization.guard";

const routes: Routes = [
  {
    path: 'adopter',
    loadChildren: () => import('./adopter/adopter.module').then(m => m.AdopterModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule)
  },
  {path: '**', redirectTo: 'adopter'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
