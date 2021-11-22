import { createAction } from '@ngrx/store';

export const AUTHORIZE_REQUEST = '[Auth Component] Authorize Request';
export const AUTHORIZE_SUCCESS = '[Auth Component] Authorize Success';
export const LOGOUT = '[Auth Component] Logout';

export const authorize = createAction(AUTHORIZE_REQUEST);
export const logout = createAction(LOGOUT);
