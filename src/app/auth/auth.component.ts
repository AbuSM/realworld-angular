import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthModel } from '../models';
import { AuthService } from '../services';

@Component({
    selector: 'app-login',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.less'],
})
export class AuthComponent implements OnInit, OnDestroy {
    authType: string = '';
    title: string = '';
    errors = {};
    isLoading = false;
    authForm: FormGroup;
    subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
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
        this.isLoading = true;
        const credentials: AuthModel = this.authForm.value;
        this.subscriptions.push(
            this.authService.authUser(this.authType, credentials).subscribe(
                () => this.router.navigateByUrl('/'),
                (err) => {
                    this.errors = err;
                    this.isLoading = false;
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
