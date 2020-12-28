import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
  ]
})
export class ComponentsModule {
}
