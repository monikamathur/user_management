import { reducer } from './login-page.reducer';
import * as fromLoginPage from './login-page.reducer';

import * as authActions from '../actions/auth.actions';

import { Credentials, User } from '../models/user';

describe('LoginPageReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      // expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN', () => {
    it('should make pending to true', () => {
      const user = { username: 'test' } ;
      const createAction = authActions.login({ credentials: user });

      const result = reducer(fromLoginPage.initialState, createAction);

      // expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should have no error and no pending state', () => {
      const user = { name: 'test' } as User;
      const createAction = authActions.loginSuccess();

      const result = reducer(fromLoginPage.initialState, createAction);

      // expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN_FAILURE', () => {
    it('should have an error and no pending state', () => {
      const error = 'login failed';
      const createAction = authActions.loginFailure({ error });

      const result = reducer(fromLoginPage.initialState, createAction);

      // expect(result).toMatchSnapshot();
    });
  });
});
