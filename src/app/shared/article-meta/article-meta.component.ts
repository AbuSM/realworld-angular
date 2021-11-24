import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-article-meta',
    templateUrl: './article-meta.component.html',
    styleUrls: ['./article-meta.component.less'],
})
export class ArticleMetaComponent implements OnInit {
    @Input() article;

    constructor() {}

    ngOnInit(): void {}
}
