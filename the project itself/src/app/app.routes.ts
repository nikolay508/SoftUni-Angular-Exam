import { Routes } from '@angular/router';
import { AuthGuard } from './user/users.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./core/home/home.component').then((c) => c.LatestCourseComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./views/search/search.component').then((c) => c.SearchComponent),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./views/catalog/catalog.component').then(
        (c) => c.CatalogComponent
      ),
  },
  {
    path: 'courses/:courseId',
    loadComponent: () =>
      import('./views/details/details.component').then(
        (c) => c.DetailsComponent
      ),
  },
  {
    path: 'courses/:courseId/edit',
    loadComponent: () =>
      import('./views/edit/edit.component').then((c) => c.EditComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./views/about/about.component').then((c) => c.AboutComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./views/create/create.component').then((c) => c.CreateComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./user/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./user/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./user/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./views/error/error.component').then((c) => c.ErrorComponent),
  },
];
