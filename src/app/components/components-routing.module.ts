import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckValidTokenGuard } from '../core/guards/check-valid-token.guard';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [CheckValidTokenGuard]
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/user.module').then(
        (u) => u.UserModule
      ),
    canActivate: [CheckValidTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {
}
