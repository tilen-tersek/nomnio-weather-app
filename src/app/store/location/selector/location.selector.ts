import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ILocationState} from "../location.model";

export const selectLocationState = createFeatureSelector<ILocationState>('location');

export const selectLocation = createSelector(
  selectLocationState,
  (state: ILocationState) => state.location
);
