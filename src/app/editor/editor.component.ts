import { Component } from '@angular/core';
import { ArticleModel } from '../models';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.less'],
})
export class EditorComponent {
    article: ArticleModel = {} as ArticleModel;
    articleForm: FormGroup;
    tagField = new FormControl();
    errors: object = {};
    isLoading = false;

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
            tagList: []
        });

        this.article.tagList = [];
    }

    onSubmit() {
        this.isLoading = true;
        this.articleForm.patchValue(this.article)
        const data = this.articleForm.value;
        this.articlesService.create(data).subscribe({
            next: (article) => this.router.navigateByUrl('/'),
            error: (err) => {
                console.error(err);
                this.errors = err;
                this.isLoading = false;
            },
        });
    }

    addTag() {
        const value: string = this.tagField.value.trim() as string;
        if (this.article.tagList.findIndex((item: string) => item.toLowerCase() === value.toLowerCase()) === -1) {
            this.article.tagList.push(this.tagField.value)
            this.tagField.setValue('')
        }
    }

    removeTag(tag) {
        this.article.tagList.splice(this.article.tagList.indexOf(tag), 1)
    }

    updateArticle(values: Object) {}
}
