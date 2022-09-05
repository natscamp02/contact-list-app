import { APIResponse } from './../models/api-response';
import { Contact } from './../models/contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private readonly API_URL: string = 'http://localhost:8080/api/v1/contacts/';

    constructor(private http: HttpClient) { }

    getAllContacts(): Observable<APIResponse<Contact[]>> {
        return this.http.get<APIResponse<Contact[]>>(this.API_URL);
    }

    getContactById(id: string): Observable<APIResponse<Contact>> {
        return this.http.get<APIResponse<Contact>>(this.API_URL + id);
    }

    createContact(contact: Contact): Observable<APIResponse<Contact>> {
        return this.http.post<APIResponse<Contact>>(this.API_URL, contact);
    }

    updateContact(contact: Contact): Observable<APIResponse<Contact>> {
        return this.http.put<APIResponse<Contact>>(this.API_URL + contact._id, contact);
    }

    deleteContact(contact: Contact): Observable<APIResponse> {
        return this.http.delete<APIResponse>(this.API_URL + contact._id);
    }
}
