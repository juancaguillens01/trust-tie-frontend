import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@core/auth.service';

export const LoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.checkIsLoggedIn()) {
    return true;
  } else if (authService.checkIsOrganization()) {
    router.navigate(['/organization/dashboard']).then();
    return false;
  } else if (authService.checkIsAdopter()) {
    router.navigate(['/adopter/home']).then();
    return false;
  }
  return false;
};
