import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: ByCapitalPageComponent
  },

]

export default countryRoutes; // Default export to be able to import it with any name in the app.routes.ts
