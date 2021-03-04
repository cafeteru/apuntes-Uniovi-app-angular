import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CheckValidTokenGuard } from '../../core/guards/check-valid-token.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserResolver } from '../../core/resolvers/user-resolver.service';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [CheckValidTokenGuard]
  },
  {
    path: `:id`,
    component: UserDetailsComponent,
    canActivate: [CheckValidTokenGuard],
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
