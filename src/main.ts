import { bootstrapApplication } from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode} from '@angular/core';
import {addIcons} from "ionicons";
import {chevronDownOutline, sunnyOutline} from "ionicons/icons";
import {languageReducer} from "./app/store/language/reducer/language.reducer";
import {locationReducer} from "./app/store/location/reducer/location.reducer";
import {loadingReducer} from "./app/store/loading/reducer/loading.reducer";
import {weatherReducer} from "./app/store/weather/reducer/weather.reducer";

addIcons({
  'chevron-down-outline': chevronDownOutline,
  'sunny-outline': sunnyOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({
      language: languageReducer,
      location: locationReducer,
      loading: loadingReducer,
      weather: weatherReducer,
    }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
});
