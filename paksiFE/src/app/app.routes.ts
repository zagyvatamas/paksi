import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { LandingComponent } from '../components/landing/landing.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProductsComponent } from '../components/products/products.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'products', component: ProductsComponent},
    { path: 'navbar', component: NavbarComponent},
    { path: 'landing', component: LandingComponent},
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];
