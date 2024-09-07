import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnauthGuard } from './shared/guards/unauth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [UnauthGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent
      ),
  },
];
