import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AuthGuard: CanActivateFn = (route, state) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);

  if (jwtHelper.isTokenExpired(localStorage.getItem('token') || '')) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
