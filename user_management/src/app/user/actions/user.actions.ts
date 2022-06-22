import { createAction, props } from '@ngrx/store';

import { User } from '../user/models';

export const loadUser = createAction(
  '[User Exists Guard] Load User',
  props<{ user: User }>()
);
