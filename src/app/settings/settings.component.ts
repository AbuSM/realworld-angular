import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../auth/+store/auth.actions';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less'],
})
export class SettingsComponent {
    constructor(private router: Router, private store: Store) {}

    logout() {
        this.store.dispatch(logout());
    }
}
