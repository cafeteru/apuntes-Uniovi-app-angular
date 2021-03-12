import { NgModule } from '@angular/core';
import { MaterialDesignModule } from './material-design/material-design.module';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NoImagePipe } from './pipes/no-image.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RoleTypePipe } from './pipes/role-type.pipe';
import { IdentificationTypePipe } from './pipes/identification-type.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavbarComponent,
    NoImagePipe,
    RoleTypePipe,
    IdentificationTypePipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialDesignModule,
    ShowHidePasswordModule,
  ],
  exports: [
    NavbarComponent,
    MaterialDesignModule,
    NoImagePipe,
    ShowHidePasswordModule,
    TranslateModule,
    RoleTypePipe,
    IdentificationTypePipe,
  ]
})
export class SharedModule {
}
