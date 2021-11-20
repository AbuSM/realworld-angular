import { createReducer, on } from '@ngrx/store';
import { authorize } from './auth.actions';

export const initialState = false;

const _authReducer = createReducer(
    initialState,
    on(authorize, () => true)
);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}
