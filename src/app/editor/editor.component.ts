import { Component } from '@angular/core';
import { PostModel } from '../models';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.less'],
})
export class EditorComponent {
    article: PostModel = {} as PostModel;
    articleForm: FormGroup;
    tagField = new FormControl();
    errors: Object = {};
    isSubmitting = false;

    constructor(
        // private articlesService: ArticlesService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {}

    addTag() {}

    removeTag(tagName: string) {}

    onSubmit() {}

    updateArticle(values: Object) {}
}
