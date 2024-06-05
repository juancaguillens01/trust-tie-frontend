import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@core/auth.service";


export const OrganizationGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  console.log(authService.checkIsOrganization());
  if (authService.checkIsOrganization()) {
    return true;
  }
  inject(Router).navigate(['']).then();
  return false;
}






