import { createAction, props } from '@ngrx/store';
import { ArticlesWrapModel } from '../../models';

export const ARTICLE_FETCH_ALL = '[Article Component] Fetch All';
export const ARTICLE_FETCH = '[Article Component] Fetch';
export const ARTICLE_FETCH_SUCCESS = '[Article Component] Fetch Success';
export const ARTICLE_FETCH_FAILURE = '[Article Component] Fetch Failure';
export const ARTICLE_FETCH_ALL_SUCCESS = '[Article Component] Fetch All Success';
export const ARTICLE_FETCH_ALL_FAILURE = '[Article Component] Fetch All Failure';
export const ARTICLE_FETCH_FEED = '[Article Component] Fetch Feed';

export const ARTICLE_FAVORITE_ACTION = '[Article Component] Favorite';
export const ARTICLE_FAVORITE_SUCCESS = '[Article Component] Favorite Success';
export const ARTICLE_FAVORITE_FAILURE = '[Article Component] Favorite Failure';

export const fetchAllArticles = createAction(ARTICLE_FETCH_ALL);
export const fetchArticles = createAction(
    ARTICLE_FETCH,
    props<{config: any}>()
)
export const fetchArticlesSuccess = createAction(
    ARTICLE_FETCH_SUCCESS,
    props<ArticlesWrapModel>()
)
export const fetchArticlesFailure = createAction(
    ARTICLE_FETCH_FAILURE,
    payload => payload
)
export const fetchAllArticlesSuccess = createAction(
    ARTICLE_FETCH_ALL_SUCCESS,
    props<ArticlesWrapModel>()
);
export const fetchAllArticlesFailure = createAction(
    ARTICLE_FETCH_ALL_FAILURE,
    (payload) => payload
);
export const fetchFeedArticles = createAction(ARTICLE_FETCH_FEED);

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
