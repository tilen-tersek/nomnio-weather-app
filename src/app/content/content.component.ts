import { Component } from '@angular/core';
import {
  ActionSheetController,
  IonButton,
  IonContent,
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

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [
    IonRefresher,
    IonButton,
    IonIcon,
    IonRefresherContent,
    IonContent,
    AsyncPipe,
    NgIf,
    IonSpinner,
    WeatherCardComponent
  ]
})
export class ContentComponent {
  public selectedLocation$: Observable<string>;
  public isLoading$: Observable<boolean>;
  public weatherData$: Observable<IWeather | null | undefined>;
  public currentLocation: string = '';

  constructor(private store: Store, private actionSheetCtrl: ActionSheetController) {
    this.selectedLocation$ = this.store.select(selectLocation);
    this.isLoading$ = this.store.select(selectLoading);
    this.weatherData$ = this.store.select(selectWeather);

    this.selectedLocation$.subscribe(location => {
      this.currentLocation = location;
    });
  }

  async presentLocationSheet(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass:'hc-action-sheet',
      header: 'Select location',
      mode: 'md',
      buttons: [
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
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  changeLocation(location: string): void {
    this.store.dispatch(setLocation({ location }));

    this.refreshWeatherData()
  }

  refreshWeatherData(): void{
    this.store.dispatch(loadWeather({ location: this.currentLocation }));
  }

  protected readonly location = location;
}
