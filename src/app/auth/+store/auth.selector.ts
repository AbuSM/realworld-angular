import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getIsLogged = createSelector(
    getAuthState,
    (state) => state.isLogged
);

export const getUserData = createSelector(getAuthState, (state) => state.user);

export const getIsUser = (username) =>
    createSelector(getAuthState, (state) => state.user.username === username);
