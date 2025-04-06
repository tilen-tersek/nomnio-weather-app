export interface IWeatherState {
  weather: IWeather;
}

export interface IWeather {
  location: string;
  datetime: Date;
  description: string;
  temperature: number;
  feelsLike: number;
}
