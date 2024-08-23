import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AppSubmittedComponent } from './app-submitted/app-submitted.component';
import { LoginComponent } from './login/login.component';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
    { 
        path: 'home', 
        title: 'Home',
        component: HomeComponent, 
    },
    {
        path: 'apply',
        title: 'Apply',
        component: ApplicationComponent
    },    
    {
        path: 'admin',
        title: 'Admin',
        component: AdminComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'app-submitted',
        title: 'Application Submitted',
        component: AppSubmittedComponent
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent
    },
    { 
        path: '',
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        title: 'Page Not Found',
        component: PageNotFoundComponent 
    },
];
