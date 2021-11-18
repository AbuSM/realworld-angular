import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthModel } from '../models/auth.model';
import { AuthService } from '../services';

@Component({
    selector: 'app-login',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.less'],
})
export class AuthComponent implements OnInit, OnDestroy {
    authType: String = '';
    title: String = '';
    // errors: Errors = {errors: {}};
    isSubmitting = false;
    authForm: FormGroup;
    subscriptions: Subscription[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.route.url.subscribe((data) => {
                this.authType = data[data.length - 1].path;
                this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
                if (this.authType === 'register') {
                    this.authForm.addControl('username', new FormControl());
                }
            })
        );
    }

    onSubmit() {
        const credentials: AuthModel = this.authForm.value;
        this.subscriptions.push(
            this.authService.authUser(this.authType, credentials).subscribe(
                (data) => this.router.navigateByUrl('/'),
                (err) => {
                    // this.errors = err;
                    this.isSubmitting = false;
                }
            )
        );
    }

    ngOnDestroy(): void {
        for (let subs of this.subscriptions) {
            subs.unsubscribe();
        }
    }
}
