import { ProfileModel } from './profile.model';

export interface ArticleModel {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    author: ProfileModel;
    favorited: boolean;
    favoritesCount: number;
    createdAt?: string;
    updatedAt?: string;
}
