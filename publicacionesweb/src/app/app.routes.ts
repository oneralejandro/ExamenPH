import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'gestion-publicaciones',
    loadComponent: () => import('./paginas/gestion-publicaciones/gestion-publicaciones.page').then( m => m.GestionPublicacionesPage)
  },
  {
    path: 'configuraciones',
    loadComponent: () => import('./paginas/configuraciones/configuraciones.page').then( m => m.ConfiguracionesPage)
  },
];
