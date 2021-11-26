import { createAction, props } from '@ngrx/store';
import { ArticleModel } from '../../models';

export const ARTICLE_FETCH_ALL = '[Article Component] Fetch';
export const ARTICLE_FETCH_ALL_SUCCESS = '[Article Component] Fetch Success';
export const ARTICLE_FETCH_ALL_FAILURE = '[Article Component] Fetch Failure';

export const ARTICLE_FAVORITE_ACTION = '[Article Component] Favorite';
export const ARTICLE_FAVORITE_SUCCESS = '[Article Component] Favorite Success';
export const ARTICLE_FAVORITE_FAILURE = '[Article Component] Favorite Failure';
export const ARTICLE_FOLLOW_ACTION = '[Article Component] Follow';
export const ARTICLE_FOLLOW_SUCCESS = '[Article Component] Follow Success';
export const ARTICLE_FOLLOW_FAILURE = '[Article Component] Follow Failure';

export const fetchAllArticles = createAction(ARTICLE_FETCH_ALL);
export const fetchAllArticlesSuccess = createAction(
    ARTICLE_FETCH_ALL_SUCCESS,
    props<{ articles: ArticleModel[] }>()
);
export const fetchAllArticlesFailure = createAction(
    ARTICLE_FETCH_ALL_FAILURE,
    (payload) => payload
);

export const onToggleFavorite = createAction(
    ARTICLE_FAVORITE_ACTION,
    props<{ slug: string; favorited: boolean }>()
);

export const onToggleFavoriteSuccess = createAction(
    ARTICLE_FAVORITE_SUCCESS,
    (payload) => payload
);

export const onToggleFavoriteFailure = createAction(
    ARTICLE_FAVORITE_FAILURE,
    (payload) => payload
);

export const onToggleFollow = createAction(ARTICLE_FOLLOW_ACTION);
export const onToggleFollowSuccess = createAction(
    ARTICLE_FOLLOW_SUCCESS,
    (payload) => payload
);
export const onToggleFollowFailure = createAction(
    ARTICLE_FOLLOW_FAILURE,
    (payload) => payload
);
