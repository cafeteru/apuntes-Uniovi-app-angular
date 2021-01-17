import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { ComponentsRoutingModule } from '../components-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design/material-design.module';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    UserRoutingModule,
    ComponentsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    CoreModule
  ]
})
export class UserModule {
}
