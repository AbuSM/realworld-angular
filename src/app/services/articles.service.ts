import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { QueryModel } from '../models/query.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PostModel } from '../models';

@Injectable()
export class ArticlesService {
    constructor(private apiService: ApiService) {}

    query(config: QueryModel): Observable<any> {
        const params = {};
        return this.apiService.get(
            'articles',
            new HttpParams({ fromObject: params })
        );
    }

    create(data: PostModel): Observable<any> {
        return this.apiService.post('articles', data);
    }
}
