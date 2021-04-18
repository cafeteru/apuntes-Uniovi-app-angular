import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserResolver } from '../../core/resolvers/user.resolver';
import { RoleTypeGuard } from '../../core/guards/role-type-guard.service';
import { RoleType } from '../../core/models/enums/role-type';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_ADMIN]}
  },
  {
    path: `:id`,
    component: UserDetailsComponent,
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_ADMIN]},
    resolve: {
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
