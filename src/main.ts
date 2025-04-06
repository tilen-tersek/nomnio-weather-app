import { bootstrapApplication } from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {provideStore} from '@ngrx/store';
import {EffectsModule, provideEffects} from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {importProvidersFrom, isDevMode} from '@angular/core';
import {addIcons} from "ionicons";
import {chevronDownCircleOutline, chevronDownOutline, chevronForwardOutline, sunnyOutline} from "ionicons/icons";
import {languageReducer} from "./app/store/language/reducer/language.reducer";
import {locationReducer} from "./app/store/location/reducer/location.reducer";
import {loadingReducer} from "./app/store/loading/reducer/loading.reducer";
import {weatherReducer} from "./app/store/weather/reducer/weather.reducer";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {WeatherEffects} from "./app/store/weather/effect/weather.effect";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

addIcons({
  'chevron-down-outline': chevronDownOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'chevron-down-circle-outline': chevronDownCircleOutline,
  'sunny-outline': sunnyOutline
});

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({
      language: languageReducer,
      location: locationReducer,
      loading: loadingReducer,
      weather: weatherReducer,
    }),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'si',
    }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideEffects(WeatherEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
});
