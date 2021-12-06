import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleModel } from '../models';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
})
export class EditorComponent implements OnInit, OnDestroy {
    article: ArticleModel = {} as ArticleModel;
    articleForm: FormGroup;
    tagField = new FormControl();
    errors: object = {};
    isLoading = false;
    submitType: 'create' | 'update' = 'create';
    subscriptions: Subscription = new Subscription();

    constructor(
        private articlesService: ArticlesService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.articleForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            body: '',
            tagList: [],
        });
        this.article.tagList = [];
    }

    ngOnInit() {
        // TODO make data with url state instead of http requests
        const article = this.route.snapshot.data['article'];
        if (article) {
            this.article = article.article;
            this.submitType = 'update';
            this.articleForm.patchValue(this.article);
        }
    }

    private errorHandler(err) {
        console.error('Error: ', err);
        this.errors = err;
        this.isLoading = false;
    }

    addTag() {
        const value: string = String(this.tagField.value).trim();
        if (
            this.article.tagList.findIndex(
                (item: string) => item.toLowerCase() === value.toLowerCase()
            ) === -1
        ) {
            this.article.tagList.push(value);
            this.tagField.setValue('');
        }
    }

    removeTag(tag: string) {
        this.article.tagList.splice(this.article.tagList.indexOf(tag), 1);
    }

    onSubmit() {
        this.isLoading = true;
        if (this.submitType === 'create') {
            this.articleForm.patchValue(this.article);
            const data: ArticleModel = this.articleForm.value;
            this.subscriptions.add(
                this.articlesService.create(data).subscribe({
                    next: ({ article }) => {
                        this.router.navigateByUrl(`/post/${article.slug}`);
                    },
                    error: (err) => this.errorHandler(err),
                })
            );
        } else {
            const data: ArticleModel = this.articleForm.value;
            this.subscriptions.add(
                this.articlesService.update(data, this.article.slug).subscribe({
                    next: ({ article }) =>
                        this.router.navigateByUrl(`/post/${article.slug}`),
                    error: (err) => this.errorHandler(err),
                })
            );
        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
