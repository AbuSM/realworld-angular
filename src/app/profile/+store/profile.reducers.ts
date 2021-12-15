import { createReducer, on } from '@ngrx/store';
import {
    onToggleFollow,
    onToggleFollowSuccess,
    onToggleFollowFailure,
    fetchProfile,
    fetchProfileSuccess,
    fetchCards,
    fetchCardsSuccess,
    clickNewCard,
} from './profile.actions';
import { ProfileModel } from '../../models';

export const initialState = {
    isLoading: false as boolean,
    profile: {} as ProfileModel,
    cards: [],
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
    })),
    on(fetchCards, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(fetchCardsSuccess, (state, { cards }) => ({
        ...state,
        cards,
    })),
    on(clickNewCard, (state, { card }) => ({
        ...state,
        cards: state.cards.map((prevCard) => {
            return prevCard.id === card.id
                ? {
                      ...card,
                      isNew: false,
                  }
                : prevCard;
        }),
    }))
);

export function profileReducer(state: any, action: any) {
    return _profileReducer(state, action);
}
