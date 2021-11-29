import { Injectable } from '@angular/core';
import { ProfileModel, UserCredentialsModel, UserModel } from '../models';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { clearStorage, setToken } from '../utils';

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

    setAuth(user: UserModel): void {
        setToken(user.token);
    }

    checkUser(): Observable<{ user: ProfileModel }> {
        return this.apiService.get('user');
    }

    updateUser(user: ProfileModel): Observable<{ user: ProfileModel }> {
        return this.apiService.put('user', { user });
    }

    logout() {
        clearStorage();
    }
}
