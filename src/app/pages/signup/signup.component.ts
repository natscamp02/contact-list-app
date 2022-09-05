import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    data = {
        username: '',
        password: '',
        role: 'user'
    }

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.authService.signup(this.data).subscribe((res) => {
            if (res.status === 'success') {
                this.router.navigate(['/contacts']);
            }
        })
    }

}
