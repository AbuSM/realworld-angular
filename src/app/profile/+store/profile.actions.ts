import { createAction, props } from '@ngrx/store';

export const USER_FOLLOW_ACTION = '[User Component] Follow';
export const USER_FOLLOW_SUCCESS = '[User Component] Follow Success';
export const USER_FOLLOW_FAILURE = '[User Component] Follow Failure';

export const onToggleFollow = createAction(
    USER_FOLLOW_ACTION,
    props<{ username: string; follow: boolean }>()
);
export const onToggleFollowSuccess = createAction(
    USER_FOLLOW_SUCCESS,
    (payload) => payload
);
export const onToggleFollowFailure = createAction(
    USER_FOLLOW_FAILURE,
    (payload) => payload
);
