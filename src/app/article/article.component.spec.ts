import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { ApiService, ArticlesService, ProfileService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ArticleEffects } from './+store/article.effects';
import { article, user, profile } from './stubs';

describe('ArticleComponent', () => {
    let component: ArticleComponent;
    let fixture: ComponentFixture<ArticleComponent>;

    let actions$ = new Observable<Action>();
    let effects$: ArticleEffects;
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
});
