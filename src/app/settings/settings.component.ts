import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout, updateUser } from '../auth/+store/auth.actions';
import { getUserData } from '../auth/+store/auth.selector';
import { Observable, startWith, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less'],
})
export class SettingsComponent implements OnInit, OnDestroy {
    user$: Observable<object>;
    subscriptions: Subscription[] = [];
    settingsForm: FormGroup;
    errors = {};

    constructor(
        private router: Router,
        private store: Store,
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.settingsForm = this.fb.group({
            email: '',
            username: '',
            bio: '',
            image: '',
            password: '',
        });
    }

    ngOnInit() {
        this.subscriptions.push(
            this.store
                .select(getUserData)
                .pipe(startWith({}))
                .subscribe({
                    next: (user) => this.settingsForm.patchValue(user),
                })
        );
    }

    onSubmit() {
        const user = this.settingsForm.value;
        this.subscriptions.push(
            this.authService.updateUser(user).subscribe({
                next: (data) => this.store.dispatch(updateUser(data)),
            })
        );
    }

    logout() {
        this.store.dispatch(logout());
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }
}
