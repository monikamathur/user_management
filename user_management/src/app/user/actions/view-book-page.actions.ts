import { createAction, props } from '@ngrx/store';

export const selectUser = createAction(
  '[View User Page] Select User',
  props<{ id: string }>()
);
