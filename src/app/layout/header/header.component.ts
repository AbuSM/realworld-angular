import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserData } from '../../auth/+store/auth.selector';
import { AuthState } from '../../auth/+store/auth.state';
import { ProfileFullModel } from '../../models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
    userState$: Observable<ProfileFullModel>;
    constructor(private store: Store<AuthState>) {
        this.userState$ = this.store.select(getUserData);
    }
}
