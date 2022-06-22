import { createAction, props } from '@ngrx/store';

export const searchUsers = createAction(
  '[Find User Page] Search Users',
  props<{ query: string }>()
);
