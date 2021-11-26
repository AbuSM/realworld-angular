import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './article.state';

export const getArticlesState = createFeatureSelector<UserState>('articles');

export const getAllArticles = createSelector(
    getArticlesState,
    (state) => state
);
