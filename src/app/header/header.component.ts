import { Component } from '@angular/core';
import {ActionSheetController, IonButton, IonHeader, IonIcon} from "@ionic/angular/standalone";
import {Store} from "@ngrx/store";
import {setLanguage} from "../store/language/action/language.actions";
import {ELanguage} from "../store/language/language.consts";
import {Observable} from "rxjs";
import { selectLanguage } from '../store/language/selector/language.selector';
import {AsyncPipe, UpperCasePipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
  imports: [
    IonButton,
    IonHeader,
    IonIcon,
    AsyncPipe,
    UpperCasePipe,
    TranslatePipe
  ]
})
export class HeaderComponent {
  public selectedLanguage$: Observable<ELanguage>;

  constructor(private actionSheetCtrl: ActionSheetController, private store: Store) {
    this.selectedLanguage$ = this.store.select(selectLanguage);
  }

  async presentLanguageSheet(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass:'hc-action-sheet',
      header: 'Select language',
      mode: 'md',
      buttons: [
        {
          text: 'Slovenščina',
          handler: () => {
            this.changeLanguage(ELanguage.Slovene);
          },
        },
        {
          text: 'English',
          handler: () => {
            this.changeLanguage(ELanguage.English);
          },
        },
        {
          text: 'Deutsch',
          handler: () => {
            this.changeLanguage(ELanguage.German);
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

  changeLanguage(language: ELanguage): void {
    this.store.dispatch(setLanguage({ language }));
  }
}
