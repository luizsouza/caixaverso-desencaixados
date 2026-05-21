import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { HackathonPreset } from '../styles/primeng-preset';

import { routes } from './app.routes';
import { authInterceptorInterceptor } from './core/interceptors/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),
    providePrimeNG({
      theme: {
        preset: HackathonPreset,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
  ],
};
