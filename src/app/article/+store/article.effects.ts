import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    fetchAllArticles,
    fetchAllArticlesSuccess,
    fetchAllArticlesFailure,
    onToggleFavorite,
    onToggleFavoriteFailure,
    onToggleFavoriteSuccess,
    fetchFeedArticles,
    fetchArticles,
    fetchArticlesSuccess,
    fetchArticlesFailure,
} from './article.actions';
import { exhaustMap, map, of, iif, catchError, withLatestFrom } from 'rxjs';
import { ArticlesService } from '../../services';
import { getIsLogged } from '../../auth/+store/auth.selector';

@Injectable()
export class ArticleEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private articlesService: ArticlesService
    ) {}

    onFetch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchArticles),
            withLatestFrom(this.store.select(getIsLogged)),
            exhaustMap((action) => {
                const { config } = action[0];
                return this.articlesService.query(config);
            }),
            map(({ articles }) => fetchArticlesSuccess({ articles })),
            catchError((err) => of(fetchArticlesFailure(err)))
        )
    );

    onFetchAll$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fetchAllArticles),
            withLatestFrom(this.store.select(getIsLogged)),
            exhaustMap((action: any[] = []) => {
                return this.articlesService.query({ noToken: !action[1] });
            }),
            map(({ articles }) => fetchAllArticlesSuccess({ articles })),
            catchError((err) => of(fetchAllArticlesFailure(err)))
        );
    });

    onFetchFeed$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fetchFeedArticles),
            exhaustMap(() => {
                return this.articlesService.feed().pipe(
                    map((articles) => fetchAllArticlesSuccess(articles)),
                    catchError((err) => of(fetchAllArticlesFailure(err)))
                );
            })
        );
    });

    onFavorite$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(onToggleFavorite),
            exhaustMap((action) => {
                return iif(
                    () => action.favorited,
                    this.articlesService.unfavorite(action.slug).pipe(
                        map(({ article }) => onToggleFavoriteSuccess(article)),
                        catchError((err) => onToggleFavoriteFailure(err))
                    ),
                    this.articlesService.favorite(action.slug).pipe(
                        map(({ article }) => {
                            return onToggleFavoriteSuccess(article);
                        }),
                        catchError((err) => onToggleFavoriteFailure(err))
                    )
                );
            })
        );
    });
}
