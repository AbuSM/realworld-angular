import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { QueryModel } from '../models/query.model';
import { Observable } from 'rxjs';
import { ArticleModel } from '../models';

@Injectable()
export class ArticlesService {
    constructor(private apiService: ApiService) {}

    query(config: QueryModel = {}): Observable<{ articles: ArticleModel[] }> {
        return this.apiService.get('articles', config);
    }

    create(data: ArticleModel): Observable<{ article: ArticleModel }> {
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
}
