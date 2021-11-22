import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
    isLogged$: Observable<boolean>;
    constructor(private store: Store<{ auth: boolean }>) {
        this.isLogged$ = store.select('auth');
    }
}
