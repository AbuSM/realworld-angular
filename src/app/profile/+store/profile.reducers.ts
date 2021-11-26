import { createReducer, on } from '@ngrx/store';
import {
    onToggleFollow,
    onToggleFollowSuccess,
    onToggleFollowFailure,
} from './profile.actions';

export const initialState = {
    isLoading: false as boolean,
};

const _userReducer = createReducer(
    initialState,
    on(onToggleFollow, (state) => state),
    on(onToggleFollowSuccess, (state) => state),
    on(onToggleFollowFailure, (state) => state)
);

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}
