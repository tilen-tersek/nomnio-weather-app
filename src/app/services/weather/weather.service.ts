import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface OpenWeatherResponse {
  weather: { description: string }[];
  main: { temp: number; feels_like: number };
  name: string;
  dt: number;
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getWeather(location: string): Observable<OpenWeatherResponse> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(location)}&units=metric&appid=${this.apiKey}`;
    return this.http.get<OpenWeatherResponse>(url);
  }
}
