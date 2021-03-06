import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthModel, ErrorsModel } from '../models';
import { AuthService } from '../services';
import { authorize } from './+store/auth.actions';
import { Store } from '@ngrx/store';
import { getAuthData } from './+store/auth.selector';

@Component({
    selector: 'app-login',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.less'],
})
export class AuthComponent implements OnInit, OnDestroy {
    authType: string = '';
    title: string = '';
    errors: ErrorsModel = { errors: {} };
    isLoading = false;
    authForm: FormGroup;
    subscriptions: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder,
        private store: Store<{ auth: boolean }>
    ) {
        this.authForm = this.fb.group({
            email: [
                '',
                Validators.compose([Validators.email, Validators.required]),
            ],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.route.url.subscribe((data) => {
                this.authType = data[data.length - 1].path;
                this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
                if (this.authType === 'register') {
                    this.authForm.addControl(
                        'username',
                        new FormControl('', [Validators.required])
                    );
                }
            })
        );
    }

    onSubmit() {
        this.errors = { errors: {} };
        this.isLoading = true;
        const credentials: AuthModel = this.authForm.value;
        this.store.dispatch(
            authorize({ loginType: this.authType, credentials })
        );
        this.subscriptions.add(
            this.store.select(getAuthData).subscribe({
                next: (state) => {
                    this.errors = state.error;
                    this.isLoading = state.isLoading;
                },
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
