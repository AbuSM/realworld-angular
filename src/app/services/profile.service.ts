import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ProfileService {
    constructor(private apiService: ApiService) {}

    follow(username: string) {
        return this.apiService.post(`/profiles/${username}/follow`);
    }

    unfollow(username: string) {
        return this.apiService.delete(`/profiles/${username}/follow`);
    }
}
