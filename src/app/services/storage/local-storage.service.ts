import {Injectable} from '@angular/core';
import {ELanguage} from '../../store/language/language.consts';
import {LANGUAGE_KEY, LOCATION_KEY} from "./consts";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setLanguage(language: ELanguage): void {
    localStorage.setItem(LANGUAGE_KEY, language);
  }

  getLanguage(): ELanguage {
    const lang = localStorage.getItem(LANGUAGE_KEY);
    if (lang && Object.values(ELanguage).includes(lang as ELanguage)) {
      return lang as ELanguage;
    }
    return ELanguage.Slovene;
  }

  setLocation(location: string): void {
    localStorage.setItem(LOCATION_KEY, location);
  }

  getLocation(): string {
    const location = localStorage.getItem(LOCATION_KEY);
    return location ?? "";
  }}
