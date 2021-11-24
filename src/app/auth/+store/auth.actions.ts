import { createAction, props } from '@ngrx/store';
import { UserCredentialsModel } from '../../models';

export const AUTHORIZE_REQUEST = '[Auth Component] Authorize Request';
export const AUTHORIZE_SUCCESS = '[Auth Component] Authorize Success';
export const AUTHORIZE_FAILURE = '[Auth Component] Authorize Failure';
export const AUTHORIZE_UPDATE_USER = '[Auth Component] Authorize User Update';
export const AUTHORIZE_CHECK_REQUEST =
    '[Auth Component] Authorize Check Request';
export const LOGOUT = '[Auth Component] Logout';

export const authorize = createAction(
    AUTHORIZE_REQUEST,
    props<{ loginType: string; credentials: UserCredentialsModel }>()
);

export const authorizeSuccess = createAction(
    AUTHORIZE_SUCCESS,
    (payload = {}) => payload
);

export const authorizeFailure = createAction(
    AUTHORIZE_FAILURE,
    props<{ error: string }>()
);

export const checkAccess = createAction(AUTHORIZE_CHECK_REQUEST);

export const updateUser = createAction(
    AUTHORIZE_UPDATE_USER,
    (payload) => payload
);

export const logout = createAction(LOGOUT);
