import { NgModule } from '@angular/core';
import { MaterialDesignModule } from './material-design/material-design.module';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NoImagePipe } from './pipes/no-image.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RoleTypePipe } from './pipes/role-type.pipe';
import { IdentificationTypePipe } from './pipes/identification-type.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubjectTypePipe } from './pipes/subject-type.pipe';
import { StatisticsModule } from './statistics/statistics.module';

@NgModule({
  declarations: [
    NavbarComponent,
    NoImagePipe,
    RoleTypePipe,
    IdentificationTypePipe,
    SubjectTypePipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialDesignModule,
    ShowHidePasswordModule,
    RouterModule,
    StatisticsModule
  ],
  exports: [
    NavbarComponent,
    MaterialDesignModule,
    NoImagePipe,
    ShowHidePasswordModule,
    TranslateModule,
    RoleTypePipe,
    IdentificationTypePipe,
    SubjectTypePipe,
    StatisticsModule
  ]
})
export class SharedModule {
}
