import { ProfileModel } from '../../models';

export interface ProfileState {
    isLoading: boolean;
    profile: ProfileModel;
}
