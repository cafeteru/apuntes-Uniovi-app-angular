import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MyMatPaginatorIntl } from './shared/material-design/my-mat-paginator-intl';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { HttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import es from '@angular/common/locales/es';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    SweetAlert2Module,
    RouterModule,
    ComponentsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      },
      defaultLanguage: 'es'
    }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MyMatPaginatorIntl},
    {provide: MAT_DATE_LOCALE, useValue: es}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
