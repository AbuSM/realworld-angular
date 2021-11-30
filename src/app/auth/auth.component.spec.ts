import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService, AuthService} from "../services";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {ActionsSubject, ReducerManager, ReducerManagerDispatcher, StateObservable, Store} from "@ngrx/store";
import {provideMockStore} from "@ngrx/store/testing";

class MockUserService {

}

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let authService: AuthService;

    const fakeActivatedRoute = {
        // snapshot: { data: { ... } }
    } as ActivatedRoute

    const initialState = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
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
                provideMockStore({initialState})
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        component = TestBed.inject(AuthComponent);
        authService = TestBed.inject(AuthService)
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have true default values after construction', () => {
        expect(component.isLoading).toBe(false);
        expect(component.authType).toBe('');
        expect(component.title).toBe('');
        expect(component.errors).toEqual({errors: {}});
    });
    it('should check whether user logged in or not after ngOnInit', () => {
        component.ngOnInit();
        expect(component.authType).toMatch(/login|register|/)
        expect(component.title).toMatch(/Sign in|Sign up/)
    })
});
