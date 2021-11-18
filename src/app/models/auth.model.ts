import { UserCredentialsModel } from './user.model';

export interface AuthModel extends UserCredentialsModel {
    username: string;
}
