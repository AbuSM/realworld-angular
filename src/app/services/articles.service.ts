import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { QueryModel } from '../models/query.model';
import { Observable } from 'rxjs';
import { ArticleModel, ArticlesWrapModel, ArticleWrapModel } from '../models';

@Injectable()
export class ArticlesService {
    constructor(private apiService: ApiService) {}

    query(config: QueryModel = {}): Observable<ArticlesWrapModel> {
        return this.apiService.get('articles', config);
    }

    feed(
        config: QueryModel = { limit: 10, offset: 0 }
    ): Observable<ArticlesWrapModel> {
        return this.apiService.get('articles/feed', config);
    }

    create(data: ArticleModel): Observable<ArticleWrapModel> {
        return this.apiService.post('articles', { article: data });
    }

    update(
        data: ArticleModel,
        slug: string
    ): Observable<{ article: ArticleModel }> {
        return this.apiService.put(`articles/${slug}`, { article: data });
    }

    get(slug: string) {
        return this.apiService.get(`articles/${slug}`);
    }

    delete(slug: string) {
        return this.apiService.delete(`articles/${slug}`);
    }

    favorite(slug: string) {
        return this.apiService.post(`articles/${slug}/favorite`);
    }

    unfavorite(slug: string) {
        return this.apiService.delete(`articles/${slug}/favorite`);
    }

    getComments(slug: string) {
        return this.apiService.get(`articles/${slug}/comments`);
    }

    addComment(slug: string, body: string) {
        return this.apiService.post(`articles/${slug}/comments`, {
            comment: { body },
        });
    }

    deleteComment(slug: string, id: number) {
        return this.apiService.delete(`articles/${slug}/comments/${id}`);
    }
}
