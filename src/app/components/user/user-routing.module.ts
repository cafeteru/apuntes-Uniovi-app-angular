import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CheckValidTokenGuard } from '../../core/guards/check-valid-token.guard';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [CheckValidTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
