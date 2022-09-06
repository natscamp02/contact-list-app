import { APIResponse } from './../models/api-response';
import { Contact } from './../models/contact';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private readonly API_URL: string = 'http://localhost:8080/api/v1/contacts/';

    constructor(private http: HttpClient, private authService: AuthService) { }

    _handleHTTPError = (res: HttpErrorResponse): Observable<APIResponse> => {
        if (res.error.error?.name === 'TokenExpiredError') {
            window.alert('Your session has expired');
            this.authService.logout();
        }

        return of(res.error);
    }

    uploadThumbnail(id: string, formData: FormData): Observable<APIResponse> {
        return this.http.post<APIResponse>(this.API_URL + id + '/thumbnail', formData);
    }

    getAllContacts(): Observable<APIResponse<Contact[]>> {
        return this.http.get<APIResponse<Contact[]>>(this.API_URL).pipe(catchError(this._handleHTTPError));
    }

    getContactById(id: string): Observable<APIResponse<Contact>> {
        return this.http.get<APIResponse<Contact>>(this.API_URL + id).pipe(catchError(this._handleHTTPError));
    }

    createContact(contact: Contact): Observable<APIResponse<Contact>> {
        return this.http.post<APIResponse<Contact>>(this.API_URL, contact).pipe(catchError(this._handleHTTPError));
    }

    updateContact(contact: Contact): Observable<APIResponse<Contact>> {
        return this.http.put<APIResponse<Contact>>(this.API_URL + contact._id, contact).pipe(catchError(this._handleHTTPError));
    }

    deleteContact(contact: Contact): Observable<APIResponse> {
        return this.http.delete<APIResponse>(this.API_URL + contact._id).pipe(catchError(this._handleHTTPError));
    }
}
