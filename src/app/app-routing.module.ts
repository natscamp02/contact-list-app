import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },


    { path: 'contacts', component: ContactListComponent },
    { path: 'contacts/new', component: ContactFormComponent },
    { path: 'contacts/:id', component: ContactFormComponent },


    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    { path: '**', redirectTo: '/contacts' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
