import { CardModel, ProfileModel } from '../../models';

export interface ProfileState {
    isLoading: boolean;
    profile: ProfileModel;
    cards: CardModel[];
}
