import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private store: Store<{ auth: boolean }>,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.store.select('auth').pipe(
            map((isLogged) => {
                if (!isLogged) {
                    this.router.navigateByUrl('/');
                }
                return isLogged;
            })
        );
    }
}
