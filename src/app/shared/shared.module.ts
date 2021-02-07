import { NgModule } from '@angular/core';
import { MaterialDesignModule } from './material-design/material-design.module';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NoImagePipe } from './pipes/no-image.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RoleTypePipe } from './pipes/role-type.pipe';
import { IdentificationTypePipe } from './pipes/identification-type.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NoImagePipe,
    RoleTypePipe,
    IdentificationTypePipe
  ],
  imports: [
    MaterialDesignModule,
    ShowHidePasswordModule,
  ],
  exports: [
    MaterialDesignModule,
    NoImagePipe,
    ShowHidePasswordModule,
    TranslateModule,
    RoleTypePipe,
    IdentificationTypePipe,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
