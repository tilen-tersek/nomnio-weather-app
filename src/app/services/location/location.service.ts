import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocationService {
  getCurrentLocation(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by this browser.');
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          this.getCityFromLatLon(lat, lon).then(resolve).catch(reject);
        }, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      }
    });
  }
  getCityFromLatLon(lat: number, lon: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const city = data?.address?.city || data?.address?.town || data?.address?.village;
          if (city) {
            resolve(city);
          } else {
            reject('City not found.');
          }
        })
        .catch(() => reject('Unable to fetch city name.'));
    });
  }
}
