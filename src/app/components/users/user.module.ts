import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule
  ]
})
export class UserModule {
}
