import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {ELanguage} from "./store/language/language.consts";
import {selectLanguage} from "./store/language/selector/language.selector";
import {Store} from "@ngrx/store";
import {LocalStorageService} from "./services/storage/local-storage.service";
import {loadWeather} from "./store/weather/action/weather.actions";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, TranslateModule],
})
export class AppComponent {
  public selectedLanguage$: Observable<ELanguage>;

  constructor(private translateService: TranslateService, private store: Store, private localStorage: LocalStorageService) {
    this.selectedLanguage$ = this.store.select(selectLanguage);

    this.loadLastLanguage();
    this.loadLastLocation();
    this.selectedLanguage$.subscribe((newLanguage: ELanguage) => {
      this.translateService.use(newLanguage);
      this.localStorage.setLanguage(newLanguage);
    })
  }

  loadLastLocation = () => {
    const lastLocation = this.localStorage.getLocation();
    if(lastLocation){
      this.store.dispatch(loadWeather({location: lastLocation}));
    }
  }

  loadLastLanguage = () => {
    this.translateService.setDefaultLang(this.localStorage.getLanguage());
  }
}
