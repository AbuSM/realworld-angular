import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './article.state';

export const getArticlesState = createFeatureSelector<ArticleState>('articles');

export const getAllArticles = createSelector(
    getArticlesState,
    (state) => state
)
