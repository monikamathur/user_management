import * as formAction from '../actions/auth.actions';
import { createReducer, on } from '@ngrx/store';

export const loginPageFeatureKey = 'loginPage';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export const reducer = createReducer(
  initialState,
  on(formAction.login, (state) => {
    console.log('sdfsdfsd',state)
    return ({
      ...state,
      error: null,
      pending: true,
    })
  }),

  on(formAction.loginSuccess, (state) => ({
    ...state,
    error: null,
    pending: false,
  })),
  
  on(formAction.loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
