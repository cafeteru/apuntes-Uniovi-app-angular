import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { CheckValidTokenGuard } from '../../core/guards/check-valid-token.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    canActivate: [CheckValidTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
