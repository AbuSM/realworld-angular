import { Component, OnInit } from '@angular/core';
import { ArticlesService, TagsService } from '../../services';
import { Observable } from 'rxjs';
import { ArticleModel } from '../../models';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
    posts = [
        {
            title: 'test',
            description: 'asasa',
            likesCount: 2,
            username: 'Fattoh',
            date: 'November 16, 2021',
        },
        {
            title: 'test2',
            description: 'new post 2',
            username: 'Anton',
        },
    ];
    tags$: Observable<{ tags: Array<string> }>;
    posts$: Observable<{ articles: ArticleModel[] }>;
    isLogged: boolean = true;
    activeTab: number = 1;

    constructor(
        private tagsService: TagsService,
        private articleService: ArticlesService
    ) {}

    ngOnInit() {
        this.tags$ = this.tagsService.fetchAll();
        this.posts$ = this.articleService.query();
    }
}
