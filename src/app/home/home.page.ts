import { Component } from '@angular/core';
import {
  IonContent,
} from '@ionic/angular/standalone';
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, HeaderComponent],
})
export class HomePage {

}
