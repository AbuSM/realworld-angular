import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

const _getProfile = createFeatureSelector<ProfileState>('profile');

export const getProfile = createSelector(_getProfile, (state) => state);
