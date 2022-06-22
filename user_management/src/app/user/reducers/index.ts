import { User } from '../models';
import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';
import * as fromSearch from '../reducers/search.reducer';
import * as fromUsers from '../reducers/user.reducer';
import * as fromCollection from '../reducers/collection.reducer';
import * as fromRoot from '../reducers';

export const usersFeatureKey = 'user';

export interface UsersState {
  [fromSearch.searchFeatureKey]: fromSearch.State;
  [fromUsers.usersFeatureKey]: fromUsers.State;
  [fromCollection.collectionFeatureKey]: fromCollection.State;
}

export interface State  {
  [usersFeatureKey]: UsersState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: UsersState | undefined, action: Action) {
  return combineReducers({
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
    [fromUsers.usersFeatureKey]: fromUsers.reducer,
    [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  })(state, action);
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `user` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.usersState$ = state$.pipe(select(getUsersState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectUsersState =
  createFeatureSelector<UsersState>(usersFeatureKey);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectUserEntitiesState = createSelector(
  selectUsersState,
  (state) => state.user
);

export const selectSelectedUserId = createSelector(
  selectUserEntitiesState,
  fromUsers.selectId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = fromUsers.adapter.getSelectors(selectUserEntitiesState);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the user selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const selectSearchState = createSelector(
  selectUsersState,
  (state) => state.search
);

export const selectSearchUserIds = createSelector(
  selectSearchState,
  fromSearch.getIds
);
export const selectSearchQuery = createSelector(
  selectSearchState,
  fromSearch.getQuery
);
export const selectSearchLoading = createSelector(
  selectSearchState,
  fromSearch.getLoading
);
export const selectSearchError = createSelector(
  selectSearchState,
  fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of user in the store.
 */
export const selectSearchResults = createSelector(
  selectUserEntities,
  selectSearchUserIds,
  (user, searchIds) => {
    return searchIds
      .map((id) => user[id])
      .filter((user): user is User => user != null);
  }
);

export const selectCollectionState = createSelector(
  selectUsersState,
  (state) => state.collection
);

export const selectCollectionLoaded = createSelector(
  selectCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  selectCollectionState,
  fromCollection.getLoading
);
export const selectCollectionUserIds = createSelector(
  selectCollectionState,
  fromCollection.getIds
);

export const selectUserCollection = createSelector(
  selectUserEntities,
  selectCollectionUserIds,
  (entities, ids) => {
    return ids
      .map((id) => entities[id])
      .filter((user): user is User => user != null);
  }
);

export const isSelectedUserInCollection = createSelector(
  selectCollectionUserIds,
  selectSelectedUserId,
  (ids, selected) => {
    return !!selected && ids.indexOf(selected) > -1;
  }
);
