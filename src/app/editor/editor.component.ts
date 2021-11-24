import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleModel} from '../models';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticlesService} from '../services';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit, OnDestroy {
    article: ArticleModel = {} as ArticleModel;
    articleForm: FormGroup;
    tagField = new FormControl();
    errors: object = {};
    isLoading = false;
    submitType: 'create' | 'update' = 'create';
    subscription: Subscription = new Subscription();

    constructor(
        private articlesService: ArticlesService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.articleForm = this.fb.group({
            title: '',
            description: '',
            body: '',
            tagList: [],
        });

        this.article.tagList = [];
    }

    ngOnInit() {
        // TODO make data with url state instead of http requests
        const article = this.route.snapshot.data['article']
        if (article) {
            this.article = article.article;
            this.submitType = 'update';
            this.articleForm.patchValue(this.article);
        }

    }

    private errorHandler(err) {
        console.error(err);
        this.errors = err;
        this.isLoading = false;
    }


    onSubmit() {
        this.isLoading = true;
        if (this.submitType === 'create') {
            this.articleForm.patchValue(this.article);
            const data:ArticleModel = this.articleForm.value;
            this.subscription = this.articlesService.create(data).subscribe({
                next: ({article}) => this.router.navigateByUrl(`/post/${article.slug}`),
                error: this.errorHandler
            })
        } else {
            const data: ArticleModel = this.articleForm.value;
            this.subscription = this.articlesService.update(data, this.article.slug).subscribe({
                next: ({article}) => this.router.navigateByUrl(`/post/${article.slug}`),
                error: this.errorHandler
            })
        }
    }

    addTag() {
        const value: string = this.tagField.value.trim() as string;
        if (
            this.article.tagList.findIndex(
                (item: string) => item.toLowerCase() === value.toLowerCase()
            ) === -1
        ) {
            this.article.tagList.push(this.tagField.value);
            this.tagField.setValue('');
        }
    }

    removeTag(tag) {
        this.article.tagList.splice(this.article.tagList.indexOf(tag), 1);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
