import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IdentificationTypePipe } from './pipes/identification-type.pipe';
import { ListboxModule } from 'primeng/listbox';
import { MaterialDesignModule } from './material-design/material-design.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NoImagePipe } from './pipes/no-image.pipe';
import { OrderListModule } from 'primeng/orderlist';
import { RoleTypePipe } from './pipes/role-type.pipe';
import { RouterModule } from '@angular/router';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { StatisticsModule } from './statistics/statistics.module';
import { SubjectTypePipe } from './pipes/subject-type.pipe';
import { TranslateModule } from '@ngx-translate/core';

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
    StatisticsModule,
    ListboxModule,
    FormsModule,
    OrderListModule
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
    StatisticsModule,
    ListboxModule,
    FormsModule,
    OrderListModule
  ]
})
export class SharedModule {
}
