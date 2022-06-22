import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import * as authActions from '../actions/auth.actions';

export const statusFeatureKey = 'status';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, {  }) => ({ ...state })),
  on(authActions.logout, () => initialState)
);

export const getUser = (state: State) => state.user;
