import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-article-meta',
    templateUrl: './article-meta.component.html',
    styleUrls: ['./article-meta.component.less'],
})
export class ArticleMetaComponent {
    @Input() article;

    constructor() {}
}
