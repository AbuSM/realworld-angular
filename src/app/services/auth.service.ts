import { Injectable } from '@angular/core';
import { UserCredentialsModel, UserModel } from '../models';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { clear, getItem, setItem } from '../utils';
import { Store } from '@ngrx/store';
import { authorize, logout } from '../auth/+store/auth.actions';

@Injectable()
export class AuthService {
    constructor(
        private apiService: ApiService,
        private store: Store<{ auth: object }>
    ) {}

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

    logout() {
        clear();
        this.store.dispatch(logout());
    }

    checkUser() {
        const token = getItem();
        if (token) {
            this.apiService
                .get('user', { headers: { Authorization: `Bearer ${token}` } })
                .subscribe({
                    next: () => this.store.dispatch(authorize()),
                    error: () => this.logout(),
                });
        } else {
            this.logout();
        }
    }
}
