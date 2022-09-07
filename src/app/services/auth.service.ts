import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private API_URL: string = 'http://localhost:8080/api/v1/users';

    isLoggedIn: boolean = false;
    authToken?: string;
    expiresAt?: string;

    constructor(private http: HttpClient, private router: Router) {
        this.autoLogin();
        this.autoLogout();
    }

    login(data: any): Observable<APIResponse<User & string>> {
        return this.http.post<APIResponse>(this.API_URL + '/login', data).pipe(tap((res) => {
            if (res.status === 'success') {
                this.isLoggedIn = true;
                this.authToken = res.data!['token'];
                this.expiresAt = res.data!['tokenExpires'];

                this.saveToken(this.authToken, this.expiresAt);
                this.autoLogout();
            }
        }));
    }

    signup(data: any): Observable<APIResponse<User & string>> {
        return this.http.post<APIResponse>(this.API_URL + '/signup', data).pipe(tap((res) => {
            if (res.status === 'success') {
                this.isLoggedIn = true;
                this.authToken = res.data!['token'];
                this.expiresAt = res.data!['tokenExpires'];

                this.saveToken(this.authToken, this.expiresAt);
                this.autoLogout();
            }
        }));
    }

    logout() {
        this.isLoggedIn = false;
        this.authToken = undefined;

        localStorage.removeItem('authToken');
        localStorage.removeItem('expiresAt');

        this.router.navigate(['/login']);
    }

    private autoLogout(): void {
        let dateFromStorage = localStorage.getItem('expiresAt');
        if (!dateFromStorage) return;

        const tokenExpires = new Date(dateFromStorage!);

        setTimeout(() => {
            this.logout();
            window.alert('Your session has expired');
        }, tokenExpires.getTime() - Date.now());

    }

    private autoLogin(): void {
        let authToken = localStorage.getItem('authToken');

        if (authToken) {
            this.isLoggedIn = true;
            this.authToken = authToken;
        }
    }

    private saveToken(token: string, expiresAt: string): void {
        localStorage.setItem('authToken', token);
        localStorage.setItem('expiresAt', expiresAt);

    }
}
