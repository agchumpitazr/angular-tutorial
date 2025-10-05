import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'), // dynamic import
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component'), // dynamic import
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page.component'), // dynamic import
      },
      {
        path: 'history/:query', // :query is a route parameter
        loadComponent: () => import('./gifs/pages/history-page/history-page.component'), // dynamic import
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
