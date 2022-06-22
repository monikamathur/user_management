import { createAction, props } from '@ngrx/store';

import { User } from '@example-app/user/models';

/**
 * Add User to Collection Action
 */
export const addUser = createAction(
  '[Selected User Page] Add User',
  props<{ user: User }>()
);

/**
 * Remove User from Collection Action
 */
export const removeUser = createAction(
  '[Selected User Page] Remove User',
  props<{ user: User }>()
);
