import { createReducer, on } from '@ngrx/store';
import {
    onToggleFollow,
    onToggleFollowSuccess,
    onToggleFollowFailure,
    fetchProfile,
    fetchProfileSuccess,
} from './profile.actions';
import { ProfileModel } from '../../models';

export const initialState = {
    isLoading: false as boolean,
    profile: {} as ProfileModel,
};

const _profileReducer = createReducer(
    initialState,
    on(onToggleFollow, (state) => state),
    on(onToggleFollowSuccess, (state, profile: ProfileModel) => ({
        ...state,
        profile,
    })),
    on(onToggleFollowFailure, (state) => state),
    on(fetchProfile, (state) => state),
    on(fetchProfileSuccess, (state, profile: ProfileModel) => ({
        ...state,
        profile,
    }))
);

export function profileReducer(state: any, action: any) {
    return _profileReducer(state, action);
}
