import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getIsLogged = createSelector(
    getAuthState,
    (state) => state.isLogged
);
