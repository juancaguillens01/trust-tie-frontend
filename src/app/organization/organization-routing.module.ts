import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
import { OrganizationGuard } from '@core/guards/organization.guard';

const routes: Routes = [
  { path: '', component: OrganizationComponent, children: [
      { path: 'dashboard', component: OrganizationDashboardComponent, canActivate: [OrganizationGuard] }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
