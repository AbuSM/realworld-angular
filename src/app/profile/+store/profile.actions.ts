import { createAction, props } from '@ngrx/store';

export const USER_FOLLOW_ACTION = '[User Component] Follow';
export const USER_FOLLOW_SUCCESS = '[User Component] Follow Success';
export const USER_FOLLOW_FAILURE = '[User Component] Follow Failure';
export const PROFILE_FETCH = '[Profile Component] Fetch';
export const PROFILE_FETCH_SUCCESS = '[Profile Component] Fetch Success';
export const PROFILE_FETCH_FAILURE = '[Profile Component] Fetch Failure';

export const onToggleFollow = createAction(
    USER_FOLLOW_ACTION,
    props<{ username: string; following: boolean }>()
);
export const onToggleFollowSuccess = createAction(
    USER_FOLLOW_SUCCESS,
    (payload) => payload
);
export const onToggleFollowFailure = createAction(
    USER_FOLLOW_FAILURE,
    (payload) => payload
);

export const fetchProfile = createAction(
    PROFILE_FETCH,
    props<{ username: string }>()
);

export const fetchProfileSuccess = createAction(
    PROFILE_FETCH_SUCCESS,
    (payload) => payload
);

export const fetchProfileFailure = createAction(
    PROFILE_FETCH_FAILURE,
    (payload) => payload
);
