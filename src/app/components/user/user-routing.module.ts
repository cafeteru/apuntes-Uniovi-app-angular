import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CheckTokenGuard } from '../../core/guards/check-token-guard.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserResolver } from '../../core/resolvers/user-resolver.service';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [CheckTokenGuard]
  },
  {
    path: `:id`,
    component: UserDetailsComponent,
    canActivate: [CheckTokenGuard],
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
