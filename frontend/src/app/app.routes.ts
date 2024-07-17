import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
