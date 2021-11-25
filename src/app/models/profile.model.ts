export interface ProfileModel {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export interface ProfileFullModel extends ProfileModel {
    isLogged: boolean;
    isLoading: boolean;
}
