import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
    fetchAllArticles,
    fetchAllArticlesSuccess,
    fetchAllArticlesFailure,
    onToggleFavorite,
    onToggleFavoriteFailure,
    onToggleFavoriteSuccess
} from "./article.actions";
import {exhaustMap, map, of, catchError} from 'rxjs';
import {ArticlesService} from "../../services";

@Injectable()
export class ArticleEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private articlesService: ArticlesService
    ) {}

    onFetchAll$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fetchAllArticles),
            exhaustMap(() => {
                return this.articlesService.query().pipe(
                    map(({articles}) => fetchAllArticlesSuccess({articles})),
                    catchError(err => of(fetchAllArticlesFailure(err)))
                )
            })
        )
    })

    onFavorite$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(onToggleFavorite),
            exhaustMap((action) => {
                return this.articlesService.favorite(action.slug).pipe(
                    map(({article}) => {
                        return onToggleFavoriteSuccess(article)
                    }),
                    catchError(err => onToggleFavoriteFailure(err))
                )
            })
        )
    })
}
