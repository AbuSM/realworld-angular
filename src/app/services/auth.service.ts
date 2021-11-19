import { Injectable } from '@angular/core';
import { UserCredentialsModel } from '../models/user.model';
import { ApiService } from './api.service';
import { map } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private apiService: ApiService) {}

    authUser(authType: string, credentials: UserCredentialsModel) {
        return this.apiService
            .post(`users${authType === 'login' ? '/login' : ''}`, {
                user: credentials,
            })
            .pipe(
                map((data) => {
                    this.setAuth(data);
                    return data;
                })
            );
    }

    setAuth(user) {
        console.log(user);
    }
}
