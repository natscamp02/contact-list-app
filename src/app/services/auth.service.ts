import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL: string = 'http://localhost:8080/api/v1/users';

    constructor(private http: HttpClient) { }
}
