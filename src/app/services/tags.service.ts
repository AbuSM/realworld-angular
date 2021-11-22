import { Injectable } from '@angular/core';
import { ApiService } from './';
import { take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TagsService {
    constructor(private apiService: ApiService) {}

    fetchAll() {
        return this.apiService.get('/tags').pipe(take(1));
    }
}
