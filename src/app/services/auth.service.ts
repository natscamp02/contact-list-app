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

    user: any;

    constructor(private http: HttpClient, private router: Router) {
        this.autoLogin();
    }

    login(data: any): Observable<APIResponse<User & string>> {
        return this.http.post<APIResponse>(this.API_URL + '/login', data).pipe(tap((res) => {
            if (res.status === 'success') {
                this.isLoggedIn = true;
                this.authToken = res.data!['token'];
                this.saveUser(res.data!['user'])
                this.saveToken(this.authToken);
            }
        }));
    }

    signup(data: any): Observable<APIResponse<User & string>> {
        return this.http.post<APIResponse>(this.API_URL + '/signup', data).pipe(tap((res) => {
            if (res.status === 'success') {
                this.isLoggedIn = true;
                this.authToken = res.data!['token'];
                this.saveToken(this.authToken);
            }
        }));
    }

    logout() {
        this.isLoggedIn = false;
        this.authToken = undefined;

        localStorage.removeItem('authToken');

        this.router.navigate(['/login']);
    }

    private autoLogin(): void {
        let authToken = localStorage.getItem('authToken');

        console.log(JSON.parse(localStorage.getItem('userInfo')!));

        if (authToken) {
            this.isLoggedIn = true;
            this.authToken = authToken;
        }
    }

    private saveToken(token: string): void {
        localStorage.setItem('authToken', token);

    }
    private saveUser(user: User): void {
        localStorage.setItem('userInfo', JSON.stringify(user));
    }
}
