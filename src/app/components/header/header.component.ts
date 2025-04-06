import { Component } from '@angular/core';
import {ActionSheetController, IonButton, IonHeader, IonIcon} from "@ionic/angular/standalone";
import {Store} from "@ngrx/store";
import {setLanguage} from "../../store/language/action/language.actions";
import {ELanguage} from "../../store/language/language.consts";
import {Observable} from "rxjs";
import { selectLanguage } from '../../store/language/selector/language.selector';
import {AsyncPipe, UpperCasePipe} from "@angular/common";
import {TranslateModule, TranslatePipe, TranslateService} from "@ngx-translate/core";

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
    TranslatePipe,
    TranslateModule
  ]
})
export class HeaderComponent {
  public selectedLanguage$: Observable<ELanguage>;

  constructor(private actionSheetCtrl: ActionSheetController, private store: Store, private translateService: TranslateService) {
    this.selectedLanguage$ = this.store.select(selectLanguage);
  }

  async presentLanguageSheet(): Promise<void> {
    const cancel = this.translateService.instant('language_select.cancel');

    const actionSheet = await this.actionSheetCtrl.create({
      cssClass:'hc-action-sheet',
      header: this.translateService.instant('language_select.title'),
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
          text: cancel,
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
