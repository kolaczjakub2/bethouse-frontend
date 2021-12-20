import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatchComponent} from './components/simpleComponents/match/match.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "./material/material.module";
import {DatePipe} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OddComponent} from './components/simpleComponents/odd/odd.component';
import {BetComponent} from './components/simpleComponents/bet/bet.component';
import {SingleMatchComponent} from './components/single-match/single-match.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {BetslipComponent} from './components/betslip/betslip.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {BetslipListComponent} from './components/betslip-list/betslip-list.component';
import {BetslipPositionComponent} from './components/simpleComponents/betslip-position/betslip-position.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {catchError, forkJoin, of} from "rxjs";
import { StatusComponent } from './components/simpleComponents/status/status.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MatchListComponent } from './components/bet-list/match-list.component';
import { AddMatchViewComponent } from './components/admin-zone/add-match-view/add-match-view.component';


export function initApp(http: HttpClient, translate: TranslateService) {
  return () => new Promise<boolean>((resolve: (res: boolean) => void) => {

    const defaultLocale = 'en';
    const translationsUrl = '/assets/i18n/';
    const sufix = '.json';
    const storageLocale = localStorage.getItem('locale');
    const locale = storageLocale || defaultLocale;

    forkJoin([
      http.get(`/assets/i18n/dev.json`).pipe(
        catchError(() => of(null))
      ),
      http.get(`${translationsUrl}/${locale}${sufix}`).pipe(
        catchError(() => of(null))
      )
    ]).subscribe((response: any[]) => {
      const devKeys = response[0];
      const translatedKeys = response[1];

      translate.setTranslation(defaultLocale, devKeys || {});
      translate.setTranslation(locale, translatedKeys || {}, true);

      translate.setDefaultLang(defaultLocale);
      translate.use(locale);

      resolve(true);
    });
  });
}

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    OddComponent,
    BetComponent,
    SingleMatchComponent,
    ToolbarComponent,
    BetslipComponent,
    BetslipListComponent,
    BetslipPositionComponent,
    StatusComponent,
    SideMenuComponent,
    MatchListComponent,
    AddMatchViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot(
      {
        defaultLanguage: 'en'
      }
    )
  ],
  providers: [DatePipe, {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {duration: 2500, panelClass: ['blue-snackbar']}
  },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [HttpClient, TranslateService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
