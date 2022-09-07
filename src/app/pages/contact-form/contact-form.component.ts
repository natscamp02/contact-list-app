import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

    private id?: string;
    data = {
        first_name: '',
        last_name: '',
        email: '',
        contact_num: NaN,

        thumbnail: undefined as File | undefined
    }
    formData = new FormData();
    action: 'add' | 'edit' = 'add';

    constructor(private contactService: ContactsService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        if (this.id) {
            this.contactService.getContactById(this.id).subscribe(res => {
                if (res.status === 'success') {
                    this.data.first_name = res.data!['contact'].first_name!;
                    this.data.last_name = res.data!['contact'].last_name!;
                    this.data.email = res.data!['contact'].email!;
                    this.data.contact_num = res.data!['contact'].contact_num!;

                    this.action = 'edit';
                }
            })
        }
    }

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    onFileSelected(event: Event): void {
        console.log(`Event:`, event);
        console.log(`Event.target:`, event.target);
        console.log(`File input:`, this.fileInput);

        const file = this.fileInput.nativeElement?.files?.[0];
        if (!file) return;

        console.log(file);
        this.formData.append('thumbnail', file, file.name);
        this.data.thumbnail = file;

        // this.formData.entries()
    }

    // onSubmit(): void {
    //     if (this.action === 'add') {
    //         this.contactService.createContact(this.data as Contact).subscribe((res) => {
    //             if (res.status === 'success') {
    //                 this.router.navigate(['/contacts']);
    //             }
    //         })
    //     } else if (this.action === 'edit') {
    //         this.contactService.updateContact(this.id!, this.data as Contact).subscribe((res) => {
    //             if (res.status === 'success') {
    //                 this.router.navigate(['/contacts']);
    //             }
    //         })
    //     }
    // }
    onSubmit(): void {
        this.formData.append('first_name', this.data.first_name);
        this.formData.append('last_name', this.data.last_name);
        this.formData.append('email', this.data.email);
        this.formData.append('contact_num', this.data.contact_num + '');

        if (this.action === 'add') {
            this.contactService.createContact(this.formData).subscribe((res) => {
                if (res.status === 'success') {
                    this.router.navigate(['/contacts']);
                }
            })
        } else if (this.action === 'edit') {
            this.contactService.updateContact(this.id!, this.formData).subscribe((res) => {
                if (res.status === 'success') {
                    this.router.navigate(['/contacts']);
                }
            })
        }
    }
}
