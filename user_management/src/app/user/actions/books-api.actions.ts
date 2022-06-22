import { createAction, props } from '@ngrx/store';

import { User } from '@example-app/user/models';

export const searchSuccess = createAction(
  '[Users/API] Search Success',
  props<{ user: User[] }>()
);

export const searchFailure = createAction(
  '[Users/API] Search Failure',
  props<{ errorMsg: string }>()
);
