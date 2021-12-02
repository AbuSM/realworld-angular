import { fakeAsync, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {ProfileModel, UserCredentialsModel, UserModel} from '../models';
import {clearStorage, getToken, setToken} from '../utils';
import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


const checkStorageForEmpty = () => {
    const token = getToken();
    expect(token).toBeNull();
};

const checkStorageForData = () => {
    const token = getToken();
    expect(token).not.toBeNull();
};

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, ApiService],
        });
        service = TestBed.inject(AuthService);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        clearStorage();
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    xit('should login the user', (done: DoneFn) => {
        const user = {
            email: 'test@test.ru',
            password: 'test',
        } as UserCredentialsModel;
        service.authUser('login', user).subscribe({
            next: (value) => {
                checkStorageForEmpty();
                expect(value).toContain(user);
                checkStorageForData();
                done();
            },
            error: err => done.fail(err)
        });
    });

    xit('should register user and check if user exists', ((done: DoneFn) => {
        const user = {
            username: 'test4',
            password: 'test',
            email: 'test1@test.ru',
        };
        const authType = 'register';
        service.authUser(authType, user).subscribe({
            next: (value) => {
                expect(value).toContain(user);
                done();
            },
            error: (err) => {
                console.error("Error in register test: ", err);
                done.fail(err);
            },
            complete: () => done()
        });
    }));
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
    let service: AuthService,
        httpTestingController: HttpTestingController,
        user: ProfileModel;
    const userCredentials = { email: 'test@test.ru', password: 'test' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, ApiService],
        });
        service = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController)
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    });

    xit('checkUser should work fine', (done: DoneFn) => {
        service.checkUser().subscribe({
            next: (user) => {
                checkStorageForData();
                expect(user).toContain(userCredentials);
                done();
            },
            error: err => {
                done.fail(err)
            }
        });
    });

    it('logout should work fine', () => {
        setToken('test');
        checkStorageForData();
        service.logout();
        checkStorageForEmpty();
    });

    xit('updateUser should work fine', (done: DoneFn) => {
        const newUser = {
            username: 'newTest',
            ...user
        }
        checkStorageForData();
        service.updateUser(newUser).subscribe({
            next: value => {
                expect(value).toContain(newUser);
                done()
            },
            error: err => {
                console.error("Error in updateUser test: ", err);
                done.fail(err);
            }
        })
    })
});
