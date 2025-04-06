import {Component, Input} from '@angular/core';
import {IonCard} from "@ionic/angular/standalone";
import {IWeather} from "../store/weather/weather.model";
import {WeatherDatePipe} from "../pipes/weather-date.pipe";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  imports: [
    IonCard,
    WeatherDatePipe,
    TranslatePipe,
  ]
})
export class WeatherCardComponent {
  @Input() weatherData!: IWeather;

  constructor() { }

  getWeatherIcon(description: string): string {
    switch (description.toLowerCase()) {
      case 'clear sky':
        return '🌞';
      case 'few clouds':
        return '🌤️';
      case 'scattered clouds':
        return '⛅';
      case 'broken clouds':
        return '🌥️';
      case 'shower rain':
      case 'rain':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
        return '❄️';
      case 'mist':
        return '🌫️';
      default:
        return '❓';
    }
  }

  getWeatherTranslation(description: string): string {
   return "weather." + description.replace(/\s+/g, '_');
  }
}
