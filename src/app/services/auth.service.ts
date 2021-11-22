import { Injectable } from '@angular/core';
import { UserCredentialsModel, UserModel } from '../models';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { clear, getItem, setItem } from '../utils';

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
                    this.setAuth(data.user);
                    return data;
                })
            );
    }

    setAuth(user: UserModel) {
        setItem(user.token);
    }

    checkUser() {
        const token = getItem();
        return this.apiService.get('user', {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    logout() {
        clear();
    }
}
