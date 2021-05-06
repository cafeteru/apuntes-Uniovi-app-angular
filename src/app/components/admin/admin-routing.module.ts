import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTokenGuard } from '../../core/guards/check-token.guard';
import { AdminMenuComponent } from './menu/admin-menu.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminMenuComponent,
    canLoad: [CheckTokenGuard]
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./user/user.module').then(
        (u) => u.UserModule
      ),
    canLoad: [CheckTokenGuard]
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subject/subject.module').then(
        (s) => s.SubjectModule
      ),
    canLoad: [CheckTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
