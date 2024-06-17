import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@core/auth.service';

export const OrganizationGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.checkIsOrganization()) {
    return true;
  } else if (authService.checkIsAdopter()) {
    router.navigate(['/adopter/home']).then();
    return false;
  } else {
    router.navigate(['/adopter/login']).then();
    return false;
  }
};
