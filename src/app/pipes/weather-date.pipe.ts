import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherDatePipe'
})
export class WeatherDatePipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day}. ${month}. ${year} at ${hours}:${formattedMinutes}`;
  }
}
