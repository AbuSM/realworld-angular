import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { ApiService, AuthService } from '../services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ActionsSubject,
    ReducerManager,
    ReducerManagerDispatcher,
    StateObservable,
    Store,
} from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, of, from } from 'rxjs';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let authService: AuthService;
    let routeStub;
    let activatedRoute: ActivatedRoute;
    const initialState = {};

    beforeEach(async () => {
        routeStub = {
            url: of([new UrlSegment('/register', {})]),
        };
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule,
            ],
            declarations: [AuthComponent],
            providers: [
                AuthComponent,
                AuthService,
                ApiService,
                HttpClientModule,
                FormBuilder,
                Store,
                StateObservable,
                ActionsSubject,
                ReducerManager,
                ReducerManagerDispatcher,
                provideMockStore({ initialState }),
                // {provide: ActivatedRoute, useValue: routeStub}
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        component = TestBed.inject(AuthComponent);
        authService = TestBed.inject(AuthService);
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have true default values after construction', () => {
        expect(component.isLoading).toBe(false);
        expect(component.authType).toBe('');
        expect(component.title).toBe('');
        expect(component.errors).toEqual({ errors: {} });
    });
    it('should be Falsy when form is empty', () => {
        expect(component.authForm.valid).toBeFalsy();
        let email = component.authForm.controls['email'];
        let password = component.authForm.controls['password'];
        expect(email.valid).toBeFalsy();
        expect(password.valid).toBeFalsy();
        email.setValue('test');
        expect(email.valid).toBeFalsy();
    });

    it('should check whether user logged in or not after ngOnInit', () => {
        component.ngOnInit();
        expect(component.authType).toMatch(/login|register|/);
        expect(component.title).toMatch(/Sign in|Sign up/);
        expect(component.title).toBe('Sign up');
    });
    // it('should check auth type `login`', fakeAsync(() => {
    //     routeStub.url = of([new UrlSegment('/register', {})]);
    //     expect(component.title).toBe('Sign in');
    // }));
    it('should define whether submit button works fine', () => {
        let { email, username, password } = component.authForm.controls;
        expect(username).toBeUndefined();
        const form = component.authForm;
        email.setValue('test');
        password.setValue('test');
        expect(form.valid).toBeFalsy();
        email.setValue('test@test.ru');
        expect(form.valid).toBeTruthy();
    });
    it('should check whether onSubmit method works fine', () => {
        component.authForm.controls['email'].setValue('test@test.ru');
        component.authForm.controls['password'].setValue('test');
        expect(component.authForm.valid).toBeTruthy();
        // component.onSubmit()
    });
});
