import {Component, ViewChild} from '@angular/core';
import {
  ActionSheetController,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent, IonSpinner
} from "@ionic/angular/standalone";
import {Store} from "@ngrx/store";
import {setLocation} from "../store/location/action/location.actions";
import {Observable} from "rxjs";
import {selectLocation} from "../store/location/selector/location.selector";
import {selectLoading} from "../store/loading/selector/loading.selector";
import {AsyncPipe, NgIf} from "@angular/common";
import {loadWeather} from "../store/weather/action/weather.actions";
import {IWeather} from "../store/weather/weather.model";
import {selectWeather} from "../store/weather/selector/weather.selector";
import {WeatherCardComponent} from "../weather-card/weather-card.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "../services/storage/local-storage.service";
import {LocationService} from "../services/location/location.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
    imports: [
        IonRefresher,
        IonButton,
        IonIcon,
        IonRefresherContent,
        AsyncPipe,
        NgIf,
        IonSpinner,
        WeatherCardComponent,
        TranslatePipe
    ]
})
export class ContentComponent {
  @ViewChild(IonRefresher) refresher?: IonRefresher;

  public selectedLocation$: Observable<string>;
  public isLoading$: Observable<boolean>;
  public weatherData$: Observable<IWeather | null | undefined>;
  public currentLocation: string = '';
  constructor(private locationService: LocationService, private store: Store, private actionSheetCtrl: ActionSheetController, private localStorage: LocalStorageService, private translateService: TranslateService) {
    this.selectedLocation$ = this.store.select(selectLocation);
    this.isLoading$ = this.store.select(selectLoading);
    this.weatherData$ = this.store.select(selectWeather);

    this.locationService.getCurrentLocation().then((loc)=>{
      this.currentLocation = loc;
    })  .catch((error) => {
      console.error("Geolocation error:", error);
    });

    this.selectedLocation$.subscribe(location => {
      this.currentLocation = location;
    });

    this.isLoading$.subscribe(isLoading => {
      if (!isLoading) {
        this.refresher?.complete();
      }
    });
  }

  changeLocation(location: string): void {
    this.store.dispatch(setLocation({ location }));

    this.localStorage.setLocation(location);

    this.refreshWeatherData()
  }

  refreshWeatherData(): void{
    this.store.dispatch(loadWeather({ location: this.currentLocation }));
  }

  async presentLocationSheet(): Promise<void> {
    const cancel = this.translateService.instant('location_select.cancel');
    const current = this.translateService.instant('location_select.current');

    const actionSheet = await this.actionSheetCtrl.create({
      cssClass:'hc-action-sheet',
      header: this.translateService.instant('location_select.title'),
      mode: 'md',
      buttons: [
        {
          text: `${current} (${this.currentLocation})`,
          handler: () => {
            this.changeLocation(this.currentLocation);
          },
        },
        {
          text: 'Ljubljana',
          handler: () => {
            this.changeLocation('Ljubljana');
          },
        },
        {
          text: 'Maribor',
          handler: () => {
            this.changeLocation('Maribor');
          },
        },
        {
          text: 'Celje',
          handler: () => {
            this.changeLocation('Celje');
          },
        },
        {
          text: 'Invalid location',
          handler: () => {
            this.changeLocation('Invalid location');
          },
        },
        {
          text: cancel,
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  protected readonly location = location;
}
