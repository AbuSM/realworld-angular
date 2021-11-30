import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services";

class MockUserService {

}

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let authService: AuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        TestBed.configureTestingModule({
            providers: [
                AuthComponent,
                {provide: ActivatedRoute},
                {provide: Router},
                {provide: AuthService, useClass: MockUserService}
            ]
        })
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
        expect(component.errors).toBe({errors: {}});
    });
    it('should check whether user logged in or not afte ngOnInit', () => {
        component.ngOnInit();
        expect(component.authType).toMatch(/login|register/)
        expect(component.title).toMatch(/Sign in|Sign up/)
    })
});
