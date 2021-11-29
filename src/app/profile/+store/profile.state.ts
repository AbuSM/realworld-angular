import { ArticleModel } from '../../models';

export interface ProfileState {
    isLoading: boolean;
    articles: ArticleModel[];
}
