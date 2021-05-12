import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../../shared/material-design/material-design.module';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserPersonalDataComponent } from './tabs/user-personal-data/user-personal-data.component';
import { UserResolver } from '../../../core/resolvers/user.resolver';

@NgModule({
  declarations: [
    UserListComponent,
    ModalUserComponent,
    UserDetailsComponent,
    UserPersonalDataComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    CoreModule,
  ],
  providers: [
    UserResolver
  ]
})
export class UserModule {
}
