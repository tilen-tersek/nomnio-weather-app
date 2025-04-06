import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { OpenWeatherResponse, WeatherService } from '../../../services/weather/weather.service';
import {loadWeather, setWeather} from '../action/weather.actions';
import { map, catchError, switchMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { setLoading } from '../../loading/action/loading.action';
import { setLocation } from "../../location/action/location.actions";

@Injectable()
export class WeatherEffects {
    constructor(
        private actions$: Actions,
        private weatherService: WeatherService
    ) {}

    /**
     * Effect to load weather data when location is set.
     * Adds a 5-second delay before calling the weather service.
     * Dispatches `setWeather` action on success or failure.
     */
    loadWeather$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadWeather),
            switchMap(({ location }) => {
                // Add a delay before fetching weather data
                return of(null).pipe(
                    delay(5000), // wait for 5 seconds
                    switchMap(() =>
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
                                return of(setWeather({weather: null}));
                            })
                        )
                    )
                );
            })
        );
    });

    /**
     * Effect to set loading state to true when a location is set.
     * Dispatches `setLoading` action.
     */
    setLocation$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadWeather),
            switchMap(() => {
                return of(setLoading({ loading: true }));
            })
        );
    });

    /**
     * Effect to set loading state to false when weather data is set.
     * Dispatches `setLoading` action.
     */
    setWeather$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(setWeather),
            switchMap(() => {
                return of(setLoading({ loading: false }));
            })
        );
    });
}
