import * as authReducer from './auth.reducer';
import * as AuthActions from './auth.actions';
import { user } from '../../stubs';

describe('AuthReducer', () => {
    it('check authorize actions', () => {
        const { initialState } = authReducer;
        const actionRequest = AuthActions.authorize({
            credentials: { email: 'test@test.ru', password: 'test' },
            loginType: 'login',
        });
        const actionSuccess = AuthActions.authorizeSuccess({ user });
        const actionFailure = AuthActions.authorizeFailure({ error: 'error' });

        let state = authReducer.authReducer(initialState, actionRequest);
        expect(state).toEqual({ ...initialState, isLoading: true });
        state = authReducer.authReducer(initialState, actionSuccess);
        let newState = {
            ...initialState,
            isLogged: true,
            user,
        };
        expect(state).toEqual(newState);
        state = authReducer.authReducer(initialState, actionFailure);
        newState = {
            ...initialState,
            isLogged: false,
            error: 'error',
        };
        expect(state).toEqual(newState);
    });
});
