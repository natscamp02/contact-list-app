import { Contact } from './../../models/contact';
import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
    contacts: Contact[] = [];

    constructor(private contactService: ContactsService, private authService: AuthService) { }

    ngOnInit(): void {
        this.getAllContacts();
    }

    getAllContacts() {
        this.contactService.getAllContacts().subscribe((res) => {
            if (res.status === 'success') {
                this.contacts = res.data!['contacts'];
                console.log(this.contacts);
            }
        })
    }

    deleteOneContact(contact: Contact) {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            this.contactService.deleteContact(contact).subscribe((res) => {
                if (res === null) {
                    this.getAllContacts();
                }
            })
        }
    }

    logout() {
        this.authService.logout();
    }
}
