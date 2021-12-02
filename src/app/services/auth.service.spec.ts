import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserCredentialsModel, UserModel } from '../models';
import { clearStorage, getToken } from '../utils';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const checkStorageForEmpty = () => {
    const token = getToken();
    expect(token).toBeNull();
};

const checkStorageForData = () => {
    const token = getToken();
    expect(token).toBeDefined();
};

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, ApiService],
        });
        service = TestBed.inject(AuthService);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
        clearStorage();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login the user', () => {
        const user = {
            email: 'test@test.ru',
            password: 'test',
        } as UserCredentialsModel;
        service.authUser('login', user).subscribe({
            next: (value) => {
                checkStorageForEmpty();
                expect(value).toContain(user);
                checkStorageForData();
            },
        });
    });

    it('should register user and check if user exists', async () => {
        const user = {
            username: 'test4',
            password: 'test',
            email: 'test1@test.ru',
        };
        const authType = 'register';
        service.authUser(authType, user).subscribe({
            next: (value) => {
                expect(value).toContain(user);
            },
            error: (err) => console.error(err),
        });
    });
    it('setAuth method should work fine', () => {
        const user = {
            token: 'test',
        } as UserModel;
        checkStorageForEmpty();
        service.setAuth(user);
        checkStorageForData();
    });
});

describe('AuthService 2', () => {
    let service: AuthService;
    const userCredentials = { email: 'test@test.ru', password: 'test' };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, ApiService],
        });
        service = TestBed.inject(AuthService);
        service.authUser('login', userCredentials);
    });

    it('checkUser should work fine', async () => {
        service.checkUser().subscribe({
            next: (user) => {
                checkStorageForData();
                expect(user).toContain(userCredentials);
            },
        });
    });

    it('logout should work fine', () => {
        checkStorageForData();
        service.logout();
        checkStorageForEmpty();
    });
});
