import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent, // No lazy loading because it's the main page
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes') // Lazy loading to avoid loading unnecessary code at the beginning
    // .then(m => m.countryRoutes) //? We use .then() because we are importing a module that is not the default one
  },
  {
    path: '**',
    redirectTo: '',
  }
];
