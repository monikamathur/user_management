import { createReducer, on } from '@ngrx/store';

import {
  CollectionApiActions,
  CollectionPageActions,
  SelectedUserPageActions,
} from '../actions';

export const collectionFeatureKey = 'collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export const reducer = createReducer(
  initialState,
  on(CollectionPageActions.enter, (state) => ({
    ...state,
    loading: true,
  })),
  on(CollectionApiActions.loadUsersSuccess, (_state, { user }) => ({
    loaded: true,
    loading: false,
    ids: user.map((user) => user.id),
  })),
  /**
   * Optimistically add user to collection.
   * If this succeeds there's nothing to do.
   * If this fails we revert state by removing the user.
   *
   * `on` supports handling multiple types of actions
   */
  on(
    SelectedUserPageActions.addUser,
    CollectionApiActions.removeUserFailure,
    (state, { user }) => {
      if (state.ids.indexOf(user.id) > -1) {
        return state;
      }
      return {
        ...state,
        ids: [...state.ids, user.id],
      };
    }
  ),
  /**
   * Optimistically remove user from collection.
   * If addUser fails, we "undo" adding the user.
   */
  on(
    SelectedUserPageActions.removeUser,
    CollectionApiActions.addUserFailure,
    (state, { user }) => ({
      ...state,
      ids: state.ids.filter((id) => id !== user.id),
    })
  )
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
