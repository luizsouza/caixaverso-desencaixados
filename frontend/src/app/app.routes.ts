import { Routes } from '@angular/router';
import { ProfilesComponent } from './features/profiles/profiles.component';
import { CustomizerComponent } from './features/customizer/customizer.component';
import { AuthComponent } from './features/auth/auth.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { ConfirmComponent } from './features/confirm/confirm.component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'adjusts',
    component: CustomizerComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    canActivate: [authGuardGuard],
  },
  { path: '', redirectTo: 'profiles', pathMatch: 'full' },
];
