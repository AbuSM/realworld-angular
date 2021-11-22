import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {authorize, authorizeFailure, authorizeSuccess, checkAccess, logout} from './auth.actions';
import {exhaustMap, map, of, catchError, tap} from "rxjs";
import {AuthService} from "../../services";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store,
        private router: Router
    ) {
    }

    auth$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authorize),
            exhaustMap((action) => {
                return this.authService.authUser(action.loginType, action.credentials).pipe(
                    map((data) => {
                        this.router.navigateByUrl('/');
                        return authorizeSuccess();
                    }),
                    catchError((error: any) => {
                        const value = authorizeFailure(error)
                        return of(value)
                    })
                )
            })
        )
    })

    checkAuth$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(checkAccess),
            exhaustMap((action) => {
                return this.authService.checkUser().pipe(
                    map(() => authorizeSuccess()),
                    catchError(error => {
                        this.store.dispatch(logout());
                        this.router.navigateByUrl('/');
                        return of(authorizeFailure(error))
                    })
                )
            })
        )
    })

    logout$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(logout),
                map(() => {
                    this.authService.logout();
                    this.router.navigateByUrl('/');
                })
            )
        }, {dispatch: false}
    )
}
