import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class UserModule {
}
