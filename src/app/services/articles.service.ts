import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { QueryModel } from '../models/query.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ArticleModel } from '../models';

@Injectable()
export class ArticlesService {
    constructor(private apiService: ApiService) {}

    query(config: QueryModel = {}): Observable<{articles: ArticleModel[]}> {
        return this.apiService.get('articles', config);
    }

    create(data: ArticleModel): Observable<ArticleModel> {
        return this.apiService.post('articles', {article: data});
    }
}
