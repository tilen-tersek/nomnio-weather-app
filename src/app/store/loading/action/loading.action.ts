import {createAction, props} from "@ngrx/store";

export const setLoading = createAction(
  '[Loading] setLoading',
  props<{loading: boolean}>()
)
