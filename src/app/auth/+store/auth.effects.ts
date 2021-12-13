import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    authorize,
    authorizeFailure,
    authorizeSuccess,
    checkAccess,
    logout,
    updateUser,
} from './auth.actions';
import { exhaustMap, map, of, catchError, tap, switchMap } from 'rxjs';
import { AuthService } from '../../services';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProfileModel } from '../../models';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store,
        private router: Router
    ) {}

    auth$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authorize),
            exhaustMap((action) => {
                return this.authService
                    .authUser(action.loginType, action.credentials)
                    .pipe(
                        map(({ user }) => {
                            this.router.navigateByUrl('/');
                            return authorizeSuccess({ user });
                        }),
                        catchError((error: any) => {
                            return of(authorizeFailure({ error }));
                        })
                    );
            })
        );
    });

    checkAuth$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(checkAccess),
            exhaustMap(() => {
                return this.authService.checkUser().pipe(
                    map(({ user }) => authorizeSuccess({ user })),
                    catchError((error) => {
                        this.store.dispatch(logout());
                        this.router.navigateByUrl('/');
                        return of(authorizeFailure({ error }));
                    })
                );
            })
        );
    });

    logout$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(logout),
                map(() => {
                    this.authService.logout();
                    this.router.navigateByUrl('/');
                })
            );
        },
        { dispatch: false }
    );

    updateUser$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(updateUser),
                map(({ user }: { user: ProfileModel }) => {
                    this.router.navigateByUrl(`/@${user.username}`);
                })
            );
        },
        { dispatch: false }
    );
}
