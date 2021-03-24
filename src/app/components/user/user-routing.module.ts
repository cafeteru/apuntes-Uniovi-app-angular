import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserResolver } from '../../core/resolvers/user-resolver.service';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: `:id`,
    component: UserDetailsComponent,
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
