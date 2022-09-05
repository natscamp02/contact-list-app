import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        ContactListComponent,
        LoginComponent,
        ContactFormComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
