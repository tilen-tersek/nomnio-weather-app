import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IWeatherState} from "../weather.model";

export const selectWeatherState = createFeatureSelector<IWeatherState>('weather');

export const selectLanguage = createSelector(
  selectWeatherState,
  (state: IWeatherState) => state.weather
);
