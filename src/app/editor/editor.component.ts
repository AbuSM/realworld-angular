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
        });

        this.article.tagList = [];
    }

    onSubmit() {
        this.isLoading = true;
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

    updateArticle(values: Object) {}
}
