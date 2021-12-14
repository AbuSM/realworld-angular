import { createReducer, on } from '@ngrx/store';
import { ArticleModel } from '../../models';
import {
    onToggleFavorite,
    onToggleFavoriteSuccess,
    onToggleFavoriteFailure,
    fetchAllArticles,
    fetchArticlesSuccess,
    fetchAllArticlesSuccess,
    fetchArticlesFailure,
    fetchAllArticlesFailure,
} from './article.actions';

export const initialState = {
    articles: [] as ArticleModel[],
    isLoading: false as boolean,
};

const _articleReducer = createReducer(
    initialState,
    on(fetchAllArticles, onToggleFavorite, (state) => state),
    on(
        fetchAllArticlesSuccess,
        fetchArticlesSuccess,
        (state, { articles }) => ({
            ...state,
            isLoading: false,
            articles,
        })
    ),
    on(fetchAllArticlesFailure, fetchArticlesFailure, (state, error) => ({
        ...state,
        isLoading: false,
        error,
    })),
    on(onToggleFavoriteSuccess, (state, article) => ({
        ...state,
        isLoading: false,
        articles: state.articles.map((item) =>
            item.slug === article.slug ? article : item
        ),
    })),
    on(onToggleFavoriteFailure, (state, error) => ({
        ...state,
        error,
        isLoading: false,
    }))
);

export function articleReducer(state: any, action: any) {
    return _articleReducer(state, action);
}
