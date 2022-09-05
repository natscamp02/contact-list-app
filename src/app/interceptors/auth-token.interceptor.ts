import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.authService.authToken) {
            const clonedRequest = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + this.authService.authToken)
            });

            return next.handle(clonedRequest);
        }

        return next.handle(request);
    }
}
