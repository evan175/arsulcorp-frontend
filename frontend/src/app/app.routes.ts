import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';

export const routes: Routes = [
    { 
        path: 'home', 
        component: HomeComponent, 
    },
    {
        path: 'apply',
        component: ApplicationComponent
    },    
    { 
        path: '',
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
];
