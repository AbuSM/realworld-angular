import { ProfileModel } from '../../models';

export interface AuthState {
    isLogged: boolean;
    isLoading: boolean;
    error: unknown;
    user: ProfileModel;
}
