import {createReducer, on} from "@ngrx/store";
import {loadWeather, setWeather} from "../action/weather.actions";
import {IWeatherState} from "../weather.model";

const initialState: IWeatherState = {
  weather: {
    datetime: new Date(),
    description: '',
    feelsLike: 20,
    location: '',
    temperature: 20,
  },
}

export const weatherReducer = createReducer(
  initialState,
  on(setWeather, (state, { weather }): IWeatherState => {
    return { ...state, weather };
  }),
  on(loadWeather, (state, { location }): IWeatherState => {
    return { weather: { ...state.weather, location: location } };
  })
);
