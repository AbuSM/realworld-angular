import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, takeLast, map, Observable } from 'rxjs';

@Injectable()
export class NoAuthService implements CanActivate {
    constructor(
        private store: Store<{ auth: boolean }>,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.store.select('auth').pipe(
            map((isLogged) => {
                if (isLogged) {
                    this.router.navigateByUrl('/');
                }
                return !isLogged;
            })
        );
    }
}
