import { UserCredentialsModel } from './user-credentials.model';

export interface AuthModel extends UserCredentialsModel {
    username: string;
}
