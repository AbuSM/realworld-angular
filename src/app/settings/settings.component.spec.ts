import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { Router } from '@angular/router';
import { ApiService, AuthService } from '../services';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActionsSubject, StateObservable, Store } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { CommonModule } from '@angular/common';
import { user as userStub } from '../stubs';

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;
    let authService: AuthService;
    let storeSpy = jasmine.createSpyObj('Store', ['getUserData']);
    let store: MockStore;

    class RouterStub {
        navigateByUrl(url: string) {
            return url;
        }
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [SettingsComponent],
            providers: [
                SettingsComponent,
                SharedModule,
                CommonModule,
                ReactiveFormsModule,
                FormBuilder,
                Store,
                StateObservable,
                ActionsSubject,
                provideMockStore({}),
                AuthService,
                ApiService,
                { provide: Router, useClass: RouterStub },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('check with marble tests', (done: DoneFn) => {
        const userData = {
            isLogged: true,
            isLoading: false,
            ...userStub,
        };
        const user = {
            email: userStub.email,
            username: userStub.username,
            bio: userStub.bio,
            image: userStub.image,
            password: '',
        };
        storeSpy.getUserData.and.returnValue(
            hot('--a|', {
                a: userData,
            })
        );

        fixture.detectChanges();

        component.ngOnInit();
        fixture.detectChanges();
        fixture.whenStable();
        expect(component.settingsForm.value).toEqual(user);
        done();
    });
});
