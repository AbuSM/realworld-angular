import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, startWith } from 'rxjs';
import { getAllArticles } from '../article/+store/article.selectors';
import { ArticlesService, TagsService } from '../services';
import {
    fetchAllArticles,
    fetchFeedArticles,
} from '../article/+store/article.actions';
import { ArticleModel } from '../models';
import { getIsLogged } from '../auth/+store/auth.selector';

const ALL_ARTICLES_TAB = 1;

@Component({
    selector: 'app-main',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
    tags$: Observable<{ tags: string[] }>;
    articles$: Observable<ReturnType<typeof getAllArticles>>;
    isLogged$: Observable<boolean>;

    constructor(
        private tagsService: TagsService,
        private articleService: ArticlesService,
        private store: Store
    ) {}

    ngOnInit() {
        this.tags$ = this.tagsService.fetchAll().pipe(startWith({ tags: [] }));
        this.articles$ = this.store.select(getAllArticles);
        this.isLogged$ = this.store.select(getIsLogged);
    }

    onTabChange(activeTab: string | number) {
        if (Number(activeTab) === ALL_ARTICLES_TAB) {
            this.store.dispatch(fetchAllArticles({ noToken: true }));
        } else {
            this.store.dispatch(fetchFeedArticles());
        }
    }

    trackArticle(index: number, articleRow: ArticleModel) {
        return articleRow.slug;
    }
}
