import { createAction, props } from '@ngrx/store';

export const setLocation = createAction(
  '[Location] Set location',
  props<{location: string}>()
)
