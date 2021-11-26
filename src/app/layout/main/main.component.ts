import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, startWith } from 'rxjs';
import { getAllArticles } from "../../article/+store/article.selectors";
import { ArticlesService, TagsService } from '../../services';
import { ArticleModel } from '../../models';
import { fetchAllArticles } from "../../article/+store/article.actions";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
    tags$: Observable<{ tags: string[] }>;
    posts$: Observable<{articles: ArticleModel[], isLoading: boolean}>;
    isLogged: boolean = true;

    constructor(
        private tagsService: TagsService,
        private articleService: ArticlesService,
        private store: Store
    ) {
    }

    ngOnInit() {
        this.store.dispatch(fetchAllArticles())
        this.tags$ = this.tagsService.fetchAll().pipe(startWith({ tags: [] }));
        this.posts$ = this.store.select(getAllArticles)
    }
}
