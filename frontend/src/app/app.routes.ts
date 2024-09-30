import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AppSubmittedComponent } from './app-submitted/app-submitted.component';
import { LoginComponent } from './login/login.component';
import { adminGuard } from './admin.guard';
import { TenantSubmissionsComponent } from './tenant-submissions/tenant-submissions.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmSignupComponent } from './confirm-signup/confirm-signup.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingComponent } from './listing/listing.component';

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
        path: 'apply/:address',
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
        path: 'signup',
        title: 'Sign Up',
        component: SignupComponent
    },
    {
        path: 'confirm-signup/:email',
        title: 'Confirm Sign Up',
        component: ConfirmSignupComponent
    },
    {
        path: 'applications',
        title: 'Applications',
        component: TenantSubmissionsComponent
    },
    {
        path: 'add-listing',
        title: 'Add Listing',
        component: AddListingComponent
    },
    {
        path: 'listings',
        title: 'Listings',
        component: ListingsComponent
    },
    {
        path: 'listing/:id',
        title: `Listing`,
        component: ListingComponent
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
