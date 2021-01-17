import { NgModule } from '@angular/core';
import { MaterialDesignModule } from './material-design/material-design.module';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NoImagePipe } from './pipes/no-image.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NoImagePipe,
  ],
  imports: [
    MaterialDesignModule,
    ShowHidePasswordModule,
  ],
  exports: [
    MaterialDesignModule,
    NoImagePipe,
    ShowHidePasswordModule,
    TranslateModule
  ]
})
export class SharedModule {
}
