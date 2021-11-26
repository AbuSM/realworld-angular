import {ArticleModel} from "../../models";

export interface ArticleState {
    isLoading: boolean,
    articles: ArticleModel[]
}
