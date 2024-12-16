import { Routes } from '@angular/router';
import { AboutComponent } from './shared/about/about.component';
import { ErrorComponent } from './shared/error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: '**', component: ErrorComponent }
];
