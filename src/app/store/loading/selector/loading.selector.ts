import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ILoadingState} from "../loading.model";

export const selectLoadingState = createFeatureSelector<ILoadingState>('loading')
export const selectLoading = createSelector(
  selectLoadingState,
  (state: ILoadingState) => state.loading
);
