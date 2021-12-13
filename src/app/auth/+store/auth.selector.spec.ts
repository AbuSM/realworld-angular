import { AuthState } from './auth.state';
import {
    getIsLogged,
    getAuthData,
    getUserData,
    getIsUser,
} from './auth.selector';
import { ProfileModel } from '../../models';
import { profile } from '../../stubs';

describe('Auth selectors', () => {
    it('check default values of selectors', () => {
        const initialState: AuthState = {
            isLogged: false,
            isLoading: false,
            error: null,
            user: {} as ProfileModel,
        };
        let result = getIsLogged.projector(initialState);
        expect(result).toBeFalsy();
        result = getIsUser('test3').projector(initialState);
        expect(result).toBeFalsy();
        const authData = getAuthData.projector(initialState);
        expect(authData).toEqual(initialState);
    });

    it('check selectors with data', () => {
        const initialState = {
            isLogged: true,
            isLoading: false,
            error: null,
            user: profile,
        };
        let result = getIsLogged.projector(initialState);
        expect(result).toBeTruthy();
        result = getIsUser('test3').projector(initialState);
        expect(result).toBeTruthy();
        const authData = getAuthData.projector(initialState);
        expect(authData).toEqual(initialState);
        const userData = getUserData.projector(initialState);
        expect(userData).toEqual({
            ...profile,
            isLogged: true,
            isLoading: false,
        });
    });
});
