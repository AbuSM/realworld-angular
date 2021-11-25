import { ProfileModel } from '../../models';

export interface AuthState {
    isLogged: boolean;
    isLoading: boolean;
    error: string;
    user: ProfileModel;
}
