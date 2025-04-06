export interface IWeatherState {
  weather: IWeather | null | undefined;
}

export interface IWeather {
  location: string;
  datetime: Date;
  description: string;
  temperature: number;
  feelsLike: number;
}
