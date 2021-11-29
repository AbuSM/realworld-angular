import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkAccess } from './auth/+store/auth.actions';
import { getItem } from './utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
    title = 'realworld-angular';

    constructor(private store: Store) {}

    ngOnInit() {
        const token = getItem();
        if (token) {
            this.store.dispatch(checkAccess());
        }
    }
}
