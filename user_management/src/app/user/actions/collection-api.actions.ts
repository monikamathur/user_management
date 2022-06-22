import { createAction, props } from '@ngrx/store';

import { User } from '@example-app/user/models';

/**
 * Add User to Collection Actions
 */
export const addUserSuccess = createAction(
  '[Collection/API] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[Collection/API] Add User Failure',
  props<{ user: User }>()
);

/**
 * Remove User from Collection Actions
 */
export const removeUserSuccess = createAction(
  '[Collection/API] Remove User Success',
  props<{ user: User }>()
);

export const removeUserFailure = createAction(
  '[Collection/API] Remove User Failure',
  props<{ user: User }>()
);

/**
 * Load Collection Actions
 */
export const loadUsersSuccess = createAction(
  '[Collection/API] Load Users Success',
  props<{ user: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Collection/API] Load Users Failure',
  props<{ error: any }>()
);
