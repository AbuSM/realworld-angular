import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, takeLast } from 'rxjs';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { getIsLogged } from '../auth/+store/auth.selector';
import { AuthState } from '../auth/+store/auth.state';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private store: Store<AuthState>) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.store.select(getIsLogged);
    }
}
