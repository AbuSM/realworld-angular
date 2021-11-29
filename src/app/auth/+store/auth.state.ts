import { ProfileModel } from '../../models';

export interface AuthState {
    isLogged: boolean;
    isLoading: boolean;
    error: any;
    user: ProfileModel;
}
