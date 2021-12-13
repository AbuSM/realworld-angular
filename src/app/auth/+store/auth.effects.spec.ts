import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthEffects } from './auth.effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services';
import { UserCredentialsModel, UserModel } from '../../models';
import { TestScheduler } from 'rxjs/testing';

describe('AuthEffects', () => {
    let actions$ = new Observable<Action>();
    let effects: AuthEffects;
    let authService: jasmine.SpyObj<AuthService>;
    let routerSpy: Router;

    beforeEach(() => {
        const _spy = jasmine.createSpyObj(AuthService, [
            'authUser',
            'updateUser',
            'checkUser',
        ]);
        const _routerSpy = jasmine.createSpyObj(Router, ['navigateByUrl']);

        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            providers: [
                AuthEffects,
                { provide: AuthService, useValue: _spy },
                { provide: Router, useValue: _routerSpy },
                provideMockActions(() => actions$),
            ],
        });

        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        authService = TestBed.inject(
            AuthService
        ) as jasmine.SpyObj<AuthService>;
        effects = TestBed.inject(AuthEffects);
    });

    it('check auth effect success operation', (done: DoneFn) => {
        const user = {
            email: 'test@test.ru',
            password: 'test',
        } as UserCredentialsModel;
        const userResponse = {
            email: user.email,
            username: 'test3',
        } as UserModel;
        actions$ = of({
            type: AuthActions.AUTHORIZE_REQUEST,
            loginType: 'login',
            credentials: user,
        });
        authService.authUser.and.returnValue(of({ user: userResponse }));
        effects.auth$.subscribe();
        expect(authService.authUser).toHaveBeenCalledWith('login', user);
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
        done();
    });

    it('check auth effect failure operation', (done: DoneFn) => {
        const user = {} as UserCredentialsModel;
        const errorResponse = new HttpErrorResponse({
            error: { errors: { 'email or password': ['is invalid'] } },
            status: 403,
            statusText: 'Forbidden',
        });
        actions$ = of({
            type: AuthActions.AUTHORIZE_REQUEST,
            loginType: 'login',
            credentials: user,
        });
        authService.authUser.and.returnValue(throwError(() => errorResponse));
        effects.auth$.subscribe();
        expect(authService.authUser).toHaveBeenCalledWith('login', user);
        expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
        done();
    });

    describe('AuthEffects with marble testing', () => {
        let testScheduler: TestScheduler;
        beforeEach(() => {
            testScheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });
        });
        const user = {
            username: 'test3',
            bio: '',
        } as UserModel;
        xit('check checkAuth effect', () => {
            testScheduler.run(({ cold, hot, expectObservable }) => {
                authService.checkUser.and.returnValue(
                    hot('a|', { a: { user } })
                );

                expectObservable(effects.checkAuth$).toBe('a-', {
                    a: {
                        type: AuthActions.checkAccess,
                        user,
                    },
                });
            });
        });
    });
});
