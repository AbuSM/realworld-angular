import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { ApiService, ArticlesService } from '../services';
import { ArticleModel } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { SharedModule } from '../shared';
import { LayoutModule } from '../layout/layout.module';

describe('EditorComponent', () => {
    let component: EditorComponent;
    let fixture: ComponentFixture<EditorComponent>;
    let articleService: ArticlesService;
    let httpTestingController: HttpTestingController;
    let routeStub = {
        snapshot: { data: { article: null } },
    };
    let router: Router;
    const baseUrl = 'http://localhost:3000/api/';

    class RouterStub {
        navigateByUrl(url: string) {
            return url;
        }
    }

    const article = {
        author: {
            bio: null,
            image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
            username: 'test3',
        },
        body: 'asdasdasd',
        createdAt: '2021-12-03T09:29:01.790Z',
        description: 'asdasd',
        favorited: false,
        favoritesCount: 0,
        slug: 'sad-4',
        tagList: [],
        title: 'sad',
        updatedAt: '2021-12-03T09:29:01.811Z',
    } as ArticleModel;

    const checkDefaultValues = () => {
        expect(component.article).toEqual({ tagList: [] } as ArticleModel);
        expect(component.articleForm.valid).toBeFalsy();
        expect(component.isLoading).toBeFalsy();
        expect(component.submitType).toBe('create');
        expect(component.errors).toEqual({});
        expect(component.tagField.value).toBeNull();
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ReactiveFormsModule,
                SharedModule,
                LayoutModule,
            ],
            declarations: [EditorComponent],
            providers: [
                ArticlesService,
                ApiService,
                { provide: ActivatedRoute, useValue: routeStub },
                { provide: Router, useClass: RouterStub },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditorComponent);
        articleService = TestBed.inject(ArticlesService);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.submitType).toMatch(/create|update/);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('default values should be empty', () => {
        checkDefaultValues();
    });

    it('check `create` submitType', () => {
        component.ngOnInit();
        fixture.detectChanges();
        checkDefaultValues();
    });

    it('addTag method should work fine', () => {
        component.ngOnInit();
        component.tagField.setValue('test');
        component.addTag();
        fixture.detectChanges();
        expect(component.article.tagList.includes('test')).toBeTruthy();
        const tagSpan: HTMLSpanElement = fixture.debugElement.query(
            By.css('div.tag-list > span')
        ).nativeElement;
        const text = tagSpan.innerText;
        expect(text).toBe('test');

        component.tagField.setValue('test1');
        component.addTag();
        fixture.detectChanges();
        expect(component.article.tagList.includes('test')).toBeTruthy();
        expect(component.article.tagList.includes('test1')).toBeTruthy();
        const tagList: DebugElement[] = fixture.debugElement.queryAll(
            By.css('div.tag-list > span')
        );
        const values = ['test', 'test1'];
        tagList.forEach((debugEl, index) => {
            const el = debugEl.nativeElement as HTMLSpanElement;
            expect(el.textContent.trim()).toEqual(values[index]);
        });
    });

    it('check `removeTag` method', () => {
        component.ngOnInit();
        component.tagField.setValue('test');
        component.addTag();
        fixture.detectChanges();
        component.removeTag('test');
        fixture.detectChanges();
        expect(component.article.tagList.length).toBe(0);
        const tagEl = fixture.debugElement.query(By.css('div.tag-list > span'));
        expect(tagEl).toBeNull();
    });

    it('check `update` submitType', () => {
        routeStub.snapshot.data = { article: { article } };
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.submitType).toEqual('update');
        expect(component.article).toEqual(article);
        routeStub.snapshot.data = { article: null };
        fixture.detectChanges();
    });

    it('check `onSubmit` method success operation', () => {
        spyOn(articleService, 'create').and.returnValue(
            of({ article: article })
        );
        const routerSpy = spyOn(router, 'navigateByUrl');
        component.ngOnInit();
        const controls = component.articleForm.controls;
        controls['title'].setValue('test');
        controls['body'].setValue('test body');
        fixture.detectChanges();
        expect(component.articleForm.valid).toBeFalsy();
        component.onSubmit();
        fixture.detectChanges();
        const navArgs = routerSpy.calls.first().args[0];
        expect(navArgs).toBe(`/post/${article.slug}`);
    });

    it('check `onSubmit` method failure operation', () => {
        component.articleForm.patchValue(article);
        component.articleForm.controls['description'].reset('');
        component.onSubmit();
        fixture.detectChanges();
        const req = httpTestingController.expectOne(`${baseUrl}articles`);
        const msg = { errors: { description: ["can't be blank"] } };
        req.flush(msg, { status: 422, statusText: 'Unprocessable entity' });
        expect(component.errors).toEqual(msg);
        fixture.detectChanges();
        const liEl: HTMLLIElement = fixture.debugElement.query(
            By.css('app-errors-list > ul > li:first-child')
        ).nativeElement;
        expect(liEl.innerText.trim()).toEqual(
            `description ${msg.errors.description[0]}`
        );
    });

    afterEach(() => {
        component.ngOnDestroy();
        fixture.detectChanges();
        fixture.destroy();
    });
});
