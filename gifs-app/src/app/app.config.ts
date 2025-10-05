import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // provideHttpClient(), // <-- Add this line to provide HttpClient. It is using XHRBackend by default
    provideHttpClient(withFetch()), // <-- Add this line to provide HttpClient using FetchBackend. New in Angular v16
  ]
};
