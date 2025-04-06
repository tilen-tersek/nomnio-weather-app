import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {ELanguage} from "./store/language/language.consts";
import {selectLanguage} from "./store/language/selector/language.selector";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, TranslateModule],
})
export class AppComponent {
  public selectedLanguage$: Observable<ELanguage>;

  constructor(private translateService: TranslateService, private store: Store) {
    this.selectedLanguage$ = this.store.select(selectLanguage);

    this.selectedLanguage$.subscribe((newLanguage: ELanguage)=>{
      this.translateService.use(newLanguage);
    })
  }
}
