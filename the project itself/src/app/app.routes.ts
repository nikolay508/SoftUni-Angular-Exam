import { Routes } from '@angular/router';
import { SearchComponent } from './shared/search/search.component';
import { AboutComponent } from './shared/about/about.component';
import { ErrorComponent } from './shared/error/error.component';
import { LatestCourseComponent } from './main/home/latest-courses.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CatalogComponent } from './main/catalog/catalog.component';
import { AuthGuard } from './user/users.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { CreateComponent } from './shared/create/create.component';
import { DetailsComponent } from './shared/details/details.component';
import { EditComponent } from './shared/edit/edit.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LatestCourseComponent },
    { path: 'search', component: SearchComponent },
    { path: 'courses', component: CatalogComponent },
    { path: 'courses/:courseId', component: DetailsComponent },
    { path: 'courses/:courseId/edit', component: EditComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    // { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: ErrorComponent }
];
