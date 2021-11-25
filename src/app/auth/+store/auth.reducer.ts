import { createReducer, on } from '@ngrx/store';
import {
    authorize,
    authorizeSuccess,
    authorizeFailure,
    checkAccess,
    logout,
} from './auth.actions';

export const initialState = {
    isLoading: false,
    isLogged: false,
    error: null,
    user: null
};

const _authReducer = createReducer(
    initialState,
    on(authorize, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(authorizeSuccess, (state, user) => ({
        ...state,
        isLoading: false,
        isLogged: true,
        user
    })),
    on(authorizeFailure, (state, payload) => ({
        ...state,
        isLoading: false,
        isLogged: false,
        error: payload,
    })),
    on(checkAccess, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(logout, (state) => ({
        ...state,
        isLoading: false,
        isLogged: false,
    }))
);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}
