import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getIsLogged } from '../../auth/+store/auth.selector';
import { AuthState } from '../../auth/+store/auth.state';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
    isLogged$: Observable<boolean>;
    constructor(private store: Store<AuthState>) {
        this.isLogged$ = this.store.select(getIsLogged);
    }
}
