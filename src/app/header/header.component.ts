import { Component, OnInit } from '@angular/core';
import {ActionSheetController, IonButton, IonHeader, IonIcon, IonTitle} from "@ionic/angular/standalone";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
        IonButton,
        IonHeader,
        IonIcon,
        IonTitle
    ]
})
export class HeaderComponent {
  constructor(private actionSheetCtrl: ActionSheetController) {}

  async presentLanguageSheet(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass:'hc-action-sheet',
      header: 'Select language',
      mode: 'md',
      buttons: [
        {
          text: 'Slovenščina',
          handler: () => {
            console.log('Slovene selected');
            // setLanguage('sl');
          },
        },
        {
          text: 'English',
          handler: () => {
            console.log('English selected');
            // setLanguage('en');
          },
        },
        {
          text: 'Deutsch',
          handler: () => {
            console.log('German selected');
            // setLanguage('de');
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
}
