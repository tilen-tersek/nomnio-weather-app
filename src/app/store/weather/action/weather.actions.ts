import { createAction, props } from '@ngrx/store';
import {IWeather} from "../weather.model";

export const setWeather = createAction(
  '[Weather] Set weather',
  props<{weather: IWeather}>()
)

export const loadWeather = createAction('[Weather] Load weather', props<{ location: string }>());
