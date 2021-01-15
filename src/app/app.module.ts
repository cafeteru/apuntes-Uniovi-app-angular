import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

registerLocaleData(localeEs);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ComponentsModule,
        CoreModule,
        SharedModule,
        SweetAlert2Module,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
