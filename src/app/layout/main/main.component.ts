import { Component, OnInit } from '@angular/core';
import { ArticlesService, TagsService } from '../../services';
import {Observable, startWith} from 'rxjs';
import { ArticleModel } from '../../models';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
    tags$: Observable<{ tags: Array<string> }>;
    posts$: Observable<{ articles: ArticleModel[] }>;
    isLogged: boolean = true;
    activeTab: number = 1;

    constructor(
        private tagsService: TagsService,
        private articleService: ArticlesService
    ) {}

    ngOnInit() {
        this.tags$ = this.tagsService.fetchAll().pipe(startWith({tags: []}));
        this.posts$ = this.articleService.query().pipe(startWith({articles: []}));
    }
}
