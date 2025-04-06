import { Component } from '@angular/core';
import {
  IonContent,
} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../components/header/header.component";
import {ContentComponent} from "../../components/content/content.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, HeaderComponent, ContentComponent],
})
export class HomePage {

}
