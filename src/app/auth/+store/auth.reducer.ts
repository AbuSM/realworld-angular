import { createReducer, on } from '@ngrx/store';
import { authorize, logout } from './auth.actions';

export const initialState = false;

const _authReducer = createReducer(
    initialState,
    on(authorize, () => true),
    on(logout, () => false)
);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}
