import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { ApiService, ArticlesService, ProfileService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { article, user, profile } from './stubs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ArticleComponent', () => {
    let component: ArticleComponent;
    let fixture: ComponentFixture<ArticleComponent>;

    let actions$ = new Observable<Action>();
    let store: MockStore;
    const initialState = {
        auth: {
            isLogged: true,
            user,
        },
        profile: { profile },
        articles: {
            isLoading: true,
            articles: [],
        },
    };
    let routeStub = {
        snapshot: {
            data: {
                article: { article },
            },
        },
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ArticleComponent],
            providers: [
                ArticlesService,
                ApiService,
                ProfileService,
                { provide: ActivatedRoute, useValue: routeStub },
                { provide: Router, useValue: {} },
                provideMockStore({ initialState }),
                provideMockActions(() => actions$),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check default values', () => {
        expect(component.article).toEqual(
            routeStub.snapshot.data.article.article
        );
        expect(component.isLoading).toBeFalsy();
        expect(component.errors).toEqual({ errors: null });
        expect(component.isModalOpen).toBeFalsy();
        expect(component.comments).toBeUndefined();
    });

    it('check ngOnInit', (done: DoneFn) => {
        store.setState(initialState);
        component.ngOnInit();
        fixture.detectChanges();
        fixture.whenStable();
        store.refreshState();
        component.isLogged$.subscribe({
            next: (value) => {
                expect(value).toBeTruthy();
                done();
            },
            error: (err) => {
                done.fail(err);
            },
        });
        component.profile$.subscribe({
            next: (value) => {
                expect(value).toEqual({ profile });
                done();
            },
            error: (err) => done.fail(err),
        });
        component.canModify$.subscribe({
            next: (canModify) => {
                expect(canModify).toBeTruthy();
                done();
            },
            error: (err) => done.fail(err),
        });
    });

    describe('Test inner methods', () => {
        beforeEach((done: DoneFn) => {
            store.setState(initialState);
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable();
            store.refreshState();
            done();
        });
        it('check modal methods', () => {
            expect(component.isModalOpen).toBeFalsy();
            component.openModal();
            expect(component.isModalOpen).toBeTruthy();
            component.closeModal();
            expect(component.isModalOpen).toBeFalsy();
        });

        // TODO need to be completed. Faced with issue that `delete_button` found as `null`
        xit('check modal component', (done: DoneFn) => {
            expect(component.isModalOpen).toBeFalsy();
            component.canModify$.subscribe({
                next: (value) => {
                    debugger;
                    fixture.debugElement
                        .query(By.css('#delete_button'))
                        .nativeElement.click();
                    expect(component.isModalOpen).toBeTruthy();
                    const modalEl: DebugElement = fixture.debugElement.query(
                        By.css('app-modal')
                    );
                    const title = modalEl.query(By.css('div.modal-title'));
                    done();
                },
                error: (err) => done.fail(err),
            });
        });
    });
});
