import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@core/auth.service';

export const AdopterGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.checkIsAdopter()) {
    return true;
  } else if (authService.checkIsOrganization()) {
    router.navigate(['/organization/dashboard']).then();
    return false;
  } else {
    router.navigate(['/adopter/login']).then();
    return false;
  }
};
