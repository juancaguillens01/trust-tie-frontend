import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@core/auth.service';

export const GuestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.checkIsLoggedIn() || authService.checkIsAdopter()) {
    return true;
  } else if (authService.checkIsOrganization()) {
    router.navigate(['/organization/dashboard']).then();
    return false;
  }
  return false;
};
