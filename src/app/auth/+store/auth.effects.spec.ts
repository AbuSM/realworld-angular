import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { AUTHORIZE_REQUEST } from './auth.actions';
import { AuthService } from '../../services';
import { UserCredentialsModel } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

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
        actions$ = of({
            type: AUTHORIZE_REQUEST,
            loginType: 'login',
            credentials: user,
        });
        authService.authUser.and.returnValue(of({ user }));
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
            type: AUTHORIZE_REQUEST,
            loginType: 'login',
            credentials: user,
        });
        authService.authUser.and.returnValue(throwError(() => errorResponse));
        effects.auth$.subscribe();
        expect(authService.authUser).toHaveBeenCalledWith('login', user);
        expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
        done();
    });
});
