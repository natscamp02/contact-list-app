import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

    data = {
        _id: undefined,
        first_name: '',
        last_name: '',
        email: '',
        contact_num: NaN
    }
    action: 'add' | 'edit' = 'add';

    constructor(private contactService: ContactsService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        let id = this.route.snapshot.params['id'];

        if (id) {
            this.contactService.getContactById(id).subscribe(res => {
                if (res.status === 'success') {
                    this.data._id = id;
                    this.data.first_name = res.data!['contact'].first_name!;
                    this.data.last_name = res.data!['contact'].last_name!;
                    this.data.email = res.data!['contact'].email!;
                    this.data.contact_num = res.data!['contact'].contact_num!;

                    this.action = 'edit';
                }
            })
        }
    }

    onSubmit(): void {
        if (this.action === 'add') {
            this.contactService.createContact(this.data).subscribe((res) => {
                if (res.status === 'success') {
                    this.router.navigate(['/contacts']);
                }
            })
        } else if (this.action === 'edit') {
            this.contactService.updateContact(this.data).subscribe((res) => {
                if (res.status === 'success') {
                    this.router.navigate(['/contacts']);
                }
            })
        }
    }
}
