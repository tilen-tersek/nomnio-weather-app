import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {OpenWeatherResponse, WeatherService} from '../../../services/weather/weather.service';
import { loadWeather, setWeather } from '../action/weather.actions';
import {map, mergeMap, catchError, switchMap, finalize} from 'rxjs/operators';
import { of } from 'rxjs';
import { setLoading } from '../../loading/action/loading.action';

@Injectable()
export class WeatherEffects {

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  // Effect to handle loading weather data
  loadWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadWeather),
      mergeMap(({ location }) => {
        return of(setLoading({ loading: true })).pipe(
          switchMap(()=>
            this.weatherService.getWeather(location).pipe(
              map((weatherData: OpenWeatherResponse) => {
                return setWeather({
                  weather: {
                    datetime: new Date(weatherData.dt * 1000),
                    description: weatherData.weather[0].description,
                    temperature: weatherData.main.temp,
                    feelsLike: weatherData.main.feels_like,
                    location: weatherData.name,
                  },
                });
              }),
              catchError((error) => {
                return of(setLoading({ loading: false }));
              }),
              finalize(()=>{
                return of(setLoading({ loading: false }));
              })
            )
          )
        );
      })
    );
  });

}
